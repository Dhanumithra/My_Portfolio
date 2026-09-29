'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Html, Float, MeshTransmissionMaterial, Torus } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Briefcase, Code2, GraduationCap, Mail, Phone,
  ArrowRight, Sparkles, Trophy, Zap, Globe2, ChevronRight, MapPin
} from 'lucide-react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

/* ═══════════════════════════════ THEME ═══════════════════════════════ */
const T = {
  primary: '#818cf8',
  secondary: '#2dd4bf',
  accent: '#f472b6',
  bg: '#030712',
  card: 'rgba(8, 14, 32, 0.9)',
  border: 'rgba(255,255,255,0.07)',
  text: '#f8fafc',
  muted: '#64748b',
  sans: "var(--font-syne, 'Syne', sans-serif)",
  mono: "var(--font-mono, 'Space Mono', monospace)",
  body: "var(--font-body, 'DM Sans', sans-serif)",
}

/* ═══════════════════════════════ DATA ═══════════════════════════════ */
const DATA = {
  PROJECTS: [
    {
      title: 'CRIMORA',
      tag: 'Automated Offender Profiling',
      year: '2025',
      desc: 'Applied graph mining, link prediction, and generative AI to model cross-jurisdictional crime linkages and extract forensic entities from unstructured narratives.',
      github: 'https://github.com/Dhanumithra/Crimora',
      link: '/crimora',
      tech: ['Python', 'PyTorch', 'Hugging Face'],
    },
    {
      title: 'THOUGHTTYPE',
      tag: 'Timed Articulation Platform',
      year: '2024',
      desc: 'Built a software platform to measure thought-to-text synthesis speed featuring a dual-timer execution engine and a hesitation heatmap for behavioral analysis.',
      github: 'https://github.com/Dhanumithra/ThoughtType',
      link: 'https://thought-type.vercel.app/',
      tech: ['Software Developer'],
    },
  ],
  EXPERIENCE: [
    {
      role: 'Software Development Intern',
      co: 'Lakshmi Groups (LSS)',
      period: 'Jan 2026 – Jun 2026',
      points: [
        'Led requirement-gathering sessions and built interactive Figma prototypes, reducing UI/UX rework by 25%.',
        'Collaborated to architect MongoDB schemas and implement scalable CRUD operations.',
      ],
    },
    {
      role: 'Manual Website Tester',
      co: 'Groomsy Ltd',
      period: 'Apr 2026 – May 2026',
      points: [
        'Conducted functional, UI, and cross-browser testing across 8+ web modules.',
        'Logged and tracked 25+ defects; ran regression cycles for stable production releases.',
      ],
    },
  ],
  SKILLS: {
    Languages: ['C', 'C++', 'Python', 'SQL'],
    'Web & Frameworks': ['React.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend & Cloud': ['MySQL', 'MongoDB', 'PL/SQL', 'Django'],
    'Tools & Practices': ['Git/GitHub', 'Figma', 'DSA', 'Manual Testing'],
    'Soft Skills': ['Stakeholder Communication', 'Technical Presentations', 'Critical Thinking'],
    'Core CS': ['Operating Systems', 'DBMS', 'Computer Networks', 'Object Oriented Programming'],
  },
  ACHIEVEMENTS: [
    { color: T.secondary, label: '1st Place, CODE BUZZ (FOSS)', sub: 'Solved three competitive programming problems in under 35 minutes, outperforming the first-year M.Sc. cohort.' },
    { color: '#facc15', label: '2nd Place, Astronova Puzzles', sub: 'Solved competitive programming problems in the contest conducted by IT department symposium Astranova in CIT Coimbatore.' },
    { color: T.primary, label: 'NPTEL Certifications', sub: ['Programming in Modern C++ (Topper)', 'Data Structures and Algorithms Using Python'] },
    { color: '#34d399', label: 'Outreach Coordinator, FOSS CIT', sub: 'Delivered a hands-on Flask workshop as an invited speaker, mentoring 50+ students.' },
    { color: T.accent, label: 'Representative & Editing Team, 403 Strats Club', sub: 'Lead Organizer for "Hack the Crack", directed an end-to-end technical event for 50+ participants.' },
    { color: '#c084fc', label: 'Joint Secretary, VIYUGAM', sub: 'Managed technical support and contributed to board-level decisions (Rotaract Club, Vaagai Gang 50).' },
  ],
  RESUME: {
    degree: 'M.Sc. Software Systems',
    college: 'Coimbatore Institute of Technology',
    period: '2024 – 2029',
    cgpa: '8.64 / 10',
    board12: 'State Board — 89% (2024)',
    board10: 'State Board — 95.2% (2022)',
    text: 'A detail-obsessed software developer, quality engineer, and data analyst with production experience in web engineering, software testing, and a deep interest in crafting scalable, robust data solutions.',
    files: [
      { label: 'SDE RESUME', url: '/SDE.pdf' },
      { label: 'DATA RESUME', url: '/Data.pdf' }
    ],
  },
  CONTACT: {
    email: 'dhanumithra6002@gmail.com',
    phone: '+91 6369909885',
    linkedin: 'linkedin.com/in/dhanumithra-t',
    github: 'github.com/Dhanumithra',
    location: 'Coimbatore, Tamil Nadu, India',
    availability: 'Open to internships & part-time roles',
  },
}

const SECTIONS = Object.keys(DATA)

/* ═══════════════════════════════ PRELOADER ═══════════════════════════════ */

// Animated glitch slash bars
function GlitchBars() {
  const [bars, setBars] = useState([])
  useEffect(() => {
    const iv = setInterval(() => {
      // Randomly spawn 0–3 bars
      const count = Math.floor(Math.random() * 3)
      setBars(Array.from({ length: count }, () => ({
        id: Math.random(),
        top: Math.random() * 100,
        height: 2 + Math.random() * 18,
        color: Math.random() > 0.5 ? '#ff0050' : '#00f5ff',
        opacity: 0.12 + Math.random() * 0.22,
        xOffset: (Math.random() - 0.5) * 6,
      })))
    }, 96)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 3 }}>
      {bars.map(b => (
        <div key={b.id} style={{
          position: 'absolute', left: 0, right: 0,
          top: `${b.top}%`, height: b.height,
          background: b.color, opacity: b.opacity,
          transform: `translateX(${b.xOffset}vw)`,
          mixBlendMode: 'screen',
        }} />
      ))}
    </div>
  )
}

