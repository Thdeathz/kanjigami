type StatsItemProps = {
  label: string
  value: string | number
}

export default function StatsItem({ label, value }: StatsItemProps) {
  return (
    <div className="flex basis-1/3 flex-col items-center rounded-2xl border-2 border-border-1 p-2.5 text-left leading-[1.4] sm:p-4">
      <p className="text-lg font-bold text-default-brand sm:text-[1.375rem]">{value}</p>
      <p className="font-medium text-default-text-lightest">{label}</p>
    </div>
  )
}
