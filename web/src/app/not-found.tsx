import { Button } from '@/components/ui/button'

export default function PageNotFound() {
  return (
    <div className="flex-center font-secondary min-h-content flex-col gap-4 p-8 text-xl font-medium lg:p-12">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Button link="/" variant="primary">
        Go back home
      </Button>
    </div>
  )
}