// Subtle noise scanline
function ScanLines() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.3) 0,rgba(0,0,0,0.3) 1px,transparent 1px,transparent 3px)',
    }} />
  )
}

function Preloader({ onDone }) {
  const [count, setCount] = useState(3)
  const [phase, setPhase] = useState('count') // count | burst | flash | reveal | exit
  const [gx, setGx] = useState(0)
  const [gy, setGy] = useState(0)
  const [shake, setShake] = useState({ x: 0, y: 0 })
  const [colorBurst, setColorBurst] = useState(null) // 'red' | 'cyan' | null

  // Faster glitch jitter — 35% overall speedup
  useEffect(() => {
    const iv = setInterval(() => {
      setGx((Math.random() - 0.5) * 20)
      setGy((Math.random() - 0.5) * 8)
    }, 54)
    return () => clearInterval(iv)
  }, [])

  // Screen shake pulses every ~240ms
  useEffect(() => {
    const iv = setInterval(() => {
      const intensity = Math.random() > 0.7 ? 6 : 2
      setShake({ x: (Math.random() - 0.5) * intensity, y: (Math.random() - 0.5) * intensity * 0.5 })
      setTimeout(() => setShake({ x: 0, y: 0 }), 64)
    }, 240)
    return () => clearInterval(iv)
  }, [])

  // Countdown — 35% faster overall, burst flash between each tick, skips 0
  useEffect(() => {
    let c = 3
    const doTick = () => {
      c--
      if (c > 0) {
        // Color burst between numbers
        const col = c % 2 === 0 ? 'red' : 'cyan'
        setColorBurst(col)
        setTimeout(() => setColorBurst(null), 64)
        setCount(c)
        setTimeout(doTick, 510)
      } else {
        setColorBurst('white')
        setTimeout(() => { setColorBurst(null); setPhase('reveal') }, 80)
        setTimeout(() => { setPhase('exit'); setTimeout(onDone, 560) }, 1900)
      }
    }
    const initial = setTimeout(doTick, 510)
    return () => clearTimeout(initial)
  }, [])

  const isReveal = phase === 'reveal' || phase === 'exit'

  // Background flicker color
  const bgColor = colorBurst === 'red' ? '#1a0005'
    : colorBurst === 'cyan' ? '#001a1a'
    : colorBurst === 'white' ? '#ffffff'
    : '#000'

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: bgColor,
            transition: 'background 0.04s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            transform: `translate(${shake.x}px, ${shake.y}px)`,
          }}
        >
          <ScanLines />
          <GlitchBars />

          {/* ══ COUNTDOWN ══ */}
          {!isReveal && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              {/* Red chromatic ghost */}
              <span style={{
                position: 'absolute', fontFamily: T.sans, fontWeight: 800,
                fontSize: 'clamp(10rem, 28vw, 26rem)', lineHeight: 1,
                userSelect: 'none', color: 'transparent',
                WebkitTextStroke: '2px #ff0050',
                transform: `translate(${gx * 1.8}px, ${gy}px)`,
                opacity: 0.8, zIndex: 1,
              }}>{count}</span>

              {/* Cyan chromatic ghost */}
              <span style={{
                position: 'absolute', fontFamily: T.sans, fontWeight: 800,
                fontSize: 'clamp(10rem, 28vw, 26rem)', lineHeight: 1,
                userSelect: 'none', color: 'transparent',
                WebkitTextStroke: '2px #00f5ff',
                transform: `translate(${-gx * 1.2}px, ${-gy * 0.6}px)`,
                opacity: 0.8, zIndex: 1,
              }}>{count}</span>

              {/* Solid white main number */}
              <motion.span
                key={count}
                initial={{ scale: 1.6, opacity: 0, filter: 'blur(20px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  fontFamily: T.sans, fontWeight: 800,
                  fontSize: 'clamp(10rem, 28vw, 26rem)',
                  color: 'white', lineHeight: 1,
                  position: 'relative', zIndex: 2,
                  textShadow: '0 0 120px rgba(255,255,255,0.4)',
                }}
              >{count}</motion.span>

              {/* Countdown ring */}
              <svg style={{ position: 'absolute', width: '110%', height: '110%', top: '-5%', left: '-5%', zIndex: 0 }}
                viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <motion.circle cx="50" cy="50" r="46" fill="none"
                  stroke={count === 3 ? T.primary : count === 2 ? T.secondary : T.accent}
                  strokeWidth="0.8" strokeLinecap="round"
                  strokeDasharray="289"
                  animate={{ strokeDashoffset: 289 * (1 - count / 3) }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
            </div>
          )}

          {/* ══ REVEAL ══ */}
          {isReveal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>

              {/* Letters slam down */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1px, 0.8vw, 8px)', flexWrap: 'nowrap' }}>
                {'DHANUMITHRA T'.split('').map((ch, i) =>
                  ch === ' '
                    ? <span key={i} style={{ display: 'inline-block', width: 'clamp(4px, 1.2vw, 20px)' }} />
                    : (
                      <motion.span key={i}
                        initial={{ y: '-150%', opacity: 0, rotate: Math.random() > 0.5 ? -20 : 20 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.035 }}
                        style={{
                          display: 'inline-block', fontFamily: T.sans, fontWeight: 800,
                          fontSize: 'clamp(1.1rem, 6.5vw, 4rem)',
                          color: 'white',
                          textShadow: `3px 0 10px ${T.primary}, -3px 0 10px ${T.secondary}`,
                        }}
                      >{ch}</motion.span>
                    )
                )}
              </div>

              {/* Gradient rule */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
                style={{ height: 1, width: '100%', background: `linear-gradient(90deg, transparent, ${T.primary}, ${T.secondary}, transparent)`, transformOrigin: 'left' }}
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                style={{ fontFamily: T.mono, color: T.secondary, fontSize: '0.75rem', letterSpacing: '5px', margin: 0 }}
              >M.SC. SOFTWARE SYSTEMS · 2026</motion.p>
            </motion.div>
          )}

          {/* Corner brackets */}
          {['tl','tr','bl','br'].map(p => (
            <div key={p} style={{
              position: 'absolute',
              top: p.startsWith('t') ? '1.8rem' : 'auto', bottom: p.startsWith('b') ? '1.8rem' : 'auto',
              left: p.endsWith('l') ? '1.8rem' : 'auto', right: p.endsWith('r') ? '1.8rem' : 'auto',
              width: 28, height: 28,
              borderTop: p.startsWith('t') ? `2px solid ${T.primary}` : 'none',
              borderBottom: p.startsWith('b') ? `2px solid ${T.primary}` : 'none',
              borderLeft: p.endsWith('l') ? `2px solid ${T.primary}` : 'none',
              borderRight: p.endsWith('r') ? `2px solid ${T.primary}` : 'none',
              opacity: 0.5,
            }} />
          ))}

          {/* REC */}
          {!isReveal && (
            <div style={{ position: 'absolute', top: '2rem', right: '5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff0050', animation: `recBlink ${count < 2 ? '0.4s' : '0.8s'} step-end infinite` }} />
              <span style={{ fontFamily: T.mono, color: 'white', fontSize: '0.65rem', letterSpacing: '2px' }}>REC</span>
              <style>{`@keyframes recBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          )}

          {/* Timecode */}
          {!isReveal && (
            <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem', fontFamily: T.mono, fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
              00:00:{String(3 - count).padStart(2, '0')} / 00:00:03
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}


/* ═══════════════════════════════ 3D SCENE ═══════════════════════════════ */





function CameraRig({ open, isMobile }) {
  const { camera } = useThree()
  useFrame(() => {
    const target = open ? (isMobile ? 55 : 38) : (isMobile ? 80 : 55)
    camera.fov += (target - camera.fov) * 0.03
    camera.updateProjectionMatrix()
  })
  return null
}

function Globe({ open, isMobile }) {
  const outer = useRef(), inner = useRef(), ring1 = useRef(), ring2 = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const s = open ? 0.025 : 0.008
    outer.current.rotation.y += s
    outer.current.rotation.x = Math.sin(t * 0.08) * 0.04
    inner.current.rotation.y -= s * 2
    inner.current.rotation.z += s * 1.2
    ring1.current.rotation.z += 0.003
    ring2.current.rotation.z -= 0.002
    ring2.current.rotation.x = Math.sin(t * 0.05) * 0.3 + 0.8
  })
  return (
    <group scale={isMobile ? 0.75 : 1}>
      {/* Atmospheric glow sphere */}
      <mesh scale={1.18}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial color={T.primary} transparent opacity={0.04} />
      </mesh>

      {/* Outer glass */}
      <mesh ref={outer}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshTransmissionMaterial backside samples={16} thickness={1.5}
          chromaticAberration={0.6} anisotropy={0.4} distortion={0.35}
          distortionScale={0.6} temporalDistortion={0.12} color="#dbeafe"
          transmission={1} roughness={0.02} clearcoat={1} />
      </mesh>

      {/* Inner wireframe core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial color={T.primary} wireframe emissive={T.secondary} emissiveIntensity={2.5} transparent opacity={0.4} />
      </mesh>

      {/* Equatorial ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[3.4, 0.02, 16, 120]} />
        <meshStandardMaterial color={T.secondary} emissive={T.secondary} emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>

      {/* Tilted ring 2 */}
      <mesh ref={ring2} rotation={[0.8, 0.3, 0]}>
        <Torus args={[3.9, 0.012, 16, 120]} />
        <meshStandardMaterial color={T.accent} emissive={T.accent} emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function Asteroids() {
  const group = useRef()
  const positions = useRef(
    Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
      speed: Math.random() * 0.003 + 0.001,
      size: Math.random() * 0.06 + 0.02,
    }))
  )
  useFrame(() => {
    group.current.children.forEach((m, i) => {
      m.rotation.x += positions.current[i].speed
      m.rotation.y += positions.current[i].speed * 0.7
    })
  })
  return (
    <group ref={group}>
      {positions.current.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <dodecahedronGeometry args={[p.size, 0]} />
          <meshStandardMaterial color="rgba(255,255,255,0.5)" emissive={T.primary} emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Nodes({ onSelect, open, isMobile }) {
  const group = useRef()
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.04
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.04) * 0.05
  })

  const R = 5.8
  const nodes = SECTIONS.map((s, i) => {
    const a = (i / SECTIONS.length) * Math.PI * 2
    return { s, pos: [R * Math.cos(a), Math.sin(a * 2) * 1.4, R * Math.sin(a)] }
  })

  return (
    <group ref={group}>
      {nodes.map(({ s, pos }) => (
        <Float key={s} speed={1.5} rotationIntensity={0.1} floatIntensity={0.8}>
          <group position={pos}>
            {/* Anchor dot */}
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color={T.accent} emissive={T.accent} emissiveIntensity={3} />
            </mesh>
            <Html center distanceFactor={isMobile ? 18 : 14}>
              <NodeCard label={s} onSelect={onSelect} open={open} isMobile={isMobile} />
            </Html>
          </group>
        </Float>
      ))}
    </group>
  )
}

function NodeCard({ label, onSelect, open, isMobile }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={() => onSelect(label)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: isMobile ? '8px 16px' : '10px 26px',
        background: hov ? T.primary : 'rgba(3,7,18,0.6)',
        border: `1px solid ${hov ? T.primary : 'rgba(255,255,255,0.12)'}`,
        borderLeft: `3px solid ${T.secondary}`,
        color: hov ? '#000' : T.text,
        cursor: 'pointer',
        fontFamily: T.mono,
        fontWeight: 700,
        fontSize: isMobile ? '0.7rem' : '0.8rem',
        letterSpacing: '3px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        opacity: open ? 0.15 : 1,
        pointerEvents: open ? 'none' : 'auto',
        transform: hov ? 'scale(1.06) translateX(4px)' : 'scale(1)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
        boxShadow: hov ? `0 0 20px ${T.primary}55` : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {label}
    </div>
  )
}

/* ═══════════════════════════════ MODAL CONTENT ═══════════════════════════════ */
const cV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }
const iV = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 16 } } }

function GCard({ children, style = {}, className = '' }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div variants={iV}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${hov ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'}`,
        borderRadius: 16,
        padding: 'clamp(1.2rem, 4vw, 2.5rem)',
        fontFamily: T.body,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
    >
      {hov && (
        <motion.div initial={{ x: '-100%', opacity: 0.1 }} animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }}
        />
      )}
      {children}
    </motion.div>
  )
}

