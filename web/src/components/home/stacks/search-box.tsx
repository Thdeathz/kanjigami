'use client'

import { BsSearchHeartFill } from 'react-icons/bs'
import { useDebounceCallback } from 'usehooks-ts'

import { Panel } from '@/components/ui/card'
import useQueryParams from '@/hooks/use-query-params'

type Props = {
  searchValue?: string
}

export default function SearchBox({ searchValue }: Props) {
  const { onSearch } = useQueryParams()

  const handleSearch = (term: string) => onSearch('search', term)

  const debounced = useDebounceCallback(handleSearch, 500)

  return (
    <Panel className="p-2">
      <div className="group flex min-w-[20vw] items-center justify-start gap-2 rounded-lg bg-filter px-2 font-medium">
        <BsSearchHeartFill className="text-lg opacity-60 transition-opacity group-focus:opacity-100" />

        <input
          className="w-full border-none bg-transparent py-2 outline-none"
          placeholder="面白い動画 。。。"
          defaultValue={searchValue}
          onChange={(e) => debounced(e.target.value)}
        />
      </div>
    </Panel>
  )
}
