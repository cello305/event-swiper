import { sidebarLinks } from '@/constants'
import { CreatePostButton } from '@/components/ui/create-post-button'
import { Logo } from '@/components/ui/logo'
import { NavigationLinks } from '@/components/navigation-links'
import { ProfileButton } from '@/components/ui/profile-button'

export function LeftSidebar() {
  return (
    <section className="custom-scrollbar leftsidebar">
      <Logo width={95} height={95} />
      <div className="flex w-full flex-1 flex-col gap-1 px-6 items-center lg:items-start">
        <NavigationLinks
          links={sidebarLinks}
          linkClassName="leftsidebar_link"
          pClassName="text-light-1 max-lg:hidden"
        />
        <div className="w-fit lg:w-full">
          <CreatePostButton displayMd="block" />
        </div>
      </div>
    </section>
  )
}
