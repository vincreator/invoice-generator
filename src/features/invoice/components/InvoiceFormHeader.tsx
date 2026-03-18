import { useLanguage } from '@/lib/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

export function InvoiceFormHeader() {
  const { t } = useLanguage()

  return (
    <div className="panel-header">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Invoice Generator</p>
          <h1>{t('app.title')}</h1>
          <p className="sub">{t('app.subtitle')}</p>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
