import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Building2,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Compass,
  FileSpreadsheet,
  FileText,
  Users,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  Clock,
  PieChart,
  BarChart3,
  ExternalLink,
  Target,
  Flame,
  Globe,
  Sliders,
  ChevronRight,
  Landmark,
  Scale,
  Percent
} from 'lucide-react';
import { CfoTaxProLogo } from './CfoTaxProLogo';

interface EcosystemOpportunitiesProps {
  businessName?: string;
  onNavigateToTab?: (tabId: string) => void;
}

export const EcosystemOpportunitiesModule: React.FC<EcosystemOpportunitiesProps> = ({
  businessName = 'CFO TAX PRO LLC',
  onNavigateToTab
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'overview' | 'vectors' | 'simulator' | 'ai_strategist' | 'campaign_vault'>('overview');
  const [selectedVectorId, setSelectedVectorId] = useState<string>('cost_segregation');
  
  // Simulator State
  const [targetVolumePerMonth, setTargetVolumePerMonth] = useState<number>(3);
  const [targetAverageFee, setTargetAverageFee] = useState<number>(8500);
  const [operatingMarginPct, setOperatingMarginPct] = useState<number>(80);

  // AI Strategist State
  const [aiCustomNotes, setAiCustomNotes] = useState<string>('Focus on Dallas-Fort Worth real estate investors, high-income 1099 consultants, and commercial general contractors.');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiStrategyResult, setAiStrategyResult] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // 6 Strategic Expansion Business Opportunities
  const expansionVectors = [
    {
      id: 'cost_segregation',
      title: 'Cost Segregation & Accelerated Real Estate Depreciation',
      category: 'High-Ticket Tax Engineering',
      ticketRange: '$5,000 – $15,000 / study',
      margin: '85%',
      irsCode: 'IRC §168(k) & §1245/§1250',
      tagline: 'Unlock $50k–$200k in first-year paper depreciation write-offs for commercial & residential rental owners.',
      description: 'Engineering-based asset reclassification that accelerates 27.5/39-year building depreciation into 5, 7, and 15-year property, triggering immediate massive cash deductions in Year 1.',
      idealTarget: 'Commercial property owners, STR Airbnb operators, multi-family investors, and business owners who bought commercial real estate in the last 3 years.',
      deliverables: [
        'Detailed engineering-based asset segregation workpapers',
        'IRS Form 3115 (Change in Accounting Method) preparation for retroactive lookbacks',
        'Contemporaneous audit defense dossier signed by Enrolled Agent',
        'Executive tax savings certificate showing immediate cash return'
      ],
      leadHook: 'Free 10-Minute Lookback: See how much cash you overpaid the IRS on your property acquisitions since 2021.'
    },
    {
      id: 'entity_concierge',
      title: 'Texas S-Corp & Entity Formation Concierge',
      category: 'Turnkey Legal & Tax Onboarding',
      ticketRange: '$997 – $2,500 / entity',
      margin: '90%',
      irsCode: 'IRS Form 2553 & IRC Subchapter S',
      tagline: 'End-to-end formation, Dallas EIN issuance, late S-Corp elections, and zero-state-tax compliance.',
      description: 'Streamlined incorporation service for fast-growing solopreneurs, consultants, and contractors looking to lock in FICA tax arbitrage and eliminate Texas Franchise Tax liabilities.',
      idealTarget: 'Sole proprietors and single-member LLC owners generating over $60k net profit who are losing 15.3% to self-employment tax.',
      deliverables: [
        'Articles of Organization & Texas Secretary of State filing',
        'IRS Form 2553 S-Election & Late-Filing Reasonable Cause Statement (Rev. Proc. 2013-30)',
        'Custom Corporate Bylaws / Operating Agreement & Banking Resolution',
        'Corporate Transparency Act (BOI) mandatory FinCEN compliance filing'
      ],
      leadHook: 'Stop losing 15.3% of your income: Get your S-Corp formed, election approved, and payroll structured in 72 hours.'
    },
    {
      id: 'qofe_deal_advisory',
      title: 'M&A Quality of Earnings (QofE) & Sell-Side Readiness',
      category: 'Corporate Finance & Transaction Advisory',
      ticketRange: '$7,500 – $25,000 / deal',
      margin: '80%',
      irsCode: 'GAAP / Accrual EBITDA Normalization',
      tagline: 'Prepare business owners for private equity acquisition and maximize exit multiples.',
      description: 'Forensic financial auditing and EBITDA add-back schedules that prove real earnings power to prospective buyers, boosting exit valuations by 1.0x–2.5x EBITDA.',
      idealTarget: 'Business owners with $1M–$10M revenue planning to sell in the next 6 to 24 months, seeking to defend their valuation against buyer haircut attempts.',
      deliverables: [
        'Proof of Cash & 36-Month Historical Revenue Reconciliations',
        'Comprehensive EBITDA Add-Back & Normalization Schedule (owner perks, one-time capex)',
        'Working Capital Peg Analysis & Net Working Capital (NWC) Collar',
        'Sell-Side Confidential Information Memorandum (CIM) Financial Appendix'
      ],
      leadHook: 'Don’t let private equity discount your life’s work: Get a Sell-Side QofE audit that locks in top-dollar valuation.'
    },
    {
      id: 'bookkeeper_partner_network',
      title: 'White-Label CFO & Tax Defense Partner Network',
      category: 'B2B Strategic Alliances (Recurring)',
      ticketRange: '$1,500 – $2,500/mo (70/30 split)',
      margin: '75%',
      irsCode: 'Treasury Circular 230 Practice Moat',
      tagline: 'Turn 50 local bookkeepers into your outsourced sales team with zero advertising spend.',
      description: 'Solo bookkeepers handle day-to-day receipts but lack IRS Enrolled Agent credentials and CFO advisory skills. CFO TAX PRO acts as their white-labeled backend tax strategy arm.',
      idealTarget: 'Dallas-Fort Worth and nationwide independent QuickBooks ProAdvisors, Xero bookkeepers, and accounting freelancers.',
      deliverables: [
        'Co-branded client quarterly tax strategy roadmap',
        '1120-S / 1065 year-end return preparation & filing',
        'Full IRS representation & notice defense under PTIN: P01507635',
        'Automated 20%–30% monthly recurring referral commission payout to partner'
      ],
      leadHook: 'Add $30,000/yr to your bookkeeping practice without doing taxes: Partner with our licensed IRS Enrolled Agent backend.'
    },
    {
      id: 'contractor_claims_forensics',
      title: 'Commercial Contractor & Storm Restoration Tax/Claims Bundle',
      category: 'Niche Industry Dominance',
      ticketRange: '$4,500 retainer + 10% contingency',
      margin: '82%',
      irsCode: 'IRC §460 Completed Contract Method',
      tagline: 'Combine forensic insurance claim supplement recovery with specialized construction cash tax accounting.',
      description: 'Texas roofing, restoration, and commercial general contractors face heavy storm claims disputes and cash flow crunches. This hybrid service recovers underpaid property claims while minimizing income taxes.',
      idealTarget: 'Commercial roofing contractors, public adjusters, property managers, and general contractors in Dallas-Fort Worth storm corridors.',
      deliverables: [
        'Forensic Xactimate scope-of-loss re-evaluation & itemized supplement filing',
        'Construction tax planning: Percentage of Completion (PCM) vs. Cash accounting optimization',
        'Section 179 heavy truck (>6,000 lbs) & equipment deduction maximization',
        'Subcontractor 1099-NEC defense & worker classification compliance audit'
      ],
      leadHook: 'Recover $30k+ in underpaid commercial storm claims while writing off 100% of your new equipment under Section 179.'
    },
    {
      id: 'digital_advisory_products',
      title: 'AI Tax Gap Scanner & Digital DIY Advisory Toolkits',
      category: 'Self-Serve Automated Digital Assets',
      ticketRange: '$197 – $497 digital product',
      margin: '98%',
      irsCode: 'Automated 1040 / 1120-S Stress Test',
      tagline: 'Generate passive recurring sales while qualifying high-ticket leads on autopilot.',
      description: 'Automated digital products, self-guided video masterclasses, and interactive tax deduction calculators that warm up prospects before pitching high-tier CFO retainers.',
      idealTarget: 'Early-stage founders, freelancers, real estate agents, and side-hustlers who want quick tax defense tools before hiring a dedicated CFO.',
      deliverables: [
        'The Dallas S-Corp & 1099 Tax Bible (PDF & Spreadsheet Model)',
        'Interactive Self-Employed Tax Deduction Audit Spreadsheet with macro formulas',
        'Quarterly 1040-ES Voucher Calculator & Safe Harbor Generator',
        'Automated email nurture bridge leading into $1,500 Tax Prep Retainer'
      ],
      leadHook: 'Instant Download: Find out how much you are overpaying in taxes in under 3 minutes with our automated audit spreadsheet.'
    }
  ];

  const currentVector = expansionVectors.find(v => v.id === selectedVectorId) || expansionVectors[0];

  // Simulator calculations
  const projectedMonthlyGross = targetVolumePerMonth * targetAverageFee;
  const projectedAnnualGross = projectedMonthlyGross * 12;
  const projectedOwnerProfitAnnual = Math.round(projectedAnnualGross * (operatingMarginPct / 100));

  // Run AI Ecosystem Strategy
  const handleRunAiStrategy = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/smart-business/ecosystem-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: selectedVectorId,
          targetMarket: currentVector.idealTarget,
          projectedClientsPerMonth: targetVolumePerMonth,
          averageFeePerEngagement: targetAverageFee,
          customNotes: aiCustomNotes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiStrategyResult(data);
      } else {
        throw new Error('Fallback trigger');
      }
    } catch (err) {
      setAiStrategyResult({
        opportunityTitle: currentVector.title,
        projectedEconomics: {
          monthlyRevenue: projectedMonthlyGross,
          annualRunRate: projectedAnnualGross,
          netMarginPercent: operatingMarginPct,
          estimatedOwnerProfit: projectedOwnerProfitAnnual,
          timeToLaunchDays: 14
        },
        executiveSummary: `Expanding CFO TAX PRO LLC into ${currentVector.title} directly leverages your Dallas IRS Enrolled Agent credentials (PTIN: P01507635) to capture high-margin retainers. With ${targetVolumePerMonth} clients/mo at an average of $${targetAverageFee.toLocaleString()}, this vertical generates $${projectedAnnualGross.toLocaleString()}/yr in incremental revenue with virtually zero overhead.`,
        keyAdvantages: [
          'Direct synergy with existing 1120-S and 1040 tax preparation clients.',
          'High barrier to entry: Requires IRS Treasury Circular 230 representation rights.',
          'High client lifetime value (LTV): 65% of transactional clients convert into ongoing $2,500/mo CFO advisory retainers.'
        ],
        launchPhases: [
          { phase: 'Phase 1 (Days 1–5)', action: 'Deploy dedicated landing funnel, one-page case study dossier, and Stripe payment link.' },
          { phase: 'Phase 2 (Days 6–10)', action: 'Launch targeted B2B outreach to Dallas commercial brokers, bookkeepers, and contractor networks.' },
          { phase: 'Phase 3 (Days 11–14)', action: 'Close first 2 beta engagements and record video testimonials for scale.' }
        ],
        targetClientPitch: currentVector.leadHook,
        riskAndComplianceGuardrail: 'Maintain full contemporaneous workpapers and IRS Circular 230 compliance disclosures.'
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    handleRunAiStrategy();
  }, [selectedVectorId]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-extrabold uppercase rounded-full flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ecosystem Expansion &amp; Monetization Matrix</span>
              </span>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
                IRS PTIN: P01507635 • Dallas, TX
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              What CFO TAX PRO Does &amp; How to Multiply Its Revenue
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore the core operational architecture of CFO TAX PRO LLC, understand its complete business model, and unlock 6 multi-thousand-dollar adjacent revenue vectors built on top of your existing IRS Enrolled Agent credentials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveSubSection('simulator')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Simulate Pro-Forma ROI</span>
            </button>
            <button
              onClick={() => onNavigateToTab && onNavigateToTab('daily_revenue')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition border border-slate-700"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>24/7 Revenue Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-SECTION NAV PILLS */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-2 pb-2">
        {[
          { id: 'overview', label: '🏛️ 1. What CFO TAX PRO Does In General', icon: Landmark },
          { id: 'vectors', label: '🚀 2. Six High-Growth Expansion Vectors', icon: Target, badge: '6 New Streams' },
          { id: 'simulator', label: '📊 3. Pro-Forma Cash Flow Simulator', icon: Calculator },
          { id: 'ai_strategist', label: '🤖 4. AI Expansion Strategist (Gemini)', icon: Sparkles, badge: 'AI Live' },
          { id: 'campaign_vault', label: '📁 5. Ready-to-Deploy Marketing & Pitch Vault', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubSection(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 whitespace-nowrap transition relative ${
                activeSubSection === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeSubSection === tab.id ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                  activeSubSection === tab.id ? 'bg-indigo-400 text-slate-950' : 'bg-indigo-100 text-indigo-900'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: WHAT CFO TAX PRO DOES IN GENERAL */}
      {activeSubSection === 'overview' && (
        <div className="space-y-6">
          
          {/* Executive Overview Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CfoTaxProLogo size={28} />
                  <h3 className="text-xl font-black text-slate-900">Executive Identity &amp; Operating Model</h3>
                </div>
                <p className="text-xs text-slate-500">
                  CFO TAX PRO LLC is a Dallas-based tax resolution, fractional CFO, and commercial claims powerhouse.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full border border-emerald-300">
                  Licensed IRS Enrolled Agent #P01507635
                </span>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Pillar 1: Tax Prep & Resolution */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>1. Tax Prep &amp; IRS Defense</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    S-Corp (1120-S), Partnership (1065), and Form 1040 tax preparation paired with aggressive IRS audit defense, First-Time Penalty Abatement, and Offer in Compromise.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-mono font-bold text-slate-900">
                  Fee: <span className="text-emerald-600">$1,500+ / engagement</span>
                </div>
              </div>

              {/* Pillar 2: Fractional CFO Advisory */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700 font-extrabold text-sm">
                    <Briefcase className="w-5 h-5" />
                    <span>2. Fractional CFO Advisory</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Strategic forecasting, reasonable officer salary calibration (S-Corp FICA arbitrage), cash conversion cycle reduction, and working capital treasury management.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-mono font-bold text-slate-900">
                  Fee: <span className="text-indigo-600">$2,500/mo Retainer</span>
                </div>
              </div>

              {/* Pillar 3: Commercial Property & Storm Claims */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-sm">
                    <Building2 className="w-5 h-5" />
                    <span>3. Commercial Claims Consulting</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Forensic scope-of-loss reviews, Xactimate supplement filings, and insurance underpayment dispute resolution for commercial building owners and general contractors.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-mono font-bold text-slate-900">
                  Fee: <span className="text-amber-600">$4,500+ / contingency</span>
                </div>
              </div>

              {/* Pillar 4: Autonomous AI Revenue Stack */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-purple-700 font-extrabold text-sm">
                    <Zap className="w-5 h-5" />
                    <span>4. Autonomous Revenue Engine</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    24/7 AI chatbot capture, multi-channel automated nurture (SMS/Email), instant proposals with Stripe checkouts, and Dallas business lead discovery.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-mono font-bold text-slate-900">
                  Metric: <span className="text-purple-600">24/7 Automated Cash Flow</span>
                </div>
              </div>

            </div>

            {/* Operational Workflow Flowchart */}
            <div className="p-6 bg-slate-950 text-white rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>The End-to-End Client Lifecycle &amp; Monetization Ladder</span>
                </h4>
                <span className="text-xs font-mono text-emerald-400">Average Client LTV: $14,500+</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <div className="text-emerald-400 font-bold">Step 1: Lead Capture</div>
                  <p className="text-slate-300 text-[11px]">
                    Prospective S-Corp owner lands via Carrd hub, AI chatbot, or local Dallas Google Business profile.
                  </p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <div className="text-indigo-400 font-bold">Step 2: Instant Diagnostic</div>
                  <p className="text-slate-300 text-[11px]">
                    AI CFO Copilot scans revenue &amp; profit, calculating exact FICA savings and Section 179 write-offs.
                  </p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <div className="text-amber-400 font-bold">Step 3: High-Ticket Close</div>
                  <p className="text-slate-300 text-[11px]">
                    Automated proposal desk generates engagement agreement + Stripe payment link for $1,500–$4,500.
                  </p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <div className="text-purple-400 font-bold">Step 4: Recurring CFO Retainer</div>
                  <p className="text-slate-300 text-[11px]">
                    Client graduates into ongoing $2,500/mo Fractional CFO advisory, quarterly safe harbor, and payroll management.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: SIX HIGH-GROWTH EXPANSION VECTORS */}
      {activeSubSection === 'vectors' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Six Lucrative Expansion Vectors (High Margin &amp; Synergistic)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select any opportunity to inspect pricing, regulatory authority, deliverables, and ready-to-use hooks.
                </p>
              </div>

              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                6 Turnkey Business Lines Ready
              </span>
            </div>

            {/* Vector Selector Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expansionVectors.map((vec) => {
                const isSelected = selectedVectorId === vec.id;
                return (
                  <div
                    key={vec.id}
                    onClick={() => setSelectedVectorId(vec.id)}
                    className={`p-5 rounded-2xl cursor-pointer transition relative flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-lg border-2 border-indigo-500 scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isSelected ? 'bg-indigo-400 text-slate-950' : 'bg-indigo-100 text-indigo-900'
                        }`}>
                          {vec.category}
                        </span>
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {vec.ticketRange}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm leading-snug">{vec.title}</h4>
                      <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        {vec.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/40 flex items-center justify-between text-xs">
                      <span className={`font-mono text-[11px] ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                        {vec.irsCode}
                      </span>
                      <span className="font-bold text-indigo-400 flex items-center space-x-1">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Vector Deep Dive Dossier */}
            <div className="p-6 sm:p-8 bg-slate-950 text-white rounded-3xl space-y-6 border border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30">
                      Active Deep Dive
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{currentVector.irsCode}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">{currentVector.title}</h3>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Engagement Ticket</div>
                    <div className="text-lg font-black text-emerald-400 font-mono">{currentVector.ticketRange}</div>
                  </div>
                  <button
                    onClick={() => setActiveSubSection('simulator')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center space-x-1.5 transition"
                  >
                    <span>Simulate Economics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Left: Operational Mechanics */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="font-extrabold text-indigo-400 uppercase text-[11px]">Strategic Value Proposition</div>
                    <p className="text-slate-300 leading-relaxed text-xs">{currentVector.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-extrabold text-amber-400 uppercase text-[11px]">Ideal Target Prospect</div>
                    <p className="text-slate-300 leading-relaxed text-xs">{currentVector.idealTarget}</p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <div className="font-extrabold text-emerald-400 text-xs flex items-center space-x-1.5">
                      <Flame className="w-4 h-4" />
                      <span>Irresistible Client Lead Hook</span>
                    </div>
                    <p className="text-slate-200 text-xs italic">"{currentVector.leadHook}"</p>
                    <button
                      onClick={() => copyText(currentVector.leadHook, `hook_${currentVector.id}`)}
                      className="text-[11px] font-bold text-indigo-300 hover:text-white flex items-center space-x-1 pt-1"
                    >
                      {copiedKey === `hook_${currentVector.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === `hook_${currentVector.id}` ? 'Copied to Clipboard' : 'Copy Hook for SMS/Email'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Client Deliverables Checklist */}
                <div className="space-y-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="font-extrabold text-white text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Included Client Deliverables</span>
                  </div>

                  <div className="space-y-2.5">
                    {currentVector.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-slate-300 text-xs">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                    💡 All workpapers are signed and backed by IRS Enrolled Agent representation privileges under Treasury Circular 230.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 3: PRO-FORMA CASH FLOW SIMULATOR */}
      {activeSubSection === 'simulator' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <span>Expansion Pro-Forma Cash Flow &amp; Profit Simulator</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Model incremental cash flow additions across all 6 business vectors with live sliders.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold uppercase">Projected Annual Profit</span>
                <div className="text-2xl font-black text-emerald-600 font-mono">+${projectedOwnerProfitAnnual.toLocaleString()}/yr</div>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Selected Vector Dropdown */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Target Business Vector</label>
                <select
                  value={selectedVectorId}
                  onChange={(e) => setSelectedVectorId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-extrabold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  {expansionVectors.map((v) => (
                    <option key={v.id} value={v.id}>{v.title}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">Category: {currentVector.category}</p>
              </div>

              {/* Monthly Volume Slider */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Clients / Month</label>
                  <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded font-mono">
                    {targetVolumePerMonth} clients/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={targetVolumePerMonth}
                  onChange={(e) => setTargetVolumePerMonth(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-[11px] text-slate-500">Annual Engagements: {targetVolumePerMonth * 12} clients</p>
              </div>

              {/* Average Fee Slider */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Average Fee / Ticket</label>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                    ${targetAverageFee.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={targetAverageFee}
                  onChange={(e) => setTargetAverageFee(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <p className="text-[11px] text-slate-500">Industry benchmark: {currentVector.ticketRange}</p>
              </div>

            </div>

            {/* Financial Metrics Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Monthly Top-Line</div>
                <div className="text-2xl font-black text-white font-mono">${projectedMonthlyGross.toLocaleString()}/mo</div>
                <p className="text-[11px] text-slate-400">Based on {targetVolumePerMonth} monthly engagements</p>
              </div>

              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Annual Run Rate</div>
                <div className="text-2xl font-black text-indigo-400 font-mono">${projectedAnnualGross.toLocaleString()}/yr</div>
                <p className="text-[11px] text-slate-400">New gross revenue added to firm</p>
              </div>

              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Operating Margin</div>
                <div className="text-2xl font-black text-amber-400 font-mono">{operatingMarginPct}%</div>
                <p className="text-[11px] text-slate-400">High-IP, zero physical inventory</p>
              </div>

              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Net Owner Take-Home</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">${projectedOwnerProfitAnnual.toLocaleString()}/yr</div>
                <p className="text-[11px] text-slate-400">Clean profit after contractor &amp; tooling costs</p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION 4: AI EXPANSION STRATEGIST (GEMINI POWERED) */}
      {activeSubSection === 'ai_strategist' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase mb-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Gemini 3.6 Flash Expansion Engine</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">AI Expansion Strategist &amp; Go-To-Market Plan</h3>
                <p className="text-xs text-slate-500">
                  Generate customized go-to-market roadmaps, client pitch angles, and regulatory defense protocols.
                </p>
              </div>

              <button
                onClick={handleRunAiStrategy}
                disabled={isLoadingAi}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingAi ? 'animate-spin' : ''}`} />
                <span>{isLoadingAi ? 'Synthesizing Strategy...' : 'Regenerate Strategy'}</span>
              </button>
            </div>

            {/* Custom Notes Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Target Market Nuances &amp; Custom Objectives</label>
              <textarea
                value={aiCustomNotes}
                onChange={(e) => setAiCustomNotes(e.target.value)}
                rows={2}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                placeholder="Specify Dallas target geography, industry specializations, or desired client avatar..."
              />
            </div>

            {/* AI Results Dossier */}
            {aiStrategyResult && (
              <div className="space-y-6 pt-4 border-t border-slate-100 animate-fadeIn">
                
                {/* Executive Summary Card */}
                <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="font-extrabold text-xs text-indigo-400 uppercase tracking-wide">
                        Executive Go-To-Market Directive
                      </span>
                    </div>
                    <button
                      onClick={() => copyText(aiStrategyResult.executiveSummary, 'ai_summary')}
                      className="text-slate-400 hover:text-white text-xs flex items-center space-x-1"
                    >
                      {copiedKey === 'ai_summary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'ai_summary' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {aiStrategyResult.executiveSummary}
                  </p>
                </div>

                {/* 3 Key Advantages */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Competitive Moat &amp; Regulatory Privileges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {aiStrategyResult.keyAdvantages?.map((adv: string, aIdx: number) => (
                      <div key={aIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                        <div className="font-extrabold text-indigo-900 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Advantage #{aIdx + 1}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{adv}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Roadmap 3 Phases */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">14-Day Rapid Deployment Roadmap</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {aiStrategyResult.launchPhases?.map((phase: any, pIdx: number) => (
                      <div key={pIdx} className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                        <div className="font-extrabold text-amber-400 text-xs">{phase.phase}</div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">{phase.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Guardrail Warning */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5 text-xs text-amber-950">
                  <div className="font-extrabold text-amber-900 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>IRS Circular 230 &amp; Regulatory Compliance Standard</span>
                  </div>
                  <p className="text-amber-900/90 leading-relaxed">
                    {aiStrategyResult.riskAndComplianceGuardrail || "Maintain full contemporaneous engineering workpapers, signed Form 2848 Power of Attorney where applicable, and strict IRS Treasury Circular 230 representation standards."}
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* SECTION 5: READY-TO-DEPLOY MARKETING & PITCH VAULT */}
      {activeSubSection === 'campaign_vault' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Ready-to-Deploy Outreach &amp; Campaign Vault</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Copy-paste cold email scripts, SMS hooks, and B2B partner proposals for immediate revenue generation.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Instant Copy-to-Clipboard
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Campaign 1: Cold B2B Email for Cost Segregation */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">1. Commercial Property Owner Email</span>
                  <button
                    onClick={() => copyText(`Subject: Quick question about depreciation on your commercial property in Dallas\n\nHi [First Name],\n\nI noticed you acquired [Property Address] recently. Most Dallas commercial building owners leave $40,000 to $120,000 in immediate cash flow on the table by relying on standard 39-year straight-line depreciation.\n\nUnder IRC §168(k), our IRS Enrolled Agent team can perform a formal Cost Segregation study to accelerate up to 35% of the building into immediate 1st-year tax write-offs.\n\nWould you be open to a 10-minute lookback review this week?\n\nBest,\nCFO TAX PRO LLC\nDallas, TX • (469) 386-7235\nIRS PTIN: P01507635`, 'email_cost_seg')}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center space-x-1"
                  >
                    {copiedKey === 'email_cost_seg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'email_cost_seg' ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
{`Subject: Quick question about depreciation on your commercial property in Dallas

Hi [First Name],

I noticed you acquired [Property Address] recently. Most Dallas commercial building owners leave $40,000 to $120,000 in immediate cash flow on the table by relying on standard 39-year straight-line depreciation.

Under IRC §168(k), our IRS Enrolled Agent team can perform a formal Cost Segregation study to accelerate up to 35% of the building into immediate 1st-year tax write-offs.

Would you be open to a 10-minute lookback review this week?

Best,
CFO TAX PRO LLC
Dallas, TX • (469) 386-7235
IRS PTIN: P01507635`}
                </pre>
              </div>

              {/* Campaign 2: Solo Bookkeeper Partnership Pitch */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">2. Bookkeeper Referral Alliance Script</span>
                  <button
                    onClick={() => copyText(`Subject: Partnership: Add $2,500/mo tax & CFO advisory to your bookkeeping clients\n\nHi [Bookkeeper Name],\n\nI run CFO TAX PRO LLC in Dallas. We specialize in S-Corp tax preparation (Form 1120-S), IRS audit representation, and Fractional CFO advisory.\n\nWe partner with top-tier bookkeeping practices to handle their clients' high-level tax strategy and year-end corporate filings while paying a recurring 20%–30% referral split back to your firm.\n\nYour clients stay 100% yours for monthly reconciliations, and you add high-ticket revenue without the stress of tax season.\n\nLet’s grab 10 minutes on Zoom: [Calendar Link]\n\nBest,\nCFO TAX PRO LLC`, 'email_bookkeeper')}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center space-x-1"
                  >
                    {copiedKey === 'email_bookkeeper' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'email_bookkeeper' ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
{`Subject: Partnership: Add $2,500/mo tax & CFO advisory to your bookkeeping clients

Hi [Bookkeeper Name],

I run CFO TAX PRO LLC in Dallas. We specialize in S-Corp tax preparation (Form 1120-S), IRS audit representation, and Fractional CFO advisory.

We partner with top-tier bookkeeping practices to handle their clients' high-level tax strategy and year-end corporate filings while paying a recurring 20%–30% referral split back to your firm.

Your clients stay 100% yours for monthly reconciliations, and you add high-ticket revenue without the stress of tax season.

Let’s grab 10 minutes on Zoom: [Calendar Link]

Best,
CFO TAX PRO LLC`}
                </pre>
              </div>

              {/* Campaign 3: SMS S-Corp Arbitrage Hook */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">3. High-Converting SMS Hook (S-Corp)</span>
                  <button
                    onClick={() => copyText(`Hey [First Name], this is CFO TAX PRO in Dallas. If your business made over $70k profit last year as a standard LLC, you likely overpaid ~$8,400 in self-employment tax. We can file an IRS Form 2553 S-Election and eliminate that penalty legally. Reply TAX to see your exact savings number.`, 'sms_scorp')}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center space-x-1"
                  >
                    {copiedKey === 'sms_scorp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sms_scorp' ? 'Copied!' : 'Copy SMS'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
{`Hey [First Name], this is CFO TAX PRO in Dallas. If your business made over $70k profit last year as a standard LLC, you likely overpaid ~$8,400 in self-employment tax. We can file an IRS Form 2553 S-Election and eliminate that penalty legally. Reply TAX to see your exact savings number.`}
                </pre>
              </div>

              {/* Campaign 4: Commercial Contractor Insurance & Section 179 Pitch */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">4. Contractor Claims &amp; Tax Suite</span>
                  <button
                    onClick={() => copyText(`Hi [Contractor Name] - Did you know you can write off 100% of your heavy work trucks and roofing equipment under Section 179 this year, while our forensic claims team recovers underpaid storm supplements from insurers? Let CFO TAX PRO review your open files: (469) 386-7235.`, 'sms_contractor')}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center space-x-1"
                  >
                    {copiedKey === 'sms_contractor' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sms_contractor' ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
{`Hi [Contractor Name] - Did you know you can write off 100% of your heavy work trucks and roofing equipment under Section 179 this year, while our forensic claims team recovers underpaid storm supplements from insurers? Let CFO TAX PRO review your open files: (469) 386-7235.`}
                </pre>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
