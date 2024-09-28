'use client'

import { Calendar, Settings, User } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OrganizationProfile() {
  const events = [
    { id: 1, title: 'Shellhacks 2024', date: '2024-02-17', type: 'Hackathon', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8S2hKnkjT8QVlBpqOkOeZe0k0o8xYopP1w&s' },
    { id: 2, title: 'Government Conference', date: '2023-09-15', type: 'Conference', image: 'https://www.hstoday.us/wp-content/uploads/2021/09/fiu-avril-haines-table-discussion.jpeg' },
    { id: 3, title: 'Product Launch', date: '2023-10-01', type: 'Launch', image: 'https://res.cloudinary.com/digicomm/image/upload/t_metadata/news-magazine/2024/_assets/53905393687_9d217922b9_k-1.jpg' },
    { id: 4, title: 'Team Building Workshop', date: '2023-10-15', type: 'Workshop', image: 'https://i0.wp.com/arc.fiu.edu/wp-content/uploads/2024/02/thumbnail_IMG_1582.jpg?w=496&h=373&ssl=1' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Organization info and navigation */}
            <div className="md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="https://www.aplu.org/wp-content/uploads/fiu.png" alt="Florida International University" />
                      <AvatarFallback>FIU</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-2x1 font-bold">Florida International University</h2>
                    <p className="text-muted-foreground">info@fiu.edu</p>
                    <p className="mt-2 text-sm text-muted-foreground">Innovating Education and Research</p>
                  </div>
                </CardContent>
                <CardFooter>
                  {/* Add any navigation links if needed */}
                </CardFooter>
              </Card>
            </div>

            {/* Right column - Combined organization info and events */}
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Information</CardTitle>
                  <CardDescription>FIU's engagement in students and innovation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">About Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Florida International University is committed to providing cutting-edge education and fostering innovation in various fields. We regularly host events, workshops, and hackathons to engage students and the community.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Upcoming Events</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {events.map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{event.title}</CardTitle>
                            <CardDescription>{event.date}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-md mb-2" />
                            <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{event.type}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
