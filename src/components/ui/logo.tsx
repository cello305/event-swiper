import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  paddingX?: string
  marginBottom?: string
  width?: number
  height?: number
}

export function Logo(props: LogoProps) {
  const {
    paddingX = 'px-10',
    marginBottom = 'mb-4',
    width = 95,
    height = 95,
  } = props

  return (
    <Link href="/" className={`flex items-center ${paddingX} ${marginBottom}`}>
      <Image
        src="/JoinUp.svg"
        className=""
        alt="App Logo"
        width={width}
        height={height}
      />
    </Link>
  )
}
