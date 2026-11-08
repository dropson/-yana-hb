import { motion } from 'framer-motion'

export interface QuestProgressProps {
  currentStage: 'quiz' | 'memories' | 'finale'
  quizIndex: number
  totalQuiz: number
  memoryIndex: number
  totalMemories: number
}

export function QuestProgress({
  currentStage,
  quizIndex,
  totalQuiz,
  memoryIndex,
  totalMemories,
}: QuestProgressProps) {
  // Calculate percentage of current stage and overall quest
  let stageName = 'Етап 01: Вступний бліц'
  let stageDetail = quizIndex === 0 ? 'Початок квесту' : `Питання ${quizIndex} з ${Math.max(1, totalQuiz - 1)}`
  let stagePercent =
    quizIndex === 0
      ? 0
      : Math.min(100, Math.round((quizIndex / Math.max(1, totalQuiz - 1)) * 100))
  let overallPercent = Math.round((stagePercent / 100) * 50)

  if (currentStage === 'memories') {
    stageName = 'Етап 02: Спогади'
    stageDetail = `Спогад ${memoryIndex + 1} з ${totalMemories}`
    stagePercent = Math.min(100, Math.round(((memoryIndex + 1) / Math.max(1, totalMemories)) * 100))
    overallPercent = 50 + Math.round((stagePercent / 100) * 50)
  } else if (currentStage === 'finale') {
    stageName = 'Етап 03: Головний фінал'
    stageDetail = 'Святковий момент'
    stagePercent = 100
    overallPercent = 100
  }

  return (
    <div className="w-full border-t border-black/10 pt-1.5 lg:pt-2 select-none">
      {/* Top Single Row: Stage Title (Left) + Overall % (Right) */}
      <div className="flex items-center justify-between gap-2 mb-1 lg:mb-1.5">
        {/* Left: Stage Information */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="hidden sm:inline-block text-[9px] lg:text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A39B92] shrink-0">
            Прогрес квесту
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#B38E73] shrink-0" />
          <span className="font-serif text-xs sm:text-sm text-[#18181B] tracking-wide truncate">
            {stageName}
          </span>
          <span className="hidden md:inline-block text-[10px] lg:text-[11px] text-[#888691] font-light shrink-0">
            ({stageDetail})
          </span>
        </div>

        {/* Right: Fill Percentage */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <span className="hidden sm:inline-block text-[9px] lg:text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A39B92]">
            Заповнення:
          </span>
          <span className="font-serif text-xs sm:text-base lg:text-lg font-medium text-[#18181B] tracking-tight">
            {overallPercent}%
          </span>
        </div>
      </div>

      {/* Single Unified Fluid Scale Line */}
      <div className="relative h-1 sm:h-1.5 w-full bg-[#EAE5DC]/80 rounded-full overflow-hidden border border-black/5">
        <motion.div
          className={`h-full rounded-full transition-all duration-500 ${
            overallPercent === 100
              ? 'bg-gradient-to-r from-[#B38E73] via-[#C48243] to-[#8C7A6B] shadow-[0_0_16px_rgba(179,142,115,0.6)]'
              : 'bg-gradient-to-r from-[#C48243] via-[#B38E73] to-[#8C7A6B]'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${overallPercent}%` }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Shimmer light reflection moving across the active line */}
        {overallPercent > 0 && overallPercent < 100 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  )
}
