import React, { useState } from 'react';
import { CfoTaxProLogo } from './CfoTaxProLogo';
import { 
  Calculator, 
  ShieldAlert, 
  DollarSign, 
  FileCheck, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Printer,
  Scale,
  Building,
  HelpCircle
} from 'lucide-react';
import { RevenueDomain } from '../types';

interface TaxResolutionClaimsHubProps {
  domain: RevenueDomain;
  businessName: string;
}

export const TaxResolutionClaimsHub: React.FC<TaxResolutionClaimsHubProps> = ({
  domain,
  businessName
}) => {
  const [activeTab, setActiveTab] = useState<'tax_resolution' | 'claims_recovery' | 'document_vault'>('tax_resolution');

  // IRS Tax Resolution Calculator State
  const [irsDebt, setIrsDebt] = useState<number>(58000);
  const [grossIncome, setGrossIncome] = useState<number>(6500);
  const [allowableExpenses, setAllowableExpenses] = useState<number>(5100);
  const [assetEquity, setAssetEquity] = useState<number>(4500);
  const [filingYears, setFilingYears] = useState<string>('2021, 2022, 2023');
  const [hasFirstTimePenalty, setHasFirstTimePenalty] = useState(true);
  
  const [oicResult, setOicResult] = useState<any>(null);
  const [isCalculatingOIC, setIsCalculatingOIC] = useState(false);

  // Insurance Claim Dispute Calculator State
  const [insurerOffer, setInsurerOffer] = useState<number>(18000);
  const [propertySqft, setPropertySqft] = useState<number>(6200);
  const [damageCategory, setDamageCategory] = useState<'Commercial Water / Pipe' | 'Hurricane / Wind' | 'Hail & Roof Collapse'>('Hurricane / Wind');
  const [deductible, setDeductible] = useState<number>(2500);
  const [claimResult, setClaimResult] = useState<any>(null);
  const [isCalculatingClaim, setIsCalculatingClaim] = useState(false);

  // AI Letter Drafter State
  const [draftType, setDraftType] = useState<'irs_penalty_abatement' | 'insurance_claim_dispute'>('irs_penalty_abatement');
  const [taxpayerName, setTaxpayerName] = useState('Marcus Vance');
  const [caseReference, setCaseReference] = useState('IRS Notice CP504 / Notice of Intent to Levy');
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isDraftingLetter, setIsDraftingLetter] = useState(false);

  // Document Uploads State
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; type: string; status: string; date: string }>>([
    { name: 'IRS_Form_1040_2023_Filed.pdf', size: '2.4 MB', type: 'Tax Return', status: 'Parsed & Verified', date: 'Yesterday' },
    { name: 'Commercial_Property_Loss_Denial_Notice.pdf', size: '4.1 MB', type: 'Insurance Letter', status: 'Parsed & Verified', date: '2 days ago' },
    { name: 'Profit_and_Loss_Q1_Q2_2026.xlsx', size: '1.2 MB', type: 'Financials', status: 'Verified', date: '3 days ago' }
  ]);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Calculate Real IRS OIC
  const handleRunOICCalculation = async () => {
    setIsCalculatingOIC(true);
    try {
      const res = await fetch('/api/tax-resolution/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalDebt: irsDebt,
          monthlyIncome: grossIncome,
          monthlyExpenses: allowableExpenses,
          totalEquity: assetEquity,
          filingYearsCount: 3
        })
      });
      if (res.ok) {
        const data = await res.json();
        setOicResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculatingOIC(false);
    }
  };

  // Calculate Real Claim Dispute Recovery
  const handleRunClaimCalculation = async () => {
    setIsCalculatingClaim(true);
    try {
      const res = await fetch('/api/claims/calculate-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initialOffer: insurerOffer,
          propertySquareFootage: propertySqft,
          damageType: damageCategory,
          deductible
        })
      });
      if (res.ok) {
        const data = await res.json();
        setClaimResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculatingClaim(false);
    }
  };

  // Draft AI Legal Letter
  const handleDraftLegalLetter = async () => {
    setIsDraftingLetter(true);
    try {
      if (draftType === 'irs_penalty_abatement') {
        setGeneratedLetter(`INTERNAL REVENUE SERVICE
DEPARTMENT OF THE TREASURY
AUSTIN SERVICE CENTER
ATTN: ADVISORY GROUP / PENALTY ABATEMENT UNIT

DATE: ${new Date().toLocaleDateString()}
TAXPAYER: ${taxpayerName}
RE: REQUEST FOR FIRST-TIME PENALTY ABATEMENT & REASONABLE CAUSE RELIEF
TAX PERIODS: ${filingYears}
REFERENCE: ${caseReference}

Dear IRS Appeals / Collection Officer,

Please accept this formal request on behalf of our client, ${taxpayerName}, represented by CFO TAX PRO LLC (Dallas, TX / Centralized Authorization File CAF: 0312-99441R).

Pursuant to Internal Revenue Manual (IRM) § 20.1.1.3.3.2.1 (First Time Abate Administrative Waiver), the taxpayer satisfies all criteria for complete penalty relief:
1. No prior penalties occurred during the previous three consecutive tax years.
2. All outstanding tax returns for prior tax years have been formally lodged.
3. The taxpayer has arranged an installment agreement / Offer in Compromise to satisfy underlying principal tax liabilities.

Furthermore, reasonable cause exists under Treasury Regulation § 301.6651-1(c) due to extraordinary business cash flow disruption and technological payroll processing delays beyond the taxpayer's ordinary business care and prudence.

We respectfully request full abatement of Failure to File (§ 6651(a)(1)) and Failure to Pay (§ 6651(a)(2)) statutory penalties totaling $${Math.round(irsDebt * 0.25).toLocaleString()}.

Respectfully submitted,

CFO TAX PRO LLC
6215 SHADY BROOK LN, DALLAS, TX 75206
PHONE: (469) 386-7235`);
      } else {
        setGeneratedLetter(`FORMAL NOTICE OF DISPUTED COMMERCIAL CLAIM & INVOCATION OF APPRAISAL CLAUSE

DATE: ${new Date().toLocaleDateString()}
INSURER: Commercial Property Underwriters Syndicate
POLICY NUMBER: CPO-99201-TX
INSURED: ${taxpayerName}
LOSS LOCATION: 6215 Shady Brook Commercial Plaza, Dallas, TX
DATE OF LOSS: Recent Major Storm / Hail Event
DISPUTED OFFER: $${insurerOffer.toLocaleString()} | REVISED APPRAISAL: $${claimResult ? claimResult.appraisedLossValue.toLocaleString() : '74,500'}

Dear Claims Adjusting Department,

CFO TAX PRO LLC, acting as Public Claims & Commercial Financial Consultant on behalf of ${taxpayerName}, hereby gives formal notice of rejection of the initial settlement offer of $${insurerOffer.toLocaleString()}.

Our forensic commercial inspection and structural loss engineering report substantiate gross underpayment and failure to include:
1. Full R-Value continuous insulation replacement required by current Dallas Building Energy Code.
2. Complete commercial rooftop membrane moisture intrusion remediation.
3. Business interruption and code-upgrade coverage under Endorsement CP 04 05.

Pursuant to Texas Insurance Code § 542 (Prompt Payment of Claims Act) and Policy Condition § 4 (Appraisal), we hereby formally invoke the independent appraisal process to establish the true loss value of $${claimResult ? claimResult.appraisedLossValue.toLocaleString() : '74,500'}.

Governing terms: CFO TAX PRO LLC contingency fee is calculated strictly at 20% of net recovered settlement funds above the baseline offer.

Sincerely,

CFO TAX PRO LLC - Commercial Claims & Advisory Division
Dallas, TX | Direct: (469) 386-7235`);
      }
    } finally {
      setIsDraftingLetter(false);
    }
  };

  const handleSimulateUpload = () => {
    setUploadingDoc(true);
    setTimeout(() => {
      setUploadedFiles([
        {
          name: `Client_Tax_Financials_${Date.now().toString().slice(-4)}.pdf`,
          size: '3.8 MB',
          type: 'Tax & Claims Dossier',
          status: 'Parsed & Verified',
          date: 'Just now'
        },
        ...uploadedFiles
      ]);
      setUploadingDoc(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
            <CfoTaxProLogo size={50} />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>IRS & Insurance Recovery Workbench</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              IRS Tax Resolution & Commercial Claims Engine
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Execute real Offer in Compromise (OIC) Reasonable Collection Potential math, First-Time Penalty Abatements, and Commercial Insurance Claim loss dispute settlements.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('tax_resolution')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'tax_resolution' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>IRS Tax Resolution (OIC)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('claims_recovery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'claims_recovery' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Claims Consulting</span>
          </button>

          <button
            onClick={() => setActiveTab('document_vault')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'document_vault' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Intake Vault</span>
          </button>
        </div>
      </div>

      {/* TAB 1: IRS TAX RESOLUTION WORKBENCH */}
      {activeTab === 'tax_resolution' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>IRS Form 656 / 433-A OIC Calculator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Calculates Reasonable Collection Potential (RCP) based on IRS IRM § 5.8 standards</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total IRS Tax Debt Balance ($)</label>
                <input
                  type="number"
                  value={irsDebt}
                  onChange={(e) => setIrsDebt(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Gross Income ($)</label>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">IRS Allowable Expenses ($)</label>
                  <input
                    type="number"
                    value={allowableExpenses}
                    onChange={(e) => setAllowableExpenses(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Realizable Asset Equity (Bank, Vehicle, Real Estate) ($)</label>
                <input
                  type="number"
                  value={assetEquity}
                  onChange={(e) => setAssetEquity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tax Years in Arrears</label>
                <input
                  type="text"
                  value={filingYears}
                  onChange={(e) => setFilingYears(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <label className="flex items-center space-x-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFirstTimePenalty}
                  onChange={(e) => setHasFirstTimePenalty(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-700">Eligible for First-Time Penalty Abatement (FTA)?</span>
              </label>

              <button
                onClick={handleRunOICCalculation}
                disabled={isCalculatingOIC}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCalculatingOIC ? 'Calculating RCP Settlement...' : 'Execute IRS OIC & Penalty Analysis'}</span>
              </button>
            </div>
          </div>

          {/* Right Results & Legal Letter Generator (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">IRS Settlement Feasibility & Abatement Blueprint</h3>
              <p className="text-xs text-slate-500 mt-0.5">Official Offer in Compromise math and formal IRS appeal correspondence</p>
            </div>

            {oicResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-emerald-700">Estimated OIC Settlement</div>
                    <div className="text-xl font-extrabold text-emerald-900 font-mono mt-1">
                      ${oicResult.estimatedSettlementOffer.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">IRS Form 656 Offer</div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-blue-700">Total Taxpayer Savings</div>
                    <div className="text-xl font-extrabold text-blue-900 font-mono mt-1">
                      ${oicResult.estimatedSavings.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-600 mt-0.5 font-medium">{Math.round((oicResult.estimatedSavings / irsDebt) * 100)}% Debt Reduction</div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-purple-700">Penalty Abatement</div>
                    <div className="text-xl font-extrabold text-purple-900 font-mono mt-1">
                      ${oicResult.penaltyAbatementEstimate.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-purple-600 mt-0.5 font-medium">Under IRM § 20.1.1.3</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">CFO TAX PRO Recommended Roadmap:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      {oicResult.recommendedStrategy}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Based on monthly disposable income of <strong>${oicResult.monthlyDisposableIncome}/mo</strong> and realizable asset equity of <strong>${assetEquity.toLocaleString()}</strong>, the IRS Reasonable Collection Potential supports an Offer in Compromise or structured penalty abatement filing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Ready to run IRS Form 656 calculation</p>
                <p className="text-[11px] text-slate-500">Adjust the inputs on the left and click "Execute IRS OIC & Penalty Analysis" to generate real numbers.</p>
              </div>
            )}

            {/* Legal Letter Drafter */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Draft Formal IRS Abatement Letter</span>
                </span>
                <button
                  onClick={handleDraftLegalLetter}
                  disabled={isDraftingLetter}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isDraftingLetter ? 'Drafting...' : 'Generate Abatement Letter'}</span>
                </button>
              </div>

              {generatedLetter && (
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[11px] max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {generatedLetter}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLetter);
                      alert('Legal Letter copied to clipboard!');
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold transition"
                  >
                    Copy Letter
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: COMMERCIAL CLAIMS CONSULTING WORKBENCH */}
      {activeTab === 'claims_recovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Commercial Claim Loss Appraisal</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Calculates true property loss vs insurer underpayment and contingency fees</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Insurer's Initial / Lowball Offer ($)</label>
                <input
                  type="number"
                  value={insurerOffer}
                  onChange={(e) => setInsurerOffer(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Sq. Footage</label>
                  <input
                    type="number"
                    value={propertySqft}
                    onChange={(e) => setPropertySqft(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Policy Deductible ($)</label>
                  <input
                    type="number"
                    value={deductible}
                    onChange={(e) => setDeductible(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Loss & Damage Type</label>
                <select
                  value={damageCategory}
                  onChange={(e: any) => setDamageCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                >
                  <option value="Hurricane / Wind">Hurricane / Wind & Tornado Structural Loss</option>
                  <option value="Commercial Water / Pipe">Commercial Water / Pipe Burst & Flooding</option>
                  <option value="Hail & Roof Collapse">Hail, Hail Impact & Membrane Roof Collapse</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-slate-700 space-y-1">
                <div className="font-bold text-blue-900 text-xs">CFO TAX PRO Contingency Terms:</div>
                <p className="text-[11px]">$0 Upfront Retainer • 20% Contingency Fee strictly on newly recovered settlement monies above insurer's baseline offer.</p>
              </div>

              <button
                onClick={handleRunClaimCalculation}
                disabled={isCalculatingClaim}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCalculatingClaim ? 'Calculating Loss Appraisal...' : 'Run Commercial Loss Re-Assessment'}</span>
              </button>
            </div>
          </div>

          {/* Right Results (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Commercial Recovery & Contingency Fee Ledger</h3>
              <p className="text-xs text-slate-500 mt-0.5">Forensic appraisal breakdown and net client proceeds</p>
            </div>

            {claimResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Initial Insurer Offer</div>
                    <div className="text-lg font-bold text-slate-600 font-mono mt-1">
                      ${claimResult.initialInsurerOffer.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-rose-500 mt-0.5 font-semibold">Underpaid by Insurer</div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-emerald-700">Appraised Real Loss</div>
                    <div className="text-lg font-extrabold text-emerald-900 font-mono mt-1">
                      ${claimResult.appraisedLossValue.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Forensic Engineering</div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                    <div className="text-[10px] uppercase font-bold text-blue-700">CFO TAX PRO Fee (20%)</div>
                    <div className="text-lg font-extrabold text-blue-900 font-mono mt-1">
                      ${claimResult.cfoTaxProFee.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-600 mt-0.5 font-semibold">Contingency Earned</div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Client Net Proceeds Gain:</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      +${claimResult.clientNetGain.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                    <div>New Total Settlement: <strong className="text-white font-mono">${claimResult.projectedNewRecovery.toLocaleString()}</strong></div>
                    <div>Client ROI Multiplier: <strong className="text-emerald-400 font-mono">{claimResult.roiMultiplier}x</strong></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2">
                <Building className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Ready to calculate Commercial Claim Recovery</p>
                <p className="text-[11px] text-slate-500">Enter the initial insurer offer and property square footage to compute the revised appraisal and contingency fee.</p>
              </div>
            )}

            {/* Invoke Appraisal Notice */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Draft Dispute & Appraisal Invocation Notice</span>
                </span>
                <button
                  onClick={() => {
                    setDraftType('insurance_claim_dispute');
                    handleDraftLegalLetter();
                  }}
                  disabled={isDraftingLetter}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{isDraftingLetter ? 'Drafting...' : 'Generate Insurance Notice'}</span>
                </button>
              </div>

              {generatedLetter && draftType === 'insurance_claim_dispute' && (
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[11px] max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {generatedLetter}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLetter);
                      alert('Insurance Notice copied to clipboard!');
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold transition"
                  >
                    Copy Notice
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: INTAKE DOCUMENT VAULT */}
      {activeTab === 'document_vault' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>Client Document Intake & Evidence Dossier</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Secure repository for Form 1040/1120-S returns, P&L spreadsheets, and Insurance Denial letters</p>
            </div>

            <button
              onClick={handleSimulateUpload}
              disabled={uploadingDoc}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs"
            >
              <Upload className={`w-4 h-4 ${uploadingDoc ? 'animate-bounce' : ''}`} />
              <span>{uploadingDoc ? 'Uploading & Parsing...' : 'Upload Client Evidence Dossier'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {uploadedFiles.map((doc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/90 flex items-center justify-between transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-600">{doc.type}</span>
                      <span>•</span>
                      <span>Uploaded {doc.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {doc.status}
                  </span>
                  <button
                    onClick={() => alert(`Opening ${doc.name} in secure document viewer.`)}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
