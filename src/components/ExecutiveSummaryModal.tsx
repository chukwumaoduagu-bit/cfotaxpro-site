import React from 'react';
import { X, TrendingUp, DollarSign, Users, Bot, Sparkles, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { RevenueDomain, Lead } from '../types';
import { CfoTaxProLogo } from './CfoTaxProLogo';

interface ExecutiveSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain: RevenueDomain;
  leads: Lead[];
  totalPipelineValue: number;
  monthlyGoal: number;
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveSummaryModal: React.FC<ExecutiveSummaryModalProps> = ({
  isOpen,
  onClose,
  activeDomain,
  leads,
  totalPipelineValue,
  monthlyGoal,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const closedLeads = leads.filter((l) => l.status === 'Closed / Paid');
  const bookedLeads = leads.filter((l) => l.status === 'Call Booked');
  const hotLeads = leads.filter((l) => (l.leadScore || 80) >= 80);
  const mrrTotal = closedLeads.length * 1200;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-white/5 rounded-xl border border-emerald-500/30">
              <CfoTaxProLogo size={40} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white">Daily Executive Briefing</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  3-MINUTE ROUTINE
                </span>
              </div>
              <p className="text-xs text-slate-400">Automated morning report for CFO TAX PRO LLC ({activeDomain.name})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pipeline Value</div>
            <div className="text-lg font-extrabold text-emerald-400 font-mono">${totalPipelineValue.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">{Math.round((totalPipelineValue / monthlyGoal) * 100)}% of ${monthlyGoal.toLocaleString()} goal</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Active MRR</div>
            <div className="text-lg font-extrabold text-blue-400 font-mono">${mrrTotal.toLocaleString()}/mo</div>
            <div className="text-[10px] text-slate-400">{closedLeads.length} Retainer Subscriptions</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Hot Leads Ready</div>
            <div className="text-lg font-extrabold text-amber-400 font-mono">{hotLeads.length} Leads</div>
            <div className="text-[10px] text-slate-400">AI Score &gt; 80/100</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Autonomous AI</div>
            <div className="text-lg font-extrabold text-purple-400 font-mono">100% Active</div>
            <div className="text-[10px] text-slate-400">5 Sub-Agents Running</div>
          </div>
        </div>

        {/* 3-Step Daily Action Routine Checklist */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Today's 3-Minute Owner Action Checklist</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <div>
                  <div className="font-bold text-emerald-200">0. Check 24/7 Money Machine ($3,450 Collected Today)</div>
                  <div className="text-[11px] text-emerald-400">18 recurring retainers active • Autopilot running 24/7</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateTab('daily_revenue');
                  onClose();
                }}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded text-[11px] flex items-center space-x-1 shadow-xs"
              >
                <span>24/7 Money Maker</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-slate-200">1. Review AI-Captured Leads ({leads.length} Active)</div>
                  <div className="text-[11px] text-slate-400">Agent 2 has qualified 4 new leads from Gemini Chatbot.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateTab('pipeline');
                  onClose();
                }}
                className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded text-[11px] font-bold flex items-center space-x-1"
              >
                <span>View CRM</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-slate-200">2. Approve Deal Proposals ({bookedLeads.length} Booked Consultations)</div>
                  <div className="text-[11px] text-slate-400">Agent 3 has pre-drafted personalized proposals for closing.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateTab('ai_agents');
                  onClose();
                }}
                className="px-3 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[11px] font-bold flex items-center space-x-1"
              >
                <span>Deal Closer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-slate-200">3. Trigger Automated Referral Engine</div>
                  <div className="text-[11px] text-slate-400">Agent 4 sent $250 credit offers to 3 recent closed clients.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateTab('ai_agents');
                  onClose();
                }}
                className="px-3 py-1 bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white rounded text-[11px] font-bold flex items-center space-x-1"
              >
                <span>Referral Engine</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>⚡ CFO TAX PRO LLC • Autonomous Revenue System</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition"
          >
            Complete 3-Min Morning Briefing
          </button>
        </div>

      </div>
    </div>
  );
};
