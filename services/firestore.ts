import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import type { 
  ClientData, 
  ProjectData, 
  TicketData, 
  TicketMessageData, 
  ProjectStep,
  InvoiceData,
  InvoiceStatus,
  InvoiceType,
  AdminLogData
} from '../types/db';

// --- Helpers ---

const now = () => serverTimestamp() as Timestamp;

// --- Onboarding / Seeding ---

export const initializeClientData = async (user: any, registrationData?: any) => {
  if (!user) return;

  const clientRef = doc(db, 'clients', user.uid);
  const clientSnap = await getDoc(clientRef);

  // If client already exists, do nothing
  if (clientSnap.exists()) return;

  // Calculate Dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30); // 30 Days Trial

  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);

  // 1. Create Client Document
  const defaultClient: ClientData = {
    uid: user.uid,
    ownerUid: user.uid,
    email: user.email,
    companyName: registrationData?.company || user.displayName || 'My Company',
    phone: registrationData?.phone || '',
    
    // Manual Subscription Defaults
    plan: 'boost', 
    subscriptionStatus: 'trial',
    setupFeeStatus: 'unpaid',
    billingCycle: 'monthly',
    
    currentPeriodStart: startTimestamp,
    currentPeriodEnd: endTimestamp,
    nextBillingDate: endTimestamp,

    createdAt: now(),
    updatedAt: now()
  };

  await setDoc(clientRef, defaultClient);

  // 2. Create Default Project Document
  const defaultTimeline: ProjectStep[] = [
    { id: 1, key: 'audit', label: 'Audit & Stratégie', status: 'current', date: new Date().toLocaleDateString() },
    { id: 2, key: 'design', label: 'Design & Maquettes', status: 'pending' },
    { id: 3, key: 'dev', label: 'Développement', status: 'pending' },
    { id: 4, key: 'live', label: 'Mise en ligne', status: 'pending' }
  ];

  const projectData: ProjectData = {
    clientId: user.uid,
    status: 'audit',
    timeline: defaultTimeline,
    createdAt: now(),
    updatedAt: now()
  };

  await addDoc(collection(db, 'projects'), projectData);

  // 3. Create Welcome Ticket
  const welcomeTicket: TicketData = {
    clientId: user.uid,
    subject: 'Bienvenue chez NexGen !',
    status: 'open',
    priority: 'low',
    lastMessageAt: now(),
    createdAt: now(),
    updatedAt: now()
  };
  
  const ticketRef = await addDoc(collection(db, 'tickets'), welcomeTicket);
  
  await addDoc(collection(db, 'tickets', ticketRef.id, 'messages'), {
    ticketId: ticketRef.id,
    senderId: 'system',
    senderName: 'NexGen Bot',
    text: `Bonjour ${user.displayName || 'cher client'}, votre espace est prêt. Votre période d'essai a commencé. Notre équipe va prendre contact avec vous sous 24h pour démarrer l'audit.`,
    isAdmin: true,
    createdAt: now()
  });
};

// --- Admin ---

export const getAllClients = async (): Promise<ClientData[]> => {
  const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as ClientData);
};

export const updateClientSubscription = async (
  clientId: string, 
  updates: Partial<ClientData>, 
  previousData: ClientData
) => {
  if (!auth.currentUser) throw new Error("Unauthorized");

  // 1. Calculate Changes for Log
  const changes: { field: string, before: any, after: any }[] = [];
  
  Object.keys(updates).forEach((key) => {
    const k = key as keyof ClientData;
    // Simple comparison (ignoring Timestamps deep compare for simplicity here)
    if (updates[k] !== previousData[k]) {
      changes.push({
        field: k,
        before: previousData[k]?.toString() || 'null',
        after: updates[k]?.toString() || 'null'
      });
    }
  });

  if (changes.length === 0) return;

  // 2. Create Audit Log
  const logData: AdminLogData = {
    adminUid: auth.currentUser.uid,
    clientId,
    actionType: 'update_subscription',
    changes,
    createdAt: now()
  };
  await addDoc(collection(db, 'adminLogs'), logData);

  // 3. Update Client
  const clientRef = doc(db, 'clients', clientId);
  await updateDoc(clientRef, {
    ...updates,
    updatedAt: now()
  });
};

// --- Invoices ---

