import { Input } from '@/components/ui/input'

import type { InvoiceState } from '../types'

type ClientSectionProps = {
  invoice: InvoiceState
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
}

export function ClientSection({ invoice, updateField }: ClientSectionProps) {
  return (
    <>
      <div className="grid-two">
        <label>
          Dari (Nama)
          <Input value={invoice.fromName} onChange={(e) => updateField('fromName', e.target.value)} className="h-10" />
        </label>
        <label>
          Jabatan
          <Input value={invoice.fromRole} onChange={(e) => updateField('fromRole', e.target.value)} className="h-10" />
        </label>
        <label>
          Ditagihkan Kepada
          <Input value={invoice.billTo} onChange={(e) => updateField('billTo', e.target.value)} className="h-10" />
        </label>
        <label>
          Proyek
          <Input value={invoice.project} onChange={(e) => updateField('project', e.target.value)} className="h-10" />
        </label>
      </div>

      <label>
        Periode
        <Input value={invoice.period} onChange={(e) => updateField('period', e.target.value)} className="h-10" />
      </label>
    </>
  )
}
