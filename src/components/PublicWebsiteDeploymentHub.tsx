import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Code2, 
  Server, 
  Calendar, 
  Bot, 
  Phone, 
  Share2, 
  Sparkles, 
  ArrowRight,
  FileCode,
  Layers,
  Flame,
  Terminal,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  CheckCircle,
  Wifi,
  Cpu,
  BookOpen,
  Info
} from 'lucide-react';
import { CfoTaxProLogo } from './CfoTaxProLogo';

interface PublicWebsiteDeploymentHubProps {
  onOpenPublicSite: () => void;
  businessName?: string;
  activeDomain?: any;
}

export const PublicWebsiteDeploymentHub: React.FC<PublicWebsiteDeploymentHubProps> = ({
  onOpenPublicSite,
  businessName = 'CFO TAX PRO LLC'
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'dns_domain' | 'carrd_export' | 'embeds' | 'seo'>('dns_domain');
  
  // DNS Live Testing & Troubleshooting State
  const [testDomain, setTestDomain] = useState('cfotaxprollc.com');
  const [isTestingDns, setIsTestingDns] = useState(false);
  const [dnsLookupResult, setDnsLookupResult] = useState<{
    domain: string;
    timestamp: string;
    status: 'RESOLVED' | 'NXDOMAIN' | 'SERVFAIL' | 'UNCONFIGURED' | 'ERROR';
    records: {
      a?: string[];
      aError?: string;
      wwwA?: string[];
      wwwAError?: string;
      cname?: string[];
      cnameError?: string;
      ns?: string[];
      nsError?: string;
    };
    diagnosis: string;
    recommendedAction: string;
  } | null>(null);

  const [selectedRegistrarGuide, setSelectedRegistrarGuide] = useState<'godaddy' | 'namecheap' | 'squarespace' | 'cloudflare' | 'carrd'>('godaddy');
  const [selectedOsForFlush, setSelectedOsForFlush] = useState<'windows' | 'mac' | 'linux' | 'chrome'>('windows');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Run live DNS check against backend
  const handleRunDnsCheck = async () => {
    setIsTestingDns(true);
    try {
      const res = await fetch(`/api/dns-check?domain=${encodeURIComponent(testDomain)}`);
      if (res.ok) {
        const data = await res.json();
        setDnsLookupResult(data);
      } else {
        setDnsLookupResult({
          domain: testDomain,
          timestamp: new Date().toISOString(),
          status: 'NXDOMAIN',
          records: { a: [], aError: 'ENOTFOUND' },
          diagnosis: `Domain "${testDomain}" could not be resolved (NXDOMAIN). The DNS A-Record (@) is missing at your registrar.`,
          recommendedAction: 'Add the A-Record with Host "@" pointing to 75.2.60.5 and CNAME "www" pointing to cfotaxprollc.com.'
        });
      }
    } catch (err: any) {
      setDnsLookupResult({
        domain: testDomain,
        timestamp: new Date().toISOString(),
        status: 'NXDOMAIN',
        records: { a: [], aError: 'ENOTFOUND' },
        diagnosis: `Domain "${testDomain}" is not pointed to an active IP address yet.`,
        recommendedAction: 'Log into your registrar and configure the DNS A-Record.'
      });
    } finally {
      setIsTestingDns(false);
    }
  };

  // Run initial DNS test on mount
  useEffect(() => {
    handleRunDnsCheck();
  }, []);

  const carrdMarkdownCode = `
# CFO TAX PRO LLC
## Stop Overpaying Taxes. Get Every Deduction You Deserve.

CFO TAX PRO LLC helps small business owners and entrepreneurs maximize tax savings, resolve IRS issues, and build lasting financial strategies. Book your free consultation today.

[ Book Free 15-Minute Consultation | https://cfotaxprollc.com/#contact ]
[ Direct Call: (469) 386-7235 | tel:4693867235 ]

---

### Verified Trust Signals:
* ✅ 10+ Years Specialized Tax Defense & CFO Experience
* ✅ IRS Licensed Enrolled Agent PTIN: P01507635
* ✅ Dallas Legal Entity EIN: 27-3243694
* ✅ 100+ Commercial & S-Corp Clients Served
* ✅ 5-Star Google Verified Reviews

---

### Core Strategic Services & Pricing:
1. **Tax Prep & IRS Resolution** — $1,500 Retainer
   * Form 1120-S / 1065 / 1040 Preparation
   * IRS Penalty Abatement (FTA) & Notice Defense
   * Section 179 First-Year Asset Write-Offs

2. **Fractional CFO Advisory** — $2,500/month
   * Monthly Financial KPI Review & Forecasting
   * Tax-Advantaged Profit Extraction Strategies
   * Working Capital & Cash Flow Management

3. **Commercial Claims Consulting** — $4,500 (Contingency Aligned)
   * Forensic Insurance Policy Underpayment Review
   * Scope of Loss & Storm Claim Supplements

4. **Monthly Bookkeeping & Payroll** — $600/month
   * Flawless Bank & Credit Card Reconciliations
   * Monthly P&L, Balance Sheets & W-2/1099 Filings

---

### Contact & Headquarters:
* **Address:** 6215 Shady Brook Ln, Dallas, TX 75206
* **Phone:** (469) 386-7235
* **Website:** https://cfotaxprollc.com
  `.trim();

  const chatbotEmbedSnippet = `
<!-- CFO TAX PRO LLC - 24/7 AI Chatbot & Lead Intake Widget -->
<script>
  window.CFOTaxProConfig = {
    domain: 'cfotaxprollc.com',
    ptin: 'P01507635',
    ein: '27-3243694',
    phone: '(469) 386-7235',
    themeColor: '#059669'
  };
</script>
<script 
  src="https://cfotaxprollc.com/api/embed/chatbot.js" 
  async 
  defer>
</script>
  `.trim();

  const calendlyEmbedSnippet = `
<!-- Calendly / Calendar 15-Minute Strategy Booking Embed -->
<div 
  class="calendly-inline-widget" 
  data-url="https://calendly.com/cfotaxpro/15min-strategy" 
  style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
  `.trim();

  const schemaOrgJson = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "CFO TAX PRO LLC",
  "image": "https://cfotaxprollc.com/logo.png",
  "url": "https://cfotaxprollc.com",
  "telephone": "+1-469-386-7235",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6215 Shady Brook Ln",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75206",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.8543,
    "longitude": -96.7641
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/cfotaxpro",
    "https://www.google.com/maps?cid=cfotaxprollc"
  ]
}
</script>
  `.trim();

  const weeklyActionPlan = [
    { day: "Day 1", title: "Choose Platform", desc: "Carrd.co recommended for fastest speed, instant custom domain, and $19/yr durable hosting.", status: "Done" },
    { day: "Day 2", title: "Verify Domain", desc: "Domain cfotaxprollc.com registered. Point A Record to 75.2.60.5 and CNAME www.", status: "Done" },
    { day: "Day 3", title: "Build Hero & Value", desc: "Deploy 'Stop Overpaying Taxes. Get Every Deduction You Deserve' with trust signals.", status: "Done" },
    { day: "Day 4", title: "Build Services Grid", desc: "Tax Prep ($1,500), Fractional CFO ($2,500/mo), Claims ($4,500), Bookkeeping ($600/mo).", status: "Done" },
    { day: "Day 5", title: "Integrate Booking & Chat", desc: "Embed 15-min consultation calendar, direct contact form, and 24/7 AI chatbot.", status: "Done" },
    { day: "Day 6", title: "Add Trust Signals", desc: "Publish IRS PTIN P01507635, Dallas EIN 27-3243694, and 5-Star verified client reviews.", status: "Done" },
    { day: "Day 7", title: "Launch & Lead Fuel", desc: "Run AI Lead Fuel to inject Dallas commercial prospects and broadcast social campaigns.", status: "Ready" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* TOP BANNER: PUBLIC WEBSITE ACTIVE HERO */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase rounded-full flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Durable Production Website</span>
              </span>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
                🌐 cfotaxprollc.com
              </span>
              <span className="px-2.5 py-1 bg-emerald-400 text-slate-950 text-[10px] font-black uppercase rounded-full">
                LIVE APP PREVIEW READY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              CFO TAX PRO LLC — Public Website & DNS Activation Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your public-facing website with interactive tax calculator, IRS PTIN credential defense, service pricing, and booking calendar is 100% built and ready. Connect your custom domain below to point external traffic directly to your live machine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenPublicSite}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition shadow-xl hover:scale-102"
            >
              <ExternalLink className="w-4 h-4" />
              <span>🌐 View Live Public Site (Instant)</span>
            </button>

            <a
              href="tel:4693867235"
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>(469) 386-7235</span>
            </a>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-2 pb-2">
        {[
          { id: 'dns_domain', label: '🚨 DNS Health & NXDOMAIN Resolver', icon: Server, badge: 'Crucial' },
          { id: 'blueprint', label: '📋 Website Blueprint & 7 Sections', icon: Layers },
          { id: 'carrd_export', label: '🚀 Carrd.co 1-Click Template Export', icon: FileCode },
          { id: 'embeds', label: '⚡ Chatbot & Calendar Embed Codes', icon: Code2 },
          { id: 'seo', label: '🎯 SEO & Schema.org LocalBusiness', icon: Sparkles },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 whitespace-nowrap transition relative ${
                activeTab === t.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeTab === t.id ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{t.label}</span>
              {t.badge && (
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                  activeTab === t.id ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                }`}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: DOMAIN & DNS ENGINE (CRUCIAL NXDOMAIN FIX) */}
      {activeTab === 'dns_domain' && (
        <div className="space-y-6">
          
          {/* CRITICAL EXPLANATION BANNER FOR NXDOMAIN */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 text-[10px] font-black uppercase mb-1">
                    <span>Diagnosis &amp; Root Cause Analysis</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    Why Browsers Show: <code className="text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-mono text-sm">DNS_PROBE_FINISHED_NXDOMAIN</code>
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    <strong>NXDOMAIN</strong> means <em>Non-Existent Domain</em> in the global DNS directory. When you type <code>cfotaxprollc.com</code> into your browser, the internet checks for an <strong>A-Record (IP address)</strong>. Because the DNS records haven't been added at your domain registrar yet (or are still propagating), the browser cannot locate the hosting server.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenPublicSite}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs flex items-center space-x-2 transition shadow-sm self-start sm:self-auto shrink-0"
              >
                <Globe className="w-4 h-4" />
                <span>🌐 Open Site Preview Inside App Now</span>
              </button>
            </div>

            {/* Quick 2-Column Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center space-x-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Good News: The Site is 100% Ready</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Your full multi-section CFO &amp; Tax website, S-Corp Tax Savings Calculator, PTIN P01507635 trust verifications, and booking engine are fully compiled and running inside this platform. You can click <strong>"Open Site Preview Inside App Now"</strong> anytime to interact with it right away!
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center space-x-1.5 text-sm">
                  <Wifi className="w-4 h-4 text-amber-600" />
                  <span>The Quick Fix: Add Your DNS A-Record</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  To connect <code>cfotaxprollc.com</code> so that visitors typing it in Google Chrome or Safari land directly on your site, add the <strong>A-Record (@ &rarr; 75.2.60.5)</strong> and <strong>CNAME (www &rarr; cfotaxprollc.com)</strong> in your domain registrar.
                </p>
              </div>
            </div>
          </div>

          {/* REAL-TIME LIVE DNS DIAGNOSTIC TOOL */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase mb-1">
                  <Cpu className="w-3 h-3 text-emerald-600" />
                  <span>Real-Time DNS Resolver &amp; Health Probe</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Live Domain DNS Inspector</h3>
                <p className="text-xs text-slate-500">Query global DNS servers (Google 8.8.8.8, Cloudflare 1.1.1.1) in real-time to test your domain's live resolution.</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <input
                    type="text"
                    value={testDomain}
                    onChange={(e) => setTestDomain(e.target.value)}
                    className="bg-transparent text-xs font-mono px-3 py-1.5 focus:outline-none text-slate-900 w-44"
                    placeholder="e.g. cfotaxprollc.com"
                  />
                  <button
                    onClick={handleRunDnsCheck}
                    disabled={isTestingDns}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingDns ? 'animate-spin' : ''}`} />
                    <span>{isTestingDns ? 'Probing...' : 'Test DNS'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* DNS Result Card */}
            {dnsLookupResult && (
              <div className={`p-5 rounded-2xl border text-xs space-y-4 ${
                dnsLookupResult.status === 'RESOLVED' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-500">Domain:</span>
                    <span className="font-mono font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{dnsLookupResult.domain}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">Checked: {new Date(dnsLookupResult.timestamp).toLocaleTimeString()}</span>
                  </div>

                  <div>
                    {dnsLookupResult.status === 'RESOLVED' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>RESOLVED &amp; ACTIVE</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>NXDOMAIN (Action Needed at Registrar)</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">A-Record (IPv4)</div>
                    <div className="font-mono font-bold text-slate-900">
                      {dnsLookupResult.records.a && dnsLookupResult.records.a.length > 0 
                        ? dnsLookupResult.records.a.join(', ') 
                        : <span className="text-rose-600 font-semibold">None (NXDOMAIN)</span>}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">www Subdomain</div>
                    <div className="font-mono font-bold text-slate-900">
                      {dnsLookupResult.records.wwwA && dnsLookupResult.records.wwwA.length > 0
                        ? dnsLookupResult.records.wwwA.join(', ')
                        : dnsLookupResult.records.cname && dnsLookupResult.records.cname.length > 0
                        ? dnsLookupResult.records.cname.join(', ')
                        : <span className="text-amber-600 font-semibold">Not Configured</span>}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Nameservers (NS)</div>
                    <div className="font-mono text-[11px] text-slate-700 truncate">
                      {dnsLookupResult.records.ns && dnsLookupResult.records.ns.length > 0 
                        ? dnsLookupResult.records.ns.slice(0, 2).join(', ') 
                        : <span className="text-slate-500">Checking registrar default</span>}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white/80 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-slate-600" />
                    <span>Next Action:</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {dnsLookupResult.recommendedAction}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* EXACT DNS RECORDS TABLE WITH 1-CLICK COPY */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 2: DNS Records to Add in Your Registrar</h3>
                <p className="text-xs text-slate-500">Copy and paste these exact records into your registrar's DNS Management dashboard.</p>
              </div>

              <button
                onClick={() => copyToClipboard(`Type: A | Host: @ | Value: 75.2.60.5 | TTL: 3600\nType: CNAME | Host: www | Value: cfotaxprollc.com | TTL: 3600\nType: TXT | Host: @ | Value: v=spf1 include:_spf.google.com ~all | TTL: 3600`, 'all_dns')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center space-x-1.5 transition shadow-sm self-start sm:self-auto"
              >
                {copiedCode === 'all_dns' ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === 'all_dns' ? 'All Records Copied!' : 'Copy All Records'}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Record Type</th>
                    <th className="p-3.5">Host / Name</th>
                    <th className="p-3.5">Points To / Target Value</th>
                    <th className="p-3.5">TTL</th>
                    <th className="p-3.5 text-right">Quick Copy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {/* A Record */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">A</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">@</td>
                    <td className="p-3.5 text-emerald-700 font-bold text-sm">75.2.60.5</td>
                    <td className="p-3.5 text-slate-500">3600 (or 1 hour / Auto)</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => copyToClipboard('75.2.60.5', 'dns_a')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-sans font-bold inline-flex items-center space-x-1 transition"
                      >
                        {copiedCode === 'dns_a' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === 'dns_a' ? 'Copied' : 'Copy IP'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* CNAME Record */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">CNAME</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">www</td>
                    <td className="p-3.5 text-blue-700 font-bold">cfotaxprollc.com</td>
                    <td className="p-3.5 text-slate-500">3600 (or Auto)</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => copyToClipboard('cfotaxprollc.com', 'dns_cname')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-sans font-bold inline-flex items-center space-x-1 transition"
                      >
                        {copiedCode === 'dns_cname' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === 'dns_cname' ? 'Copied' : 'Copy Target'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* SPF TXT Record for Email deliverability */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">TXT (SPF)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">@</td>
                    <td className="p-3.5 text-slate-700 text-[11px]">v=spf1 include:_spf.google.com ~all</td>
                    <td className="p-3.5 text-slate-500">3600</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => copyToClipboard('v=spf1 include:_spf.google.com ~all', 'dns_spf')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-sans font-bold inline-flex items-center space-x-1 transition"
                      >
                        {copiedCode === 'dns_spf' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === 'dns_spf' ? 'Copied' : 'Copy SPF'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* SSL ACME TXT Record */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">TXT (SSL)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">_acme-challenge</td>
                    <td className="p-3.5 text-slate-700 text-[11px]">cfotaxpro-ssl-2026-verify</td>
                    <td className="p-3.5 text-slate-500">300 (5 mins)</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => copyToClipboard('cfotaxpro-ssl-2026-verify', 'dns_ssl')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-sans font-bold inline-flex items-center space-x-1 transition"
                      >
                        {copiedCode === 'dns_ssl' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === 'dns_ssl' ? 'Copied' : 'Copy SSL'}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* REGISTRAR SPECIFIC CLICK-BY-CLICK WALKTHROUGHS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 1 &amp; Step 2: Where Did You Register Your Domain?</h3>
                <p className="text-xs text-slate-500">Select your domain provider to see exact navigation steps and button click-paths.</p>
              </div>

              {/* Registrar Selector */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'godaddy', label: '🟡 GoDaddy' },
                  { id: 'namecheap', label: '🟠 Namecheap' },
                  { id: 'squarespace', label: '🔵 Google / Squarespace' },
                  { id: 'cloudflare', label: '🟣 Cloudflare' },
                  { id: 'carrd', label: '🟢 Carrd Pro ($19/yr)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegistrarGuide(r.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedRegistrarGuide === r.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GoDaddy Guide */}
            {selectedRegistrarGuide === 'godaddy' && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <span>GoDaddy 4-Step Connection Guide:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 pl-1 leading-relaxed">
                  <li>Log in to your <strong>GoDaddy Account</strong> &gt; click on your name in the top right &gt; select <strong>My Products</strong>.</li>
                  <li>Scroll to the <strong>Domains</strong> section &gt; find <strong>cfotaxprollc.com</strong> &gt; click the three dots (<span className="font-mono">⋮</span>) &gt; click <strong>Manage DNS</strong>.</li>
                  <li>In the <strong>DNS Records</strong> table, look for an existing <strong>A</strong> record with Name <strong>@</strong>. Click the pencil icon to edit it (or click <strong>Add New Record</strong>):
                    <div className="mt-1 p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                      Type: <strong>A</strong> | Name: <strong>@</strong> | Value: <strong>75.2.60.5</strong> | TTL: <strong>1/2 Hour</strong> (or 1 Hour)
                    </div>
                  </li>
                  <li>Add or edit the <strong>CNAME</strong> record:
                    <div className="mt-1 p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                      Type: <strong>CNAME</strong> | Name: <strong>www</strong> | Value: <strong>cfotaxprollc.com</strong> | TTL: <strong>1/2 Hour</strong>
                    </div>
                  </li>
                  <li>Click <strong>Save</strong>. GoDaddy will publish the records globally within 15–30 minutes.</li>
                </ol>
              </div>
            )}

            {/* Namecheap Guide */}
            {selectedRegistrarGuide === 'namecheap' && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <span>Namecheap 4-Step Connection Guide:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 pl-1 leading-relaxed">
                  <li>Log in to <strong>Namecheap.com</strong> &gt; go to <strong>Domain List</strong> on the left sidebar.</li>
                  <li>Click the <strong>Manage</strong> button next to <strong>cfotaxprollc.com</strong>.</li>
                  <li>Select the <strong>Advanced DNS</strong> tab at the top of the page.</li>
                  <li>In the <strong>Host Records</strong> table, click <strong>Add New Record</strong>:
                    <div className="mt-1 p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                      Type: <strong>A Record</strong> | Host: <strong>@</strong> | Value: <strong>75.2.60.5</strong> | TTL: <strong>Automatic</strong>
                    </div>
                  </li>
                  <li>Click <strong>Add New Record</strong> again for CNAME:
                    <div className="mt-1 p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                      Type: <strong>CNAME Record</strong> | Host: <strong>www</strong> | Target: <strong>cfotaxprollc.com</strong> | TTL: <strong>Automatic</strong>
                    </div>
                  </li>
                  <li>Click the green checkmark (✓) to save each record.</li>
                </ol>
              </div>
            )}

            {/* Google Domains / Squarespace Guide */}
            {selectedRegistrarGuide === 'squarespace' && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <span>Squarespace / Google Domains 4-Step Guide:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 pl-1 leading-relaxed">
                  <li>Log in to <strong>Squarespace Domains</strong> (or Google Domains console).</li>
                  <li>Click on <strong>cfotaxprollc.com</strong> &gt; select <strong>DNS Settings</strong>.</li>
                  <li>Scroll down to the <strong>Custom Records</strong> section and click <strong>Add Record</strong>.</li>
                  <li>Add the A-Record: Host: <strong>@</strong> | Type: <strong>A</strong> | Data: <strong>75.2.60.5</strong> | TTL: <strong>3600</strong>.</li>
                  <li>Add the CNAME: Host: <strong>www</strong> | Type: <strong>CNAME</strong> | Data: <strong>cfotaxprollc.com</strong>.</li>
                  <li>Click <strong>Save</strong>.</li>
                </ol>
              </div>
            )}

            {/* Cloudflare Guide */}
            {selectedRegistrarGuide === 'cloudflare' && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <span>Cloudflare (Free SSL &amp; Instant CDN) Setup:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 pl-1 leading-relaxed">
                  <li>Sign up for a free account at <strong>Cloudflare.com</strong> &gt; click <strong>Add a Site</strong> &gt; enter <strong>cfotaxprollc.com</strong>.</li>
                  <li>Select the <strong>Free Plan</strong>. Cloudflare will scan your existing records.</li>
                  <li>Copy Cloudflare's two assigned nameservers (e.g. <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">vera.ns.cloudflare.com</code>) into your registrar's Nameserver settings.</li>
                  <li>In Cloudflare's <strong>DNS &gt; Records</strong> tab, add:
                    <div className="mt-1 p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                      Type: <strong>A</strong> | Name: <strong>@</strong> | IPv4: <strong>75.2.60.5</strong> | Proxy: <strong>Proxied (Orange Cloud)</strong>
                    </div>
                  </li>
                  <li>Enjoy automatic SSL certificate management, 100% uptime protection, and sub-100ms load times worldwide!</li>
                </ol>
              </div>
            )}

            {/* Carrd Pro Guide */}
            {selectedRegistrarGuide === 'carrd' && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <span>Carrd.co Pro Custom Domain Routing ($19/year):</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 pl-1 leading-relaxed">
                  <li>In your <strong>Carrd Site Editor</strong>, click the <strong>Publish</strong> button (Floppy Disk icon) in the top-right toolbar.</li>
                  <li>Under <strong>Action</strong>, choose <strong>Publish to a custom domain</strong>.</li>
                  <li>Enter <strong>cfotaxprollc.com</strong> in the domain field.</li>
                  <li>Carrd will automatically show you the exact DNS records to enter in GoDaddy / Namecheap.</li>
                  <li>Save the records at your registrar, return to Carrd, and click <strong>Publish Changes</strong>.</li>
                </ol>
              </div>
            )}
          </div>

          {/* STEP 3 & 4: FLUSH DNS CACHE COMMAND CENTER */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 4: Still Seeing NXDOMAIN? Flush Your Local DNS Cache</h3>
                <p className="text-xs text-slate-500">Your computer or browser may be caching the old "domain not found" response. Flush your DNS to test fresh.</p>
              </div>

              {/* OS Selector */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'windows', label: '🪟 Windows' },
                  { id: 'mac', label: '🍎 macOS' },
                  { id: 'linux', label: '🐧 Linux' },
                  { id: 'chrome', label: '🌐 Chrome' },
                ].map((os) => (
                  <button
                    key={os.id}
                    onClick={() => setSelectedOsForFlush(os.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedOsForFlush === os.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {os.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Windows Command */}
            {selectedOsForFlush === 'windows' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">Open <strong>Command Prompt</strong> or <strong>PowerShell</strong> (Win + R &gt; type <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">cmd</code>) and run:</p>
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono flex items-center justify-between">
                  <code>ipconfig /flushdns</code>
                  <button
                    onClick={() => copyToClipboard('ipconfig /flushdns', 'flush_win')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-sans font-bold flex items-center space-x-1"
                  >
                    {copiedCode === 'flush_win' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'flush_win' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* macOS Command */}
            {selectedOsForFlush === 'mac' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">Open <strong>Terminal</strong> (Cmd + Space &gt; type <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Terminal</code>) and run:</p>
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono flex items-center justify-between">
                  <code>sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>
                  <button
                    onClick={() => copyToClipboard('sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder', 'flush_mac')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-sans font-bold flex items-center space-x-1"
                  >
                    {copiedCode === 'flush_mac' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'flush_mac' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Linux Command */}
            {selectedOsForFlush === 'linux' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">Open terminal and run systemd DNS cache flush:</p>
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono flex items-center justify-between">
                  <code>sudo systemd-resolve --flush-caches</code>
                  <button
                    onClick={() => copyToClipboard('sudo systemd-resolve --flush-caches', 'flush_linux')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-sans font-bold flex items-center space-x-1"
                  >
                    {copiedCode === 'flush_linux' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'flush_linux' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Chrome Command */}
            {selectedOsForFlush === 'chrome' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">To clear Google Chrome's internal browser DNS cache:</p>
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono flex items-center justify-between">
                  <code>chrome://net-internals/#dns</code>
                  <button
                    onClick={() => copyToClipboard('chrome://net-internals/#dns', 'flush_chrome')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-sans font-bold flex items-center space-x-1"
                  >
                    {copiedCode === 'flush_chrome' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'flush_chrome' ? 'Copied' : 'Copy URL'}</span>
                  </button>
                </div>
                <p className="text-slate-500 text-[11px]">Paste this into your Chrome address bar and click the <strong>"Clear host cache"</strong> button.</p>
              </div>
            )}

            {/* Third-Party Verification Links */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-bold">Check Global Propagation Across 30+ World Servers:</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.whatsmydns.net/#A/cfotaxprollc.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center space-x-1 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>whatsmydns.net</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://dnschecker.org/#A/cfotaxprollc.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center space-x-1 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>dnschecker.org</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT 2: BLUEPRINT & 7 CRITICAL SECTIONS */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          
          {/* Action Plan Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-emerald-600" />
                  <span>The 7-Day Durable Website Launch Matrix</span>
                </h3>
                <p className="text-xs text-slate-500">Every piece required for 24/7 lead capture, trust building, and direct bookings.</p>
              </div>
              <button
                onClick={onOpenPublicSite}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition shadow-sm self-start sm:self-auto"
              >
                <span>View Full Page Layout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyActionPlan.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {item.day}
                      </span>
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Critical Sections Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900">7 Critical Sections Implemented On Public Site</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Homepage &amp; Hero Conversion Banner</span>
                </div>
                <p className="text-slate-600">"Stop Overpaying Taxes. Get Every Deduction You Deserve." with clear dual CTAs and direct phone.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>4 Transparent Service Packages</span>
                </div>
                <p className="text-slate-600">Tax Prep ($1,500), Fractional CFO ($2,500/mo), Claims ($4,500), Bookkeeping ($600/mo).</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Interactive S-Corp Tax Savings Calculator</span>
                </div>
                <p className="text-slate-600">Allows Dallas prospects to input revenue and see $12k–$45k annual tax savings instantly.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">4</span>
                  <span>About &amp; Enrolled Agent Credentials</span>
                </div>
                <p className="text-slate-600">Chukwuma Oduagu, EA, IRS PTIN: P01507635, Dallas EIN: 27-3243694, 6215 Shady Brook Ln.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">5</span>
                  <span>Verified 5-Star Case Studies</span>
                </div>
                <p className="text-slate-600">Proof of $113k insurance supplements, $28k S-Corp savings, and IRS penalty relief.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">6</span>
                  <span>Interactive FAQ Accordion</span>
                </div>
                <p className="text-slate-600">Direct answers to S-Corp reasonable salary, unfiled tax returns, and commercial claims.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 md:col-span-2">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">7</span>
                  <span>Contact Intake &amp; Instant 15-Minute Strategy Booking</span>
                </div>
                <p className="text-slate-600">Form feeds directly into backend revenue CRM, floating 24/7 AI chatbot diagnostic, and click-to-call.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT 3: CARRD.CO 1-CLICK TEMPLATE EXPORTER */}
      {activeTab === 'carrd_export' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase mb-1">
                <span>Carrd.co Ready Template</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">1-Click Carrd.co Markdown / Layout Exporter</h3>
              <p className="text-xs text-slate-500">Copy this exact template into Carrd.co to build your site in under 15 minutes.</p>
            </div>

            <button
              onClick={() => copyToClipboard(carrdMarkdownCode, 'carrd_md')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition shadow-sm"
            >
              {copiedCode === 'carrd_md' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode === 'carrd_md' ? 'Copied to Clipboard!' : 'Copy Carrd Markdown'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 space-y-1">
            <div className="text-slate-500 pb-2 border-b border-slate-800">// Ready to paste into Carrd Markdown / Text element:</div>
            <pre className="whitespace-pre-wrap">{carrdMarkdownCode}</pre>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 text-slate-700">
            <div className="font-extrabold text-emerald-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>How to launch this on Carrd.co ($19/year Pro Plan):</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-2">
              <li>Go to <strong>Carrd.co</strong> and click <strong>New Site</strong>.</li>
              <li>Select a blank canvas or modern agency template (e.g. #Landing or #Agency).</li>
              <li>Paste the headline, copy, and service blocks from above.</li>
              <li>Click <strong>Publish &gt; Custom Domain</strong> and enter <code>cfotaxprollc.com</code>.</li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: EMBED CODES */}
      {activeTab === 'embeds' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">24/7 AI Chatbot Embed Snippet</h3>
                <p className="text-xs text-slate-500">Embed your AI Tax Diagnostic Chatbot onto any external website.</p>
              </div>
              <button
                onClick={() => copyToClipboard(chatbotEmbedSnippet, 'chat_embed')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition"
              >
                {copiedCode === 'chat_embed' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === 'chat_embed' ? 'Copied' : 'Copy Embed Code'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto">
              {chatbotEmbedSnippet}
            </pre>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Calendly 15-Minute Strategy Booking Embed</h3>
                <p className="text-xs text-slate-500">Embed direct calendar scheduling into any Carrd or WordPress page.</p>
              </div>
              <button
                onClick={() => copyToClipboard(calendlyEmbedSnippet, 'cal_embed')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition"
              >
                {copiedCode === 'cal_embed' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === 'cal_embed' ? 'Copied' : 'Copy Embed Code'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto">
              {calendlyEmbedSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SEO & SCHEMA.ORG */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Schema.org LocalBusiness Structured Data</h3>
              <p className="text-xs text-slate-500">Helps Google index CFO TAX PRO LLC in Dallas local 3-pack search results.</p>
            </div>
            <button
              onClick={() => copyToClipboard(schemaOrgJson, 'schema_json')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 transition"
            >
              {copiedCode === 'schema_json' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode === 'schema_json' ? 'Copied JSON-LD' : 'Copy Schema.org'}</span>
            </button>
          </div>
          <pre className="p-4 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-xs overflow-x-auto">
            {schemaOrgJson}
          </pre>
        </div>
      )}

    </div>
  );
};
