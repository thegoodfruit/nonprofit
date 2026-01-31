import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string
  email: string
  displayName?: string
  testimonial?: string
  spiritualGifts: string[]
  country?: string
  city?: string
  isAnonymous: boolean
}

interface UserStats {
  totalPrayers: number
  totalForgiveness: number
  totalEncouragements: number
  totalTimeWithChrist: number // minutes
  totalContentShared: number
  totalResourcesGiven: number
  totalResourcesReceived: number
  currentStreak: number
  longestStreak: number
}

interface UserState {
  user: UserProfile | null
  stats: UserStats | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: UserProfile) => void
  updateUser: (updates: Partial<UserProfile>) => void
  setStats: (stats: UserStats) => void
  updateStats: (updates: Partial<UserStats>) => void
  logout: () => void

  // Activity tracking
  logTimeWithChrist: (minutes: number) => void
  logPrayer: () => void
  logForgiveness: () => void
  logEncouragement: () => void
}

const initialStats: UserStats = {
  totalPrayers: 0,
  totalForgiveness: 0,
  totalEncouragements: 0,
  totalTimeWithChrist: 0,
  totalContentShared: 0,
  totalResourcesGiven: 0,
  totalResourcesReceived: 0,
  currentStreak: 0,
  longestStreak: 0
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      stats: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      setStats: (stats) => set({ stats }),

      updateStats: (updates) => set((state) => ({
        stats: state.stats ? { ...state.stats, ...updates } : null
      })),

      logout: () => set({
        user: null,
        stats: null,
        isAuthenticated: false
      }),

      logTimeWithChrist: (minutes) => set((state) => ({
        stats: state.stats
          ? { ...state.stats, totalTimeWithChrist: state.stats.totalTimeWithChrist + minutes }
          : { ...initialStats, totalTimeWithChrist: minutes }
      })),

      logPrayer: () => set((state) => ({
        stats: state.stats
          ? { ...state.stats, totalPrayers: state.stats.totalPrayers + 1 }
          : { ...initialStats, totalPrayers: 1 }
      })),

      logForgiveness: () => set((state) => ({
        stats: state.stats
          ? { ...state.stats, totalForgiveness: state.stats.totalForgiveness + 1 }
          : { ...initialStats, totalForgiveness: 1 }
      })),

      logEncouragement: () => set((state) => ({
        stats: state.stats
          ? { ...state.stats, totalEncouragements: state.stats.totalEncouragements + 1 }
          : { ...initialStats, totalEncouragements: 1 }
      }))
    }),
    {
      name: 'living-bread-user',
      partialize: (state) => ({
        user: state.user,
        stats: state.stats,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
