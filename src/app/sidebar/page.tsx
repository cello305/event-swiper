"use client"

import { User, Calendar, UserCircle } from "lucide-react"

const events = [
  { id: 1, name: "Conference", date: "2024-10-01" },
  { id: 2, name: "Team Meeting", date: "2024-10-02" },
  { id: 3, name: "Product Launch", date: "2024-10-05" },
  { id: 4, name: "Client Call", date: "2024-10-07" },
  { id: 5, name: "Workshop", date: "2024-10-10" },
  { id: 6, name: "Annual Party", date: "2024-10-15" }
];

export default function Sidebar() {
  return (
    <div className="w-72 bg-white p-6 rounded-lg shadow-lg ml-4">
      {/* Added People Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <User className="mr-2" /> Added People
        </h3>
        <div className="space-y-3">
          <div className="bg-gray-100 p-3 rounded flex items-center">
            <UserCircle className="mr-3 h-6 w-6" />
            <span>John Smith</span>
          </div>
          <div className="bg-gray-100 p-3 rounded flex items-center">
            <UserCircle className="mr-3 h-6 w-6" />
            <span>Jane Doe</span>
          </div>
        </div>
      </div>

      {/* Your Events Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-2" /> Your Events
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-100 p-3 rounded text-center">
              <span className="block font-bold">{event.name}</span>
              <span className="text-sm text-gray-500">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}