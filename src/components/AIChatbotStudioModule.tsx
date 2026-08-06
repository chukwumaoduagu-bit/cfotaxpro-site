import React, { useState } from 'react';
import { RevenueDomain, Lead } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  ExternalLink,
  Sliders,
  Play,
  FileCode2,
  Cpu
} from 'lucide-react';

interface AIChatbotStudioModuleProps {
  businessName: string;
  activeDomain: RevenueDomain;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
}

export const AIChatbotStudioModule: React.FC<AIChatbotStudioModuleProps> = ({
  businessName,
  activeDomain,
  onAddLead
}) => {
  const ownerName = "Chukwuma Oduagu";
  const ownerPhone = "(469) 386-7235";

  // Tab state within the AI Studio module
  const [studioTab, setStudioTab] = useState<'simulator' | 'stack' | 'sequences' | 'training_script'>('simulator');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Chatbot Live Simulation State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hi there! I'm the ${businessName || 'CFO TAX PRO'} assistant. I can help with tax planning, business structure, bookkeeping, and IRS issues. Are you a business owner, freelancer, or individual looking for tax help?`,
      options: ['Business Owner', 'Freelancer / 1099', 'Individual Tax Payer', 'Dealing with IRS Audit']
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [capturedLeadName, setCapturedLeadName] = useState('');
  const [capturedLeadEmail, setCapturedLeadEmail] = useState('');
  const [capturedLeadPhone, setCapturedLeadPhone] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Test Sequence Simulation state
  const [selectedSequence, setSelectedSequence] = useState<'email1' | 'sms1' | 'sms2' | 'sms3'>('email1');
  const [testLeadName, setTestLeadName] = useState('Marcus Vance');

  // Trigger Bot Response Logic based on user input
  const handleUserMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsBotTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: activeDomain.name,
          userMessage: userText,
          businessName: businessName || 'CFO TAX PRO LLC',
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply || `Thank you! Let's get you booked on ${ownerName}'s calendar for a free tax review call.`,
            options: ['Book Free Consultation', 'Call Direct: (469) 386-7235', 'Tell me more about R&D tax credits']
          }
        ]);
        return;
      }
    } catch (err) {
      console.warn("API fallback to local rules", err);
    }

    // Local fallback logic
    setTimeout(() => {
      setIsBotTyping(false);
      const lower = userText.toLowerCase();
      let botResponse = '';
      let options: string[] | undefined;

      if (lower.includes('business owner') || lower.includes('llc') || lower.includes('s-corp')) {
        botResponse = `Great! What industry are you in? And what is your biggest tax or financial challenge right now?`;
        options = ['I think I am overpaying on taxes', 'I need help setting up an S-Corp', 'My books are a mess', 'Need Fractional CFO Advisory'];
      } else if (lower.includes('freelancer') || lower.includes('1099') || lower.includes('individual')) {
        botResponse = `Got it! Are you filing as a sole proprietor, single-member LLC, or W-2 individual?`;
        options = ['Sole Proprietor', 'Single Member LLC', 'W-2 with Side Income'];
      } else if (lower.includes('overpaying') || lower.includes('tax') || lower.includes('save')) {
        botResponse = `I help business owners maximize deductions and minimize tax liabilities. Most clients save $4,800–$14,000+ per year! Would you like to schedule a free 15-minute tax review with ${ownerName}?`;
        options = ['Yes, Book Free Call', 'How much does it cost?', 'I already have an accountant'];
      } else if (lower.includes('already have an accountant') || lower.includes('accountant')) {
        botResponse = `That's great! Do you feel like you're getting proactive tax planning from them, or just annual filing? We work with many business owners who just need a second set of eyes on their deductions. Shall we do a quick second-opinion review?`;
        options = ['Yes, second opinion call', 'I will think about it'];
      } else if (lower.includes('cost') || lower.includes('afford')) {
        botResponse = `I understand! Here is what I recommend: let's do a free 15-minute tax review first. ${ownerName} will show you where you can save money, and you decide if it makes sense. What is the best email and phone number to send your invite?`;
      } else if (lower.includes('book') || lower.includes('yes') || lower.includes('call') || lower.includes('schedule')) {
        botResponse = `Awesome! I can get you booked on ${ownerName}'s calendar right now. Please enter your name, email, and phone number below:`;
      } else {
        botResponse = `That's a great point. At ${businessName || 'CFO TAX PRO LLC'}, ${ownerName} personally reviews every client portfolio. I'd love to connect you directly. What's the best email and phone number to reach you?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          options
        }
      ]);
    }, 600);
  };

  const handleQuickOptionClick = (option: string) => {
    handleUserMessage(option);
  };

  const handleCaptureLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedLeadName || !capturedLeadEmail) return;

    onAddLead({
      name: capturedLeadName,
      email: capturedLeadEmail,
      phone: capturedLeadPhone || ownerPhone,
      domainId: activeDomain.id,
      status: 'Call Booked',
      value: activeDomain.avgRevenue || 2000,
      source: 'AI Chatbot (LoopHQ / Promptor)'
    });

    setLeadCaptured(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-final-${Date.now()}`,
        sender: 'bot',
        text: `🎉 Thank you ${capturedLeadName}! Your appointment request has been logged. ${ownerName} will reach out at ${capturedLeadPhone || ownerPhone} or send confirmation to ${capturedLeadEmail}. You can also call us directly anytime at ${ownerPhone}.`
      }
    ]);
  };

  const fullPromptScript = `
🤖 CHATBOT IDENTITY & TRAINING SCRIPT FOR ${businessName || 'CFO TAX PRO LLC'}
Name: CFO TAX PRO Assistant
Owner / Director: ${ownerName}
Direct Phone: ${ownerPhone}
Role: Professional, friendly tax and business advisor. You help small business owners, freelancers, and individuals with tax planning, business structuring, bookkeeping, tech stack R&D credits, and IRS-related issues.
Tone: Professional but approachable. Warm, reassuring, expert tone. You speak like a trusted financial advisor.

💬 GREETING MESSAGE:
"Hi there! I'm the CFO TAX PRO assistant. I can help with tax planning, business structure, bookkeeping, and IRS issues. Are you a business owner, freelancer, or individual looking for tax help?"

📋 QUALIFYING FLOW:
1. "Are you a business owner, freelancer, or individual?"
2. "What's your biggest tax or business challenge right now?" (Overpaying taxes, IRS back taxes, S-Corp setup, messy books, Fractional CFO advisory)
3. "Would you like to speak with a tax professional about this?"

💰 CORE SERVICES TRAINED RESPONSES:
- Tax Planning & Resolution: Maximize deductions, IRS representation, audit defense.
- Fractional CFO & Advisory: Monthly KPI dashboard, cash flow forecasting, profit margin optimization.
- Monthly Bookkeeping: QuickBooks/Xero reconciliation, tax-ready financial statements.
- Business Credit Consulting: Access up to $250k in business credit lines without personal guarantee.
- Tech Stack & R&D Tax Credits: Software R&D tax credit claims and cloud infrastructure expense optimization.

📌 OBJECTION HANDLERS:
- "I already have an accountant" -> "That's great! Do you feel like you're getting proactive tax planning from them, or just annual filing? We offer a free 15-minute second-opinion tax review."
- "Can't afford it" -> "We offer a free tax review first. We show you exact dollar savings before you spend a dime."
- "I'll think about it" -> "No problem! Call or text Chukwuma Oduagu directly at ${ownerPhone} whenever you're ready."

🎯 ESCALATION TRIGGER:
When visitor is ready to book, has a complex IRS case, or asks to speak with a human:
"I will connect you directly with ${ownerName}. Call/text ${ownerPhone} or enter your contact info below."
`.trim();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPromptScript);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Module Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 border border-slate-700 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs rounded font-bold flex items-center space-x-1">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI SYSTEM & CHATBOT ENGINE</span>
              </span>
              <span className="text-xs text-slate-400">({businessName || 'CFO TAX PRO LLC'})</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100 mt-1">24/7 AI Lead Capture & Automated Drip Engine</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Powered by LoopHQ, Reply.io, Calendly, and ChatGPT/Claude trained for {ownerName} ({ownerPhone}).
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setStudioTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'simulator' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              💬 Live Chat Simulator
            </button>
            <button
              onClick={() => setStudioTab('stack')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'stack' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🛠️ AI Tech Stack
            </button>
            <button
              onClick={() => setStudioTab('sequences')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'sequences' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              ✉️ Drip Sequences
            </button>
            <button
              onClick={() => setStudioTab('training_script')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'training_script' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🤖 System Prompt
            </button>
          </div>
        </div>

        {/* 5-Stage System Architecture Visual Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 text-xs border-t border-slate-800">
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">1. Lead Capture</div>
            <div className="font-semibold text-slate-200 mt-0.5">LoopHQ / Chatbot</div>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-[10px] text-teal-400 font-bold uppercase">2. AI Outreach</div>
            <div className="font-semibold text-slate-200 mt-0.5">Reply.io / Instantly</div>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-[10px] text-amber-400 font-bold uppercase">3. AI Booking</div>
            <div className="font-semibold text-slate-200 mt-0.5">Calendly Auto-Sync</div>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-[10px] text-indigo-400 font-bold uppercase">4. Closing Support</div>
            <div className="font-semibold text-slate-200 mt-0.5">ChatGPT / Claude GPT</div>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-[10px] text-emerald-300 font-bold uppercase">5. High-Value Delivery</div>
            <div className="font-semibold text-slate-200 mt-0.5">{ownerName} (CFO TAX PRO)</div>
          </div>
        </div>
      </div>

      {/* TAB 1: LIVE CHATBOT SIMULATOR */}
      {studioTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chat Window Container (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col h-[520px] overflow-hidden">
            
            {/* Chatbot Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 absolute bottom-0 right-0"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{businessName || 'CFO TAX PRO'} AI Assistant</h3>
                  <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                    <span>Active 24/7 • Trained for {ownerName}</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded border border-slate-700">
                Direct: {ownerPhone}
              </span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Quick Click Option Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickOptionClick(opt)}
                          className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 rounded-full text-[10px] font-semibold transition shadow-2xs"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isBotTyping && (
                <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-2xl border border-slate-200 w-20">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleUserMessage(inputMessage); }} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about tax prep, S-Corp, bookkeeping, or fractional CFO..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Lead Capture Form & AI Qualification Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Contact Form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase text-slate-800 flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Instant Lead Capture Integration</span>
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                  AUTO CRM SYNC
                </span>
              </div>

              {!leadCaptured ? (
                <form onSubmit={handleCaptureLeadSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Prospect Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Terrence Vance"
                      value={capturedLeadName}
                      onChange={(e) => setCapturedLeadName(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="terrence@company.com"
                      value={capturedLeadEmail}
                      onChange={(e) => setCapturedLeadEmail(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(469) 386-7235"
                      value={capturedLeadPhone}
                      onChange={(e) => setCapturedLeadPhone(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-xs shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Push Lead to Pipeline</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-emerald-950 text-xs">Lead Captured & Synced to CRM!</div>
                  <p className="text-[11px] text-slate-600">
                    Lead added to pipeline. Reply.io welcome email & SMS sequence triggered for {capturedLeadName}.
                  </p>
                  <button
                    onClick={() => { setLeadCaptured(false); setCapturedLeadName(''); setCapturedLeadEmail(''); }}
                    className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded"
                  >
                    Test Another Lead
                  </button>
                </div>
              )}
            </div>

            {/* Direct Escalation Card */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                <Phone className="w-4 h-4" />
                <span>Direct Executive Line</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Speak directly with <strong>{ownerName}</strong> at <strong>CFO TAX PRO LLC</strong>:
              </p>
              <div className="text-base font-extrabold text-white font-mono bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                {ownerPhone}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: AI TECH STACK & TOOLS BREAKDOWN */}
      {studioTab === 'stack' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Bot className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-slate-400">$39/mo</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. LoopHQ / Promptor</h3>
                <div className="text-[10px] font-bold uppercase text-emerald-600">24/7 AI Chatbot</div>
                <p className="text-xs text-slate-500 mt-1">
                  Engages website visitors, answers tax FAQs, qualifies leads, and captures phone numbers 24/7.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-slate-400">$49/mo</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Reply.io / Instantly</h3>
                <div className="text-[10px] font-bold uppercase text-teal-600">AI Outreach & Drip</div>
                <p className="text-xs text-slate-500 mt-1">
                  Sends multi-touch personalized emails and SMS text follow-ups automatically upon lead capture.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-slate-400">Free / $12</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Calendly + AI Sync</h3>
                <div className="text-[10px] font-bold uppercase text-amber-600">Appointment Booking</div>
                <p className="text-xs text-slate-500 mt-1">
                  Shows live availability and books consultation calls directly into Google Calendar with SMS reminders.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-slate-400">$20/mo</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">4. ChatGPT / Claude</h3>
                <div className="text-[10px] font-bold uppercase text-indigo-600">Closing & Proposals</div>
                <p className="text-xs text-slate-500 mt-1">
                  Drafts custom tax proposals, handles objections, and writes tailored client strategy roadmaps.
                </p>
              </div>
            </div>

          </div>

          {/* Cost vs ROI Breakdown */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">TOTAL AI SYSTEM COST</div>
              <div className="text-2xl font-extrabold text-white">~$100 / Month</div>
              <p className="text-xs text-slate-400 max-w-xl">
                Replaces a $4,000/mo full-time sales assistant. Pays for itself with just 1 closed client per year.
              </p>
            </div>

            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs text-right space-y-1">
              <div className="text-slate-400 font-medium">Estimated Monthly Output:</div>
              <div className="text-lg font-bold text-emerald-400">30+ Qualified Leads / Mo</div>
              <div className="text-[10px] text-slate-400">Based on 24/7 speed-to-lead automation</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DRIP SEQUENCES SIMULATOR */}
      {studioTab === 'sequences' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Automated Reply.io Email & SMS Drip Sequences</h3>
              <p className="text-xs text-slate-500">Preview exact sequences triggered automatically for new CFO TAX PRO prospects.</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedSequence('email1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedSequence === 'email1' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Email 1 (Immediate)
              </button>
              <button
                onClick={() => setSelectedSequence('sms1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedSequence === 'sms1' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                SMS 1 (Immediate)
              </button>
              <button
                onClick={() => setSelectedSequence('sms2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedSequence === 'sms2' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                SMS 2 (Day 2)
              </button>
              <button
                onClick={() => setSelectedSequence('sms3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedSequence === 'sms3' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                SMS 3 (Day 5)
              </button>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 space-y-3">
            {selectedSequence === 'email1' && (
              <>
                <div className="border-b border-slate-200 pb-2">
                  <strong>Subject:</strong> Your next step for {businessName || 'CFO TAX PRO LLC'}
                </div>
                <div>
                  Hi {testLeadName},<br/><br/>
                  Thanks for connecting with CFO TAX PRO. I noticed your interest in our tax preparation, fractional CFO advisory, and business credit services.<br/><br/>
                  Here is what I recommend next: a free 15-minute consultation where we can discuss your situation and show you exact tax savings.<br/><br/>
                  You can book a time on my direct calendar here: <u>[Calendly Link]</u><br/><br/>
                  Looking forward to helping you,<br/>
                  <strong>{ownerName}</strong><br/>
                  Founder & Principal, CFO TAX PRO LLC<br/>
                  Direct Phone: {ownerPhone}
                </div>
              </>
            )}

            {selectedSequence === 'sms1' && (
              <div>
                "Hi {testLeadName}, thanks for reaching out to CFO TAX PRO LLC. I'll be reaching out to book a call. In the meantime, any questions? Reply anytime. -Chukwuma {ownerPhone}"
              </div>
            )}

            {selectedSequence === 'sms2' && (
              <div>
                "Hi {testLeadName}, just checking in — did you have any questions about your free tax review? No pressure, just want to make sure you're not missing out on deductions. Reply anytime. -Chukwuma {ownerPhone}"
              </div>
            )}

            {selectedSequence === 'sms3' && (
              <div>
                "Hi {testLeadName}, one last thought — most small businesses overpay taxes by $1,000+ per year without realizing it. Book a free call here: [Calendly Link] or call me directly at {ownerPhone} -Chukwuma"
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM PROMPT EXPORTER */}
      {studioTab === 'training_script' && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <FileCode2 className="w-5 h-5 text-emerald-400" />
                <span>LoopHQ & ChatGPT System Prompt Export</span>
              </h3>
              <p className="text-xs text-slate-400">Copy this master prompt directly into LoopHQ, Promptor, or OpenAI Custom GPT.</p>
            </div>

            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center space-x-2 shadow-sm"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy Master Prompt'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap max-h-96">
            {fullPromptScript}
          </pre>
        </div>
      )}

    </div>
  );
};
