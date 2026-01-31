'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HandHeart,
  UtensilsCrossed,
  Home,
  ShoppingBag,
  Car,
  Heart,
  GraduationCap,
  DollarSign,
  Baby,
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Plus,
  Search,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All Resources', icon: HandHeart },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'shelter', label: 'Shelter', icon: Home },
  { id: 'clothing', label: 'Clothing', icon: ShoppingBag },
  { id: 'transportation', label: 'Transportation', icon: Car },
  { id: 'medical', label: 'Medical', icon: Heart },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'childcare', label: 'Childcare', icon: Baby },
  { id: 'employment', label: 'Employment', icon: Briefcase }
]

// Mock data for resources
const resourceOffers = [
  {
    id: '1',
    category: 'food',
    title: 'Weekly Meal Packages',
    description: 'Offering weekly meal packages for families in need. Includes groceries and home-cooked meals.',
    location: 'Houston, TX',
    provider: 'Sister Mary',
    available: true,
    timesFulfilled: 23
  },
  {
    id: '2',
    category: 'shelter',
    title: 'Temporary Housing Available',
    description: 'Guest room available for believers in transition. Up to 2 weeks stay, includes meals.',
    location: 'Atlanta, GA',
    provider: 'Brother James & Family',
    available: true,
    timesFulfilled: 8
  },
  {
    id: '3',
    category: 'clothing',
    title: 'Children\'s Clothing (Ages 2-10)',
    description: 'Gently used children\'s clothing in good condition. All sizes from 2T to 10.',
    location: 'Los Angeles, CA',
    provider: 'Grace Fellowship',
    available: true,
    timesFulfilled: 45
  },
  {
    id: '4',
    category: 'transportation',
    title: 'Airport Pickup Service',
    description: 'Free airport pickup and drop-off for believers visiting or relocating to the area.',
    location: 'Dallas, TX',
    provider: 'Brother David',
    available: true,
    timesFulfilled: 12
  },
  {
    id: '5',
    category: 'education',
    title: 'Math Tutoring for Students',
    description: 'Free math tutoring for students K-12. Can help with homework and test preparation.',
    location: 'Online / Zoom',
    provider: 'Sister Ruth (Retired Teacher)',
    available: true,
    timesFulfilled: 34
  },
  {
    id: '6',
    category: 'childcare',
    title: 'Babysitting for Job Interviews',
    description: 'Free childcare while parents attend job interviews or important appointments.',
    location: 'Chicago, IL',
    provider: 'Faithful Mothers Group',
    available: true,
    timesFulfilled: 18
  }
]

const resourceRequests = [
  {
    id: '1',
    category: 'shelter',
    title: 'Family Needs Temporary Housing',
    description: 'Family of 4 relocating for work. Need temporary housing for 2-3 weeks while finding permanent home.',
    location: 'Phoenix, AZ',
    urgency: 'high',
    postedAgo: '2 hours ago'
  },
  {
    id: '2',
    category: 'food',
    title: 'Single Mother Needs Groceries',
    description: 'Single mother with 2 children. Lost job last month, waiting for new position to start.',
    location: 'Miami, FL',
    urgency: 'urgent',
    postedAgo: '5 hours ago'
  },
  {
    id: '3',
    category: 'transportation',
    title: 'Rides to Medical Appointments',
    description: 'Elderly believer needs rides to dialysis appointments 3 times per week.',
    location: 'Seattle, WA',
    urgency: 'normal',
    postedAgo: '1 day ago'
  }
]

const urgencyColors = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-spirit-100 text-spirit-600',
  high: 'bg-kingdom-100 text-kingdom-600',
  urgent: 'bg-love-100 text-love-600'
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'offers' | 'requests'>('offers')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOffers = resourceOffers.filter(offer =>
    (activeCategory === 'all' || offer.category === activeCategory) &&
    (offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     offer.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredRequests = resourceRequests.filter(request =>
    (activeCategory === 'all' || request.category === activeCategory) &&
    (request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     request.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-serif font-bold text-bread-900">
            Share & Receive Resources
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            As the body of Christ, we share freely with one another -
            food, shelter, clothing, and more. Whatever you have, offer it.
            Whatever you need, ask for it.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link
            href="/resources/offer"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Offer a Resource
          </Link>
          <Link
            href="/resources/request"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <HandHeart className="h-5 w-5" />
            Request Help
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-bread-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-bread-50 border border-gray-200'
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'offers'
                ? 'bg-bread-100 text-bread-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Available Resources ({filteredOffers.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'requests'
                ? 'bg-bread-100 text-bread-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Requests for Help ({filteredRequests.length})
          </button>
        </div>

        {/* Resource Grid */}
        {activeTab === 'offers' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredOffers.map((offer, index) => {
              const CategoryIcon = categories.find(c => c.id === offer.category)?.icon || HandHeart

              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-glass rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-bread-500 to-kingdom-500">
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-500">{offer.provider}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {offer.location}
                    </div>
                    <span className="text-grace-600 font-medium">
                      {offer.timesFulfilled} helped
                    </span>
                  </div>
                  <button className="w-full mt-4 py-2 bg-bread-50 text-bread-700 rounded-lg font-medium hover:bg-bread-100 transition-colors">
                    Request This Resource
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {filteredRequests.map((request, index) => {
              const CategoryIcon = categories.find(c => c.id === request.category)?.icon || HandHeart

              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-glass rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-love-500 to-love-600">
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{request.title}</h3>
                        <span className={`badge-pill text-xs ${urgencyColors[request.urgency as keyof typeof urgencyColors]}`}>
                          {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {request.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {request.postedAgo}
                          </span>
                        </div>
                        <button className="flex items-center gap-1 text-bread-600 font-medium hover:text-bread-700">
                          Offer to Help
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Scripture Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-scripture text-lg text-bread-700 italic max-w-2xl mx-auto">
            "Share with the Lord's people who are in need. Practice hospitality."
          </p>
          <p className="mt-2 text-sm text-gray-500">— Romans 12:13</p>
        </motion.div>
      </div>
    </div>
  )
}