export const createInvoice = async (
  clientId: string,
  type: InvoiceType,
  amountMAD: number,
  period: string
) => {
  if (!auth.currentUser) throw new Error("Unauthorized");

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 5); // Default due in 5 days

  const invoiceData: InvoiceData = {
    clientId,
    type,
    amountMAD,
    status: 'unpaid',
    period,
    dueDate: Timestamp.fromDate(dueDate),
    createdAt: now()
  };

  await addDoc(collection(db, 'invoices'), invoiceData);
  
  // Log it
  await addDoc(collection(db, 'adminLogs'), {
    adminUid: auth.currentUser.uid,
    clientId,
    actionType: 'create_invoice',
    changes: [{ field: 'amount', before: '0', after: amountMAD.toString() }],
    createdAt: now()
  } as AdminLogData);
};

export const updateInvoiceStatus = async (invoiceId: string, status: InvoiceStatus) => {
  const invoiceRef = doc(db, 'invoices', invoiceId);
  const update: any = { status };
  if (status === 'paid') {
    update.paidAt = now();
  } else {
    update.paidAt = null;
  }
  await updateDoc(invoiceRef, update);
};

export const getInvoicesByClient = async (clientId: string): Promise<InvoiceData[]> => {
  const q = query(
    collection(db, 'invoices'), 
    where('clientId', '==', clientId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvoiceData));
};

// --- Projects ---

export const getProjectByClient = async (clientId: string): Promise<ProjectData | null> => {
  if (!clientId) return null;
  const q = query(
    collection(db, 'projects'), 
    where('clientId', '==', clientId), 
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ProjectData;
};

// Admin only
export const updateProjectStatus = async (projectId: string, newStepIndex: number) => {
  if (!projectId) throw new Error("Project ID required");
  
  const projectRef = doc(db, 'projects', projectId);
  const snap = await getDoc(projectRef);
  if (!snap.exists()) throw new Error("Project not found");

  const project = snap.data() as ProjectData;
  const newTimeline = [...project.timeline];

  // Logic: Mark previous steps completed, current step current
  newTimeline.forEach((step, index) => {
    if (index < newStepIndex) step.status = 'completed';
    else if (index === newStepIndex) {
      step.status = 'current';
      step.date = new Date().toLocaleDateString();
    } else {
      step.status = 'pending';
      step.date = undefined;
    }
  });

  await updateDoc(projectRef, {
    timeline: newTimeline,
    status: newTimeline[newStepIndex].key,
    updatedAt: now()
  });
};

// --- Tickets ---

export const createTicket = async (clientId: string, subject: string, priority: 'low'|'medium'|'high') => {
  if (!clientId || !subject) throw new Error("Invalid ticket data");

  const ticketData: TicketData = {
    clientId,
    subject,
    priority,
    status: 'open',
    lastMessageAt: now(),
    createdAt: now(),
    updatedAt: now()
  };

  const docRef = await addDoc(collection(db, 'tickets'), ticketData);
  return docRef.id;
};

export const getTicketsByClient = async (clientId: string): Promise<TicketData[]> => {
  const q = query(
    collection(db, 'tickets'), 
    where('clientId', '==', clientId),
    orderBy('updatedAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TicketData));
};

export const subscribeToTicketMessages = (ticketId: string, callback: (messages: TicketMessageData[]) => void) => {
  const q = query(
    collection(db, 'tickets', ticketId, 'messages'),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TicketMessageData));
    callback(messages);
  });
};

export const getTicketMessages = async (ticketId: string): Promise<TicketMessageData[]> => {
  const q = query(
    collection(db, 'tickets', ticketId, 'messages'),
    orderBy('createdAt', 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TicketMessageData));
};

export const addTicketMessage = async (ticketId: string, senderId: string, text: string, senderName: string, isAdmin: boolean = false) => {
  if (!text.trim()) return;

  // 1. Add Message
  await addDoc(collection(db, 'tickets', ticketId, 'messages'), {
    ticketId,
    senderId,
    senderName,
    text,
    isAdmin,
    createdAt: now()
  });

  // 2. Update Ticket Metadata
  await updateDoc(doc(db, 'tickets', ticketId), {
    lastMessageAt: now(),
    updatedAt: now(),
    status: isAdmin ? 'pending' : 'open' // If admin replies, waiting for client (pending). If client replies, it's open.
  });
};