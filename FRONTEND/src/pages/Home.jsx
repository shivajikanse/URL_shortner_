"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header.jsx";
import Hero from "../components/Hero";
import URLForm from "../components/URLForm";
import ResultCard from "../components/ResultCard";
import Footer from "../components/Footer";
import FloatingParticles from "../components/FloatingParticles";

import { createShortURL } from "../lib/api";

export default function Home() {
  const [shortURL, setShortURL] = useState(null);
  const [fullURL, setFullURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShortenURL = async (url) => {
    setIsLoading(true);
    setError(null);
    setShortURL(null);

    try {
      const result = await createShortURL(url);
      setShortURL(result.short_url);
      setFullURL(result.full_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Particles */}
      <FloatingParticles />

      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      {/* <Hero /> */}

      {/* URL Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto px-4 py-12 relative z-10"
      >
        <URLForm onSubmit={handleShortenURL} isLoading={isLoading} />
      </motion.div>

      {/* Errors */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto px-4 mb-6 relative z-10"
        >
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
            {error}
          </div>
        </motion.div>
      )}

      {/* Shortened URL Result */}
      {shortURL && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto px-4 mb-12 relative z-10"
        >
          <ResultCard shortURL={shortURL} fullURL={fullURL} />
        </motion.div>
      )}

      {/* Footer */}
      {/* <Footer /> */}
    </main>
  );
}
