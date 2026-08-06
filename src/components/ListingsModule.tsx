import React, { useState, useMemo } from 'react';
import { CfoTaxProLogo } from './CfoTaxProLogo';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  Edit3, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  ChevronRight, 
  X, 
  ArrowUpRight,
  TrendingUp,
  Layers,
  Check,
  Smartphone,
  Navigation,
  Bot
} from 'lucide-react';
import { BusinessProfile, ListingPlatform, ListingStatus } from '../types';
import { INITIAL_BUSINESS_PROFILE, INITIAL_LISTINGS } from '../data/listingsData';

interface ListingsModuleProps {
  businessName?: string;
}

export const ListingsModule: React.FC<ListingsModuleProps> = () => {
  const [profile, setProfile] = useState<BusinessProfile>(INITIAL_BUSINESS_PROFILE);
  const [listings, setListings] = useState<ListingPlatform[]>(INITIAL_LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ListingStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [selectedListingForPreview, setSelectedListingForPreview] = useState<ListingPlatform | null>(null);
  
  // Sync state
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState<BusinessProfile>(profile);

  // Counts
  const counts = useMemo(() => {
    return {
      all: listings.length,
      connected: listings.filter(l => l.status === 'Connected').length,
      processing: listings.filter(l => l.status === 'Processing').length,
      notConnected: listings.filter(l => l.status === 'Not Connected').length,
      issueFound: listings.filter(l => l.status === 'Issue Found').length,
    };
  }, [listings]);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.listingUrlDisplay && item.listingUrlDisplay.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' ? true : item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [listings, searchQuery, statusFilter, categoryFilter]);

  // Handle Sync All
  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setSyncNotice('Connecting to 20 local index networks & Google Gemini Knowledge Graph...');

    setTimeout(() => {
      setListings(prev =>
        prev.map(item => {
          if (item.status === 'Processing') {
            return {
              ...item,
              status: 'Connected',
              lastSynced: 'Just now',
              matchScore: 98,
              viewListingUrl: `https://${item.listingUrlDisplay}`
            };
          }
          return {
            ...item,
            lastSynced: 'Just now',
            matchScore: 100
          };
        })
      );
      setIsSyncingAll(false);
      setSyncNotice('✅ All 20 directory platforms synced with verified NAP (Name, Address, Phone)!');
      setTimeout(() => setSyncNotice(null), 5000);
    }, 1800);
  };

  // Complete an attribute
  const handleCompleteAttribute = (attrId: string) => {
    const itemToComplete = profile.pendingAttributes.find(a => a.id === attrId);
    if (!itemToComplete) return;

    const remainingPending = profile.pendingAttributes.filter(a => a.id !== attrId);
    const newCompleted = [...profile.completedAttributes, itemToComplete.name];
    const newPercentage = Math.min(100, Math.round(profile.completionPercentage + 6));

    const updatedProfile = {
      ...profile,
      completionPercentage: newPercentage,
      completedAttributes: newCompleted,
      pendingAttributes: remainingPending
    };

    setProfile(updatedProfile);
    setEditFormData(updatedProfile);
  };

  // Save Profile edits
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editFormData);
    setIsEditProfileOpen(false);
    setSyncNotice('✅ Business Profile updated. Propagating NAP changes to all connected directories.');
    setTimeout(() => setSyncNotice(null), 4000);
  };

  // Get Platform Branding Badges
  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case 'google':
        return <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-500/20">G</span>;
      case 'yelp':
        return <span className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 font-black text-xs flex items-center justify-center border border-red-500/20">Y</span>;
      case 'yahoo':
        return <span className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-600 font-black text-xs flex items-center justify-center border border-purple-500/20">Y!</span>;
      case 'yp':
        return <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 font-black text-xs flex items-center justify-center border border-amber-500/20">YP</span>;
      case 'nextdoor':
        return <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-500/20">ND</span>;
      case 'waze':
        return <span className="w-8 h-8 rounded-lg bg-cyan-600/10 text-cyan-600 font-black text-xs flex items-center justify-center border border-cyan-500/20"><Navigation className="w-4 h-4" /></span>;
      case 'gemini':
        return <span className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 font-black text-xs flex items-center justify-center border border-indigo-500/20"><Bot className="w-4 h-4" /></span>;
      default:
        return <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200"><Building2 className="w-4 h-4 text-slate-500" /></span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <span>Listings Management</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  20 PLATFORMS
                </span>
              </h2>
              <p className="text-xs text-slate-500">Status and sync times vary by platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'Syncing Network...' : 'Sync All Listings'}</span>
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xs animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Top Business Profile & Attributes Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Business Profile Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            {/* Header: Logo, Name, Edit Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3.5">
                {/* Official Business Logo */}
                <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0">
                  <CfoTaxProLogo size={52} />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      <ShieldCheck className="w-3 h-3 mr-1 text-blue-600" />
                      Verified Entity
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{profile.primaryCategory}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditFormData(profile);
                  setIsEditProfileOpen(true);
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition border border-slate-200"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                <span>Edit Business Profile</span>
              </button>
            </div>

            {/* Address & Phone Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 border-t border-slate-100">
              <div className="flex items-start space-x-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Physical Address</div>
                  <div className="font-semibold text-slate-900">{profile.address}</div>
                  <div>{profile.city}, {profile.state} {profile.zip}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{profile.country}</div>
                </div>
              </div>

              <div className="flex items-start space-x-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Primary Contact Phone</div>
                  <a href={`tel:${profile.phone}`} className="font-bold text-slate-900 text-sm hover:text-emerald-600 transition">
                    {profile.phone}
                  </a>
                  <div className="text-slate-500 text-[11px] mt-0.5 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{profile.website.replace('https://', '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="font-medium text-slate-700">Operating Hours:</span>
              <span className="text-slate-600 font-semibold">{profile.hours}</span>
            </div>
          </div>
        </div>

        {/* Right: Profile Completion & Attributes Box (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Completion</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">{profile.completionPercentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700/80 rounded-full h-2.5 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${profile.completionPercentage}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
              <span>{profile.pendingAttributes.length} items remaining to 100%</span>
              <span className="text-emerald-400 text-[11px] font-semibold">{profile.completedAttributes.length} completed</span>
            </p>
          </div>

          {/* Business Attributes Callout */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Business Attributes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Profiles with complete attributes appear in <strong className="text-emerald-400">17% more searches</strong>.
            </p>
            <button
              onClick={() => setIsAttributeModalOpen(true)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <span>Complete your profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Search & Status Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by platform name, category, or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-semibold">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Categories</option>
              <option value="Search & Navigation">Search & Navigation</option>
              <option value="Local & Social">Local & Social</option>
              <option value="Business Directories">Business Directories</option>
              <option value="AI & Voice Assistants">AI & Voice Assistants</option>
            </select>
          </div>

        </div>

        {/* Status Counters Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin border-t border-slate-100 pt-3">
          
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              statusFilter === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>All Listings</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              statusFilter === 'All' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-200 text-slate-800'
            }`}>
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Connected')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              statusFilter === 'Connected'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Connected</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-200/80 text-emerald-900">
              {counts.connected}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Processing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              statusFilter === 'Processing'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Processing</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900">
              {counts.processing}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Not Connected')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              statusFilter === 'Not Connected'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <span>Not Connected</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
              {counts.notConnected}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Issue Found')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              statusFilter === 'Issue Found'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Issue Found</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
              {counts.issueFound}
            </span>
          </button>

        </div>

      </div>

      {/* Directory Listings Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-5">Platform</div>
          <div className="col-span-4">Status & Sync Health</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {/* List items */}
        <div className="divide-y divide-slate-100">
          {filteredListings.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <Building2 className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-sm font-semibold">No listings found matching "{searchQuery}"</p>
              <button
                onClick={() => { setSearchQuery(''); setStatusFilter('All'); setCategoryFilter('All'); }}
                className="text-xs text-emerald-600 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredListings.map((item) => {
              const isProcessing = item.status === 'Processing';
              const isConnected = item.status === 'Connected';

              return (
                <div
                  key={item.id}
                  className="p-4 sm:px-6 hover:bg-slate-50/80 transition flex flex-col md:grid md:grid-cols-12 gap-3 md:items-center"
                >
                  {/* Platform Col (5 cols) */}
                  <div className="md:col-span-5 flex items-center space-x-3">
                    {getPlatformIcon(item.id)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        {item.isVerified && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Verified
                          </span>
                        )}
                        {item.isEnhanced && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            Enhanced
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                        <span>{item.category}</span>
                        {item.listingUrlDisplay && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-400 truncate max-w-[170px]">{item.listingUrlDisplay}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Tooltip Info Col (4 cols) */}
                  <div className="md:col-span-4 flex flex-col justify-center space-y-1">
                    <div className="flex items-center space-x-2">
                      {isConnected && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
                          Connected
                        </span>
                      )}

                      {isProcessing && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600 mr-1 animate-spin" />
                          Processing
                        </span>
                      )}

                      {/* Tooltip trigger indicator */}
                      {item.tooltipText && (
                        <div className="group relative inline-block">
                          <span className="text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded cursor-pointer flex items-center space-x-1">
                            <Info className="w-2.5 h-2.5 text-slate-500" />
                            <span>Tooltip</span>
                          </span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-56 p-2 bg-slate-900 text-slate-200 text-[10px] rounded-lg shadow-xl border border-slate-700 z-30 pointer-events-none">
                            {item.tooltipText}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                      <span>Sync: {item.lastSynced}</span>
                      {item.syncTimeEstimate && (
                        <span className="text-slate-400 font-mono text-[10px]">({item.syncTimeEstimate})</span>
                      )}
                    </div>
                  </div>

                  {/* Actions Col (3 cols) */}
                  <div className="md:col-span-3 flex items-center justify-end space-x-2">
                    {item.viewListingUrl || isConnected ? (
                      <button
                        onClick={() => setSelectedListingForPreview(item)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1 transition border border-slate-200 shadow-2xs"
                      >
                        <span>View Listing</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ) : isProcessing ? (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                        Sync in queue
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSyncAll()}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Showing {filteredListings.length} of 20 network directory listings for <strong>CFO TAX PRO LLC</strong></span>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% NAP Consistency Guaranteed Across All Networks</span>
          </span>
        </div>

      </div>

      {/* MODAL 1: Edit Business Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Business Profile</h3>
                  <p className="text-xs text-slate-500">Changes will synchronize across all 20 connected local directories.</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Business Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Legal Business Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={editFormData.state}
                      onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={editFormData.zip}
                      onChange={(e) => setEditFormData({ ...editFormData, zip: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={editFormData.website}
                    onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Primary Category & Hours */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Business Category</label>
                <input
                  type="text"
                  value={editFormData.primaryCategory}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryCategory: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={editFormData.hours}
                  onChange={(e) => setEditFormData({ ...editFormData, hours: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Business Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-xs"
                >
                  Save & Sync Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: Complete Attributes Drawer/Modal */}
      {isAttributeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Complete Business Attributes</h3>
                  <p className="text-xs text-slate-500">Boost search ranking and local customer discovery by 17%.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAttributeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-800">Current Profile Completion:</span>
                  <span className="ml-2 font-extrabold text-emerald-600 font-mono text-sm">{profile.completionPercentage}%</span>
                </div>
                <span className="text-slate-500 text-[11px]">{profile.pendingAttributes.length} items remaining</span>
              </div>

              {profile.pendingAttributes.length === 0 ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-emerald-900 space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Profile 100% Complete!</div>
                  <p className="text-xs text-emerald-700">All business attributes are active and verified across all networks.</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-80 overflow-y-auto">
                  {profile.pendingAttributes.map((attr) => (
                    <div
                      key={attr.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs transition"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{attr.name}</div>
                        <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{attr.impact}</span>
                          <span className="text-slate-400">• {attr.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCompleteAttribute(attr.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center space-x-1 shadow-2xs shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Add & Verify</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsAttributeModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: View Listing Preview Modal */}
      {selectedListingForPreview && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                {getPlatformIcon(selectedListingForPreview.id)}
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedListingForPreview.name} Listing Preview</h3>
                  <p className="text-xs text-slate-500">Live directory synchronization check</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedListingForPreview(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{profile.name}</h4>
                  <p className="text-emerald-700 font-medium">{profile.primaryCategory}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {selectedListingForPreview.status}
                </span>
              </div>

              <div className="space-y-1.5 text-slate-700 border-t border-slate-200/60 pt-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.address}, {profile.city}, {profile.state} {profile.zip}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-900">{profile.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-blue-600 underline">{profile.website}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.hours}</span>
                </div>
              </div>

              {/* Match score bar */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>NAP Match & Consistency Score</span>
                  <span className="text-emerald-600 font-mono">{selectedListingForPreview.matchScore}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${selectedListingForPreview.matchScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-400 text-[11px]">Last verified: {selectedListingForPreview.lastSynced}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedListingForPreview(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleSyncAll();
                    setSelectedListingForPreview(null);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-2xs"
                >
                  Force Re-Sync
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
