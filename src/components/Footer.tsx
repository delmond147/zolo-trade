/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Zap, ShieldCheck, Activity, Globe, Github, Twitter, Disc as Discord } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#06050a] text-xs text-[#8b8988] mt-20 relative z-20">
      {/* Live Node Heartbeat Strip */}
      <div className="border-b border-white/5 py-3 px-6 bg-black/60">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Node Clusters:
            </span>
            <span className="text-gray-300">Ethereum <span className="text-emerald-400">18ms</span></span>
            <span className="text-gray-300">Solana <span className="text-emerald-400">24ms</span></span>
            <span className="text-gray-300">Base <span className="text-emerald-400">12ms</span></span>
            <span className="text-gray-300">Arbitrum <span className="text-emerald-400">15ms</span></span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#b546ff]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited by OpenZeppelin & Trail of Bits</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9312ff] to-[#c164ff] flex items-center justify-center shadow-[0_0_15px_#9312ff]">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">Zolo</span>
          </div>
          <p className="text-xs text-[#8b8988] max-w-sm leading-relaxed">
            The first fully integrated on-chain trading experience. Direct private block submission, zero MEV frontrunning, and sub-50ms execution directly from your favorite interfaces.
          </p>
          <div className="text-[11px] text-gray-500 pt-2 font-mono">
            © 2026 Zolo Protocol. Non-custodial & open-source client.
          </div>
        </div>

        {/* Column 1: Ecosystem */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">Protocol</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('Home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('Features')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Execution Engine
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('Zolo Advantage')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Benchmark Matrix
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('Referral')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Affiliate Program
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Developers */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">Developers</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onShowToast('API docs: docs.zolo.trade')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Private RPC Endpoints
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('Terminal SDK loaded')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Browser SDK
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('GitHub repository: github.com/zolo')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Smart Contracts
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('Audit report: 0 critical vulnerabilities')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Security Audits
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Community & Help */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">Community</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('FAQ')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                FAQ & Support
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('Redirecting to Discord...')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Discord Server
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('Redirecting to Telegram...')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Telegram Announcements
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast('Follow @ZoloTrade on X')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                X / Twitter
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
