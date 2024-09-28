"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"

const cardData = [
  { id: 1, title: "Event 1", description: "Description for Event 1" },
  { id: 2, title: "Event 2", description: "Description for Event 2" },
  { id: 3, title: "Event 3", description: "Description for Event 3" },
  { id: 4, title: "Event 4", description: "Description for Event 4" },
  { id: 5, title: "Event 5", description: "Description for Event 5" },
  { id: 6, title: "Event 6", description: "Description for Event 6" },
  { id: 7, title: "Event 7", description: "Description for Event 7" },
  { id: 8, title: "Event 8", description: "Description for Event 8" },
  { id: 9, title: "Event 9", description: "Description for Event 9" },
  { id: 10, title: "Event 10", description: "Description for Event 10" },
]

export default function Component() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null)
  const controls = useAnimation()
  const [isSwiping, setIsSwiping] = useState(false)
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  const handleSwipe = (newDirection: 'left' | 'right' | 'up' | 'down') => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDirection(newDirection)
    
    controls.start({ 
      x: newDirection === 'left' ? -300 : newDirection === 'right' ? 300 : 0,
      y: newDirection === 'up' ? -300 : newDirection === 'down' ? 300 : 0,
      opacity: 0 
    })
    
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        if (newDirection === 'left' || newDirection === 'right' || newDirection === 'down') {
          return (prevIndex + 1)
        } else if (newDirection === 'up') {
          return (prevIndex - 1)
        }
        return prevIndex
      })
      resetCard()
    }, 300)
  }

  const resetCard = () => {
    setDirection(null)
    controls.start({ x: 0, y: 0, opacity: 1 })
    setIsSwiping(false);
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      if (Math.abs(info.offset.x) > threshold) {
        handleSwipe(info.offset.x > 0 ? 'right' : 'left')
      } else {
        controls.start({ x: 0, opacity: 1 })
      }
    } else {
      if (Math.abs(info.offset.y) > threshold) {
        handleSwipe(info.offset.y < 0 ? 'up' : 'down')
      } else {
        controls.start({ y: 0, opacity: 1 })
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isKeyPressed) return;
  
    setIsKeyPressed(true);
    switch (event.key) {
      case "ArrowRight":
        handleSwipe('right'); // Move right
        break;
      case "ArrowLeft":
        handleSwipe('left'); // Move left
        break;
      case "ArrowUp":
        handleSwipe('up'); // Move up
        break;
      case "ArrowDown":
        handleSwipe('down'); // Move down
        break;
    }
  }  

  const handleKeyUp = () => {
    setIsKeyPressed(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 overflow-hidden"
    >
      <div className="relative w-full max-w-md aspect-[9/16]">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="w-full h-full"
        >
          <Card className="w-full h-full flex items-center justify-center shadow-xl">
            <CardContent className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">{cardData[currentCardIndex].title}</h2>
              <p className="text-gray-600">{cardData[currentCardIndex].description}</p>
            </CardContent>
          </Card>
        </motion.div>
        {direction && (
          <div className="absolute text-white text-6xl">
            {direction === 'up' && <ArrowUp className="bottom-4 left-1/2 -translate-x-1/2" />}
            {direction === 'down' && <ArrowDown className="top-4 left-1/2 -translate-x-1/2" />}
            {direction === 'left' && <ArrowLeft className="right-4 top-1/2 -translate-y-1/2" />}
            {direction === 'right' && <ArrowRight className="left-4 top-1/2 -translate-y-1/2" />}
          </div>
        )}
      </div>
    </div>
  )
}