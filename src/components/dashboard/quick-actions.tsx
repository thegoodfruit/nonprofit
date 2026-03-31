'use client'

import Link from 'next/link'
import { Heart, MessageCircle, HandHeart, BookOpen, Users, Sparkles } from 'lucide-react'

const actions = [
  {
    icon: Heart,
    label: 'Offer Prayer',
    href: '/prayer',
    color: 'bg-love-100 text-love-600 hover:bg-love-200'
  },
  {
    icon: MessageCircle,
    label: 'Encourage Someone',
    href: '/encourage',
    color: 'bg-grace-100 text-grace-600 hover:bg-grace-200'
  },
  {
    icon: HandHeart,
    label: 'Share Resource',
    href: '/resources/offer',
    color: 'bg-bread-100 text-bread-600 hover:bg-bread-200'
  },
  {
    icon: BookOpen,
    label: 'Read Scripture',
    href: '/scripture',
    color: 'bg-spirit-100 text-spirit-600 hover:bg-spirit-200'
  },
  {
    icon: Users,
    label: 'Community Feed',
    href: '/community',
    color: 'bg-kingdom-100 text-kingdom-600 hover:bg-kingdom-200'
  },
  {
    icon: Sparkles,
    label: 'Ask Immanuel',
    href: '/immanuel',
    color: 'bg-gradient-to-r from-spirit-100 to-kingdom-100 text-spirit-600 hover:from-spirit-200 hover:to-kingdom-200'
  }
]

export function QuickActions() {
  return (
    <div className="card-glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-bread-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${action.color}`}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm font-medium text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
