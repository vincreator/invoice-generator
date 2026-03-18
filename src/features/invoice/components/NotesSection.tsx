import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/lib/LanguageContext'
import type { InvoiceState } from '../types'

type NotesSectionProps = {
  notes: InvoiceState['notes']
  onChange: (value: string) => void
}

export function NotesSection({ notes, onChange }: NotesSectionProps) {
  const { t } = useLanguage()

  return (
    <label>
      {t('notes')}
      <Textarea value={notes} onChange={(e) => onChange(e.target.value)} rows={3} className="min-h-24" />
    </label>
  )
}
