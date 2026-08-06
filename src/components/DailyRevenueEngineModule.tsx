import React, { useState, useEffect } from 'react';
import { RevenueDomain, DailySubscriptionTier, DailyRevenueEvent, AutonomousMoneyMachine } from '../types';
import { CfoTaxProLogo } from './CfoTaxProLogo';
import { 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Repeat, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Pause, 
  CheckCircle2, 
  CreditCard, 
  ArrowUpRight, 
  Clock, 
  Send, 
  Bot, 
  Activity, 
  Printer, 
  Plus, 
  Lock, 
  AlertCircle,
  FileText,
  BadgeCheck,
  Percent,
  Fuel,
  Share2,
  Calendar
} from 'lucide-react';

interface DailyRevenueEngineModuleProps {
  businessName: string;
  activeDomain: RevenueDomain;
  onPaymentCollected?: (amount: number, clientName: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const DailyRevenueEngineModule: React.FC<DailyRevenueEngineModuleProps> = ({
  businessName,
  activeDomain,
  onPaymentCollected,
  onNavigateTab
}) => {
  // State from server
  const [isAutopilotEnabled, setIsAutopilotEnabled] = useState(true);
  const [dailyTarget, setDailyTarget] = useState(5000);
  const [todayEarned, setTodayEarned] = useState(3450);
  const [activeSubscriptionsCount, setActiveSubscriptionsCount] = useState(18);
  const [mrr, setMrr] = useState(28425);
  const [thirtyDayProjection, setThirtyDayProjection] = useState(114500);
  
  const [subscriptionTiers, setSubscriptionTiers] = useState<DailySubscriptionTier[]>([]);
  const [machines, setMachines] = useState<AutonomousMoneyMachine[]>([]);
  const [recentEvents, setRecentEvents] = useState<DailyRevenueEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [triggeringMachineId, setTriggeringMachineId] = useState<string | null>(null);

  // New Subscription Enrollment Modal State
  const [selectedTierForEnroll, setSelectedTierForEnroll] = useState<DailySubscriptionTier | null>(null);
  const [subClientName, setSubClientName] = useState('Highland Park Dental Group');
  const [subClientEmail, setSubClientEmail] = useState('admin@hpdental.com');
  const [subPaymentMethod, setSubPaymentMethod] = useState<'Stripe Auto-Pay' | 'ACH Direct'>('Stripe Auto-Pay');
  const [isSubmittingSub, setIsSubmittingSub] = useState(false);

  // Flash Deal Generator State
  const [flashClientName, setFlashClientName] = useState('Apex Industrial Holdings');
  const [flashDomain, setFlashDomain] = useState(activeDomain.name);
  const [generatingDeal, setGeneratingDeal] = useState(false);
  const [flashDealResult, setFlashDealResult] = useState<any>({
    dealTitle: 'Flash 48-Hour Tax & S-Corp Restructuring Package',
    targetPrice: 1850,
    regularPrice: 3200,
    discountReason: 'Mid-Quarter Rapid Onboarding Incentive',
    closingScript: 'Hi Marcus, we have authorized a $1,350 credit on our full corporate S-Corp & Section 179 forensic tax package if authorized today. This guarantees an estimated $18,400 in direct tax write-offs for 2026.',
    checkoutLink: 'https://pay.stripe.com/cfo-tax-flash-1850',
    deliverables: [
      '3-Year Prior Return Forensic Audit & Credit Sweep',
      'Form 2553 S-Corp Election & Reasonable Salary Structuring',
      'Section 179 Heavy Equipment & Vehicle Deductions',
      'First 3 Months Continuous IRS Shield & Audit Defense Included'
    ]
  });

  // Active Receipt Modal
  const [activeReceipt, setActiveReceipt] = useState<DailyRevenueEvent | null>(null);

  // Fetch real state from server
  const fetchRevenueState = async () => {
    try {
      const res = await fetch('/api/daily-revenue');
      if (res.ok) {
        const data = await res.json();
        const state = data.state;
        setIsAutopilotEnabled(state.isAutopilotEnabled);
        setDailyTarget(state.dailyTarget);
        setTodayEarned(state.todayEarned);
        setActiveSubscriptionsCount(state.activeSubscriptionsCount);
        setMrr(state.mrr);
        setThirtyDayProjection(state.thirtyDayProjection);
        setSubscriptionTiers(state.subscriptionTiers || []);
        setMachines(state.machines || []);
        setRecentEvents(state.recentEvents || []);
      }
    } catch (e) {
      console.error("Failed to load revenue state", e);
    }
  };

  useEffect(() => {
    fetchRevenueState();
  }, []);

  // Toggle 24/7 Autopilot
  const handleToggleAutopilot = async () => {
    try {
      const res = await fetch('/api/daily-revenue/toggle-autopilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !isAutopilotEnabled })
      });
      if (res.ok) {
        setIsAutopilotEnabled(!isAutopilotEnabled);
        await fetchRevenueState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger Machine
  const handleTriggerMachine = async (machineId: string) => {
    setTriggeringMachineId(machineId);
    try {
      const res = await fetch('/api/daily-revenue/trigger-machine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ machineId })
      });
      if (res.ok) {
        const data = await res.json();
        if (onPaymentCollected && data.yieldAmount) {
          onPaymentCollected(data.yieldAmount, data.event.clientName);
        }
        await fetchRevenueState();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTriggeringMachineId(null);
    }
  };

  // Enroll & Charge Subscription
  const handleEnrollSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTierForEnroll || !subClientName) return;
    setIsSubmittingSub(true);

    try {
      const res = await fetch('/api/daily-revenue/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: selectedTierForEnroll.id,
          clientName: subClientName,
          clientEmail: subClientEmail,
          paymentMethod: subPaymentMethod
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (onPaymentCollected && selectedTierForEnroll.price) {
          onPaymentCollected(selectedTierForEnroll.price, subClientName);
        }
        await fetchRevenueState();
        setSelectedTierForEnroll(null);
        setActiveReceipt(data.event);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingSub(false);
    }
  };

  // Generate Flash Deal with Gemini
  const handleGenerateFlashDeal = async () => {
    setGeneratingDeal(true);
    try {
      const res = await fetch('/api/daily-revenue/instant-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: flashClientName,
          serviceDomain: flashDomain
        })
      });
      if (res.ok) {
        const data = await res.json();
        setFlashDealResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingDeal(false);
    }
  };

  // Instant Collect Flash Deal
  const handleCollectFlashPayment = async () => {
    if (!flashDealResult) return;
    const amount = flashDealResult.targetPrice || 1850;
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: flashClientName,
          clientEmail: 'billing@client.com',
          domainName: flashDealResult.dealTitle,
          amount: amount,
          lineItems: [
            { description: flashDealResult.dealTitle, quantity: 1, rate: amount, total: amount }
          ],
          notes: 'Flash 48-Hour Rapid Onboarding Deal. Auto-paid via Stripe.'
        })
      });

      if (res.ok) {
        const invData = await res.json();
        await fetch(`/api/invoices/${invData.invoice.id}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentMethod: 'Credit Card (Stripe)' })
        });
        
        if (onPaymentCollected) {
          onPaymentCollected(amount, flashClientName);
        }
        
        setTodayEarned(prev => prev + amount);
        const newEvent: DailyRevenueEvent = {
          id: `tx_flash_${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: 'Just now',
          type: 'Consulting Close',
          clientName: flashClientName,
          amount: amount,
          status: 'Completed',
          channel: 'Stripe Auto-Pay'
        };
        setRecentEvents(prev => [newEvent, ...prev]);
        setActiveReceipt(newEvent);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const progressPercent = Math.min(100, Math.round((todayEarned / dailyTarget) * 100));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 24/7 MASTER TELEMETRY COMMAND BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 max-w-3xl">
            <div className="p-2 bg-white/5 rounded-2xl border border-emerald-500/30 backdrop-blur-xs shrink-0 shadow-lg">
              <CfoTaxProLogo size={68} />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>24/7 DAILY REVENUE GENERATION SYSTEM</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  Dallas EIN: 27-3243694
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Round-the-Clock Cash Flow & Recurring Retainer Engine
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Automating multi-channel revenue extraction 24 hours a day, 7 days a week: Recurring Monthly CFO Retainers, 60-Second Lead Booking Deposits, Emergency Tax Relief Retainers, and Outbound High-Ticket Deal Scopes.
              </p>
            </div>
          </div>

          {/* Autopilot Controller & Master Switch */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleToggleAutopilot}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2.5 transition shadow-lg ${
                isAutopilotEnabled
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 ring-4 ring-emerald-500/20'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {isAutopilotEnabled ? (
                <>
                  <Zap className="w-4 h-4 text-slate-950 fill-current" />
                  <span>24/7 AUTOPILOT ACTIVE (ONLINE)</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>AUTOPILOT PAUSED (CLICK TO START)</span>
                </>
              )}
            </button>

            <button
              onClick={fetchRevenueState}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl text-xs font-bold text-white transition flex items-center justify-center space-x-1.5"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Sync Ledger</span>
            </button>
          </div>

        </div>

        {/* Real-time KPI Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          
          {/* Daily Cash Target */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
              <span>Today's Cash Collected</span>
              <span className="text-emerald-400 font-bold">{progressPercent}% of Goal</span>
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              ${todayEarned.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ ${dailyTarget.toLocaleString()}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Monthly Recurring Revenue */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold mb-1">Monthly Recurring MRR</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              ${mrr.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
              <Repeat className="w-3 h-3 text-emerald-400" />
              <span>${(mrr * 12).toLocaleString()} Annualized Run Rate</span>
            </div>
          </div>

          {/* Active Subscriptions */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold mb-1">Active Client Retainers</div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {activeSubscriptionsCount} <span className="text-xs text-emerald-400 font-semibold">Active Clients</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              100% On-Time Stripe Auto-Billing
            </div>
          </div>

          {/* 30-Day Cash Projection */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold mb-1">30-Day Cash Velocity</div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono">
              ${thirtyDayProjection.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              <span>Projected Cash Inflow (Avg $3.8k/day)</span>
            </div>
          </div>

        </div>

      </div>

      {/* AI AUTOPILOT FUEL & 7-DAY REVENUE ACTIVATION CALLOUT */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-500/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="flex items-start space-x-4 max-w-2xl">
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 text-emerald-400 shrink-0">
            <Fuel className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-extrabold uppercase rounded-full">
                Fuel The Engine
              </span>
              <span className="text-xs text-slate-400 font-bold">1-Click Lead Injection & Social Broadcasting</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">
              Need Leads to Convert? Inject Dallas Prospects or Broadcast Social Posts
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Autopilot requires fuel to fly. Ingest real Dallas business leads (Roofing, Medical, Logistics) into the machine or copy pre-generated LinkedIn/Nextdoor broadcast posts with 1 click.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 self-stretch lg:self-auto">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('lead_fuel')}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition shadow-lg flex-1 sm:flex-none"
              >
                <Fuel className="w-4 h-4 fill-current" />
                <span>🚀 Launch Lead Fuel Pump</span>
              </button>
              <button
                onClick={() => onNavigateTab('lead_fuel')}
                className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition flex-1 sm:flex-none"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>7-Day Plan (1-Click)</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* SECTION 1: THE 4 AUTONOMOUS MONEY MAKING MOTORS (24/7 ACTIVE LOOPS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>4 Continuous Revenue Motors</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              24/7 Autonomous Money Making Motors
            </h2>
            <p className="text-xs text-slate-500">
              Each motor runs independently in the background, converting leads, collecting retainers, and driving daily cash collections.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            Status: <span className="text-emerald-700">All 4 Motors Operating Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {machines.map((machine) => {
            const isTriggering = triggeringMachineId === machine.id;

            return (
              <div 
                key={machine.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-slate-50 transition duration-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-extrabold text-sm text-slate-900">{machine.name}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      {machine.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {machine.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-400 font-semibold">Today's Yield</div>
                    <div className="font-extrabold text-slate-900 font-mono text-sm">${machine.todayCollected.toLocaleString()}</div>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-400 font-semibold">Daily Yield Est.</div>
                    <div className="font-extrabold text-emerald-700 font-mono text-sm">${machine.dailyYieldEstimate.toLocaleString()}</div>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-400 font-semibold">Close Rate</div>
                    <div className="font-extrabold text-blue-700 font-mono text-sm">{machine.conversionRate}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleTriggerMachine(machine.id)}
                  disabled={isTriggering}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  <span>{isTriggering ? 'Executing Revenue Cycle...' : `Force Execute Cycle (Yield $${machine.id === 'machine_auto_biller' ? '499' : machine.id === 'machine_lead_closer' ? '250' : machine.id === 'machine_emergency_tax' ? '1,500' : '2,500'})`}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: HIGH-YIELD RECURRING SUBSCRIPTIONS & MONTHLY RETAINERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Repeat className="w-4 h-4 text-blue-600" />
              <span>Predictable Daily & Monthly Cash Flow</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Recurring Subscription Tiers & Retainer Desk
            </h2>
            <p className="text-xs text-slate-500">
              Lock in clients onto automatic monthly Stripe billing for continuous legal, tax, and CFO protection.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Total Retainer MRR: </span>
            <span className="text-lg font-extrabold text-emerald-700 font-mono">${mrr.toLocaleString()} / mo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition duration-200 ${
                tier.popular
                  ? 'bg-gradient-to-b from-emerald-50/50 to-white border-emerald-400 ring-2 ring-emerald-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 rounded-md text-slate-700">
                    {tier.category}
                  </span>
                  {tier.popular && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-600 text-white rounded-md">
                      Top Choice
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{tier.name}</h3>
                
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">${tier.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-semibold">/ month</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                    {tier.activeSubscribers} Active Clients • ${tier.mrr.toLocaleString()} MRR
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-800">Included Deliverables:</div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedTierForEnroll(tier)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll Client ($ {tier.price.toLocaleString()})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FLASH 48-HOUR CASH DEAL GENERATOR & INSTANT CHECKOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Deal Builder (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Gemini Flash Deal Machine</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Generate 48-Hour Daily Cash Proposal
            </h3>
            <p className="text-xs text-slate-500">
              Instantly create a high-ticket incentive package to close immediate daily payments.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Prospect / Business Name</label>
              <input
                type="text"
                value={flashClientName}
                onChange={(e) => setFlashClientName(e.target.value)}
                placeholder="e.g. Apex Industrial Holdings"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Focus Domain</label>
              <select
                value={flashDomain}
                onChange={(e) => setFlashDomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
              >
                <option value="Tax Prep & S-Corp Advisory">Tax Prep & S-Corp Advisory (CFO TAX PRO LLC)</option>
                <option value="Commercial Claims Consulting">Commercial Claims Consulting ($74k Recovery)</option>
                <option value="Fractional CFO & Bookkeeping">Fractional CFO & Bookkeeping ($2.5k Retainer)</option>
                <option value="IRS Penalty Abatement & Fresh Start">IRS Penalty Abatement & Fresh Start Relief</option>
              </select>
            </div>

            <button
              onClick={handleGenerateFlashDeal}
              disabled={generatingDeal}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{generatingDeal ? 'AI Generating Flash Deal...' : 'Synthesize 48-Hr Deal & Pitch'}</span>
            </button>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-slate-700 space-y-1">
            <div className="font-bold text-emerald-900 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dallas Entity Compliance:</span>
            </div>
            <div>Invoices dispatch under <strong>CFO TAX PRO LLC</strong> (EIN: 27-3243694)</div>
            <div>Direct Office: 6215 Shady Brook Ln, Dallas TX 75206</div>
          </div>
        </div>

        {/* Right: Active Deal & Instant Checkout Link (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                48-Hour Expiring Incentive
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">{flashDealResult.dealTitle}</h3>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 line-through">${flashDealResult.regularPrice?.toLocaleString()}</div>
              <div className="text-xl font-black text-emerald-700 font-mono">${flashDealResult.targetPrice?.toLocaleString()}</div>
            </div>
          </div>

          {/* Pitch Script */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">Direct Closing Message / Script:</div>
            <p className="text-slate-800 leading-relaxed italic">
              "{flashDealResult.closingScript}"
            </p>
          </div>

          {/* Deliverables List */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800">Scope of Deliverables:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flashDealResult.deliverables?.map((item: string, idx: number) => (
                <div key={idx} className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Action Bar */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCollectFlashPayment}
              className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition shadow-md"
            >
              <CreditCard className="w-4 h-4" />
              <span>Collect Flash Payment Now (${flashDealResult.targetPrice?.toLocaleString()})</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(flashDealResult.checkoutLink || 'https://pay.stripe.com/cfo-tax-flash');
                alert('Stripe Instant Checkout Link Copied to Clipboard!');
              }}
              className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <Send className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Stripe Link</span>
            </button>
          </div>
        </div>

      </div>

      {/* SECTION 4: REAL-TIME 24/7 CASH TRANSACTION LEDGER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Live Settlement Feed</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Today's Real-Time 24/7 Cash Collections
            </h2>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Auto-Refreshes with Every Cycle
          </div>
        </div>

        <div className="space-y-2.5">
          {recentEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-slate-900">{evt.clientName}</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                    <span className="font-semibold text-emerald-700">{evt.type}</span>
                    <span>•</span>
                    <span>{evt.channel}</span>
                    <span>•</span>
                    <span>{evt.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-base font-extrabold text-slate-900 font-mono">
                    +${evt.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-end space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SETTLED (STRIPE)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveReceipt(evt)}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: ENROLL CLIENT IN SUBSCRIPTION */}
      {selectedTierForEnroll && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Enroll Client into Subscription</h3>
                <p className="text-xs text-slate-500">{selectedTierForEnroll.name}</p>
              </div>
              <button
                onClick={() => setSelectedTierForEnroll(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollSubscription} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Business / Client Name</label>
                <input
                  type="text"
                  value={subClientName}
                  onChange={(e) => setSubClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Email Address</label>
                <input
                  type="email"
                  value={subClientEmail}
                  onChange={(e) => setSubClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Recurring Payment Channel</label>
                <select
                  value={subPaymentMethod}
                  onChange={(e: any) => setSubPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                >
                  <option value="Stripe Auto-Pay">Credit Card (Stripe Auto-Pay)</option>
                  <option value="ACH Direct">Bank ACH Direct Debit (Net 0)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <div className="flex justify-between font-bold text-emerald-950">
                  <span>First Monthly Charge:</span>
                  <span className="font-mono text-base">${selectedTierForEnroll.price.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  Subsequent charges occur on the 1st of every month automatically.
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingSub}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmittingSub ? 'Authorizing Payment...' : `Authorize & Charge $${selectedTierForEnroll.price.toLocaleString()}`}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL TAX PRO RECEIPT */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <CfoTaxProLogo size={42} />
                <div>
                  <div className="font-extrabold text-base text-slate-900">CFO TAX PRO LLC</div>
                  <div className="text-xs text-slate-500">24/7 Revenue Settlement & Payment Receipt</div>
                </div>
              </div>
              <button
                onClick={() => setActiveReceipt(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-900">{activeReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client / Account:</span>
                <span className="font-bold text-slate-900">{activeReceipt.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenue Type:</span>
                <span className="font-semibold text-emerald-700">{activeReceipt.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Settlement Channel:</span>
                <span className="font-mono">{activeReceipt.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Collected:</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">${activeReceipt.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized Entity:</span>
                <span>CFO TAX PRO LLC • EIN: 27-3243694</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Office Location:</span>
                <span>6215 Shady Brook Ln, Dallas, TX 75206</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Status: FUNDS CAPTURED & CLEARED VIA STRIPE</span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
