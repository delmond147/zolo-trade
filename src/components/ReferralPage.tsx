/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Gift,
  ArrowRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Award,
  Wallet
} from 'lucide-react';
import { WalletState } from '../types';

interface ReferralPageProps {
  walletState: WalletState;
  onOpenWallet: () => void;
  onShowToast: (msg: string) => void;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({
  walletState,
  onOpenWallet,
  onShowToast,
}) => {
  const [customCode, setCustomCode] = useState('ALEX77');
  const [copied, setCopied] = useState(false);
  const [tradersCount, setTradersCount] = useState(24);
  const [volumePerTrader, setVolumePerTrader] = useState(35000);
  const [unclaimedRewards, setUnclaimedRewards] = useState(1420.5);
  const [isClaiming, setIsClaiming] = useState(false);

  // Commission tier logic
  let tierName = 'Bronze';
  let commissionRate = 0.1;
  if (tradersCount > 100) {
    tierName = 'Diamond';
    commissionRate = 0.4;
  } else if (tradersCount > 25) {
    tierName = 'Gold';
    commissionRate = 0.3;
  } else if (tradersCount > 5) {
    tierName = 'Silver';
    commissionRate = 0.2;
  }

  // Zolo fee is 0.5% (0.005) of volume; partner gets commissionRate of that fee
  const totalMonthlyVolume = tradersCount * volumePerTrader;
  const protocolFee = totalMonthlyVolume * 0.005;
  const monthlyPartnerEarning = protocolFee * commissionRate;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://zolo.trade/ref/${customCode}`);
    setCopied(true);
    onShowToast(`Copied referral link: https://zolo.trade/ref/${customCode}`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaim = () => {
    if (!walletState.connected) {
      onOpenWallet();
      return;
    }
    if (unclaimedRewards <= 0) {
      onShowToast('No rewards currently pending');
      return;
    }
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      onShowToast(`Successfully claimed $${unclaimedRewards.toFixed(2)} to ${walletState.address}!`);
      setUnclaimedRewards(0);
    }, 900);
  };

