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
import { useLanguage } from '@/lib/LanguageContext'
import { getItemTypeQuantities } from '../utils'

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
  const { t } = useLanguage()
  const itemTypeQuantities = getItemTypeQuantities(invoice.items)

  return (
    <section className="panel preview-wrap">
      <article id="invoice-preview" className="invoice">
        <div className="top-accent" />
        <header className="invoice-head">
          <div>
            <Badge variant="secondary" className="tag">
              {t('invoice.subtitle')}
            </Badge>
            <h2>{t('invoice.title')}</h2>
            <p>#{invoice.invoiceNumber || '-'}</p>
            <p>{t('invoice.issuedOn')} {formatDate(invoice.issueDate)}</p>
            <p>
              {t('invoice.dueOn')} {formatDate(invoice.dueDate)}
              {isOverdue && <span className="due-pill">{t('invoice.overdue')}</span>}
            </p>
          </div>
          <div className="head-right">
            <h3>{invoice.fromName || '-'}</h3>
            <p>{invoice.fromRole || '-'}</p>
            <p>
              {t('invoice.status')}: <strong className={getStatusClassName(invoice.status)}>{invoice.status}</strong>
            </p>
          </div>
        </header>

        <section className="card-grid">
          <Card className="card soft border-0 py-0 ring-0">
            <CardContent className="space-y-1 px-0">
              <p className="card-title">{t('summary.billTo')}</p>
              <p className="big">{invoice.billTo || '-'}</p>
              <p>{t('summary.project')}: {invoice.project || '-'}</p>
              <p>{t('summary.period')}: {invoice.period || '-'}</p>
            </CardContent>
          </Card>
          <Card className="card border-0 py-0 ring-0">
            <CardContent className="space-y-1 px-0">
              <p className="card-title">{t('summary.overview')}</p>
              {itemTypeQuantities['hourly'] > 0 && (
                <p>{t('summary.totalHours')}: {itemTypeQuantities['hourly']}</p>
              )}
              {itemTypeQuantities['product'] > 0 && (
                <p>{t('summary.totalProducts')}: {itemTypeQuantities['product']}</p>
              )}
              {itemTypeQuantities['service'] > 0 && (
                <p>{t('summary.totalServices')}: {itemTypeQuantities['service']}</p>
              )}
              {(itemTypeQuantities['hourly'] === 0 && itemTypeQuantities['product'] === 0 && itemTypeQuantities['service'] === 0) && (
                <p>{t('summary.totalItems')}: {totalHours}</p>
              )}
              <p>{t('summary.subtotal')}: {formatIdr(subtotal)}</p>
              <p>{t('summary.tax')}: {formatIdr(taxAmount)}</p>
              <p>{t('summary.discount')}: {formatIdr(invoice.discount)}</p>
              <p className="big">{t('summary.total')}: {formatIdr(total)}</p>
            </CardContent>
          </Card>
        </section>

        <Table className="mx-5 mb-0 mt-1 w-[calc(100%-40px)]">
          <TableHeader>
            <TableRow>
              <TableHead>{t('items.description')}</TableHead>
              <TableHead>{t('items.type')}</TableHead>
              <TableHead>{t('items.quantity')}</TableHead>
              <TableHead>{t('items.rate')}</TableHead>
              <TableHead>{t('items.amount')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description || '-'}</TableCell>
                <TableCell className="text-sm">{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatIdr(item.rate)}</TableCell>
                <TableCell>{formatIdr(item.quantity * item.rate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <section className="pay-grid">
          <div>
            <p className="card-title">{t('payment_info.title')}</p>
            <p>{t('payment_info.bank')}: {invoice.bankName || '-'}</p>
            <p>{t('payment_info.accountNumber')}: {invoice.bankAccount || '-'}</p>
            <p>{t('payment_info.accountHolder')}: {invoice.accountHolder || '-'}</p>
          </div>
          <div className="total-box">
            <p>{t('summary.subtotal')}: {formatIdr(subtotal)}</p>
            <p>{t('summary.tax')}: {formatIdr(taxAmount)}</p>
            <p>{t('summary.discount')}: {formatIdr(invoice.discount)}</p>
            <p className="grand">{t('payment_info.totalPayment')}: {formatIdr(total)}</p>
          </div>
        </section>

        <div className="px-5">
          <Separator className="bg-[var(--line)]" />
        </div>

        <footer>
          <p>{invoice.notes || '-'}</p>
          <p>{t('footer')}</p>
        </footer>
      </article>
    </section>
  )
}
