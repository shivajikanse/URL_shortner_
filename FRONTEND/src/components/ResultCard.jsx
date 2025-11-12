"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function ResultCard({ shortURL, fullURL }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const baseUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000";
      const fullShortURL = `${baseUrl}/${shortURL}`;
      await navigator.clipboard.writeText(fullShortURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-card/50 backdrop-blur-md border border-primary/30 rounded-xl p-6 shadow-2xl"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Your shortened URL
      </h3>

      <div className="space-y-4">
        {fullURL && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs text-muted-foreground mb-2">Original URL</p>
            <p className="text-sm break-all text-foreground/70 font-mono bg-background/50 p-3 rounded-lg border border-primary/20">
              {fullURL}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground mb-2">Short URL</p>
          <div className="flex gap-2">
            <motion.input
              type="text"
              value={shortURL}
              readOnly
              className="flex-1 px-4 py-3 bg-background/50 border border-primary/30 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              whileHover={{ borderColor: "rgba(147, 51, 234, 0.6)" }}
            />
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-4 hover:border-primary/60 transition-colors"
        >
          <p className="text-sm text-foreground">
            ✅ Your link is ready to share! You can now use it anywhere.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
