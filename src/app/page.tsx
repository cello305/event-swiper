"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      const fullText = cities[index % cities.length];
      setDisplayedText((prev) => {
        if (isDeleting) {
          const updatedText = prev.slice(0, prev.length - 1);
          if (updatedText.length === 0) {
            setIsDeleting(false);
            setIndex((prevIndex) => prevIndex + 1);
          }
          return updatedText;
        } else {
          const updatedText = fullText.slice(0, prev.length + 1);
          if (updatedText.length === fullText.length) {
            setIsDeleting(true);
          }
          return updatedText;
        }
      });
    }, isDeleting ? 150 : 300);

    return () => clearInterval(typingEffect);
  }, [index, isDeleting]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <Image
        className="dark:invert"
        src="https://nextjs.org/icons/event.svg"
        alt="Event Swiper logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-2xl font-bold text-center sm:text-left">
        Discover Upcoming Events with Event-Swiper
      </h1>
      <p className="text-sm text-center sm:text-left">
        Easily browse through the latest events and find what interests you!
      </p>

      <p className="text-center sm:text-left">
        Events now hosting in: <span className="font-mono">{displayedText}</span>
        <span className="cursor">|</span>
      </p>

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">Swipe up and down to discover events or people.</li>
        <li>Swipe right on what you're interested and find your community.</li>
      </ol>

      <div className="flex justify-center">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Find Events Near Me
        </a>
      </div>

      <style jsx>{`
        .cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