function Pill({ children, color = T.primary }) {
  return (
    <span style={{ padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600, fontFamily: T.mono, color, background: `${color}15`, border: `1px solid ${color}30`, letterSpacing: '0.5px' }}>
      {children}
    </span>
  )
}

function Label({ children }) {
  return <p style={{ fontFamily: T.mono, color: T.muted, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>{children}</p>
}

function Content({ tab, isMobile }) {
  const d = DATA[tab]
  const [resOpen, setResOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')

  const handleContact = async (e) => {
    e.preventDefault()
    setFormStatus('loading')
    const formData = new FormData(e.target)
    formData.append('access_key', 'dc65cdbf-1fc4-4570-b20e-24aae671a22a')
    
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      if (res.ok) {
        setFormStatus('success')
        e.target.reset()
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }
  switch (tab) {

    case 'PROJECTS':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {d.map((p, i) => (
            <GCard key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: T.text, fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px', fontFamily: T.sans }}>{p.title}</h3>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <a href={p.github} target="_blank" style={{ color: T.muted, transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color=T.primary} onMouseOut={e=>e.currentTarget.style.color=T.muted}><Code2 size={20} /></a>
                  <a href={p.link} target="_blank" style={{ color: T.muted, transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color=T.secondary} onMouseOut={e=>e.currentTarget.style.color=T.muted}><Globe2 size={20} /></a>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>{p.desc}</p>
              
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                {p.tech.map(t => <Pill key={t} color={T.muted}>{t}</Pill>)}
              </div>
            </GCard>
          ))}
        </motion.div>
      )

    case 'EXPERIENCE':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {d.map((e, i) => (
            <GCard key={i}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                <h3 style={{ color: T.text, fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.5px', fontFamily: T.sans }}>{e.role}</h3>
                <p style={{ color: T.primary, fontFamily: T.mono, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{e.co}</p>
                <Pill color={T.secondary}>{e.period}</Pill>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0 }}>
                {e.points.map((pt, j) => (
                  <li key={j} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <ChevronRight size={16} color={T.accent} style={{ marginTop: 3, flexShrink: 0 }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </GCard>
          ))}
        </motion.div>
      )

    case 'SKILLS':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {Object.entries(d).map(([cat, skills]) => (
            <GCard key={cat} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent }} />
                <h4 style={{ fontFamily: T.mono, color: T.text, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>{cat.toUpperCase()}</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignContent: 'flex-start', flex: 1 }}>
                {skills.map(s => <Pill key={s}>{s}</Pill>)}
              </div>
            </GCard>
          ))}
        </motion.div>
      )

    case 'ACHIEVEMENTS':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {d.map((item, i) => (
            <GCard key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{ flexShrink: 0, marginTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
              </div>
              <div>
                <p style={{ color: T.text, fontWeight: 700, fontSize: '1.05rem', fontFamily: T.sans, marginBottom: '0.4rem', letterSpacing: '0.5px' }}>{item.label}</p>
                {Array.isArray(item.sub) ? (
                  <ul style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: T.body, paddingLeft: '1.2rem', margin: 0 }}>
                    {item.sub.map((li, idx) => <li key={idx} style={{ marginBottom: '0.3rem' }}>{li}</li>)}
                  </ul>
                ) : (
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: T.body }}>{item.sub}</p>
                )}
              </div>
            </GCard>
          ))}
        </motion.div>
      )

    case 'RESUME':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Main card */}
          <GCard style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${T.primary}15`, border: `1px solid ${T.primary}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
              <GraduationCap size={28} color={T.primary} />
            </div>
            <h3 style={{ color: T.text, fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: T.sans, letterSpacing: '-0.5px' }}>{d.college}</h3>
            <p style={{ color: T.secondary, fontFamily: T.mono, fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1.2rem' }}>{d.degree} · {d.period}</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 1.5rem', fontSize: '0.95rem', fontFamily: T.body }}>{d.text}</p>
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: 45 }}>
              <AnimatePresence mode="wait">
                {!resOpen ? (
                  <motion.button 
                    key="btn-main"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                    onClick={() => setResOpen(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: '#fff', color: '#000', padding: '0.8rem 2rem', borderRadius: 100, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px', fontFamily: T.mono, transition: 'box-shadow 0.3s' }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = `0 10px 25px rgba(255,255,255,0.2)`}
                    onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    DOWNLOAD RESUME <ChevronRight size={18} />
                  </motion.button>
                ) : (
                  <motion.div 
                    key="btn-group"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
                  >
                    {d.files.map((f, idx) => (
                      <motion.a key={f.label} href={f.url} target="_blank"
                        onClick={() => setResOpen(false)}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.1 } }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`, color: T.text, padding: '0.7rem 1.5rem', borderRadius: 100, fontWeight: 700, textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px', transition: 'all 0.2s', fontFamily: T.mono }}
                        onMouseOver={e => { e.currentTarget.style.background = idx===0 ? T.primary : T.secondary; e.currentTarget.style.color = '#000' }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = T.text }}
                      >
                        {f.label} <ArrowRight size={16} />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GCard>

          {/* Academic stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { lbl: 'CGPA', val: d.cgpa, color: T.primary },
              { lbl: 'CLASS XII', val: d.board12, color: T.secondary },
              { lbl: 'CLASS X', val: d.board10, color: T.accent },
            ].map(({ lbl, val, color }) => (
              <motion.div variants={iV} key={lbl} style={{ background: 'rgba(255, 255, 255, 0.02)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: 16, padding: '1.2rem 1rem', textAlign: 'center', fontFamily: T.body, backdropFilter: 'blur(10px)' }}>
                <p style={{ fontFamily: T.mono, color: T.muted, fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 700 }}>{lbl}</p>
                <p style={{ color, fontWeight: 700, fontSize: '1.1rem', fontFamily: T.sans }}>{val}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )

    case 'CONTACT':
      return (
        <motion.div variants={cV} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
          
          {/* Left Column: Grid of Info */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: <Mail size={20} color={T.secondary} />, label: 'EMAIL', val: d.email, href: `mailto:${d.email}`, c: T.secondary },
              { icon: <Phone size={20} color={T.primary} />, label: 'PHONE', val: d.phone, href: `tel:${d.phone.replace(/\s+/g, '')}`, c: T.primary },
              { icon: <Briefcase size={20} color="#0ea5e9" />, label: 'LINKEDIN', val: 'Dhanumithra T', href: `https://${d.linkedin}`, c: '#0ea5e9' },
              { icon: <Code2 size={20} color={T.text} />, label: 'GITHUB', val: 'Dhanumithra', href: `https://${d.github}`, c: T.text },
            ].map(({ icon, label, val, href, c }) => {
              const inner = (
                <GCard style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c}15`, border: `1px solid ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                  </div>
                  <div>
                    <Label>{label}</Label>
                    <p style={{ color: T.text, fontWeight: 600, fontSize: '0.9rem', wordBreak: 'break-all', fontFamily: T.sans }}>{val}</p>
                  </div>
                </GCard>
              )
              return (
                <motion.div variants={iV} key={label} style={{ height: '100%' }}>
                  {href ? <a href={href} target="_blank" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{inner}</a> : inner}
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Form & Banners */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.div variants={iV} style={{ background: `${T.secondary}12`, border: `1px solid ${T.secondary}30`, borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: T.body }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.secondary, boxShadow: `0 0 10px ${T.secondary}`, flexShrink: 0 }} />
              <p style={{ color: T.secondary, fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>{d.availability}</p>
            </motion.div>
            
            <motion.div variants={iV} style={{ background: 'rgba(255, 255, 255, 0.02)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: T.body, backdropFilter: 'blur(10px)' }}>
              <MapPin size={20} color={T.accent} />
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>{d.location}</p>
            </motion.div>

            <GCard style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ color: T.text, fontSize: '1.2rem', fontWeight: 700, fontFamily: T.sans, marginBottom: '1rem' }}>Let's Connect</h4>
              <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <input name="name" required type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: T.body, fontSize: '0.9rem', outline: 'none' }} />
                <input name="email" required type="email" placeholder="Your Email" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: T.body, fontSize: '0.9rem', outline: 'none' }} />
                <textarea name="message" required placeholder="Message" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: T.body, fontSize: '0.9rem', outline: 'none', resize: 'none', flex: 1 }} />
                <button type="submit" disabled={formStatus !== 'idle'} style={{ background: formStatus === 'success' ? '#34d399' : formStatus === 'error' ? '#f87171' : T.primary, color: '#000', padding: '0.8rem', borderRadius: 8, border: 'none', fontWeight: 700, fontFamily: T.mono, cursor: formStatus !== 'idle' ? 'default' : 'pointer', fontSize: '0.85rem', transition: 'background 0.3s' }}>
                  {formStatus === 'loading' ? 'SENDING...' : formStatus === 'success' ? 'SENT!' : formStatus === 'error' ? 'ERROR' : 'SEND MESSAGE'}
                </button>
              </form>
            </GCard>
          </div>
        </motion.div>
      )

    default: return null
  }
}

