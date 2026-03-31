'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Heart,
  Users,
  Globe,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Begin your journey with The Living Bread'
  },
  {
    id: 2,
    title: 'Your Story',
    description: 'Share a bit about your faith journey'
  },
  {
    id: 3,
    title: 'Gifts',
    description: 'What gifts has God given you?'
  },
  {
    id: 4,
    title: 'Location',
    description: 'Connect with nearby believers'
  },
  {
    id: 5,
    title: 'Complete',
    description: 'Welcome to the Kingdom!'
  }
]

const spiritualGifts = [
  'Teaching', 'Encouragement', 'Giving', 'Leadership',
  'Mercy', 'Service', 'Hospitality', 'Wisdom',
  'Discernment', 'Faith', 'Evangelism', 'Shepherding',
  'Administration', 'Craftsmanship', 'Music', 'Prayer'
]

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    testimonial: '',
    selectedGifts: [] as string[],
    country: '',
    city: '',
    isAnonymous: true
  })

  const toggleGift = (gift: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGifts: prev.selectedGifts.includes(gift)
        ? prev.selectedGifts.filter(g => g !== gift)
        : [...prev.selectedGifts, gift]
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep >= step.id
                    ? 'bg-bread-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-bread-500' : 'bg-gray-200'
                  }`} style={{ width: '60px' }} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-bread-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-500 text-sm">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card-glass rounded-2xl p-8"
        >
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-bread-500 to-kingdom-500 mb-4">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-bread-900">
                Welcome to The Living Bread
              </h1>
              <p className="text-gray-600 leading-relaxed">
                You are joining a global fellowship of believers who call on the name of Jesus Christ.
                Here, we love one another, share freely, forgive generously, and build the Kingdom of God together.
              </p>
              <div className="p-4 bg-bread-50 rounded-xl">
                <p className="font-scripture text-bread-700 italic">
                  "I am the living bread that came down from heaven. Whoever eats this bread will live forever."
                </p>
                <p className="text-sm text-gray-500 mt-2">— John 6:51</p>
              </div>
              <div className="space-y-4 pt-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Display name (optional - you can remain anonymous)"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Testimonial */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-love-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-bread-900">Your Faith Journey</h3>
                <p className="text-gray-500 text-sm">
                  Share how you came to know Christ (optional, and can be anonymous)
                </p>
              </div>
              <textarea
                placeholder="I came to know Christ when..."
                value={formData.testimonial}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-400 text-center">
                Your testimony may encourage others who are on their own journey to Christ.
              </p>
            </div>
          )}

          {/* Step 3: Spiritual Gifts */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-kingdom-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-bread-900">Your Spiritual Gifts</h3>
                <p className="text-gray-500 text-sm">
                  Select the gifts God has blessed you with
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {spiritualGifts.map((gift) => (
                  <button
                    key={gift}
                    onClick={() => toggleGift(gift)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.selectedGifts.includes(gift)
                        ? 'bg-bread-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {gift}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 text-center">
                Selected: {formData.selectedGifts.length} gifts
              </p>
            </div>
          )}

          {/* Step 4: Location */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="h-12 w-12 text-spirit-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-bread-900">Connect Locally</h3>
                <p className="text-gray-500 text-sm">
                  Share your location to connect with nearby believers (optional)
                </p>
              </div>
              <div className="space-y-4">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="NG">Nigeria</option>
                  <option value="BR">Brazil</option>
                  <option value="PH">Philippines</option>
                  <option value="KR">South Korea</option>
                  <option value="KE">Kenya</option>
                  <option value="MX">Mexico</option>
                  <option value="IN">India</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="City (optional)"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                />
              </div>
              <div className="p-4 bg-spirit-50 rounded-xl">
                <p className="text-sm text-spirit-700">
                  Your location helps us connect you with local believers for in-person fellowship,
                  resource sharing, and community support.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-grace-500 to-grace-600 mb-4">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-bread-900">
                Welcome to the Family!
              </h1>
              <p className="text-gray-600 leading-relaxed">
                You are now part of the global body of Christ on The Living Bread.
                Your journey of faith, fellowship, and service begins now.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-bread-50 rounded-xl text-center">
                  <Users className="h-8 w-8 text-bread-500 mx-auto mb-2" />
                  <p className="font-semibold text-bread-900">1,247,893</p>
                  <p className="text-sm text-gray-500">Brothers & Sisters</p>
                </div>
                <div className="p-4 bg-kingdom-50 rounded-xl text-center">
                  <Globe className="h-8 w-8 text-kingdom-500 mx-auto mb-2" />
                  <p className="font-semibold text-bread-900">127</p>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Enter Your Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={nextStep}
              className="btn-primary flex items-center gap-2"
            >
              {currentStep === 4 ? 'Complete' : 'Continue'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
