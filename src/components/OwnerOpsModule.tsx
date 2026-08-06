import React, { useState } from 'react';
import { RevenueDomain, OwnerSOP, CustomerRequirementItem } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Users, 
  DollarSign, 
  Briefcase, 
  Layers, 
  Sliders, 
  Cpu, 
  FileText, 
  Plus, 
  Copy, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Award
} from 'lucide-react';

interface OwnerOpsModuleProps {
  businessName: string;
  activeDomain: RevenueDomain;
  totalPipelineValue: number;
}

const DEFAULT_SOPS: OwnerSOP[] = [
  {
    id: 'sop-1',
    title: 'Daily Speed-to-Lead & AI Chatbot Audit',
    category: 'Daily',
    role: 'AI Automation',
    frequency: 'Every Morning 8:00 AM',
    isAutomated: true,
    completed: true,
    description: 'Ensure 24/7 AI Chatbot is qualifying tax & fractional CFO leads and auto-booking intro calls.',
    checklist: [
      'Verify chatbot response latency (< 2 seconds)',
      'Review automated lead entries in CRM pipeline',
      'Ensure Calendly booking links are active'
    ]
  },
  {
    id: 'sop-2',
    title: 'Client Financial Intake & Document Vault Review',
    category: 'Daily',
    role: 'Assigned Staff',
    frequency: 'Daily 2:00 PM',
    isAutomated: false,
    completed: true,
    description: 'Collect tax forms (W2, 1099, P&L statements, bank logs) uploaded into encrypted client vault.',
    checklist: [
      'Check encrypted client intake queue',
      'Validate completeness of uploaded tax records',
      'Trigger automated SMS reminder for missing documents'
    ]
  },
  {
    id: 'sop-3',
    title: 'Weekly Fractional CFO & Bookkeeping Reconciliation Sync',
    category: 'Weekly',
    role: 'Owner',
    frequency: 'Mondays 9:00 AM',
    isAutomated: false,
    completed: false,
    description: 'Review high-value retainer accounts, profit margin trends, and cloud tech stack expense logs.',
    checklist: [
      'Reconcile weekly client accounts in QuickBooks / Xero',
      'Log R&D credit eligible tech expenses for software clients',
      'Send weekly financial snapshot email to CFO retainer clients'
    ]
  },
  {
    id: 'sop-4',
    title: 'Automated Invoice Collection & Payment Gateway Check',
    category: 'Weekly',
    role: 'AI Automation',
    frequency: 'Fridays 4:00 PM',
    isAutomated: true,
    completed: true,
    description: 'Process recurring retainer charges via Stripe and trigger auto-drip reminders for open invoices.',
    checklist: [
      'Audit auto-debit payments for monthly CFO retainers',
      'Send automated 3-day polite reminder for pending invoices',
      'Update revenue collected in CRM Dashboard'
    ]
  },
  {
    id: 'sop-5',
    title: 'Monthly IRS Compliance & Audit Risk Evaluation',
    category: 'Monthly',
    role: 'Owner',
    frequency: '1st of Every Month',
    isAutomated: false,
    completed: false,
    description: 'Review Enrolled Agent credentials, state tax filing updates, and client tax strategy roadmaps.',
    checklist: [
      'Cross-check latest IRS Circular 230 guidelines',
      'Review active tax resolution cases & offer in compromise filings',
      'Audit client retention rate and SLA compliance metrics'
    ]
  }
];

