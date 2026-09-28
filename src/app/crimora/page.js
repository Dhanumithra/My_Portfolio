'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CrimoraPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#030712', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0], opacity: [0.1, 0.3, 0.1] }} 
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', top: '10%', right: '-10%' }}
      />

      {/* Grid Pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, pointerEvents: 'none' }} />

      <Link href="/" style={{ position: 'absolute', top: '3rem', left: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '2px', zIndex: 10 }}>
        <ArrowLeft size={18} /> BACK TO PORTFOLIO
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ zIndex: 1, textAlign: 'center' }}
      >
        <motion.h1 
          animate={{ textShadow: ['0 0 20px rgba(139,92,246,0.3)', '0 0 40px rgba(139,92,246,0.6)', '0 0 20px rgba(139,92,246,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: '#fff', letterSpacing: '10px', margin: 0, textTransform: 'uppercase' }}
        >
          Crimora
        </motion.h1>
        
        <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, #8b5cf6, transparent)', margin: '2rem auto' }} />

        <p style={{ fontFamily: 'var(--font-mono)', color: '#8b5cf6', fontSize: '1rem', letterSpacing: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
          Coming Soon...
        </p>

        <p style={{ fontFamily: 'var(--font-body)', color: '#94a3b8', maxWidth: '400px', margin: '2rem auto 0', lineHeight: 1.6 }}>
          Automated offender profiling and cross-jurisdictional linkage is currently in development.
        </p>
      </motion.div>
    </main>
  )
}
