import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function EditRoundModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[70rem]">
        <DialogHeader>
          <DialogTitle>Something new</DialogTitle>
        </DialogHeader>

        <div className="p-8">xxx</div>
      </DialogContent>
    </Dialog>
  )
}
