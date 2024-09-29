"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, User, CalendarDays } from "lucide-react"; 
import Sidebar from "../sidebar/page";

type Event = {
  id: number;
  title: string;
  description?: string | null;
};

export default function Component() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down" | null>(null);
  const controls = useAnimation();
  const [isSwiping, setIsSwiping] = useState(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [cardData, setCardData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/event');
      const { data, error } = await response.json();

      if (error) {
        console.error('Error fetching event data:', error);
      } else {
        setCardData(data || []);
      }
    };

    fetchEvents();
  }, []);

  const handleSwipe = (newDirection: "left" | "right" | "up" | "down") => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDirection(newDirection);

    controls.start({
      x: newDirection === "left" ? -150 : newDirection === "right" ? 150 : 0,
      y: newDirection === "up" ? -150 : newDirection === "down" ? 150 : 0,
      opacity: 0,
    });

    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        if (newDirection === "left" || newDirection === "right" || newDirection === "down") {
          return (prevIndex + 1);
        } else if (newDirection === "up") {
          return (prevIndex - 1 + cardData.length)
        }
        return prevIndex;
      });
      resetCard();
    }, 150);
  };

  const resetCard = () => {
    setDirection(null);
    controls.start({ x: 0, y: 0, opacity: 1 });
    setIsSwiping(false);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      if (Math.abs(info.offset.x) > threshold) {
        handleSwipe(info.offset.x > 0 ? "right" : "left");
      } else {
        resetCard();
      }
    } else {
      if (Math.abs(info.offset.y) > threshold) {
        handleSwipe(info.offset.y < 0 ? "up" : "down");
      } else {
        resetCard();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isKeyPressed) return;

    setIsKeyPressed(true);
    switch (event.key) {
      case "ArrowRight":
        handleSwipe("right");
        break;
      case "ArrowLeft":
        handleSwipe("left");
        break;
      case "ArrowUp":
        handleSwipe("up");
        break;
      case "ArrowDown":
        handleSwipe("down");
        event.preventDefault();
        break;
    }
  };

  const handleKeyUp = () => {
    setIsKeyPressed(false);
  };

  useEffect(() => {
    const disableScroll = (event: WheelEvent) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", disableScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  console.log(cardData)

  return (
    <div className="min-h-screen flex">
      <nav className="bg-gray-900 text-white w-64 flex flex-col items-center py-6">
        <div className="mb-8">
          <img
            src="/placeholder.svg?height=32&width=32"
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

      <div className="flex-1 flex flex-row items-start justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 overflow-hidden relative">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-full max-w-md h-[100vh] flex flex-col justify-center py-5 mx-auto">
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              animate={controls}
              className="w-full h-full flex items-center justify-center"
            >
              <Card className="w-full h-full flex items-center justify-center shadow-xl relative">
                {cardData.length > 0 ? (
                  <CardContent className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-4">{cardData[currentCardIndex]?.title}</h2>
                    <p className="text-gray-600">{cardData[currentCardIndex]?.description}</p>
                  </CardContent>
                ) : (
                  <CardContent className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-4">No Events Found</h2>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          </div>

          <div className="w-72 ml-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
