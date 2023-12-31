import React from 'react'

import Avatar from '~/components/Avatar'

type PropsType = {
  topUser: ITopUser
  rank: number
}

function LeaderboardItem({ topUser, rank }: PropsType) {
  return (
    <div className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-ranking-start-light to-ranking-4-10-end-light py-1 pl-2 pr-4 shadow-hard-shadow dark:from-ranking-start-dark dark:to-ranking-4-10-end-dark">
      <div className="flex-center gap-2">
        <Avatar src={topUser.avatarUrl} size="large" />

        <p className="text-lg font-semibold text-clr-link-light dark:text-clr-link-dark">{topUser.username}</p>
      </div>

      <div className="flex-center gap-12 font-medium">
        <p>{topUser.totalPoints}</p>

        <p>({topUser.totalGames} Games)</p>

        <p className="text-xl text-text-secondary-dark dark:text-text-secondary-light">
          #{rank < 10 ? `0${rank}` : rank}
        </p>
      </div>
    </div>
  )
}

export default LeaderboardItem
