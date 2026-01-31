'use client'

import { motion } from 'framer-motion'
import { Clock, Sun, Calendar, TrendingUp } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

interface TimeWithChristCardProps {
  todayMinutes: number
  weekMinutes: number
  monthMinutes: number
}

export function TimeWithChristCard({
  todayMinutes,
  weekMinutes,
  monthMinutes
}: TimeWithChristCardProps) {
  const dailyGoal = 60 // minutes
  const progress = Math.min((todayMinutes / dailyGoal) * 100, 100)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bread-600 via-kingdom-600 to-bread-700 p-8 text-white shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-kingdom-400/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Main Time Display */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-bread-200" />
              <span className="text-bread-200 font-medium">Time with Christ Today</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-bold">
                {formatDuration(todayMinutes)}
              </span>
              <span className="text-bread-200 text-lg">/ {formatDuration(dailyGoal)} goal</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-3 w-full max-w-md bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-white to-bread-200 rounded-full"
              />
            </div>
            <p className="mt-2 text-bread-200 text-sm">
              {progress >= 100
                ? "Goal achieved! Keep growing in faith."
                : `${Math.round(progress)}% of daily goal`}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Sun className="h-6 w-6 mx-auto mb-2 text-bread-200" />
              <div className="text-2xl font-bold">{formatDuration(weekMinutes)}</div>
              <div className="text-sm text-bread-200">This Week</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-bread-200" />
              <div className="text-2xl font-bold">{formatDuration(monthMinutes)}</div>
              <div className="text-sm text-bread-200">This Month</div>
            </div>
          </div>
        </div>

        {/* Scripture */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="font-scripture italic text-bread-100">
            "But seek first his kingdom and his righteousness, and all these things will be given to you as well."
          </p>
          <p className="mt-1 text-sm text-bread-300">— Matthew 6:33</p>
        </div>
      </div>
    </div>
  )
}
