'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  BookOpen,
  Music,
  Video,
  Mic,
  Heart,
  MessageCircle,
  Users,
  Clock,
  Calendar,
  Check
} from 'lucide-react'

interface ManualEntryModalProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { id: 'bible_reading', icon: BookOpen, label: 'Bible Reading', color: 'bg-spirit-100 text-spirit-600' },
  { id: 'prayer', icon: Heart, label: 'Prayer', color: 'bg-love-100 text-love-600' },
  { id: 'sermon', icon: Video, label: 'Sermon/Teaching', color: 'bg-bread-100 text-bread-600' },
  { id: 'worship', icon: Music, label: 'Worship Music', color: 'bg-kingdom-100 text-kingdom-600' },
  { id: 'podcast', icon: Mic, label: 'Podcast', color: 'bg-grace-100 text-grace-600' },
  { id: 'fellowship', icon: Users, label: 'Fellowship', color: 'bg-spirit-100 text-spirit-600' },
  { id: 'devotional', icon: BookOpen, label: 'Devotional', color: 'bg-bread-100 text-bread-600' },
  { id: 'other', icon: MessageCircle, label: 'Other', color: 'bg-gray-100 text-gray-600' }
]

export function ManualEntryModal({ isOpen, onClose }: ManualEntryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)

    // Reset and close after showing success
    setTimeout(() => {
      setSubmitted(false)
      setSelectedCategory(null)
      setDuration('')
      setDescription('')
      setScriptureRef('')
      onClose()
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-bread-900">Log Time with Christ</h2>
                <p className="text-sm text-gray-500 mt-1">Record your spiritual activities manually</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-grace-100 text-grace-600 mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Activity Logged!</h3>
                <p className="text-gray-500">Your time with Christ has been recorded.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What did you do?
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                          selectedCategory === cat.id
                            ? 'ring-2 ring-bread-500 bg-bread-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${cat.color}`}>
                          <cat.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="30"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What did you read, watch, or reflect on?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Scripture Reference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scripture Reference (optional)
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={scriptureRef}
                      onChange={(e) => setScriptureRef(e.target.value)}
                      placeholder="e.g., John 3:16"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!selectedCategory || !duration || isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Log Activity
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
