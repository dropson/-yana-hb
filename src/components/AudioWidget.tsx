import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc3 } from 'lucide-react'
import { audio } from '../utils/audio'

export function AudioWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const unsubscribe = audio.subscribe((playing, muted) => {
      setIsPlaying(playing)
      setIsMuted(muted)
    })
    return unsubscribe
  }, [])

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      {/* Drop-shadow container that traces the exact curved notch shape */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          filter: 'drop-shadow(0 10px 18px rgba(0, 0, 0, 0.05)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.03))'
        }}
        className="relative flex items-center"
      >
        {/* Left Inverted Fillet Curve connecting to the top ceiling */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute -left-[23px] top-0 pointer-events-none block"
        >
          <path
            d="M0 0 C13.2548 0 24 10.7452 24 24 V0 H0 Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* Central Notch Body with Spinning Disc & Mute Button only */}
        <button
          onClick={() => audio.toggleMute()}
          className="bg-white h-11 px-6 rounded-b-[18px] flex items-center gap-4 text-[#18181B] border-b border-black/5 hover:bg-[#FAF8F5] transition-all cursor-pointer active:scale-98 group"
          title={isMuted ? "Увімкнути звук" : "Вимкнути звук"}
        >
          {/* Animated Spinning Vinyl Disc */}
          <div className="w-5 h-5 rounded-full bg-[#18181B] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Disc3
              className={`w-3.5 h-3.5 transition-transform ${
                isPlaying && !isMuted ? 'animate-spin' : 'opacity-70'
              }`}
              style={{ animationDuration: '3s' }}
            />
          </div>

          {/* Minimal Mute / Sound Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6B6A75] group-hover:text-[#18181B] transition-colors">
              {isMuted ? "MUTE" : "SOUND"}
            </span>

            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#888691] stroke-[2]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#18181B] stroke-[2]" />
            )}
          </div>
        </button>

        {/* Right Inverted Fillet Curve connecting to the top ceiling */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute -right-[23px] top-0 pointer-events-none block"
        >
          <path
            d="M0 24 C0 10.7452 10.7452 0 24 0 H0 V24 Z"
            fill="#FFFFFF"
          />
        </svg>
      </motion.div>
    </div>
  )
}
