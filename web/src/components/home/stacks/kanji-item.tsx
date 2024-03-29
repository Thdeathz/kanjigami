import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function KanjiItem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>世代交代</Button>
      </DialogTrigger>
      <DialogContent className="w-[70rem]">
        <DialogHeader>
          <DialogTitle>世代交代</DialogTitle>
        </DialogHeader>

        <div className="p-8">
          <p>Some thing</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
