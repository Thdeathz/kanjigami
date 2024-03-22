interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-y-4">
      <p className="text-lg font-medium">{label}</p>
    </div>
  )
}
