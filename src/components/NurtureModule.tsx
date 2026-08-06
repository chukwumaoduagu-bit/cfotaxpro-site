import React, { useState } from 'react';
import { RevenueDomain, NurtureStep } from '../types';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  PlayCircle,
  Copy,
  ChevronRight
} from 'lucide-react';

interface NurtureModuleProps {
  domain: RevenueDomain;
  businessName: string;
}

export const NurtureModule: React.FC<NurtureModuleProps> = ({
  domain,
  businessName
}) => {
  const [sequence, setSequence] = useState<NurtureStep[]>([
    {
      day: 1,
      channel: 'Email',
      title: 'Instant Welcome & Lead Magnet',
      subject: `Welcome to ${businessName || 'Our Agency'} - Your ${domain.name} Guide`,
      body: `Hi {First_Name},\n\nThank you for requesting information on our ${domain.name} solutions. We specialize in high-impact results with guaranteed precision.\n\nAre you available for a brief 10-minute strategy call this week?\n\nBest,\n${businessName || 'Our Team'}`
    },
    {
      day: 2,
      channel: 'SMS',
      title: 'Quick Follow-up SMS',
      subject: 'SMS Check-in',
      body: `Hi {First_Name}, it's Alex from ${businessName || 'our team'}. Did you get a chance to check out the ${domain.name} blueprint I emailed over? Happy to answer any quick questions!`
    },
    {
      day: 4,
      channel: 'Email',
      title: 'Social Proof & Client Case Study',
      subject: `How one client unlocked $24,000 using our ${domain.name} system`,
      body: `Hi {First_Name},\n\nMany clients come to us wondering how quickly they can see results in ${domain.name}. Here is a quick breakdown of how we helped a client transition from manual bottlenecks to full automation.\n\nReady to see similar results? Book a direct session on our calendar.`
    },
    {
      day: 7,
      channel: 'Email',
      title: 'Final Call to Action & Urgency',
      subject: `Final call for your ${domain.name} onboarding slot`,
      body: `Hi {First_Name},\n\nWe are closing out our client intake for this week. If you still want us to handle your ${domain.name} with zero friction, pick a slot today before our calendar fills.`
    }
  ]);

  const [generating, setGenerating] = useState(false);
  const [selectedStep, setSelectedStep] = useState<NurtureStep>(sequence[0]);
  const [simulatingLeadName, setSimulatingLeadName] = useState('Marcus Vance');
  const [activeDripIndex, setActiveDripIndex] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Generate sequence via Gemini backend API
  const handleGenerateAINurture = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-nurture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.name,
          businessName: businessName || 'Apex Revenue',
          targetAudience: domain.targetAudience,
          offerValue: domain.tagline
        })
      });
      const data = await res.json();
      if (data.sequence && Array.isArray(data.sequence) && data.sequence.length > 0) {
        setSequence(data.sequence);
        setSelectedStep(data.sequence[0]);
      }
    } catch {
      // Keep existing sequence
    } finally {
      setGenerating(false);
    }
  };

  // Simulate Drip Sending
  const handleSimulateDrip = (index: number) => {
    setActiveDripIndex(index);
    setTimeout(() => {
      setActiveDripIndex(null);
    }, 2000);
  };

  const handleCopyBody = () => {
    const textToCopy = selectedStep.body.replace('{First_Name}', simulatingLeadName);
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span>⚡ 3. Automated Nurture Engine</span>
            <span className="text-xs font-normal text-slate-500">({domain.name})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Nurtures 80% of leads that don't buy immediately via automated multi-touch Email & SMS drip campaigns.</p>
        </div>

        <button
          onClick={handleGenerateAINurture}
          disabled={generating}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{generating ? 'Generating AI Campaign...' : 'Generate AI Sequence'}</span>
        </button>
      </div>

      {/* Grid: Sequence Flow Timeline + Step Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Touchpoint Flow List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center justify-between">
            <span>Drip Campaign Touchpoints</span>
            <span className="text-[10px] text-emerald-600 font-mono font-semibold">4 Steps Active</span>
          </div>

          <div className="space-y-3">
            {sequence.map((step, idx) => {
              const isSelected = selectedStep.title === step.title;
              const isSimulating = activeDripIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedStep(step)}
                  className={`p-4 rounded-xl border transition cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        DAY {step.day}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1 ${
                        step.channel === 'Email' 
                          ? (isSelected ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-700')
                          : (isSelected ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-amber-50 text-amber-700')
                      }`}>
                        {step.channel === 'Email' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                        <span>{step.channel}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSimulateDrip(idx);
                      }}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center space-x-1 transition ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <PlayCircle className="w-3 h-3" />
                      <span>{isSimulating ? 'Sending...' : 'Test Drip'}</span>
                    </button>
                  </div>

                  <h4 className={`text-xs font-bold ${isSelected ? 'text-slate-100' : 'text-slate-900'}`}>{step.title}</h4>
                  <p className={`text-[11px] line-clamp-1 mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{step.subject}</p>

                  {isSimulating && (
                    <div className="absolute inset-0 bg-emerald-900/90 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold space-x-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Message Dispatched to {simulatingLeadName}!</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Selected Message Inspector & Live Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Selected Touchpoint Inspector
            </span>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Test Lead:</span>
              <input 
                type="text"
                value={simulatingLeadName}
                onChange={(e) => setSimulatingLeadName(e.target.value)}
                className="px-2 py-0.5 border border-slate-300 rounded text-xs bg-white text-slate-800 w-28 font-semibold"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                  Touchpoint Day {selectedStep.day} • {selectedStep.channel}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{selectedStep.title}</h3>
              </div>

              <button
                onClick={handleCopyBody}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedText ? 'Copied Text!' : 'Copy Body'}</span>
              </button>
            </div>

            {/* Message Subject Line */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {selectedStep.channel === 'Email' ? 'Subject Line' : 'SMS Tag / Header'}
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                {selectedStep.subject.replace('{First_Name}', simulatingLeadName)}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Personalized Message Content
              </label>
              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs leading-relaxed font-sans whitespace-pre-line border border-slate-800 shadow-inner">
                {selectedStep.body.replace('{First_Name}', simulatingLeadName)}
              </div>
            </div>

            {/* Automated Sequence Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Open Rate</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">68.4%</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Click Through</div>
                <div className="text-xs font-bold text-emerald-600 mt-0.5">24.2%</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Bookings</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">14 Calls</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
