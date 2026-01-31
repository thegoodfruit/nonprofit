'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, HandHeart, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock data
const impactStats = [
  { icon: Heart, label: 'Prayers Offered', value: 156, color: 'text-love-600' },
  { icon: MessageCircle, label: 'Forgiveness Given', value: 23, color: 'text-grace-600' },
  { icon: HandHeart, label: 'Resources Shared', value: 8, color: 'text-bread-600' },
  { icon: Users, label: 'Lives Touched', value: 47, color: 'text-spirit-600' }
]

export function ImpactSummary() {
  return (
    <div className="card-glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-bread-900">
          Your Impact
        </h3>
        <Link
          href="/dashboard/impact"
          className="text-sm text-bread-600 hover:text-bread-700 font-medium inline-flex items-center gap-1"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {impactStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
            </div>
            <span className="text-lg font-bold text-bread-900">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-bread-50 to-kingdom-50 rounded-xl">
        <p className="font-scripture text-sm text-bread-700 italic text-center">
          "By this everyone will know that you are my disciples, if you love one another."
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">— John 13:35</p>
      </div>
    </div>
  )
}
