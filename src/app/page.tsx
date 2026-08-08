'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center text-white space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Rofaqaa</h1>
            <p className="text-xl md:text-2xl text-white/80">رفقاء - Connect with Moroccan Students</p>
          </motion.div>

          <motion.p variants={item} className="text-lg text-white/90 max-w-2xl mx-auto">
            A safe and secure social platform exclusively for students in Morocco. Connect, chat, and
            build friendships with peers in your schools and universities.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={item} className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: '🔒',
                title: 'Private & Secure',
                description: 'Your data is encrypted and secure. Only verified students can join.',
              },
              {
                icon: '💬',
                title: 'Real-time Chat',
                description: 'Connect instantly with friends through private and group messages.',
              },
              {
                icon: '👥',
                title: 'Find Friends',
                description: 'Discover and connect with students from your school or city.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-white"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
