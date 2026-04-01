import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function AuthSplash() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-lg shadow-primary/10"
      >
        <span className="text-xl font-bold tracking-tight">AF</span>
      </motion.div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">Aura Finance</p>
        <Loader2
          className="size-7 animate-spin text-primary"
          aria-label="Verificando sessão"
        />
      </div>
    </div>
  )
}
