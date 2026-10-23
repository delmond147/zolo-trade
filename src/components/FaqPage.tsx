/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface FaqPageProps {
  onOpenTerminal: () => void;
  onOpenWallet: () => void;
  onShowToast: (msg: string) => void;
}

interface FaqItem {
  id: string;
  category: 'security' | 'speed' | 'chains' | 'fees';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'speed-1',
    category: 'speed',
    question: 'How does Zolo achieve sub-50ms transaction execution?',
    answer:
      'Zolo operates dedicated fiber-connected RPC gateways co-located with top validator data centers globally (Frankfurt, Virginia, Tokyo, Dublin). Rather than broadcasting your transactions to congested public mempools where latency is 1,200ms+, Zolo bundles your order directly into the next private block bundle with Flashbots, Titan, and Jito Solana leaders.',
  },
  {
    id: 'security-1',
    category: 'security',
    question: 'Is Zolo non-custodial? Do you ever hold my private keys?',
    answer:
      'Zolo is 100% self-custodial. Your private keys never leave your local browser extension (MetaMask, Phantom, Rabby) or hardware wallet. All transactions are signed locally on your device via standard EIP-712 or Solana signature specifications before being routed through our private relay.',
  },
  {
    id: 'security-2',
    category: 'security',
    question: 'How does the MEV Sandwich Shield protect my trades from predatory bots?',
    answer:
      'Predatory searcher bots constantly monitor public mempools to front-run trades, inject sandwich slippage, and extract capital from unsuspecting traders. Because Zolo routes orders exclusively through encrypted private channels, searchers cannot see your pending transaction until it has already been minted inside the block.',
  },
  {
    id: 'fees-1',
    category: 'fees',
    question: 'What happens if a trade reverts or fails? Do I still pay gas?',
    answer:
      'With Zolo, you pay $0 in gas for reverted trades. If liquidity changes or conditions cannot be met within your specified slippage tolerance, the private builder drops the bundle off-chain rather than submitting a failing transaction on-chain.',
  },
  {
    id: 'chains-1',
    category: 'chains',
    question: 'Which blockchains and decentralized exchanges (DEXs) are supported?',
    answer:
      'Zolo currently supports Ethereum Mainnet, Solana, Base, Arbitrum One, and Binance Smart Chain (BSC). Liquidity is dynamically aggregated across Uniswap V2/V3/V4, Curve, Balancer, Raydium, Meteora, Orca, Aerodrome, and PancakeSwap.',
  },
  {
    id: 'speed-2',
    category: 'speed',
    question: 'Can I trade directly from DexScreener, TradingView, or Photon?',
    answer:
      'Yes. The Zolo Terminal SDK includes a lightweight browser companion that overlays customizable buy/sell hotkeys onto your favorite charting interfaces. You can execute high-speed market snipes with a single keystroke without switching tabs.',
  },
  {
    id: 'fees-2',
    category: 'fees',
    question: 'What are the platform trading fees?',
    answer:
      'Zolo charges a transparent 0.5% protocol execution fee only on successful swaps, with zero subscription or upfront costs. Up to 40% of this fee is shared with affiliates through the Zolo Partner Program.',
  },
  {
    id: 'chains-2',
    category: 'chains',
    question: 'How does the Cross-Chain Unified Gas feature work?',
    answer:
      'Zolo automatically manages native gas tokens for you. If you want to buy a Base or Solana token but only have ETH in your wallet, Zolo refuels the required gas atomically during the swap route, eliminating manual bridge steps.',
  },
];

export const FaqPage: React.FC<FaqPageProps> = ({
  onOpenTerminal,
  onOpenWallet,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'speed' | 'chains' | 'fees'>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'speed-1': true,
    'security-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1200px] px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9312ff]/15 border border-[#9312ff]/30 text-[#b546ff] text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" /> Knowledge Base
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked <span className="bg-gradient-to-r from-[#9312ff] via-[#b34aff] to-[#a020ff] bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="mt-4 text-[#8b8988] text-base sm:text-lg leading-relaxed">
          Clear answers regarding Zapline's sub-50ms execution, private mempool security, non-custodial guarantees, and platform fees.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., MEV, keys, fees, Solana)..."
            className="w-full pl-11 pr-4 py-3 bg-[#110e1e] border border-white/10 focus:border-[#9312ff]/60 rounded-full text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'speed', label: 'Speed & Latency' },
            { id: 'security', label: 'Security & Keys' },
            { id: 'chains', label: 'Chains & DEXs' },
            { id: 'fees', label: 'Fees & Gas' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#9312ff] to-[#7a1cf8] text-white shadow-[0_0_12px_rgba(147,18,255,0.4)]'
                  : 'bg-[#151222] text-[#8b8988] hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-white/5 bg-[#0d0a16]/90 hover:border-[#9312ff]/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="font-semibold text-sm sm:text-base text-white group-hover:text-[#c471ff] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#9312ff]/20 text-[#c471ff]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8b8988] leading-relaxed border-t border-white/5 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-[#8b8988] rounded-xl bg-[#0f0d1a] border border-white/5">
            No questions matched your search "{searchQuery}".
          </div>
        )}
      </div>

      {/* Support Card */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#17102b] to-[#100c1e] border border-[#9312ff]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_0_35px_rgba(147,18,255,0.2)]">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#b546ff]" /> Still Have Questions?
          </h3>
          <p className="text-xs text-[#8b8988] mt-1">
            Our protocol engineers and community alphas are active 24/7 on Discord and Telegram.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onShowToast('Discord community invite: discord.gg/zolo-trade')}
            className="px-5 py-2.5 rounded-full bg-[#5865F2] hover:brightness-110 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Join Discord
          </button>
          <button
            onClick={() => onShowToast('Telegram channel: t.me/zolo_official')}
            className="px-5 py-2.5 rounded-full bg-[#229ED9] hover:brightness-110 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Telegram Alpha
          </button>
        </div>
      </div>
    </div>
  );
};
