"use client"

import { motion } from "framer-motion"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-32 pb-12 px-4 text-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tl from-accent/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <motion.span
          className="inline-block px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary rounded-full text-sm font-medium border border-primary/30 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          ✨ Simplify Your Links
        </motion.span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
      >
        Shortify
      </motion.h1>

      <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
        Transform long URLs into elegant short links instantly. Share, track, and manage your links with ease.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.div
          className="bg-card/50 backdrop-blur-md border border-primary/30 rounded-lg p-4 text-left hover:border-primary/60 transition-colors"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.2)" }}
        >
          <p className="text-sm text-muted-foreground mb-2">Example:</p>
          <p className="font-mono text-sm break-all">
            <span className="text-muted-foreground">https://example.com/very/long/url</span>
            <span className="text-primary mx-2">→</span>
            <span className="text-accent font-semibold">short.link/abc123</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
