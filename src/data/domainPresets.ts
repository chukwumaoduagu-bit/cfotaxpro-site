import { RevenueDomain } from '../types';

export const DOMAIN_PRESETS: RevenueDomain[] = [
  {
    id: 'tax_prep',
    name: 'Tax Prep & Resolution (CFO TAX PRO LLC)',
    tagline: 'Maximize refunds, resolve IRS back taxes, and eliminate audit risks with CFO TAX PRO LLC.',
    avgRevenue: 1500,
    revenueType: 'One-time',
    icon: 'Calculator',
    description: 'High-ticket tax filing, IRS offer in compromise, audit defense, and corporate tax structuring by CFO TAX PRO LLC.',
    defaultHeadline: 'CFO TAX PRO LLC: Guaranteed Maximum Refund & IRS Audit Defense',
    defaultSubheadline: 'Stop leaving money on the table or living with IRS stress. The certified tax specialists at CFO TAX PRO LLC deliver max deductions and complete tax protection.',
    bulletPoints: [
      'Average client tax savings of $6,400+ per filing season',
      'Direct IRS Enrolled Agent (EA) & Certified Tax Strategist representation',
      'Rapid 48-hour turnarounds with 100% accuracy guarantee'
    ],
    targetAudience: 'Small Business Owners, LLCs, 1099 Contractors, High-Income Earners',
    objections: ['Price is too high', 'I can file myself on TurboTax', 'My accountant already handles it'],
    sampleReviews: [
      { author: 'Marcus Vance', role: 'Agency Founder', rating: 5, text: 'CFO TAX PRO LLC saved our agency $14,200 on corporate tax liabilities in our first year. Their tax resolution team is unmatched.', company: 'Vance Digital Media' },
      { author: 'Elena Rostova', role: 'Global Consultant', rating: 5, text: 'Fast, bulletproof tax preparation with zero stress. CFO TAX PRO LLC answered every question and defended our deductions.', company: 'Rostova Global Advisory' }
    ],
    certifications: ['IRS Enrolled Agent (EA) Certified', 'NATP Member (National Association of Tax Professionals)', 'AICPA Strategic Tax Partner']
  },
  {
    id: 'consulting',
    name: 'Fractional CFO & Advisory (CFO TAX PRO LLC)',
    tagline: 'Strategic financial leadership, tax-minimized cash flow, and executive scaling by CFO TAX PRO LLC.',
    avgRevenue: 2500,
    revenueType: 'Recurring / Mo',
    icon: 'Briefcase',
    description: 'Executive-level CFO advisory, profit margin optimization, budget forecasting, and tax planning.',
    defaultHeadline: 'Scale Your Profitability with Fractional CFO Services from CFO TAX PRO LLC',
    defaultSubheadline: 'Gain the financial clarity of a Fortune 500 CFO without the $250k full-time executive salary.',
    bulletPoints: [
      'Monthly KPI dashboard, cash flow forecasting, & burn rate analysis',
      'Proactive quarterly tax minimization strategies',
      'Direct 1-on-1 monthly strategic growth sessions with senior CFO team'
    ],
    targetAudience: 'Growing LLCs, B2B Founders, Multi-Location Service Businesses',
    objections: ['Will this work for my specific industry?', 'We aren\'t big enough for a CFO yet'],
    sampleReviews: [
      { author: 'David Chen', role: 'CEO', rating: 5, text: 'Partnering with CFO TAX PRO LLC as our Fractional CFO increased our net profit margins by 18% in just 90 days.', company: 'Apex Solutions' }
    ],
    certifications: ['Certified Fractional CFO Institute', 'Certified Management Accountant', 'SBA Financial Advisor']
  },
  {
    id: 'bookkeeping',
    name: 'Monthly Bookkeeping & Payroll (CFO TAX PRO LLC)',
    tagline: 'Tax-ready, pristine financial records delivered monthly by CFO TAX PRO LLC.',
    avgRevenue: 600,
    revenueType: 'Recurring / Mo',
    icon: 'BookOpen',
    description: 'Full-service monthly reconciliation, P&L generation, expense categorizing, and tax-ready balance sheets.',
    defaultHeadline: 'Stress-Free Monthly Bookkeeping & Financial Clarity',
    defaultSubheadline: 'CFO TAX PRO LLC keeps your books reconciled, tax-ready, and 100% compliant every single month.',
    bulletPoints: [
      'Monthly P&L, Balance Sheet, and Cash Flow reconciliation',
      'Seamless QuickBooks, Xero, and bank account synchronization',
      'Dedicated CFO TAX PRO LLC bookkeeper auditing your accounts weekly'
    ],
    targetAudience: 'E-commerce Brands, Local Service Businesses, Professional Agencies',
    objections: ['We do our own bookkeeping', 'Is it expensive month-to-month?'],
    sampleReviews: [
      { author: 'Sarah Jenkins', role: 'E-com Founder', rating: 5, text: 'I finally know exact profit margins every Friday without spending hours in spreadsheets thanks to CFO TAX PRO LLC.', company: 'Lumiere Wear' }
    ],
    certifications: ['QuickBooks Advanced ProAdvisor', 'Xero Certified Gold Partner']
  },
  {
    id: 'business_credit',
    name: 'Business Credit & Capital (CFO TAX PRO LLC)',
    tagline: 'Build $50k–$250k in business credit without using personal guarantees.',
    avgRevenue: 3500,
    revenueType: 'One-time',
    icon: 'CreditCard',
    description: 'Corporate credit profiling, Tier 1-4 vendor lines, and high-limit credit access powered by CFO TAX PRO LLC.',
    defaultHeadline: 'CFO TAX PRO LLC: Access Up to $250,000 in Unsecured Business Credit',
    defaultSubheadline: 'Separate your personal credit from your company while securing high-limit working capital to expand.',
    bulletPoints: [
      'No personal credit check or SSN guarantee required',
      'Direct reporting to D&B, Experian, & Equifax Business credit bureaus',
      'Guaranteed credit line approvals guided by CFO TAX PRO LLC specialists'
    ],
    targetAudience: 'Real Estate Investors, LLC Owners, Franchise Buyers',
    objections: ['Is this legal?', 'My personal credit score is low'],
    sampleReviews: [
      { author: 'Terrence Smith', role: 'Real Estate Investor', rating: 5, text: 'CFO TAX PRO LLC helped us get approved for $85,000 in business credit lines at 0% APR. Outstanding service.', company: 'TS Capital' }
    ],
    certifications: ['Dun & Bradstreet Verified Partner', 'National Association of Certified Credit Counselors']
  },
  {
    id: 'tech_stack_cfo',
    name: 'Tech Stack & SaaS Advisory (CFO TAX PRO LLC)',
    tagline: 'Maximize R&D tax credits, cloud infrastructure ROI, and SaaS unit economics with CFO TAX PRO LLC.',
    avgRevenue: 3000,
    revenueType: 'Recurring / Mo',
    icon: 'Zap',
    description: 'Specialized financial advisory for software platforms, tech stacks, AI startups, and cloud infrastructure optimization.',
    defaultHeadline: 'CFO TAX PRO LLC: Tech Stack Financial Scaling & R&D Tax Credits',
    defaultSubheadline: 'Unbolt massive R&D tax credits and streamline your cloud software tech stack with precision financial engineering.',
    bulletPoints: [
      'Claim up to $250,000+ in federal & state R&D tax credits for software development',
      'Optimize API, AWS/GCP cloud stack expenditure & tech vendor software margins',
      'SaaS financial modeling: CAC, LTV, ARR, NDR, and investor-ready reporting'
    ],
    targetAudience: 'Tech Founders, SaaS Companies, AI Agencies, Software Scaleups',
    objections: ['Our developers write standard code, does it qualify for R&D credit?', 'We already track cloud costs'],
    sampleReviews: [
      { author: 'Chukwuma O.', role: 'Tech Founder', rating: 5, text: 'CFO TAX PRO LLC claimed $82,000 in software R&D tax credits for our AI stack. Their tech-focused financial expertise is unmatched.', company: 'Smart Tech AI Studio' }
    ],
    certifications: ['Certified SaaS Financial Analyst', 'IRS Section 41 R&D Credit Specialist', 'AICPA Tech Practice Group']
  },
  {
    id: 'claims_adjusting',
    name: 'Insurance & Commercial Claims Consulting',
    tagline: 'Maximize property, disaster & commercial insurance settlement payouts with expert public claim adjusters.',
    avgRevenue: 4500,
    revenueType: 'Commission',
    icon: 'ShieldCheck',
    description: 'Independent licensed claim adjusters & consultants negotiating directly against insurance companies to maximize settlement funds.',
    defaultHeadline: 'Insurance Claim Consulting: Maximize Property & Commercial Settlement Payouts',
    defaultSubheadline: 'Insurance companies routinely underpay claims by 40-300%. Our expert claims consultants fight for your full entitlement with zero upfront fee.',
    bulletPoints: [
      'Zero upfront fees — 100% contingency fee model (we only collect when you win your settlement)',
      'Comprehensive structural damage assessment, thermal imaging, & forensic loss reporting',
      'Re-open historical denied, delayed, or underpaid claims for up to 3 years post-loss'
    ],
    targetAudience: 'Commercial Property Owners, HOA Boards, Industrial Operators, High-Value Homeowners',
    objections: ['Won\'t my insurance policy be cancelled?', 'The insurance company already sent an adjuster', 'How long does the claim review take?'],
    sampleReviews: [
      { author: 'Angela Delgado', role: 'Commercial Owner', rating: 5, text: 'The insurer offered $18,000 for roof & water damage. Claims Consulting team renegotiated and secured $74,500.', company: 'Delgado Plaza Commercial Center' },
      { author: 'Robert Sterling', role: 'HOA Board President', rating: 5, text: 'Secured $340,000 for hurricane wind damage after initial claim was flatly denied by insurer.', company: 'Oakridge Condominiums' }
    ],
    certifications: ['Licensed State Public Adjuster (#PA-99201)', 'NAPIA Senior Member', 'IICRC Certified Master Inspector']
  },
  {
    id: 'medical_claims_consulting',
    name: 'Healthcare & Medical Claims Consulting',
    tagline: 'Audit medical bills, appeal denied health claims, & reduce out-of-pocket hospital costs.',
    avgRevenue: 2200,
    revenueType: 'Commission',
    icon: 'Activity',
    description: 'Patient & medical provider advocacy recovering wrongful insurance denials and billing errors.',
    defaultHeadline: 'Medical Claims Consulting: Eliminate Unfair Hospital Bills & Claim Denials',
    defaultSubheadline: 'Over 80% of complex medical bills contain coding errors. Our medical billing consultants audit charges and overturn claim denials.',
    bulletPoints: [
      'Deep-dive audit of CPT codes, line-item charges, and out-of-network balance billing',
      'Formal ERISA & insurance appeal filing for surprise medical bills',
      'Average reduction of 45–70% on disputed medical claim balances'
    ],
    targetAudience: 'Patients with High Medical Bills, Self-Insured Employers, Medical Practice Owners',
    objections: ['Can insurance denials actually be overturned?', 'Is my private health data protected under HIPAA?'],
    sampleReviews: [
      { author: 'Dr. Evelyn Carter', role: 'Practice Director', rating: 5, text: 'Recovered $112,000 in wrongfully denied insurance claims for our surgical clinic in 60 days.', company: 'Metro Surgical Group' }
    ],
    certifications: ['Certified Medical Reimbursement Specialist (CMRS)', 'HIPAA Compliant Practice', 'Patient Advocate Board Certified']
  },
  {
    id: 'franchise',
    name: 'Franchise Advisory & Sales',
    tagline: 'Match buyers with top-performing recession-proof franchise opportunities.',
    avgRevenue: 3500,
    revenueType: 'Commission',
    icon: 'Building2',
    description: 'Connecting entrepreneurs with vetted franchise models and funding guidance.',
    defaultHeadline: 'Own a High-Margin, Recession-Proof Franchise',
    defaultSubheadline: 'Find the ideal franchise that fits your budget, goals, and lifestyle with expert guidance at zero cost to you.',
    bulletPoints: [
      'Access to 500+ top-rated franchise brands',
      'Free consultation & funding pre-qualification',
      'Complete FDD analysis and franchisee benchmark reports'
    ],
    targetAudience: 'Aspiring Franchisees, Corporate Career Changers, Multi-unit Investors',
    objections: ['I don\'t have $500k cash', 'Franchises have too many fees'],
    sampleReviews: [
      { author: 'Brian K.', role: 'Franchise Owner', rating: 5, text: 'Guided me seamlessly into a 3-unit restoration franchise. Expected ROI is incredible.', company: 'CleanTech Multi-Unit' }
    ],
    certifications: ['International Franchise Association Certified', 'FBA Accredited']
  }
];

