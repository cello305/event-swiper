"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, CalendarDays } from "lucide-react"; // Removed Search

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

  const filteredCardData = cardData; // No longer filtering based on search

  const handleSwipe = (newDirection: 'left' | 'right' | 'up' | 'down') => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDirection(newDirection);
    
    controls.start({ 
      x: newDirection === 'left' ? -150 : newDirection === 'right' ? 150 : 0, // Reduced distance
      y: newDirection === 'up' ? -150 : newDirection === 'down' ? 150 : 0, // Reduced distance
      opacity: 0 
    });
    
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        if (newDirection === 'left' || newDirection === 'right' || newDirection === 'down') {
          return (prevIndex + 1) % filteredCardData.length;
        } else if (newDirection === 'up') {
          return (prevIndex - 1 + filteredCardData.length) % filteredCardData.length;
        }
        return prevIndex;
      });
      resetCard();
    }, 150);
  };   

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
        handleSwipe('right'); 
        break;
      case "ArrowLeft":
        handleSwipe('left'); 
        break;
      case "ArrowUp":
        handleSwipe('up'); 
        break;
      case "ArrowDown":
        handleSwipe('down'); 
        event.preventDefault();
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
    <div className="min-h-screen flex">
      {/* Static Sidebar */}
      <nav className="bg-gray-900 text-white w-64 flex flex-col items-center py-6">
        <div className="mb-8">
          <img
            src="/logo.png" // Replace with your own logo or icon
            alt="Logo"
            className="w-8 h-8"
          />
        </div>
        <ul className="space-y-6">
          <li className="flex items-center cursor-pointer hover:text-pink-500">
            <Home size={24} />
            <span className="ml-2">Home</span>
          </li>
          <li className="flex items-center cursor-pointer hover:text-pink-500">
            <User size={24} />
            <span className="ml-2">Profile</span>
          </li>
          <li className="flex items-center cursor-pointer hover:text-pink-500">
            <CalendarDays size={24} />
            <span className="ml-2">Events</span>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 overflow-hidden relative">
        <div className="relative w-full max-w-md h-[100vh] flex flex-col justify-center py-5"> 
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="w-full h-full flex items-center justify-center"
          >
            <Card className="w-full h-full flex items-center justify-center shadow-xl relative">
              {filteredCardData.length > 0 ? (
                <CardContent className="text-center p-6">
                  <h2 className="text-2xl font-bold mb-4">{filteredCardData[currentCardIndex].title}</h2>
                  <p className="text-gray-600">{filteredCardData[currentCardIndex].description}</p>
                </CardContent>
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
  )
}
