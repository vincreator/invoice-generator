import { Printer } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { Button } from '@/components/ui/button'

type InvoiceToolbarProps = {
  onPrint: () => void
}

export function InvoiceToolbar({ onPrint }: InvoiceToolbarProps) {
  const { t } = useLanguage()

  return (
    <div className="toolbar-row">
      <Button type="button" variant="outline" className="h-9" onClick={onPrint}>
        <Printer className="size-4" />
        {t('buttons.print')}
      </Button>
    </div>
  )
}
