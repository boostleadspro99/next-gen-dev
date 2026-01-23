import { Timestamp } from 'firebase/firestore';

// --- Enums & Unions ---

export type PlanType = 'presence' | 'boost' | 'business';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled';
export type ProjectStatus = 'audit' | 'design' | 'development' | 'live';
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

// --- Collections ---

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'client' | 'admin';
  createdAt: Timestamp;
}

export interface ClientData {
  uid: string; // Maps 1:1 to User UID for this architecture
  ownerUid: string;
  companyName: string;
  email: string;
  phone?: string;
  plan: PlanType;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectStep {
  id: number;
  key: string; // 'audit', 'design', 'dev', 'live'
  label: string;
  status: 'pending' | 'current' | 'completed';
  date?: string; // ISO string for display
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
  senderId: string; // Auth UID
  senderName: string;
  text: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

export interface InvoiceData {
  id?: string;
  clientId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  periodStart: Timestamp;
  periodEnd: Timestamp;
  pdfUrl?: string;
  createdAt: Timestamp;
}

export interface SimulationData {
  id?: string;
  userId?: string; // Optional if anonymous
  sector: string;
  city: string;
  revenuePotential: number;
  recommendedPlan: PlanType;
  createdAt: Timestamp;
}
