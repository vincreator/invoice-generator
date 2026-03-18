import { Textarea } from '@/components/ui/textarea'

import type { InvoiceState } from '../types'

type NotesSectionProps = {
  notes: InvoiceState['notes']
  onChange: (value: string) => void
}

export function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <label>
      Catatan
      <Textarea value={notes} onChange={(e) => onChange(e.target.value)} rows={3} className="min-h-24" />
    </label>
  )
}
