import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioWidget } from './components/AudioWidget'
import { QuizStage } from './components/QuizStage'
import { MemoryStage } from './components/MemoryStage'
import { GrandFinale } from './components/GrandFinale'
import { QuestProgress } from './components/QuestProgress'
import { questData } from './data/questData'
import { audio } from './utils/audio'

type QuestStage = 'quiz' | 'memories' | 'finale'

export default function App() {
  const [currentStage, setCurrentStage] = useState<QuestStage>('quiz')
  const [quizIndex, setQuizIndex] = useState(0)
  const [memoryIndex, setMemoryIndex] = useState(0)

  // Auto-start music on mount and first user interaction
  useEffect(() => {
    // Attempt playback on load
    audio.startMusic()

    const handleFirstInteraction = () => {
      audio.startMusic()
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('keydown', handleFirstInteraction, { once: true })
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('pointerdown', handleFirstInteraction)
    }
  }, [])

  const handleQuizComplete = () => {
    audio.playSuccess()
    setCurrentStage('memories')
  }

  const handleMemoriesComplete = () => {
    audio.playSuccess()
    setCurrentStage('finale')
  }

  const handleRestart = () => {
    audio.playPop()
    setQuizIndex(0)
    setMemoryIndex(0)
    setCurrentStage('quiz')
  }

  return (
    <div className="relative min-h-screen bg-gallery text-[#18181B] overflow-x-hidden flex flex-col justify-between selection:bg-[#B38E73]/20 selection:text-[#18181B]">
      {/* Floating Audio Player Notch at top center */}
      <AudioWidget />

      {/* Delicate ambient warmth */}
      <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#B38E73]/5 via-transparent to-transparent blur-[120px] rounded-full" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#B38E73]/5 via-transparent to-transparent blur-[120px] rounded-full" />

      {/* Top spacer to ensure smooth clearance for top hanging notch */}
      <div className="pt-10 sm:pt-12 lg:pt-14" />

      {/* Main Quest Content Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-1 sm:py-2 lg:py-4 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {currentStage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <QuizStage
                slides={questData.blitzSlides}
                currentIndex={quizIndex}
                onIndexChange={setQuizIndex}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}

          {currentStage === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <MemoryStage
                memories={questData.memories}
                currentIndex={memoryIndex}
                onIndexChange={setMemoryIndex}
                onComplete={handleMemoriesComplete}
              />
            </motion.div>
          )}

          {currentStage === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <GrandFinale
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Single Unified Quest Progress Bar for the whole site */}
      <footer className="relative z-20 w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-3 lg:pb-4 pt-1">
        <QuestProgress
          currentStage={currentStage}
          quizIndex={quizIndex}
          totalQuiz={questData.blitzSlides.length}
          memoryIndex={memoryIndex}
          totalMemories={questData.memories.length}
        />
      </footer>
    </div>
  )
}
