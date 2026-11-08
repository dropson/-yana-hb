import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Mail, RotateCcw } from 'lucide-react'
import { questData } from '../data/questData'
import { audio } from '../utils/audio'

interface GrandFinaleProps {
  onRestart: () => void
}

export function GrandFinale({ onRestart }: GrandFinaleProps) {
  const [isLetterOpened, setIsLetterOpened] = useState(false)

  const triggerGrandConfetti = () => {
    audio.playSuccess()

    const count = 220
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999,
    }

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 70,
      colors: ['#B38E73', '#18181B', '#D8CCC0', '#FAF8F5'],
    })

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 110,
      scalar: 1.1,
      colors: ['#C48243', '#8C7A6B', '#EAE5DC'],
    })
  }

  const handleOpenLetter = () => {
    audio.playUnfold()
    triggerGrandConfetti()
    setIsLetterOpened(true)
  }

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-2 lg:py-6 text-center flex flex-col items-center justify-center flex-1">
      {/* Top Tagline */}
      <div className="mb-2 lg:mb-3">
        <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.28em] uppercase text-[#A39B92]">
          ГОЛОВНЕ ПРИВІТАННЯ
        </span>
      </div>

      <p className="font-serif text-sm sm:text-base lg:text-lg text-[#6B6A75] font-light max-w-md lg:max-w-lg mx-auto mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
        Квест пройдено. Для тебе тут є дещо особливе...
      </p>

      {/* Centerpiece: Envelope or Unfolded Handwritten Sheet */}
      <div className="w-full flex justify-center items-center my-1 lg:my-2">
        <AnimatePresence mode="wait">
          {!isLetterOpened ? (
            /* =========================================================================
               Closed Envelope with "Натисни мене"
               ========================================================================= */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleOpenLetter}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full max-w-[350px] sm:max-w-[390px] lg:max-w-[480px] aspect-[1.55/1] bg-[#F5EFEB] rounded-2xl border border-[#D8CCC0] shadow-[0_16px_40px_rgba(24,24,27,0.1)] lg:shadow-[0_20px_50px_rgba(24,24,27,0.12)] cursor-pointer overflow-hidden p-4 sm:p-5 lg:p-7 flex flex-col justify-between group transition-shadow hover:shadow-[0_24px_50px_rgba(24,24,27,0.15)] select-none"
            >
              {/* Envelope Flap Overlay Triangle */}
              <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none">
                <svg
                  className="w-full h-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.06)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <polygon points="0,0 100,0 50,100" fill="#EFE8DE" stroke="#D8CCC0" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Envelope diagonal fold lines */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full [background:linear-gradient(to_top_right,transparent_49.8%,rgba(216,204,192,0.5)_50%,transparent_50.2%)]" />
                <div className="absolute bottom-0 left-0 w-full h-full [background:linear-gradient(to_top_left,transparent_49.8%,rgba(216,204,192,0.5)_50%,transparent_50.2%)]" />
              </div>

              {/* Top Row: Postage Stamp & Postmark */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-1.5 lg:gap-2 border border-[#B38E73]/40 rounded px-2 lg:px-2.5 py-0.5 lg:py-1 bg-white/60 backdrop-blur-xs">
                  <span className="text-[8px] lg:text-[9px] font-mono tracking-widest uppercase text-[#8C7A6B]">
                    NORWAY → UK
                  </span>
                </div>

                {/* Postage Stamp */}
                <div className="w-9 h-11 lg:w-11 lg:h-13 border border-dashed border-[#B38E73]/60 bg-[#FAF8F5] p-0.5 lg:p-1 shadow-xs flex flex-col items-center justify-center text-center">
                  <span className="text-[6px] lg:text-[7px] font-mono uppercase text-[#A39B92] leading-none mb-0.5">POST</span>
                  <span className="text-xs lg:text-sm leading-none">💌</span>
                  <span className="text-[6px] lg:text-[7px] font-mono text-[#B38E73] font-bold mt-0.5">2026</span>
                </div>
              </div>

              {/* Center Wax Seal with "Натисни мене" */}
              <div className="relative z-20 my-auto flex flex-col items-center justify-center py-1 lg:py-2">
                {/* Wax seal circle */}
                <div className="relative w-12 h-12 lg:w-15 lg:h-15 rounded-full bg-gradient-to-br from-[#C48243] via-[#B38E73] to-[#8C7A6B] shadow-[0_4px_12px_rgba(179,142,115,0.4)] flex items-center justify-center mb-2 lg:mb-3 group-hover:scale-105 transition-transform">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/90">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5 stroke-[1.5]" />
                  </div>
                  {/* Subtle pulsing ping */}
                  <span className="absolute -inset-1 rounded-full bg-[#B38E73]/25 animate-ping pointer-events-none" />
                </div>

                {/* Primary Button: "Натисни мене" */}
                <div className="bg-[#18181B] text-white px-5 py-1.5 lg:px-6 lg:py-2 rounded-full text-xs sm:text-sm lg:text-sm font-medium tracking-wide shadow-md group-hover:bg-[#2D2D34] transition-colors flex items-center gap-2">
                  <span>Натисни мене</span>
                  <span className="text-sm lg:text-base font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Bottom Row: Recipient handwriting */}
              <div className="relative z-10 text-left">
                <p className="font-handwriting text-base sm:text-lg lg:text-2xl text-[#6B6A75] italic tracking-wide">
                  Для найдорожчої сестри Яни
                </p>
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
               Opened Stationery Sheet ("Аркуш" with handwritten text)
               ========================================================================= */
            <motion.div
              key="letter-sheet"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px] bg-[#FAF8F5] rounded-2xl border border-[#D8CCC0] shadow-[0_20px_50px_rgba(24,24,27,0.12)] lg:shadow-[0_24px_60px_rgba(24,24,27,0.14)] p-5 sm:p-7 lg:p-10 text-left overflow-hidden"
            >
              {/* Ambient stationery warmth */}
              <div className="pointer-events-none absolute -top-24 right-0 w-64 h-64 bg-[#B38E73]/10 blur-3xl rounded-full" />

              {/* Handwritten Letter Content */}
              <div className="space-y-2.5 lg:space-y-4 font-handwriting text-[#18181B]">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-[#18181B] mb-1 lg:mb-2">
                  {questData.finale.letterGreeting}
                </h3>

                {questData.finale.letterParagraphs.map((para, i) => (
                  <p key={i} className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#2A2A30]">
                    {para}
                  </p>
                ))}

                <div className="pt-3 lg:pt-6 text-right">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-[#18181B] inline-block border-b-2 border-[#B38E73]/40 pb-0.5 lg:pb-1">
                    {questData.finale.signature} ❤️
                  </p>
                </div>
              </div>

              {/* Footer controls: fold back or trigger confetti */}
              <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-black/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    audio.playPop()
                    setIsLetterOpened(false)
                  }}
                  className="text-[11px] lg:text-xs font-sans text-[#8C7A6B] hover:text-[#18181B] transition-colors underline cursor-pointer"
                >
                  Скласти лист назад у конверт
                </button>

                <button
                  onClick={triggerGrandConfetti}
                  className="text-[11px] lg:text-xs font-sans text-[#8C7A6B] hover:text-[#18181B] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Запустити салют</span>
                  <span>✨</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Action to restart if wanted */}
      <div className="mt-3 sm:mt-4 lg:mt-8">
        <button
          onClick={() => {
            audio.playPop()
            onRestart()
          }}
          className="btn-gallery-pill px-5 py-2 lg:px-6 lg:py-2.5 text-xs font-normal tracking-wide inline-flex items-center gap-2 cursor-pointer active:scale-95 text-[#6B6A75] hover:text-[#18181B]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Пройти квест спочатку</span>
        </button>
      </div>
    </div>
  )
}
