import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, Check } from 'lucide-react';

interface VoiceAssistantWidgetProps {
  onNavigateTab: (tab: string) => void;
  onOpenSummary: () => void;
  onOpenCustomDomain: () => void;
}

export const VoiceAssistantWidget: React.FC<VoiceAssistantWidgetProps> = ({
  onNavigateTab,
  onOpenSummary,
  onOpenCustomDomain
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('Click microphone or select a voice command below.');

  const handleCommand = (cmdText: string) => {
    setTranscript(cmdText);
    const lower = cmdText.toLowerCase();

    if (lower.includes('money') || lower.includes('revenue') || lower.includes('cash') || lower.includes('daily')) {
      onNavigateTab('daily_revenue');
      setFeedback('Executing command: Opening 24/7 Daily Revenue Generation Engine...');
    } else if (lower.includes('summary') || lower.includes('report') || lower.includes('briefing')) {
      onOpenSummary();
      setFeedback('Executing command: Opening Daily Executive Briefing...');
    } else if (lower.includes('agent') || lower.includes('autonomous')) {
      onNavigateTab('ai_agents');
      setFeedback('Executing command: Navigating to Autonomous AI Agents Module...');
    } else if (lower.includes('crm') || lower.includes('pipeline') || lower.includes('leads')) {
      onNavigateTab('crm');
      setFeedback('Executing command: Opening Multi-Pipeline CRM...');
    } else if (lower.includes('capture') || lower.includes('chatbot') || lower.includes('form')) {
      onNavigateTab('capture');
      setFeedback('Executing command: Opening Lead Capture & Chatbot...');
    } else if (lower.includes('domain') || lower.includes('clone') || lower.includes('add')) {
      onOpenCustomDomain();
      setFeedback('Executing command: Opening One-Click Domain Deployment Studio...');
    } else if (lower.includes('nurture') || lower.includes('outreach') || lower.includes('email')) {
      onNavigateTab('nurture');
      setFeedback('Executing command: Opening Automated Nurture Module...');
    } else if (lower.includes('conversion') || lower.includes('pricing') || lower.includes('calculator')) {
      onNavigateTab('conversion');
      setFeedback('Executing command: Opening Dynamic Pricing & Conversion Module...');
    } else {
      setFeedback(`Command parsed: "${cmdText}". Navigating to AI Agents suite...`);
      onNavigateTab('ai_agents');
    }

    setTimeout(() => {
      setIsListening(false);
    }, 1500);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    setFeedback('Listening for voice command... (e.g., "Open AI Agents", "Show Daily Summary", "View CRM")');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          handleCommand(spokenText);
        };

        recognition.onerror = () => {
          setFeedback('Speech recognition inactive. Pick a voice command trigger below:');
        };

        recognition.start();
      } catch (err) {
        setFeedback('Speech API not supported in this frame. Use rapid triggers below:');
      }
    } else {
      setFeedback('Select a quick voice action trigger below:');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-emerald-400 p-3.5 rounded-full shadow-2xl border border-emerald-500/40 flex items-center space-x-2 transition ring-4 ring-emerald-500/10 group"
          title="Voice Command Assistant"
        >
          <Mic className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
          <span className="text-xs font-bold text-white pr-1 hidden sm:inline">AI Voice Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      ) : (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 w-80 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Voice Command Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={startVoiceInput}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition ${
                  isListening
                    ? 'bg-emerald-500 text-slate-950 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
                <span>{isListening ? 'Listening... Speak Now' : 'Click to Speak Command'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-300 italic min-h-[28px]">
              {feedback}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Quick Voice Command Triggers</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handleCommand('Open 24/7 Money Maker')}
                className="p-1.5 bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900 rounded text-left text-[11px] text-emerald-300 truncate font-extrabold col-span-2 flex items-center justify-between"
              >
                <span>💰 "Open 24/7 Money Maker"</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
              <button
                onClick={() => handleCommand('Open Daily Summary')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-left text-[11px] text-emerald-300 truncate font-semibold"
              >
                🗣️ "Show Daily Summary"
              </button>
              <button
                onClick={() => handleCommand('Open AI Agents')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-left text-[11px] text-purple-300 truncate font-semibold"
              >
                🗣️ "Open AI Agents"
              </button>
              <button
                onClick={() => handleCommand('View CRM Pipeline')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-left text-[11px] text-blue-300 truncate font-semibold"
              >
                🗣️ "View CRM Pipeline"
              </button>
              <button
                onClick={() => handleCommand('Deploy New Domain')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-left text-[11px] text-amber-300 truncate font-semibold"
              >
                🗣️ "Deploy New Domain"
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
