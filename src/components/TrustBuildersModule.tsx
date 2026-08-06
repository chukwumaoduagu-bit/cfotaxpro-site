import React, { useState } from 'react';
import { RevenueDomain } from '../types';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Quote, 
  Building, 
  TrendingUp,
  Briefcase
} from 'lucide-react';

interface TrustBuildersModuleProps {
  domain: RevenueDomain;
  businessName: string;
}

export const TrustBuildersModule: React.FC<TrustBuildersModuleProps> = ({
  domain,
  businessName
}) => {
  const [reviews, setReviews] = useState(domain.sampleReviews);
  const [certifications, setCertifications] = useState(domain.certifications);

  // New review state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newText, setNewText] = useState('');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // New cert state
  const [newCert, setNewCert] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    setReviews([
      ...reviews,
      {
        author: newAuthor,
        role: newRole || 'Client',
        company: newCompany || 'Verified Business',
        rating: 5,
        text: newText
      }
    ]);

    setNewAuthor('');
    setNewRole('');
    setNewCompany('');
    setNewText('');
    setShowAddReviewModal(false);
  };

  const handleAddCert = () => {
    if (!newCert.trim()) return;
    setCertifications([...certifications, newCert.trim()]);
    setNewCert('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span>🛡️ 2. Trust Builders Studio</span>
            <span className="text-xs font-normal text-slate-500">({domain.name})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Builds high credibility with client reviews, official certifications, and proven case studies.</p>
        </div>

        <button
          onClick={() => setShowAddReviewModal(true)}
          className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Testimonial</span>
        </button>
      </div>

      {/* Grid: 3 Core Trust Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pillar 1: Reviews & Testimonials */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Client Reviews & Social Proof ({reviews.length})</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              5.0 ★ Average Rating
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-3">
                <Quote className="w-8 h-8 text-slate-200 absolute top-3 right-3" />
                
                <div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{rev.text}"</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-100 font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                    <div className="text-[10px] text-slate-500">{rev.role} • {rev.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Certifications & Trust Badges */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Certifications & Badges</span>
            </h3>

            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs font-medium text-slate-800 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            {/* Quick Add Certification */}
            <div className="pt-2 border-t border-slate-100 flex space-x-2">
              <input 
                type="text" 
                placeholder="New Certification Name..." 
                value={newCert} 
                onChange={(e) => setNewCert(e.target.value)} 
                className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button 
                onClick={handleAddCert} 
                className="px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded hover:bg-slate-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Pillar 3: Case Studies & Benchmark Matrix */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Case Studies & ROI Results</span>
            </h3>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
              <div className="font-bold text-emerald-950 flex justify-between">
                <span>Featured {domain.name} Client Case</span>
                <span className="text-emerald-700 font-mono">+340% ROI</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Implemented our complete 5-layer revenue engine for a mid-market client. Secured 18 qualified leads in week 1.
              </p>
              <div className="flex items-center space-x-2 text-[10px] text-emerald-800 font-medium pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Deliverable & Audit Complete</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Add Review */}
      {showAddReviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Customer Testimonial</h3>
            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Author Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Sarah Jenkins" 
                  value={newAuthor} 
                  onChange={(e) => setNewAuthor(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Role / Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CEO" 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Company</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex Corp" 
                    value={newCompany} 
                    onChange={(e) => setNewCompany(e.target.value)} 
                    className="w-full p-2 border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Review Quote</label>
                <textarea 
                  required 
                  rows={3} 
                  placeholder="Write client praise..." 
                  value={newText} 
                  onChange={(e) => setNewText(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
