'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cardData } from '@/data/eventData'
import {
  Home,
  User,
  CalendarDays,
  Clock,
  Users,
  UserCircle,
} from 'lucide-react'

export function SwipeCard() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [direction, setDirection] = useState<
    'left' | 'right' | 'up' | 'down' | null
  >(null)
  const controls = useAnimation()
  const [isSwiping, setIsSwiping] = useState(false)
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  const filteredCardData = cardData

  const handleSwipe = (newDirection: 'left' | 'right' | 'up' | 'down') => {
    if (isSwiping) return
    setIsSwiping(true)
    setDirection(newDirection)

    controls.start({
      x: newDirection === 'left' ? -150 : newDirection === 'right' ? 150 : 0,
      y: newDirection === 'up' ? -150 : newDirection === 'down' ? 150 : 0,
      opacity: 0,
    })

    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        if (
          newDirection === 'left' ||
          newDirection === 'right' ||
          newDirection === 'down'
        ) {
          return (prevIndex + 1) % filteredCardData.length
        } else if (newDirection === 'up') {
          return (
            (prevIndex - 1 + filteredCardData.length) % filteredCardData.length
          )
        }
        return prevIndex
      })
      resetCard()
    }, 150)
  }

  const resetCard = () => {
    setDirection(null)
    controls.start({ x: 0, y: 0, opacity: 1 })
    setIsSwiping(false)
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
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
    if (isKeyPressed) return

    setIsKeyPressed(true)
    switch (event.key) {
      case 'ArrowRight':
        handleSwipe('right')
        break
      case 'ArrowLeft':
        handleSwipe('left')
        break
      case 'ArrowUp':
        handleSwipe('up')
        break
      case 'ArrowDown':
        handleSwipe('down')
        event.preventDefault()
        break
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
    <div className="mt-[56px] md:mt-0 flex flex-col gap-10">
      <div className="flex-1 flex flex-row items-start justify-center p-4 overflow-hidden relative">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-[450px] h-[500px] flex flex-col justify-center py-5 mx-auto">
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              animate={controls}
              className="w-full h-full flex items-center justify-center"
            >
              <Card className="w-full h-full flex flex-col shadow-xl relative overflow-hidden rounded-3xl">
                {filteredCardData.length > 0 ? (
                  <>
                    <div className="absolute inset-0">
                      <img
                        src={filteredCardData[currentCardIndex].image}
                        alt={filteredCardData[currentCardIndex].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                      <div>
                        <h2 className="text-xl font-bold mb-2 text-white">
                          {filteredCardData[currentCardIndex].title}
                        </h2>
                        <p className="text-sm text-gray-200 mb-2">
                          {filteredCardData[currentCardIndex].description}
                        </p>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex items-center">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          <span>
                            Date: {filteredCardData[currentCardIndex].date}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            Time: {filteredCardData[currentCardIndex].time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>
                            Attendees:{' '}
                            {filteredCardData[currentCardIndex].attendees}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <UserCircle className="w-4 h-4 mr-2" />
                          <span>
                            Organizer:{' '}
                            {filteredCardData[currentCardIndex].organizer}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-4">No Events Found</h2>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
