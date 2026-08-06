import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EcosystemOpportunitiesModule } from './components/EcosystemOpportunitiesModule';
import { SmartBusinessIntelligenceModule } from './components/SmartBusinessIntelligenceModule';
import { SystemOperationsAuditHub } from './components/SystemOperationsAuditHub';
import { DailyRevenueEngineModule } from './components/DailyRevenueEngineModule';
import { AiLeadFuelActivationHub } from './components/AiLeadFuelActivationHub';
import { PublicWebsiteDeploymentHub } from './components/PublicWebsiteDeploymentHub';
import { PublicWebsiteView } from './components/PublicWebsiteView';
import { TaxResolutionClaimsHub } from './components/TaxResolutionClaimsHub';
import { TaxPrepSoftwareModule } from './components/TaxPrepSoftwareModule';
import { LeadCaptureModule } from './components/LeadCaptureModule';
import { TrustBuildersModule } from './components/TrustBuildersModule';
import { NurtureModule } from './components/NurtureModule';
import { ConversionModule } from './components/ConversionModule';
import { PipelineCRMModule } from './components/PipelineCRMModule';
import { ListingsModule } from './components/ListingsModule';
import { ChecklistModule } from './components/ChecklistModule';
import { OwnerOpsModule } from './components/OwnerOpsModule';
import { AIChatbotStudioModule } from './components/AIChatbotStudioModule';
import { AIAgentsModule } from './components/AIAgentsModule';
import { ActiveTabDirectiveBanner } from './components/ActiveTabDirectiveBanner';
import { CustomDomainModal } from './components/CustomDomainModal';
import { ExecutiveSummaryModal } from './components/ExecutiveSummaryModal';
import { VoiceAssistantWidget } from './components/VoiceAssistantWidget';
import { DOMAIN_PRESETS, INITIAL_CHECKLIST } from './data/domainPresets';
import { RevenueDomain, Lead, ChecklistStep } from './types';

