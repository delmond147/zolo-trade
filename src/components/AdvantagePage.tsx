/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  X,
  Zap,
  Shield,
  TrendingUp,
  Sliders,
  DollarSign,
  Lock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdvantagePageProps {
  onOpenTerminal: () => void;
  onOpenWallet: () => void;
  onShowToast: (msg: string) => void;
}

export const AdvantagePage: React.FC<AdvantagePageProps> = ({
  onOpenTerminal,
  onOpenWallet,
  onShowToast,
}) => {
  const [tradeSize, setTradeSize] = useState<number>(15000);

  // Calculations
  const publicMevLoss = tradeSize * 0.024; // typical 2.4% sandwich loss on volatile DEX
  const zaplineSlippage = tradeSize * 0.0012; // 0.12% minimal price impact
  const totalSaved = publicMevLoss - zaplineSlippage;

  const comparisonRows = [
    {
      feature: 'Average Execution Latency',
      zapline: '38ms (Private Node Fiber)',
      wallets: '1,200ms (Public RPC)',
      tgBots: '450ms (Server Hop)',
      cexs: '110ms (Off-Chain)',
      highlight: true,
    },
    {
      feature: 'MEV Sandwich & Frontrun Shield',
      zapline: 'Guaranteed 100% Private Bundle',
      wallets: 'None (Sandwiched in Mempool)',
      tgBots: 'Basic Anti-MEV (Extra 1% fee)',
      cexs: 'Not Applicable (Centralized)',
      highlight: true,
    },
    {
      feature: 'Private Key Custody',
      zapline: '100% Self-Custodial (Local)',
      wallets: '100% Self-Custodial (Local)',
      tgBots: 'Custodial (Keys on VPS server)',
      cexs: 'Custodial (Exchange holds keys)',
      highlight: true,
    },
    {
      feature: 'Failed Transaction Gas Fee',
      zapline: '$0 (Reverted off-chain)',
      wallets: 'You pay 100% of failed gas',
      tgBots: 'You pay failed gas + bot fee',
      cexs: 'Flat cancellation fee',
      highlight: false,
    },
    {
      feature: 'Cross-DEX Atomic Splitting',
      zapline: 'Dynamic across 40+ Pools',
      wallets: 'Single-route default',
      tgBots: 'Basic Uniswap/Raydium only',
      cexs: 'Single exchange liquidity',
      highlight: false,
    },
    {
      feature: 'Terminal Hotkey Overlay',
      zapline: 'Native inside DexScreener & TV',
      wallets: 'Slow popup confirmation',
      tgBots: 'Telegram chat commands',
      cexs: 'Web browser tab required',
      highlight: false,
    },
  ];

  return (
    <div className="w-full max-w-[1400px] px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Quantitative Benchmark
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The <span className="bg-gradient-to-r from-[#9312ff] via-[#b34aff] to-[#a020ff] bg-clip-text text-transparent">Zolo Advantage</span>
        </h2>
        <p className="mt-4 text-[#8b8988] text-base sm:text-lg leading-relaxed">
          Why professional trading desks, on-chain snipers, and high-volume DeFi funds switch to Zolo for execution edge.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#9312ff]/30 bg-[#0c0a13] shadow-[0_0_50px_rgba(147,18,255,0.18)]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-[#141022]">
              <th className="p-4 sm:p-5 text-sm font-semibold text-[#8b8988]">Feature & Metric</th>
              <th className="p-4 sm:p-5 text-sm font-bold text-white bg-[#9312ff]/20 border-x border-[#9312ff]/40">
                <div className="flex items-center gap-2 text-[#c471ff]">
                  <Zap className="w-4 h-4 fill-[#c471ff]" /> Zolo Terminal
                </div>
              </th>
              <th className="p-4 sm:p-5 text-sm font-medium text-gray-400">Standard Wallets</th>
              <th className="p-4 sm:p-5 text-sm font-medium text-gray-400">Telegram Bots</th>
              <th className="p-4 sm:p-5 text-sm font-medium text-gray-400">Centralized Exchanges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 sm:p-5 font-medium text-white">{row.feature}</td>
                <td className="p-4 sm:p-5 font-semibold text-white bg-[#9312ff]/10 border-x border-[#9312ff]/30">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#45b558] shrink-0" />
                    <span>{row.zapline}</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-[#8b8988]">{row.wallets}</td>
                <td className="p-4 sm:p-5 text-[#8b8988]">{row.tgBots}</td>
                <td className="p-4 sm:p-5 text-[#8b8988]">{row.cexs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Slippage & Frontrunning Savings Simulator */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#130f24] to-[#0c0a13] border border-[#9312ff]/30 shadow-[0_0_40px_rgba(147,18,255,0.2)]">
        <div className="max-w-2xl mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#45b558]" /> Calculate Your Frontrunning & Slippage Savings
          </h3>
          <p className="text-sm text-[#8b8988] mt-2">
            Standard DEX swaps on Uniswap and Raydium lose an average of 2.1%–3.5% on volatile tokens to sandwich bots.
            Adjust the slider below to see how much capital Zolo protects on every order.
          </p>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300 font-medium">Your Monthly Trading Volume</span>
            <span className="text-xl font-bold font-mono text-white bg-[#221a3a] px-4 py-1.5 rounded-xl border border-[#9312ff]/40">
              ${tradeSize.toLocaleString()} USD
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={tradeSize}
            onChange={(e) => setTradeSize(Number(e.target.value))}
            className="w-full h-2.5 bg-[#251e3c] rounded-lg appearance-none cursor-pointer accent-[#9312ff]"
          />
          <div className="flex justify-between text-xs text-gray-500 font-mono">
            <span>$1,000</span>
            <span>$25,000</span>
            <span>$50,000</span>
            <span>$75,000</span>
            <span>$100,000</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="p-4 rounded-xl bg-[#171326] border border-red-500/20">
            <div className="text-xs text-[#8b8988]">Typical Public DEX MEV Loss (2.4%)</div>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">
              −${publicMevLoss.toFixed(2)}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">Extracted by sandwich bots</div>
          </div>

          <div className="p-4 rounded-xl bg-[#171326] border border-[#9312ff]/30">
            <div className="text-xs text-[#8b8988]">Zolo Protected Impact (0.12%)</div>
            <div className="text-2xl font-bold font-mono text-[#c471ff] mt-1">
              ${zaplineSlippage.toFixed(2)}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">Sub-block multi-pool routing</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1d1436] to-[#120d22] border border-emerald-500/40 shadow-[0_0_20px_rgba(69,181,88,0.2)]">
            <div className="text-xs text-emerald-400 font-semibold">Net Capital Retained</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              +${totalSaved.toFixed(2)}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">Pure alpha back into your wallet</div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenTerminal}
            className="px-8 py-3 bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 text-white font-semibold text-sm rounded-full glow-btn-violet transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Start Trading With Zero Slippage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
