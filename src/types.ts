export type DomainId = 'tax_prep' | 'consulting' | 'bookkeeping' | 'business_credit' | 'tech_stack_cfo' | 'claims_adjusting' | 'medical_claims_consulting' | 'franchise' | 'custom';

export interface RevenueDomain {
  id: DomainId;
  name: string;
  tagline: string;
  avgRevenue: number;
  revenueType: 'One-time' | 'Recurring / Mo' | 'Commission';
  icon: string;
  description: string;
  defaultHeadline: string;
  defaultSubheadline: string;
  bulletPoints: string[];
  targetAudience: string;
  objections: string[];
  sampleReviews: { author: string; role: string; rating: number; text: string; company: string }[];
  certifications: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  capturedAt?: string;
  domain?: string;
  domainId: DomainId;
  status: 'New' | 'Contacted' | 'Nurturing' | 'Call Booked' | 'Closed / Paid' | 'Lost';
  value: number;
  createdAt: string;
  notes?: string;
  source: 'Landing Form' | 'AI Chatbot' | 'Phone Call' | 'Referral';
  leadScore?: number;
  closingProbability?: number;
  dynamicPriceQuote?: number;
  suggestedUpsell?: string;
  renewalLikelihood?: number;
}

export interface NurtureStep {
  day: number;
  channel: 'Email' | 'SMS';
  title: string;
  subject: string;
  body: string;
}

export interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  clientName?: string;
  clientEmail?: string;
  serviceName: string;
  status: 'Available' | 'Booked';
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail?: string;
  domainName: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Processing';
  date: string;
  dueDate: string;
  taxId?: string;
  paymentMethod?: 'Credit Card (Stripe)' | 'Bank ACH' | 'Wire' | 'Pending';
  transactionId?: string;
  lineItems?: InvoiceLineItem[];
  notes?: string;
}

export interface TaxResolutionCase {
  id: string;
  clientName: string;
  businessName?: string;
  irsDebtAmount: number;
  potentialSettlement: number;
  status: 'Initial Intake' | '433-A / OIC Prep' | 'IRS Under Review' | 'Settlement Approved' | 'Closed Won';
  assignedSpecialist: string;
  filingYears: string[];
  penaltyAbatementEligible: boolean;
  savingsProjected: number;
  lastUpdated: string;
}

export interface InsuranceClaimConsultingCase {
  id: string;
  clientName: string;
  propertyAddress: string;
  insurerName: string;
  initialInsurerOffer: number;
  appraisedLossValue: number;
  settlementRecovered?: number;
  contingencyFeePercentage: number;
  status: 'Initial Audit' | 'Proof of Loss Filed' | 'Umpire Appraisal' | 'Recovered / Paid';
  contingencyEarned?: number;
}

export interface SystemDiagnosticAudit {
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  environment: string;
  geminiStatus: string;
  totalLeads: number;
  pipelineValue: number;
  collectedRevenue: number;
  listingsConnected: number;
  serverTimestamp: string;
}

export interface ChecklistStep {
  id: number;
  action: string;
  element: string;
  whyItWorks: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  guideText: string;
}

export interface OwnerSOP {
  id: string;
  title: string;
  category: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  role: 'Owner' | 'AI Automation' | 'Assigned Staff';
  frequency: string;
  isAutomated: boolean;
  completed: boolean;
  description: string;
  checklist: string[];
}

export interface CustomerRequirementItem {
  id: string;
  category: string;
  requirement: string;
  status: 'Fulfilled' | 'In Progress';
  evidence: string;
}

export interface BusinessProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  primaryCategory: string;
  secondaryCategories: string[];
  hours: string;
  description: string;
  completionPercentage: number;
  completedAttributes: string[];
  pendingAttributes: { id: string; name: string; impact: string; category: string }[];
}

export type ListingStatus = 'Connected' | 'Processing' | 'Not Connected' | 'Issue Found';

export interface ListingPlatform {
  id: string;
  name: string;
  category: 'Search & Navigation' | 'Local & Social' | 'Business Directories' | 'AI & Voice Assistants';
  status: ListingStatus;
  isEnhanced?: boolean;
  isVerified?: boolean;
  tooltipText?: string;
  viewListingUrl?: string;
  lastSynced: string;
  syncTimeEstimate?: string;
  listingUrlDisplay?: string;
  matchScore: number;
}

export interface DailySubscriptionTier {
  id: string;
  name: string;
  category: string;
  billingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  price: number;
  description: string;
  features: string[];
  activeSubscribers: number;
  mrr: number;
  popular?: boolean;
}

export interface DailyRevenueEvent {
  id: string;
  timestamp: string;
  type: 'Subscription Charged' | 'Emergency Tax Retainer' | 'Consulting Close' | 'Deposit Collected' | 'Outbound Offer Accepted' | 'Penalty Relief Won';
  clientName: string;
  clientEmail?: string;
  amount: number;
  status: 'Completed' | 'Processing';
  channel: 'Stripe Auto-Pay' | 'ACH Direct' | 'Discovery Deposit' | 'AI Closer';
}

export interface AutonomousMoneyMachine {
  id: string;
  name: string;
  status: 'ACTIVE_24_7' | 'PAUSED' | 'IDLE';
  category: 'Subscription Biller' | 'Instant Lead Closer' | 'Emergency Retainers' | 'Outbound Deal Dispatcher';
  dailyYieldEstimate: number;
  todayCollected: number;
  actionsTriggeredToday: number;
  description: string;
  lastActionTime: string;
  conversionRate: string;
}

export interface DailyRevenueMetrics {
  isAutopilotEnabled: boolean;
  dailyTarget: number;
  todayEarned: number;
  activeSubscriptionsCount: number;
  mrr: number;
  pipelineVelocity: number;
  thirtyDayProjection: number;
  recentEvents: DailyRevenueEvent[];
}

export interface TaxReturnData {
  id: string;
  taxpayerName: string;
  ssnEin: string;
  email: string;
  phone?: string;
  formType: 'Form 1040' | 'Form 1120-S' | 'Form 1065' | 'Form 1120';
  taxYear: number;
  filingStatus: 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household' | 'S-Corp' | 'Partnership';
  state: string;
  wages: number;
  businessIncome1099: number;
  k1Distributions: number;
  officerCompensation: number;
  standardOrItemizedDeduction: number;
  section179Depreciation: number;
  qbiDeduction: number;
  taxableIncome: number;
  totalTaxLiability: number;
  totalPaymentsWithholding: number;
  netRefundOrBalanceDue: number;
  eFileStatus: 'Draft' | 'Ready for Review' | 'Submitted to MeF' | 'Accepted by IRS' | 'Rejected';
  irsSubmissionId?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}



