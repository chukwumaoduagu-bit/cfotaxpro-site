export interface TabIntelligenceInfo {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  category: 'Strategy & Growth' | 'Revenue & Monetization' | 'Client Acquisition' | 'Tax & Defense' | 'Operations & Systems' | 'Autonomous AI';
  whatItDoes: string;
  whatsOnIt: string[];
  keyOutcome: string;
  recommendedAction: string;
  shortcutTabs?: string[];
}

export const SYSTEM_TABS_INTELLIGENCE: TabIntelligenceInfo[] = [
  {
    id: 'ecosystem_opps',
    label: '🚀 Ecosystem Expansion & New Opportunities',
    shortLabel: 'Ecosystem Expansion',
    icon: '🚀',
    category: 'Strategy & Growth',
    whatItDoes: 'Unlocks 8 multi-million dollar business expansion vectors beyond standard tax prep, including Cost Segregation, M&A due diligence, and AI automated CFO franchising.',
    whatsOnIt: [
      '8 High-Yield Opportunity Blueprints ($25k–$100k+ deals)',
      'Interactive TAM/SAM Revenue Feasibility Calculator',
      'Turnkey Deliverable Checklists & Client Proposals',
      'Contingency Fee & Retainer Monetization Models'
    ],
    keyOutcome: 'Expands firm average transaction value from $1,500 tax returns to $25k+ high-margin advisory engagements.',
    recommendedAction: 'Review the Cost Segregation and Commercial Claims vectors to launch high-ticket contingency offerings.',
    shortcutTabs: ['smart_business', 'website_hub', 'tax_claims']
  },
  {
    id: 'smart_business',
    label: '💎 Smart Business & AI CFO Hub',
    shortLabel: 'Smart Business Hub',
    icon: '💎',
    category: 'Strategy & Growth',
    whatItDoes: 'Acts as your executive cockpit for business intelligence, real-time EBITDA margin tracking, autonomous cash flow runway forecasting, and proactive tax risk alerts.',
    whatsOnIt: [
      'Real-Time Business Health & KPI Scorecard',
      'AI CFO Cash Flow Forecaster (30/60/90 Day Runway)',
      'Automated Tax Leakage & Reasonable Salary Scanner',
      'Ecosystem Synergy Matrix & Valuation Multipliers'
    ],
    keyOutcome: 'Gives business owners Fortune 500 financial leadership and eliminates tax surprises before year-end.',
    recommendedAction: 'Run the AI CFO Cash Flow Forecast to identify cash surplus allocation and tax reduction moves.',
    shortcutTabs: ['daily_revenue', 'ecosystem_opps', 'owner_ops']
  },
  {
    id: 'website_hub',
    label: '🌐 Public Website & Carrd Hub',
    shortLabel: 'Public Website Hub',
    icon: '🌐',
    category: 'Client Acquisition',
    whatItDoes: 'Controls your public-facing storefront (cfotaxprollc.com), automated Carrd landing page exports, live DNS diagnostics, embeddable lead widgets, and SEO meta tags.',
    whatsOnIt: [
      'Live Public Website Preview & Interactive Simulator Launcher',
      'Live DNS Diagnostic & A-Record / CNAME Checker',
      'Carrd & Framer 1-Click Markdown / Embed Code Exporter',
      '24/7 AI Chatbot Embed Snippet & Webhook Config',
      'SEO Structured Schema & OpenGraph Meta Generator'
    ],
    keyOutcome: 'Converts cold web visitors into pre-qualified, high-ticket consultation bookings 24/7.',
    recommendedAction: 'Test your live domain DNS status and copy the Carrd / Chatbot embed code to your primary domain.',
    shortcutTabs: ['capture', 'ai_stack', 'tax_claims']
  },
  {
    id: 'daily_revenue',
    label: '💰 24/7 Daily Revenue Engine',
    shortLabel: 'Daily Revenue Engine',
    icon: '💰',
    category: 'Revenue & Monetization',
    whatItDoes: 'Provides an automated daily cash collection machine with 1-click Stripe payment links, retainer invoices, contingency contracts, and recurring billing triggers.',
    whatsOnIt: [
      'Instant Stripe Payment Link Generator ($600 to $4,500+)',
      'Daily Revenue Pacing Tracker vs Monthly Target ($10k+)',
      'Pre-Configured Retainer Agreements & Signature Links',
      'Automated Accounts Receivable Overdue Chaser'
    ],
    keyOutcome: 'Guarantees immediate cash collection upon strategy call completion with zero invoicing delays.',
    recommendedAction: 'Generate a $1,500 Tax Retainer payment link for your next hot consultation.',
    shortcutTabs: ['conversion', 'pipeline', 'smart_business']
  },
  {
    id: 'lead_fuel',
    label: '⚡ AI Lead Fuel & 7-Day Kickstart',
    shortLabel: 'AI Lead Fuel',
    icon: '⚡',
    category: 'Client Acquisition',
    whatItDoes: 'Accelerates immediate client acquisition with 7-day outbound campaign blueprints, cold email sequences, SMS scripts, and paid ads ROI models.',
    whatsOnIt: [
      '7-Day Client Acquisition Sprint Execution Playbook',
      'Direct SMS / Cold Email Scripts tailored for S-Corps & Contractors',
      'LinkedIn Outbound DM Templates for High-Net-Worth Executives',
      'Local DFW Business Directory Scraping & Enrichment Prompts'
    ],
    keyOutcome: 'Generates 5 to 15 warm, high-intent consultation requests within 7 days of campaign launch.',
    recommendedAction: 'Deploy Day 1 SMS campaign to your existing past client or contractor list.',
    shortcutTabs: ['capture', 'nurture', 'pipeline']
  },
  {
    id: 'audit',
    label: '🛡️ Operations Audit & System Health',
    shortLabel: 'Operations Audit',
    icon: '🛡️',
    category: 'Operations & Systems',
    whatItDoes: 'Runs real-time diagnostic audits on your operational readiness, data pipelines, lead response latency, domain DNS health, and security compliance.',
    whatsOnIt: [
      'Comprehensive 10-Point Operations Diagnostic',
      'Lead Speed-to-Lead Response Latency Monitor',
      'DNS & Webhook Infrastructure Health Checks',
      'Security, PTIN Compliance & Circular 230 Checklist'
    ],
    keyOutcome: 'Prevents lead leakage, system downtime, and regulatory compliance issues.',
    recommendedAction: 'Run the Full Operations Health Check to ensure all webhooks and alert channels are green.',
    shortcutTabs: ['smart_business', 'checklist', 'owner_ops']
  },
  {
    id: 'tax_claims',
    label: '⚖️ IRS Tax & Claims Recovery',
    shortLabel: 'Tax & Claims Recovery',
    icon: '⚖️',
    category: 'Tax & Defense',
    whatItDoes: 'Specialized deep-dive recovery hub for IRS penalty abatements (FTA), back tax resolution, and commercial storm/casualty insurance underpayment supplements.',
    whatsOnIt: [
      'IRS First-Time Abate (FTA) Notice & Penalty Abatement Engine',
      'S-Corp Late Election Relief (Rev. Proc. 2013-30) Form Generator',
      'Commercial Property Insurance Claim Supplement Forensics (Xactimate)',
      'Contingency Recovery Agreement & Proof of Loss Dossier'
    ],
    keyOutcome: 'Recovers thousands in abated IRS penalties and tens of thousands in underpaid storm claims for clients.',
    recommendedAction: 'Review pending client IRS notices or property damage estimates for instant recovery filings.',
    shortcutTabs: ['ecosystem_opps', 'website_hub', 'conversion']
  },
  {
    id: 'tax_prep_software',
    label: '📑 Tax Prep & Return Engine',
    shortLabel: 'Tax Prep Software',
    icon: '📑',
    category: 'Tax & Defense',
    whatItDoes: 'Complete in-app tax return preparation and e-file engine supporting Form 1040 individual returns, Form 1120-S S-Corporations, and Form 1065 partnerships via Column Tax API gateway.',
    whatsOnIt: [
      'Step-by-Step Interactive Tax Return Preparation Wizard',
      'Form 1040, 1120-S, 1065 & 1120 Automatic Tax Bracket Calculation',
      'Section 179 Vehicle Depreciation & QBI Deduction Optimizer',
      'Direct Column Tax / IRS MeF E-File Transmission Simulator & Telemetry Log',
      'Active Client Tax Returns Ledger & Draft Management'
    ],
    keyOutcome: 'Allows firm clients and staff to prepare and e-file tax returns completely inside CFO TAX PRO LLC.',
    recommendedAction: 'Start a new 1040 or 1120-S return in the preparation wizard to compute live federal tax liabilities.',
    shortcutTabs: ['tax_claims', 'conversion', 'pipeline']
  },
  {
    id: 'capture',
    label: '1. Lead Capture & Intake',
    shortLabel: 'Lead Capture',
    icon: '🎯',
    category: 'Client Acquisition',
    whatItDoes: 'Houses high-converting intake forms, interactive client onboarding questionnaires, and instant lead routing webhooks.',
    whatsOnIt: [
      'Multi-Domain Lead Capture Form & Field Customizer',
      'Interactive Tax Savings Calculator Form Widget',
      'Instant Lead Notification Webhook & Auto-Dispatcher',
      'Client Document Upload Secure Portal Link'
    ],
    keyOutcome: 'Captures full client financial profile (revenue, entity type, pain points) before the first call.',
    recommendedAction: 'Test the live intake form to see how leads automatically flow into your CRM.',
    shortcutTabs: ['nurture', 'pipeline', 'website_hub']
  },
  {
    id: 'trust',
    label: '2. Trust Builders',
    shortLabel: 'Trust Builders',
    icon: '🛡️',
    category: 'Client Acquisition',
    whatItDoes: 'Displays verified Dallas licensing, IRS Enrolled Agent credentials (PTIN: P01507635), client case studies, and security badges to instantly eliminate client hesitation.',
    whatsOnIt: [
      'IRS License & Dallas EIN Verification Badges',
      'Verifiable Client Case Study Cards with $ Dollar ROI',
      'Google Review Embed Snippets & 5-Star Badges',
      'Treasury Circular 230 Representation Guarantee'
    ],
    keyOutcome: 'Builds instant authority and justifies premium pricing ($1,500–$4,500 retainers).',
    recommendedAction: 'Copy verified trust badges into your outbound proposals and email signatures.',
    shortcutTabs: ['website_hub', 'conversion', 'audit']
  },
  {
    id: 'nurture',
    label: '3. Auto Nurture',
    shortLabel: 'Auto Nurture',
    icon: '⚡',
    category: 'Client Acquisition',
    whatItDoes: 'Automates multi-channel follow-up sequences (Email, SMS, and WhatsApp) so no warm lead goes cold.',
    whatsOnIt: [
      '5-Day Automated Nurture Email Sequence (Pre-Call & Post-Call)',
      'Instant SMS Confirmation & 1-Hour Reminder Automation',
      'Value-Add Educational Drip on S-Corp Tax Deductions',
      'Lead Reactivation Campaign for Past 90-Day Prospects'
    ],
    keyOutcome: 'Increases strategy call show-up rates from 60% to 92%+ automatically.',
    recommendedAction: 'Activate the automated SMS reminder sequence to reduce no-shows.',
    shortcutTabs: ['capture', 'conversion', 'ai_agents']
  },
  {
    id: 'conversion',
    label: '4. Deal Desk & Invoicing',
    shortLabel: 'Deal Desk',
    icon: '💳',
    category: 'Revenue & Monetization',
    whatItDoes: 'Streamlines one-call closes with dynamic fee schedules, digital retainer agreements, Stripe card processing, and invoice generation.',
    whatsOnIt: [
      '1-Click Service Retainer Generator ($1,500 / $2,500 / $4,500)',
      'Digital Signature Retainer Agreement Generator',
      'Stripe & Direct ACH Payment Processing Desk',
      'Automated Paid Receipt & Welcome Onboarding Email'
    ],
    keyOutcome: 'Collects deposits and signs client agreements while still on the consultation call.',
    recommendedAction: 'Issue a custom retainer invoice to move a prospect from Qualified to Paid.',
    shortcutTabs: ['daily_revenue', 'pipeline', 'owner_ops']
  },
  {
    id: 'pipeline',
    label: '5. Revenue CRM',
    shortLabel: 'Revenue CRM',
    icon: '📈',
    category: 'Revenue & Monetization',
    whatItDoes: 'Visual Kanban pipeline tracking leads from New Capture -> Qualified -> Proposal Sent -> Closed/Paid across all 6 service verticals.',
    whatsOnIt: [
      'Drag-and-Drop Visual Kanban Pipeline',
      'Total Pipeline Value ($) and Weighted Forecast Tracker',
      'Lead Status Filter by Vertical (Tax, CFO, Claims, Bookkeeping)',
      '1-Click Status Update & Activity Log Notes'
    ],
    keyOutcome: 'Maintains complete visibility over every active deal and projected revenue.',
    recommendedAction: 'Review deals in "Proposal Sent" stage and trigger follow-up nurture.',
    shortcutTabs: ['daily_revenue', 'conversion', 'smart_business']
  },
  {
    id: 'listings',
    label: '6. Listings Management',
    shortLabel: 'Listings Management',
    icon: '📍',
    category: 'Client Acquisition',
    whatItDoes: 'Manages local Dallas directory presence across Google Business Profile, Apple Maps, Yelp, and BBB to dominate local high-intent search traffic.',
    whatsOnIt: [
      'Google Business Profile Optimization Checklist',
      'Local NAP (Name, Address, Phone) Consistency Auditor',
      'Review Generation Link & QR Code Creator',
      'Local DFW Geo-Targeted Keywords Matrix'
    ],
    keyOutcome: 'Drives consistent organic inbound phone calls from local Dallas business owners.',
    recommendedAction: 'Send the 1-click review generation link to recently closed clients.',
    shortcutTabs: ['website_hub', 'trust', 'capture']
  },
  {
    id: 'checklist',
    label: '7. System Checklist',
    shortLabel: 'System Checklist',
    icon: '📋',
    category: 'Operations & Systems',
    whatItDoes: 'Step-by-step master checklist ensuring your website, payments, AI chatbots, legal disclosures, and DNS records are 100% active and verified.',
    whatsOnIt: [
      'Interactive Launch Readiness Scorecard (0–100%)',
      'Step-by-Step Task Completion Toggles',
      'Verification Links & Quick-Fix Actions for each requirement',
      'System State Persistence in Local Storage'
    ],
    keyOutcome: 'Ensures zero operational oversights before scaling marketing or ads.',
    recommendedAction: 'Complete remaining unchecked items to achieve 100% System Launch Readiness.',
    shortcutTabs: ['audit', 'owner_ops', 'website_hub']
  },
  {
    id: 'owner_ops',
    label: '8. Owner Ops Blueprint',
    shortLabel: 'Owner Ops Blueprint',
    icon: '👑',
    category: 'Operations & Systems',
    whatItDoes: 'The founder’s operating manual: daily routines, staffing delegation playbooks, contractor management, and standard operating procedures (SOPs).',
    whatsOnIt: [
      'Owner Daily 15-Minute Revenue Routine Checklist',
      'Staffing & VA Delegation SOPs for Bookkeeping & Tax Prep',
      'Profit Margin Optimization & Salary Extraction Rules',
      'Quarterly Tax Planning Calendar & Filing Deadlines'
    ],
    keyOutcome: 'Allows the firm owner to step out of low-value busywork and focus purely on high-margin advisory.',
    recommendedAction: 'Follow the 15-Minute Daily Morning Routine to run high-leverage revenue actions.',
    shortcutTabs: ['smart_business', 'daily_revenue', 'checklist']
  },
  {
    id: 'ai_stack',
    label: '9. AI Studio & Chatbot',
    shortLabel: 'AI Studio & Chatbot',
    icon: '🤖',
    category: 'Autonomous AI',
    whatItDoes: 'Interactive AI Chatbot playground and studio trained on IRS regulations, Form 2553 rules, Section 179 depreciation, and commercial claims forensics.',
    whatsOnIt: [
      'Live 24/7 AI Client Intake Chatbot Tester',
      'Custom System Prompt Editor & Domain Persona Switcher',
      'Embed Code Generator for Public Website Integration',
      'Direct Lead Capture & Auto-CRM sync from Chat'
    ],
    keyOutcome: 'Captures and qualifies web visitors at 2 AM with expert, IRS-compliant answers.',
    recommendedAction: 'Test a sample tax question in the simulator and copy the embed code to your site.',
    shortcutTabs: ['ai_agents', 'website_hub', 'capture']
  },
  {
    id: 'ai_agents',
    label: '10. Autonomous AI Agents',
    shortLabel: 'Autonomous AI Agents',
    icon: '⚡',
    category: 'Autonomous AI',
    whatItDoes: 'Fleet of 5 specialized autonomous AI worker agents continuously executing lead triage, tax notice diagnostics, email outreach, claim audits, and cash forecasting.',
    whatsOnIt: [
      'Agent 1: Inbound Lead Triage & Qualification Agent',
      'Agent 2: IRS Notice & Penalty Abatement Specialist',
      'Agent 3: Outbound Prospector & Cold Outreach Agent',
      'Agent 4: Commercial Claims Scope Forensics Agent',
      'Agent 5: AI Fractional CFO Cash Flow Sentinel',
      'Live Autonomous Execution Log & Activity Feed'
    ],
    keyOutcome: 'Replaces 40+ hours of manual administrative and diagnostic work per week with automated AI execution.',
    recommendedAction: 'Trigger the Inbound Lead Triage Agent on your newest leads to auto-score qualification.',
    shortcutTabs: ['ai_stack', 'smart_business', 'daily_revenue']
  }
];
