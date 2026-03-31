'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  HandHeart,
  Users,
  Home,
  ShoppingBag,
  UtensilsCrossed,
  Car,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

// Mock data - matches the screenshot structure
const impactCategories = [
  {
    category: 'Spiritual Impact',
    icon: Heart,
    color: 'from-love-500 to-love-600',
    stats: [
      { label: 'Prayers Offered', value: 156, change: '+12 this week' },
      { label: 'Forgiveness Given', value: 23, change: '+3 this week' },
      { label: 'Encouragements Sent', value: 89, change: '+8 this week' },
      { label: 'Confessions Heard', value: 12, change: '+2 this week' }
    ]
  },
  {
    category: 'Resources Shared',
    icon: HandHeart,
    color: 'from-bread-500 to-kingdom-500',
    stats: [
      { label: 'Food Provided', value: 45, unit: 'meals', icon: UtensilsCrossed },
      { label: 'Shelter Given', value: 8, unit: 'nights', icon: Home },
      { label: 'Clothing Shared', value: 34, unit: 'items', icon: ShoppingBag },
      { label: 'Transportation', value: 12, unit: 'rides', icon: Car }
    ]
  },
  {
    category: 'Services Offered',
    icon: Users,
    color: 'from-grace-500 to-grace-600',
    stats: [
      { label: 'Tutoring Hours', value: 24, unit: 'hours' },
      { label: 'Mentorship Sessions', value: 15, unit: 'sessions' },
      { label: 'Counseling', value: 8, unit: 'hours' },
      { label: 'Skills Shared', value: 6, unit: 'workshops' }
    ]
  }
]

const monthlyProgress = [
  { month: 'Jan', prayers: 120, resources: 15 },
  { month: 'Feb', prayers: 135, resources: 22 },
  { month: 'Mar', prayers: 148, resources: 28 },
  { month: 'Apr', prayers: 156, resources: 34 }
]

const achievements = [
  { title: 'Prayer Warrior', description: 'Offered 100+ prayers', icon: Heart, unlocked: true },
  { title: 'Generous Heart', description: 'Shared 10+ resources', icon: HandHeart, unlocked: true },
  { title: 'Encourager', description: 'Sent 50+ encouragements', icon: MessageCircle, unlocked: true },
  { title: 'Community Builder', description: 'Connected 25+ believers', icon: Users, unlocked: false }
]

export default function ImpactDashboardPage() {
  const totalImpact = 156 + 23 + 89 + 45 + 8 + 34 + 12 + 24 + 15 + 8 + 6

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-bread-600">Dashboard</Link>
            <span>/</span>
            <span className="text-bread-600">Social Impact</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-bread-900">
            Your Social Impact
          </h1>
          <p className="mt-2 text-gray-600">
            See how your faith is making a difference in the lives of others
          </p>
        </motion.div>

        {/* Total Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bread-600 via-kingdom-600 to-bread-700 p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-bread-200" />
                  <span className="text-bread-200 font-medium">Total Impact Score</span>
                </div>
                <div className="text-6xl font-bold">{totalImpact}</div>
                <p className="mt-2 text-bread-200">
                  Acts of love and service to the Kingdom
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-bread-200" />
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-sm text-bread-200">This Month</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-bread-200" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-bread-200">Achievements</div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="font-scripture italic text-bread-100">
                "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."
              </p>
              <p className="mt-1 text-sm text-bread-300">— Matthew 25:40</p>
            </div>
          </div>
        </motion.div>

        {/* Impact Categories */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {impactCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card-glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-bread-900">{category.category}</h3>
              </div>
              <div className="space-y-4">
                {category.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {'icon' in stat && stat.icon && (
                        <stat.icon className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-bread-900">{stat.value}</span>
                      {'unit' in stat && (
                        <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                      )}
                      {'change' in stat && (
                        <p className="text-xs text-grace-600">{stat.change}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-bread-900 mb-6">Monthly Progress</h3>
            <div className="space-y-4">
              {monthlyProgress.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-gray-500">{month.month}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-love-400 to-love-500 rounded-full"
                      style={{ width: `${(month.prayers / 160) * 60}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-bread-400 to-bread-500 rounded-full -mt-4"
                      style={{ width: `${(month.resources / 40) * 40}%`, marginLeft: `${(month.prayers / 160) * 60}%` }}
                    />
                  </div>
                  <div className="text-right text-sm">
                    <span className="text-love-600">{month.prayers}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-bread-600">{month.resources}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-love-500" />
                <span className="text-gray-600">Prayers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-bread-500" />
                <span className="text-gray-600">Resources</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-bread-900 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    achievement.unlocked ? 'bg-kingdom-50' : 'bg-gray-50 opacity-60'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-kingdom-500 to-bread-500'
                      : 'bg-gray-300'
                  }`}>
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Award className="h-5 w-5 text-kingdom-500" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
