import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Clock, 
  DollarSign, 
  Building2, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MapPin, 
  Calculator, 
  Bot, 
  Sparkles, 
  MessageSquare, 
  Award, 
  Check, 
  Send,
  ExternalLink,
  Lock,
  Search,
  Flame,
  Zap,
  TrendingUp,
  Scale,
  Briefcase,
  HelpCircle,
  RefreshCw,
  Layers,
  ChevronRight,
  UserCheck,
  Compass,
  FileSpreadsheet,
  PieChart,
  Percent,
  Landmark,
  Share2
} from 'lucide-react';
import { CfoTaxProLogo } from './CfoTaxProLogo';

interface PublicWebsiteViewProps {
  onBackToDashboard?: () => void;
  onOpenChatbot?: () => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = ({
  onBackToDashboard,
  onOpenChatbot
}) => {
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'details' | 'success'>('details');
  const [selectedService, setSelectedService] = useState('Tax Prep & S-Corp Resolution ($1,500)');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '2026-08-06',
    preferredTime: '10:00 AM CST',
    notes: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Industry Preset Selector in Hero
  const [heroIndustry, setHeroIndustry] = useState<'real_estate' | 'contractor' | 'medical' | 'logistics' | 'consulting'>('real_estate');

  const industryPresets = {
    real_estate: {
      name: 'Real Estate & STR Operators',
      estSavings: '$35,000 – $140,000',
      keyStrategy: 'Cost Segregation (IRC §168k) & Active STR Paper Losses',
      proof: 'Unlocked $180k Year-1 depreciation for Dallas multi-family portfolio'
    },
    contractor: {
      name: 'Commercial & Roofing Contractors',
      estSavings: '$45,000 – $120,000',
      keyStrategy: 'Section 179 Heavy Truck & Storm Insurance Supplements',
      proof: 'Recovered $113k supplement + 100% equipment tax write-offs'
    },
    medical: {
      name: 'Healthcare & Dental Practices',
      estSavings: '$28,000 – $65,000',
      keyStrategy: 'S-Corp FICA Arbitrage & Medical Equipment Acceleration',
      proof: 'Eliminated $28.4k in self-employment tax in Year 1'
    },
    logistics: {
      name: 'Freight & Fleet Logistics',
      estSavings: '$30,000 – $90,000',
      keyStrategy: 'IRS Payroll Notice Abatement & Fleet Depreciation',
      proof: 'Abated $28k in 941 payroll penalties and structured fleet write-off'
    },
    consulting: {
      name: 'Consultants & Tech Agencies',
      estSavings: '$18,000 – $45,000',
      keyStrategy: 'Texas S-Corp Form 2553 & Accountable Expense Plans',
      proof: 'Restructured $350k 1099 income saving $24,500/year in cash'
    }
  };

  // Interactive Tax Calculator State
  const [calcRevenue, setCalcRevenue] = useState(375000);
  const [calcExpenses, setCalcExpenses] = useState(125000);
  const [calcEntityType, setCalcEntityType] = useState<'LLC' | 'SoleProp' | 'SCorp'>('LLC');
  const [includeSection179, setIncludeSection179] = useState(true);
  const [includeAccountablePlan, setIncludeAccountablePlan] = useState(true);

  // Calculate dynamic savings
  const netIncome = Math.max(0, calcRevenue - calcExpenses);
  const ficaArbitrageSavings = calcEntityType === 'SCorp' 
    ? Math.round(netIncome * 0.08) 
    : Math.round(netIncome * 0.153 * 0.58);
  const section179Benefit = includeSection179 ? 8500 : 0;
  const accountablePlanBenefit = includeAccountablePlan ? 4200 : 0;
  const estimatedTaxSavings = ficaArbitrageSavings + section179Benefit + accountablePlanBenefit;

  // 60-Second Tax Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState<number>(0); // 0 = start, 1..4 = questions, 5 = result
  const [quizAnswers, setQuizAnswers] = useState({
    entityType: 'LLC',
    annualProfit: '$100k - $300k',
    hasReasonableSalary: 'No',
    boughtAssets: 'Yes',
    hasIrsNotice: 'No'
  });
  const [quizScore, setQuizScore] = useState<number>(45);

  const calculateQuizResult = () => {
    let score = 50;
    if (quizAnswers.hasReasonableSalary === 'No') score -= 20;
    if (quizAnswers.boughtAssets === 'Yes') score += 15;
    if (quizAnswers.hasIrsNotice === 'Yes') score -= 15;
    setQuizScore(Math.max(25, Math.min(95, score)));
    setQuizStep(5);
  };

  // Claims Recovery Calculator State
  const [claimsInitialOffer, setClaimsInitialOffer] = useState(45000);
  const [claimsActualDamage, setClaimsActualDamage] = useState(135000);
  const claimsEstimatedRecovery = Math.max(0, claimsActualDamage - claimsInitialOffer);

  // Active Service Category Filter Tab
  const [activeServiceCategory, setActiveServiceCategory] = useState<'all' | 'tax_scorp' | 'fractional_cfo' | 'claims' | 'cost_seg' | 'bookkeeping'>('all');

  // FAQ Search & Category Filter State
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'tax_scorp' | 'claims' | 'irs_defense' | 'fees'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Live In-Page AI Copilot State
  const [quickTaxQuestion, setQuickTaxQuestion] = useState('');
  const [aiCopilotAnswer, setAiCopilotAnswer] = useState<string | null>(null);
  const [isLoadingCopilot, setIsLoadingCopilot] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Tax Prep & S-Corp Resolution ($1,500)',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Handle Contact Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          domain: contactForm.serviceInterest,
          domainId: 'tax_resolution',
          notes: contactForm.message,
          source: 'Website Contact Form',
          value: 1500
        })
      });
      setContactSubmitted(true);
    } catch (err) {
      setContactSubmitted(true);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Handle Booking Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          company: bookingForm.company,
          domain: selectedService,
          domainId: 'tax_resolution',
          notes: `Strategy Session Booked for ${bookingForm.preferredDate} at ${bookingForm.preferredTime}. Notes: ${bookingForm.notes}`,
          source: 'Website Consultation Booking',
          status: 'Call Booked',
          value: selectedService.includes('2,500') ? 2500 : selectedService.includes('4,500') ? 4500 : 1500
        })
      });
      setBookingStep('success');
    } catch (err) {
      setBookingStep('success');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Handle Quick AI Tax Question
  const handleAskQuickTax = async (presetQuestion?: string) => {
    const q = presetQuestion || quickTaxQuestion;
    if (!q) return;
    setIsLoadingCopilot(true);
    try {
      const res = await fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          domainId: 'tax_resolution'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiCopilotAnswer(data.response || data.text || 'Our Dallas IRS Enrolled Agent team can optimize this write-off.');
      } else {
        setAiCopilotAnswer(
          "Under IRS IRC Section 179 and Treasury Circular 230 guidelines, eligible business assets and vehicles over 6,000 lbs qualify for up to 100% first-year bonus depreciation. Operating as an S-Corporation further shelters net income from the 15.3% self-employment tax. Book a 15-minute review with Chukwuma Oduagu, EA (PTIN: P01507635) to model your exact savings."
        );
      }
    } catch (e) {
      setAiCopilotAnswer(
        "Under IRS IRC Section 179 and Treasury Circular 230 guidelines, eligible business assets and vehicles over 6,000 lbs qualify for up to 100% first-year bonus depreciation. Operating as an S-Corporation further shelters net income from the 15.3% self-employment tax. Book a 15-minute review with Chukwuma Oduagu, EA (PTIN: P01507635) to model your exact savings."
      );
    } finally {
      setIsLoadingCopilot(false);
    }
  };

  const servicesList = [
    {
      id: 'tax_prep',
      category: 'tax_scorp',
      title: "Tax Prep & S-Corp Resolution",
      price: "$1,500",
      period: "Retainer / Filing",
      irsCode: "Form 1120-S, 1065, 1040 & IRS Rev. Proc. 2013-30",
      idealFor: "S-Corps, LLCs, and 1099 business owners seeking aggressive audit defense and deduction maximization.",
      description: "Comprehensive corporate and personal tax filing combined with First-Time Penalty Abatements (FTA), back tax resolution, and S-Corp structure optimization.",
      features: [
        "Form 1120-S, 1065, or 1040 Preparation",
        "IRS Penalty Abatement Filing (FTA Defense)",
        "Section 179 Heavy Asset & Vehicle Write-Offs",
        "Direct Enrolled Agent Representation (PTIN: P01507635)"
      ],
      badge: "Most Popular",
      cta: "Book Tax Strategy Session"
    },
    {
      id: 'fractional_cfo',
      category: 'fractional_cfo',
      title: "Fractional CFO Advisory",
      price: "$2,500",
      period: "per month",
      irsCode: "Reasonable Salary & Treasury Management",
      idealFor: "Growing companies ($500k–$5M revenue) needing executive financial leadership and profit extraction strategies.",
      description: "Executive-level financial leadership. Strategic cash flow forecasting, working capital optimization, reasonable officer salary calibration, and quarterly board briefings.",
      features: [
        "Monthly Financial Review & Executive KPI Briefing",
        "Cash Flow & Working Capital Runway Forecasting",
        "Tax-Advantaged Profit Extraction Roadmap",
        "Quarterly Entity & S-Corp Compliance Review"
      ],
      badge: "Executive Tier",
      cta: "Engage Fractional CFO"
    },
    {
      id: 'commercial_claims',
      category: 'claims',
      title: "Commercial Claims Consulting",
      price: "$4,500",
      period: "Contingency Aligned",
      irsCode: "Forensic Xactimate Scope & IRC §460",
      idealFor: "Commercial building owners, property managers, and roofing contractors facing underpaid casualty/storm claims.",
      description: "Forensic insurance claim recovery for hail, wind, and water property damage. We reconstruct undervalued insurer scopes and recover substantial supplemental settlements.",
      features: [
        "Forensic Policy & Underpayment Scope Audit",
        "Itemized Xactimate Estimate Reconstruction",
        "Insurer Negotiation & Settlement Supplement Defense",
        "Contingency-Based Success Aligned Fee Structure"
      ],
      badge: "Contingency",
      cta: "Request Claim Forensic Audit"
    },
    {
      id: 'cost_segregation',
      category: 'cost_seg',
      title: "Cost Segregation & Accelerated Depreciation",
      price: "$5,000 – $15,000",
      period: "per study",
      irsCode: "IRC §168(k) & §1245/§1250",
      idealFor: "Commercial property owners, multi-family investors, and Short-Term Rental (STR) Airbnb operators.",
      description: "Engineering-based asset reclassification accelerating 27.5 and 39-year building depreciation into 5, 7, and 15-year property for massive immediate Year-1 paper deductions.",
      features: [
        "Full Engineering-Based Asset Segregation Study",
        "Form 3115 Retroactive Catch-Up Depreciation Lookback",
        "Contemporaneous Audit Defense Dossier Signed by EA",
        "Immediate $50k–$200k+ First-Year Tax Deduction"
      ],
      badge: "High ROI",
      cta: "Schedule Cost Seg Study"
    },
    {
      id: 'bookkeeping',
      category: 'bookkeeping',
      title: "Monthly Bookkeeping & Payroll",
      price: "$600",
      period: "per month",
      irsCode: "Accrual / Cash GAAP Reconciliations",
      idealFor: "Active business owners who want pristine financial statements and zero year-end tax panic.",
      description: "Flawless monthly reconciliations, clean profit & loss statements, balance sheets, automated payroll compliance, and 1099-NEC contractor filings.",
      features: [
        "Monthly Bank, Credit Card & Merchant Reconciliations",
        "Monthly Financial Statements (P&L, Balance Sheet)",
        "Automated Payroll Setup & Direct Deposit Processing",
        "Year-End 1099 & W-2 Preparation & Filing"
      ],
      badge: "Essential",
      cta: "Start Monthly Bookkeeping"
    },
    {
      id: 'entity_formation',
      category: 'tax_scorp',
      title: "Texas S-Corp Entity Formation Concierge",
      price: "$997",
      period: "one-time",
      irsCode: "Form 2553 & Texas Secretary of State",
      idealFor: "Solopreneurs and 1099 contractors earning over $60k net profit who are overpaying 15.3% self-employment tax.",
      description: "Turnkey Dallas entity formation, Texas Secretary of State filing, expedited EIN issuance, late S-Corp election relief (Rev. Proc. 2013-30), and Corporate Transparency Act BOI compliance.",
      features: [
        "Articles of Organization & Texas SOS Filing",
        "IRS Form 2553 S-Election & Late Filing Relief",
        "Corporate Bylaws & Banking Resolution",
        "Mandatory FinCEN Corporate Transparency (BOI) Filing"
      ],
      badge: "Turnkey",
      cta: "Form S-Corp in 72h"
    }
  ];

  const filteredServices = activeServiceCategory === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeServiceCategory);

  const testimonialsList = [
    {
      name: "Marcus Vance",
      company: "Dallas Commercial Roofing & Restoration LLC",
      location: "Dallas, TX",
      rating: 5,
      headline: "Recovered $113,000 Supplemental Insurance Payout",
      text: "Our insurer initially offered just $32,000 on a massive commercial hail claim. Chukwuma and the CFO TAX PRO team ran a forensic proof of loss and settled for over $145,000. Absolutely game changing.",
      service: "Commercial Claims Consulting",
      metric: "+$113,000 Cash Recovered",
      sector: "contractor"
    },
    {
      name: "Dr. Elena Rostova",
      company: "Highland Park Dental & Surgical Center",
      location: "Highland Park, TX",
      rating: 5,
      headline: "Saved $28,400 in S-Corp Taxes in Year One",
      text: "We were severely overpaying self-employment tax. They restructured our reasonable salary distributions and implemented Section 179 equipment deductions seamlessly. We recommend them to every medical colleague.",
      service: "Fractional CFO & Tax Advisory",
      metric: "$28,400 Tax Saved",
      sector: "medical"
    },
    {
      name: "Jason Miller",
      company: "North Texas Freight & Logistics Partners",
      location: "Fort Worth, TX",
      rating: 5,
      headline: "Eliminated $28,000 in IRS Payroll Penalties",
      text: "We were facing serious IRS 941 payroll tax notices from a prior accounting mistake. CFO TAX PRO secured a First-Time Penalty Abatement and structured our entire logistics fleet write-off. Flawless execution.",
      service: "IRS Resolution & Defense",
      metric: "$28,000 Penalties Abated",
      sector: "logistics"
    },
    {
      name: "Austin Thorne",
      company: "Lone Star Multi-Family Holdings",
      location: "Plano, TX",
      rating: 5,
      headline: "Unlocked $184,000 Year-1 Cost Segregation Write-Off",
      text: "We acquired a 24-unit apartment complex. CFO TAX PRO conducted a comprehensive engineering Cost Segregation study, wiping out our entire taxable income for the fiscal year legally. Unmatched expertise.",
      service: "Cost Segregation Engineering",
      metric: "$184,000 Write-Off",
      sector: "real_estate"
    }
  ];

  const faqsList = [
    {
      q: "How does the S-Corp Reasonable Salary strategy save me money?",
      a: "When operating as an S-Corporation, business profits distributed above your IRS 'reasonable salary' are legally exempt from the 15.3% self-employment (FICA) tax. For a business netting $200,000, setting a properly documented $80,000 reasonable salary can save over $18,000 annually in payroll taxes.",
      category: "tax_scorp"
    },
    {
      q: "What credentials and licenses do you hold?",
      a: "CFO TAX PRO LLC is an authorized Texas accounting and tax firm (EIN: 27-3243694). Our lead practitioner Chukwuma Oduagu holds active IRS PTIN credentials (P01507635) and Enrolled Agent standing, giving us unlimited representation rights before the Internal Revenue Service in all 50 states under Treasury Circular 230.",
      category: "irs_defense"
    },
    {
      q: "How does your Commercial Claim Consulting contingency structure work?",
      a: "For underpaid storm, hail, or casualty claims on commercial real estate, we perform an initial forensic review at zero risk. If we identify grounds for a supplement, our fee is purely tied to the additional settlement funds we recover for your business.",
      category: "claims"
    },
    {
      q: "How does a Cost Segregation study generate immediate cash flow?",
      a: "Cost Segregation breaks down a commercial or residential rental building into its individual asset components (carpet, electrical, parking lots, specialized plumbing). Instead of waiting 27.5 or 39 years, up to 35% of the purchase price is depreciated in Year 1 using 100% bonus depreciation under IRC §168(k).",
      category: "tax_scorp"
    },
    {
      q: "How quickly can we get started and review my prior tax returns?",
      a: "You can book a 15-minute introductory strategy session right now on our live calendar. After booking, you'll receive a secure client portal link to upload your prior 2 years of business returns (Form 1120-S, 1065, or Schedule C) for our complimentary diagnostic review.",
      category: "fees"
    },
    {
      q: "Where is your office located, and do you serve remote clients?",
      a: "Our direct office is at 6215 Shady Brook Ln, Dallas, TX 75206. We serve local clients across the Dallas-Fort Worth metroplex as well as national clients through our encrypted 24/7 client portal and video strategy calls.",
      category: "fees"
    }
  ];

  const filteredFaqs = faqsList.filter(f => {
    const matchesCategory = activeFaqCategory === 'all' || f.category === activeFaqCategory;
    const matchesSearch = faqSearchQuery === '' || 
      f.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
      f.a.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT & TRUST BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE PUBLIC STOREFRONT • cfotaxprollc.com</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 font-mono">Dallas EIN: 27-3243694 • IRS PTIN: P01507635</span>
            <span className="hidden lg:inline px-2 py-0.5 bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 rounded-full text-[10px] font-bold">
              ⚡ Now Booking Q3/Q4 Tax Strategy
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="tel:4693867235" 
              className="text-emerald-400 hover:text-emerald-300 font-mono font-bold flex items-center space-x-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 hover:border-emerald-500 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(469) 386-7235</span>
            </a>
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-[11px] flex items-center space-x-1 transition shadow-md"
              >
                <span>⚡ Return to Ops Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. STATE-OF-THE-ART PUBLIC NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3.5">
            <CfoTaxProLogo size={48} className="rounded-full shadow-xs ring-2 ring-emerald-500/20" />
            <div>
              <div className="font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                CFO TAX PRO <span className="text-emerald-600">LLC</span>
              </div>
              <div className="text-[11px] text-slate-500 font-bold mt-0.5 flex items-center space-x-1.5">
                <span>Tax Defense</span>
                <span>•</span>
                <span>Fractional CFO</span>
                <span>•</span>
                <span>Claims Recovery</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links with Distinctive Badges */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-extrabold text-slate-600">
            <a href="#services" className="hover:text-emerald-600 transition flex items-center space-x-1">
              <span>Services &amp; Pricing</span>
            </a>
            <a href="#calculator" className="hover:text-emerald-600 transition flex items-center space-x-1">
              <span>Tax Calculator</span>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] rounded font-bold">ROI</span>
            </a>
            <a href="#diagnostic" className="hover:text-emerald-600 transition flex items-center space-x-1">
              <span>60-Sec Risk Quiz</span>
              <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 text-[9px] rounded font-bold">FREE</span>
            </a>
            <a href="#claims" className="hover:text-emerald-600 transition">Claims Recovery</a>
            <a href="#testimonials" className="hover:text-emerald-600 transition">Case Studies</a>
            <a href="#about" className="hover:text-emerald-600 transition">Credentials</a>
            <a href="#faq" className="hover:text-emerald-600 transition">FAQ</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <a
              href="tel:4693867235"
              className="hidden sm:flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>(469) 386-7235</span>
            </a>

            <button
              onClick={() => {
                setSelectedService('Tax Prep & S-Corp Resolution ($1,500)');
                setIsBookingModalOpen(true);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-black flex items-center space-x-2 transition shadow-md hover:shadow-lg hover:scale-102"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Session</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 3. HERO SECTION WITH DYNAMIC INDUSTRY SAVINGS SCANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          <div className="max-w-3xl space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IRS Enrolled Agent PTIN: P01507635 • Dallas EIN: 27-3243694</span>
              <span className="hidden sm:inline text-emerald-500">|</span>
              <span className="text-white font-mono">Treasury Circular 230</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Stop Overpaying the IRS. <br />
              <span className="text-emerald-400">Extract Maximum Cash Flow</span> with Forensic Tax Strategy.
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              CFO TAX PRO LLC empowers business owners, real estate investors, and contractors to legally eliminate tens of thousands in taxes, resolve IRS audit notices, and recover underpaid insurance casualty claims.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedService('Tax Prep & S-Corp Resolution ($1,500)');
                  setIsBookingModalOpen(true);
                }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center space-x-3 transition shadow-xl hover:scale-102"
              >
                <span>Book Free 15-Minute Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#calculator"
                className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Simulate Your Tax Savings</span>
              </a>
            </div>

          </div>

          {/* DYNAMIC INDUSTRY RAPID SCANNER CARD */}
          <div className="p-6 sm:p-7 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-black uppercase text-slate-300 tracking-wider">
                  Instant Industry Tax Potential Scanner
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">Select your business type below:</span>
            </div>

            {/* Industry Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {Object.entries(industryPresets).map(([key, item]) => {
                const isSelected = heroIndustry === key;
                return (
                  <button
                    key={key}
                    onClick={() => setHeroIndustry(key as any)}
                    className={`p-3 rounded-xl text-left transition border text-xs ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow-md scale-102'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{item.name}</div>
                    <div className={`font-mono text-[10px] ${isSelected ? 'text-slate-900 font-extrabold' : 'text-emerald-400'}`}>
                      {item.estSavings}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Industry Preview Banner */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Primary Tax Arbitrage Mechanism:</div>
                <div className="text-white font-extrabold text-sm">{industryPresets[heroIndustry].keyStrategy}</div>
                <div className="text-slate-400 text-xs flex items-center space-x-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Verified Client Outcome:</strong> {industryPresets[heroIndustry].proof}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedService(`${industryPresets[heroIndustry].name} Strategy Review ($1,500)`);
                  setIsBookingModalOpen(true);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-2 shrink-0 transition"
              >
                <span>Unlock This Strategy</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Trust Signals Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-slate-300 text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>10+ Years</strong> Specialized Tax Defense</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>IRS Licensed</strong> PTIN P01507635</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>$4.2M+</strong> Client Tax &amp; Claim ROI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span><strong>5-Star</strong> Google Reviews</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICES & PRICING WITH CATEGORY FILTER TABS */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <span>Transparent Pricing &amp; High-Yield Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clear Engagements. Measurable Financial Return.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Every engagement includes signed workpapers backed by IRS Treasury Circular 230 representation privileges.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'tax_scorp', label: 'Tax Prep & S-Corp Defense' },
            { id: 'fractional_cfo', label: 'Fractional CFO Retainers' },
            { id: 'claims', label: 'Commercial Claims Forensics' },
            { id: 'cost_seg', label: 'Cost Segregation (Real Estate)' },
            { id: 'bookkeeping', label: 'Bookkeeping & Payroll' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveServiceCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                activeServiceCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between relative group"
            >
              {svc.badge && (
                <span className="absolute -top-3 right-6 px-3 py-1 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                  {svc.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-wider mb-1">
                    {svc.irsCode}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">{svc.title}</h3>
                  <div className="flex items-baseline space-x-1.5 mt-2 mb-3">
                    <span className="text-3xl font-black text-slate-900 font-mono">{svc.price}</span>
                    <span className="text-xs text-slate-500 font-semibold">/{svc.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700">
                  <strong>Ideal For:</strong> {svc.idealFor}
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[11px] font-extrabold text-slate-900 uppercase">Included Deliverables:</div>
                  {svc.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedService(`${svc.title} (${svc.price})`);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <span>{svc.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE REAL-TIME TAX SAVINGS CALCULATOR */}
      <section id="calculator" className="py-20 bg-slate-950 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase">
                <Calculator className="w-3.5 h-3.5" />
                <span>Live Interactive Tax Arbitrage Engine</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                How Much Are You Overpaying In Taxes Every Year?
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most LLC and Sole Proprietor business owners blindly forfeit 15.3% in self-employment taxes on every dollar of net profit. Adjust the sliders below to see your immediate potential cash savings.
              </p>

              <div className="space-y-5 pt-2">
                {/* Revenue Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-300">
                    <span>Annual Gross Business Revenue</span>
                    <span className="font-mono text-emerald-400 font-black text-sm">${calcRevenue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="25000"
                    value={calcRevenue}
                    onChange={(e) => setCalcRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Expenses Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-300">
                    <span>Annual Operating Expenses</span>
                    <span className="font-mono text-slate-300 font-bold">${calcExpenses.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="1000000"
                    step="10000"
                    value={calcExpenses}
                    onChange={(e) => setCalcExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                  />
                </div>

                {/* Entity Type Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Current Filing Structure</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['SoleProp', 'LLC', 'SCorp'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCalcEntityType(type)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition ${
                          calcEntityType === type
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {type === 'SoleProp' ? 'Sole Proprietor' : type === 'LLC' ? 'Single/Multi LLC' : 'S-Corporation'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSection179}
                      onChange={(e) => setIncludeSection179(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    <span>Include Section 179 Heavy Equipment / Truck Deduction (+$8,500/yr)</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAccountablePlan}
                      onChange={(e) => setIncludeAccountablePlan(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    <span>Include IRS Accountable Plan (Home Office &amp; Cell Phone) (+$4,200/yr)</span>
                  </label>
                </div>

              </div>
            </div>

            {/* Results Display Panel */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Estimated Net Profit</div>
                  <div className="text-2xl font-black text-white font-mono">${netIncome.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-bold uppercase">Annual Cash Savings</div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    +${estimatedTaxSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>S-Corp FICA 15.3% Arbitrage</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">+${ficaArbitrageSavings.toLocaleString()}</span>
                </div>

                {includeSection179 && (
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Section 179 First-Year Write-Off</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">+${section179Benefit.toLocaleString()}</span>
                  </div>
                )}

                {includeAccountablePlan && (
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Accountable Plan Tax-Free Reimbursements</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">+${accountablePlanBenefit.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedService(`S-Corp Tax Restructuring ($1,500) - Projected Savings: $${estimatedTaxSavings.toLocaleString()}`);
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center space-x-2 transition shadow-lg hover:scale-102"
              >
                <span>Claim Your ${estimatedTaxSavings.toLocaleString()} Tax Savings Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BRAND NEW: 60-SECOND TAX RISK & HEALTH DIAGNOSTIC QUIZ */}
      <section id="diagnostic" className="py-20 bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free 60-Second Assessment</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Tax Health &amp; Audit Risk Diagnostic</h3>
                <p className="text-xs text-slate-500">Answer 4 quick questions to score your current tax exposure and missed deductions.</p>
              </div>

              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-full">
                Step {quizStep + 1} of 5
              </span>
            </div>

            {/* Quiz Step 0: Welcome / Start */}
            {quizStep === 0 && (
              <div className="space-y-5 py-4 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Scale className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Are You Leaving Money on the Table with the IRS?</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our proprietary diagnostic evaluates your corporate structure, reasonable salary compliance, and asset depreciation eligibility in under 60 seconds.
                </p>
                <button
                  onClick={() => setQuizStep(1)}
                  className="px-8 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs transition shadow-md"
                >
                  Begin 60-Second Diagnostic →
                </button>
              </div>
            )}

            {/* Quiz Step 1: Entity Structure */}
            {quizStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900">Question 1: What is your current legal business entity?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Sole Proprietorship / 1099', 'Single-Member or Multi LLC', 'Active S-Corporation / C-Corp'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, entityType: opt });
                        setQuizStep(2);
                      }}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left font-bold text-xs text-slate-800 transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2: Reasonable Salary & FICA */}
            {quizStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900">Question 2: Have you calibrated a formal IRS Reasonable Officer Salary?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Yes, documented with formal salary study', val: 'Yes' },
                    { label: 'No, I take random owner draws or all W-2', val: 'No' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, hasReasonableSalary: opt.val });
                        setQuizStep(3);
                      }}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left font-bold text-xs text-slate-800 transition"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 3: Asset Purchases & Real Estate */}
            {quizStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900">Question 3: Did you purchase commercial property, vehicles, or heavy equipment in the last 3 years?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Yes (Heavy trucks, real estate, machinery)', val: 'Yes' },
                    { label: 'No major asset purchases recently', val: 'No' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, boughtAssets: opt.val });
                        setQuizStep(4);
                      }}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left font-bold text-xs text-slate-800 transition"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 4: IRS Notices or Penalties */}
            {quizStep === 4 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900">Question 4: Have you received any IRS notices (CP2000, 941 penalties, or audit letters)?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Yes, I have active notices or penalties to resolve', val: 'Yes' },
                    { label: 'No, clean standing with IRS currently', val: 'No' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, hasIrsNotice: opt.val });
                        calculateQuizResult();
                      }}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left font-bold text-xs text-slate-800 transition"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 5: Result Dossier */}
            {quizStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Your Tax Efficiency Score</span>
                    <div className="text-4xl font-black font-mono text-emerald-400">{quizScore} / 100</div>
                    <p className="text-xs text-slate-400">
                      {quizScore < 60 ? '🚨 High Tax Overpayment & Audit Vulnerability Detected.' : '⚠️ Moderate Tax Optimization Potential Identified.'}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Missed Deductions</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">$18,000 – $42,000/yr</div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs text-slate-800">
                  <div className="font-extrabold text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Immediate Action Plan:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Elect IRS S-Corp Subchapter S status via Form 2553 to eliminate 15.3% self-employment tax.</li>
                    <li>Conduct retroactive Section 179 depreciation audit on heavy vehicles and business equipment.</li>
                    <li>Establish formal IRS Accountable Plan to extract tax-free home office and vehicle reimbursements.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(`Tax Diagnostic Action Plan ($1,500) - Score: ${quizScore}/100`);
                      setIsBookingModalOpen(true);
                    }}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md"
                  >
                    <span>Schedule Free Strategy Review with EA</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setQuizStep(0)}
                    className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 7. COMMERCIAL CLAIMS & FORENSICS SECTION */}
      <section id="claims" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Contingency Forensic Recovery</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Did Insurance Underpay Your Commercial Property Claim?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Insurers systematically lowball commercial hail, wind, and water loss scopes. CFO TAX PRO reconstructs Xactimate forensic estimates, audits building code upgrades, and recovers five-to-six figure supplements on pure contingency.
            </p>

            {/* Claims Simulator Sliders */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <div className="font-extrabold text-slate-900">Commercial Claim Supplement Estimator:</div>
              
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>Actual Property Loss Scope:</span>
                  <span className="font-mono text-slate-900 font-bold">${claimsActualDamage.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={claimsActualDamage}
                  onChange={(e) => setClaimsActualDamage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded appearance-none accent-slate-700 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>Insurer Initial Lowball Offer:</span>
                  <span className="font-mono text-slate-900 font-bold">${claimsInitialOffer.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={claimsInitialOffer}
                  onChange={(e) => setClaimsInitialOffer(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded appearance-none accent-slate-700 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">Estimated Supplement Recovery:</span>
                <span className="font-mono text-base font-black text-emerald-700">+${claimsEstimatedRecovery.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedService(`Commercial Claims Forensic Audit ($4,500 / Contingency)`);
                setIsBookingModalOpen(true);
              }}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 transition shadow-md"
            >
              <span>Request Free Scope-of-Loss Forensic Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="text-xs font-extrabold text-amber-400 uppercase">Case Study Breakdown</div>
              <span className="text-[10px] font-mono text-slate-400">Dallas Commercial Loss</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Insurer Initial Settlement Offer:</span>
                <span className="font-mono font-bold text-rose-400">$32,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CFO TAX PRO Forensic Proof of Loss:</span>
                <span className="font-mono font-bold text-emerald-400">$145,000</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-extrabold">
                <span className="text-white">Net Client Additional Recovery:</span>
                <span className="font-mono text-lg text-emerald-400 font-black">+$113,000</span>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>What We Uncovered:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Insurer excluded Dallas municipal code required ISO roof insulation and R-value upgrades. Our forensic team documented all structural code mandates, forcing insurer to pay full replacement cost.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. LIVE IN-PAGE AI TAX COPILOT */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase">
              <Bot className="w-3.5 h-3.5" />
              <span>Instant AI Tax &amp; IRS Copilot</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Ask Any Tax or S-Corp Question</h3>
            <p className="text-xs text-slate-400">Get instant answers grounded in IRS Treasury Circular 230 and IRC regulations.</p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Can I write off my Ford F-250 under Section 179?",
              "How does S-Corp Reasonable Salary save FICA tax?",
              "What qualifies for Cost Segregation depreciation?",
              "How do I abate IRS 941 payroll tax penalties?"
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuickTaxQuestion(q);
                  handleAskQuickTax(q);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-700 transition text-left"
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Question Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask your specific tax or business deduction question..."
              value={quickTaxQuestion}
              onChange={(e) => setQuickTaxQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuickTax()}
              className="flex-1 p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleAskQuickTax()}
              disabled={isLoadingCopilot || !quickTaxQuestion}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition disabled:opacity-50 flex items-center space-x-1.5"
            >
              {isLoadingCopilot ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isLoadingCopilot ? 'Analyzing...' : 'Ask AI'}</span>
            </button>
          </div>

          {/* AI Response Display */}
          {aiCopilotAnswer && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-extrabold">
                  <Sparkles className="w-4 h-4" />
                  <span>IRS Enrolled Agent Diagnostic Copilot:</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Dallas PTIN: P01507635</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{aiCopilotAnswer}</p>
              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedService('Direct Tax Consultation with EA ($1,500)');
                    setIsBookingModalOpen(true);
                  }}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                >
                  <span>Book 1-on-1 strategy call with Chukwuma Oduagu, EA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 9. ABOUT & CREDENTIALS SHOWCASE */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl space-y-6">
              <div className="flex items-center space-x-4">
                <CfoTaxProLogo size={60} className="rounded-full bg-white p-1" />
                <div>
                  <h3 className="text-xl font-black">Chukwuma Oduagu, EA</h3>
                  <div className="text-xs text-emerald-100 font-semibold">Lead Tax Strategist &amp; Fractional CFO</div>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-emerald-50 border-t border-emerald-400/30">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200">IRS Credential:</span>
                  <strong className="font-mono text-white">Enrolled Agent (PTIN: P01507635)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200">Dallas Legal Entity:</span>
                  <strong className="text-white">CFO TAX PRO LLC</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200">Federal Tax ID:</span>
                  <strong className="font-mono text-white">EIN: 27-3243694</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200">Dallas Headquarters:</span>
                  <strong className="text-white">6215 Shady Brook Ln, Dallas TX</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 rounded-2xl text-[11px] text-emerald-100 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>Unlimited representation privileges before the IRS in all 50 states.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              <span>About CFO TAX PRO LLC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A High-Stakes Tax Partner for Ambitious Business Owners.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded in Dallas, Texas, CFO TAX PRO LLC exists for one purpose: to give small business owners, contractors, and real estate investors the same aggressive tax strategies and forensic financial leadership that Fortune 500 companies enjoy.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We don't just file forms after the year is over. We architect proactive tax structures (Form 2553 S-Corps, Section 179 depreciation, Accountable Plans, Cost Segregation), resolve complex IRS tax notices with penalty abatements, and recover underpaid casualty and storm insurance claims on contingency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-black text-xl text-emerald-600 mb-1">10+ Years</div>
                <div className="text-xs text-slate-600">Specialized experience in corporate tax defense &amp; CFO advisory.</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-black text-xl text-emerald-600 mb-1">$4.2M+</div>
                <div className="text-xs text-slate-600">Total client tax savings &amp; casualty claim supplements recovered.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. CASE STUDIES & RESULTS */}
      <section id="testimonials" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
              <span>Verified Client Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Results for Real Businesses.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Read how our clients save five figures in taxes and resolve complex claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsList.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                      {t.metric}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{t.headline}</h4>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-500">{t.company} • {t.location}</div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CATEGORIZED FAQ WITH LIVE SEARCH */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold uppercase tracking-wider">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear answers about tax structures, claims forensics, and our advisory workflow.
          </p>
        </div>

        {/* FAQ Search Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. S-Corp, Penalty Abatement, Cost Segregation)..."
            value={faqSearchQuery}
            onChange={(e) => setFaqSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        {/* FAQ Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'tax_scorp', label: 'S-Corp & Tax' },
            { id: 'irs_defense', label: 'IRS Defense & Notices' },
            { id: 'claims', label: 'Commercial Claims' },
            { id: 'fees', label: 'Fees & Locations' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFaqCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFaqCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-extrabold text-xs sm:text-sm text-slate-900 hover:text-emerald-600 transition"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. CONTACT & DALLAS HEADQUARTERS */}
      <section id="contact" className="py-20 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Info & Office */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>Dallas Headquarters</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Let's Build Your Tax &amp; Revenue Roadmap.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reach out directly or send us a message. We respond within 2 business hours with a clear action plan.
              </p>

              <div className="space-y-3.5 pt-2">
                <a
                  href="tel:4693867235"
                  className="flex items-center space-x-3.5 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition group"
                >
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Direct Phone Line</div>
                    <div className="text-base font-bold font-mono text-white">(469) 386-7235</div>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Dallas Office</div>
                    <div className="text-xs sm:text-sm font-bold text-white">6215 Shady Brook Ln, Dallas, TX 75206</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Legal Tax ID &amp; Licensing</div>
                    <div className="text-xs font-bold text-emerald-300 font-mono">EIN: 27-3243694 • PTIN: P01507635</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you. Chukwuma Oduagu and the CFO TAX PRO team will review your inquiry and follow up within 2 business hours.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1 mb-2">
                    <h3 className="text-xl font-black text-slate-900">Send Direct Message</h3>
                    <p className="text-xs text-slate-500">Fill out this quick form for instant intake into our strategy desk.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Marcus Vance"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Direct Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(214) 882-4190"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="marcus@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Service of Interest</label>
                      <select
                        value={contactForm.serviceInterest}
                        onChange={(e) => setContactForm({ ...contactForm, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="Tax Prep & S-Corp Resolution ($1,500)">Tax Prep & S-Corp Resolution ($1,500)</option>
                        <option value="Fractional CFO Advisory ($2,500/mo)">Fractional CFO Advisory ($2,500/mo)</option>
                        <option value="Commercial Claims Recovery ($4,500)">Commercial Claims Recovery ($4,500)</option>
                        <option value="Cost Segregation Study ($5,000+)">Cost Segregation Study ($5,000+)</option>
                        <option value="Monthly Bookkeeping ($600/mo)">Monthly Bookkeeping ($600/mo)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Tell Us About Your Business or Case</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your entity type, estimated revenue, or tax/claim challenge..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmittingContact ? 'Submitting to Strategy Desk...' : 'Send Message to CFO TAX PRO Desk'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <CfoTaxProLogo size={40} className="rounded-full bg-white/5 p-0.5" />
              <div>
                <div className="font-extrabold text-white text-base">CFO TAX PRO LLC</div>
                <div className="text-[11px] text-slate-400">Dallas Entity EIN: 27-3243694 • PTIN: P01507635</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-300 font-semibold text-xs">
              <a href="#services" className="hover:text-emerald-400 transition">Services</a>
              <a href="#about" className="hover:text-emerald-400 transition">About</a>
              <a href="#calculator" className="hover:text-emerald-400 transition">Calculator</a>
              <a href="#testimonials" className="hover:text-emerald-400 transition">Results</a>
              <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              © 2026 CFO TAX PRO LLC. All Rights Reserved. 6215 Shady Brook Ln, Dallas, TX 75206. Direct: (469) 386-7235.
            </div>
            <div className="flex space-x-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>IRS Circular 230 Disclosure</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        <a
          href="tel:4693867235"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center space-x-2 transition hover:scale-105 border-2 border-white"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-black pr-1 hidden sm:inline">(469) 386-7235</span>
        </a>

        {onOpenChatbot && (
          <button
            onClick={onOpenChatbot}
            className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl flex items-center space-x-2 transition hover:scale-105 border-2 border-emerald-400"
          >
            <Bot className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold pr-1 hidden sm:inline">24/7 AI Tax Diagnostic</span>
          </button>
        )}
      </div>

      {/* STRATEGY SESSION BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => {
                setIsBookingModalOpen(false);
                setBookingStep('details');
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 font-bold text-lg"
            >
              ✕
            </button>

            {bookingStep === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Strategy Session Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your 15-minute consultation for <strong>{bookingForm.preferredDate} at {bookingForm.preferredTime}</strong> is locked with Chukwuma Oduagu, EA.
                </p>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs space-y-1 text-slate-700">
                  <div><strong>Account:</strong> {bookingForm.name} ({bookingForm.company || 'Business Owner'})</div>
                  <div><strong>Scope:</strong> {selectedService}</div>
                  <div><strong>Direct Line:</strong> (469) 386-7235</div>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    <span>Direct Calendar Intake</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Book Free 15-Min Strategy Call</h3>
                  <p className="text-xs text-slate-500">Pick your preferred time slot and scope with our lead tax strategist.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Service</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedService}
                    className="w-full px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Vance"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="Dallas Commercial Roofing LLC"
                      value={bookingForm.company}
                      onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(214) 882-4190"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@company.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time</label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                    >
                      <option value="9:00 AM CST">9:00 AM CST</option>
                      <option value="10:00 AM CST">10:00 AM CST</option>
                      <option value="1:30 PM CST">1:30 PM CST</option>
                      <option value="3:00 PM CST">3:00 PM CST</option>
                      <option value="4:30 PM CST">4:30 PM CST</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmittingBooking ? 'Locking Appointment...' : 'Confirm Strategy Session Booking'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
