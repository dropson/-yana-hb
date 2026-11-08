import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Copy, Check, Sparkles } from 'lucide-react'

export function MobileGate() {
  const [isMobile, setIsMobile] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      // Screen width under 960px is treated as mobile/tablet
      setIsMobile(window.innerWidth < 960)
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#FAF7F2] text-[#1E1E24]"
        >
          {/* Subtle warm paper texture & glow */}
          <div className="absolute inset-0 bg-paper pointer-events-none opacity-60" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-200/30 blur-3xl rounded-full pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative z-10 max-w-sm w-full bg-white p-8 rounded-3xl border border-black/5 shadow-2xl text-center"
          >
            {/* Laptop Icon with Glow */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200/60 shadow-inner">
              <Laptop className="w-10 h-10 text-[#C89B3C]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-[#C89B3C] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MacBook Experience</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1E1E24] mb-3 leading-snug">
              Відкрийте на комп’ютері
            </h2>

            <p className="text-sm text-[#575661] leading-relaxed mb-6 font-light">
              Цей святковий квест та Polaroid-анімації створені спеціально для великого екрана твого ноутбука чи комп'ютера.
            </p>

            <button
              onClick={handleCopyLink}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#1E1E24] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-98 shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Посилання скопійовано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопіювати посилання для ПК</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-[#8C8A94] mt-4">
              Надішли посилання собі в Telegram або відкрий у браузері на MacBook.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
