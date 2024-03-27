import Image from 'next/image'

import { Panel } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function UserStatsTable() {
  return (
    <Panel>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Round</TableHead>
            <TableHead>My score</TableHead>
            <TableHead>My rank</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-secondary flex items-center justify-center gap-2">
              <Image
                src="/images/lock.png"
                alt="battle-thumbnail"
                width="400"
                height="300"
                className="aspect-4/3 w-[50px] rounded-[6px]"
              />
              #194
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>

          <TableRow isEven>
            <TableCell className="font-secondary flex items-center justify-center gap-2">
              <Image
                src="/images/lock.png"
                alt="battle-thumbnail"
                width="400"
                height="300"
                className="aspect-4/3 w-[50px] rounded-[6px]"
              />
              #194
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-secondary flex items-center justify-center gap-2">
              <Image
                src="/images/lock.png"
                alt="battle-thumbnail"
                width="400"
                height="300"
                className="aspect-4/3 w-[50px] rounded-[6px]"
              />
              #194
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>

          <TableRow isEven>
            <TableCell className="font-secondary flex items-center justify-center gap-2">
              <Image
                src="/images/lock.png"
                alt="battle-thumbnail"
                width="400"
                height="300"
                className="aspect-4/3 w-[50px] rounded-[6px]"
              />
              #194
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Panel>
  )
}
