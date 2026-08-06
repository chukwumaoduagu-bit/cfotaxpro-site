import React, { useState } from 'react';
import { RevenueDomain } from '../types';
import { DOMAIN_PRESETS } from '../data/domainPresets';
import { SYSTEM_TABS_INTELLIGENCE, TabIntelligenceInfo } from '../data/tabIntelligence';
import { CfoTaxProLogo } from './CfoTaxProLogo';
import { 
  Building2, 
  Calculator, 
  Briefcase, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Bot,
  Globe,
  ExternalLink,
  Info,
  Search,
  ArrowRight,
  Compass,
  Zap,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

interface HeaderProps {
  activeDomain: RevenueDomain;
  onSelectDomain: (domain: RevenueDomain) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalPipelineValue: number;
  monthlyGoal: number;
  onOpenCustomDomainModal: () => void;
  domains?: RevenueDomain[];
  onOpenPublicSite?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeDomain,
  onSelectDomain,
  activeTab,
  setActiveTab,
  totalPipelineValue,
  monthlyGoal,
  onOpenCustomDomainModal,
  domains = DOMAIN_PRESETS,
  onOpenPublicSite
}) => {
  const [isTabGuideOpen, setIsTabGuideOpen] = useState(false);
  const [tabGuideSearch, setTabGuideSearch] = useState('');
  const [tabGuideCategory, setTabGuideCategory] = useState<string>('all');

  const progressPercent = Math.min(100, Math.round((totalPipelineValue / monthlyGoal) * 100));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-4 h-4 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-emerald-400" />;
      default: return <Building2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  const filteredTabGuides = SYSTEM_TABS_INTELLIGENCE.filter((t) => {
    const matchesCategory = tabGuideCategory === 'all' || t.category === tabGuideCategory;
    const query = tabGuideSearch.toLowerCase();
    const matchesSearch = tabGuideSearch === '' ||
      t.label.toLowerCase().includes(query) ||
      t.whatItDoes.toLowerCase().includes(query) ||
      t.keyOutcome.toLowerCase().includes(query) ||
      t.whatsOnIt.some(item => item.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'all',
    'Strategy & Growth',
    'Revenue & Monetization',
    'Client Acquisition',
    'Tax & Defense',
    'Operations & Systems',
    'Autonomous AI'
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Logo & Engine Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab('smart_business')}>
              <CfoTaxProLogo size={48} className="rounded-full bg-white/5 p-0.5 border border-emerald-500/30 hover:scale-105 transition duration-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  CFO TAX PRO LLC
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>OFFICIAL BRAND ENGINE</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">Dallas EIN: 27-3243694 • PTIN: P01507635 • Automated Lead Capture, Outreach, CRM &amp; Tax Claim Recovery</p>
            </div>
          </div>

          {/* Domain Selector & Goal Progress */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* 🗺️ System Tab Guide Button */}
            <button
              onClick={() => setIsTabGuideOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 border transition shadow-md bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border-indigo-700/60"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>🗺️ Tab Guide (What Every Tab Does)</span>
            </button>

            {/* 🌐 Live Public Website Launcher */}
            <button
              onClick={onOpenPublicSite || (() => setActiveTab('website_hub'))}
              className="px-3 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 border transition shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400/60"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-200" />
              <span>🌐 Public Site (Live)</span>
            </button>

            {/* 24/7 Daily Money Maker Quick Launch */}
            <button
              onClick={() => setActiveTab('daily_revenue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-2 border transition shadow-md ${
                activeTab === 'daily_revenue'
                  ? 'bg-emerald-400 text-slate-950 border-emerald-300 ring-2 ring-emerald-400/50'
                  : 'bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border-emerald-500/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">💰 24/7 Revenue Engine</span>
              <span className="sm:hidden">💰 Revenue</span>
            </button>

            {/* Autonomous AI Agents Quick Launch Button */}
            <button
              onClick={() => setActiveTab('ai_agents')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 border transition shadow-md ${
                activeTab === 'ai_agents'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-400/40 font-extrabold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>🤖 AI Agents</span>
            </button>

            {/* Pipeline Metric Widget */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center space-x-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>Pipeline</span>
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  ${totalPipelineValue.toLocaleString()}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-20 hidden sm:block">
                <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>Goal</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation Bar with Clear Labels */}
        <nav className="flex space-x-1.5 mt-3 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-2.5">
          {SYSTEM_TABS_INTELLIGENCE.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={`${tab.label}\n${tab.whatItDoes}`}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-extrabold ring-1 ring-emerald-400'
                    : tab.id === 'ai_agents'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-900 font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 bg-slate-800/40 border border-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.shortLabel}</span>
                {tab.id === 'ai_agents' && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-emerald-400 text-slate-950 rounded">
                    5 LIVE
                  </span>
                )}
                {tab.id === 'website_hub' && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 rounded">
                    STORE
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* 🗺️ SYSTEM TAB GUIDE & DIRECTORY MODAL */}
      {isTabGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-800 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Platform Blueprint &amp; Tab Intelligence Directory</span>
                </div>
                <h2 className="text-2xl font-black text-white">System Navigation &amp; Module Directory</h2>
                <p className="text-xs text-slate-400">
                  Every tab in the CFO TAX PRO engine has a specific financial purpose, tools included, and actionable revenue outcome.
                </p>
              </div>

              <button
                onClick={() => setIsTabGuideOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search tabs, tools, or outcomes..."
                  value={tabGuideSearch}
                  onChange={(e) => setTabGuideSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTabGuideCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                      tabGuideCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {cat === 'all' ? 'All (17 Tabs)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Cards List */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
              {filteredTabGuides.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No system tabs matched your search query. Try another keyword.
                </div>
              ) : (
                filteredTabGuides.map((tab) => {
                  const isCurrentlyActive = activeTab === tab.id;
                  return (
                    <div
                      key={tab.id}
                      className={`p-5 rounded-2xl border transition space-y-3 ${
                        isCurrentlyActive
                          ? 'bg-slate-800/90 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-2xl">{tab.icon}</span>
                          <div>
                            <h3 className="text-base font-extrabold text-white">{tab.label}</h3>
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                              Category: {tab.category}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsTabGuideOpen(false);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition ${
                            isCurrentlyActive
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 hover:bg-emerald-600 text-white'
                          }`}
                        >
                          <span>{isCurrentlyActive ? 'Current Active Tab' : 'Open This Tab'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* What It Does */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">🎯 What This Tab Does:</div>
                        <p className="text-xs text-slate-200 leading-relaxed">{tab.whatItDoes}</p>
                      </div>

                      {/* What's On It */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">🧰 What's On It (Included Tools &amp; Features):</div>
                        <div className="flex flex-wrap gap-1.5">
                          {tab.whatsOnIt.map((item, iIdx) => (
                            <span
                              key={iIdx}
                              className="px-2.5 py-1 bg-slate-900 text-emerald-300 border border-slate-800 rounded-lg text-[11px] font-semibold flex items-center space-x-1"
                            >
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Outcome */}
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                        <div>
                          <strong>💡 Key Outcome:</strong> {tab.keyOutcome}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>CFO TAX PRO LLC • Total 17 Interconnected Business Modules</span>
              <button
                onClick={() => setIsTabGuideOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs"
              >
                Close Navigator
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
