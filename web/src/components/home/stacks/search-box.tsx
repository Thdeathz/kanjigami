'use client'

import { useDebounceCallback } from 'usehooks-ts'

import { Panel } from '@/components/ui/card'
import useQueryParams from '@/hooks/use-query-params'

import InputSearch from '../input-search'

type Props = {
  searchValue?: string
  topic?: string
}

export default function SearchBox({ searchValue, topic }: Props) {
  const { onSearch, onResetSearch } = useQueryParams()

  const handleSearch = (term: string) => {
    if (term.trim() === '') return onResetSearch()

    if (term.startsWith('#')) return onSearch('topic', term.slice(1))

    return onSearch('search', term)
  }

  const debounced = useDebounceCallback(handleSearch, 500)

  return (
    <Panel className="p-2">
      <InputSearch
        placeholder="面白い動画 。。。"
        defaultValue={searchValue + (topic ? `#${topic}` : '')}
        onChange={(e) => debounced(e.target.value)}
      />
    </Panel>
  )
}
