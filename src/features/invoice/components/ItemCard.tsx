import { ChevronDown, Copy, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/LanguageContext'
import { ITEM_TYPES } from '../types'
import type { InvoiceItem } from '../types'

type ItemCardProps = {
  item: InvoiceItem
  onUpdate: (id: number, key: keyof InvoiceItem, value: string | number) => void
  onDuplicate: (id: number) => void
  onRemove: (id: number) => void
  formatIdr: (value: number) => string
}

export function ItemCard({ item, onUpdate, onDuplicate, onRemove, formatIdr }: ItemCardProps) {
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const amount = item.quantity * item.rate

  return (
    <div className="item-card">
      {/* Summary Row */}
      <button
        type="button"
        className="item-card-summary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="item-card-info">
          <div className="item-card-title">{item.description || '(No description)'}</div>
          <div className="item-card-meta">
            <span className="item-badge">{t(`items.types.${item.type}`)}</span>
            <span>{item.quantity}x</span>
            <span>{formatIdr(item.rate)} = <strong>{formatIdr(amount)}</strong></span>
          </div>
        </div>
        <ChevronDown
          className={`item-card-chevron ${isExpanded ? 'expanded' : ''}`}
          size={20}
        />
      </button>

      {/* Expanded Edit Form */}
      {isExpanded && (
        <div className="item-card-expanded">
          <div className="item-form-group">
            <label>{t('items.description')}</label>
            <Input
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder={t('items.description')}
              className="h-10"
            />
          </div>

          <div className="item-form-row">
            <div className="item-form-group">
              <label>{t('items.type')}</label>
              <select
                value={item.type}
                onChange={(e) => onUpdate(item.id, 'type', e.target.value)}
                className="h-10 rounded-lg border border-input bg-white px-3 text-sm w-full"
              >
                {ITEM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(`items.types.${type}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="item-form-group">
              <label>{t('items.quantity')}</label>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => onUpdate(item.id, 'quantity', e.target.value)}
                placeholder={t('items.quantity')}
                className="h-10"
              />
            </div>

            <div className="item-form-group">
              <label>{t('items.rate')}</label>
              <Input
                type="number"
                min={0}
                value={item.rate}
                onChange={(e) => onUpdate(item.id, 'rate', e.target.value)}
                placeholder={t('items.rate')}
                className="h-10"
              />
            </div>
          </div>

          <div className="item-form-total">
            <span>{t('items.amount')}:</span>
            <span className="amount-value">{formatIdr(amount)}</span>
          </div>

          <div className="item-card-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => onDuplicate(item.id)}
              className="h-9 rounded-lg"
            >
              <Copy className="size-4" />
              {t('items.duplicate')}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => onRemove(item.id)}
              className="h-9 rounded-lg"
            >
              <Trash2 className="size-4" />
              {t('items.delete')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
