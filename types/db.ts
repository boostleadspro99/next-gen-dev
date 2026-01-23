import { Timestamp } from 'firebase/firestore';

// --- Enums & Unions ---

export type PlanType = 'presence' | 'boost' | 'business';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'canceled';
export type SetupFeeStatus = 'paid' | 'unpaid' | 'pending';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export type ProjectStatus = 'audit' | 'design' | 'development' | 'live';
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export type InvoiceStatus = 'paid' | 'unpaid';
export type InvoiceType = 'setup' | 'monthly' | 'extra';

// --- Collections ---

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'client' | 'admin';
  createdAt: Timestamp;
}

export interface ClientData {
  uid: string; // Maps 1:1 to User UID
  ownerUid: string;
  companyName: string;
  email: string;
  phone?: string;
  notes?: string; // Admin internal notes
  
  // Subscription & Billing
  plan: PlanType;
  subscriptionStatus: SubscriptionStatus;
  setupFeeStatus: SetupFeeStatus;
  billingCycle: BillingCycle;
  
  // Dates
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp; // Usually Next Billing Date
  nextBillingDate?: Timestamp;
  
  stripeCustomerId?: string; // Optional for future
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectStep {
  id: number;
  key: string;
  label: string;
  status: 'pending' | 'current' | 'completed';
  date?: string;
}

export interface ProjectData {
  id?: string;
  clientId: string;
  status: ProjectStatus;
  timeline: ProjectStep[];
  domain?: string;
  repository?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TicketData {
  id?: string;
  clientId: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastMessageAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TicketMessageData {
  id?: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  text: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

export interface InvoiceData {
  id?: string;
  clientId: string;
  type: InvoiceType;
  amountMAD: number;
  status: InvoiceStatus;
  period: string; // YYYY-MM
  dueDate?: Timestamp;
  createdAt: Timestamp;
  paidAt?: Timestamp;
}

export interface AdminLogData {
  id?: string;
  adminUid: string;
  clientId: string;
  actionType: 'update_subscription' | 'update_project' | 'note_added' | 'create_invoice' | 'update_invoice';
  changes: {
    field: string;
    before: any;
    after: any;
  }[];
  createdAt: Timestamp;
}

export interface SimulationData {
  id?: string;
  userId?: string;
  sector: string;
  city: string;
  revenuePotential: number;
  recommendedPlan: PlanType;
  createdAt: Timestamp;
}
