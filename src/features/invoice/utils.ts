import type { InvoiceState, ItemType } from './types'

export const STORAGE_KEY = 'invoice-generator-draft-v1'

export const sanitizeNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return fallback
  return Math.max(0, parsed)
}

export const createDefaultState = (): InvoiceState => ({
  invoiceNumber: '',
  issueDate: '',
  dueDate: '',
  status: 'Menunggu Pembayaran',
  fromName: '',
  fromRole: '',
  billTo: '',
  project: '',
  period: '',
  notes: '',
  bankName: '',
  bankAccount: '',
  accountHolder: '',
  taxPercent: 0,
  discount: 0,
  items: [],
})

export const formatIdr = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const formatDate = (value: string) => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export const getStatusClassName = (status: string) => {
  if (status === 'Lunas') return 'status-paid'
  if (status === 'Dibayar Sebagian') return 'status-partial'
  if (status === 'Jatuh Tempo') return 'status-due'
  return 'status-pending'
}

// Calculate quantity totals by item type
export const getItemTypeQuantities = (items: InvoiceState['items']) => {
  const quantities: Record<ItemType, number> = {
    'hourly': 0,
    'product': 0,
    'service': 0,
  }

  items.forEach((item) => {
    quantities[item.type] = (quantities[item.type] || 0) + item.quantity
  })

  return quantities
}
