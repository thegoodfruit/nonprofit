'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Heart,
  BookOpen,
  Users,
  Plus,
  Filter,
  Send,
  Share2,
  Bookmark,
  MoreHorizontal
} from 'lucide-react'
import { CreatePostModal } from '@/components/community/create-post-modal'
import { formatTimeAgo } from '@/lib/utils'

type PostType = 'all' | 'testimony' | 'prayer_request' | 'praise' | 'encouragement' | 'question'

const postTypes = [
  { id: 'all', label: 'All Posts', icon: MessageCircle },
  { id: 'testimony', label: 'Testimonies', icon: BookOpen },
  { id: 'prayer_request', label: 'Prayer Requests', icon: Heart },
  { id: 'praise', label: 'Praise Reports', icon: Users },
  { id: 'encouragement', label: 'Encouragement', icon: MessageCircle },
  { id: 'question', label: 'Questions', icon: MessageCircle }
]

// Mock posts data
const posts = [
  {
    id: '1',
    type: 'testimony',
    author: 'Anonymous Child of God',
    content: 'I want to share how Christ transformed my life. After years of struggling with addiction, I finally surrendered everything to Him. Today marks 2 years of freedom! His grace is sufficient.',
    scripture: 'My grace is sufficient for you, for my power is made perfect in weakness. - 2 Corinthians 12:9',
    reactions: { pray: 45, amen: 23, love: 67 },
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isAnonymous: true
  },
  {
    id: '2',
    type: 'prayer_request',
    author: 'A Sister in Christ',
    content: 'Please pray for my family. We are facing financial hardship and my husband just lost his job. We trust in God\'s provision but ask for your prayers during this difficult season.',
    reactions: { pray: 89, amen: 12, love: 34 },
    comments: 28,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isAnonymous: true
  },
  {
    id: '3',
    type: 'praise',
    author: 'Grateful Servant',
    content: 'Update on my prayer request from last week: GOD DID IT! My daughter\'s surgery went perfectly and the doctors are amazed at her recovery. Thank you all for your prayers. Our God is faithful!',
    reactions: { pray: 12, amen: 156, love: 89 },
    comments: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isAnonymous: false
  },
  {
    id: '4',
    type: 'encouragement',
    author: 'Brother James',
    content: 'To whoever needs to hear this today: God has not forgotten you. He sees your tears, He knows your struggles, and He is working all things together for your good. Keep the faith!',
    scripture: 'And we know that in all things God works for the good of those who love him. - Romans 8:28',
    reactions: { pray: 34, amen: 78, love: 123 },
    comments: 19,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    isAnonymous: false
  },
  {
    id: '5',
    type: 'question',
    author: 'Seeking Wisdom',
    content: 'Brothers and sisters, I\'m struggling to forgive someone who hurt me deeply. How do you practically apply forgiveness when the pain is still so raw? I know God calls us to forgive, but I need guidance.',
    reactions: { pray: 56, amen: 8, love: 45 },
    comments: 34,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isAnonymous: true
  }
]

const reactionIcons = {
  pray: { emoji: '🙏', label: 'Pray' },
  amen: { emoji: '✝️', label: 'Amen' },
  love: { emoji: '❤️', label: 'Love' }
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<PostType>('all')
  const [showCreatePost, setShowCreatePost] = useState(false)

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.type === activeFilter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-serif font-bold text-bread-900">
            Community Feed
          </h1>
          <p className="mt-2 text-gray-600">
            Share testimonies, request prayers, and encourage one another in faith
          </p>
        </motion.div>

        {/* Create Post Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full flex items-center gap-4 p-4 card-glass rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bread-400 to-kingdom-400 flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-gray-500 flex-1 text-left">
              Share a testimony, prayer request, or encouragement...
            </span>
            <Plus className="h-5 w-5 text-bread-500" />
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 overflow-x-auto"
        >
          <div className="flex gap-2 pb-2">
            {postTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id as PostType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === type.id
                    ? 'bg-bread-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-bread-50'
                }`}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="card-glass rounded-2xl p-6"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bread-400 to-kingdom-400 flex items-center justify-center text-white font-bold text-sm">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="capitalize">{post.type.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Scripture Reference */}
                {'scripture' in post && post.scripture && (
                  <div className="mb-4 p-4 bg-bread-50 rounded-xl border-l-4 border-bread-400">
                    <p className="font-scripture text-bread-700 italic">
                      {post.scripture}
                    </p>
                  </div>
                )}

                {/* Reactions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    {Object.entries(post.reactions).map(([key, count]) => (
                      <button
                        key={key}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span>{reactionIcons[key as keyof typeof reactionIcons].emoji}</span>
                        <span className="text-sm text-gray-600">{count}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-bread-600">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-bread-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-bread-600">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
        />
      </div>
    </div>
  )
}
