import React, { useState } from 'react';
import { SYSTEM_TABS_INTELLIGENCE, TabIntelligenceInfo } from '../data/tabIntelligence';
import { 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Layers,
  Zap
} from 'lucide-react';

interface ActiveTabDirectiveBannerProps {
  activeTab: string;
  onNavigateTab: (tabId: string) => void;
}

export const ActiveTabDirectiveBanner: React.FC<ActiveTabDirectiveBannerProps> = ({
  activeTab,
  onNavigateTab
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const currentTabInfo = SYSTEM_TABS_INTELLIGENCE.find(t => t.id === activeTab) || SYSTEM_TABS_INTELLIGENCE[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-xl flex items-center justify-center">
            <span>{currentTabInfo.icon}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded">
                Active Module • {currentTabInfo.category}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                100% Operational
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white mt-0.5 flex items-center space-x-2">
              <span>{currentTabInfo.label}</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition"
          >
            <span>{isExpanded ? 'Hide Module Info' : 'Show Module Guide'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Expanded Content Section */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4 text-xs bg-slate-900">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* What It Does */}
            <div className="md:col-span-6 space-y-2">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>🎯 What This Tab Does:</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-normal bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {currentTabInfo.whatItDoes}
              </p>

              {/* Recommended Action */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
                <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Recommended Action:</span>
                </div>
                <div className="text-slate-300 text-xs font-medium">{currentTabInfo.recommendedAction}</div>
              </div>
            </div>

            {/* What's On It & Shortcuts */}
            <div className="md:col-span-6 space-y-3">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>🧰 What's On This Tab (Included Tools &amp; Features):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentTabInfo.whatsOnIt.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] text-slate-300 flex items-start space-x-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Related Tab Shortcuts */}
              {currentTabInfo.shortcutTabs && currentTabInfo.shortcutTabs.length > 0 && (
                <div className="pt-2 flex items-center space-x-2 text-[11px]">
                  <span className="text-slate-400 font-bold">Related Modules:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTabInfo.shortcutTabs.map((sId) => {
                      const targetTab = SYSTEM_TABS_INTELLIGENCE.find(t => t.id === sId);
                      if (!targetTab) return null;
                      return (
                        <button
                          key={sId}
                          onClick={() => onNavigateTab(sId)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center space-x-1 transition font-bold"
                        >
                          <span>{targetTab.icon}</span>
                          <span>{targetTab.shortLabel}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
