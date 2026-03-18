import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/LanguageContext'
import { ItemCard } from './ItemCard'

import type { InvoiceItem } from '../types'

type ItemsSectionProps = {
  items: InvoiceItem[]
  onAdd: () => void
  onUpdate: (id: number, key: keyof InvoiceItem, value: string | number) => void
  onDuplicate: (id: number) => void
  onRemove: (id: number) => void
  formatIdr: (value: number) => string
}

export function ItemsSection({
  items,
  onAdd,
  onUpdate,
  onDuplicate,
  onRemove,
  formatIdr,
}: ItemsSectionProps) {
  const { t } = useLanguage()

  return (
    <>
      <div className="item-header">
        <h2>{t('items.title')}</h2>
        <Button type="button" variant="outline" onClick={onAdd} className="h-9 rounded-xl border-teal-200 text-teal-700">
          <Plus className="size-4" />
          {t('items.addButton')}
        </Button>
      </div>

      <div className="item-list">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDuplicate={onDuplicate}
            onRemove={onRemove}
            formatIdr={formatIdr}
          />
        ))}
        {items.length === 0 && (
          <div className="item-empty-state">
            <p>{t('items.title')}: {t('validation.itemsRequired')}</p>
          </div>
        )}
      </div>
    </>
  )
}