export const INITIAL_CHECKLIST: import('../types').ChecklistStep[] = [
  {
    id: 1,
    action: 'Build a landing page with the 5-layer structure',
    element: 'Lead Capture Landing Page',
    whyItWorks: 'Establishes instant domain authority and collects visitor interest 24/7.',
    status: 'In Progress',
    guideText: 'Ensure your hero section has a benefit-driven headline, subheadline, 3 proof bullet points, and a primary call-to-action button.'
  },
  {
    id: 2,
    action: 'Add lead capture forms and call tracking',
    element: 'Lead Forms & Call Tracking',
    whyItWorks: 'Captures intent instantly across forms, chat, and phone calls before prospects leave.',
    status: 'In Progress',
    guideText: 'Embed a 3-field form (Name, Email, Phone) and display a clear tracking phone number.'
  },
  {
    id: 3,
    action: 'Add trust signals (reviews, logos, certs)',
    element: 'Trust Builders Studio',
    whyItWorks: 'Reduces buyer anxiety and establishes industry legitimacy in seconds.',
    status: 'Pending',
    guideText: 'Include at least 2 real or representative client testimonials, official certification badges, and company logos.'
  },
  {
    id: 4,
    action: 'Set up automated follow-ups (Email/SMS)',
    element: 'Automated Nurture Hub',
    whyItWorks: 'Follows up with 80% of leads that aren\'t ready to buy on touchpoint 1.',
    status: 'Pending',
    guideText: 'Configure a 4-step sequence: Welcome Email (Day 1), SMS check-in (Day 2), Case Study (Day 4), Final Call to Action (Day 7).'
  },
  {
    id: 5,
    action: 'Connect booking and payment tools',
    element: 'Conversion & Payment Suite',
    whyItWorks: 'Enables instant self-service booking and immediate deposit collection.',
    status: 'Pending',
    guideText: 'Connect Calendly-style scheduling slots and Stripe-style deposit collection.'
  },
  {
    id: 6,
    action: 'Start driving traffic (social, referrals, ads)',
    element: 'Traffic & Distribution Engine',
    whyItWorks: 'Feeds prospects into your automated system daily.',
    status: 'Pending',
    guideText: 'Post organic value content on LinkedIn/Facebook, reach out to partners for 20-30% referral commissions.'
  },
  {
    id: 7,
    action: 'Deliver the service and collect payment',
    element: 'Scalable Delivery & Recurring Revenue',
    whyItWorks: 'Satisfied customers generate repeat monthly subscriptions and referral business.',
    status: 'Pending',
    guideText: 'Deliver your standard service, collect final balance, and send automated review request.'
  }
];
