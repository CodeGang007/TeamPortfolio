"use client";

import AppLayout from "@/components/AppLayout";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Mail, MapPin, Phone, Send, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function ContactUsPage() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Get in <span className={`transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>Touch</span>
            </h1>
            <p className={`max-w-2xl mx-auto text-lg transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
                    { icon: Mail, label: "Email us", value: "hello@codegang.com" },
                    { icon: Phone, label: "Call us", value: "+1 (555) 000-0000" },
                    { icon: MapPin, label: "Visit us", value: "123 Innovation Dr,\nTech City, TC 90210" }
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
                >
                  {isOnline ? 'Book Consultation' : 'Authentication Required'}
                </Button>
              </div>
            </motion.div>

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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>First Name</label>
                    <Input
                      placeholder="John"
                      classNames={{
                        inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                          ? "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green"
                          : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                        input: `placeholder:text-zinc-600 ${isOnline ? "text-white" : "text-red-200"}`
                      }}
                      startContent={<User size={18} className={`transition-colors duration-500 ${isOnline ? "text-zinc-500" : "text-red-500/50"}`} />}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Last Name</label>
                    <Input
                      placeholder="Doe"
                      classNames={{
                        inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                          ? "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green"
                          : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                        input: `placeholder:text-zinc-600 ${isOnline ? "text-white" : "text-red-200"}`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Email</label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    classNames={{
                      inputWrapper: `transition-colors h-14 rounded-2xl ${isOnline
                        ? "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green"
                        : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                      input: `placeholder:text-zinc-600 ${isOnline ? "text-white" : "text-red-200"}`
                    }}
                    startContent={<Mail size={18} className={`transition-colors duration-500 ${isOnline ? "text-zinc-500" : "text-red-500/50"}`} />}

                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ml-1 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    minRows={6}
                    classNames={{
                      inputWrapper: `transition-colors rounded-2xl p-4 ${isOnline
                        ? "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green"
                        : "bg-red-950/20 border border-red-900/30 hover:border-red-500/30 focus-within:border-red-500/50"}`,
                      input: `placeholder:text-zinc-600 ${isOnline ? "text-white" : "text-red-200"}`
                    }}

                  />
                </div>

                <Button
                  size="lg"
                  className={`w-full font-bold h-14 rounded-2xl transition-colors ${isOnline
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30"}`}
                  endContent={<Send size={18} />}

                >
                  {isOnline ? 'Send Message' : 'Authentication Required'}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
