"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
];

export default function Component() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const controls = useAnimation();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // minimum distance required to register a swipe
    if (info.offset.x > threshold) {
      setDirection('right');
      controls.start({ x: 300, opacity: 0 });
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        resetCard();
      }, 300);
    } else if (info.offset.x < -threshold) {
      setDirection('left');
      controls.start({ x: -300, opacity: 0 });
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        resetCard();
      }, 300);
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  const resetCard = () => {
    setDirection(null);
    controls.start({ x: 0, opacity: 1 });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setDirection('right');
      controls.start({ x: 300, opacity: 0 });
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        resetCard();
      }, 300);
    } else if (event.key === "ArrowLeft") {
      setDirection('left');
      controls.start({ x: -300, opacity: 0 });
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        resetCard();
      }, 300);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [controls]);

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
              <h2 className="text-2xl font-bold mb-4">{cardData[currentCardIndex].title}</h2>
              <p className="text-gray-600">{cardData[currentCardIndex].description}</p>
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
  );
}
