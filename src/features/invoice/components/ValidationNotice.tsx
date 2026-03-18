import { AlertTriangle } from 'lucide-react'

type ValidationNoticeProps = {
  errors: string[]
}

export function ValidationNotice({ errors }: ValidationNoticeProps) {
  if (!errors.length) return null

  return (
    <div className="validation-box">
      <p className="validation-title">
        <AlertTriangle className="size-4" />
        Perlu Diperbaiki Dulu
      </p>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
