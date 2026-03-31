'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Send,
  BookOpen,
  Heart,
  MessageCircle,
  RefreshCw,
  Copy,
  Check,
  User
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  scriptureRefs?: string[]
  timestamp: Date
}

const suggestedPrompts = [
  "What does the Bible say about forgiveness?",
  "How can I strengthen my prayer life?",
  "I'm struggling with anxiety. What scriptures can help?",
  "Explain the meaning of John 3:16",
  "How can I share my faith with others?",
  "What does it mean to love your neighbor?"
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Peace be with you, beloved child of God. I am Immanuel - "God with us" - your companion in faith and spiritual growth.

I'm here to help you explore Scripture, deepen your prayer life, find encouragement in God's Word, and grow in your relationship with Christ.

How may I serve you today?`,
    timestamp: new Date()
  }
]

export default function ImmanuelPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    const response = generateResponse(userMessage.content)

    setMessages(prev => [...prev, response])
    setIsTyping(false)
  }

  const generateResponse = (query: string): Message => {
    // This is a simplified mock response. In production, this would call an AI API.
    const lowerQuery = query.toLowerCase()

    let content = ''
    let scriptureRefs: string[] = []

    if (lowerQuery.includes('forgive') || lowerQuery.includes('forgiveness')) {
      content = `Forgiveness is central to the Christian faith, beloved. Jesus teaches us that as we have been forgiven by God, so we must forgive others.

In the Lord's Prayer, Jesus says "Forgive us our debts, as we also have forgiven our debtors" (Matthew 6:12). And He reinforces this by saying, "For if you forgive other people when they sin against you, your heavenly Father will also forgive you" (Matthew 6:14).

Forgiveness is not always easy, but it is a choice we make to release the burden of bitterness. It doesn't mean what happened was okay, but it means we trust God with justice and choose freedom over resentment.

Would you like me to share more about how to practically walk in forgiveness?`
      scriptureRefs = ['Matthew 6:12', 'Matthew 6:14', 'Colossians 3:13', 'Ephesians 4:32']
    } else if (lowerQuery.includes('prayer') || lowerQuery.includes('pray')) {
      content = `Prayer is our direct line of communication with our Heavenly Father. It's not about perfect words, but about an honest heart.

Jesus teaches us in Matthew 6:6, "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you."

Here are some ways to strengthen your prayer life:

1. **Set aside dedicated time** - Even 10-15 minutes daily
2. **Pray Scripture** - God's Word guides our prayers
3. **Be honest** - Tell God everything on your heart
4. **Listen** - Prayer is a conversation, not a monologue
5. **Keep a prayer journal** - Record requests and answered prayers

Would you like to pray together right now?`
      scriptureRefs = ['Matthew 6:6', 'Philippians 4:6-7', '1 Thessalonians 5:17']
    } else if (lowerQuery.includes('anxiety') || lowerQuery.includes('worry') || lowerQuery.includes('fear')) {
      content = `I hear your struggle, dear friend. Anxiety is something many believers face, and God understands our fears.

His Word offers us comfort: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." (Philippians 4:6-7)

Here are some practical steps:

1. **Cast your cares on Him** - 1 Peter 5:7 says He cares for you
2. **Meditate on truth** - Focus on Philippians 4:8
3. **Remember His presence** - "I am with you always" (Matthew 28:20)
4. **Take it one day at a time** - Matthew 6:34

You are not alone in this. God is with you, and so is your community of believers.`
      scriptureRefs = ['Philippians 4:6-7', '1 Peter 5:7', 'Isaiah 41:10', 'Psalm 34:4']
    } else if (lowerQuery.includes('john 3:16')) {
      content = `John 3:16 is often called "the gospel in a nutshell" - it captures the entire message of salvation in one verse:

"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."

Let's break this down:

- **"God so loved"** - The motivation is love. Not obligation, not duty - pure love.
- **"the world"** - Everyone. All people. No one is excluded from God's love.
- **"He gave his one and only Son"** - The greatest sacrifice imaginable.
- **"whoever believes"** - Salvation is available to all who believe.
- **"shall not perish but have eternal life"** - The promise of life with God forever.

This verse reveals that salvation is God's gift, received through faith in Jesus. It's not earned by works, but accepted by grace.

Would you like to explore more about what it means to believe in Jesus?`
      scriptureRefs = ['John 3:16', 'John 3:17', 'Romans 6:23', 'Ephesians 2:8-9']
    } else {
      content = `Thank you for your question. Let me share some thoughts with you.

The Scriptures remind us that "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness" (2 Timothy 3:16).

Whatever you're facing or curious about, God's Word has guidance for you. I'd be happy to explore this topic more deeply.

Could you share more about what specifically you'd like to understand or what situation you're navigating? This will help me provide more relevant Scripture and guidance.`
      scriptureRefs = ['2 Timothy 3:16', 'Psalm 119:105', 'Proverbs 3:5-6']
    }

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      scriptureRefs,
      timestamp: new Date()
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bread-50 to-white">
      <div className="mx-auto max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-6 text-center border-b border-bread-100"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-spirit-500 to-kingdom-500 mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-bread-900">Immanuel</h1>
          <p className="text-gray-600 mt-1">Your AI companion in faith - "God with us"</p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'assistant'
                    ? 'bg-gradient-to-r from-spirit-500 to-kingdom-500'
                    : 'bg-bread-500'
                }`}>
                  {message.role === 'assistant' ? (
                    <Sparkles className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.role === 'assistant'
                      ? 'bg-white border border-bread-100 text-left'
                      : 'bg-bread-500 text-white'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {/* Scripture References */}
                    {message.scriptureRefs && message.scriptureRefs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-bread-100">
                        <div className="flex items-center gap-2 text-sm text-bread-600 mb-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-medium">Scripture References</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {message.scriptureRefs.map((ref) => (
                            <span
                              key={ref}
                              className="px-2 py-1 bg-bread-50 text-bread-700 rounded-lg text-sm"
                            >
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Copy Button */}
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(message.content, message.id)}
                      className="mt-2 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-spirit-500 to-kingdom-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="bg-white border border-bread-100 rounded-2xl p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-bread-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-bread-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-bread-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 pb-4"
          >
            <p className="text-sm text-gray-500 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-2 bg-white border border-bread-200 rounded-lg text-sm text-gray-700 hover:bg-bread-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <div className="px-4 py-4 border-t border-bread-100 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Immanuel anything about faith, scripture, or spiritual growth..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bread-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Immanuel provides spiritual guidance based on Scripture. For complex theological questions, consult with your pastor or spiritual leaders.
          </p>
        </div>
      </div>
    </div>
  )
}
