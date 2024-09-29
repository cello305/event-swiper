import { Button } from './button'

interface ProfileButtonProps {
  showName: boolean
}

export function ProfileButton(props: ProfileButtonProps) {
  const { showName } = props

  return (
    <div className="flex flex-row-reverse">
      <Button>
        <span className="mr-2">👤</span>
        {showName && <span>User Name</span>}
      </Button>
    </div>
  )
}
