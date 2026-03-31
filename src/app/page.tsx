'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Heart,
  Users,
  Globe,
  BookOpen,
  HandHeart,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Time with Christ',
    description: 'Track your spiritual journey - every sermon watched, scripture read, and prayer offered.',
    href: '/dashboard',
    color: 'from-spirit-500 to-spirit-600'
  },
  {
    icon: Heart,
    title: 'Acts of Love',
    description: 'See your impact - prayers offered, forgiveness given, and lives touched.',
    href: '/dashboard/impact',
    color: 'from-love-500 to-love-600'
  },
  {
    icon: HandHeart,
    title: 'Share Resources',
    description: 'Offer or receive food, shelter, clothing, and services from fellow believers.',
    href: '/resources',
    color: 'from-grace-500 to-grace-600'
  },
  {
    icon: Users,
    title: 'Fellowship',
    description: 'Connect with brothers and sisters, share testimonies, and encourage one another.',
    href: '/community',
    color: 'from-bread-500 to-kingdom-500'
  },
  {
    icon: Globe,
    title: 'Kingdom Dashboard',
    description: 'Witness the collective impact - Christians helping Christians around the world.',
    href: '/kingdom',
    color: 'from-kingdom-500 to-kingdom-600'
  },
  {
    icon: Sparkles,
    title: 'Immanuel AI',
    description: 'A companion to guide you in scripture, prayer, and spiritual growth.',
    href: '/immanuel',
    color: 'from-spirit-400 to-kingdom-500'
  }
]

const stats = [
  { label: 'Prayers Offered', value: '1.2M+' },
  { label: 'Lives Fed', value: '50K+' },
  { label: 'Acts of Forgiveness', value: '340K+' },
  { label: 'Countries Reached', value: '127' }
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-bread-100/50 via-transparent to-kingdom-100/30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-6xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-bread-100 px-4 py-2 text-bread-700">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">John 6:51</span>
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-bread-900 md:text-6xl lg:text-7xl">
            The Living Bread
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl text-bread-700 md:text-2xl font-scripture italic">
            "I am the living bread that came down from heaven. Whoever eats this bread will live forever."
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            A platform bringing together all who believe in the name and power of Jesus Christ,
            in fellowship with one another, to love and share resources freely -
            building the Kingdom of God together.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
              Enter the Kingdom
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Scripture Banner */}
      <section className="bg-gradient-to-r from-bread-600 to-kingdom-600 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-scripture text-lg text-white/90 md:text-xl">
            "A new command I give you: Love one another. As I have loved you, so you must love one another.
            By this everyone will know that you are my disciples, if you love one another."
          </p>
          <p className="mt-2 text-sm text-white/70">— John 13:34-35</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card text-center"
              >
                <div className="impact-number">{stat.value}</div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-bread-50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">Building the Kingdom Together</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Experience faith in action through fellowship, service, and spiritual growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="group block h-full card-glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-bread-900 group-hover:text-bread-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-bread-600 font-medium">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-glass rounded-3xl p-8 md:p-12"
          >
            <MessageCircle className="mx-auto mb-6 h-12 w-12 text-bread-500" />
            <h2 className="section-title mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Living Bread seeks to empower the Children of God to live out their faith
              by being in fellowship with one another—forgiving each other's sins,
              encouraging and praying for one another, and giving thanks and praise to Christ—
              putting their faith into action through works.
            </p>
            <div className="mt-8 pt-8 border-t border-bread-200">
              <p className="font-scripture text-bread-700 italic">
                "Truly I tell you, whatever you did for one of the least of these
                brothers and sisters of mine, you did for me."
              </p>
              <p className="mt-2 text-sm text-gray-500">— Matthew 25:40</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-bread-600 via-kingdom-600 to-bread-700">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">
            Join the Fellowship
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Be part of a community where Christ is glorified through acts of love,
            service, and genuine fellowship.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-white text-bread-700 hover:bg-bread-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Begin Your Journey
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
