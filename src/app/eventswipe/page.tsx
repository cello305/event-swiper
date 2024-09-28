"use client"

import { useState } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Component() {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const controls = useAnimation()

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50 // minimum distance required to register a swipe
    if (info.offset.x > threshold) {
      setDirection('right')
      controls.start({ x: 300, opacity: 0 })
    } else if (info.offset.x < -threshold) {
      setDirection('left')
      controls.start({ x: -300, opacity: 0 })
    } else {
      controls.start({ x: 0, opacity: 1 })
    }
  }

  const resetCard = () => {
    setDirection(null)
    controls.start({ x: 0, opacity: 1 })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="relative w-full max-w-md aspect-[3/4]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="w-full h-full"
        >
          <Card className="w-full h-full flex items-center justify-center shadow-xl">
            <CardContent className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">Swipe Me!</h2>
              <p className="text-gray-600">Drag the card left or right</p>
            </CardContent>
          </Card>
        </motion.div>
        {direction && (
          <div className="absolute top-1/2 -translate-y-1/2 text-white text-6xl">
            {direction === 'left' ? (
              <ArrowLeft className="left-4" />
            ) : (
              <ArrowRight className="right-4" />
            )}
          </div>
        )}
      </div>
      <Button onClick={resetCard} className="mt-8">
        Reset Card
      </Button>
    </div>
  )
}