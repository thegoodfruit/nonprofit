'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

// Mock data - in production this would come from the API
const weekData = [
  { day: 'Mon', minutes: 45, activities: ['Bible Reading', 'Prayer'] },
  { day: 'Tue', minutes: 62, activities: ['Sermon', 'Worship Music'] },
  { day: 'Wed', minutes: 30, activities: ['Devotional'] },
  { day: 'Thu', minutes: 55, activities: ['Bible Study', 'Prayer'] },
  { day: 'Fri', minutes: 48, activities: ['Podcast', 'Scripture Reading'] },
  { day: 'Sat', minutes: 75, activities: ['Church Service', 'Fellowship'] },
  { day: 'Sun', minutes: 47, activities: ['Worship', 'Bible Reading'] }
]

const maxMinutes = Math.max(...weekData.map(d => d.minutes))

export function WeeklyProgress() {
  return (
    <div className="card-glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-bread-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-bread-500" />
          Weekly Progress
        </h3>
        <span className="text-sm text-gray-500">
          Avg: {Math.round(weekData.reduce((a, b) => a + b.minutes, 0) / 7)} min/day
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {weekData.map((day, index) => {
          const height = (day.minutes / maxMinutes) * 100
          const isToday = index === new Date().getDay() - 1

          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full rounded-t-lg ${
                  isToday
                    ? 'bg-gradient-to-t from-bread-500 to-kingdom-500'
                    : 'bg-gradient-to-t from-bread-200 to-bread-300'
                }`}
                title={day.activities.join(', ')}
              />
              <div className="text-center">
                <div className={`text-xs font-medium ${isToday ? 'text-bread-600' : 'text-gray-500'}`}>
                  {day.day}
                </div>
                <div className={`text-sm font-semibold ${isToday ? 'text-bread-700' : 'text-gray-600'}`}>
                  {day.minutes}m
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-bread-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Weekly Total</span>
          <span className="font-semibold text-bread-700">
            {weekData.reduce((a, b) => a + b.minutes, 0)} minutes
          </span>
        </div>
      </div>
    </div>
  )
}
