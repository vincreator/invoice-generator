export const STATUS_OPTIONS = [
  'Menunggu Pembayaran',
  'Dibayar Sebagian',
  'Lunas',
  'Jatuh Tempo',
] as const

export type InvoiceStatus = (typeof STATUS_OPTIONS)[number]

export type InvoiceItem = {
  id: number
  description: string
  quantity: number
  rate: number
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
