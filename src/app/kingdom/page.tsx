'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Heart,
  MessageCircle,
  HandHeart,
  Home,
  UtensilsCrossed,
  ShoppingBag,
  TrendingUp,
  Clock,
  MapPin,
  Filter
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the map to avoid SSR issues with Leaflet
const KingdomMap = dynamic(() => import('@/components/kingdom/kingdom-map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gradient-to-br from-bread-100 to-kingdom-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <Globe className="h-12 w-12 text-bread-400 mx-auto mb-4 animate-pulse" />
        <p className="text-bread-600">Loading Kingdom Map...</p>
      </div>
    </div>
  )
})

// Global statistics - these would come from the API
const globalStats = [
  {
    label: 'Children of God',
    value: '1.2M',
    change: '+12,340 this month',
    icon: Users,
    color: 'from-spirit-500 to-spirit-600'
  },
  {
    label: 'Prayers Offered',
    value: '45.6M',
    change: '+234K today',
    icon: Heart,
    color: 'from-love-500 to-love-600'
  },
  {
    label: 'Acts of Forgiveness',
    value: '8.9M',
    change: '+45K today',
    icon: MessageCircle,
    color: 'from-grace-500 to-grace-600'
  },
  {
    label: 'Resources Shared',
    value: '2.3M',
    change: '+8.5K today',
    icon: HandHeart,
    color: 'from-bread-500 to-kingdom-500'
  }
]

const resourceStats = [
  { label: 'Lives Fed', value: '456,789', icon: UtensilsCrossed, color: 'text-bread-600' },
  { label: 'Shelter Nights', value: '89,234', icon: Home, color: 'text-kingdom-600' },
  { label: 'Clothing Items', value: '234,567', icon: ShoppingBag, color: 'text-grace-600' }
]

const countryStats = [
  { country: 'United States', members: 420000, prayers: 12500000, resources: 890000 },
  { country: 'Nigeria', members: 180000, prayers: 8900000, resources: 450000 },
  { country: 'Brazil', members: 156000, prayers: 7200000, resources: 320000 },
  { country: 'Philippines', members: 134000, prayers: 6800000, resources: 280000 },
  { country: 'South Korea', members: 98000, prayers: 4500000, resources: 190000 },
  { country: 'Kenya', members: 87000, prayers: 3900000, resources: 156000 },
  { country: 'Mexico', members: 76000, prayers: 3200000, resources: 134000 },
  { country: 'India', members: 65000, prayers: 2800000, resources: 98000 }
]

const recentActivity = [
  { action: 'provided shelter', location: 'Lagos, Nigeria', time: '2 min ago' },
  { action: 'offered prayer', location: 'Manila, Philippines', time: '3 min ago' },
  { action: 'shared food', location: 'Houston, TX', time: '5 min ago' },
  { action: 'gave clothing', location: 'Seoul, South Korea', time: '8 min ago' },
  { action: 'offered encouragement', location: 'Nairobi, Kenya', time: '10 min ago' }
]

export default function KingdomDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month' | 'all'>('all')

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-kingdom-100 px-4 py-2 text-kingdom-700 mb-4">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Live Kingdom Activity</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-bread-900 md:text-4xl">
            Kingdom of God Dashboard
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Witness the collective impact of Christians glorifying Christ by helping one another
            with food, shelter, clothing, and essential needs around the world.
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-8"
        >
          {(['today', 'week', 'month', 'all'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-bread-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-bread-50'
              }`}
            >
              {timeframe === 'all' ? 'All Time' : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Global Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          {globalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="stat-card"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="impact-number">{stat.value}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
              <div className="text-sm text-grace-600 mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="card-glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-bread-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-bread-500" />
                Christians Helping Christians Worldwide
              </h3>
              <div className="flex gap-4 text-sm">
                {resourceStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-gray-600">{stat.label}:</span>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <KingdomMap />
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Country Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-bread-900 mb-6">
              Impact by Country
            </h3>
            <div className="space-y-4">
              {countryStats.slice(0, 6).map((country, index) => (
                <div key={country.country} className="flex items-center gap-4">
                  <span className="w-6 text-sm font-bold text-gray-400">#{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{country.country}</span>
                      <span className="text-sm text-gray-500">
                        {(country.members / 1000).toFixed(0)}K members
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-bread-400 to-kingdom-500 rounded-full"
                        style={{ width: `${(country.members / countryStats[0].members) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-bread-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-bread-500" />
                Live Activity
              </h3>
              <span className="flex items-center gap-2 text-sm text-grace-600">
                <span className="w-2 h-2 bg-grace-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-bread-50 rounded-xl"
                >
                  <div className="w-2 h-2 bg-kingdom-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      A believer <span className="font-medium text-bread-700">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scripture Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-scripture text-lg text-bread-700 italic max-w-2xl mx-auto">
            "Now you are the body of Christ, and each one of you is a part of it."
          </p>
          <p className="mt-2 text-sm text-gray-500">— 1 Corinthians 12:27</p>
        </motion.div>
      </div>
    </div>
  )
}
