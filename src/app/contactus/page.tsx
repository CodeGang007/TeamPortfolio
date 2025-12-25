"use client";

import AppLayout from "@/components/AppLayout";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Mail, MapPin, Phone, Send, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  return (
    <AppLayout>
      <div className="relative min-h-screen w-full overflow-hidden bg-black text-white pt-20 pb-20">

        {/* Abstract 3D Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.img
            src="/3d_ring.png"
            className="absolute top-[15%] right-[8%] w-64 h-64 opacity-20 mix-blend-screen"
            animate={{ rotate: [0, 360], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/3d_blob.png"
            className="absolute bottom-[10%] left-[5%] w-80 h-80 opacity-15 mix-blend-screen"
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
              Get in <span className="text-brand-green">Touch</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
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
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Email us</p>
                      <p className="text-lg font-medium text-white hover:text-brand-green transition-colors cursor-pointer">hello@codegang.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Call us</p>
                      <p className="text-lg font-medium text-white hover:text-brand-green transition-colors cursor-pointer">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Visit us</p>
                      <p className="text-lg font-medium text-white">123 Innovation Dr,<br />Tech City, TC 90210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-green/20 to-zinc-900/50 border border-brand-green/20 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-2 text-white">Ready to start?</h3>
                <p className="text-zinc-400 mb-6">Book a free discovery call to discuss your project requirements.</p>
                <Button className="w-full bg-brand-green text-black font-bold shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                  Book Consultation
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-zinc-900/30 p-8 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">First Name</label>
                    <Input
                      placeholder="John"
                      classNames={{
                        inputWrapper: "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green transition-colors h-14 rounded-2xl",
                        input: "text-white placeholder:text-zinc-600"
                      }}
                      startContent={<User size={18} className="text-zinc-500" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Last Name</label>
                    <Input
                      placeholder="Doe"
                      classNames={{
                        inputWrapper: "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green transition-colors h-14 rounded-2xl",
                        input: "text-white placeholder:text-zinc-600"
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 ml-1">Email</label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    classNames={{
                      inputWrapper: "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green transition-colors h-14 rounded-2xl",
                      input: "text-white placeholder:text-zinc-600"
                    }}
                    startContent={<Mail size={18} className="text-zinc-500" />}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 ml-1">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    minRows={6}
                    classNames={{
                      inputWrapper: "bg-black/50 border border-white/10 hover:border-brand-green/50 focus-within:border-brand-green transition-colors rounded-2xl p-4",
                      input: "text-white placeholder:text-zinc-600"
                    }}
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full bg-white text-black font-bold h-14 rounded-2xl hover:bg-zinc-200 transition-colors"
                  endContent={<Send size={18} />}
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
