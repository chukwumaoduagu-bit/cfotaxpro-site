import React, { useState } from 'react';
import { RevenueDomain, Lead } from '../types';
import { 
  Globe, 
  Bot, 
  Phone, 
  User, 
  Mail, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Edit3, 
  PhoneCall, 
  Clock, 
  ShieldAlert,
  ArrowRight,
  Fuel
} from 'lucide-react';

interface LeadCaptureModuleProps {
  domain: RevenueDomain;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const LeadCaptureModule: React.FC<LeadCaptureModuleProps> = ({
  domain,
  onAddLead,
  businessName,
  setBusinessName,
  onNavigateTab
}) => {
  // Landing Page editable copy
  const [headline, setHeadline] = useState(domain.defaultHeadline);
  const [subheadline, setSubheadline] = useState(domain.defaultSubheadline);
  const [bulletPoints, setBulletPoints] = useState<string[]>(domain.bulletPoints);
  const [ctaText, setCtaText] = useState('Get Started Now');
  const [isEditingCopy, setIsEditingCopy] = useState(false);
  const [generatingCopy, setGeneratingCopy] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Hello! Welcome to ${businessName || 'our expert team'}. I'm your 24/7 AI Assistant for ${domain.name}. How can I assist you today?`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);

  // Call Tracking Log State
  const [callLogs, setCallLogs] = useState<Array<{ id: string; caller: string; phone: string; duration: string; status: string; time: string }>>([
    { id: '1', caller: 'John Morrison', phone: '(555) 234-8901', duration: '2m 45s', status: 'Qualified Lead', time: '12 mins ago' },
    { id: '2', caller: 'Sarah Jenkins', phone: '(555) 892-1102', duration: '4m 10s', status: 'Appointment Booked', time: '1 hour ago' }
  ]);
  const [simulatingCall, setSimulatingCall] = useState(false);

  // Sync copy when domain changes
  React.useEffect(() => {
    setHeadline(domain.defaultHeadline);
    setSubheadline(domain.defaultSubheadline);
    setBulletPoints(domain.bulletPoints);
  }, [domain]);

  // Handle Lead Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    onAddLead({
      name: formName,
      email: formEmail,
      phone: formPhone || '(555) 000-1234',
      domainId: domain.id,
      status: 'New',
      value: domain.avgRevenue,
      source: 'Landing Form'
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubmitted(false);
    }, 4000);
  };

  // Handle AI Chatbot send message
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isBotThinking) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: timeStr }]);
    setIsBotThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.name,
          businessName: businessName || 'our agency',
          userMessage: userMsg,
          history: chatMessages.map((m) => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text }))
        })
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.reply || 'Thank you! We can get you scheduled right away.', time: timeStr }
      ]);

      // If lead contact info detected in message, capture lead
      if (userMsg.includes('@') || /\d{7,}/.test(userMsg)) {
        onAddLead({
          name: 'Chat Lead',
          email: userMsg.includes('@') ? userMsg : 'chatlead@example.com',
          phone: userMsg.match(/\d+/)?.[0] || '(555) 999-8877',
          domainId: domain.id,
          status: 'New',
          value: domain.avgRevenue,
          source: 'AI Chatbot'
        });
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thanks for your interest in our ${domain.name} services! Would you like to pick a direct time on our strategy calendar?`,
          time: timeStr
        }
      ]);
    } finally {
      setIsBotThinking(false);
    }
  };

  // Simulate Incoming Call
  const handleSimulateCall = () => {
    setSimulatingCall(true);
    setTimeout(() => {
      const names = ['Michael Vance', 'Elena Rostova', 'Rachel Adams', 'Carlos Mendez'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPhone = `(555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newCall = {
        id: Date.now().toString(),
        caller: randomName,
        phone: randomPhone,
        duration: '3m 15s',
        status: 'Inbound Qualified Call',
        time: 'Just now'
      };

      setCallLogs((prev) => [newCall, ...prev]);
      onAddLead({
        name: randomName,
        email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
        phone: randomPhone,
        domainId: domain.id,
        status: 'Contacted',
        value: domain.avgRevenue,
        source: 'Phone Call'
      });
      setSimulatingCall(false);
    }, 1500);
  };

  // Generate Copy using Gemini API endpoint
  const handleGenerateAICopy = async () => {
    setGeneratingCopy(true);
    try {
      const res = await fetch('/api/generate-landing-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.name,
          businessName: businessName || 'Our Business Engine',
          location: 'Nationwide'
        })
      });
      const data = await res.json();
      if (data.headline) setHeadline(data.headline);
      if (data.subheadline) setSubheadline(data.subheadline);
      if (data.bulletPoints && Array.isArray(data.bulletPoints)) setBulletPoints(data.bulletPoints);
      if (data.ctaText) setCtaText(data.ctaText);
    } catch {
      // Keep existing
    } finally {
      setGeneratingCopy(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Controls & Business Name Config */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span>🎯 1. Lead Capture Engine</span>
            <span className="text-xs font-normal text-slate-500">({domain.name})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Captures high-intent leads 24/7 through your landing page, AI Chatbot, call tracking, and lead forms.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block">Business Brand Name</label>
            <input 
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. CFO TAX PRO LLC"
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none w-52 text-slate-900"
            />
          </div>

          <button
            onClick={handleGenerateAICopy}
            disabled={generatingCopy}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition mt-3 sm:mt-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{generatingCopy ? 'Writing AI Copy...' : 'Generate AI Copy'}</span>
          </button>
        </div>
      </div>

      {/* CFO TAX PRO LLC Entity Verification & Authentic Benchmark Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 border border-slate-700 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-100 text-sm flex items-center space-x-2">
              <span>Smart Business Entity: {businessName || 'CFO TAX PRO LLC'}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                REAL BUSINESS DATA
              </span>
            </div>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Configured for IRS Enrolled Agent (EA) tax filing, Fractional CFO advisory, audit defense, and compliant business financial automation.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('lead_fuel')}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-1.5 transition shadow-xs"
            >
              <Fuel className="w-3.5 h-3.5 fill-current" />
              <span>🚀 1-Click Lead Fuel & Broadcasts</span>
            </button>
          )}
          <div className="flex items-center space-x-2 text-[10px] bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EIN 27-3243694</span>
          </div>
        </div>
      </div>

      {/* Grid: Live Landing Page Preview + Interactive Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Live Landing Page Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Live Landing Page Preview</span>
            </span>
            <button
              onClick={() => setIsEditingCopy(!isEditingCopy)}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center space-x-1 font-medium bg-slate-100 px-2.5 py-1 rounded border border-slate-200"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingCopy ? 'Close Copy Editor' : 'Edit Page Text'}</span>
            </button>
          </div>

          {/* Copy Editor Drawer if Toggled */}
          {isEditingCopy && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Main Headline</label>
                <input 
                  type="text" 
                  value={headline} 
                  onChange={(e) => setHeadline(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subheadline</label>
                <textarea 
                  value={subheadline} 
                  onChange={(e) => setSubheadline(e.target.value)} 
                  rows={2}
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CTA Button Text</label>
                <input 
                  type="text" 
                  value={ctaText} 
                  onChange={(e) => setCtaText(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Actual Landing Page Mock Frame */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Mock Browser Header */}
            <div className="bg-slate-900 text-slate-300 px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <span className="bg-slate-800 text-slate-400 px-3 py-0.5 rounded-full text-[11px] font-mono">
                  https://{businessName ? businessName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'myrevenue'}.com/{domain.id}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                LIVE 24/7 CAPTURE
              </span>
            </div>

            {/* Landing Hero Section */}
            <div className="p-6 sm:p-10 bg-gradient-to-b from-slate-50 to-white">
              <div className="max-w-xl mx-auto text-center space-y-4">
                
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
                  {businessName || 'Elite Advisory'} • {domain.name}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {headline}
                </h1>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {subheadline}
                </p>

                {/* Key Proof Points */}
                <div className="py-2 space-y-2 text-left bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  {bulletPoints.map((bp, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Embedded Lead Form */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg mt-6 text-left border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-100 mb-1 flex items-center justify-between">
                    <span>Request Free {domain.name} Consultation</span>
                    <span className="text-[10px] text-emerald-400 font-normal">Valued at $250 • Free Today</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Fill out your details below to lock in immediate expert guidance.</p>

                  {formSubmitted ? (
                    <div className="bg-emerald-900/50 border border-emerald-500/40 p-4 rounded-xl text-center text-emerald-200 space-y-1">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                      <div className="font-bold text-sm">Inquiry Received!</div>
                      <div className="text-xs text-emerald-300">Your details have been passed directly to our revenue pipeline. Expect a response in &lt; 15 minutes.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-medium block mb-1">Full Name</label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                          <input 
                            type="text" 
                            required 
                            placeholder="John Doe" 
                            value={formName} 
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-300 font-medium block mb-1">Email Address</label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                            <input 
                              type="email" 
                              required 
                              placeholder="john@company.com" 
                              value={formEmail} 
                              onChange={(e) => setFormEmail(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-300 font-medium block mb-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                            <input 
                              type="tel" 
                              required 
                              placeholder="(555) 000-1234" 
                              value={formPhone} 
                              onChange={(e) => setFormPhone(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs shadow-md transition flex items-center justify-center space-x-2 mt-2"
                      >
                        <span>{ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Right Column: 24/7 AI Chatbot & Call Tracking Simulator */}
        <div className="space-y-6">
          
          {/* Widget 1: 24/7 AI Chatbot Simulator */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">24/7 AI Lead Qualifier</h3>
                  <p className="text-[10px] text-emerald-600 font-medium">Online & Qualifying Leads</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Gemini AI</span>
            </div>

            {/* Chat Conversation Area */}
            <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1 text-xs">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-slate-100 rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-60 mt-1 block text-right">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isBotThinking && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-500 rounded-xl p-2 text-xs italic animate-pulse">
                    AI qualifier typing response...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex space-x-2 pt-2 border-t border-slate-100">
              <input 
                type="text" 
                placeholder="Ask a question as a prospect..." 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isBotThinking}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-xs flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Widget 2: Virtual Call Tracking Logger */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-800">Call Tracking Number</h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                (800) 492-7102
              </span>
            </div>

            <p className="text-[11px] text-slate-500">Inbound call tracking records caller ID, records phone audio, and injects qualified callers into your CRM.</p>

            <button
              onClick={handleSimulateCall}
              disabled={simulatingCall}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 transition flex items-center justify-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{simulatingCall ? 'Connecting Inbound Call...' : 'Simulate Inbound Lead Call'}</span>
            </button>

            {/* Recent Call Logs */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Inbound Calls</div>
              {callLogs.map((call) => (
                <div key={call.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200/70 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{call.caller}</div>
                    <div className="text-[10px] text-slate-500 flex items-center space-x-2">
                      <span>{call.phone}</span>
                      <span>•</span>
                      <span className="flex items-center"><Clock className="w-2.5 h-2.5 inline mr-0.5" />{call.duration}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {call.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
