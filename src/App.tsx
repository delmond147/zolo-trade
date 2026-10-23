/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  Search,
  LayoutDashboard,
  Crosshair,
  LogOut,
  Wallet,
  Users,
  Settings,
  Sun,
  Bell,
  Globe,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Clock,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Check,
  Sliders,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { PageId, WalletState } from './types';
import { WalletModal } from './components/WalletModal';
import { SnipeTerminalModal } from './components/SnipeTerminalModal';
import { FeaturesPage } from './components/FeaturesPage';
import { AdvantagePage } from './components/AdvantagePage';
import { ReferralPage } from './components/ReferralPage';
import { FaqPage } from './components/FaqPage';
import { HomeSections } from './components/HomeSections';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('Home');
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const [selectedDay, setSelectedDay] = useState(3);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: string; date: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showTerminalModal, setShowTerminalModal] = useState(false);

  const [walletState, setWalletState] = useState<WalletState>({
    connected: true,
    address: '0x3f4…9c7e',
    chain: 'Ethereum & Solana Dual-RPC',
    balanceEth: '4.82 ETH',
    balanceSol: '142.6 SOL',
  });

  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Screen resize and scaling calculation for Home stage
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 900 || vh > vw;
      setIsMobile(mobile);

      if (!mobile) {
        // Design stage is 1672 x 941
        const s = Math.min(vw / 1672, vh / 941);
        setScale(s);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stars canvas renderer (static procedural dots per prompt constraint)
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      ctx.clearRect(0, 0, width, height);

      // Deterministic pseudo-random star field
      const starCount = Math.floor((width * height) / 7500);
      let seed = 42;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      for (let i = 0; i < starCount; i++) {
        const x = random() * width;
        const y = random() * height;
        const radius = random() < 0.85 ? random() * 0.9 + 0.3 : random() * 1.5 + 0.8;
        const alpha = random() * 0.65 + 0.15;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle faint violet tint on ~12% of stars
        if (random() > 0.88) {
          ctx.beginPath();
          ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 100, 255, ${alpha * 0.4})`;
          ctx.fill();
        }
      }
    };

    renderStars();
    window.addEventListener('resize', renderStars);
    return () => window.removeEventListener('resize', renderStars);
  }, []);

  // Procedural Fallback Canvas for Planet Rim
  useEffect(() => {
    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFallback = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = -h * 0.25;
      const radius = w * 0.62;

      // 1. Ambient atmospheric glow
      const ambientGrad = ctx.createRadialGradient(centerX, centerY + radius, radius * 0.05, centerX, centerY + radius, radius * 0.9);
      ambientGrad.addColorStop(0, 'rgba(160, 32, 255, 0.45)');
      ambientGrad.addColorStop(0.3, 'rgba(122, 28, 248, 0.25)');
      ambientGrad.addColorStop(0.6, 'rgba(70, 10, 160, 0.1)');
      ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Radiating light streaks down into space
      ctx.save();
      const numRays = 72;
      for (let i = 0; i < numRays; i++) {
        const angle = Math.PI * 0.15 + (i / numRays) * Math.PI * 0.7;
        const rayLen = 220 + ((i * 13) % 180);
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;
        const endX = centerX + Math.cos(angle) * (radius + rayLen);
        const endY = centerY + Math.sin(angle) * (radius + rayLen);

        const rayGrad = ctx.createLinearGradient(startX, startY, endX, endY);
        const rayOpacity = 0.08 + (((i * 7) % 10) / 10) * 0.2;
        rayGrad.addColorStop(0, `rgba(200, 130, 255, ${rayOpacity})`);
        rayGrad.addColorStop(0.5, `rgba(147, 18, 255, ${rayOpacity * 0.4})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 1.5 + ((i % 3) * 0.8);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Bright glowing planet rim arc
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(147, 18, 255, 0.8)';
      ctx.lineWidth = 14;
      ctx.shadowColor = '#a020ff';
      ctx.shadowBlur = 35;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // 4. Stardust particles along rim
      ctx.save();
      let pSeed = 101;
      const pRandom = () => {
        pSeed = (pSeed * 16807) % 2147483647;
        return (pSeed - 1) / 2147483646;
      };
      for (let p = 0; p < 240; p++) {
        const theta = Math.PI * 0.2 + pRandom() * Math.PI * 0.6;
        const dist = radius + (pRandom() - 0.2) * 90;
        const px = centerX + Math.cos(theta) * dist;
        const py = centerY + Math.sin(theta) * dist;
        const pr = pRandom() * 1.5 + 0.5;
        const pAlpha = pRandom() * 0.7 + 0.15;

        ctx.fillStyle = pRandom() > 0.5 ? `rgba(230, 180, 255, ${pAlpha})` : `rgba(255, 255, 255, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    renderFallback();
  }, [currentPage]);

  // Chart data points
  const chartPoints = [
    { x: 30, y: 70, val: '$14,200', date: 'Jan 02' },
    { x: 90, y: 64, val: '$18,500', date: 'Jan 05' },
    { x: 150, y: 80, val: '$11,900', date: 'Jan 09' },
    { x: 210, y: 55, val: '$22,400', date: 'Jan 13' },
    { x: 270, y: 60, val: '$19,800', date: 'Jan 16' },
    { x: 330, y: 78, val: '$13,200', date: 'Jan 20' },
    { x: 390, y: 40, val: '$32,100', date: 'Jan 23' },
    { x: 450, y: 22, val: '$46,800', date: 'Jan 26' },
    { x: 510, y: 28, val: '$41,200', date: 'Jan 28' },
    { x: 570, y: 35, val: '$36,500', date: 'Jan 31' },
  ];

  return (
    <div className="relative w-screen min-h-screen bg-black text-[#f7f7f8] overflow-x-hidden select-none flex flex-col justify-start items-center">
      {/* 1. Global Background Starfield Canvas */}
      <canvas
        ref={starCanvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#14121f]/95 border border-[#9312ff]/50 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(147,18,255,0.4)] flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#a020ff]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Web3 Wallet Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        walletState={walletState}
        setWalletState={setWalletState}
        onShowToast={showToast}
      />

      {/* Snipe Terminal Simulator Modal */}
      <SnipeTerminalModal
        isOpen={showTerminalModal}
        onClose={() => setShowTerminalModal(false)}
        walletState={walletState}
        onShowToast={showToast}
      />

      {/* ============================================================ */}
      {/* GLOBAL TOP NAVIGATION BAR (Visible across all views) */}
      {/* ============================================================ */}
      <header className="relative z-30 w-full max-w-[1520px] px-6 sm:px-8 pt-6 flex items-center justify-between animate-nav-in">
        {/* Brand Wordmark & Lightning Bolt Logo */}
        <button
          onClick={() => handleNavigate('Home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9312ff] to-[#c164ff] flex items-center justify-center shadow-[0_0_18px_rgba(160,32,255,0.7)] group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:inline-block">
            Zolo
          </span>
        </button>

        {/* Centred Navigation Menu: Home · Features · Zolo Advantage · Referral · FAQ */}
        {!isMobile ? (
          <nav className="flex items-center gap-1.5 bg-[#12101a]/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            {(['Home', 'Features', 'Zolo Advantage', 'Referral', 'FAQ'] as PageId[]).map((item) => {
              const isActive = currentPage === item;
              return (
                <button
                  key={item}
                  onClick={() => handleNavigate(item)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#221f2f] text-white border border-white/10 shadow-sm'
                      : 'text-[#8b8988] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        ) : (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#171424] border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Right Action: Get Started Button / Connected Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTerminalModal(true)}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#181328] hover:bg-[#221b3a] text-xs font-semibold text-purple-200 border border-[#9312ff]/30 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#b546ff]" />
            <span>Quick Snipe</span>
          </button>
          <button
            onClick={() => setShowWalletModal(true)}
            className="bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 text-white font-medium text-sm px-6 py-2 rounded-full glow-btn-violet transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {walletState.connected ? walletState.address : 'Get Started'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="w-full px-6 py-4 bg-[#110e1c] border-b border-[#9312ff]/30 z-30 flex flex-col gap-2">
          {(['Home', 'Features', 'Zolo Advantage', 'Referral', 'FAQ'] as PageId[]).map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                currentPage === item ? 'bg-[#252033] text-white font-semibold' : 'text-[#8b8988] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowTerminalModal(true);
              }}
              className="w-full py-2 bg-[#201a35] text-xs font-medium text-white rounded-lg border border-[#9312ff]/30"
            >
              Quick Snipe
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW CONDITIONAL RENDERING */}
      {/* ============================================================ */}

      {/* 1. HOME VIEW: Iconic Royal Violet Cosmic Hero & Dashboard + Extended Informative Sections */}
      {currentPage === 'Home' && (
        <>
          <div
            className="w-full flex justify-center overflow-visible"
            style={!isMobile ? { height: `${941 * scale}px` } : {}}
          >
            <div
              ref={stageRef}
          style={
            !isMobile
              ? {
                  width: '1672px',
                  height: '941px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  position: 'relative',
                }
              : {
                  width: '100%',
                  maxWidth: '100vw',
                  position: 'relative',
                }
          }
          className="z-10 flex flex-col justify-start items-center"
        >
          {/* Planet Rim Layer (Top 1672 x 717 design px) */}
          <div className="absolute top-0 left-0 w-full h-[717px] pointer-events-none overflow-hidden z-0">
            <canvas
              ref={fallbackCanvasRef}
              width={1672}
              height={717}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1672px] h-[717px] object-cover transition-opacity duration-700 ${
                videoLoaded && !videoError && !isMobile ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {!isMobile && (
              <video
                ref={videoRef}
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e859f229-8ebd-43fb-a5a0-58006ba75327.mp4"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoError(true)}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1672px] h-[717px] object-cover mix-blend-screen transition-opacity duration-800 ${
                  videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
          </div>

          {/* Hero Headline & CTA */}
          <section className="relative z-20 w-full max-w-[1280px] px-6 pt-16 md:pt-20 pb-8 flex flex-col items-center text-center">
            <h1 className="font-extrabold tracking-tight leading-[1.08] text-center">
              <span className="block text-[42px] sm:text-[60px] md:text-[76px] lg:text-[84px] animate-headline-line-1">
                <span className="bg-gradient-to-r from-[#b546ff] via-[#9312ff] to-[#a020ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(160,32,255,0.7)]">
                  Zolo
                </span>{' '}
                <span className="text-white">Trade Smarter,</span>
              </span>
              <span className="block text-[42px] sm:text-[60px] md:text-[76px] lg:text-[84px] text-white animate-headline-line-2">
                Faster, Safer.
              </span>
            </h1>

            <p className="mt-5 text-[#8b8988] text-sm sm:text-base md:text-[17px] max-w-2xl leading-relaxed animate-lede text-balance">
              The first fully integrated on-chain trading experience. No dashboards, no delays — Zolo empowers you
              to trade directly from your favorite DeFi apps and terminals.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4 animate-buttons flex-wrap">
              <button
                onClick={() => setShowTerminalModal(true)}
                className="bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 text-white font-medium text-sm sm:text-[15px] px-7 py-3 rounded-full glow-btn-violet transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Get Started</span>
              </button>
              <button
                onClick={() => handleNavigate('Features')}
                className="bg-[#18181c] hover:bg-[#222228] text-white font-medium text-sm sm:text-[15px] px-7 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Learn More
              </button>
            </div>
          </section>

          {/* Dashboard Panel Section (1204px wide, y=651 design px) */}
          <section
            className={`relative z-20 w-full max-w-[1204px] px-4 md:px-0 animate-dashboard transition-all ${
              !isMobile ? 'mt-4' : 'mt-8 pb-16'
            }`}
          >
            {/* Dashboard Glow Overlay Strip */}
            <div className="relative w-full">
              <img
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e0e14572-12e1-4c08-b471-a21521844945.png"
                alt=""
                aria-hidden="true"
                className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-[1240px] max-w-none h-[110px] pointer-events-none mix-blend-screen opacity-90 z-20"
              />
            </div>

            {/* Glass Container */}
            <div className="relative w-full rounded-[14px] bg-[#0c0a13]/95 backdrop-blur-2xl border border-[#9312ff]/40 shadow-[0_-15px_60px_rgba(147,18,255,0.25)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c664ff] via-50% to-transparent shadow-[0_0_16px_#9312ff] z-30" />
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#9312ff]/10 via-[#9312ff]/5 to-transparent pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
                {/* SIDEBAR */}
                <aside className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/5 p-4 sm:p-5 flex flex-col justify-between animate-dash-sidebar">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-[#9312ff]/20 border border-[#9312ff]/50 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-[#b546ff]" />
                        </div>
                        <span className="font-semibold text-sm tracking-tight text-white">Zolo</span>
                      </div>
                      <button
                        onClick={() => showToast('Preferences & RPC settings')}
                        className="text-[#8b8988] hover:text-white p-1 rounded transition-colors"
                        aria-label="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => showToast('Filter tokens & addresses')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8b8988] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Search className="w-4 h-4 text-[#8b8988]" />
                        <span>Search</span>
                      </button>

                      <button
                        onClick={() => setActiveSidebar('Dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                          activeSidebar === 'Dashboard'
                            ? 'bg-[#211b33] text-white border border-[#9312ff]/40 shadow-[0_0_12px_rgba(147,18,255,0.2)]'
                            : 'text-[#8b8988] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#a020ff]" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSidebar('Snipes');
                          setShowTerminalModal(true);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                          activeSidebar === 'Snipes'
                            ? 'bg-[#211b33] text-white border border-[#9312ff]/40 shadow-[0_0_12px_rgba(147,18,255,0.2)]'
                            : 'text-[#8b8988] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Crosshair className="w-4 h-4 text-[#8b8988]" />
                        <span>Snipes</span>
                      </button>

                      <button
                        onClick={() => {
                          setWalletState((prev) => ({ ...prev, connected: false }));
                          showToast('Wallet disconnected');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8b8988] hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#8b8988]" />
                        <span>Disconnect</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <button
                        onClick={() => setShowWalletModal(true)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8b8988] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Wallet className="w-4 h-4 text-[#8b8988]" />
                        <span>Wallets</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('Referral')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8b8988] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Users className="w-4 h-4 text-[#8b8988]" />
                        <span>Referral</span>
                      </button>

                      <button
                        onClick={() => showToast('Low-latency RPC settings')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8b8988] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Sliders className="w-4 h-4 text-[#8b8988]" />
                        <span>Settings</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 p-3 rounded-xl bg-gradient-to-b from-[#1b152d] to-[#120e20] border border-[#9312ff]/30 shadow-inner">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#a020ff]" /> Zolo Pro
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
                    </div>
                    <p className="text-[11px] text-[#8b8988] mb-3 leading-tight">
                      Sub-100ms routing & frontrun MEV shields enabled.
                    </p>
                    <button
                      onClick={() => showToast('Zolo Pro tier active')}
                      className="w-full py-1.5 px-3 bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] hover:brightness-110 text-white text-xs font-medium rounded-full shadow-[0_0_12px_rgba(147,18,255,0.4)] transition-all cursor-pointer"
                    >
                      Upgrade
                    </button>
                  </div>
                </aside>

                {/* CENTER AREA */}
                <div className="md:col-span-6 p-4 sm:p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast('Low latency mode: ON')}
                        className="p-1.5 rounded-lg bg-white/5 text-[#8b8988] hover:text-white hover:bg-white/10 transition-colors"
                        title="Latency Status"
                      >
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => showToast('No unread alerts')}
                        className="p-1.5 rounded-lg bg-white/5 text-[#8b8988] hover:text-white hover:bg-white/10 transition-colors relative"
                        title="Alerts"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#9312ff]" />
                      </button>
                      <button
                        onClick={() => showToast('Execution latency 0.04s')}
                        className="p-1.5 rounded-lg bg-white/5 text-[#8b8988] hover:text-white hover:bg-white/10 transition-colors"
                        title="Latency history"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => showToast('Theme: Royal Violet Obsidian')}
                        className="text-[#8b8988] hover:text-white p-1"
                      >
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => showToast('Connected to Flashbots & Jito Mainnets')}
                        className="text-[#8b8988] hover:text-white p-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </button>
                      <div
                        onClick={() => setShowWalletModal(true)}
                        className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer group"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9312ff] to-[#45b558] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                          AT
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-semibold text-white group-hover:text-[#b546ff] transition-colors leading-none">
                            Alex T.
                          </div>
                          <div className="text-[10px] font-mono text-[#8b8988] leading-none mt-0.5">
                            {walletState.connected ? walletState.address : 'Disconnected'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-dash-stats">
                    <div className="p-3.5 rounded-xl bg-[#141120]/80 border border-white/5 hover:border-[#9312ff]/30 transition-all">
                      <div className="flex items-center justify-between text-[#8b8988] mb-1">
                        <span className="text-[11px]">Revenue generated (since inception)</span>
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                          <Wallet className="w-2.5 h-2.5 text-[#8b8988]" />
                        </div>
                      </div>
                      <div className="text-xl font-bold tracking-tight text-white font-mono tabular-nums">
                        214,402
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                        <span className="text-[#45b558] font-semibold flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> +12.5%
                        </span>
                        <span className="text-[#8b8988]">Compared to previous month</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141120]/80 border border-white/5 hover:border-[#9312ff]/30 transition-all">
                      <div className="flex items-center justify-between text-[#8b8988] mb-1">
                        <span className="text-[11px]">Active wallets/users</span>
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                          <Users className="w-2.5 h-2.5 text-[#8b8988]" />
                        </div>
                      </div>
                      <div className="text-xl font-bold tracking-tight text-white font-mono tabular-nums">
                        6412
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                        <span className="text-[#f03b2a] font-semibold flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" /> −3.1%
                        </span>
                        <span className="text-[#8b8988]">Compared to previous month</span>
                      </div>
                    </div>
                  </div>

                  {/* Area Chart */}
                  <div className="mt-4 pt-3 border-t border-white/5 animate-dash-chart">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-white flex items-center gap-1">
                        Daily dynamics of sales <ChevronRight className="w-3.5 h-3.5 text-[#8b8988]" />
                      </span>
                      <span className="text-[11px] text-[#8b8988] font-mono">Volume (USD)</span>
                    </div>

                    <div className="relative w-full h-[140px] pt-2">
                      <svg
                        viewBox="0 0 600 120"
                        preserveAspectRatio="none"
                        className="w-full h-full overflow-visible"
                      >
                        <defs>
                          <linearGradient id="violet-area-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9312ff" stopOpacity="0.55" />
                            <stop offset="50%" stopColor="#7a1cf8" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#9312ff" stopOpacity="0.0" />
                          </linearGradient>
                          <filter id="violet-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                        <path
                          d="M 30 70 C 60 70, 75 64, 90 64 C 120 64, 135 80, 150 80 C 180 80, 195 55, 210 55 C 240 55, 255 60, 270 60 C 300 60, 315 78, 330 78 C 360 78, 375 40, 390 40 C 420 40, 435 22, 450 22 C 480 22, 495 28, 510 28 C 540 28, 555 35, 570 35 L 570 120 L 30 120 Z"
                          fill="url(#violet-area-grad)"
                        />

                        <path
                          d="M 30 70 C 60 70, 75 64, 90 64 C 120 64, 135 80, 150 80 C 180 80, 195 55, 210 55 C 240 55, 255 60, 270 60 C 300 60, 315 78, 330 78 C 360 78, 375 40, 390 40 C 420 40, 435 22, 450 22 C 480 22, 495 28, 510 28 C 540 28, 555 35, 570 35"
                          fill="none"
                          stroke="#b84dff"
                          strokeWidth="2.5"
                          filter="url(#violet-glow)"
                        />

                        {chartPoints.map((pt, i) => (
                          <g key={i} className="cursor-pointer">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={hoveredPoint?.date === pt.date ? 5 : 3}
                              fill="#ffffff"
                              stroke="#9312ff"
                              strokeWidth="2"
                              className="transition-all"
                              onMouseEnter={() => setHoveredPoint(pt)}
                              onMouseLeave={() => setHoveredPoint(null)}
                            />
                          </g>
                        ))}
                      </svg>

                      {hoveredPoint && (
                        <div
                          className="absolute pointer-events-none bg-[#1c182e] border border-[#9312ff]/50 px-2.5 py-1 rounded-md text-[11px] shadow-lg transform -translate-x-1/2 -translate-y-8 z-20"
                          style={{
                            left: `${(hoveredPoint.x / 600) * 100}%`,
                            top: `${(hoveredPoint.y / 120) * 100}%`,
                          }}
                        >
                          <span className="font-semibold text-white">{hoveredPoint.val}</span>
                          <span className="text-[#8b8988] ml-1.5">{hoveredPoint.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CALENDAR & METRIC ROWS */}
                <div className="md:col-span-3 p-4 sm:p-5 flex flex-col justify-between animate-dash-calendar">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="font-semibold text-xs text-white">January 2024</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => showToast('Previous month')}
                          className="text-[#8b8988] hover:text-white p-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => showToast('Next month')}
                          className="text-[#8b8988] hover:text-white p-1"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#8b8988] font-medium mt-2.5 mb-1.5">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                        <div key={d}>{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
                      {[1, 2, 2, 3, 4, 5, 6].map((day, idx) => {
                        const isSelected = selectedDay === day && idx === 3;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedDay(day);
                              showToast(`Snipes filtered for Jan ${day}, 2024`);
                            }}
                            className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-[11px] transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#292240] text-white font-bold border border-[#9312ff]/60 shadow-[0_0_10px_rgba(147,18,255,0.4)]'
                                : 'text-[#8b8988] hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[11px] text-[#8b8988] pb-2 border-b border-white/5">
                      <span>Start date–Now (monthly)</span>
                      <CalendarIcon className="w-3 h-3 text-[#8b8988]" />
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141120] border border-white/5">
                        <span className="text-xs text-[#8b8988]">Total snipes</span>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="font-semibold text-white">1,284</span>
                          <span className="text-[#45b558] font-medium text-[11px]">+8.4%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141120] border border-white/5">
                        <span className="text-xs text-[#8b8988]">Avg. execution</span>
                        <span className="font-mono text-xs font-semibold text-white">0.42s</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141120] border border-white/5">
                        <span className="text-xs text-[#8b8988]">Win rate</span>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="font-semibold text-white">68.2%</span>
                          <span className="text-[#45b558] font-medium text-[11px]">+2.1%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8b8988]">
                    <span className="text-[#8b8988]">Connected apps:</span>
                    <span className="text-white font-medium">Charting · Terminals</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-8 pointer-events-none" />
        </div>
      </div>

          {/* Additional Informative Sections for Home */}
          <HomeSections
            onNavigate={handleNavigate}
            onOpenTerminal={() => setShowTerminalModal(true)}
            onOpenWallet={() => setShowWalletModal(true)}
            onShowToast={showToast}
          />
        </>
      )}

      {/* 2. FEATURES VIEW */}
      {currentPage === 'Features' && (
        <FeaturesPage
          onOpenTerminal={() => setShowTerminalModal(true)}
          onOpenWallet={() => setShowWalletModal(true)}
          onShowToast={showToast}
        />
      )}

      {/* 3. ZOLO ADVANTAGE VIEW */}
      {currentPage === 'Zolo Advantage' && (
        <AdvantagePage
          onOpenTerminal={() => setShowTerminalModal(true)}
          onOpenWallet={() => setShowWalletModal(true)}
          onShowToast={showToast}
        />
      )}

      {/* 4. REFERRAL VIEW */}
      {currentPage === 'Referral' && (
        <ReferralPage
          walletState={walletState}
          onOpenWallet={() => setShowWalletModal(true)}
          onShowToast={showToast}
        />
      )}

      {/* 5. FAQ VIEW */}
      {currentPage === 'FAQ' && (
        <FaqPage
          onOpenTerminal={() => setShowTerminalModal(true)}
          onOpenWallet={() => setShowWalletModal(true)}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================ */}
      {/* PROTOCOL FOOTER */}
      {/* ============================================================ */}
      <Footer onNavigate={handleNavigate} onShowToast={showToast} />
    </div>
  );
}
