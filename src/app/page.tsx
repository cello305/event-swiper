'use client'

import { Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Homepage() {
  return (
    <div className={`flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-700">
        <Link className="flex items-center justify-center" href="#">
          <Globe className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Template</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Template
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empowering businesses with innovative solutions. Discover how we can transform your workflow and boost productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button className="inline-flex h-11 items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-2 text-sm font-medium shadow transition-colors hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="inline-flex h-11 items-center justify-center rounded-md px-8 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>What services does Template offer?</AccordionTrigger>
                <AccordionContent>
                  Template offers a wide range of services including cloud computing solutions, data analytics, AI-powered tools, and custom software development tailored to meet the unique needs of businesses across various industries.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I get started with Template?</AccordionTrigger>
                <AccordionContent>
                  Getting started is easy! Simply click the "Get Started" button at the top of this page, and you'll be guided through our onboarding process. Our team will work closely with you to understand your needs and set up the perfect solution for your business.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What kind of support does Template provide?</AccordionTrigger>
                <AccordionContent>
                  We offer 24/7 customer support through various channels including phone, email, and live chat. Our dedicated support team is always ready to assist you with any questions or issues you may encounter.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is Template suitable for small businesses?</AccordionTrigger>
                <AccordionContent>
                  We have solutions tailored for businesses of all sizes, from startups to large enterprises. Our scalable services allow you to start small and grow as your business expands, ensuring you only pay for what you need.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Template. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