  return (
    <div className="w-full max-w-[1400px] px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-4">
          <Gift className="w-3.5 h-3.5" /> Affiliate & Partner Engine
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Earn Up To <span className="bg-gradient-to-r from-[#9312ff] via-[#b34aff] to-[#a020ff] bg-clip-text text-transparent">40% Lifetime Fees</span>
        </h2>
        <p className="mt-4 text-[#8b8988] text-base sm:text-lg leading-relaxed">
          Invite traders, alpha callers, and communities to Zolo. Earn automated on-chain fee distributions every time your referrals execute a trade.
        </p>
      </div>

      {/* Referral Hub: Your Link & Live Claim Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#140e28] via-[#100c20] to-[#160f2c] border border-[#9312ff]/40 shadow-[0_0_50px_rgba(147,18,255,0.25)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#c471ff] tracking-wider uppercase">Your Unique Invite Link</span>
            <div className="flex items-center gap-2 max-w-md">
              <div className="flex items-center bg-[#0d0918] border border-white/10 rounded-xl px-3 py-2 w-full text-xs font-mono text-gray-300">
                <span className="text-gray-500">zolo.trade/ref/</span>
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                  className="bg-transparent text-white font-bold focus:outline-none ml-0.5 w-24"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(147,18,255,0.4)] cursor-pointer whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8b8988]">Customize your vanity code at any time. Referrals are tracked on-chain permanently.</p>
          </div>

          {/* User Earnings Box */}
          <div className="p-4 rounded-xl bg-[#1a1433]/90 border border-[#9312ff]/30 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div>
              <div className="text-xs text-[#8b8988]">Unclaimed Commission</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                ${unclaimedRewards.toFixed(2)} USD
              </div>
              <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                ≈ {(unclaimedRewards / 3200).toFixed(3)} ETH · {(unclaimedRewards / 180).toFixed(2)} SOL
              </div>
            </div>
            <button
              onClick={handleClaim}
              disabled={isClaiming || unclaimedRewards <= 0}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 text-white text-xs font-bold shadow-[0_0_20px_rgba(160,32,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              {isClaiming ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Settling On-Chain...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Claim to Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tier Progression Ladder */}
      <div className="mt-14">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#b546ff]" /> Referral Tier Ladder
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tier: 'Bronze', rate: '10%', requirement: '1–5 Active Traders', perk: 'Weekly on-chain payout', active: tierName === 'Bronze' },
            { tier: 'Silver', rate: '20%', requirement: '6–25 Active Traders', perk: 'Bi-daily distributions', active: tierName === 'Silver' },
            { tier: 'Gold', rate: '30%', requirement: '26–100 Active Traders', perk: 'Real-time per-block payout', active: tierName === 'Gold' },
            { tier: 'Diamond', rate: '40%', requirement: '100+ Active Traders', perk: 'Dedicated private RPC node', active: tierName === 'Diamond' },
          ].map((t) => (
            <div
              key={t.tier}
              className={`p-5 rounded-xl border transition-all ${
                t.active
                  ? 'bg-[#1b1435] border-[#9312ff] shadow-[0_0_25px_rgba(147,18,255,0.3)] ring-1 ring-[#9312ff]'
                  : 'bg-[#0f0d1a] border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-white">{t.tier}</span>
                {t.active && (
                  <span className="text-[10px] bg-[#9312ff] text-white px-2 py-0.5 rounded-full font-bold">
                    YOUR TIER
                  </span>
                )}
              </div>
              <div className="text-3xl font-extrabold font-mono text-[#c471ff] mt-2">{t.rate}</div>
              <div className="text-xs text-gray-300 font-medium mt-1">{t.requirement}</div>
              <div className="text-[11px] text-[#8b8988] mt-3 pt-3 border-t border-white/5">{t.perk}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Commission Calculator */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0c0a13] border border-[#9312ff]/30 shadow-[0_0_40px_rgba(147,18,255,0.15)]">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Projected Passive Monthly Revenue
        </h3>
        <p className="text-xs text-[#8b8988] mb-8">
          Calculate your expected recurring income based on the size of your audience and their trading activity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-300">Referred Active Traders</span>
                <span className="font-mono font-bold text-white text-sm bg-[#1e1735] px-3 py-1 rounded-lg border border-[#9312ff]/30">
                  {tradersCount} Traders
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="300"
                value={tradersCount}
                onChange={(e) => setTradersCount(Number(e.target.value))}
                className="w-full h-2 bg-[#251e3c] rounded-lg appearance-none cursor-pointer accent-[#9312ff]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-300">Avg Monthly Trading Volume Per Trader</span>
                <span className="font-mono font-bold text-white text-sm bg-[#1e1735] px-3 py-1 rounded-lg border border-[#9312ff]/30">
                  ${volumePerTrader.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={volumePerTrader}
                onChange={(e) => setVolumePerTrader(Number(e.target.value))}
                className="w-full h-2 bg-[#251e3c] rounded-lg appearance-none cursor-pointer accent-[#9312ff]"
              />
            </div>
          </div>

          {/* Calculator Output */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#181230] to-[#0e0b1c] border border-[#9312ff]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8b8988] pb-3 border-b border-white/5">
                <span>Total Network Volume</span>
                <span className="font-mono font-semibold text-white">
                  ${totalMonthlyVolume.toLocaleString()} / mo
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#8b8988] py-2 border-b border-white/5">
                <span>Calculated Tier</span>
                <span className="font-semibold text-[#c471ff]">{tierName} ({(commissionRate * 100).toFixed(0)}%)</span>
              </div>
            </div>

            <div className="my-6">
              <span className="text-xs text-[#8b8988]">Estimated Monthly Commission</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                ${monthlyPartnerEarning.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-xs text-gray-400 font-mono mt-1 block">
                ≈ ${(monthlyPartnerEarning * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} USD Annualized
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] hover:brightness-110 text-white text-xs font-bold shadow-[0_0_15px_rgba(147,18,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy My Referral Link & Start Earning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
