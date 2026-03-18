import { Input } from '@/components/ui/input'

import type { InvoiceState } from '../types'

type PaymentSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
  sanitizeNumber: (value: unknown, fallback?: number) => number
}

export function PaymentSection({ invoice, updateField, sanitizeNumber }: PaymentSectionProps) {
  return (
    <>
      <div className="grid-two">
        <label>
          Pajak (%)
          <Input
            type="number"
            min={0}
            value={invoice.taxPercent}
            onChange={(e) => updateField('taxPercent', sanitizeNumber(e.target.value))}
            className="h-10"
          />
        </label>
        <label>
          Diskon (Rp)
          <Input
            type="number"
            min={0}
            value={invoice.discount}
            onChange={(e) => updateField('discount', sanitizeNumber(e.target.value))}
            className="h-10"
          />
        </label>
        <label>
          Bank
          <Input value={invoice.bankName} onChange={(e) => updateField('bankName', e.target.value)} className="h-10" />
        </label>
        <label>
          No. Rekening
          <Input value={invoice.bankAccount} onChange={(e) => updateField('bankAccount', e.target.value)} className="h-10" />
        </label>
      </div>

      <label>
        Atas Nama
        <Input value={invoice.accountHolder} onChange={(e) => updateField('accountHolder', e.target.value)} className="h-10" />
      </label>
    </>
  )
}
