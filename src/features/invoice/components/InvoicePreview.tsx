import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { InvoiceState } from '../types'

type InvoicePreviewProps = {
  invoice: InvoiceState
  subtotal: number
  taxAmount: number
  total: number
  totalHours: number
  isOverdue: boolean
  formatDate: (value: string) => string
  formatIdr: (value: number) => string
  getStatusClassName: (status: string) => string
}

export function InvoicePreview({
  invoice,
  subtotal,
  taxAmount,
  total,
  totalHours,
  isOverdue,
  formatDate,
  formatIdr,
  getStatusClassName,
}: InvoicePreviewProps) {
  return (
    <section className="panel preview-wrap">
      <article id="invoice-preview" className="invoice">
        <div className="top-accent" />
        <header className="invoice-head">
          <div>
            <Badge variant="secondary" className="tag">
              Web Development Invoice
            </Badge>
            <h2>INVOICE</h2>
            <p>#{invoice.invoiceNumber || '-'}</p>
            <p>Tanggal Terbit: {formatDate(invoice.issueDate)}</p>
            <p>
              Jatuh Tempo: {formatDate(invoice.dueDate)}
              {isOverdue && <span className="due-pill">Lewat Tempo</span>}
            </p>
          </div>
          <div className="head-right">
            <h3>{invoice.fromName || '-'}</h3>
            <p>{invoice.fromRole || '-'}</p>
            <p>
              Status: <strong className={getStatusClassName(invoice.status)}>{invoice.status}</strong>
            </p>
          </div>
        </header>

        <section className="card-grid">
          <Card className="card soft border-0 py-0 ring-0">
            <CardContent className="space-y-1 px-0">
              <p className="card-title">Ditagihkan Kepada</p>
              <p className="big">{invoice.billTo || '-'}</p>
              <p>Proyek: {invoice.project || '-'}</p>
              <p>Periode: {invoice.period || '-'}</p>
            </CardContent>
          </Card>
          <Card className="card border-0 py-0 ring-0">
            <CardContent className="space-y-1 px-0">
              <p className="card-title">Ringkasan</p>
              <p>Total Jam: {totalHours} jam</p>
              <p>Subtotal: {formatIdr(subtotal)}</p>
              <p>Pajak: {formatIdr(taxAmount)}</p>
              <p>Diskon: {formatIdr(invoice.discount)}</p>
              <p className="big">Total: {formatIdr(total)}</p>
            </CardContent>
          </Card>
        </section>

        <Table className="mx-5 mb-0 mt-1 w-[calc(100%-40px)]">
          <TableHeader>
            <TableRow>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description || '-'}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatIdr(item.rate)}</TableCell>
                <TableCell>{formatIdr(item.quantity * item.rate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <section className="pay-grid">
          <div>
            <p className="card-title">Instruksi Pembayaran</p>
            <p>Bank: {invoice.bankName || '-'}</p>
            <p>No. Rekening: {invoice.bankAccount || '-'}</p>
            <p>Atas Nama: {invoice.accountHolder || '-'}</p>
          </div>
          <div className="total-box">
            <p>Subtotal: {formatIdr(subtotal)}</p>
            <p>Pajak: {formatIdr(taxAmount)}</p>
            <p>Diskon: {formatIdr(invoice.discount)}</p>
            <p className="grand">Total Pembayaran: {formatIdr(total)}</p>
          </div>
        </section>

        <div className="px-5">
          <Separator className="bg-[var(--line)]" />
        </div>

        <footer>
          <p>{invoice.notes || '-'}</p>
          <p>Dokumen ini dibuat secara digital dan sah tanpa tanda tangan basah.</p>
        </footer>
      </article>
    </section>
  )
}
