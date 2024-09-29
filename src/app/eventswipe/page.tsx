'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import {
  Home,
  User,
  CalendarDays,
  Clock,
  Users,
  UserCircle,
} from 'lucide-react'
import Sidebar from '../sidebar/page'

const cardData = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Description for Event 1',
    image:
      'https://static.wixstatic.com/media/5b305a_fa0728868614484488624d8453871cff~mv2.jpg/v1/fill/w_640,h_542,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5b305a_fa0728868614484488624d8453871cff~mv2.jpg',
    date: '2023-07-15',
    time: '14:00',
    attendees: 25,
    organizer: 'John Doe',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-16',
    time: '15:30',
    attendees: 40,
    organizer: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Event 3',
    description: 'Description for Event 3',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-17',
    time: '10:00',
    attendees: 15,
    organizer: 'Bob Johnson',
  },
  {
    id: 4,
    title: 'Event 4',
    description: 'Description for Event 4',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-18',
    time: '18:00',
    attendees: 50,
    organizer: 'Alice Brown',
  },
  {
    id: 5,
    title: 'Event 5',
    description: 'Description for Event 5',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-19',
    time: '09:30',
    attendees: 30,
    organizer: 'Charlie Wilson',
  },
  {
    id: 6,
    title: 'Event 6',
    description: 'Description for Event 6',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-20',
    time: '16:45',
    attendees: 20,
    organizer: 'Diana Miller',
  },
  {
    id: 7,
    title: 'Event 7',
    description: 'Description for Event 7',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-21',
    time: '11:15',
    attendees: 35,
    organizer: 'Edward Davis',
  },
  {
    id: 8,
    title: 'Event 8',
    description: 'Description for Event 8',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-22',
    time: '13:30',
    attendees: 45,
    organizer: 'Fiona Taylor',
  },
  {
    id: 9,
    title: 'Event 9',
    description: 'Description for Event 9',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-23',
    time: '19:00',
    attendees: 55,
    organizer: 'George Martin',
  },
  {
    id: 10,
    title: 'Event 10',
    description: 'Description for Event 10',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-07-24',
    time: '12:00',
    attendees: 60,
    organizer: 'Hannah White',
  },
]

export default function Component() {
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
    <div className="min-h-screen flex">
      {/* Main content */}
      <div className="flex-1 flex flex-row items-start justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 overflow-hidden relative">
        {/* Flex container for card swiper and sidebar */}
        <div className="flex items-center justify-center w-full">
          {/* Centered Card Swiper */}
          <div className="relative w-full max-w-md h-[100vh] flex flex-col justify-center py-5 mx-auto">
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
                    <div className="relative w-full h-3/5">
                      <img
                        src={filteredCardData[currentCardIndex].image}
                        alt={filteredCardData[currentCardIndex].title}
                        className="w-full h-full object-cover rounded-t-3xl"
                      />
                    </div>
                    <CardContent className="text-center p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {filteredCardData[currentCardIndex].title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {filteredCardData[currentCardIndex].description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 space-y-2">
                        <div className="flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          <span>
                            Date: {filteredCardData[currentCardIndex].date}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            Time: {filteredCardData[currentCardIndex].time}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>
                            Attendees:{' '}
                            {filteredCardData[currentCardIndex].attendees}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
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
