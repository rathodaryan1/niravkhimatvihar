'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Sparkles, MessageCircle } from 'lucide-react';
import { LocationSection } from '@/components/marketing/LocationSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Unable to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen space-y-0">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Connect with Management</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            CONTACT & <br />
            <span className="italic font-normal text-[#C7A15A]">PILGRIMAGE ASSISTANCE.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            We welcome your inquiries regarding Dharamshala bookings, Bhojanshala arrangements, Sangh stays, or Palitana yatra assistance.
          </p>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-medium block">
                Office & Desk
              </span>
              <h2 className="font-serif text-3xl font-light text-[#241A15]">
                Dharamshala Helpdesk
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#3A2418] text-[#C7A15A] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#241A15]">Direct Phone</h3>
                <p className="text-xs text-[#3A2418]/70">Office Desk & Reception</p>
                <a href="tel:02848253050" className="text-sm font-semibold text-[#241A15] hover:text-[#9B7049] block pt-1">
                  02848 253050
                </a>
              </div>

              <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#241A15]">WhatsApp</h3>
                <p className="text-xs text-[#3A2418]/70">Instant Yatri Assistance</p>
                <a
                  href="https://wa.me/919376656100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#25D366] hover:underline block pt-1"
                >
                  +91 93766 56100
                </a>
              </div>

              <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#3A2418] text-[#C7A15A] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#241A15]">Email</h3>
                <p className="text-xs text-[#3A2418]/70">Trust & Group Inquiries</p>
                <a href="mailto:contact@niravkhimatbhavan.org" className="text-xs font-semibold text-[#241A15] hover:text-[#9B7049] block truncate pt-1">
                  contact@niravkhimatbhavan.org
                </a>
              </div>

              <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#3A2418] text-[#C7A15A] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#241A15]">Desk Hours</h3>
                <p className="text-xs text-[#3A2418]/70">Reception Open Daily</p>
                <span className="text-xs font-semibold text-[#241A15] block pt-1">06:00 AM – 10:00 PM</span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#9B7049]/20 rounded-2xl p-6 space-y-2 text-xs text-[#3A2418]/80 shadow-sm">
              <div className="flex items-center gap-2 font-serif font-medium text-sm text-[#241A15]">
                <MapPin className="w-4 h-4 text-[#C7A15A]" />
                <span>Physical Location</span>
              </div>
              <p className="leading-relaxed font-light">
                Shri Nirav Khimat Bhavan, B/H Sanchori Bhavan, Sarvaiya Nagar, Taleti Road, Palitana, Gujarat – 364270, India.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (col-span-7) */}
          <div className="lg:col-span-7 bg-[#F8F3E8] border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-medium block">
                Send a Message
              </span>
              <h2 className="font-serif text-3xl font-light text-[#241A15]">
                How May We Assist You?
              </h2>
              <p className="text-xs text-[#3A2418]/70 font-light">We typically respond to pilgrim inquiries within 24 hours.</p>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you. Your inquiry has been submitted to management.</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#9B7049]/30 bg-white text-[#241A15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-4 py-3 rounded-xl border border-[#9B7049]/30 bg-white text-[#241A15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#9B7049]/30 bg-white text-[#241A15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sangh Group Stay / Bhojanshala Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#9B7049]/30 bg-white text-[#241A15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#9B7049]/30 bg-white text-[#241A15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] font-serif font-semibold py-4 px-6 rounded-full shadow-md transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                <Send className="w-4 h-4 text-[#C7A15A]" />
                <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Location Map Section */}
      <LocationSection />
    </div>
  );
}
