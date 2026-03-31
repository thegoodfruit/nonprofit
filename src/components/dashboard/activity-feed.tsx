'use client'

import { motion } from 'framer-motion'
import { BookOpen, Music, Video, Heart, MessageSquare, Share2, Clock } from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils'

// Mock data
const activities = [
  {
    id: '1',
    type: 'read',
    icon: BookOpen,
    title: 'Read John 3:16-21',
    source: 'Bible App',
    duration: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    color: 'bg-spirit-100 text-spirit-600'
  },
  {
    id: '2',
    type: 'watch',
    icon: Video,
    title: 'Watched: "Finding Peace in Troubled Times"',
    source: 'YouTube',
    duration: 25,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    color: 'bg-bread-100 text-bread-600'
  },
  {
    id: '3',
    type: 'listen',
    icon: Music,
    title: 'Listened to: "How Great Thou Art"',
    source: 'Spotify',
    duration: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    color: 'bg-kingdom-100 text-kingdom-600'
  },
  {
    id: '4',
    type: 'share',
    icon: Share2,
    title: 'Shared devotional with community',
    source: 'The Living Bread',
    duration: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    color: 'bg-grace-100 text-grace-600'
  },
  {
    id: '5',
    type: 'comment',
    icon: MessageSquare,
    title: 'Encouraged a brother in faith',
    source: 'Community',
    duration: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    color: 'bg-love-100 text-love-600'
  }
]

export function ActivityFeed() {
  return (
    <div className="card-glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-bread-900">
          Recent Activity
        </h3>
        <button className="text-sm text-bread-600 hover:text-bread-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-bread-50 transition-colors"
          >
            <div className={`p-2 rounded-xl ${activity.color}`}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{activity.title}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span>{activity.source}</span>
                {activity.duration > 0 && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration} min
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
