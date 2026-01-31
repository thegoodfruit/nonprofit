'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Globe,
  Users,
  HandHeart,
  Sparkles,
  Heart,
  BookOpen
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
  { href: '/kingdom', label: 'Kingdom Dashboard', icon: Globe },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/resources', label: 'Resources', icon: HandHeart },
  { href: '/immanuel', label: 'Immanuel', icon: Sparkles },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-bread-200/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bread-500 to-kingdom-500 shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden font-serif text-xl font-bold text-bread-900 sm:block">
              The Living Bread
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-bread-700 hover:bg-bread-50 rounded-lg transition-colors"
              >
                <link.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/join"
              className="btn-primary text-sm py-2 px-4"
            >
              Join the Fellowship
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-bread-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-bread-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-bread-700 hover:bg-bread-50 rounded-lg transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-bread-100">
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="block w-full btn-primary text-center"
                >
                  Join the Fellowship
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
