"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import FloatingCard from "../components/FloatingParticles.jsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Hero />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FloatingCard
              icon="🔗"
              title="Total Links"
              description="URLs you've shortened"
              delay="0s"
            />
            <FloatingCard
              icon="📊"
              title="Total Clicks"
              //   value={stats.totalClicks}
              description="Total click traffic"
              delay="0.2s"
            />
            <FloatingCard
              icon="⚡"
              title="Avg Clicks"
              //   value={stats.averageClicks}
              description="Average clicks per link"
              delay="0.4s"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
