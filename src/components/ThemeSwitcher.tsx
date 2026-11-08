import { motion } from 'framer-motion'
import { Palette, Sparkles, Moon, Sun } from 'lucide-react'

export type DesignTheme = 'warm-ivory' | 'midnight-gold' | 'pastel-editorial'

interface ThemeSwitcherProps {
  currentTheme: DesignTheme
  onThemeChange: (theme: DesignTheme) => void
}

const THEMES: { id: DesignTheme; label: string; icon: typeof Palette; badge: string }[] = [
  {
    id: 'warm-ivory',
    label: 'Теплий Ретро',
    icon: Sun,
    badge: 'Стиль 1'
  },
  {
    id: 'midnight-gold',
    label: 'Нічний Оксамит',
    icon: Moon,
    badge: 'Стиль 2'
  },
  {
    id: 'pastel-editorial',
    label: 'Пастельний Журнал',
    icon: Sparkles,
    badge: 'Стиль 3'
  }
]

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 select-none">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-xs text-[#575661] font-medium mb-1 sm:mb-0">
        <Palette className="w-3.5 h-3.5 text-[#C89B3C]" />
        <span>Оберіть стиль дизайну:</span>
      </div>

      {/* Segmented Control Pill */}
      <div className="p-1 rounded-2xl bg-black/5 backdrop-blur-md border border-black/5 flex items-center gap-1 shadow-inner">
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.id
          const Icon = theme.icon

          return (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-[#575661] hover:text-[#1E1E24] hover:bg-white/40'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeThemePill"
                  className={`absolute inset-0 rounded-xl ${
                    theme.id === 'warm-ivory'
                      ? 'bg-[#1E1E24]'
                      : theme.id === 'midnight-gold'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500'
                  }`}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{theme.label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