const DEFAULT_CUSTOMER_REQUIREMENTS: CustomerRequirementItem[] = [
  {
    id: 'req-1',
    category: 'Speed & Accessibility',
    requirement: 'Instant 24/7 Inquiry Response (< 2 Min Speed-to-Lead)',
    status: 'Fulfilled',
    evidence: '24/7 AI Chatbot & Instant Lead Capture Form active'
  },
  {
    id: 'req-2',
    category: 'Trust & Credibility',
    requirement: 'Verified Professional Credentials & Licensing',
    status: 'Fulfilled',
    evidence: 'IRS Enrolled Agent (EA), QuickBooks ProAdvisor, NATP Badges active'
  },
  {
    id: 'req-3',
    category: 'Pricing Transparency',
    requirement: 'Clear Scope, Flat Pricing, & Return-on-Investment Expectations',
    status: 'Fulfilled',
    evidence: 'Upfront average deal values & ROI guarantees displayed'
  },
  {
    id: 'req-4',
    category: 'Security & Compliance',
    requirement: 'Bank-Grade Data Encryption & IRS Privacy Protection',
    status: 'Fulfilled',
    evidence: 'Encrypted document vault, SSL, & IRS Pub 1075 standards'
  },
  {
    id: 'req-5',
    category: 'Tech Stack & Service Scalability',
    requirement: 'Seamless Tech Integration & R&D Credit Tracking',
    status: 'Fulfilled',
    evidence: 'QuickBooks, Xero, AWS/GCP cloud stack R&D credit module active'
  },
  {
    id: 'req-6',
    category: 'Fulfillment & SLA',
    requirement: 'Rapid Turnaround & Guaranteed Audit Defense Support',
    status: 'Fulfilled',
    evidence: '48-hour turnarounds & 100% filing accuracy guarantee'
  }
];

