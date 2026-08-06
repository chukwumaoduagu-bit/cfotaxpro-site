import React, { useState } from 'react';
import { RevenueDomain, DomainId } from '../types';
import { DOMAIN_PRESETS } from '../data/domainPresets';
import { Plus, X, Copy, Sparkles, Rocket } from 'lucide-react';

interface CustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDomain: (domain: RevenueDomain) => void;
}

export const CustomDomainModal: React.FC<CustomDomainModalProps> = ({
  isOpen,
  onClose,
  onAddDomain
}) => {
  const [mode, setMode] = useState<'clone' | 'scratch'>('clone');
  const [selectedCloneId, setSelectedCloneId] = useState<DomainId>('tax_prep');

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [avgRevenue, setAvgRevenue] = useState(1500);
  const [revenueType, setRevenueType] = useState<'One-time' | 'Recurring / Mo' | 'Commission'>('One-time');
  const [targetAudience, setTargetAudience] = useState('');

  if (!isOpen) return null;

  const handleSelectPresetToClone = (domainId: DomainId) => {
    setSelectedCloneId(domainId);
    const preset = DOMAIN_PRESETS.find((d) => d.id === domainId);
    if (preset) {
      setName(`${preset.name} (Custom Copy)`);
      setTagline(preset.tagline);
      setAvgRevenue(preset.avgRevenue);
      setRevenueType(preset.revenueType);
      setTargetAudience(preset.targetAudience);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    let basePreset = DOMAIN_PRESETS.find((d) => d.id === selectedCloneId);

    const newDomain: RevenueDomain = {
      id: `custom_${Date.now()}` as any,
      name,
      tagline: tagline || basePreset?.tagline || 'Automated high-ticket service delivery.',
      avgRevenue: Number(avgRevenue) || 1000,
      revenueType,
      icon: basePreset?.icon || 'Building2',
      description: basePreset?.description || 'Custom deployed business revenue engine domain.',
      defaultHeadline: `Automated & Guaranteed ${name} Solutions`,
      defaultSubheadline: tagline || `Streamline your ${name} process with our 5-layer revenue engine.`,
      bulletPoints: basePreset?.bulletPoints || [
        `Guaranteed delivery and expert execution in ${name}`,
        '24/7 AI-assisted lead capture and instant booking',
        'Transparent pricing and dedicated support'
      ],
      targetAudience: targetAudience || basePreset?.targetAudience || 'Business owners and high-value clients',
      objections: basePreset?.objections || ['Price concerns', 'Implementation timeline'],
      sampleReviews: basePreset?.sampleReviews || [
        { author: 'Taylor Vance', role: 'Founder', rating: 5, text: `The ${name} engine delivered 5x ROI in our first 30 days.`, company: 'Vance Co' }
      ],
      certifications: basePreset?.certifications || ['Industry Accredited', 'Verified Specialist']
    };

    onAddDomain(newDomain);
    setName('');
    setTagline('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-emerald-600" />
              <span>One-Click Domain Deployment Studio</span>
            </h3>
            <p className="text-xs text-slate-500">Add a new revenue service vertical without writing code or rebuilding.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('clone');
              handleSelectPresetToClone('tax_prep');
            }}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1.5 transition ${
              mode === 'clone' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Copy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clone Existing Domain</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('scratch');
              setName('');
              setTagline('');
              setAvgRevenue(1000);
            }}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1.5 transition ${
              mode === 'scratch' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Create From Scratch</span>
          </button>
        </div>

        {mode === 'clone' && (
          <div>
            <label className="font-semibold text-slate-700 text-xs block mb-1">Select Service Template to Clone</label>
            <select
              value={selectedCloneId}
              onChange={(e) => handleSelectPresetToClone(e.target.value as DomainId)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 font-medium outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {DOMAIN_PRESETS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} (${d.avgRevenue} - {d.revenueType})
                </option>
              ))}
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">New Service / Domain Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Real Estate Tax Advisory, R&D Credit Audit, Roofing Claims" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Tagline & Value Offer</label>
            <input 
              type="text" 
              placeholder="e.g. Save $15k+ annually with certified Section 179 real estate depreciation." 
              value={tagline} 
              onChange={(e) => setTagline(e.target.value)} 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Avg Revenue / Deal ($)</label>
              <input 
                type="number" 
                required 
                value={avgRevenue} 
                onChange={(e) => setAvgRevenue(Number(e.target.value))} 
                className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Revenue Model</label>
              <select
                value={revenueType}
                onChange={(e) => setRevenueType(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                <option value="One-time">One-time</option>
                <option value="Recurring / Mo">Recurring / Mo</option>
                <option value="Commission">Commission</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Client Audience</label>
            <input 
              type="text" 
              placeholder="e.g. Real Estate Investors, SaaS Founders, Commercial Property Owners" 
              value={targetAudience} 
              onChange={(e) => setTargetAudience(e.target.value)} 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-[11px] text-emerald-800">
            <span className="font-bold">⚡ Automation Guarantee:</span> Deploying this domain will automatically generate domain-tailored chatbot scripts, email/SMS nurture sequences, landing pages, and CRM pipeline views.
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 shadow-md flex items-center space-x-1.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Deploy Domain System</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

