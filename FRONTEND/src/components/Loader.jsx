"use client"

import { motion } from "framer-motion"

export default function Loader() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
    />
  )
}
