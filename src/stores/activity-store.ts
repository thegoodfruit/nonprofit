import { create } from 'zustand'

interface Activity {
  id: string
  type: 'read' | 'watch' | 'listen' | 'share' | 'like' | 'comment' | 'post'
  contentType: string
  title?: string
  source?: string
  duration: number // minutes
  timestamp: Date
}

interface DailyStats {
  date: string
  totalMinutes: number
  activities: number
  breakdown: Record<string, number>
}

interface ActivityState {
  activities: Activity[]
  todayStats: DailyStats | null
  weekStats: DailyStats[]
  isTracking: boolean

  // Actions
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void
  startTracking: () => void
  stopTracking: () => void
  calculateStats: () => void
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  todayStats: null,
  weekStats: [],
  isTracking: false,

  addActivity: (activityData) => {
    const activity: Activity = {
      ...activityData,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }

    set((state) => ({
      activities: [activity, ...state.activities]
    }))

    // Recalculate stats
    get().calculateStats()
  },

  startTracking: () => set({ isTracking: true }),

  stopTracking: () => set({ isTracking: false }),

  calculateStats: () => {
    const { activities } = get()
    const today = new Date().toISOString().split('T')[0]

    // Calculate today's stats
    const todayActivities = activities.filter(
      a => a.timestamp.toISOString().split('T')[0] === today
    )

    const breakdown: Record<string, number> = {}
    let totalMinutes = 0

    todayActivities.forEach(a => {
      totalMinutes += a.duration
      breakdown[a.contentType] = (breakdown[a.contentType] || 0) + a.duration
    })

    const todayStats: DailyStats = {
      date: today,
      totalMinutes,
      activities: todayActivities.length,
      breakdown
    }

    // Calculate week stats
    const weekStats: DailyStats[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const dayActivities = activities.filter(
        a => a.timestamp.toISOString().split('T')[0] === dateStr
      )

      const dayBreakdown: Record<string, number> = {}
      let dayMinutes = 0

      dayActivities.forEach(a => {
        dayMinutes += a.duration
        dayBreakdown[a.contentType] = (dayBreakdown[a.contentType] || 0) + a.duration
      })

      weekStats.push({
        date: dateStr,
        totalMinutes: dayMinutes,
        activities: dayActivities.length,
        breakdown: dayBreakdown
      })
    }

    set({ todayStats, weekStats })
  }
}))
