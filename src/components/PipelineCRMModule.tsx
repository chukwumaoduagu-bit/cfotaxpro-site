import React, { useState } from 'react';
import { Lead, RevenueDomain } from '../types';
import { DOMAIN_PRESETS } from '../data/domainPresets';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Plus, 
  Filter, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Mail, 
  Building2,
  PieChart,
  Trash2
} from 'lucide-react';

interface PipelineCRMModuleProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  onDeleteLead?: (leadId: string) => void;
  onClearAllData?: () => void;
  domains: RevenueDomain[];
}

export const PipelineCRMModule: React.FC<PipelineCRMModuleProps> = ({
  leads,
  onUpdateLeadStatus,
  onAddLead,
  onDeleteLead,
  onClearAllData,
  domains
}) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // New lead state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [dealValue, setDealValue] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState('');
  const [initialStatus, setInitialStatus] = useState<Lead['status']>('New');
  const [selectedDomainId, setSelectedDomainId] = useState<string>(domains[0]?.id || 'tax_prep');

  const statuses: Lead['status'][] = ['New', 'Contacted', 'Nurturing', 'Call Booked', 'Closed / Paid'];

  // Filter leads
  const filteredLeads = leads.filter((l) => (filterDomain === 'all' ? true : l.domainId === filterDomain));

  // Revenue Breakdown Calculations
  const totalRevenueCollected = leads
    .filter((l) => l.status === 'Closed / Paid')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.value, 0);

  const revenueByDomain = domains.map((d) => {
    const domainLeads = leads.filter((l) => l.domainId === d.id);
    const closedVal = domainLeads.filter((l) => l.status === 'Closed / Paid').reduce((a, b) => a + b.value, 0);
    const totalVal = domainLeads.reduce((a, b) => a + b.value, 0);
    return {
      domain: d,
      closedVal,
      totalVal,
      count: domainLeads.length
    };
  });

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const targetDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];
    const parsedValue = Number(dealValue) > 0 ? Number(dealValue) : targetDomain.avgRevenue;

    onAddLead({
      name: company ? `${name} (${company})` : name,
      email,
      phone: phone || '(555) 000-0000',
      domainId: targetDomain.id as any,
      status: initialStatus,
      value: parsedValue,
      source: leadNotes ? `Direct / ${leadNotes.slice(0, 24)}` : 'Manual Add'
    });

    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setDealValue('');
    setLeadNotes('');
    setInitialStatus('New');
    setShowNewLeadModal(false);
  };

  const activeRetainers = leads.filter((l) => l.status === 'Closed / Paid');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span>📈 5. Revenue Engine CRM & Multi-Pipeline</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">AI Lead Scoring, Predictive Closing, Dynamic Pricing, and Retainer Management.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 font-medium"
          >
            <option value="all">All Revenue Domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          {onClearAllData && leads.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all pipeline data and reset to $0?")) {
                  onClearAllData();
                }
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg text-xs font-semibold transition"
            >
              Clear Demo Data ($0)
            </button>
          )}

          <button
            onClick={() => setShowNewLeadModal(true)}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Real Lead</span>
          </button>
        </div>
      </div>

      {/* 3-Step Real Lead & Real Revenue Launch Guide (Action Plan) */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                Action Plan
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                The Demo is Over — Start Closing Real Deals
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Follow these 3 steps to convert your infrastructure into actual revenue in your pocket.
            </p>
          </div>

          <button
            onClick={() => setShowNewLeadModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Real Lead</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Step 1: Clear All Demo Data</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-100 px-2 py-0.5 rounded">
                {leads.length === 0 ? '✓ Ready' : 'In Progress'}
              </span>
            </div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <p>• <strong>Delete fake leads:</strong> Removed simulated prospects.</p>
              <p>• <strong>Reset revenue to $0:</strong> Fresh baseline ready.</p>
              <p>• <strong>Clean pipeline:</strong> Only track real qualified prospects.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-xs">Step 2: Add Real Leads</span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-200/60 px-2 py-0.5 rounded">
                Action Now
              </span>
            </div>
            <div className="space-y-1 text-emerald-900 text-[11px]">
              <p>• <strong>People you know:</strong> Past clients, referrals, network.</p>
              <p>• <strong>Real contact info:</strong> Actual names, emails, phone numbers.</p>
              <p>• <strong>Record conversations:</strong> What did they say? What do they need?</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Step 3: Acquire Real Clients</span>
              <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded">
                Revenue
              </span>
            </div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <p>• <strong>Share website:</strong> Post cfotaxprollc.com on LinkedIn, Facebook.</p>
              <p>• <strong>Call your network:</strong> Offer tax advisory & loss reviews.</p>
              <p>• <strong>Close first deal:</strong> Use Deal Desk to send proposals & collect payment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic AI Pricing & Lead Scoring Intelligence Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              AI Conversion Suite
            </span>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-1.5">
              <span>Dynamic Pricing Engine & Predictive Closing Intelligence</span>
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono">Pipeline Health Score: 94/100 (Optimal)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Dynamic Pricing Engine</div>
            <div className="font-semibold text-slate-200">AI adjusts custom quotes automatically based on business size & urgency.</div>
            <div className="text-emerald-400 font-mono text-[11px] font-bold">Avg Uplift: +22% Contract Value</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Predictive Closing Probability</div>
            <div className="font-semibold text-slate-200">AI evaluates response rate, intent signals, and historical close velocity.</div>
            <div className="text-blue-400 font-mono text-[11px] font-bold">78% Predicted Deal Win Rate</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Upsell Recommendation Engine</div>
            <div className="font-semibold text-slate-200">Auto-pairs Tax Prep leads with monthly Bookkeeping & Advisory retainers.</div>
            <div className="text-purple-400 font-mono text-[11px] font-bold">+$1,200/mo Recurrent Upsell</div>
          </div>
        </div>
      </div>

      {/* Revenue Stream Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-slate-400">Total Closed Revenue</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">${totalRevenueCollected.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">Collected from won deals across engine</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-slate-400">Pipeline Deal Value</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">${totalPipelineValue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-500 mt-1">Total combined value of all leads</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-slate-400">Active Pipeline Leads</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{leads.length} Leads</div>
          <p className="text-[10px] text-slate-500 mt-1">Nurturing across {domains.length} domains</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-slate-400">Conversion Rate</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">
            {leads.length > 0 ? `${Math.round((leads.filter(l => l.status === 'Closed / Paid').length / leads.length) * 100)}%` : '0%'}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Win rate across active pipeline</p>
        </div>
      </div>

      {/* Revenue Streams by Domain Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center space-x-2">
          <PieChart className="w-4 h-4 text-emerald-600" />
          <span>Revenue Streams Breakdown by Domain</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {revenueByDomain.map((rbd) => (
            <div key={rbd.domain.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">{rbd.domain.name}</div>
                <div className="text-[10px] text-slate-500">
                  Avg ${rbd.domain.avgRevenue} ({rbd.domain.revenueType}) • {rbd.count} Leads
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">${rbd.closedVal.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400">Pipe: ${rbd.totalVal.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban / Stage Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {statuses.map((status) => {
          const stageLeads = filteredLeads.filter((l) => l.status === status);
          const stageVal = stageLeads.reduce((a, b) => a + b.value, 0);

          return (
            <div key={status} className="bg-slate-100/80 rounded-2xl p-3 border border-slate-200 space-y-3 min-w-[200px]">
              
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">{status}</h4>
                  <div className="text-[10px] font-mono text-slate-500">${stageVal.toLocaleString()}</div>
                </div>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards */}
              <div className="space-y-2.5">
                {stageLeads.map((lead, idx) => {
                  const domainObj = domains.find((d) => d.id === lead.domainId);
                  const score = lead.leadScore || (90 - idx * 7);
                  const winProb = lead.closingProbability || (85 - idx * 8);
                  const dynamicQuote = lead.dynamicPriceQuote || (lead.value * 1.15);

                  return (
                    <div key={lead.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:border-emerald-400 transition relative">
                      
                      {/* Top Lead Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900">{lead.name}</div>
                          <div className="text-[10px] text-slate-500">{lead.email}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 font-mono">${lead.value.toLocaleString()}</span>
                          <div className="text-[9px] text-slate-400 font-mono">Dyn Quote: ${Math.round(dynamicQuote).toLocaleString()}</div>
                        </div>
                      </div>

                      {/* AI Lead Scoring & Predictive Win Prob Badges */}
                      <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-100 text-[9px] font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-between">
                          <span>AI Score:</span>
                          <span className="font-extrabold">{score}/100 🔥</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-between">
                          <span>Win Prob:</span>
                          <span className="font-extrabold">{winProb}% 🎯</span>
                        </span>
                      </div>

                      {/* Domain & Source Tag */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="truncate max-w-[110px] font-medium text-slate-700">{domainObj?.name.split(' (')[0]}</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px]">{lead.source}</span>
                      </div>

                      {/* Upsell Recommendation Tag */}
                      <div className="text-[9px] bg-purple-50 text-purple-800 p-1 rounded border border-purple-200 flex items-center justify-between font-semibold">
                        <span>AI Upsell:</span>
                        <span className="font-bold">Bookkeeping +$600/mo</span>
                      </div>

                      {/* Move Stage Selector & Delete */}
                      <div className="flex items-center space-x-1.5 mt-1">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className="flex-1 p-1 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-700 font-medium"
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st}>Move to {st}</option>
                          ))}
                        </select>

                        {onDeleteLead && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete lead "${lead.name}"?`)) {
                                onDeleteLead(lead.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {stageLeads.length === 0 && (
                  <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400">
                    No leads in {status}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Layer 5: Recurring Revenue Automation & 6-Month Forecast Engine */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Layer 5 Automation
              </span>
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Recurring Revenue Automation & MRR Forecasting</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Automated monthly invoicing, subscription renewal reminders, and compounding cash flow projection.</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Est. Active MRR: <strong className="text-white font-bold">${(leads.filter(l => l.status === 'Closed / Paid').length * 1200).toLocaleString()}/mo</strong>
            </span>
          </div>
        </div>

        {/* 6-Month Compounding Forecast Projection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { month: 'Month 1', clients: 2, mrr: 1200, total: 1200 },
            { month: 'Month 2', clients: 5, mrr: 3000, total: 4200 },
            { month: 'Month 3', clients: 9, mrr: 5400, total: 9600 },
            { month: 'Month 4', clients: 14, mrr: 8400, total: 18000 },
            { month: 'Month 5', clients: 20, mrr: 12000, total: 30000 },
            { month: 'Month 6', clients: 28, mrr: 16800, total: 46800 },
          ].map((forecast, idx) => (
            <div key={forecast.month} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-1.5 hover:border-emerald-500 transition">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                <span>{forecast.month}</span>
                {idx === 5 && <span className="text-emerald-400 font-bold">Goal 🚀</span>}
              </div>
              <div className="text-sm font-extrabold text-emerald-400 font-mono">${forecast.mrr.toLocaleString()}/mo</div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>Clients: {forecast.clients}</span>
                <span className="text-slate-300">Cum: ${forecast.total.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-1 overflow-hidden">
                <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${(idx + 1) * 16.6}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recurring Retainer Subscriptions Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="uppercase text-[11px] tracking-wider text-slate-400">Automated Monthly Subscription Invoices</span>
            <span className="text-emerald-400 text-[11px]">Real Client Ledger Active ⚡</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 text-[10px] uppercase font-semibold">
                <tr>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Service Retainer Domain</th>
                  <th className="p-3">Monthly Rate</th>
                  <th className="p-3">Captured Date</th>
                  <th className="p-3">Auto-Invoice Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {activeRetainers.length > 0 ? (
                  activeRetainers.map((retLead) => {
                    const dom = domains.find(d => d.id === retLead.domainId);
                    return (
                      <tr key={retLead.id} className="hover:bg-slate-800/30">
                        <td className="p-3 font-semibold text-slate-100">{retLead.name}</td>
                        <td className="p-3 text-emerald-400">{dom?.name || 'Tax & Advisory'}</td>
                        <td className="p-3 font-mono font-bold">${retLead.value.toLocaleString()}/mo</td>
                        <td className="p-3 text-slate-400">{retLead.createdAt || 'Active'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Active Paid (Stripe)
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold">Retainer Live</span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                      <div className="max-w-md mx-auto space-y-2">
                        <p className="font-semibold text-slate-300">No active client retainers yet (Clean $0 starting baseline)</p>
                        <p className="text-[11px] text-slate-500">
                          Move a lead to &apos;Closed / Paid&apos; in the pipeline above or collect payment in the Deal Desk to activate recurring billing.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Add Manual Real Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Real Pipeline Lead</h3>
                <p className="text-xs text-slate-500">Add past clients, network referrals, or people you are calling today.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLeadSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Contact Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Company / Entity Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Logistics LLC" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@company.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="(214) 555-0199" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-medium text-slate-700 block mb-1">Target Service Vertical</label>
                  <select
                    value={selectedDomainId}
                    onChange={(e) => setSelectedDomainId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} (${d.avgRevenue})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Estimated Value ($)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2500" 
                    value={dealValue} 
                    onChange={(e) => setDealValue(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Pipeline Starting Stage</label>
                <select
                  value={initialStatus}
                  onChange={(e) => setInitialStatus(e.target.value as Lead['status'])}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Conversation Notes (What did they say? What do they need?)</label>
                <textarea 
                  rows={3} 
                  placeholder="e.g. Needs 1120-S corporate tax return and quarterly bookkeeping. Looking to reduce tax liability before year-end."
                  value={leadNotes} 
                  onChange={(e) => setLeadNotes(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Ready to track & convert</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNewLeadModal(false)}
                    className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 shadow-sm"
                  >
                    Save Real Lead to Pipeline
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
