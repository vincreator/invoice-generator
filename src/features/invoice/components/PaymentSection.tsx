import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/LanguageContext'
import type { InvoiceState } from '../types'

type PaymentSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
  sanitizeNumber: (value: unknown, fallback?: number) => number
}

export function PaymentSection({ invoice, updateField, sanitizeNumber }: PaymentSectionProps) {
  const { t } = useLanguage()

  return (
    <>
      <div className="grid-two">
        <label>
          {t('payment.tax')}
          <Input
            type="number"
            min={0}
            value={invoice.taxPercent}
            onChange={(e) => updateField('taxPercent', sanitizeNumber(e.target.value))}
            className="h-10"
          />
        </label>
        <label>
          {t('payment.discount')}
          <Input
            type="number"
            min={0}
            value={invoice.discount}
            onChange={(e) => updateField('discount', sanitizeNumber(e.target.value))}
            className="h-10"
          />
        </label>
        <label>
          {t('payment.bank')}
          <Input value={invoice.bankName} onChange={(e) => updateField('bankName', e.target.value)} className="h-10" />
        </label>
        <label>
          {t('payment.accountNumber')}
          <Input value={invoice.bankAccount} onChange={(e) => updateField('bankAccount', e.target.value)} className="h-10" />
        </label>
      </div>

      <label>
        {t('payment.accountHolder')}
        <Input value={invoice.accountHolder} onChange={(e) => updateField('accountHolder', e.target.value)} className="h-10" />
      </label>
    </>
  )
}
