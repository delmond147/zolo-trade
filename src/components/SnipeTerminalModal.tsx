/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Zap, Shield, ArrowDownUp, Check, AlertCircle, Sparkles } from 'lucide-react';
import { WalletState } from '../types';

interface SnipeTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletState: WalletState;
  onShowToast: (msg: string) => void;
}

export const SnipeTerminalModal: React.FC<SnipeTerminalModalProps> = ({
  isOpen,
  onClose,
  walletState,
  onShowToast,
}) => {
  const [payAmount, setPayAmount] = useState('0.5');
  const [payToken, setPayToken] = useState<'ETH' | 'SOL'>('ETH');
  const [receiveToken, setReceiveToken] = useState('ZAP');
  const [slippage, setSlippage] = useState('0.1');
  const [mevShield, setMevShield] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<null | {
    hash: string;
    latency: string;
    savedSlippage: string;
    route: string;
  }>(null);

  if (!isOpen) return null;

  const calculateReceiveAmount = () => {
    const num = parseFloat(payAmount) || 0;
    const rate = payToken === 'ETH' ? 42500 : 2850;
    return (num * rate).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const handleExecuteTrade = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        hash: '0x8f3a9e22b7c61d5e90a…412d',
        latency: '38ms (Sub-block Flashbots bundle)',
        savedSlippage: '$84.20 saved vs Uniswap V3 default',
        route: 'Zolo Private Relay → Titan Builder → Ethereum Block #1984210',
      });
      onShowToast(`Simulated trade executed in 38ms!`);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Zolo Quick Trade Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0e0c17] border border-[#9312ff]/40 rounded-2xl p-6 sm:p-7 shadow-[0_0_60px_rgba(147,18,255,0.4)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#9312ff]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9312ff] to-[#7a1cf8] flex items-center justify-center shadow-[0_0_15px_#9312ff]">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Zolo Fast Terminal</h3>
              <p className="text-xs text-[#8b8988]">Simulate sub-100ms atomic swap with MEV protection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input tokens */}
        <div className="mt-5 space-y-3">
          {/* You Pay */}
          <div className="p-3.5 rounded-xl bg-[#141122] border border-white/5 focus-within:border-[#9312ff]/50 transition-colors">
            <div className="flex justify-between text-xs text-[#8b8988] mb-1.5">
              <span>You Pay</span>
              <span>Balance: {payToken === 'ETH' ? walletState.balanceEth : walletState.balanceSol}</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-xl font-bold font-mono text-white focus:outline-none w-1/2"
              />
              <div className="flex items-center gap-1.5 bg-[#201a35] px-3 py-1.5 rounded-full border border-white/10">
                <button
                  onClick={() => setPayToken(payToken === 'ETH' ? 'SOL' : 'ETH')}
                  className="text-xs font-semibold text-white flex items-center gap-1 hover:text-[#b546ff] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#9312ff]" />
                  {payToken}
                  <ArrowDownUp className="w-3 h-3 ml-1 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* You Receive */}
          <div className="p-3.5 rounded-xl bg-[#141122] border border-white/5">
            <div className="flex justify-between text-xs text-[#8b8988] mb-1.5">
              <span>You Receive (Estimated)</span>
              <span className="text-emerald-400 font-mono">Best Route Found</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold font-mono text-white">
                {calculateReceiveAmount()}
              </div>
              <div className="flex items-center gap-1.5 bg-[#201a35] px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">{receiveToken}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slippage & MEV Controls */}
        <div className="mt-4 p-3 rounded-xl bg-[#131020] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b8988]">Slippage Tolerance</span>
            <div className="flex items-center gap-1.5">
              {['0.1', '0.5', '1.0'].map((val) => (
                <button
                  key={val}
                  onClick={() => setSlippage(val)}
                  className={`px-2.5 py-0.5 rounded text-xs font-mono transition-colors ${
                    slippage === val
                      ? 'bg-[#9312ff] text-white font-semibold'
                      : 'bg-white/5 text-[#8b8988] hover:text-white'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
            <span className="text-[#8b8988] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Private MEV Shield (Jito / Flashbots)
            </span>
            <button
              onClick={() => setMevShield(!mevShield)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                mevShield ? 'bg-[#9312ff] justify-end' : 'bg-gray-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>

        {/* Execution Result Telemetry */}
        {executionResult && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 animate-fade-in text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Check className="w-4 h-4" /> Swap Confirmed in Private Bundle
            </div>
            <div className="text-[#8b8988]">
              Latency: <span className="text-white font-mono">{executionResult.latency}</span>
            </div>
            <div className="text-[#8b8988]">
              Protection: <span className="text-emerald-300">{executionResult.savedSlippage}</span>
            </div>
            <div className="text-[11px] font-mono text-gray-400 truncate">
              Tx: {executionResult.hash}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleExecuteTrade}
          disabled={isExecuting}
          className="mt-5 w-full py-3 bg-gradient-to-r from-[#a020ff] to-[#7a1cf8] hover:brightness-110 active:scale-98 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(160,32,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Broadcasting Private Bundle...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-white" />
              <span>Execute Instant Trade</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
