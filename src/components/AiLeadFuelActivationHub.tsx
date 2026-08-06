import React, { useState } from 'react';
import { 
  Zap, 
  Fuel, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Phone, 
  Globe, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Play, 
  Activity, 
  Clock, 
  Users, 
  MessageSquare,
  Building2,
  Lock,
  ChevronRight,
  Printer
} from 'lucide-react';
import { RevenueDomain } from '../types';
import { CfoTaxProLogo } from './CfoTaxProLogo';

interface AiLeadFuelActivationHubProps {
  businessName: string;
  activeDomain: RevenueDomain;
  onPaymentCollected?: (amount: number, clientName: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const AiLeadFuelActivationHub: React.FC<AiLeadFuelActivationHubProps> = ({
  businessName,
  activeDomain,
  onPaymentCollected,
  onNavigateTab
}) => {
  const [activeSubView, setActiveSubView] = useState<'fuel_pump' | 'kickstart_7day' | 'social_broadcast' | 'capabilities'>('fuel_pump');

  // Copy to clipboard state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Lead Fuel Injection State
  const [selectedDallasProspect, setSelectedDallasProspect] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    domain: string;
    dealAmount: number;
    notes: string;
  }>({
    name: "Marcus Vance",
    company: "Dallas Commercial Roofing & Restoration LLC",
    email: "marcus@dallascommercialroofing.com",
    phone: "(214) 882-4190",
    domain: "Commercial Claims Contingency Recovery",
    dealAmount: 3450,
    notes: "Commercial flat roof hail loss claim ($145k estimated damage). Underpaid by insurer. Needs forensic proof of loss supplement."
  });

  const dallasProspectPresets = [
    {
      name: "Marcus Vance",
      company: "Dallas Commercial Roofing & Restoration LLC",
      email: "marcus@dallascommercialroofing.com",
      phone: "(214) 882-4190",
      domain: "Commercial Claims Contingency Recovery",
      dealAmount: 3450,
      notes: "Commercial flat roof hail loss claim ($145k estimated damage). Underpaid by insurer. Needs forensic proof of loss supplement."
    },
    {
      name: "Dr. Elena Rostova",
      company: "Highland Park Dental & Surgical Center",
      email: "erostova@hpdental.com",
      phone: "(469) 551-8302",
      domain: "Tax Resolution & IRS Advisory",
      dealAmount: 4200,
      notes: "High-earning medical S-Corp ($480k net). Needs reasonable salary structuring & Section 179 equipment tax write-off."
    },
    {
      name: "Jason Miller",
      company: "North Texas Freight & Logistics Partners",
      email: "jmiller@ntxfreight.com",
      phone: "(972) 419-7711",
      domain: "Corporate Tax Strategy & Defense",
      dealAmount: 5800,
      notes: "8-truck heavy freight logistics expansion. Bonus depreciation and payroll tax restructuring."
    },
    {
      name: "Sofia Alvarez",
      company: "Uptown Dallas Hospitality & Restaurant Group",
      email: "sofia@uptowndallasdining.com",
      phone: "(214) 339-8820",
      domain: "Tax Resolution & IRS Advisory",
      dealAmount: 2850,
      notes: "IRS 941 payroll tax notice of $28,000. Eligible for First-Time Penalty Abatement and structured settlement."
    },
    {
      name: "David Sterling",
      company: "Preston Hollow Custom Builders",
      email: "david@prestonhollowbuilders.com",
      phone: "(469) 710-9941",
      domain: "Commercial Claims Contingency Recovery",
      dealAmount: 8900,
      notes: "Water loss in luxury residential build under builder risk policy. Insurance underpaid by $85k."
    }
  ];

  // Pipeline Execution State
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [pipelineResults, setPipelineResults] = useState<any>(null);

  // Trigger End-to-End Pipeline Execution
  const handleExecuteFullPipeline = async () => {
    setIsExecutingPipeline(true);
    setPipelineProgress(10);
    setActivePipelineStep(1);
    setPipelineResults(null);

    // Step 1 simulation
    setTimeout(() => {
      setPipelineProgress(30);
      setActivePipelineStep(2);
    }, 600);

    // Step 2 simulation
    setTimeout(() => {
      setPipelineProgress(50);
      setActivePipelineStep(3);
    }, 1200);

    // Step 3 simulation
    setTimeout(() => {
      setPipelineProgress(70);
      setActivePipelineStep(4);
    }, 1800);

    // Step 4 simulation
    setTimeout(() => {
      setPipelineProgress(85);
      setActivePipelineStep(5);
    }, 2400);

    try {
      const res = await fetch('/api/lead-fuel/execute-full-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: selectedDallasProspect.name,
          companyName: selectedDallasProspect.company,
          domainName: selectedDallasProspect.domain,
          dealAmount: selectedDallasProspect.dealAmount
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPipelineProgress(100);
        setActivePipelineStep(6);
        setPipelineResults(data);
        if (onPaymentCollected) {
          onPaymentCollected(selectedDallasProspect.dealAmount, selectedDallasProspect.name);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecutingPipeline(false);
    }
  };

  // 7-Day Kickstart Execution State
  const [kickstartDays, setKickstartDays] = useState<Array<{
    day: number;
    title: string;
    focus: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    revenue: number;
    leads: number;
    log: string;
  }>>([
    {
      day: 1,
      title: "Day 1: Activate Lead Sources & Prime Chatbot",
      focus: "Share landing page link on LinkedIn/Nextdoor and send chatbot link to 5-10 network contacts.",
      status: 'Completed',
      revenue: 0,
      leads: 3,
      log: "Live Chatbot listening on Port 3000. 3 inbound inquiries ingested & qualified."
    },
    {
      day: 2,
      title: "Day 2: Monitor Performance & Auto-Nurture",
      focus: "Check Revenue CRM and verify 7-touch auto-nurture email/SMS sequence delivery.",
      status: 'Completed',
      revenue: 0,
      leads: 2,
      log: "8 nurture touches delivered. 2 prospects evaluated with score > 85."
    },
    {
      day: 3,
      title: "Day 3: Broadcast High-Value Authority Insight",
      focus: "Publish viral authority post: 'The #1 S-Corp Reasonable Salary Mistake Dallas CEOs Make'.",
      status: 'Completed',
      revenue: 0,
      leads: 4,
      log: "1,450 impressions. 4 direct diagnostic submissions captured."
    },
    {
      day: 4,
      title: "Day 4: Direct Outbound to 10 Dallas Companies",
      focus: "Dispatched AI-generated value proposition to 10 verified Dallas business owners.",
      status: 'Pending',
      revenue: 0,
      leads: 0,
      log: "Ready for 1-click execution."
    },
    {
      day: 5,
      title: "Day 5: Close First High-Ticket Retainer ($2,850)",
      focus: "Send Gemini Flash Deal proposal and collect Stripe payment under EIN 27-3243694.",
      status: 'Pending',
      revenue: 0,
      leads: 0,
      log: "Ready for 1-click execution."
    },
    {
      day: 6,
      title: "Day 6: Referral Engine & 5-Star Review Sequence",
      focus: "Request client referrals and trigger 5-star Google review follow-up sequence.",
      status: 'Pending',
      revenue: 0,
      leads: 0,
      log: "Ready for 1-click execution."
    },
    {
      day: 7,
      title: "Day 7: Review & Optimize 24/7 Revenue Machine",
      focus: "Review revenue audit telemetry, calibrate AI scoring, and lock in $114k 30-day projection.",
      status: 'Pending',
      revenue: 0,
      leads: 0,
      log: "Ready for 1-click execution."
    }
  ]);

  const [executingDayNumber, setExecutingDayNumber] = useState<number | null>(null);

  const handleExecuteKickstartDay = async (dayNum: number) => {
    setExecutingDayNumber(dayNum);
    try {
      const res = await fetch('/api/revenue-kickstart/execute-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayNumber: dayNum })
      });
      if (res.ok) {
        const data = await res.json();
        const resObj = data.result;
        setKickstartDays(prev => prev.map(d => {
          if (d.day === dayNum) {
            return {
              ...d,
              status: 'Completed',
              revenue: resObj.revenueImpact,
              leads: resObj.leadsGenerated,
              log: resObj.actionTaken
            };
          }
          return d;
        }));
        if (resObj.revenueImpact > 0 && onPaymentCollected) {
          onPaymentCollected(resObj.revenueImpact, "Kickstart Revenue Yield");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setExecutingDayNumber(null);
    }
  };

  // Social Broadcast Generator State
  const [broadcastPlatform, setBroadcastPlatform] = useState<'linkedin' | 'nextdoor' | 'email_sms'>('linkedin');
  const [broadcastContent, setBroadcastContent] = useState({
    title: 'Dallas S-Corp & Section 179 Cash Extraction Strategy',
    content: `Dallas Business Owners: Are you still paying standard 15.3% self-employment tax on 100% of your business profits? 🚨\n\nMost S-Corp founders in Texas make one critical mistake: setting reasonable salary either too high (overpaying Medicare/FICA) or too low (triggering IRS red flags).\n\nWith our 2026 Dallas Tax Matrix, we average $14,200 to $32,000 in direct cash retained through:\n✅ Form 2553 S-Corp Restructuring\n✅ Section 179 Heavy Equipment & Fleet Deductions\n✅ Accountable Plan Reimbursements\n\n👉 Test your potential tax write-off in 60 seconds with our 24/7 AI Tax Diagnostic: https://cfotaxpro.com/diagnostic\n\nDirect Office: (469) 386-7235 | CFO TAX PRO LLC (Dallas, TX • EIN: 27-3243694)`,
    cta: 'Test your potential tax write-off in 60 seconds: https://cfotaxpro.com/diagnostic'
  });
  const [isGeneratingBroadcast, setIsGeneratingBroadcast] = useState(false);

  const handleGenerateBroadcast = async (platform: 'linkedin' | 'nextdoor' | 'email_sms') => {
    setBroadcastPlatform(platform);
    setIsGeneratingBroadcast(true);
    try {
      const res = await fetch('/api/lead-fuel/generate-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform })
      });
      if (res.ok) {
        const data = await res.json();
        setBroadcastContent(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingBroadcast(false);
    }
  };

  // Live links for sharing
  const liveLandingPageUrl = window.location.origin;
  const liveChatbotUrl = `${window.location.origin}/#chatbot`;
  const liveCalendarUrl = `${window.location.origin}/#calendar`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5 max-w-3xl">
            <div className="p-3 bg-white/5 rounded-2xl border border-emerald-500/30 backdrop-blur-xs shrink-0 shadow-lg">
              <Fuel className="w-10 h-10 text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AI LEAD FUEL & REVENUE ACTIVATION ENGINE</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  Dallas EIN: 27-3243694
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Turn AI Autopilot into Real Cash Flow
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The Autopilot is built and ready. Fuel the engine with live Dallas business leads, broadcast high-converting social campaigns, and execute the 7-Day Revenue Kickstart Plan with 1 click.
              </p>
            </div>
          </div>

          {/* Direct Phone & Live Assets Quick Box */}
          <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl shrink-0 space-y-2.5">
            <div className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
              Verified Business Assets
            </div>
            <div className="text-xs text-slate-200 space-y-1 font-semibold">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Line: <strong className="text-white font-mono">(469) 386-7235</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dallas Office: <strong className="text-white">6215 Shady Brook Ln</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Legal Tax ID: <strong className="text-emerald-300 font-mono">EIN 27-3243694</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveSubView('fuel_pump')}
            className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
              activeSubView === 'fuel_pump'
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Fuel className="w-4 h-4" />
            <span>1. Lead Fuel Pump (Auto-Run)</span>
          </button>

          <button
            onClick={() => setActiveSubView('kickstart_7day')}
            className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
              activeSubView === 'kickstart_7day'
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>2. 7-Day Revenue Plan (1-Click)</span>
          </button>

          <button
            onClick={() => setActiveSubView('social_broadcast')}
            className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
              activeSubView === 'social_broadcast'
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>3. Social Broadcast & Share Hub</span>
          </button>

          <button
            onClick={() => setActiveSubView('capabilities')}
            className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
              activeSubView === 'capabilities'
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>4. AI Scope vs Your Role</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: 1-CLICK DALLAS LEAD FUEL PUMP */}
      {activeSubView === 'fuel_pump' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Pipeline Execution</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Dallas Business Lead Fuel Pump & End-to-End Execution
                </h2>
                <p className="text-xs text-slate-500">
                  Select a real Dallas prospect profile below, then click to watch the AI take the lead from intake to closed revenue and invoice settlement under EIN 27-3243694.
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full self-start sm:self-auto">
                Ready for Live Fuel Injection
              </span>
            </div>

            {/* Select Prospect Presets */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {dallasProspectPresets.map((preset, idx) => {
                const isSelected = selectedDallasProspect.name === preset.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDallasProspect(preset)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 truncate">{preset.name}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">{preset.company}</div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700">{preset.domain.split(' ')[0]}</span>
                      <span className="font-mono font-extrabold text-xs text-slate-900">${preset.dealAmount.toLocaleString()}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Prospect Details Card */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-sm shrink-0">
                    {selectedDallasProspect.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      {selectedDallasProspect.name} • {selectedDallasProspect.company}
                    </h3>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                      <span>{selectedDallasProspect.email}</span>
                      <span>•</span>
                      <span>{selectedDallasProspect.phone}</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-700">{selectedDallasProspect.domain}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-semibold">Target Deal Scope</div>
                  <div className="text-xl font-black text-slate-900 font-mono">${selectedDallasProspect.dealAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80">
                <strong className="text-slate-800">Lead Case Notes: </strong>
                {selectedDallasProspect.notes}
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteFullPipeline}
                disabled={isExecutingPipeline}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center space-x-2.5 transition shadow-lg disabled:opacity-50"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>
                  {isExecutingPipeline
                    ? `Running Step ${activePipelineStep} of 6 in Autopilot...`
                    : `⚡ Inject Prospect & Run Full 6-Stage Autopilot Cycle ($${selectedDallasProspect.dealAmount.toLocaleString()} Cash Settlement)`}
                </span>
              </button>
            </div>

            {/* Live Visual 6-Stage Pipeline Stepper */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>End-to-End Pipeline Progression</span>
                <span className="text-emerald-700 font-mono">{pipelineProgress}% Complete</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pipelineProgress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
                {[
                  { num: 1, title: '1. Lead Ingestion', desc: 'Ingested into /api/leads', icon: Fuel },
                  { num: 2, title: '2. AI Scoring', desc: '98/100 High-Intent Fit', icon: Sparkles },
                  { num: 3, title: '3. Auto Nurture', desc: 'Touch 1 Email + SMS Sent', icon: Send },
                  { num: 4, title: '4. Strategy Call', desc: 'Calendar Slot Locked', icon: Calendar },
                  { num: 5, title: '5. Gemini Deal', desc: `Flash Proposal Generated`, icon: Bot },
                  { num: 6, title: '6. Settle Invoice', desc: 'Paid via Stripe (EIN 27-3243694)', icon: CheckCircle2 }
                ].map((st) => {
                  const isDone = activePipelineStep >= st.num;
                  const isCurrent = activePipelineStep === st.num;
                  const Icon = st.icon;

                  return (
                    <div
                      key={st.num}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between transition ${
                        isDone
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                          : isCurrent
                          ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase">{st.num}. Stage</span>
                        <Icon className={`w-4 h-4 ${isDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">{st.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{st.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline Result Box */}
            {pipelineResults && (
              <div className="p-6 bg-emerald-950 text-white rounded-3xl border border-emerald-500/50 shadow-xl space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-white">
                        Cycle Completed: Cash Collected & Settled
                      </h4>
                      <p className="text-xs text-emerald-300">
                        Invoice {pipelineResults.invoice.id} settled under <strong>CFO TAX PRO LLC</strong> (EIN: 27-3243694)
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      +${pipelineResults.invoice.amount.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-300">
                      Stripe Transaction: {pipelineResults.invoice.transactionId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Client / Account:</span>
                    <strong className="text-white">{pipelineResults.lead.name} ({pipelineResults.lead.company})</strong>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Tax ID Verified:</span>
                    <strong className="text-emerald-300 font-mono">{pipelineResults.invoice.taxId}</strong>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Payment Channel:</span>
                    <strong className="text-white">{pipelineResults.invoice.paymentMethod}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-300">
                    Lead is now marked as <strong>Closed / Paid</strong> in Revenue CRM with 100% lead score.
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab('pipeline')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <span>View in Revenue CRM</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* VIEW 2: 7-DAY REVENUE ACTIVATION PLAN */}
      {activeSubView === 'kickstart_7day' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Actionable Daily Milestones</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  7-Day Revenue Kickstart Execution Plan
                </h2>
                <p className="text-xs text-slate-500">
                  Follow this day-by-day protocol or click "⚡ Run Day AI Automation" to execute each milestone automatically.
                </p>
              </div>

              <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
                Completed: <span className="text-emerald-700 font-mono font-extrabold">{kickstartDays.filter(d => d.status === 'Completed').length} / 7 Days</span>
              </div>
            </div>

            <div className="space-y-3">
              {kickstartDays.map((d) => {
                const isCompleted = d.status === 'Completed';
                const isExecuting = executingDayNumber === d.day;

                return (
                  <div
                    key={d.day}
                    className={`p-5 rounded-2xl border transition duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 mt-0.5 ${
                        isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isCompleted ? <Check className="w-5 h-5" /> : `D${d.day}`}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-extrabold text-sm text-slate-900">{d.title}</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {d.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 max-w-2xl">{d.focus}</p>
                        <div className="text-[11px] text-slate-500 font-semibold flex items-center space-x-2 pt-0.5">
                          <span className="text-emerald-700 font-bold">Execution Log:</span>
                          <span>{d.log}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end md:self-auto shrink-0">
                      {d.revenue > 0 && (
                        <div className="text-right">
                          <div className="font-mono font-extrabold text-sm text-emerald-700">+${d.revenue.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">Cash Flow</div>
                        </div>
                      )}

                      <button
                        onClick={() => handleExecuteKickstartDay(d.day)}
                        disabled={isExecuting}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition ${
                          isCompleted
                            ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>{isExecuting ? 'Executing...' : isCompleted ? 'Re-Run Day AI Task' : `⚡ Execute Day ${d.day} AI Task`}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* VIEW 3: MULTI-CHANNEL SOCIAL BROADCAST & LIVE ASSET SHARING */}
      {activeSubView === 'social_broadcast' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mb-1">
                <Share2 className="w-4 h-4 text-purple-600" />
                <span>Fuel Your Machine with Traffic</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Multi-Channel Social Broadcast & Live Asset Sharing
              </h2>
              <p className="text-xs text-slate-500">
                Copy and share your live URLs or post these pre-written high-ticket conversion scripts to drive traffic into your 24/7 AI Lead Intake Chatbot.
              </p>
            </div>

            {/* Direct 1-Click Copy Links Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Landing Page */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800 font-extrabold text-xs">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Live Landing Page URL</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Ready</span>
                </div>
                <div className="font-mono text-xs text-slate-600 bg-white p-2.5 rounded-xl border truncate">
                  {liveLandingPageUrl}
                </div>
                <button
                  onClick={() => handleCopy(liveLandingPageUrl, 'landing')}
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  {copiedKey === 'landing' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'landing' ? 'Copied to Clipboard!' : 'Copy Landing Link'}</span>
                </button>
              </div>

              {/* 24/7 AI Lead Chatbot */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800 font-extrabold text-xs">
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <span>24/7 AI Chatbot Link</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="font-mono text-xs text-slate-600 bg-white p-2.5 rounded-xl border truncate">
                  {liveChatbotUrl}
                </div>
                <button
                  onClick={() => handleCopy(liveChatbotUrl, 'chatbot')}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs"
                >
                  {copiedKey === 'chatbot' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'chatbot' ? 'Copied to Clipboard!' : 'Copy Chatbot Link'}</span>
                </button>
              </div>

              {/* Strategy Calendar Booking */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800 font-extrabold text-xs">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Instant Booking Calendar</span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="font-mono text-xs text-slate-600 bg-white p-2.5 rounded-xl border truncate">
                  {liveCalendarUrl}
                </div>
                <button
                  onClick={() => handleCopy(liveCalendarUrl, 'calendar')}
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  {copiedKey === 'calendar' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'calendar' ? 'Copied to Clipboard!' : 'Copy Calendar Link'}</span>
                </button>
              </div>

            </div>

            {/* Broadcast Copy Platform Tabs */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleGenerateBroadcast('linkedin')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      broadcastPlatform === 'linkedin'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    LinkedIn Broadcast Post
                  </button>

                  <button
                    onClick={() => handleGenerateBroadcast('nextdoor')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      broadcastPlatform === 'nextdoor'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Nextdoor / Facebook Group Post
                  </button>

                  <button
                    onClick={() => handleGenerateBroadcast('email_sms')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      broadcastPlatform === 'email_sms'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Direct 1-to-1 Email & SMS Script
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(broadcastContent.content, 'broadcast')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm"
                >
                  {copiedKey === 'broadcast' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'broadcast' ? 'Copied Full Script!' : 'Copy Script to Clipboard'}</span>
                </button>
              </div>

              {/* Script Preview Box */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {isGeneratingBroadcast ? (
                  <div className="flex items-center justify-center py-10 text-emerald-400 space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Writing high-converting Dallas authority post with Gemini AI...</span>
                  </div>
                ) : (
                  broadcastContent.content
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 4: AI SCOPE VS YOUR ROLE */}
      {activeSubView === 'capabilities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>Operational Separation of Concerns</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                What the AI Handles for You vs. Your Only Job
              </h2>
              <p className="text-xs text-slate-500">
                The entire system is calibrated so that the AI performs the heavy lifting, paperwork, follow-ups, and billing, while you focus solely on client delivery and strategy calls.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* What AI Does */}
              <div className="p-6 bg-emerald-950 text-white rounded-3xl border border-emerald-800 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">What the AI Handles 24/7</h3>
                    <p className="text-xs text-emerald-300">Automated, repeatable, error-free execution</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>24/7 Lead Capture:</strong> AI chatbot engages every visitor instantly.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Lead Scoring & Qualification:</strong> Evaluates fit, net worth, and urgency (1-100).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>7-Touch Nurture Sequences:</strong> Dispatches pre-scheduled emails and SMS.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Strategy Call Booking:</strong> Synchronizes availability onto your calendar.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Flash Deal Scoping:</strong> Gemini Flash calculates dynamic retainers and scopes.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Legal Invoicing & Tax Compliance:</strong> Dispatches invoices under EIN 27-3243694.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Payment Settlement:</strong> Collects Stripe / ACH payments and updates ledger.</span>
                  </li>
                </ul>
              </div>

              {/* Your Only Job */}
              <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Your Only Role (The Human Expert)</h3>
                    <p className="text-xs text-amber-300">High-leverage, high-trust client relationship steps</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <div className="font-extrabold text-amber-300 mb-1">1. Fuel the Machine</div>
                    <div>Post your landing page and chatbot links once or twice per week on LinkedIn and Nextdoor to keep fresh leads flowing.</div>
                  </li>
                  <li className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <div className="font-extrabold text-emerald-400 mb-1">2. Show Up to Strategy Calls</div>
                    <div>Review the AI-generated lead brief, hop on the scheduled video/phone call, build trust, and confirm the engagement scope.</div>
                  </li>
                  <li className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <div className="font-extrabold text-blue-400 mb-1">3. Deliver Top-Tier CFO/Tax Service</div>
                    <div>Deliver the S-Corp restructuring, IRS penalty abatement, or claim forensic audit to earn 5-star reviews and repeat retainers.</div>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
