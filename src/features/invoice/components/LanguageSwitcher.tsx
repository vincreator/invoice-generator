import { useLanguage } from '@/lib/LanguageContext'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => setLanguage('en')}
        className="h-9 px-3 text-sm"
      >
        English
      </Button>
      <Button
        type="button"
        variant={language === 'id' ? 'default' : 'outline'}
        onClick={() => setLanguage('id')}
        className="h-9 px-3 text-sm"
      >
        Bahasa Indonesia
      </Button>
    </div>
  )
}
