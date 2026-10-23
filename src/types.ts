/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'Home' | 'Features' | 'Zolo Advantage' | 'Referral' | 'FAQ';

export interface WalletState {
  connected: boolean;
  address: string;
  chain: string;
  balanceEth: string;
  balanceSol: string;
}
