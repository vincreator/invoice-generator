export const STATUS_OPTIONS_ID = [
  'Menunggu Pembayaran',
  'Dibayar Sebagian',
  'Lunas',
  'Jatuh Tempo',
] as const

export const STATUS_OPTIONS_EN = [
  'Pending Payment',
  'Partially Paid',
  'Paid',
  'Overdue',
] as const

export const STATUS_OPTIONS = STATUS_OPTIONS_ID

export type InvoiceStatus = (typeof STATUS_OPTIONS)[number]

export const ITEM_TYPES = ['hourly', 'product', 'service'] as const
export type ItemType = (typeof ITEM_TYPES)[number]

export type InvoiceItem = {
  id: number
  description: string
  quantity: number
  rate: number
  type: ItemType
}

export type InvoiceState = {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  fromName: string
  fromRole: string
  billTo: string
  project: string
  period: string
  notes: string
  bankName: string
  bankAccount: string
  accountHolder: string
  taxPercent: number
  discount: number
  items: InvoiceItem[]
}
