import { motion } from 'framer-motion'

interface PolaroidProps {
  image: string
  caption?: string
  rotation?: number
  className?: string
  isDraggable?: boolean
  onClick?: () => void
  theme?: 'warm-ivory' | 'midnight-gold' | 'pastel-editorial'
}

export function PolaroidFrame({
  image,
  caption,
  rotation = 0,
  className = '',
  isDraggable = false,
  onClick,
  theme = 'warm-ivory'
}: PolaroidProps) {
  // Theme-specific styles for polaroid frame
  const isMidnight = theme === 'midnight-gold'
  const isPastel = theme === 'pastel-editorial'

  const frameBg = isMidnight
    ? 'bg-[#181926] border border-amber-500/30 text-white shadow-2xl shadow-amber-500/10'
    : isPastel
    ? 'bg-white border-2 border-pink-200 text-stone-900 shadow-xl shadow-pink-200/50'
    : 'bg-white border border-black/5 text-[#1E1E24] shadow-2xl'

  const washiTapeColor = isMidnight
    ? 'bg-amber-400/30 border-amber-300/40 text-amber-200'
    : isPastel
    ? 'bg-pink-300/60 border-pink-200 text-pink-600'
    : 'bg-[#E6D7C3]/80 border-white/60'

  const content = (
    <div
      onClick={onClick}
      className={`polaroid-frame relative p-4 sm:p-5 pb-7 sm:pb-9 rounded-[4px] cursor-pointer select-none transition-all duration-300 ${frameBg} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`
      }}
    >
      {/* Decorative Washi Tape on top */}
      <div className={`washi-tape ${washiTapeColor}`} />

      {/* Image container - Larger aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#EAE5DC] shadow-inner group">
        <img
          src={image}
          alt={caption || "Polaroid memory"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft film glare overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/15 pointer-events-none" />

        {/* Midnight foil shimmer overlay */}
        {isMidnight && (
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Handwritten Caption in Caveat font */}
      {caption && (
        <div className="mt-4 text-center">
          <p className={`font-handwriting text-2xl sm:text-3xl tracking-wide leading-tight ${
            isMidnight ? 'text-amber-200 font-bold' : isPastel ? 'text-pink-900 font-bold' : 'text-[#1E1E24]'
          }`}>
            {caption}
          </p>
        </div>
      )}
    </div>
  )

  if (isDraggable) {
    return (
      <motion.div
        drag
        dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, cursor: 'grabbing' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="cursor-grab active:cursor-grabbing inline-block"
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: rotation + (rotation >= 0 ? 1.5 : -1.5) }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="inline-block"
    >
      {content}
    </motion.div>
  )
}
