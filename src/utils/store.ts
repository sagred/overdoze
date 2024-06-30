import { create } from 'zustand'

export const useVeFeStore = create((set) => ({
  account: null,
  setAccount: (account) => set({ account: account }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions: transactions }),
  publicToken: null,
  setPublicToken: (publicToken) => set({ publicToken: publicToken }),
  isPetActive: false,
  setIsPetActive: (isPetActive) => set({ isPetActive: isPetActive }),
  totalB3TRTokens: 0,
  setTotalB3TRTokens: (totalB3TRTokens) => set({ totalB3TRTokens: totalB3TRTokens }),
  totalVETBalance: "0.00",
  setTotalVETBalance: (totalVETBalance) => set({ totalVETBalance: totalVETBalance }),
  wallet: null,
  setWallet: (wallet) => set({ wallet: wallet }),
}))