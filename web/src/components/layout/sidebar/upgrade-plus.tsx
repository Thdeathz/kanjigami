import Link from 'next/link'

import PlusBadge from '../../plus-badge'

export default function UpgradePlusButton() {
  return (
    <div className="w-full border-r border-solid border-border-1 px-4 pb-4">
      <Link
        href="/"
        className="relative flex w-full items-center justify-center gap-2 rounded-full py-[0.6rem] transition-all duration-200 hover:translate-y-[-3px] active:scale-95 dark:bg-[hsla(0,0%,100%,.1)] dark:hover:bg-[transparent]"
      >
        <p className="text-button-light-text dark:text-button-dark-text font-semibold leading-[1.125rem]">Upgrade to</p>{' '}
        <PlusBadge />
        <span className="button__border" />
      </Link>
    </div>
  )
}
