'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  BookOpen,
  Heart,
  Users,
  MessageCircle,
  HelpCircle,
  Send,
  Eye,
  EyeOff
} from 'lucide-react'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

const postTypes = [
  { id: 'testimony', label: 'Testimony', icon: BookOpen, description: 'Share how God has worked in your life' },
  { id: 'prayer_request', label: 'Prayer Request', icon: Heart, description: 'Ask the community to pray for you' },
  { id: 'praise', label: 'Praise Report', icon: Users, description: 'Celebrate answered prayers' },
  { id: 'encouragement', label: 'Encouragement', icon: MessageCircle, description: 'Lift up and encourage others' },
  { id: 'question', label: 'Question', icon: HelpCircle, description: 'Seek wisdom from fellow believers' }
]

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [content, setContent] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedType || !content.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)

    // Reset and close
    setSelectedType(null)
    setContent('')
    setScriptureRef('')
    onClose()
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
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-bread-900">Share with the Community</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your words can encourage and uplift fellow believers
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Post Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What would you like to share?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {postTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedType === type.id
                          ? 'border-bread-500 bg-bread-50'
                          : 'border-gray-200 hover:border-bread-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        selectedType === type.id
                          ? 'bg-bread-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <type.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    selectedType === 'testimony'
                      ? 'Share how God has been working in your life...'
                      : selectedType === 'prayer_request'
                      ? 'Share what you need prayer for...'
                      : selectedType === 'praise'
                      ? 'Celebrate what God has done...'
                      : selectedType === 'encouragement'
                      ? 'Share words of encouragement...'
                      : 'Ask your question...'
                  }
                  rows={5}
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
                    placeholder="e.g., Romans 8:28"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {isAnonymous ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">Post Anonymously</p>
                    <p className="text-sm text-gray-500">
                      {isAnonymous
                        ? 'Your identity will be hidden from others'
                        : 'Your name will be visible to the community'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAnonymous ? 'bg-bread-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAnonymous ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedType || !content.trim() || isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Share with Community
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
