import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { MemoryItem } from '../data/questData'
import { audio } from '../utils/audio'

interface MemoryStageProps {
  memories: MemoryItem[]
  currentIndex: number
  onIndexChange: (idx: number) => void
  onComplete: () => void
}

export function MemoryStage({
  memories,
  currentIndex,
  onIndexChange,
  onComplete,
}: MemoryStageProps) {
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [wrongSelectionIndex, setWrongSelectionIndex] = useState<number | null>(null)
  const [isShaking, setIsShaking] = useState(false)

  const currentMemory = memories[currentIndex]

  // Reset state when switching between memory slides
  useEffect(() => {
    setIsAnsweredCorrectly(false)
    setSelectedOptionIndex(null)
    setWrongSelectionIndex(null)
  }, [currentIndex])

  const handleOptionClick = (optionIdx: number) => {
    if (isAnsweredCorrectly) return

    const isMatch = currentMemory.allCorrect || optionIdx === currentMemory.correctIndex

    if (isMatch) {
      audio.playSuccess()
      setIsAnsweredCorrectly(true)
      setSelectedOptionIndex(optionIdx)
      setWrongSelectionIndex(null)

      // Minimalist golden celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#B38E73', '#18181B', '#D8CCC0', '#FAF8F5']
      })
    } else {
      audio.playWrong()
      setWrongSelectionIndex(optionIdx)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 450)
    }
  }

  const handleNextMemory = () => {
    audio.playPop()
    if (currentIndex < memories.length - 1) {
      onIndexChange(currentIndex + 1)
      setIsAnsweredCorrectly(false)
      setSelectedOptionIndex(null)
      setWrongSelectionIndex(null)
    } else {
      onComplete()
    }
  }

  const isVertical = currentMemory.aspectRatio === 'vertical'

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-1 lg:py-4 flex flex-col justify-center flex-1 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMemory.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center flex-1 my-auto py-1 lg:py-3"
        >
          {/* Left Column: Gallery Artwork Photo with offset frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start items-center">
            <div
              className={`gallery-frame-container relative w-full ${
                isVertical
                  ? 'max-w-[220px] sm:max-w-[250px] lg:max-w-[380px] xl:max-w-[410px]'
                  : 'max-w-[320px] sm:max-w-[360px] lg:max-w-[490px] xl:max-w-[530px]'
              } ${isShaking ? 'animate-shake' : ''}`}
            >
              <div className="gallery-frame-offset rounded-[2px]" />

              <div className="relative z-10 overflow-hidden rounded-[2px] bg-white shadow-2xl border border-black/5 p-2.5 sm:p-3 lg:p-4 pb-4 sm:pb-4 lg:pb-6">
                <div
                  className={`overflow-hidden w-full bg-[#EAE5DC] ${
                    isVertical
                      ? 'aspect-[3/4]'
                      : currentMemory.aspectRatio === '4/3'
                      ? 'aspect-[4/3]'
                      : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={currentMemory.photo}
                    alt={currentMemory.caption || "Archive memory"}
                    className={`w-full h-full object-cover ${
                      currentMemory.objectPosition || 'object-center'
                    } transition-transform duration-1000 hover:scale-105`}
                    loading="lazy"
                  />
                </div>

                {currentMemory.caption && (
                  <div className="mt-2.5 lg:mt-3 text-center">
                    <p className="font-serif italic text-xs sm:text-sm lg:text-base text-[#6B6A75] tracking-wide">
                      {currentMemory.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quiz Question and Thin Pill Choices */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="mb-1.5 lg:mb-2">
              <span className="inline-block text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]">
                СПОГАД {String(currentIndex + 1).padStart(2, '0')}
              </span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl lg:text-4xl font-normal text-[#18181B] leading-snug lg:leading-tight tracking-tight mb-2 sm:mb-2.5 lg:mb-4">
              {currentMemory.question}
            </h2>

            {/* Pill Choices (thin stroke, delicate) */}
            <div className="flex flex-row flex-wrap gap-2 lg:gap-3 my-2 sm:my-2.5 lg:my-4 items-center">
              {currentMemory.options.map((option, idx) => {
                const isSelectedWrong = wrongSelectionIndex === idx
                const isCorrect = isAnsweredCorrectly && (
                  currentMemory.allCorrect
                    ? selectedOptionIndex === idx
                    : idx === currentMemory.correctIndex
                )

                let btnClass = 'btn-gallery-pill'
                if (isCorrect) {
                  btnClass = 'rounded-full border border-emerald-600 bg-emerald-50 text-emerald-950 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3.5 text-xs sm:text-sm lg:text-base font-medium tracking-wide flex items-center justify-between shadow-sm'
                } else if (isSelectedWrong) {
                  btnClass = 'rounded-full border border-rose-300 bg-rose-50 text-rose-900 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3.5 text-xs sm:text-sm lg:text-base font-medium tracking-wide flex items-center justify-between'
                } else {
                  btnClass = 'btn-gallery-pill px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3.5 text-xs sm:text-sm lg:text-base font-normal tracking-wide flex items-center justify-between'
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnsweredCorrectly}
                    className={`${btnClass} inline-flex items-center justify-between gap-3 sm:gap-4 group transition-all duration-300 active:scale-95 cursor-pointer`}
                  >
                    <span className="text-xs sm:text-sm lg:text-base font-normal tracking-wide">{option}</span>
                    <span className="text-sm sm:text-base font-light transition-transform duration-300 group-hover:translate-x-1">
                      {isCorrect ? '✓' : isSelectedWrong ? '✕' : '→'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Wrong Answer Hint */}
            {wrongSelectionIndex !== null && !isAnsweredCorrectly && currentMemory.hint && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-1.5 px-3 lg:py-2 lg:px-4 rounded-lg lg:rounded-xl border border-rose-200/70 bg-rose-50/60 text-xs lg:text-sm text-[#8C7A6B] font-serif italic mb-1.5 lg:mb-2"
              >
                {currentMemory.hint}
              </motion.div>
            )}

            {/* Correct Answer Story & Pill Button */}
            {isAnsweredCorrectly && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2.5 lg:mt-4 pt-2 lg:pt-3 border-t border-black/10"
              >
                <p className="font-serif italic text-xs sm:text-sm lg:text-base text-[#6B6A75] leading-relaxed mb-2.5 lg:mb-4">
                  {currentMemory.story}
                </p>

                <button
                  onClick={handleNextMemory}
                  className="btn-gallery-pill-primary inline-flex items-center gap-3 lg:gap-4 px-6 py-2 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3.5 text-xs sm:text-sm lg:text-base font-normal tracking-wide cursor-pointer active:scale-95 shadow-md hover:shadow-lg transition-all"
                >
                  <span>
                    {currentIndex < memories.length - 1 ? 'Наступний спогад' : 'Головне привітання'}
                  </span>
                  <span className="text-base font-light">→</span>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
