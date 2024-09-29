'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationLinksProps {
  links: {
    icon: JSX.Element
    iconFill: JSX.Element
    label: string
    route: string
  }[]
  linkClassName: string
  pClassName: string
}

export function NavigationLinks(props: NavigationLinksProps) {
  const { links, linkClassName, pClassName } = props

  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`${linkClassName} w-fit`}
          >
            {isActive ? link.iconFill : link.icon}
            <p className={pClassName}>{link.label}</p>
          </Link>
        )
      })}
    </>
  )
}
