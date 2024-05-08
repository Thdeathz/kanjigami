'use client'

import { useDebounceCallback } from 'usehooks-ts'

import { Panel } from '@/components/ui/card'
import useQueryParams from '@/hooks/use-query-params'

import InputSearch from '../input-search'

type Props = {
  searchValue?: string
}

export default function SearchBox({ searchValue }: Props) {
  const { onSearch } = useQueryParams()

  const handleSearch = (term: string) => onSearch('search', term)

  const debounced = useDebounceCallback(handleSearch, 500)

  return (
    <Panel className="p-2">
      <InputSearch
        placeholder="面白い動画 。。。"
        defaultValue={searchValue}
        onChange={(e) => debounced(e.target.value)}
      />
    </Panel>
  )
}
