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
  const { isAuthenticated, user, triggerAuth } = useAuth();
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
      <div className="relative min-h-screen w-full overflow-hidden text-white pt-20 pb-20">

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
            <p className="max-w-2xl mx-auto text-lg text-zinc-400">
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
              <div className="p-8 rounded-3xl border backdrop-blur-md bg-zinc-900/50 border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email us", value: "contact@codegang.online" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm mb-1 text-zinc-400">{item.label}</p>
                        <p className="text-lg font-medium whitespace-pre-line text-white hover:text-brand-green cursor-pointer transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl border backdrop-blur-md bg-gradient-to-br from-brand-green/20 to-zinc-900/50 border-brand-green/20">
                <h3 className="text-xl font-bold mb-2 text-white">Ready to start?</h3>
                <p className="mb-6 text-zinc-400">Book a free discovery call to discuss your project requirements.</p>
                <Button
                  className="w-full font-bold bg-brand-green text-black"
                  onClick={() => (isOnline ? setIsConsultationOpen(true) : triggerAuth())}
                >
                  Book Consultation
                </Button>
              </div>
            </motion.div>

            <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-sm bg-zinc-900/30 border-white/5"
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
                    <label className="text-sm font-medium ml-1 text-zinc-400">First Name</label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      classNames={{
                        inputWrapper: "transition-colors h-14 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                        input: "placeholder:text-zinc-600 !text-white text-white"
                      }}
                      startContent={<User size={18} className="text-zinc-500" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1 text-zinc-400">Last Name</label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      classNames={{
                        inputWrapper: "transition-colors h-14 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                        input: "placeholder:text-zinc-600 !text-white text-white"
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1 text-zinc-400">Email</label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    value={formData.email}
                    // If user is authenticated, disable email editing but show it
                    isReadOnly={!!user}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    classNames={{
                      inputWrapper: `transition-colors h-14 rounded-2xl bg-zinc-900 border ${user ? 'border-brand-green/30 bg-brand-green/5' : 'border-zinc-800'} hover:border-brand-green/50 focus-within:border-brand-green`,
                      input: `placeholder:text-zinc-600 !text-white text-white ${user ? 'opacity-70 cursor-not-allowed' : ''}`
                    }}
                    startContent={<Mail size={18} className={user ? "text-brand-green" : "text-zinc-500"} />}

                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1 text-zinc-400">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    minRows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    classNames={{
                      inputWrapper: "transition-colors rounded-2xl p-4 bg-zinc-900 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                      input: "placeholder:text-zinc-600 !text-white text-white"
                    }}

                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full font-bold h-14 rounded-2xl transition-colors bg-white text-black hover:bg-zinc-200"
                  endContent={isSubmitting ? null : <Send size={18} />}

                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
