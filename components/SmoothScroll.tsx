"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react"
import { ReactLenis, useLenis } from "lenis/react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

interface LenisPhysicsContextValue {
  isHydrated: boolean
  velocity: MotionValue<number>
  smoothVelocity: MotionValue<number>
  velocitySkew: MotionValue<number>
  velocityRotateX: MotionValue<number>
  velocityScale: MotionValue<number>
  velocityZ: MotionValue<number>
  progress: MotionValue<number>
}

const LenisPhysicsContext = createContext<LenisPhysicsContextValue | null>(null)

export function useLenisPhysics() {
  const ctx = useContext(LenisPhysicsContext)
  if (!ctx) {
    throw new Error("useLenisPhysics must be used inside SmoothScroll")
  }
  return ctx
}

const emptySubscribe = () => () => {}

function LenisBridge({ children }: { readonly children: React.ReactNode }) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const isMountedRef = useRef(false)
  const velocity = useMotionValue(0)
  const progress = useMotionValue(0)

  const smoothVelocity = useSpring(velocity, {
    stiffness: 130,
    damping: 28,
    mass: 0.5,
  })

  // Subtle, readable 3D camera pitch & Z-depth response (zero diagonal text distortion)
  const velocitySkew = useTransform(smoothVelocity, [-60, 0, 60], [0, 0, 0])
  const velocityRotateX = useTransform(
    smoothVelocity,
    [-50, 0, 50],
    [-6, 0, 6]
  )
  const velocityScale = useTransform(
    smoothVelocity,
    [-60, 0, 60],
    [0.975, 1, 0.975]
  )
  const velocityZ = useTransform(smoothVelocity, [-50, 0, 50], [-28, 0, -28])

  const ringRotate = useTransform(progress, [0, 1], [0, 360])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const lenis = useLenis((instance) => {
    if (!isMountedRef.current) return
    velocity.set(instance.velocity)
    progress.set(instance.progress)
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const onScroll = () => {
      if (!isMountedRef.current) return
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        velocity.set(0)
      }, 90)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("scroll", onScroll)
    }
  }, [velocity])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href || href === "#") return

      const el = document.querySelector(href) as HTMLElement | null
      if (el && lenis) {
        e.preventDefault()
        lenis.scrollTo(el, {
          offset: 0,
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [lenis])

  return (
    <LenisPhysicsContext.Provider
      value={{
        isHydrated,
        velocity,
        smoothVelocity,
        velocitySkew,
        velocityRotateX,
        velocityScale,
        velocityZ,
        progress,
      }}
    >
      {children}

      {/* Minimal Floating 3D Scroll Gyroscope (Bottom Right) */}
      <div className="hidden lg:flex fixed bottom-7 right-7 z-40 pointer-events-none select-none scene-3d">
        <motion.div
          style={
            isHydrated
              ? {
                  rotateZ: ringRotate,
                  rotateX: velocityRotateX,
                }
              : undefined
          }
          className="w-14 h-14 rounded-full border border-accent-orange/40 flex items-center justify-center preserve-3d bg-paper-surface/40 backdrop-blur-sm"
        >
          <div className="w-9 h-9 rounded-full border border-dashed border-accent-blue/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-orange" />
          </div>
        </motion.div>
      </div>
    </LenisPhysicsContext.Provider>
  )
}

interface SmoothScrollProps {
  readonly children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      }}
    >
      <LenisBridge>{children}</LenisBridge>
    </ReactLenis>
  )
}
