import { footerLinks } from '@/constants'
import Link from 'next/link'
import { RiMoreFill, RiSearchLine } from 'react-icons/ri'
import { Box } from '@/components/ui/box'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function RightSidebar() {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex items-center bg-dark-2 p-4 rounded-full gap-4">
        <RiSearchLine color="white" size={20} />
        <input type="text" placeholder="Search" className="w-full bg-dark-2" />
      </div>

      <Box heading="Friends">
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src="https://github.com/jamesjbustos.png" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>
          <span className="text-white font-bold">James</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src="https://github.com/cello305.png" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <span className="text-white font-bold">Manny</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/mq40.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="text-white font-bold">Massimo</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/mashaleye.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="text-white font-bold">Mojeed</span>
        </div>
      </Box>

      <Box heading="Your Events">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/JV-FIU.png" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <Link href="organization">
            <span className="text-white font-bold">
              Florida International University
            </span>
          </Link>
        </div>
      </Box>

      <footer className="text-[#565A5F] text-subtle-medium flex">
        <ul className="flex flex-wrap gap-x-3">
          {footerLinks.map((link) => {
            return (
              <li key={link.label} className="hover:underline">
                <Link href={link.route}>{link.label}</Link>
              </li>
            )
          })}
          <button className="flex items-center gap-x-1 hover:underline">
            More
            <RiMoreFill />
          </button>
        </ul>
      </footer>
    </section>
  )
}
