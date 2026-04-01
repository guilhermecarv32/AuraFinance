import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Gem,
  LayoutDashboard,
  LineChart,
  Wallet,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { to: '/dashboard/financeiro', label: 'Financeiro', icon: Wallet },
  { to: '/dashboard/patrimonio', label: 'Patrimônio', icon: Briefcase },
  { to: '/dashboard/estrategia', label: 'Estratégia', icon: LineChart },
] as const

const WIDTH_EXPANDED = 260
const WIDTH_COLLAPSED = 72

type SidebarProps = {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="relative z-20 flex h-screen shrink-0 flex-col border-r border-border/80 bg-sidebar text-sidebar-foreground"
    >
      <div
        className={cn(
          'flex h-14 items-center border-b border-border/60 px-3',
          collapsed ? 'justify-center' : 'justify-between gap-2',
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Gem className="size-4" aria-hidden />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed ? (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="truncate text-sm font-semibold tracking-tight">
                  Aura Finance
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  Premium
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        {!collapsed ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={onToggle}
            aria-label="Recolher menu"
          >
            <ChevronLeft className="size-4" />
          </Button>
        ) : null}
      </div>

      {collapsed ? (
        <div className="flex justify-center border-b border-border/60 py-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={onToggle}
            aria-label="Expandir menu"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      ) : null}

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-1" aria-label="Principal">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  collapsed && 'justify-center px-0',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <Icon
                    className={cn(
                      'size-[1.15rem] shrink-0',
                      isActive ? 'text-primary' : 'opacity-90',
                    )}
                    aria-hidden
                  />
                  <AnimatePresence initial={false}>
                    {!collapsed ? (
                      <motion.span
                        key={label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="truncate"
                      >
                        {label}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="bg-border/60" />
      <div className={cn('p-3', collapsed && 'flex justify-center')}>
        <div
          className={cn(
            'rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground',
            collapsed && 'hidden',
          )}
        >
          Desktop · build local
        </div>
      </div>
    </motion.aside>
  )
}
