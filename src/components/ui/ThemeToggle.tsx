import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
}

export function ThemeToggle({
  className,
  variant = 'ghost',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const ready = resolvedTheme !== undefined
  const isDark = resolvedTheme === 'dark'

  if (!ready) {
    return (
      <Button
        type="button"
        variant={variant}
        size="icon"
        className={cn('size-9', className)}
        aria-hidden
        disabled
      >
        <Sun className="size-4 opacity-40" />
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      className={cn('size-9', className)}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
      <span className="sr-only">
        Tema atual: {theme === 'system' ? 'sistema' : theme}
      </span>
    </Button>
  )
}