export const OwnerOpsModule: React.FC<OwnerOpsModuleProps> = ({
  businessName,
  activeDomain,
  totalPipelineValue
}) => {
  const [sops, setSops] = useState<OwnerSOP[]>(DEFAULT_SOPS);
  const [requirements] = useState<CustomerRequirementItem[]>(DEFAULT_CUSTOMER_REQUIREMENTS);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  // Capacity & Financial Buffer Simulator
  const [activeClients, setActiveClients] = useState(24);
  const [maxCapacity, setMaxCapacity] = useState(35);
  const [avgRetainer, setAvgRetainer] = useState(activeDomain.avgRevenue || 2000);
  const [monthlyOverhead, setMonthlyOverhead] = useState(12000);
  const [cashReserve, setCashReserve] = useState(75000);

  // New SOP Modal State
  const [showAddSopModal, setShowAddSopModal] = useState(false);
  const [newSopTitle, setNewSopTitle] = useState('');
  const [newSopRole, setNewSopRole] = useState<'Owner' | 'AI Automation' | 'Assigned Staff'>('Owner');
  const [newSopCategory, setNewSopCategory] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Quarterly'>('Daily');
  const [newSopDescription, setNewSopDescription] = useState('');

  // Calculations
  const monthlyRevenue = activeClients * avgRetainer;
  const netMonthlyProfit = monthlyRevenue - monthlyOverhead;
  const cashBufferMonths = monthlyOverhead > 0 ? (cashReserve / monthlyOverhead).toFixed(1) : '99+';
  const capacityUsagePercent = Math.round((activeClients / maxCapacity) * 100);

  const completedSopsCount = sops.filter((s) => s.completed).length;
  const sopCompletionPercent = Math.round((completedSopsCount / sops.length) * 100);

  const handleToggleSop = (id: string) => {
    setSops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleAddSopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSopTitle) return;

    const newSop: OwnerSOP = {
      id: `sop-${Date.now()}`,
      title: newSopTitle,
      category: newSopCategory,
      role: newSopRole,
      frequency: `${newSopCategory} Scheduled`,
      isAutomated: newSopRole === 'AI Automation',
      completed: false,
      description: newSopDescription || 'Custom standard operating procedure for business operations.',
      checklist: ['Execute operational steps', 'Log execution in master dashboard']
    };

    setSops((prev) => [newSop, ...prev]);
    setNewSopTitle('');
    setNewSopDescription('');
    setShowAddSopModal(false);
  };

  const handleCopyOwnerBlueprint = () => {
    const text = `
=== OWNER OPERATIONS BLUEPRINT - ${businessName || 'CFO TAX PRO LLC'} ===
Active Domain: ${activeDomain.name}
Generated: ${new Date().toLocaleDateString()}

FINANCIAL & CAPACITY ENGINE:
- Active Client Count: ${activeClients} / ${maxCapacity} (${capacityUsagePercent}% Capacity)
- Monthly Gross Revenue: $${monthlyRevenue.toLocaleString()}
- Monthly Overhead: $${monthlyOverhead.toLocaleString()}
- Net Monthly Profit: $${netMonthlyProfit.toLocaleString()}
- Cash Reserve Buffer: $${cashReserve.toLocaleString()} (${cashBufferMonths} Months Operating Runway)

CUSTOMER REQUIREMENTS QUALITY AUDIT (100% FULFILLED):
${requirements.map((r) => `[✔] ${r.category}: ${r.requirement} -> ${r.evidence}`).join('\n')}

MASTER STANDARD OPERATING PROCEDURES (SOPs):
${sops.map((s) => `[${s.completed ? 'X' : ' '}] ${s.category} | ${s.role} | ${s.title}`).join('\n')}
`.trim();

    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 border border-slate-700 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs rounded font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>OWNER OPERATIONS ENGINE</span>
              </span>
              <span className="text-xs text-slate-400">({businessName || 'CFO TAX PRO LLC'})</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100 mt-1">Owner Operating Blueprint & SOP Architecture</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Automating operational overhead, delegated SOPs, capacity limits, and 100% customer requirement fulfillment.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/90 p-3 rounded-xl border border-slate-700">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">SOP System Execution</div>
              <div className="text-lg font-bold text-emerald-400">{sopCompletionPercent}% Active</div>
            </div>
            <button
              onClick={handleCopyOwnerBlueprint}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center space-x-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedBlueprint ? 'Blueprint Copied!' : 'Export Ops Blueprint'}</span>
            </button>
          </div>
        </div>

        {/* System Capability Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-slate-800">
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Customer Requirements: <strong>100% Met</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Automation Ratio: <strong>65% Automated</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Speed-to-Lead: <strong>&lt; 2 Minutes</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>IRS & EA Compliant: <strong>Verified</strong></span>
          </div>
        </div>
      </div>

      {/* Customer Requirement Audit Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Small Business Customer Requirement Audit</span>
            </h3>
            <p className="text-xs text-slate-500">
              Validating that the website and engine fulfill every critical expectation of modern B2B & tax clients.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold">
            6 / 6 Requirements Fulfilled (100%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requirements.map((req) => (
            <div key={req.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{req.category}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {req.status}
                  </span>
                </div>
                <div className="font-bold text-slate-900 mt-1">{req.requirement}</div>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{req.evidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Time Allocation & Delegation Matrix (Do / Automate / Delegate) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>2. Owner Time Allocation & Delegation Framework</span>
          </h3>
          <p className="text-xs text-slate-500">
            Eliminate low-value busywork. Focus owner hours exclusively on high-margin advisory and strategic expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* DO IT (Strategic Owner Tasks) */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <h4 className="text-xs font-bold uppercase text-emerald-950">1. Owner High-Value Tasks (Do It)</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>High-Ticket Fractional CFO & Advisory consultations ($2,500+/mo)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Complex IRS offer in compromise & high-value audit defense strategy</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Tech stack SaaS partnership & corporate growth deal closing</span>
              </li>
            </ul>
          </div>

          {/* AUTOMATE IT (AI & Tech Engine) */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-600"></span>
              <h4 className="text-xs font-bold uppercase text-teal-950">2. Engine Automation (Automate It)</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>24/7 AI Chatbot lead qualification & automated Calendly scheduling</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>Multi-touch email & SMS nurture sequences for prospects</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>Stripe recurring retainer auto-billing & payment reminder drip</span>
              </li>
            </ul>
          </div>

          {/* DELEGATE IT (SOPs & Team) */}
          <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-slate-600"></span>
              <h4 className="text-xs font-bold uppercase text-slate-900">3. Standard SOPs (Delegate It)</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-slate-600 font-bold">•</span>
                <span>Routine QuickBooks / Xero bank feed matching & receipt logging</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-slate-600 font-bold">•</span>
                <span>Standard IRS Form 8821 / 2848 authorization document intake</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-slate-600 font-bold">•</span>
                <span>Initial client onboarding questionnaire collection & verification</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Daily & Weekly Owner Standard Operating Procedures (SOPs) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>3. Master Owner SOP Execution Engine</span>
            </h3>
            <p className="text-xs text-slate-500">
              Daily, weekly, and monthly standard operating procedures for smooth, zero-friction business execution.
            </p>
          </div>

          <button
            onClick={() => setShowAddSopModal(true)}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom SOP</span>
          </button>
        </div>

        <div className="space-y-3">
          {sops.map((sop) => (
            <div
              key={sop.id}
              className={`p-4 rounded-xl border transition ${
                sop.completed
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white border-slate-300 shadow-xs hover:border-emerald-400'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleToggleSop(sop.id)}
                    className="mt-0.5 transition"
                  >
                    {sop.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-400 hover:border-emerald-600"></div>
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-xs font-bold ${sop.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {sop.title}
                      </h4>
                      {sop.isAutomated && (
                        <span className="bg-teal-100 text-teal-800 text-[9px] font-bold px-1.5 py-0.5 rounded border border-teal-200 flex items-center space-x-1">
                          <Zap className="w-2.5 h-2.5 text-teal-600" />
                          <span>AI Automated</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sop.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] shrink-0 self-end sm:self-auto">
                  <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium">
                    {sop.category}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-900 text-slate-200 rounded font-semibold">
                    {sop.role}
                  </span>
                </div>
              </div>

              {/* Sub-checklist steps */}
              <div className="mt-3 pl-8 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-slate-600">
                {sop.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Capacity & Runway Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>4. Business Capacity & Financial Runway Engine</span>
          </h3>
          <p className="text-xs text-slate-500">
            Model client capacity, monthly recurring retainers, overhead costs, and cash reserve buffers.
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Monthly Revenue</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">${monthlyRevenue.toLocaleString()}</div>
            <p className="text-[10px] text-slate-400 mt-1">{activeClients} clients @ ${avgRetainer}/mo</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Net Monthly Profit</div>
            <div className={`text-xl font-extrabold mt-1 ${netMonthlyProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ${netMonthlyProfit.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">After ${monthlyOverhead.toLocaleString()} overhead</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Client Capacity Usage</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">{capacityUsagePercent}%</div>
            <p className="text-[10px] text-slate-500 mt-1">{activeClients} of {maxCapacity} slots filled</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Cash Runway Reserve</div>
            <div className="text-xl font-extrabold text-emerald-600 mt-1">{cashBufferMonths} Months</div>
            <p className="text-[10px] text-slate-500 mt-1">${cashReserve.toLocaleString()} liquid buffer</p>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>Active Retainer Clients:</span>
              <span className="font-bold text-slate-900">{activeClients} Clients</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={activeClients}
              onChange={(e) => setActiveClients(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>Avg Retainer Fee ($):</span>
              <span className="font-bold text-slate-900">${avgRetainer.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={avgRetainer}
              onChange={(e) => setAvgRetainer(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>Monthly Business Overhead ($):</span>
              <span className="font-bold text-slate-900">${monthlyOverhead.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min="2000"
              max="30000"
              step="500"
              value={monthlyOverhead}
              onChange={(e) => setMonthlyOverhead(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Modal: Add Custom SOP */}
      {showAddSopModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add New Owner SOP</h3>
            <form onSubmit={handleAddSopSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">SOP Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Weekly Tech Stack Cost Audit" 
                  value={newSopTitle} 
                  onChange={(e) => setNewSopTitle(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Responsible Role</label>
                  <select
                    value={newSopRole}
                    onChange={(e) => setNewSopRole(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded text-slate-800"
                  >
                    <option value="Owner">Owner</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Assigned Staff">Assigned Staff</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Frequency</label>
                  <select
                    value={newSopCategory}
                    onChange={(e) => setNewSopCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded text-slate-800"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Description & Purpose</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the operational goal and outcome of this SOP..." 
                  value={newSopDescription} 
                  onChange={(e) => setNewSopDescription(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSopModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500"
                >
                  Create Operating SOP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
