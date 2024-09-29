import { Logo } from '@/components/ui/logo'
import { ProfileButton } from '@/components/ui/profile-button'

export default function Topbar() {
  return (
    <nav className="topbar md:hidden">
      <div>
        <ProfileButton showName={false} />
      </div>
      <div className="flex-1 flex justify-center">
        <Logo paddingX="px-0" marginBottom="mb-0" width={20} height={20} />
      </div>
    </nav>
  )
}
