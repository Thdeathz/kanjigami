import { type Variants } from 'framer-motion'

type AnimationVariants = {
  container: (delay?: number, stagger?: number) => Variants
  item: (duration?: number) => Variants
}

export const grid: AnimationVariants = {
  container: (delay = 0.1, stagger = 0.1) => ({
    hidden: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  }),
  item: (duration = 0.2) => ({
    hidden: { y: 20, opacity: 0 },
    enter: {
      y: 0,
      transition: {
        duration
      },
      opacity: 1
    }
  })
}