/* ═══════════════════════════════ PAGE ═══════════════════════════════ */
export default function Home() {
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState(null)
  const isMobile = useIsMobile()

  return (
    <main style={{ width: '100vw', height: '100vh', background: T.bg, overflow: 'hidden', position: 'relative', fontFamily: T.sans }}>
      {!ready && <Preloader onDone={() => setReady(true)} />}

      {/* ── 3D Canvas ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, cursor: 'grab' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: isMobile ? 80 : 55 }}>
          <CameraRig open={!!tab} isMobile={isMobile} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={3} color={T.primary} />
          <directionalLight position={[-10, -10, -5]} intensity={2} color={T.secondary} />
          <pointLight position={[0, 8, 0]} intensity={1.5} color={T.accent} />
          <Stars radius={100} depth={50} count={3500} factor={4} saturation={0} fade speed={0.2} />
          <Asteroids />
          <Globe open={!!tab} isMobile={isMobile} />
          <Nodes onSelect={setTab} open={!!tab} isMobile={isMobile} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.25} enablePan={false} />
        </Canvas>
      </div>

      {/* ── Header ── */}
      <AnimatePresence>
        {!tab && ready && (
          <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: isMobile ? '1.5rem 2rem' : '2.5rem 4rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '1rem' : '0', zIndex: 5, pointerEvents: 'none' }}>
            <div>
              <p style={{ fontFamily: T.sans, fontWeight: 800, letterSpacing: isMobile ? '3px' : '6px', fontSize: isMobile ? 'clamp(1.1rem, 5vw, 1.5rem)' : '1.5rem', margin: 0, color: T.text, whiteSpace: 'nowrap' }}>DHANUMITHRA T</p>
              <p style={{ color: T.secondary, fontSize: isMobile ? '0.65rem' : '0.75rem', marginTop: '0.4rem', letterSpacing: isMobile ? '2px' : '4px', fontFamily: T.mono, fontWeight: 700, whiteSpace: 'nowrap' }}>M.SC. SOFTWARE SYSTEMS</p>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.6)', padding: '0.8rem 1.8rem', border: `1px solid rgba(129,140,248,0.25)`, backdropFilter: 'blur(12px)', borderRadius: 4 }}>
                <Globe2 size={16} color={T.primary} />
                <span style={{ color: T.muted, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', fontFamily: T.mono }}>DRAG TO EXPLORE</span>
              </div>
            )}
          </motion.header>
        )}
      </AnimatePresence>

      {/* Drag to explore mobile */}
      <AnimatePresence>
        {!tab && ready && isMobile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', bottom: '4.5rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.6)', padding: '0.8rem 1.8rem', border: `1px solid rgba(129,140,248,0.25)`, backdropFilter: 'blur(12px)', borderRadius: 4, whiteSpace: 'nowrap' }}>
              <Globe2 size={16} color={T.primary} />
              <span style={{ color: T.muted, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', fontFamily: T.mono }}>DRAG TO EXPLORE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Side-panel ── */}
      <AnimatePresence>
        {tab && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>

            {/* backdrop veil */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,7,18,0.6)', backdropFilter: 'blur(12px)', pointerEvents: 'none' }} />

            {/* FLOATING CLOSE BUTTON */}
            <button onClick={() => setTab(null)}
              style={{
                position: 'absolute', top: isMobile ? '1rem' : '2.5rem', right: isMobile ? '1rem' : '3.5rem', zIndex: 100,
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
                border: `1px solid rgba(255,255,255,0.1)`, color: T.text,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.boxShadow = `0 0 20px rgba(255,255,255,0.2)`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = T.text;
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <X size={20} />
            </button>

            {/* LEFT sidebar */}
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 160 }}
              style={{ position: 'relative', zIndex: 1, width: isMobile ? '100%' : 260, height: isMobile ? 'auto' : '100%', flexShrink: 0, padding: isMobile ? '1.5rem 4.5rem 1.5rem 1.5rem' : '4rem 2.5rem', display: 'flex', flexDirection: isMobile ? 'row' : 'column', justifyContent: isMobile ? 'flex-start' : 'space-between', borderRight: isMobile ? 'none' : `1px solid rgba(255,255,255,0.05)`, borderBottom: isMobile ? `1px solid rgba(255,255,255,0.05)` : 'none', background: 'rgba(255,255,255,0.01)', overflowX: isMobile ? 'auto' : 'visible' }}>

              {/* Section nav dots */}
              <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '1.5rem' : '0.7rem' }}>
                {SECTIONS.map(s => (
                  <button key={s} onClick={() => setTab(s)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.4rem 0', textAlign: 'left' }}>
                    <div style={{ width: s === tab ? 28 : 6, height: s === tab ? 3 : 6, borderRadius: s === tab ? 2 : '50%', background: s === tab ? T.primary : 'rgba(255,255,255,0.2)', transition: 'all 0.3s', flexShrink: 0 }} />
                    <span style={{ color: s === tab ? T.text : T.muted, fontSize: '0.75rem', fontFamily: T.mono, fontWeight: 700, letterSpacing: '1px', transition: 'color 0.2s' }}>{s}</span>
                  </button>
                ))}
              </nav>

              {/* Vertical section title */}
              <div style={{ writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl', transform: isMobile ? 'none' : 'rotate(180deg)', display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0, flex: 1, justifyContent: 'flex-end' }}>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: T.mono, letterSpacing: '5px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>PORTFOLIO /</p>
                <h2 style={{ color: T.text, fontFamily: T.sans, fontWeight: 700, fontSize: `min(2.5rem, ${55 / tab.length}vh)`, letterSpacing: '-1px', lineHeight: 1, whiteSpace: 'nowrap' }}>{tab}</h2>
              </div>
            </motion.aside>

            {/* CONTENT panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              transition={{ type: 'spring', damping: 26, stiffness: 160, delay: 0.08 }}
              style={{ position: 'relative', zIndex: 1, flex: 1, padding: isMobile ? '1.5rem' : '2rem 4rem', overflowY: 'auto', maxWidth: 1100 }}>

              {/* Content header */}
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                <h2 style={{ color: T.text, fontSize: '2rem', fontWeight: 700, letterSpacing: '-1px', fontFamily: T.sans }}>{tab}</h2>
                <div style={{ marginTop: '0.8rem', height: 4, width: 60, borderRadius: 2, background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})` }} />
              </div>

              <Content tab={tab} isMobile={isMobile} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
