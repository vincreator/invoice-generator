import { Copy, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  return (
    <>
      <div className="item-header">
        <h2>Daftar Item</h2>
        <Button type="button" variant="outline" onClick={onAdd} className="h-9 rounded-xl border-teal-200 text-teal-700">
          <Plus className="size-4" />
          Tambah Item
        </Button>
      </div>

      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-row">
            <Input
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="Deskripsi"
              className="h-10"
            />
            <Input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onUpdate(item.id, 'quantity', e.target.value)}
              placeholder="Qty"
              className="h-10"
            />
            <Input
              type="number"
              min={0}
              value={item.rate}
              onChange={(e) => onUpdate(item.id, 'rate', e.target.value)}
              placeholder="Rate"
              className="h-10"
            />
            <Button type="button" variant="destructive" onClick={() => onRemove(item.id)} className="h-10 rounded-xl">
              <Trash2 className="size-4" />
              Hapus
            </Button>
            <Button type="button" variant="outline" onClick={() => onDuplicate(item.id)} className="h-10 rounded-xl">
              <Copy className="size-4" />
              Duplikat
            </Button>
            <div className="line-total">{formatIdr(item.quantity * item.rate)}</div>
          </div>
        ))}
      </div>
    </>
  )
}
