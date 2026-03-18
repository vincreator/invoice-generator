import { Input } from '@/components/ui/input'

import { STATUS_OPTIONS, type InvoiceState } from '../types'

type BasicInfoSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
}

export function BasicInfoSection({ invoice, updateField }: BasicInfoSectionProps) {
  return (
    <div className="grid-two">
      <label>
        Nomor Invoice
        <Input
          value={invoice.invoiceNumber}
          onChange={(e) => updateField('invoiceNumber', e.target.value)}
          className="h-10"
        />
      </label>
      <label>
        Status
        <select
          value={invoice.status}
          onChange={(e) => updateField('status', e.target.value as InvoiceState['status'])}
          className="h-10 rounded-lg border border-input bg-white px-3 text-sm"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tanggal Terbit
        <Input
          type="date"
          value={invoice.issueDate}
          onChange={(e) => updateField('issueDate', e.target.value)}
          className="h-10"
        />
      </label>
      <label>
        Jatuh Tempo
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
