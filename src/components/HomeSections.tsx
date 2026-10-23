/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Zap,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  Terminal,
  Cpu,
  Lock,
  CheckCircle2,
  Sliders,
  DollarSign,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Radio,
  Clock,
  EyeOff
} from 'lucide-react';
import { PageId } from '../types';

interface HomeSectionsProps {
  onNavigate: (page: PageId) => void;
  onOpenTerminal: () => void;
  onOpenWallet: () => void;
  onShowToast: (msg: string) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  onNavigate,
  onOpenTerminal,
  onOpenWallet,
  onShowToast,
}) => {
  // Interactive Execution Pipeline Step
  const [activeStep, setActiveStep] = useState<number>(1);

  // Terminal Simulator State
  const [terminalOrderType, setTerminalOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [terminalAmount, setTerminalAmount] = useState('1.0');
  const [hotkeyLogs, setHotkeyLogs] = useState<string[]>([
    'Zolo HUD loaded. Listening on [B] and [S] hotkeys...',
    'DexScreener chart hook attached: SOL/USDC (Raydium v2)',
  ]);

  const handleSimulateHotkey = (action: 'BUY' | 'SELL', amt: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] ${action} ${amt} SOL triggered via Hotkey. Flashbots private relay confirmed (28ms).`;
    setHotkeyLogs((prev) => [newLog, ...prev.slice(0, 3)]);
    onShowToast(`Simulated ${action} ${amt} SOL via hotkey in 28ms!`);
  };

  const ecosystems = [
    { name: 'Ethereum', symbol: 'ETH', gas: '14 Gwei', latency: '18ms', relay: 'Flashbots + Titan', color: '#627EEA' },
    { name: 'Solana', symbol: 'SOL', gas: '0.000005 SOL', latency: '22ms', relay: 'Jito Bundle #94', color: '#14F195' },
    { name: 'Base', symbol: 'BASE', gas: '0.002 Gwei', latency: '9ms', relay: 'Coinbase Fastblocks', color: '#0052FF' },
    { name: 'Arbitrum One', symbol: 'ARB', gas: '0.1 Gwei', latency: '14ms', relay: 'Nitro Optical Node', color: '#28A0F0' },
    { name: 'BSC', symbol: 'BNB', gas: '1.1 Gwei', latency: '26ms', relay: 'bloXroute Private', color: '#F3BA2F' },
  ];

  const testimonials = [
    {
      name: 'Elena Rostova',
      handle: '@ElenaDeFi',
      role: 'Head of Execution, Apex Quant Fund',
      content: 'We migrated our volume away from standard nodes to Zolo. Our average slippage dropped by 2.1% across 14,000 monthly orders, saving over $85,000 in predatory sandwich attacks in our first quarter.',
      volume: '$12.4M Volume',
      stat: '0 Failed Gas Reverts',
    },
    {
      name: 'Marcus Vance',
      handle: '@VanceTrades',
      role: 'Solana Alpha Lead',
      content: 'Trading high-beta launches directly through DexScreener with Zolo hotkeys is unbeatable. You get sub-block Jito inclusion while everyone else is getting throttled by public RPC rate limits.',
      volume: '$4.8M Volume',
      stat: '28ms Avg Block Inclusion',
    },
    {
      name: 'Kaito Takahashi',
      handle: '@KaitoCapital',
      role: 'DeFi Systems Architect',
      content: 'The zero-revert guarantee is real. On Uniswap V3, failed high-gas transactions used to cost us hundreds of dollars daily. With Zolo, if liquidity is lost, the bundle is dropped off-chain for $0.',
      volume: '$18.9M Volume',
      stat: '100% Non-Custodial',
    },
  ];

  return (
    <div className="w-full max-w-[1400px] px-6 py-12 space-y-24 relative z-20">
      {/* ============================================================ */}
      {/* 1. PROTOCOL METRICS STRIP */}
      {/* ============================================================ */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#120e22] via-[#0d0a16] to-[#120e22] border border-[#9312ff]/30 shadow-[0_0_40px_rgba(147,18,255,0.18)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="pt-4 md:pt-0 md:px-4">
            <div className="text-xs text-[#8b8988]">24h Protocol Volume</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
              $148.9M
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs previous day
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:px-4">
            <div className="text-xs text-[#8b8988]">Private Relay Latency</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#c471ff] mt-1">
              38.4ms
            </div>
            <div className="text-xs text-gray-400 mt-1 font-mono">
              99.8% first-slot rate
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:px-4">
            <div className="text-xs text-[#8b8988]">MEV Attacks Defended</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
              48,210
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-medium">
              $5.4M+ user alpha saved
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:px-4">
            <div className="text-xs text-[#8b8988]">Co-located Validator Nodes</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
              14 Hubs
            </div>
            <div className="text-xs text-gray-400 mt-1 font-mono">
              Zero public mempool leak
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE 3-STEP EXECUTION PIPELINE */}
      {/* ============================================================ */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" /> Execution Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Zolo Outperforms Standard Wallets
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8b8988] leading-relaxed">
            Public transactions leak alpha to toxic front-running bots. Zolo constructs private atomic bundles
            verified directly with block leaders.
          </p>
        </div>

        {/* 3 Steps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: 'Local Hotkey Trigger',
              subtitle: 'Zero-Popup Signing',
              desc: 'Execute trades directly from TradingView or DexScreener using instant keystrokes. Transactions are signed locally with zero popup delay.',
              icon: Terminal,
              code: 'User presses [B] → Local ECDSA signature created in 2.1ms',
            },
            {
              step: 2,
              title: 'Private Optical Relay',
              subtitle: 'Encrypted Flashbots & Jito Bundling',
              desc: 'Your signed order bypasses the public mempool entirely. It travels via dark fiber directly into private block builder queues.',
              icon: EyeOff,
              code: 'Bundle #419 encrypted → Dispatched to Titan & Jito leaders',
            },
            {
              step: 3,
              title: 'Atomic Multi-Pool Settlement',
              subtitle: 'Zero Slippage · Zero Failed Gas',
              desc: 'Liquidity is mathematically split across 40+ pools. If conditions shift or sandwich bots detect the trade, it drops off-chain at $0 cost.',
              icon: Shield,
              code: 'Block #1984210 confirmed → $0 failed gas · 100% alpha saved',
            },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeStep === item.step;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#150f29] border-[#9312ff] shadow-[0_0_30px_rgba(147,18,255,0.3)] ring-1 ring-[#9312ff]'
                    : 'bg-[#0c0a13] border-white/5 hover:border-[#9312ff]/40 hover:bg-[#110e1e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#20173d] border border-[#9312ff]/40 flex items-center justify-center text-[#c471ff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#8b8988]">STEP 0{item.step}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <div className="text-xs text-[#c471ff] font-medium mt-0.5">{item.subtitle}</div>
                  <p className="mt-3 text-xs sm:text-sm text-[#8b8988] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px] text-gray-400 bg-black/40 p-2.5 rounded-lg border border-white/5">
                  <span className="text-emerald-400">➜</span> {item.code}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE TERMINAL HUD & HOTKEY DEMO */}
      {/* ============================================================ */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#0c0a13] border border-[#9312ff]/30 shadow-[0_0_50px_rgba(147,18,255,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5" /> Embedded Browser HUD
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trade On Your Charts Without Switching Tabs
            </h2>
            <p className="text-xs sm:text-sm text-[#8b8988] leading-relaxed">
              Never miss a breakout waiting for wallet popups. Zolo injects a translucent execution HUD
              directly into DexScreener, TradingView, Birdeye, and Photon.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#45b558]" />
                <span>Custom single-key buy & sell hotkeys</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#45b558]" />
                <span>Preset slippage (0.1%) & automatic gas bidding</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#45b558]" />
                <span>Instant visual feedback on candle charts</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={onOpenTerminal}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] hover:brightness-110 text-white text-xs font-semibold shadow-[0_0_15px_rgba(147,18,255,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Launch Quick Terminal</span>
              </button>
            </div>
          </div>

          {/* Interactive HUD Mockup */}
          <div className="lg:col-span-7 bg-[#120e20] border border-[#9312ff]/40 rounded-xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">SOL/USDC (Raydium CLMM)</span>
                <span className="text-[#8b8988]">$184.42</span>
                <span className="text-emerald-400">+18.4%</span>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">Zolo HUD Active</span>
            </div>

            {/* Simulated Mini Chart SVG */}
            <div className="h-32 w-full my-3 relative">
              <svg viewBox="0 0 500 100" className="w-full h-full">
                <defs>
                  <linearGradient id="hud-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#45b558" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#45b558" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <path
                  d="M 10 80 L 60 75 L 120 85 L 180 60 L 240 68 L 300 45 L 360 40 L 420 22 L 490 15 L 490 100 L 10 100 Z"
                  fill="url(#hud-chart-grad)"
                />
                <path
                  d="M 10 80 L 60 75 L 120 85 L 180 60 L 240 68 L 300 45 L 360 40 L 420 22 L 490 15"
                  fill="none"
                  stroke="#45b558"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Interactive HUD Trigger Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => handleSimulateHotkey('BUY', '0.5')}
                className="p-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>[B] Buy 0.5 SOL</span>
                <span className="font-mono text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Hotkey</span>
              </button>

              <button
                onClick={() => handleSimulateHotkey('BUY', '2.0')}
                className="p-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>[B2] Buy 2 SOL</span>
                <span className="font-mono text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Hotkey</span>
              </button>

              <button
                onClick={() => handleSimulateHotkey('SELL', '50%')}
                className="p-2.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-400 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>[S] Sell 50%</span>
                <span className="font-mono text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded">Hotkey</span>
              </button>

              <button
                onClick={() => handleSimulateHotkey('SELL', '100%')}
                className="p-2.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-400 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>[S!] Panic Dump</span>
                <span className="font-mono text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded">Hotkey</span>
              </button>
            </div>

            {/* Live Terminal Log Stream */}
            <div className="mt-3 p-2.5 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] text-gray-400 space-y-1">
              {hotkeyLogs.map((log, i) => (
                <div key={i} className="truncate">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SUPPORTED ECOSYSTEMS & MULTI-CHAIN COVERAGE */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" /> High-Throughput Routing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Supported Chains & Liquidity Networks
            </h2>
            <p className="text-xs sm:text-sm text-[#8b8988] mt-1">
              Direct private RPC connections across EVM and Solana with unified gas refuel.
            </p>
          </div>
          <button
            onClick={() => onNavigate('Features')}
            className="text-xs font-semibold text-[#c471ff] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Explore all 40+ integrated DEXs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ecosystems.map((eco) => (
            <div
              key={eco.name}
              className="p-4 rounded-xl bg-[#0c0a13] border border-white/5 hover:border-[#9312ff]/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-white group-hover:text-[#c471ff] transition-colors">
                  {eco.name}
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                  {eco.symbol}
                </span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#8b8988]">
                  <span>Gas:</span>
                  <span className="text-white">{eco.gas}</span>
                </div>
                <div className="flex justify-between text-[#8b8988]">
                  <span>Node:</span>
                  <span className="text-emerald-400">{eco.latency}</span>
                </div>
                <div className="text-[10px] text-gray-500 pt-1 border-t border-white/5 truncate">
                  {eco.relay}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. VERIFIED ON-CHAIN REVIEWS & SOCIAL PROOF */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Trusted By Top On-Chain Desks
          </h2>
          <p className="text-xs sm:text-sm text-[#8b8988] mt-2">
            See how high-volume crypto traders and funds protect their trading alpha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0c0a13] border border-white/5 hover:border-[#9312ff]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <span className="text-xs text-[#8b8988]">{t.handle}</span>
                  </div>
                  <span className="text-[10px] text-[#c471ff] font-mono bg-[#9312ff]/15 px-2 py-0.5 rounded border border-[#9312ff]/30">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">{t.volume}</span>
                <span className="text-emerald-400 font-semibold">{t.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#170e2f] via-[#100b21] to-[#1a1033] border border-[#9312ff]/50 shadow-[0_0_60px_rgba(147,18,255,0.3)] relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9312ff]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-5 relative z-10">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#9312ff] to-[#c164ff] flex items-center justify-center shadow-[0_0_25px_#9312ff]">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Trade at the Speed of Blocks?
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Connect your self-custodial wallet and start trading with sub-50ms private routing, zero toxic sandwich attacks, and zero failed gas fees.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
            <button
              onClick={onOpenTerminal}
              className="px-8 py-3.5 bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 active:scale-95 text-white font-bold text-sm rounded-full glow-btn-violet transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Zolo Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenWallet}
              className="px-8 py-3.5 bg-[#171324] hover:bg-[#201c33] active:scale-95 text-white font-semibold text-sm rounded-full border border-white/10 transition-all cursor-pointer"
            >
              Connect Web3 Wallet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
