/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Wallet, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { WalletState } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletState: WalletState;
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>;
  onShowToast: (msg: string) => void;
}

const WALLET_PROVIDERS = [
  { id: 'metamask', name: 'MetaMask Extension', type: 'EVM Mainnet', badge: 'Popular', icon: '🦊' },
  { id: 'phantom', name: 'Phantom Solana', type: 'Solana & Multi-Chain', badge: 'Sub-40ms', icon: '👻' },
  { id: 'rabby', name: 'Rabby Wallet', type: 'DeFi Native Anti-Scam', badge: 'Recommended', icon: '🐰' },
  { id: 'coinbase', name: 'Coinbase Smart Wallet', type: 'Passkey & Gasless', badge: 'Zero Gas Fee', icon: '🔵' },
  { id: 'walletconnect', name: 'WalletConnect v2', type: 'Ledger, Trezor & Mobile', badge: 'Hardware', icon: '🔗' },
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  walletState,
  setWalletState,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleConnectProvider = (providerName: string) => {
    setWalletState({
      connected: true,
      address: '0x3f4…9c7e',
      chain: 'Ethereum & Solana Dual-RPC',
      balanceEth: '4.82 ETH',
      balanceSol: '142.6 SOL',
    });
    onShowToast(`Connected with ${providerName}`);
    onClose();
  };

  const handleDisconnect = () => {
    setWalletState({
      connected: false,
      address: '',
      chain: 'Disconnected',
      balanceEth: '0.00 ETH',
      balanceSol: '0.00 SOL',
    });
    onShowToast('Wallet disconnected');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Connect Web3 Wallet"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0e0c17] border border-[#9312ff]/40 rounded-2xl p-6 sm:p-7 shadow-[0_0_60px_rgba(147,18,255,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#9312ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9312ff] to-[#a020ff] flex items-center justify-center shadow-[0_0_18px_#9312ff]">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Connect Web3 Wallet</h3>
              <p className="text-xs text-[#8b8988]">Direct private node access with sub-50ms execution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status if connected */}
        {walletState.connected && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#181328] border border-[#9312ff]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <span>Connected: {walletState.address}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
                </div>
                <div className="text-[11px] text-[#8b8988] mt-0.5 font-mono">
                  {walletState.balanceEth} · {walletState.balanceSol}
                </div>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-xs text-red-400 hover:text-red-300 font-medium px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Wallet list */}
        <div className="space-y-2 mt-4">
          {WALLET_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleConnectProvider(provider.name)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#141122] hover:bg-[#1f1935] border border-white/5 hover:border-[#9312ff]/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {provider.icon}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#c471ff] transition-colors">
                    {provider.name}
                  </div>
                  <div className="text-xs text-[#8b8988]">{provider.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#c471ff] bg-[#9312ff]/15 px-2.5 py-0.5 rounded-full border border-[#9312ff]/30">
                  {provider.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>

        {/* Security notice */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8b8988]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> Non-Custodial · Private Flashbots & Jito Mempools
          </span>
          <span className="text-gray-400 text-[11px]">v2.4 Core</span>
        </div>
      </div>
    </div>
  );
};
