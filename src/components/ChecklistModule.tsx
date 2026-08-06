import React, { useState } from 'react';
import { ChecklistStep, RevenueDomain } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  ExternalLink, 
  Zap, 
  CheckSquare, 
  BookOpen, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ChecklistModuleProps {
  checklist: ChecklistStep[];
  onToggleStepStatus: (id: number) => void;
  domain: RevenueDomain;
  businessName: string;
}

export const ChecklistModule: React.FC<ChecklistModuleProps> = ({
  checklist,
  onToggleStepStatus,
  domain,
  businessName
}) => {
  const [selectedStep, setSelectedStep] = useState<ChecklistStep | null>(checklist[0]);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  const completedCount = checklist.filter((c) => c.status === 'Completed').length;
  const launchProgress = Math.round((completedCount / checklist.length) * 100);

  const handleCopyBlueprint = () => {
    const blueprintText = `
=== VERSATILE REVENUE ENGINE BLUEPRINT ===
Business: ${businessName || 'My Agency'}
Active Domain: ${domain.name} ($${domain.avgRevenue} avg revenue)

CORE 5-LAYER ARCHITECTURE:
1. LEAD CAPTURE: Landing page + 24/7 AI Chatbot + Call tracking + Lead Form
2. TRUST BUILDERS: Client reviews + Badges/Certifications + Case Studies
3. AUTOMATED NURTURING: Multi-touch Email & SMS drip sequences
4. CONVERSION: Calendly-style booking + Stripe checkout + AI Closing script
5. DELIVERY: Scalable service fulfillment + Recurring revenue

IMPLEMENTATION CHECKLIST STATUS (${launchProgress}% COMPLETE):
${checklist.map((c) => `[${c.status === 'Completed' ? 'X' : ' '}] Step ${c.id}: ${c.action}`).join('\n')}
`.trim();

    navigator.clipboard.writeText(blueprintText);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Launch Gauge */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs rounded font-bold">
                7-STEP LAUNCH ENGINE
              </span>
              <span className="text-xs text-slate-400">({domain.name})</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100 mt-1">System Implementation Checklist</h2>
            <p className="text-xs text-slate-400 mt-0.5">One versatile system that captures, nurtures, closes, and scales across domains.</p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/90 p-3 rounded-xl border border-slate-700">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Launch Readiness</div>
              <div className="text-lg font-bold text-emerald-400">{launchProgress}% Ready</div>
            </div>
            <button
              onClick={handleCopyBlueprint}
              className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center space-x-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedBlueprint ? 'Blueprint Copied!' : 'Export Blueprint'}</span>
            </button>
          </div>
        </div>

        {/* System Launch Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{completedCount} of 7 Steps Completed</span>
            <span>{launchProgress}% System Operational</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${launchProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Grid: Interactive Table + Step Guidance Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Table Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Implementation Action Steps</h3>
            <span className="text-[10px] text-slate-500">Click row to view step guidance</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {checklist.map((step) => {
              const isSelected = selectedStep?.id === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition ${
                    isSelected ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStepStatus(step.id);
                      }}
                      className="mt-0.5 transition"
                    >
                      {step.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : step.status === 'In Progress' ? (
                        <Clock className="w-5 h-5 text-amber-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-emerald-500"></div>
                      )}
                    </button>

                    <div>
                      <div className="font-bold text-slate-900 text-xs flex items-center space-x-2">
                        <span>Step {step.id}: {step.action}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{step.element}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
                    step.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : step.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {step.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Guidance Drawer Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedStep ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                  Step {selectedStep.id} Guide
                </span>

                <button
                  onClick={() => onToggleStepStatus(selectedStep.id)}
                  className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
                >
                  Mark as {selectedStep.status === 'Completed' ? 'In Progress' : 'Completed'}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedStep.action}</h3>
                <div className="text-xs text-slate-500 mt-1 font-medium">{selectedStep.element}</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Why It Works Across Domains</span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">{selectedStep.whyItWorks}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>Execution Checklist & Guidelines</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{selectedStep.guideText}</p>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
              Select a step from the checklist to view setup guidance.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
