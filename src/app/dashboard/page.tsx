'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  BookOpen,
  Music,
  Video,
  Heart,
  Users,
  Share2,
  MessageSquare,
  TrendingUp,
  Calendar,
  Plus,
  Flame
} from 'lucide-react'
import { TimeWithChristCard } from '@/components/dashboard/time-with-christ-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { ManualEntryModal } from '@/components/dashboard/manual-entry-modal'
import { ImpactSummary } from '@/components/dashboard/impact-summary'
import { WeeklyProgress } from '@/components/dashboard/weekly-progress'
import { ContentBreakdown } from '@/components/dashboard/content-breakdown'
import { getGreeting } from '@/lib/utils'

export default function DashboardPage() {
  const [showManualEntry, setShowManualEntry] = useState(false)

  // Mock user data - in production this would come from the API
  const user = {
    name: 'Beloved Child of God',
    streak: 14,
    todayMinutes: 47,
    weekMinutes: 245,
    monthMinutes: 1120
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-bread-900 md:text-3xl">
                {getGreeting()}, {user.name}
              </h1>
              <p className="mt-1 text-gray-600">
                Your spiritual journey at a glance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-kingdom-100 to-bread-100 rounded-full">
                <Flame className="h-5 w-5 text-kingdom-600" />
                <span className="font-semibold text-kingdom-700">
                  {user.streak} day streak
                </span>
              </div>
              <button
                onClick={() => setShowManualEntry(true)}
                className="btn-primary flex items-center gap-2 py-2 px-4"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">Log Activity</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Time with Christ - Main Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <TimeWithChristCard
            todayMinutes={user.todayMinutes}
            weekMinutes={user.weekMinutes}
            monthMinutes={user.monthMinutes}
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Activity & Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WeeklyProgress />
            </motion.div>

            {/* Content Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ContentBreakdown />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ActivityFeed />
            </motion.div>
          </div>

          {/* Right Column - Impact & Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <QuickActions />
            </motion.div>

            {/* Impact Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ImpactSummary />
            </motion.div>

            {/* Daily Scripture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-bread-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-bread-500" />
                Today's Scripture
              </h3>
              <p className="font-scripture text-bread-700 italic leading-relaxed">
                "And behold, I am with you always, to the end of the age."
              </p>
              <p className="mt-3 text-sm text-gray-500">— Matthew 28:20</p>
            </motion.div>
          </div>
        </div>

        {/* Manual Entry Modal */}
        <ManualEntryModal
          isOpen={showManualEntry}
          onClose={() => setShowManualEntry(false)}
        />
      </div>
    </div>
  )
}
