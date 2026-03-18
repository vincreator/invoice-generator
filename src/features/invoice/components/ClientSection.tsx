import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/LanguageContext'
import type { InvoiceState } from '../types'

type ClientSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
}

export function ClientSection({ invoice, updateField }: ClientSectionProps) {
  const { t } = useLanguage()

  return (
    <>
      <div className="grid-two">
        <label>
          {t('client.from')}
          <Input value={invoice.fromName} onChange={(e) => updateField('fromName', e.target.value)} className="h-10" />
        </label>
        <label>
          {t('client.role')}
          <Input value={invoice.fromRole} onChange={(e) => updateField('fromRole', e.target.value)} className="h-10" />
        </label>
        <label>
          {t('client.billTo')}
          <Input value={invoice.billTo} onChange={(e) => updateField('billTo', e.target.value)} className="h-10" />
        </label>
        <label>
          {t('client.project')}
          <Input value={invoice.project} onChange={(e) => updateField('project', e.target.value)} className="h-10" />
        </label>
      </div>

      <label>
        {t('client.period')}
        <Input value={invoice.period} onChange={(e) => updateField('period', e.target.value)} className="h-10" />
      </label>
    </>
  )
}
