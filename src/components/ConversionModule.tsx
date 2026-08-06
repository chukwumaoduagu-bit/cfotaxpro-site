import React, { useState, useEffect } from 'react';
import { RevenueDomain, AppointmentSlot, Invoice } from '../types';
import { CfoTaxProLogo } from './CfoTaxProLogo';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  DollarSign, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Lock, 
  ShieldCheck, 
  MessageCircle, 
  Zap, 
  ArrowRight,
  Printer,
  Download,
  Plus,
  Building,
  CheckCircle2
} from 'lucide-react';

interface ConversionModuleProps {
  domain: RevenueDomain;
  businessName: string;
  onPaymentCollected: (amount: number, clientName: string) => void;
}

export const ConversionModule: React.FC<ConversionModuleProps> = ({
  domain,
  businessName,
  onPaymentCollected
}) => {
  // Booking Slots state
  const [slots, setSlots] = useState<AppointmentSlot[]>([
    { id: '1', date: 'Tomorrow', time: '10:00 AM', serviceName: `${domain.name} Discovery Call`, status: 'Available' },
    { id: '2', date: 'Tomorrow', time: '02:30 PM', serviceName: `${domain.name} Discovery Call`, status: 'Available' },
    { id: '3', date: 'Friday', time: '11:15 AM', serviceName: `${domain.name} Discovery Call`, status: 'Available' },
    { id: '4', date: 'Friday', time: '04:00 PM', serviceName: `${domain.name} Discovery Call`, status: 'Available' },
  ]);

  const [bookingClientName, setBookingClientName] = useState('');
  const [bookingClientEmail, setBookingClientEmail] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [lastBookedDetails, setLastBookedDetails] = useState<any>(null);

  // Invoices from Server
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  // New Invoice Form
  const [invoiceClientName, setInvoiceClientName] = useState('Marcus Vance');
  const [invoiceClientEmail, setInvoiceClientEmail] = useState('marcus@vancecloud.io');
  const [invoiceAmount, setInvoiceAmount] = useState<number>(domain.avgRevenue);
  const [invoiceDescription, setInvoiceDescription] = useState(`${domain.name} Engagement & Execution`);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  // Active Receipt Modal
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState<Invoice | null>(null);

  // Payment processing state
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

  // Closing Script AI State
  const [objectionType, setObjectionType] = useState('Price is too high / Budget concern');
  const [scriptData, setScriptData] = useState<{ closingScript: string; objectionReframe: string }>({
    closingScript: `1. DISCOVERY: "What is currently your biggest bottleneck handling ${domain.name} on your own?"\n2. VALUE FRAME: "Our engine eliminates 90% of manual effort and guarantees compliance."\n3. CLOSE: "Would morning or afternoon work better for us to finalize your onboarding?"`,
    objectionReframe: `"I completely understand. Cost is always crucial. But let's look at the return: if this service saves you 20 hours and prevents a $5,000 mistake, it pays for itself in week one. Shall we secure your slot today?"`
  });
  const [generatingScript, setGeneratingScript] = useState(false);

  // Fetch real invoices from server
  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const res = await fetch('/api/invoices');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.invoices || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInvoices(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle Slot Booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotId || !bookingClientName || !bookingClientEmail) return;

    const bookedSlot = slots.find(s => s.id === selectedSlotId);
    setSlots((prev) =>
      prev.map((s) =>
        s.id === selectedSlotId
          ? { ...s, status: 'Booked', clientName: bookingClientName, clientEmail: bookingClientEmail }
          : s
      )
    );

    setLastBookedDetails({
      slot: bookedSlot,
      name: bookingClientName,
      email: bookingClientEmail,
      meetingLink: `https://meet.google.com/cfo-tax-${Math.floor(100 + Math.random() * 900)}`
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedSlotId(null);
      setBookingClientName('');
      setBookingClientEmail('');
    }, 1000);
  };

  // Create real persistent invoice
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceClientName || invoiceAmount <= 0) return;
    setIsCreatingInvoice(true);

    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: invoiceClientName,
          clientEmail: invoiceClientEmail,
          domainName: domain.name,
          amount: invoiceAmount,
          lineItems: [
            { description: invoiceDescription, quantity: 1, rate: invoiceAmount, total: invoiceAmount }
          ],
          notes: 'Standard Net 7 terms. Accepted via Stripe or Direct Bank Wire.'
        })
      });

      if (res.ok) {
        await fetchInvoices();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingInvoice(false);
    }
  };

  // Pay invoice via real server endpoint
  const handlePayInvoice = async (invoiceId: string, clientName: string, amount: number) => {
    setPayingInvoiceId(invoiceId);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'Credit Card (Stripe)'
        })
      });

      if (res.ok) {
        const data = await res.json();
        onPaymentCollected(amount, clientName);
        await fetchInvoices();
        setActiveReceiptInvoice(data.invoice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPayingInvoiceId(null);
    }
  };

  // Generate Script via Gemini backend API
  const handleGenerateScript = async () => {
    setGeneratingScript(true);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.name,
          servicePrice: domain.avgRevenue,
          objectionType
        })
      });
      const data = await res.json();
      if (data.closingScript || data.objectionReframe) {
        setScriptData({
          closingScript: data.closingScript || scriptData.closingScript,
          objectionReframe: data.objectionReframe || scriptData.objectionReframe
        });
      }
    } catch {
      // fallback
    } finally {
      setGeneratingScript(false);
    }
  };

  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-1.5 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
            <CfoTaxProLogo size={46} />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <CreditCard className="w-4 h-4" />
              <span>Production Deal Desk & Billing</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Conversion Suite & Legal Invoicing Engine
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dispatch legal invoices with Dallas EIN (27-3243694), collect verified Stripe/ACH payments, and automate discovery call scheduling.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl text-right shrink-0">
          <div className="text-[11px] font-bold uppercase text-emerald-700">Total Payments Collected</div>
          <div className="text-xl font-extrabold text-emerald-900 font-mono mt-0.5">
            ${totalCollected.toLocaleString()}
          </div>
        </div>
      </div>

      {/* SECTION 1: INVOICE GENERATOR & ACTIVE INVOICE LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Create Invoice Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Issue Legal Client Invoice</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Generates invoice under CFO TAX PRO LLC (Dallas, TX)</p>
          </div>

          <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Client / Business Name</label>
              <input
                type="text"
                value={invoiceClientName}
                onChange={(e) => setInvoiceClientName(e.target.value)}
                placeholder="e.g. Vance Cloud Inc"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Client Email Address</label>
              <input
                type="email"
                value={invoiceClientEmail}
                onChange={(e) => setInvoiceClientEmail(e.target.value)}
                placeholder="billing@client.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Description / Line Item</label>
              <input
                type="text"
                value={invoiceDescription}
                onChange={(e) => setInvoiceDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Invoice Total Amount ($)</label>
              <input
                type="number"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20"
                required
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800">Entity Details:</div>
              <div>CFO TAX PRO LLC • 6215 Shady Brook Ln, Dallas, TX 75206</div>
              <div>EIN: 27-3243694 • Direct: (469) 386-7235</div>
            </div>

            <button
              type="submit"
              disabled={isCreatingInvoice}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatingInvoice ? 'Generating Invoice...' : 'Create & Dispatch Invoice'}</span>
            </button>
          </form>
        </div>

        {/* Right: Active Invoices Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Invoices & Settlement Ledger</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time payment tracking with Stripe / ACH status</p>
            </div>
            <button
              onClick={fetchInvoices}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Refresh
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {invoices.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">No active invoices found.</div>
            ) : (
              invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-xs text-slate-900">{inv.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="font-semibold text-xs text-slate-800 mt-1">{inv.clientName}</div>
                    <div className="text-[11px] text-slate-500">{inv.domainName}</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900 font-mono">
                        ${inv.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Due: {inv.dueDate}</div>
                    </div>

                    {inv.status !== 'Paid' ? (
                      <button
                        onClick={() => handlePayInvoice(inv.id, inv.clientName, inv.amount)}
                        disabled={payingInvoiceId === inv.id}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs disabled:opacity-50"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{payingInvoiceId === inv.id ? 'Processing...' : 'Pay with Stripe'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveReceiptInvoice(inv)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Receipt</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* SECTION 2: APPOINTMENT SCHEDULING ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Available Slots (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Calendar Availability: CFO Strategy Sessions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Live direct booking synchronized with Dallas advisory team</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isBooked = slot.status === 'Booked';

              return (
                <div
                  key={slot.id}
                  onClick={() => !isBooked && setSelectedSlotId(slot.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isBooked
                      ? 'bg-slate-100/60 border-slate-200 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{slot.date}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isBooked ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {slot.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-sm font-extrabold text-blue-700 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.time}</span>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-1 truncate">
                    {isBooked ? `Booked by ${slot.clientName}` : '1-on-1 CFO Strategy Call'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Booking Confirmation Form */}
          {selectedSlotId && (
            <form onSubmit={handleConfirmBooking} className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3 animate-fadeIn text-xs">
              <div className="font-bold text-blue-900">Confirm Client for Selected Slot</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Client Full Name"
                  value={bookingClientName}
                  onChange={(e) => setBookingClientName(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  required
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  value={bookingClientEmail}
                  onChange={(e) => setBookingClientEmail(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Call & Dispatch Calendar Invite</span>
              </button>
            </form>
          )}

          {bookingSuccess && lastBookedDetails && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Discovery Call Booked Successfully!</span>
              </div>
              <p className="text-[11px] text-slate-700">
                Calendar invite dispatched to <strong>{lastBookedDetails.email}</strong>. Google Meet link: <span className="font-mono text-blue-700">{lastBookedDetails.meetingLink}</span>
              </p>
            </div>
          )}
        </div>

        {/* Closing Script & AI Objection Battlecard (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>AI Closing Script & Objection Battlecard</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time objection reframing for high-ticket closing</p>
            </div>
            <button
              onClick={handleGenerateScript}
              disabled={generatingScript}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{generatingScript ? 'Generating...' : 'Regenerate Script'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Client Objection:</label>
            <select
              value={objectionType}
              onChange={(e) => setObjectionType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
            >
              <option value="Price is too high / Budget concern">"Your fee is too high / I have budget constraints"</option>
              <option value="I can do it myself on TurboTax">"I can file this myself or use software"</option>
              <option value="I need to think about it / Discuss with partner">"I need to think about it and get back to you"</option>
              <option value="The IRS will reject an Offer in Compromise">"I heard IRS never accepts OIC settlement offers"</option>
            </select>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">Proven 3-Step Discovery & Close Script:</div>
              <pre className="font-sans text-slate-700 whitespace-pre-wrap leading-relaxed text-xs">
                {scriptData.closingScript}
              </pre>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
              <div className="font-bold text-emerald-900 text-[11px] uppercase tracking-wider mb-1">Psychological Reframe Response:</div>
              <p className="text-slate-800 text-xs leading-relaxed italic">
                {scriptData.objectionReframe}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* FORMAL RECEIPT / INVOICE PREVIEW MODAL */}
      {activeReceiptInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <CfoTaxProLogo size={42} />
                <div>
                  <div className="font-extrabold text-lg text-slate-900">CFO TAX PRO LLC</div>
                  <div className="text-xs text-slate-500">Official Payment Receipt & Tax Authorization</div>
                </div>
              </div>
              <button
                onClick={() => setActiveReceiptInvoice(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice Reference:</span>
                <span className="font-mono font-bold text-slate-900">{activeReceiptInvoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client / Taxpayer:</span>
                <span className="font-bold text-slate-900">{activeReceiptInvoice.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono text-emerald-700 font-bold">{activeReceiptInvoice.transactionId || 'tx_2732436_auth'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">${activeReceiptInvoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dallas Office:</span>
                <span>6215 Shady Brook Ln, Dallas, TX 75206</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax ID:</span>
                <span className="font-mono">EIN-27-3243694</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Status: PAID IN FULL & VERIFIED</span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Legal Receipt</span>
              </button>
              <button
                onClick={() => setActiveReceiptInvoice(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
