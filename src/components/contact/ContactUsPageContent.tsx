"use client";

import AppLayout from "@/components/AppLayout";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Mail, Send, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";
import { ConsultationModal } from "@/components/contact/ConsultationModal";

export default function ContactUsPageContent() {
  const { isAuthenticated, user } = useAuth();
  const isOnline = isAuthenticated;
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-fill user details when authenticated
  useEffect(() => {
    if (user) {
      const names = user.displayName ? user.displayName.split(' ') : [];
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        firstName: names[0] || prev.firstName,
        lastName: names.length > 1 ? names.slice(1).join(' ') : prev.lastName
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="relative min-h-screen w-full overflow-hidden bg-black text-white pt-20 pb-20">

        {/* Abstract 3D Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.img
            src="/3d_ring.png"
            className={`absolute top-[15%] right-[8%] w-64 h-64 opacity-20 mix-blend-screen transition-all duration-500 ${!isOnline && 'grayscale sepia hue-rotate-[-50deg]'}`}
            animate={{ rotate: [0, 360], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/3d_blob.png"
            className={`absolute bottom-[10%] left-[5%] w-80 h-80 opacity-15 mix-blend-screen transition-all duration-500 ${!isOnline && 'grayscale sepia hue-rotate-[-50deg]'}`}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <ThemeFlipHeading
                prefix="Get in "
                words={["Touch.", "Sync.", "Connect."]}
              />
            </div>
            <p className={`max-w-2xl mx-auto text-lg transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
              Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className={`p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 ${isOnline
                ? 'bg-zinc-900/50 border-white/10'
                : 'bg-red-950/10 border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]'
                }`}>
                <h3 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'}`}>Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email us", value: "contact@codegang.online" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-colors duration-500 ${isOnline
                        ? 'bg-brand-green/10 text-brand-green'
                        : 'bg-red-500/10 text-red-500'
                        }`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className={`text-sm mb-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-400/60'}`}>{item.label}</p>
                        <p className={`text-lg font-medium whitespace-pre-line transition-colors duration-500 ${isOnline
                          ? 'text-white hover:text-brand-green cursor-pointer'
                          : 'text-red-200 hover:text-red-400'
                          }`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 ${isOnline
                ? 'bg-gradient-to-br from-brand-green/20 to-zinc-900/50 border-brand-green/20'
                : 'bg-gradient-to-br from-red-600/10 to-red-950/20 border-red-500/20'
                }`}>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'}`}>Ready to start?</h3>
                <p className={`mb-6 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/70'}`}>Book a free discovery call to discuss your project requirements.</p>
                <Button
                  className={`w-full font-bold transition-all duration-500 ${isOnline
                    ? 'bg-brand-green text-black shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                    : 'bg-red-500/20 text-red-200 border border-red-500/50 hover:bg-red-500/30'
                    }`}
                  onClick={() => isOnline && setIsConsultationOpen(true)}
                >
                  {isOnline ? 'Book Consultation' : 'Authentication Required'}
                </Button>
              </div>
            </motion.div>

            <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-sm transition-all duration-500 ${isOnline
                ? 'bg-zinc-900/30 border-white/5'
                : 'bg-red-950/10 border-red-900/20'
                }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                    Message sent successfully! We&#39;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                    Failed to send message. Please try again.
                  </div>
                )}

                {/* Auto-filled Notice */}
                {user && (
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-brand-green/10 border border-brand-green/20">
                    <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                    <p className="text-xs text-brand-green">
                      Authenticated as <span className="font-bold">{user.email}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>First Name</label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      classNames={{
                        inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                          ? "bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green"
                          : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                        input: `placeholder:text-zinc-600 !text-white ${isOnline ? "text-white" : "text-red-200"}`
                      }}
                      startContent={<User size={18} className={`transition-colors duration-500 ${isOnline ? "text-zinc-500" : "text-red-500/50"}`} />}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Last Name</label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      classNames={{
                        inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                          ? "bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green"
                          : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                        input: `placeholder:text-zinc-600 !text-white ${isOnline ? "text-white" : "text-red-200"}`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Email</label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    value={formData.email}
                    // If user is authenticated, disable email editing but show it
                    isReadOnly={!!user}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    classNames={{
                      inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                        ? `bg-zinc-900 border ${user ? 'border-brand-green/30 bg-brand-green/5' : 'border-zinc-800'} hover:border-brand-green/50 focus-within:border-brand-green`
                        : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                      input: `placeholder:text-zinc-600 !text-white ${isOnline ? "text-white" : "text-red-200"} ${user ? 'opacity-70 cursor-not-allowed' : ''}`
                    }}
                    startContent={<Mail size={18} className={`transition-colors duration-500 ${isOnline ? (user ? "text-brand-green" : "text-zinc-500") : "text-red-500/50"}`} />}

                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    minRows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    classNames={{
                      inputWrapper: `transition-colors rounded-2xl p-4 ${isOnline
                        ? "bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green"
                        : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                      input: `placeholder:text-zinc-600 !text-white ${isOnline ? "text-white" : "text-red-200"}`
                    }}

                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !isOnline}
                  className={`w-full font-bold h-14 rounded-2xl transition-colors ${isOnline
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30"}`}
                  endContent={isSubmitting ? null : <Send size={18} />}

                >
                  {isSubmitting ? 'Sending...' : isOnline ? 'Send Message' : 'Authentication Required'}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
