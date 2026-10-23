/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Zap,
  Shield,
  Layers,
  Sliders,
  Terminal,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  Flame,
  Radio
} from 'lucide-react';

interface FeaturesPageProps {
  onOpenTerminal: () => void;
  onOpenWallet: () => void;
  onShowToast: (msg: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onOpenTerminal,
  onOpenWallet,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'latency' | 'mev' | 'routing'>('all');
  const [mempoolTxs, setMempoolTxs] = useState([
    { hash: '0x4f12…89a1', token: 'SOL/USDC', size: '$42,500', latency: '24ms', status: 'Protected', builder: 'Jito Bundle #81' },
    { hash: '0x9b78…11e4', token: 'WETH/PEPE', size: '$18,200', latency: '31ms', status: 'Protected', builder: 'Flashbots Private' },
    { hash: '0x3c55…67d2', token: 'ETH/USDT', size: '$120,000', latency: '19ms', status: 'Split-Route', builder: 'Titan Builder' },
    { hash: '0x7e41…32f9', token: 'SOL/BONK', size: '$9,400', latency: '18ms', status: 'Protected', builder: 'FastPath RPC' },
  ]);

  // Periodic simulated mempool update
  useEffect(() => {
    const interval = setInterval(() => {
      const tokens = ['SOL/USDC', 'WETH/PEPE', 'ETH/USDT', 'SOL/WIF', 'BASE/BRETT'];
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      const randomSize = `$${(Math.random() * 50 + 5).toFixed(1)}k`;
      const randomMs = `${Math.floor(Math.random() * 20 + 16)}ms`;
      const randomHash = `0x${Math.random().toString(16).substring(2, 6)}…${Math.random().toString(16).substring(2, 6)}`;

      setMempoolTxs((prev) => [
        {
          hash: randomHash,
          token: randomToken,
          size: randomSize,
          latency: randomMs,
          status: 'Protected',
          builder: 'Private Bundle',
        },
        ...prev.slice(0, 4),
      ]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'latency',
      category: 'latency',
      icon: Zap,
      title: 'Sub-50ms Private Mempool Radar',
      desc: 'Direct optical connections to co-located validator nodes in Frankfurt, Virginia, Tokyo, and Dublin. Transactions bypass public gossip networks completely.',
      stats: '38ms avg. block inclusion',
      metric: '99.4% first-slot rate',
    },
    {
      id: 'mev',
      category: 'mev',
      icon: Shield,
      title: 'Zero-Revert Sandwich & Frontrun Shield',
      desc: 'Automatic private relay bundling with Flashbots Protect, bloXroute, and Jito. If a toxic bot attempts to sandwich your order, the transaction is dropped off-chain without consuming gas.',
      stats: '100% gas refund on revert',
      metric: '$4.2M+ saved in toxic MEV',
    },
    {
      id: 'routing',
      category: 'routing',
      icon: Layers,
      title: 'Smart Liquidity Split Engine',
      desc: 'Splits trade volume mathematically across Uniswap V3/V2, Curve, Raydium, Aerodrome, and Orca in a single atomic transaction for virtually zero price impact.',
      stats: '40+ integrated DEXs',
      metric: 'Up to 3.8% better execution price',
    },
    {
      id: 'automation',
      category: 'routing',
      icon: Sliders,
      title: 'Algorithmic Trailing Stops & Limit Triggers',
      desc: 'Set multi-stage dynamic profit taking and dynamic trailing stop-losses for any volatile token without depositing assets into centralized custody.',
      stats: 'Non-custodial smart execution',
      metric: '0 counterparty risk',
    },
    {
      id: 'sdk',
      category: 'latency',
      icon: Terminal,
      title: 'Terminal Overlay & Browser SDK',
      desc: 'Instant trade hotkeys embedded directly into TradingView, DexScreener, Birdeye, and Photon. Trade the moment a chart breakout prints.',
      stats: 'Single keystroke trading',
      metric: 'Chrome, Brave, Arc & Mobile',
    },
    {
      id: 'multichain',
      category: 'all',
      icon: Cpu,
      title: 'Multi-Chain Unified Gas & Liquidity',
      desc: 'Seamlessly trade on Ethereum Mainnet, Solana, Base, Arbitrum, and BSC with auto-refueling gas abstraction. Never get stuck with insufficient native gas.',
      stats: '5 chains unified',
      metric: 'Auto-refuel in 1-click',
    },
  ];

  const filteredFeatures =
    activeTab === 'all' ? features : features.filter((f) => f.category === activeTab || f.category === 'all');

  return (
    <div className="w-full max-w-[1400px] px-6 py-16 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Core Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineered for <span className="bg-gradient-to-r from-[#9312ff] via-[#b34aff] to-[#a020ff] bg-clip-text text-transparent">Execution Supremacy</span>
        </h2>
        <p className="mt-4 text-[#8b8988] text-base sm:text-lg leading-relaxed">
          Traditional DEX frontends route trades through congested public mempools that leak alpha to predatory bots.
          Zolo constructs private, encrypted transaction bundles verified directly with block builders.
        </p>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {[
            { id: 'all', label: 'All Capabilities' },
            { id: 'latency', label: 'Speed & Latency' },
            { id: 'mev', label: 'MEV Protection' },
            { id: 'routing', label: 'Smart Routing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] text-white shadow-[0_0_15px_rgba(147,18,255,0.4)]'
                  : 'bg-[#151222] text-[#8b8988] hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="p-6 rounded-2xl bg-[#0d0b14]/90 border border-[#9312ff]/20 hover:border-[#9312ff]/60 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9312ff]/5 rounded-full blur-2xl group-hover:bg-[#9312ff]/15 transition-colors pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1d1633] border border-[#9312ff]/40 flex items-center justify-center text-[#b546ff] mb-5 shadow-[0_0_15px_rgba(147,18,255,0.2)] group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#c471ff] transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#8b8988] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-medium">{feat.stats}</span>
                <span className="text-emerald-400 font-semibold">{feat.metric}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Live Mempool Telemetry Simulator */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0c0a13] border border-[#9312ff]/30 shadow-[0_0_40px_rgba(147,18,255,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="text-base font-bold text-white">Live Mempool Private Relay Stream</h3>
            </div>
            <p className="text-xs text-[#8b8988] mt-1">
              Simulated real-time block transactions routed through Zolo private RPC gateways
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] text-white text-xs font-semibold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(147,18,255,0.4)]"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Simulate Trade</span>
            </button>
            <button
              onClick={() => onShowToast('Mempool filter toggled: high-value orders only')}
              className="px-4 py-2 rounded-full bg-[#1b172a] text-xs text-[#8b8988] hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              Filter Feed
            </button>
          </div>
        </div>

        {/* Live Transaction Rows */}
        <div className="mt-5 space-y-2.5">
          {mempoolTxs.map((tx, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#120f1e] border border-white/5 hover:border-[#9312ff]/30 transition-colors gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#211938] flex items-center justify-center text-[#b546ff]">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-white font-medium">{tx.hash}</span>
                  <span className="text-[#8b8988] ml-2">({tx.token})</span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono">
                <span className="text-white font-semibold">{tx.size}</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {tx.latency}
                </span>
                <span className="text-[#b546ff] hidden md:inline-block">{tx.builder}</span>
                <span className="text-xs text-white bg-[#9312ff]/20 px-2.5 py-0.5 rounded-full border border-[#9312ff]/40">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
