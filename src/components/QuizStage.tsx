import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'
import type { BlitzSlide } from '../data/questData'
import { audio } from '../utils/audio'

interface QuizStageProps {
  slides: BlitzSlide[]
  currentIndex: number
  onIndexChange: (idx: number) => void
  onComplete: () => void
}

interface JokeModalState {
  tag: string
  title: string
  subtitle: string
  body: string
}

export function QuizStage({
  slides,
  currentIndex,
  onIndexChange,
  onComplete,
}: QuizStageProps) {
  const [showReliefModal, setShowReliefModal] = useState(false)
  const [hasCompletedFianceIntro, setHasCompletedFianceIntro] = useState(false)
  const [jokeModal, setJokeModal] = useState<JokeModalState | null>(null)
  const [showAuthSuccessModal, setShowAuthSuccessModal] = useState(false)

  // Refs for the cinematic center-to-slot animation on Slide 4
  const slotRef = useRef<HTMLSpanElement>(null)
  const centerOverlayRef = useRef<HTMLDivElement>(null)
  const centerTextRef = useRef<HTMLDivElement>(null)
  const slideContentRef = useRef<HTMLDivElement>(null)
  const photoContainerRef = useRef<HTMLDivElement>(null)
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const currentSlide = slides[currentIndex]

  // Theatrical center-to-slot animation for Slide 4 (Fiancé question)
  useEffect(() => {
    if (currentSlide.id === 4 && !hasCompletedFianceIntro) {
      const overlay = centerOverlayRef.current
      const centerText = centerTextRef.current
      const slot = slotRef.current
      const content = slideContentRef.current
      const photo = photoContainerRef.current

      if (!overlay || !centerText || !slot) return

      // Initial state: hide permanent content and slot
      gsap.set(slot, { opacity: 0 })
      if (content) gsap.set(content, { opacity: 0, y: 16 })
      if (photo) gsap.set(photo, { opacity: 0, scale: 0.94 })

      // Play subtle chime
      audio.playPop()

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          delay: 0.1,
          onComplete: () => {
            setHasCompletedFianceIntro(true)
          },
        })

        introTimelineRef.current = tl

        // 1. Center text enters smoothly on clean white canvas
        tl.fromTo(
          centerText,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
        )
          // 2. Pause so user reads "Я жартую, останнє уточнення..."
          .to({}, { duration: 1.15 })
          // 3. Smoothly swoop and shrink directly into the permanent slot position
          .call(() => {
            const slotRect = slot.getBoundingClientRect()
            const textRect = centerText.getBoundingClientRect()
            const dx = slotRect.left - textRect.left
            const dy = slotRect.top - textRect.top

            gsap.to(centerText, {
              x: dx,
              y: dy,
              scale: 0.28,
              opacity: 0,
              transformOrigin: 'top left',
              duration: 0.75,
              ease: 'power3.inOut',
            })

            gsap.to(overlay, {
              opacity: 0,
              duration: 0.65,
              ease: 'power2.inOut',
            })
          })
          // 4. Reveal permanent tag, question headline, photo, and buttons
          .to(slot, { opacity: 1, duration: 0.3 }, '+=0.65')
          .to(
            content || [],
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
            '-=0.2'
          )
          .to(
            photo || [],
            { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
            '-=0.45'
          )
      })

      return () => {
        ctx.revert()
      }
    }
  }, [currentSlide.id, hasCompletedFianceIntro])

  // Fast-forward intro animation on tap
  const handleSkipIntro = () => {
    if (introTimelineRef.current) {
      introTimelineRef.current.progress(1)
    }
    setHasCompletedFianceIntro(true)
  }

  const handleSelectOption = (optIndex: number) => {
    audio.startMusic()

    // 1. After Scorpio slide (index 2): show "Все, видихай!" relief modal
    if (currentIndex === 2) {
      audio.playPop()
      setShowReliefModal(true)
      return
    }

    // 2. Slide 4: Fiancé question with interactive joke logic
    if (currentSlide.id === 4) {
      if (optIndex === 0) {
        // Correct option: "Мій майбутній чоловік"
        audio.playSuccess()
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#B38E73', '#18181B', '#D8CCC0', '#FAF8F5'],
        })
        setShowAuthSuccessModal(true)
      } else if (optIndex === 1) {
        // Joke option: "Я його не знаю"
        audio.playWrong()
        setJokeModal({
          tag: 'ДЕТЕКТОР БРЕХНІ',
          title: 'Не знаєш?! Серйозно?',
          subtitle: 'Слідчий комітет свята не вірить',
          body: 'А чому це ви тоді в однакових стильних total-black образах стоїте так близько? Слідчі зафіксували занадто щасливі й закохані погляди на цьому фото, щоб повірити в таку версію!',
        })
      } else if (optIndex === 2) {
        // Joke option: "Мій колега"
        audio.playWrong()
        setJokeModal({
          tag: 'КОРПОРАТИВНА ЕТИКА',
          title: 'Колега?! Дуже цікаво...',
          subtitle: "Цікаві у вас робочі обов'язки",
          body: 'Романтичні спільні фотосесії, квіти, закохані погляди... Хороша відмазка для колег по офісу, але тут всі свої й правду знають!',
        })
      }
      return
    }

    // Standard progression for other slides
    audio.playPop()
    if (currentIndex < slides.length - 1) {
      onIndexChange(currentIndex + 1)
    } else {
      audio.playSuccess()
      setShowAuthSuccessModal(true)
    }
  }

  // Dismiss Relief Modal and launch Slide 4 with the theatrical center-to-slot animation
  const handleDismissReliefModal = () => {
    audio.playPop()
    setShowReliefModal(false)
    setHasCompletedFianceIntro(false) // Trigger theatrical intro on Slide 4
    onIndexChange(3) // Advance to Slide 4 (fiancé)
  }

  const handleCloseJoke = () => {
    audio.playPop()
    setJokeModal(null)
  }

  const handleDismissAuthModal = () => {
    audio.playPop()
    setShowAuthSuccessModal(false)
    onComplete()
  }

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 py-1 lg:py-4 flex flex-col justify-center flex-1 relative">
      <AnimatePresence mode="wait">
        {currentSlide.isHeroIntro ? (
          /* First Section: Centered Editorial Hero */
          <motion.div
            key="hero-intro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl lg:max-w-3xl mx-auto text-center flex flex-col items-center justify-center my-auto py-4 sm:py-6 lg:py-10 px-4"
          >
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#18181B] leading-tight tracking-tight mb-3 lg:mb-4">
              У когось, напевно, сьогодні день народження... 👀
            </h1>

            <p className="font-serif text-sm sm:text-lg lg:text-xl text-[#6B6A75] font-light max-w-md lg:max-w-xl mx-auto mb-5 sm:mb-6 lg:mb-8 leading-relaxed">
              Давай це швиденько перевіримо.
            </p>

            <button
              onClick={() => handleSelectOption(0)}
              className="btn-gallery-pill-primary group inline-flex items-center gap-3.5 lg:gap-4 px-7 py-3 lg:px-9 lg:py-4 text-xs sm:text-sm lg:text-base font-normal tracking-wide cursor-pointer select-none active:scale-95 shadow-md hover:shadow-lg transition-all"
            >
              <span>Перевірити</span>
              <span className="text-base lg:text-lg font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        ) : (
          /* All Content Slides (Slide 2: Identity, Slide 3: Scorpio, Slide 4: Fiancé) */
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center flex-1 my-auto py-1 lg:py-3"
          >
            {/* Left Column: Question headline & Pill Choices */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              {/* Question Tag Slot */}
              <div className="mb-1.5 lg:mb-2 min-h-6 flex items-center">
                <span
                  ref={currentSlide.id === 4 ? slotRef : undefined}
                  className="inline-block text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]"
                >
                  {currentSlide.tagText ? currentSlide.tagText : `ПИТАННЯ ${String(currentIndex).padStart(2, '0')}`}
                </span>
              </div>

              {/* Question Content container (animated into place for slide 4) */}
              <div ref={currentSlide.id === 4 ? slideContentRef : undefined} className="w-full">
                {/* Question Headline */}
                <h2 className="font-display text-xl sm:text-2xl lg:text-4xl font-normal text-[#18181B] leading-snug lg:leading-tight tracking-tight mb-2 sm:mb-2.5 lg:mb-3">
                  {currentSlide.question}
                </h2>

                {currentSlide.subtext && (
                  <p className="font-serif text-xs sm:text-sm lg:text-base text-[#6B6A75] font-light leading-relaxed mb-3.5 lg:mb-5 max-w-md">
                    {currentSlide.subtext}
                  </p>
                )}

                {/* Thin Delicate Pill Buttons */}
                <div className="flex flex-row flex-wrap gap-2 sm:gap-2.5 lg:gap-3 items-center pt-0.5 lg:pt-1">
                  {currentSlide.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="btn-gallery-pill inline-flex items-center justify-between gap-3 sm:gap-4 lg:gap-5 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-7 lg:py-3.5 text-xs sm:text-sm lg:text-base font-normal tracking-wide cursor-pointer select-none active:scale-95 shrink-0"
                    >
                      <span>{opt.label}</span>
                      <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Art Gallery Photo with Offset Accent Frame */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
              {currentSlide.polaroidPhoto && (
                <div
                  ref={currentSlide.id === 4 ? photoContainerRef : undefined}
                  className={`gallery-frame-container relative w-full ${
                    currentSlide.aspectRatio === 'vertical'
                      ? 'max-w-[230px] sm:max-w-[260px] lg:max-w-[380px] xl:max-w-[410px]'
                      : 'max-w-[320px] sm:max-w-[360px] lg:max-w-[480px] xl:max-w-[520px]'
                  }`}
                >
                  <div className="gallery-frame-offset rounded-[2px]" />
                  <div className="relative z-10 overflow-hidden rounded-[2px] bg-white shadow-2xl border border-black/5 p-2.5 sm:p-3 lg:p-3.5 pb-4 sm:pb-4 lg:pb-5">
                    <div
                      className={`overflow-hidden w-full bg-[#EAE5DC] ${
                        currentSlide.aspectRatio === 'vertical'
                          ? 'aspect-[3/4]'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={currentSlide.polaroidPhoto}
                        alt={currentSlide.polaroidCaption || "Gallery artwork"}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        loading="eager"
                      />
                    </div>
                    {currentSlide.polaroidCaption && (
                      <div className="mt-2.5 lg:mt-3 text-center">
                        <p className="font-serif italic text-xs sm:text-sm lg:text-base text-[#6B6A75] tracking-wide">
                          {currentSlide.polaroidCaption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theatrical Center-to-Slot Intro on Slide 4 ("Я жартую, останнє уточнення...") */}
      {currentSlide.id === 4 && !hasCompletedFianceIntro && (
        <div
          ref={centerOverlayRef}
          onClick={handleSkipIntro}
          className="fixed inset-0 z-40 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 cursor-pointer select-none"
        >
          <div ref={centerTextRef} className="text-center will-change-transform max-w-lg">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#A39B92] block mb-2">
              УВАГА 👀
            </span>
            <h2 className="font-display italic text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-snug">
              Я жартую, останнє уточнення...
            </h2>
          </div>
        </div>
      )}

      {/* 1. Relief Modal after Scorpio slide ("Все, видихай! Ніяких більше нудних запитань...") */}
      <AnimatePresence>
        {showReliefModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-[#FAF8F5] border border-black/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center relative"
            >
              <div className="mb-2 lg:mb-3">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]">
                  ПОВІДОМЛЕННЯ ВІД СИСТЕМИ
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#18181B] leading-tight mb-1.5">
                Все, видихай!
              </h2>

              <p className="font-serif italic text-sm sm:text-base text-[#8C7A6B] mb-3">
                Ніяких більше нудних запитань...
              </p>

              <p className="font-serif text-xs sm:text-sm text-[#6B6A75] font-light leading-relaxed max-w-xs mb-5 sm:mb-6">
                Ідентифікацію пройдено успішно. Детектор вимкнено, можна видихнути і ні про що не хвилюватися.
              </p>

              <button
                onClick={handleDismissReliefModal}
                className="btn-gallery-pill-primary inline-flex items-center gap-3 px-7 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-normal tracking-wide cursor-pointer active:scale-95 shadow-md"
              >
                <span>Нарешті!</span>
                <span className="text-base font-light">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Joke Pop-up Modal when picking option 2 or 3 on fiancé question */}
      <AnimatePresence>
        {jokeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-[#FAF8F5] border border-black/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center relative"
            >
              <div className="mb-2 lg:mb-3">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]">
                  {jokeModal.tag}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#18181B] leading-tight mb-1.5">
                {jokeModal.title}
              </h3>

              <p className="font-serif italic text-sm sm:text-base text-[#8C7A6B] mb-3">
                {jokeModal.subtitle}
              </p>

              <p className="font-serif text-xs sm:text-sm text-[#6B6A75] font-light leading-relaxed mb-5 sm:mb-6">
                {jokeModal.body}
              </p>

              <button
                onClick={handleCloseJoke}
                className="btn-gallery-pill-primary inline-flex items-center gap-3 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-normal tracking-wide cursor-pointer active:scale-95 shadow-md"
              >
                <span>Вибрати знову</span>
                <span className="text-base font-light">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Authorization Success Modal */}
      <AnimatePresence>
        {showAuthSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-[#FAF8F5] border border-black/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center relative"
            >
              <div className="mb-2 lg:mb-3">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]">
                  АВТОРИЗАЦІЮ ПІДТВЕРДЖЕНО
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#18181B] leading-tight mb-2">
                Вітаю, ви успішно пройшли авторизацію!
              </h2>

              <p className="font-serif italic text-sm sm:text-base text-[#8C7A6B] mb-2.5">
                Особу підтверджено на всі 100%.
              </p>

              <p className="font-serif text-xs sm:text-sm text-[#6B6A75] font-light leading-relaxed max-w-xs mb-5 sm:mb-6">
                Чи готові ви тепер трохи зануритись у теплі спогади свого життя?
              </p>

              <button
                onClick={handleDismissAuthModal}
                className="btn-gallery-pill-primary inline-flex items-center gap-3 px-7 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-normal tracking-wide cursor-pointer active:scale-95 shadow-md"
              >
                <span>Поринути у спогади</span>
                <span className="text-base font-light">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
