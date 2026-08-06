import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calculator, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  User, 
  Building2, 
  DollarSign, 
  Layers, 
  HelpCircle, 
  RefreshCw, 
  Trash2, 
  FileCheck, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  Printer, 
  Zap, 
  AlertCircle,
  Cpu
} from 'lucide-react';
import { TaxReturnData, RevenueDomain } from '../types';

interface TaxPrepSoftwareModuleProps {
  businessName: string;
  activeDomain?: RevenueDomain;
  onNavigateTab?: (tab: string) => void;
}

export const TaxPrepSoftwareModule: React.FC<TaxPrepSoftwareModuleProps> = ({
  businessName,
  onNavigateTab
}) => {
  const [taxReturns, setTaxReturns] = useState<TaxReturnData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'returns_list' | 'prepare_wizard' | 'form_preview' | 'api_engine'>('returns_list');
  const [filterFormType, setFilterFormType] = useState<string>('all');
  
  // Wizard Form State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [currentReturnId, setCurrentReturnId] = useState<string>('');
  
  // Form Inputs
  const [taxpayerName, setTaxpayerName] = useState('Marcus Vance');
  const [ssnEin, setSsnEin] = useState('458-92-1102');
  const [email, setEmail] = useState('marcus@vancedigital.com');
  const [phone, setPhone] = useState('(214) 555-0199');
  const [formType, setFormType] = useState<TaxReturnData['formType']>('Form 1040');
  const [taxYear, setTaxYear] = useState<number>(2025);
  const [filingStatus, setFilingStatus] = useState<TaxReturnData['filingStatus']>('Single');
  const [state, setState] = useState('TX');
  
  // Income & Deduction Figures
  const [wages, setWages] = useState<string>('125000');
  const [businessIncome1099, setBusinessIncome1099] = useState<string>('45000');
  const [k1Distributions, setK1Distributions] = useState<string>('15000');
  const [officerCompensation, setOfficerCompensation] = useState<string>('0');
  const [standardOrItemized, setStandardOrItemized] = useState<string>('14600');
  const [sec179, setSec179] = useState<string>('12000');
  const [withholding, setWithholding] = useState<string>('28000');
  const [notes, setNotes] = useState('');

  // Computation Results
  const [calculatedTotals, setCalculatedTotals] = useState<{
    grossIncome: number;
    standardDeduction: number;
    netBusinessIncome: number;
    qbiDeduction: number;
    taxableIncome: number;
    selfEmploymentTax: number;
    incomeTax: number;
    totalTaxLiability: number;
    totalPaymentsWithholding: number;
    netRefundOrBalanceDue: number;
  }>({
    grossIncome: 185000,
    standardDeduction: 14600,
    netBusinessIncome: 33000,
    qbiDeduction: 6600,
    taxableIncome: 151800,
    selfEmploymentTax: 4668,
    incomeTax: 28416,
    totalTaxLiability: 33084,
    totalPaymentsWithholding: 28000,
    netRefundOrBalanceDue: -5084
  });

  const [eFileLog, setEFileLog] = useState<string[]>([]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activePreviewReturn, setActivePreviewReturn] = useState<TaxReturnData | null>(null);

  // Fetch Existing Returns
  const fetchReturns = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tax-returns');
      if (res.ok) {
        const data = await res.json();
        if (data.returns) {
          setTaxReturns(data.returns);
        }
      }
    } catch (e) {
      console.warn("Using local tax return state fallback.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  // Compute On the Fly when figures change
  useEffect(() => {
    const w = Number(wages) || 0;
    const b = Number(businessIncome1099) || 0;
    const k = Number(k1Distributions) || 0;
    const oc = Number(officerCompensation) || 0;
    const s179 = Number(sec179) || 0;
    const std = Number(standardOrItemized) || (filingStatus === 'Married Filing Jointly' ? 29200 : 14600);
    const withh = Number(withholding) || 0;

    const gross = w + b + k + oc;
    const netBiz = Math.max(0, b - s179);
    const qbi = Math.round(netBiz * 0.20);
    const taxable = Math.max(0, gross - std - s179 - qbi);

    let rate = 0.12;
    if (taxable > 100000) rate = 0.22;
    if (taxable > 200000) rate = 0.24;
    if (taxable > 400000) rate = 0.32;

    const seTax = Math.round(netBiz * 0.9235 * 0.153);
    const incTax = Math.round(taxable * rate);
    const totalLiab = incTax + seTax;
    const net = withh - totalLiab;

    setCalculatedTotals({
      grossIncome: gross,
      standardDeduction: std,
      netBusinessIncome: netBiz,
      qbiDeduction: qbi,
      taxableIncome: taxable,
      selfEmploymentTax: seTax,
      incomeTax: incTax,
      totalTaxLiability: totalLiab,
      totalPaymentsWithholding: withh,
      netRefundOrBalanceDue: net
    });
  }, [wages, businessIncome1099, k1Distributions, officerCompensation, sec179, standardOrItemized, withholding, filingStatus]);

  // Handle Save Return
  const handleSaveTaxReturn = async (eFileStatusParam: TaxReturnData['eFileStatus'] = 'Draft') => {
    const payload = {
      id: currentReturnId || undefined,
      taxpayerName,
      ssnEin,
      email,
      phone,
      formType,
      taxYear,
      filingStatus,
      state,
      wages: Number(wages) || 0,
      businessIncome1099: Number(businessIncome1099) || 0,
      k1Distributions: Number(k1Distributions) || 0,
      officerCompensation: Number(officerCompensation) || 0,
      standardOrItemizedDeduction: Number(standardOrItemized) || 0,
      section179Depreciation: Number(sec179) || 0,
      totalPaymentsWithholding: Number(withholding) || 0,
      eFileStatus: eFileStatusParam,
      notes
    };

    try {
      const res = await fetch('/api/tax-returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.taxReturn) {
          setCurrentReturnId(data.taxReturn.id);
          setActivePreviewReturn(data.taxReturn);
          await fetchReturns();
        }
      }
    } catch (err) {
      console.error("Save tax return error:", err);
    }
  };

  // E-File Transmission Simulator
  const handleTransmitEFile = async (targetId?: string) => {
    const idToSubmit = targetId || currentReturnId;
    if (!idToSubmit) return;

    setIsTransmitting(true);
    setEFileLog([
      `[${new Date().toLocaleTimeString()}] Initiating Column Tax MeF E-File Gateway connection...`,
      `[${new Date().toLocaleTimeString()}] Authenticating Transmitter Control Code (TCC: 99B214)...`,
      `[${new Date().toLocaleTimeString()}] Running IRS Business Rule Schema Audits on ${formType}...`,
      `[${new Date().toLocaleTimeString()}] Verifying SSN/EIN checksums and PTIN P01507635 authorization...`
    ]);

    setTimeout(async () => {
      try {
        const res = await fetch(`/api/tax-returns/${idToSubmit}/efile`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setEFileLog(prev => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Transmission Successful! IRS Submission ID: ${data.irsSubmissionId}`,
            `[${new Date().toLocaleTimeString()}] IRS MeF Status: ACCEPTED (0000-ACCEPTED)`
          ]);
          await fetchReturns();
        }
      } catch (e) {
        setEFileLog(prev => [...prev, `[ERROR] Transmission timeout or network retry required.`]);
      } finally {
        setIsTransmitting(false);
      }
    }, 1800);
  };

  const handleDeleteReturn = async (id: string) => {
    if (!window.confirm("Delete this tax return record?")) return;
    try {
      await fetch(`/api/tax-returns/${id}`, { method: 'DELETE' });
      await fetchReturns();
    } catch (e) {
      setTaxReturns(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleStartNewReturn = () => {
    setCurrentReturnId('');
    setTaxpayerName('');
    setSsnEin('');
    setEmail('');
    setPhone('');
    setWages('0');
    setBusinessIncome1099('0');
    setK1Distributions('0');
    setOfficerCompensation('0');
    setSec179('0');
    setWithholding('0');
    setNotes('');
    setWizardStep(1);
    setActiveView('prepare_wizard');
  };

  const handleEditReturn = (ret: TaxReturnData) => {
    setCurrentReturnId(ret.id);
    setTaxpayerName(ret.taxpayerName);
    setSsnEin(ret.ssnEin);
    setEmail(ret.email);
    setPhone(ret.phone || '');
    setFormType(ret.formType);
    setTaxYear(ret.taxYear);
    setFilingStatus(ret.filingStatus);
    setState(ret.state);
    setWages(ret.wages.toString());
    setBusinessIncome1099(ret.businessIncome1099.toString());
    setK1Distributions(ret.k1Distributions.toString());
    setOfficerCompensation(ret.officerCompensation.toString());
    setStandardOrItemized(ret.standardOrItemizedDeduction.toString());
    setSec179(ret.section179Depreciation.toString());
    setWithholding(ret.totalPaymentsWithholding.toString());
    setNotes(ret.notes || '');
    setActivePreviewReturn(ret);
    setWizardStep(1);
    setActiveView('prepare_wizard');
  };

  const filteredReturns = taxReturns.filter(r => filterFormType === 'all' || r.formType === filterFormType);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Embedded Tax Preparation Engine</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Column Tax &amp; Aiwyn API Gateway
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              In-App Tax Preparation &amp; E-File Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete simple 1040 individual returns, 1120-S S-Corporation tax returns, and 1065 partnership filings directly inside {businessName}. Powered by IRS MeF compliant calculation &amp; transmission APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('returns_list')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeView === 'returns_list' 
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tax Returns Ledger ({taxReturns.length})</span>
            </button>

            <button
              onClick={handleStartNewReturn}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 shadow-md ${
                activeView === 'prepare_wizard' 
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Prepare New Tax Return</span>
            </button>

            <button
              onClick={() => setActiveView('api_engine')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeView === 'api_engine' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>API Status &amp; E-File Gateway</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: TAX RETURNS LEDGER TABLE */}
      {activeView === 'returns_list' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Active Tax Returns &amp; Filing Repository</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage 2025/2026 client returns, draft calculations, and IRS MeF e-file status.</p>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={filterFormType}
                onChange={(e) => setFilterFormType(e.target.value)}
                className="p-2 text-xs border border-slate-300 rounded-lg text-slate-800 bg-white"
              >
                <option value="all">All Forms (1040, 1120-S, 1065)</option>
                <option value="Form 1040">Form 1040 (Individual)</option>
                <option value="Form 1120-S">Form 1120-S (S-Corp)</option>
                <option value="Form 1065">Form 1065 (Partnership)</option>
              </select>

              <button
                onClick={fetchReturns}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                title="Refresh Returns"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Taxpayer / Entity Name</th>
                    <th className="p-4">Form &amp; Tax Year</th>
                    <th className="p-4">Gross Income</th>
                    <th className="p-4">Tax Liability</th>
                    <th className="p-4">Refund / (Amount Owed)</th>
                    <th className="p-4">IRS MeF Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReturns.length > 0 ? (
                    filteredReturns.map((ret) => (
                      <tr key={ret.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900">
                          <div>{ret.taxpayerName}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">SSN/EIN: ***-**-{ret.ssnEin?.slice(-4) || '9988'}</div>
                        </td>

                        <td className="p-4 font-semibold text-slate-800">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {ret.formType}
                          </span>
                          <span className="ml-1.5 text-slate-500 font-mono">({ret.taxYear})</span>
                        </td>

                        <td className="p-4 font-mono font-bold text-slate-900">
                          ${(ret.wages + ret.businessIncome1099 + ret.k1Distributions + ret.officerCompensation).toLocaleString()}
                        </td>

                        <td className="p-4 font-mono text-slate-800">
                          ${ret.totalTaxLiability.toLocaleString()}
                        </td>

                        <td className="p-4 font-mono font-bold">
                          {ret.netRefundOrBalanceDue >= 0 ? (
                            <span className="text-emerald-600">
                              +${ret.netRefundOrBalanceDue.toLocaleString()} (REFUND)
                            </span>
                          ) : (
                            <span className="text-red-600">
                              -${Math.abs(ret.netRefundOrBalanceDue).toLocaleString()} (OWED)
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          {ret.eFileStatus === 'Accepted by IRS' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1 w-max">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Accepted by IRS</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300 w-max inline-block">
                              {ret.eFileStatus}
                            </span>
                          )}
                          {ret.irsSubmissionId && (
                            <div className="text-[9px] text-slate-400 font-mono mt-0.5">ID: {ret.irsSubmissionId}</div>
                          )}
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditReturn(ret)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold transition"
                          >
                            Open / Edit
                          </button>

                          {ret.eFileStatus !== 'Accepted by IRS' && (
                            <button
                              onClick={() => handleTransmitEFile(ret.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition"
                            >
                              E-File Now
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteReturn(ret.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-400 text-xs">
                        <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-bold text-slate-700">No active tax returns in the system ledger yet</p>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                          Click "Prepare New Tax Return" above to walk through the step-by-step preparation wizard and generate Form 1040 or 1120-S filings.
                        </p>
                        <button
                          onClick={handleStartNewReturn}
                          className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                        >
                          + Prepare First Tax Return
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: STEP-BY-STEP PREPARATION WIZARD */}
      {activeView === 'prepare_wizard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Wizard Form Inputs (Left Column) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-bold">
              <button 
                onClick={() => setWizardStep(1)} 
                className={`flex items-center space-x-1.5 ${wizardStep === 1 ? 'text-emerald-600 font-black' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-center text-[11px] leading-4 flex items-center justify-center">1</span>
                <span>Entity &amp; Info</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />

              <button 
                onClick={() => setWizardStep(2)} 
                className={`flex items-center space-x-1.5 ${wizardStep === 2 ? 'text-emerald-600 font-black' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-center text-[11px] leading-4 flex items-center justify-center">2</span>
                <span>Income &amp; W2/1099</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />

              <button 
                onClick={() => setWizardStep(3)} 
                className={`flex items-center space-x-1.5 ${wizardStep === 3 ? 'text-emerald-600 font-black' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-center text-[11px] leading-4 flex items-center justify-center">3</span>
                <span>Deductions &amp; Sec 179</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />

              <button 
                onClick={() => setWizardStep(4)} 
                className={`flex items-center space-x-1.5 ${wizardStep === 4 ? 'text-emerald-600 font-black' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-center text-[11px] leading-4 flex items-center justify-center">4</span>
                <span>E-File &amp; Transmit</span>
              </button>
            </div>

            {/* STEP 1: ENTITY & TAXPAYER PROFILE */}
            {wizardStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs">Step 1: Taxpayer Profile &amp; Form Selection</h4>
                  <p className="text-[11px] text-slate-500">Configure client name, SSN/EIN, and target IRS return schedule.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Tax Form *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as TaxReturnData['formType'])}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-bold bg-white focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Form 1040">Form 1040 (Individual U.S. Income Tax Return)</option>
                      <option value="Form 1120-S">Form 1120-S (U.S. Income Tax Return for an S Corp)</option>
                      <option value="Form 1065">Form 1065 (U.S. Return of Partnership Income)</option>
                      <option value="Form 1120">Form 1120 (U.S. Corporation Income Tax Return)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tax Year</label>
                    <select
                      value={taxYear}
                      onChange={(e) => setTaxYear(Number(e.target.value))}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono bg-white"
                    >
                      <option value={2025}>2025 Tax Year (Filing in 2026)</option>
                      <option value={2026}>2026 Tax Year (Estimated/Extension)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Taxpayer / Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance or Vance Cloud Inc."
                      value={taxpayerName}
                      onChange={(e) => setTaxpayerName(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">SSN / EIN Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 458-92-1102 or 27-3243694"
                      value={ssnEin}
                      onChange={(e) => setSsnEin(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Filing Status</label>
                    <select
                      value={filingStatus}
                      onChange={(e) => setFilingStatus(e.target.value as any)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 bg-white"
                    >
                      <option value="Single">Single</option>
                      <option value="Married Filing Jointly">Married Filing Jointly</option>
                      <option value="Head of Household">Head of Household</option>
                      <option value="S-Corp">S-Corp Entity</option>
                      <option value="Partnership">Partnership Entity</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Primary State</label>
                    <input
                      type="text"
                      placeholder="TX (No State Income Tax)"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="client@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center space-x-1.5"
                  >
                    <span>Next: Income &amp; W-2 / 1099 Intake</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: INCOME CAPTURE */}
            {wizardStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs">Step 2: Gross Income &amp; Compensation Intake</h4>
                  <p className="text-[11px] text-slate-500">Input reported W-2 wages, 1099-NEC non-employee earnings, and S-Corp K-1 distributions.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Form W-2 Wages / Salary ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={wages}
                      onChange={(e) => setWages(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Form 1099-NEC / Schedule C Gross ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={businessIncome1099}
                      onChange={(e) => setBusinessIncome1099(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">S-Corp Schedule K-1 Distributions ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={k1Distributions}
                      onChange={(e) => setK1Distributions(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Officer Reasonable Salary (W-2) ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={officerCompensation}
                      onChange={(e) => setOfficerCompensation(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-[11px] flex items-center justify-between">
                  <span>Subtotal Gross Income Ingested:</span>
                  <span className="font-mono font-black text-sm text-emerald-700">
                    ${calculatedTotals.grossIncome.toLocaleString()}
                  </span>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center space-x-1.5"
                  >
                    <span>Next: Deductions &amp; Section 179</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DEDUCTIONS & CREDITS */}
            {wizardStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs">Step 3: Deductions, Section 179 &amp; QBI Optimizer</h4>
                  <p className="text-[11px] text-slate-500">Maximize client tax savings using standard/itemized deductions and bonus vehicle depreciation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Standard / Itemized Deduction ($)</label>
                    <input
                      type="number"
                      placeholder="14600"
                      value={standardOrItemized}
                      onChange={(e) => setStandardOrItemized(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">2025 Standard: $14,600 Single / $29,200 MFJ</span>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Section 179 Vehicle / Equipment Deduction ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={sec179}
                      onChange={(e) => setSec179(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Federal Taxes Already Withheld / Estimated ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={withholding}
                      onChange={(e) => setWithholding(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Preparer Notes / Disclosures</label>
                    <input
                      type="text"
                      placeholder="e.g. Verified 1099-NEC & Section 179 vehicle logbook"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      handleSaveTaxReturn('Draft');
                      setWizardStep(4);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center space-x-1.5"
                  >
                    <span>Save Draft &amp; Proceed to E-File</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & TRANSMIT */}
            {wizardStep === 4 && (
              <div className="space-y-4 text-xs">
                <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl border border-emerald-800 space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-extrabold text-sm text-white">Step 4: Tax Return Complete &amp; Ready to Transmit</h4>
                  </div>
                  <p className="text-[11px] text-emerald-300">
                    Form {formType} is calculated and formatted according to IRS MeF schemas. Transmit directly to Column Tax Gateway.
                  </p>
                </div>

                {eFileLog.length > 0 && (
                  <div className="p-3 bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-xl border border-slate-800 space-y-1 max-h-40 overflow-y-auto">
                    <div className="text-slate-400 font-bold border-b border-slate-800 pb-1">IRS MeF Transmission Telemetry Log:</div>
                    {eFileLog.map((logLine, idx) => (
                      <div key={idx}>{logLine}</div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => handleSaveTaxReturn('Draft')}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                  >
                    Save as Draft
                  </button>

                  <button
                    onClick={() => handleTransmitEFile()}
                    disabled={isTransmitting}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg transition shadow-lg flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${isTransmitting ? 'animate-bounce' : ''}`} />
                    <span>{isTransmitting ? 'Transmitting to IRS MeF...' : 'Transmit E-File Return Now'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Real-time Calculation Panel & Form Preview (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-Time Calculation Scorecard */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-extrabold text-sm text-white">Live Form Computation</h3>
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  IRS 2025/2026 BRACKETS
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Reported Income:</span>
                  <span className="font-mono font-bold text-white">${calculatedTotals.grossIncome.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>(-) Standard / Itemized Deduction:</span>
                  <span className="font-mono text-emerald-400">-${calculatedTotals.standardDeduction.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>(-) Sec 179 Depreciation:</span>
                  <span className="font-mono text-emerald-400">-${Number(sec179).toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>(-) QBI Sec 199A Deduction (20%):</span>
                  <span className="font-mono text-emerald-400">-${calculatedTotals.qbiDeduction.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-slate-200">
                  <span>Line 15 Taxable Income:</span>
                  <span className="font-mono text-amber-300">${calculatedTotals.taxableIncome.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Self-Employment Tax (15.3%):</span>
                  <span className="font-mono">${calculatedTotals.selfEmploymentTax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Federal Income Tax:</span>
                  <span className="font-mono">${calculatedTotals.incomeTax.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between font-extrabold text-slate-100">
                  <span>Total Tax Liability:</span>
                  <span className="font-mono text-red-400">${calculatedTotals.totalTaxLiability.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Total Payments / Withholding:</span>
                  <span className="font-mono text-emerald-400">${calculatedTotals.totalPaymentsWithholding.toLocaleString()}</span>
                </div>

                {/* Net Refund or Owed Big Metric */}
                <div className={`p-4 rounded-xl border text-center space-y-1 ${
                  calculatedTotals.netRefundOrBalanceDue >= 0 
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                    : 'bg-red-950/80 border-red-500/50 text-red-200'
                }`}>
                  <div className="text-[10px] font-black uppercase tracking-wider">
                    {calculatedTotals.netRefundOrBalanceDue >= 0 ? '🎉 ESTIMATED REFUND' : '⚠️ BALANCE DUE TO IRS'}
                  </div>
                  <div className="text-2xl font-black font-mono">
                    ${Math.abs(calculatedTotals.netRefundOrBalanceDue).toLocaleString()}
                  </div>
                  <div className="text-[10px] opacity-80">
                    {calculatedTotals.netRefundOrBalanceDue >= 0 ? 'Direct Deposit via Column Tax API' : 'Pay via IRS Direct Pay or installment plan'}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Tax Form Draft Visual Preview */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-800 uppercase flex items-center gap-1">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>{formType} Line-Item Inspector</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Draft Form 1040 (2025)</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-[11px] text-slate-700 space-y-1.5 shadow-inner">
                <div className="flex justify-between">
                  <span>1z. Wages, salaries, tips:</span>
                  <span className="font-bold">${Number(wages).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>8. Schedule 1 Business Income:</span>
                  <span>${Number(businessIncome1099).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1 font-bold">
                  <span>9. Total Income (AGI):</span>
                  <span>${calculatedTotals.grossIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>12. Standard Deduction:</span>
                  <span>-${calculatedTotals.standardDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-700 border-t border-slate-100 pt-1">
                  <span>24. Total Tax:</span>
                  <span>${calculatedTotals.totalTaxLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>33. Total Payments &amp; Credits:</span>
                  <span>${calculatedTotals.totalPaymentsWithholding.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 3: API ENGINE & PARTNER STATUS */}
      {activeView === 'api_engine' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Embedded Tax Architecture
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">Column Tax &amp; Aiwyn API Integration Engine</h3>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>IRS MeF Gateway Online (99.99%)</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900 text-xs">Co-Branded White-Label API</div>
                <p className="text-slate-600 text-[11px]">
                  Filing experience is embedded directly within {businessName}. No third-party redirects or separate portal logins.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900 text-xs">Pre-Filled Financial Data</div>
                <p className="text-slate-600 text-[11px]">
                  Invoices, Stripe payments, and past client intake records automatically populate Form 1040 and 1120-S fields.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900 text-xs">Per-Return Monetization</div>
                <p className="text-slate-600 text-[11px]">
                  Capture $150 to $650 per return filed or bundle into your $2,500/mo Fractional CFO Retainers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
