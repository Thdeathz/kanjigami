type StatsItemProps = {
  label: string
  value: string | number
}

export default function StatsItem({ label, value }: StatsItemProps) {
  return (
    <div className="flex basis-1/3 flex-col items-center rounded-2xl border-2 border-border-1 p-4 text-left leading-[1.4]">
      <p className="text-[1.375rem] font-bold text-default-brand">{value}</p>
      <p className="font-medium text-default-text-lightest">{label}</p>
    </div>
  )
}
