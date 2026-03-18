import { AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

type ValidationNoticeProps = {
  errors: string[]
}

export function ValidationNotice({ errors }: ValidationNoticeProps) {
  const { t } = useLanguage()

  if (!errors.length) return null

  return (
    <div className="validation-box">
      <p className="validation-title">
        <AlertTriangle className="size-4" />
        {t('validation.title')}
      </p>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
