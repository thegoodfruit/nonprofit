'use client'

import { motion } from 'framer-motion'
import { BookOpen, Music, Video, Mic, FileText, Heart, Share2, MessageSquare } from 'lucide-react'

// Mock data
const contentTypes = [
  { type: 'Bible Reading', icon: BookOpen, minutes: 120, color: 'from-spirit-500 to-spirit-600', percentage: 28 },
  { type: 'Sermons', icon: Video, minutes: 95, color: 'from-bread-500 to-bread-600', percentage: 22 },
  { type: 'Worship Music', icon: Music, minutes: 85, color: 'from-kingdom-500 to-kingdom-600', percentage: 20 },
  { type: 'Devotionals', icon: FileText, minutes: 65, color: 'from-grace-500 to-grace-600', percentage: 15 },
  { type: 'Podcasts', icon: Mic, minutes: 45, color: 'from-love-500 to-love-600', percentage: 10 },
  { type: 'Other', icon: Heart, minutes: 20, color: 'from-gray-400 to-gray-500', percentage: 5 }
]

const engagementStats = [
  { type: 'Content Shared', icon: Share2, count: 12, color: 'text-spirit-600 bg-spirit-100' },
  { type: 'Comments', icon: MessageSquare, count: 28, color: 'text-bread-600 bg-bread-100' },
  { type: 'Likes Given', icon: Heart, count: 45, color: 'text-love-600 bg-love-100' }
]

export function ContentBreakdown() {
  return (
    <div className="card-glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-bread-900 mb-6">
        Content Engagement This Week
      </h3>

      {/* Content Types */}
      <div className="space-y-4 mb-6">
        {contentTypes.map((content, index) => (
          <div key={content.type} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${content.color}`}>
                  <content.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{content.type}</span>
              </div>
              <span className="text-sm text-gray-500">{content.minutes} min</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${content.percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full bg-gradient-to-r ${content.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Stats */}
      <div className="pt-6 border-t border-bread-100">
        <h4 className="text-sm font-medium text-gray-500 mb-4">Engagement</h4>
        <div className="grid grid-cols-3 gap-4">
          {engagementStats.map((stat) => (
            <div key={stat.type} className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color} mb-2`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-bold text-bread-900">{stat.count}</div>
              <div className="text-xs text-gray-500">{stat.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
