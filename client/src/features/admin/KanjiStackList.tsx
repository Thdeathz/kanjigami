import React from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { BsStack } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import Table from './components/Table'
import { useGetStacksQuery } from './store/adminService'
import { selectStackCurrentPage, setStackCurrentPage } from './store/adminSlice'

function KanjiStackList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const page = useAppSelector(selectStackCurrentPage)
  const { data: stacks, isLoading } = useGetStacksQuery(page)

  return (
    <DefaultLayout>
      <PageHeader
        icon={<BsStack />}
        title="Config Kanji Stack"
        subtitle="Play game and learn more kanji"
        className="mb-12"
      >
        <Button className="mt-4" onClick={() => navigate('/admin/kanjis/create')}>
          Create new stack
        </Button>
      </PageHeader>

      <Panel>
        {isLoading || !stacks ? (
          <Loading className="text-3xl" />
        ) : (
          <>
            <Table
              columns={[
                {
                  title: 'Thumbnail',
                  dataIndex: 'thumbnail',
                  render: value => (
                    <div className="flex-center py-3">
                      <Image src={value} className="aspect-ratio w-[8rem] rounded-md" />
                    </div>
                  )
                },
                {
                  title: 'Title',
                  dataIndex: 'title'
                },
                {
                  title: 'Number kanjis',
                  dataIndex: 'numberKanjis',
                  render: value => (
                    <div className="flex-center">
                      <span className="text-xl font-semibold">{value}</span>
                    </div>
                  )
                },
                {
                  title: 'User followed',
                  dataIndex: 'userFollowed',
                  render: value => (
                    <div className="flex-center">
                      <span className="text-xl font-semibold">{value}</span>
                    </div>
                  )
                },
                {
                  title: 'Action',
                  dataIndex: 'action',
                  render: () => (
                    <div className="flex-center gap-4">
                      <Button type="primary" className="flex-center aspect-square">
                        <IconWrapper icon={<AiTwotoneEdit />} className="text-xl" />
                      </Button>
                      <Button type="danger" className="flex-center aspect-square">
                        <IconWrapper icon={<AiTwotoneDelete />} className="text-xl" />
                      </Button>
                    </div>
                  )
                }
              ]}
              dataSources={stacks.data.map(stack => ({
                thumbnail: stack.thumbnail,
                title: stack.name,
                numberKanjis: stack.totalKanjis,
                userFollowed: stack.totalFollowers
              }))}
            />
            {stacks.totalPages > 0 && (
              <div className="my-4 flex items-center justify-end gap-2 text-lg font-medium">
                {Array.from(Array(stacks.totalPages).keys()).map(index => (
                  <button
                    key={`paginate-${index}`}
                    className={`p-2 ${page === index + 1 ? 'text-primary-light' : ''}`}
                    onClick={() => dispatch(setStackCurrentPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </Panel>
    </DefaultLayout>
  )
}

export default KanjiStackList
