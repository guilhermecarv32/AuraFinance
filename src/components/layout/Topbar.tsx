import { ChevronRight, LogOut, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const SECTION_LABELS: Record<string, string> = {
  '/dashboard': 'Visão Geral',
  '/dashboard/financeiro': 'Financeiro',
  '/dashboard/patrimonio': 'Patrimônio',
  '/dashboard/estrategia': 'Estratégia',
}

function breadcrumbForPath(pathname: string) {
  const section = SECTION_LABELS[pathname] ?? 'Visão Geral'
  return { section }
}

type TopbarProps = {
  title?: string
  className?: string
}

export function Topbar({ title, className }: TopbarProps) {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const { section } = breadcrumbForPath(pathname)
  const displayTitle = title ?? section

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/80 bg-card/50 px-4 backdrop-blur-sm md:px-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <nav
          className="mb-0.5 flex items-center gap-1 text-xs text-muted-foreground"
          aria-label="Navegação estrutural"
        >
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
          <span className="truncate text-foreground/90">{section}</span>
        </nav>
        <p className="truncate text-lg font-semibold tracking-tight">
          {displayTitle}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle variant="outline" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/80"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                <User className="size-3.5" aria-hidden />
              </span>
              <span className="hidden max-w-[160px] truncate text-left text-sm font-normal md:inline">
                {user?.email ?? 'Conta'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Sessão</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-destructive focus:text-destructive"
              onSelect={() => void signOut()}
            >
              <LogOut className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
