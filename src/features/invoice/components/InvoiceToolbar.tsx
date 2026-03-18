import { Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'

type InvoiceToolbarProps = {
  onPrint: () => void
}

export function InvoiceToolbar({ onPrint }: InvoiceToolbarProps) {
  return (
    <div className="toolbar-row">
      <Button type="button" variant="outline" className="h-9" onClick={onPrint}>
        <Printer className="size-4" />
        Print
      </Button>
    </div>
  )
}
