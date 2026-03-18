import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/LanguageContext'
import { STATUS_OPTIONS_ID, STATUS_OPTIONS_EN, type InvoiceState } from '../types'

type BasicInfoSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
}

export function BasicInfoSection({ invoice, updateField }: BasicInfoSectionProps) {
  const { t, language } = useLanguage()
  const statusOptions = language === 'en' ? STATUS_OPTIONS_EN : STATUS_OPTIONS_ID

  return (
    <div className="grid-two">
      <label>
        {t('invoice.invoiceNumber')}
        <Input
          value={invoice.invoiceNumber}
          onChange={(e) => updateField('invoiceNumber', e.target.value)}
          className="h-10"
        />
      </label>
      <label>
        {t('invoice.status')}
        <select
          value={invoice.status}
          onChange={(e) => updateField('status', e.target.value as InvoiceState['status'])}
          className="h-10 rounded-lg border border-input bg-white px-3 text-sm"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t('invoice.issueDate')}
        <Input
          type="date"
          value={invoice.issueDate}
          onChange={(e) => updateField('issueDate', e.target.value)}
          className="h-10"
        />
      </label>
      <label>
        {t('invoice.dueDate')}
        <Input
          type="date"
          value={invoice.dueDate}
          onChange={(e) => updateField('dueDate', e.target.value)}
          className="h-10"
        />
      </label>
    </div>
  )
}
