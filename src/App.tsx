import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { BasicInfoSection } from '@/features/invoice/components/BasicInfoSection'
import { ClientSection } from '@/features/invoice/components/ClientSection'
import { InvoiceFormHeader } from '@/features/invoice/components/InvoiceFormHeader'
import { InvoicePreview } from '@/features/invoice/components/InvoicePreview'
import { InvoiceToolbar } from '@/features/invoice/components/InvoiceToolbar'
import { ItemsSection } from '@/features/invoice/components/ItemsSection'
import { NotesSection } from '@/features/invoice/components/NotesSection'
import { PaymentSection } from '@/features/invoice/components/PaymentSection'
import { ValidationNotice } from '@/features/invoice/components/ValidationNotice'
import { useLanguage } from '@/lib/LanguageContext'
import type { InvoiceItem, InvoiceState } from '@/features/invoice/types'
import {
  STORAGE_KEY,
  createDefaultState,
  formatDate,
  formatIdr,
  getStatusClassName,
  sanitizeNumber,
} from '@/features/invoice/utils'

function App() {
  const { t } = useLanguage()
  
  const [invoice, setInvoice] = useState<InvoiceState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return createDefaultState()

    try {
      return JSON.parse(saved) as InvoiceState
    } catch {
      return createDefaultState()
    }
  })
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice))
  }, [invoice])

  const subtotal = useMemo(
    () => invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
    [invoice.items],
  )
  const taxAmount = useMemo(() => (subtotal * invoice.taxPercent) / 100, [subtotal, invoice.taxPercent])
  const total = useMemo(
    () => Math.max(0, subtotal + taxAmount - invoice.discount),
    [subtotal, taxAmount, invoice.discount],
  )
  const totalHours = useMemo(() => invoice.items.reduce((sum, item) => sum + item.quantity, 0), [invoice.items])
  const isOverdue = useMemo(() => {
    if (!invoice.dueDate) return false
    return new Date(invoice.dueDate).getTime() < new Date().setHours(0, 0, 0, 0)
  }, [invoice.dueDate])

  const validationErrors = useMemo(() => {
    const errors: string[] = []
    if (!invoice.invoiceNumber.trim()) errors.push(t('validation.invoiceNumberRequired'))
    if (!invoice.billTo.trim()) errors.push(t('validation.billToRequired'))
    if (invoice.items.some((item) => !item.description.trim())) {
      errors.push(t('validation.itemsValid'))
    }
    if (invoice.items.some((item) => item.quantity <= 0)) {
      errors.push(t('validation.itemsValid'))
    }
    if (invoice.discount > subtotal + taxAmount) {
      errors.push(t('validation.itemsValid'))
    }
    return errors
  }, [invoice, subtotal, taxAmount, t])

  const updateField = <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => {
    setInvoice((prev) => ({ ...prev, [key]: value }))
  }

  const updateItem = (id: number, key: keyof InvoiceItem, value: string | number) => {
    const normalizedValue =
      key === 'quantity' || key === 'rate' ? sanitizeNumber(value, key === 'quantity' ? 1 : 0) : value

    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [key]: normalizedValue } : item)),
    }))
  }

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          description: '',
          quantity: 1,
          rate: 0,
          type: 'hourly',
        },
      ],
    }))
  }

  const duplicateItem = (id: number) => {
    setInvoice((prev) => {
      const source = prev.items.find((item) => item.id === id)
      if (!source) return prev

      return {
        ...prev,
        items: [...prev.items, { ...source, id: Date.now() }],
      }
    })
  }

  const removeItem = (id: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const resetToDefault = () => {
    const initial = createDefaultState()
    setInvoice(initial)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  }

  const handleExportPdf = async () => {
    const target = document.getElementById('invoice-preview')
    if (!target || validationErrors.length > 0) return

    setIsExporting(true)
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      await html2pdf()
        .set({
          margin: 8,
          filename: `${invoice.invoiceNumber || 'invoice'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(target)
        .save()
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="layout">
      <section className="panel form-panel">
        <InvoiceFormHeader />
        <InvoiceToolbar onPrint={handlePrint} />
        <ValidationNotice errors={validationErrors} />

        <BasicInfoSection invoice={invoice} updateField={updateField} />
        <ClientSection invoice={invoice} updateField={updateField} />
        <ItemsSection
          items={invoice.items}
          onAdd={addItem}
          onUpdate={updateItem}
          onDuplicate={duplicateItem}
          onRemove={removeItem}
          formatIdr={formatIdr}
        />
        <PaymentSection invoice={invoice} updateField={updateField} sanitizeNumber={sanitizeNumber} />
        <NotesSection notes={invoice.notes} onChange={(value) => updateField('notes', value)} />

        <div className="actions">
          <Button type="button" variant="secondary" className="h-10 rounded-xl" onClick={resetToDefault}>
            Reset Draft
          </Button>
          <Button
            type="button"
            className="h-10 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white"
            onClick={handleExportPdf}
            disabled={isExporting || validationErrors.length > 0}
          >
            {isExporting ? `${t('buttons.export')}...` : t('buttons.export')}
          </Button>
        </div>
      </section>

      <InvoicePreview
        invoice={invoice}
        subtotal={subtotal}
        taxAmount={taxAmount}
        total={total}
        totalHours={totalHours}
        isOverdue={isOverdue}
        formatDate={formatDate}
        formatIdr={formatIdr}
        getStatusClassName={getStatusClassName}
      />
    </main>
  )
}

export default App
