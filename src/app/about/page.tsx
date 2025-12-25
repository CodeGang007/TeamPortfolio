"use client";

import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Lock } from "lucide-react";

export default function AboutUsPage() {
  const { isAuthenticated, triggerAuth } = useAuth();
  const isOnline = isAuthenticated;

  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen pt-20">
        <div className={`max-w-4xl mx-auto rounded-3xl p-12 border backdrop-blur-sm transition-all duration-300 ${isOnline
          ? 'bg-zinc-900/50 border-zinc-800'
          : 'bg-red-950/20 border-red-900/30 shadow-[0_0_50px_rgba(220,38,38,0.1)]'
          }`}>
          <h1 className={`text-5xl font-black mb-8 transition-colors duration-300 ${isOnline ? 'text-white' : 'text-red-100'}`}>
            About CodeGang
          </h1>

          <div className={`prose prose-lg dark:prose-invert transition-colors duration-300 ${isOnline ? 'text-zinc-400' : 'text-red-200/60'}`}>
            <p>
              We are a collective of digital innovators, pushing the boundaries of what is possible on the web.
              {!isOnline && " [System Encrypted: Authentication Required for full manifesto]"}
            </p>
            <p className="mt-4">
              Our mission is to build digital experiences that not only function flawlessly but leave a lasting impression.
            </p>
          </div>

          {!isOnline && (
            <div className="mt-12 p-6 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <Lock className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-red-200 mb-2">Restricted Access</h3>
              <p className="text-red-400/70 mb-6 max-w-md">
                Detailed team history and mission statements are classified. Please authenticate to access the archives.
              </p>
              <button
                onClick={() => triggerAuth()}
                className="px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50 transition-colors font-bold"
              >
                Authenticate Now
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

