import { Tooltip } from 'antd'
import React from 'react'

import DefaultAvatar from '~/assets/default-avatar.jpg'

import Image from './Image'

type PropsType = {
  src?: string
  className?: string
  size?: 'small' | 'base' | 'large'
  height?: string
  username?: string
}

function Avatar({ src, className, height, username, size = 'base' }: PropsType) {
  const avatarHeight = height || (size === 'small' ? 'h-[1.75rem]' : size === 'base' ? 'h-[2.25rem]' : 'h-[2.75rem]')

  return (
    <Tooltip
      placement="top"
      title={username ? `@${username}` : '@Kantan kanji'}
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
    >
      <button type="button" className={`${className ?? ''} rounded-full`}>
        <Image
          src={src ?? DefaultAvatar}
          alt="avatar"
          className={`aspect-square rounded-full object-cover ${avatarHeight}`}
        />
      </button>
    </Tooltip>
  )
}

export default Avatar