export default function App() {
  const [domains, setDomains] = useState<RevenueDomain[]>(DOMAIN_PRESETS);
  const [activeDomain, setActiveDomain] = useState<RevenueDomain>(DOMAIN_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<string>('audit');
  const [businessName, setBusinessName] = useState<string>('CFO TAX PRO LLC');
  const [isCustomDomainModalOpen, setIsCustomDomainModalOpen] = useState(false);
  const [isExecutiveSummaryOpen, setIsExecutiveSummaryOpen] = useState(false);
  const [isPublicWebsiteMode, setIsPublicWebsiteMode] = useState(false);

  // Initial Leads - Fresh $0 baseline for real clients
  const [leads, setLeads] = useState<Lead[]>([]);

  // Initial Checklist
  const [checklist, setChecklist] = useState<ChecklistStep[]>(INITIAL_CHECKLIST);

  // Calculated Metrics
  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.value, 0);

  // Synchronize leads with backend persistence
  useEffect(() => {
    async function syncLeadsWithBackend() {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          if (data.leads && Array.isArray(data.leads)) {
            setLeads(data.leads);
          }
        }
      } catch (err) {
        console.warn("Backend lead sync active via local state fallback.");
      }
    }
    syncLeadsWithBackend();
  }, []);

  const handleClearAllData = async () => {
    setLeads([]);
    try {
      await fetch('/api/reset-all-demo-data', { method: 'POST' });
    } catch (e) {
      console.warn("Cleared local leads state.");
    }
  };

  // Handlers
  const handleAddLead = async (newLeadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: 'Just now'
    };
    setLeads((prev) => [newLead, ...prev]);

    // Persist to backend transparently
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (e) {
      console.warn("Lead added to local state.");
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.warn("Lead status updated locally.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    try {
      await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Lead removed from local state.");
    }
  };

  const handlePaymentCollected = (amount: number, clientName: string) => {
    // Check if client exists, update or add
    const existingIndex = leads.findIndex((l) => l.name.toLowerCase() === clientName.toLowerCase());

    if (existingIndex >= 0) {
      setLeads((prev) =>
        prev.map((l, i) => (i === existingIndex ? { ...l, status: 'Closed / Paid', value: amount } : l))
      );
    } else {
      handleAddLead({
        name: clientName,
        email: `${clientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        phone: '(555) 990-1122',
        domainId: activeDomain.id,
        status: 'Closed / Paid',
        value: amount,
        source: 'Landing Form'
      });
    }
  };

  const handleToggleChecklistStep = (stepId: number) => {
    setChecklist((prev) =>
      prev.map((c) => {
        if (c.id === stepId) {
          const nextStatus = c.status === 'Completed' ? 'In Progress' : 'Completed';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleAddCustomDomain = (newDomain: RevenueDomain) => {
    setDomains((prev) => [newDomain, ...prev]);
    setActiveDomain(newDomain);
  };

  // If Public Website View mode is active, render full standalone website
  if (isPublicWebsiteMode) {
    return (
      <PublicWebsiteView
        onBackToDashboard={() => setIsPublicWebsiteMode(false)}
        onOpenChatbot={() => {
          setIsPublicWebsiteMode(false);
          setActiveTab('ai_stack');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-emerald-200">
      
      {/* Top System Header & Domain Selector */}
      <Header
        activeDomain={activeDomain}
        onSelectDomain={setActiveDomain}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalPipelineValue={totalPipelineValue}
        monthlyGoal={10000}
        onOpenCustomDomainModal={() => setIsCustomDomainModalOpen(true)}
        domains={domains}
        onOpenPublicSite={() => setIsPublicWebsiteMode(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Layer 1: 1-Click Multi-Domain Switcher Ribbon */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center space-x-1">
                <span>⚡</span>
                <span>Layer 1: 1-Click Multi-Domain Switcher</span>
              </span>
              <span className="text-[11px] text-slate-400">| Switch services instantly. Everything below adapts.</span>
            </div>
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <button
                onClick={() => setIsPublicWebsiteMode(true)}
                className="text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow-sm font-extrabold"
              >
                <span>🌐 View Public Site (cfotaxprollc.com)</span>
              </button>
              <button
                onClick={() => setIsExecutiveSummaryOpen(true)}
                className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow-sm font-extrabold"
              >
                <span>📋 Daily Executive Briefing (3-Min)</span>
              </button>
              <button
                onClick={() => setActiveTab('ai_agents')}
                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow-sm font-extrabold animate-bounce"
              >
                <span>🤖 Autonomous AI Agents (5 Active)</span>
              </button>
              <button
                onClick={() => setIsCustomDomainModalOpen(true)}
                className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow-sm"
              >
                <span>+ Deploy / Clone New Domain</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-thin">
            {domains.map((d) => {
              const isActive = activeDomain.id === d.id;
              const isClaims = d.id === 'claims_adjusting' || d.id === 'medical_claims_consulting';
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDomain(d)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md ring-2 ring-emerald-400/50 scale-102'
                      : isClaims
                      ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span className="font-bold">{d.name.split(' (')[0]}</span>
                  {isClaims && !isActive && (
                    <span className="px-1 py-0.2 bg-emerald-400/20 text-emerald-300 text-[9px] font-extrabold uppercase rounded border border-emerald-400/30">
                      CLAIMS
                    </span>
                  )}
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    isActive ? 'bg-slate-950 text-emerald-300' : 'bg-slate-900 text-slate-300'
                  }`}>
                    ${d.avgRevenue.toLocaleString()}{d.revenueType === 'Recurring / Mo' ? '/mo' : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Context Status Bar */}
          <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-slate-200">Active Domain System:</span>
              <span className="text-emerald-400 font-extrabold">{activeDomain.name}</span>
              <span className="text-slate-400 text-[11px] hidden md:inline">• {activeDomain.tagline}</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">
                Avg Yield: ${activeDomain.avgRevenue.toLocaleString()} ({activeDomain.revenueType})
              </span>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                100% Adapted
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Active Tab Directive Banner (Explains What Tab Does & What's On It) */}
        <ActiveTabDirectiveBanner
          activeTab={activeTab}
          onNavigateTab={setActiveTab}
        />
        
        {activeTab === 'ecosystem_opps' && (
          <EcosystemOpportunitiesModule
            businessName={businessName}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'smart_business' && (
          <SmartBusinessIntelligenceModule
            businessName={businessName}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'website_hub' && (
          <PublicWebsiteDeploymentHub
            onOpenPublicSite={() => setIsPublicWebsiteMode(true)}
            businessName={businessName}
            activeDomain={activeDomain}
          />
        )}

        {activeTab === 'daily_revenue' && (
          <DailyRevenueEngineModule
            businessName={businessName}
            activeDomain={activeDomain}
            onPaymentCollected={handlePaymentCollected}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'lead_fuel' && (
          <AiLeadFuelActivationHub
            businessName={businessName}
            activeDomain={activeDomain}
            onPaymentCollected={handlePaymentCollected}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'audit' && (
          <SystemOperationsAuditHub
            businessName={businessName}
            domains={domains}
            leads={leads}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'tax_claims' && (
          <TaxResolutionClaimsHub
            domain={activeDomain}
            businessName={businessName}
          />
        )}

        {activeTab === 'tax_prep_software' && (
          <TaxPrepSoftwareModule
            businessName={businessName}
            activeDomain={activeDomain}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'capture' && (
          <LeadCaptureModule
            domain={activeDomain}
            onAddLead={handleAddLead}
            businessName={businessName}
            setBusinessName={setBusinessName}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'trust' && (
          <TrustBuildersModule
            domain={activeDomain}
            businessName={businessName}
          />
        )}

        {activeTab === 'nurture' && (
          <NurtureModule
            domain={activeDomain}
            businessName={businessName}
          />
        )}

        {activeTab === 'conversion' && (
          <ConversionModule
            domain={activeDomain}
            businessName={businessName}
            onPaymentCollected={handlePaymentCollected}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineCRMModule
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onAddLead={handleAddLead}
            onDeleteLead={handleDeleteLead}
            onClearAllData={handleClearAllData}
            domains={domains}
          />
        )}

        {activeTab === 'listings' && (
          <ListingsModule businessName={businessName} />
        )}

        {activeTab === 'checklist' && (
          <ChecklistModule
            checklist={checklist}
            onToggleStepStatus={handleToggleChecklistStep}
            domain={activeDomain}
            businessName={businessName}
          />
        )}

        {activeTab === 'owner_ops' && (
          <OwnerOpsModule
            businessName={businessName}
            activeDomain={activeDomain}
            totalPipelineValue={totalPipelineValue}
          />
        )}

        {activeTab === 'ai_stack' && (
          <AIChatbotStudioModule
            businessName={businessName}
            activeDomain={activeDomain}
            onAddLead={handleAddLead}
          />
        )}

        {activeTab === 'ai_agents' && (
          <AIAgentsModule
            businessName={businessName}
            activeDomain={activeDomain}
            leads={leads}
            onAddLead={handleAddLead}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">Versatile Revenue Engine System</span>
            <span>• 5-Layer Revenue Automation</span>
          </div>

          <p className="text-slate-500">
            One Engine • Multi-Domain Revenue • Recurring Income
          </p>
        </div>
      </footer>

      {/* Modal for Custom Domain */}
      <CustomDomainModal
        isOpen={isCustomDomainModalOpen}
        onClose={() => setIsCustomDomainModalOpen(false)}
        onAddDomain={handleAddCustomDomain}
      />

      {/* 1-Click Executive Daily Briefing Summary Modal */}
      <ExecutiveSummaryModal
        isOpen={isExecutiveSummaryOpen}
        onClose={() => setIsExecutiveSummaryOpen(false)}
        activeDomain={activeDomain}
        leads={leads}
        totalPipelineValue={totalPipelineValue}
        monthlyGoal={10000}
        onNavigateTab={setActiveTab}
      />

      {/* Voice Assistant Widget */}
      <VoiceAssistantWidget
        onNavigateTab={setActiveTab}
        onOpenSummary={() => setIsExecutiveSummaryOpen(true)}
        onOpenCustomDomain={() => setIsCustomDomainModalOpen(true)}
      />

    </div>
  );
}
