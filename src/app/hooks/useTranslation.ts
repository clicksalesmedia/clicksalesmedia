import { useLanguage } from '../providers/LanguageProvider';
import ar from '../i18n/locales/ar.json';
import en from '../i18n/locales/en.json';

type TranslationType = typeof ar;
type TranslationKey = keyof TranslationType;

const translations = {
  ar,
  en,
} as const;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<TranslationType>;

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationPath): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Invalid translation value for key: ${key}`);
      return key;
    }
    
    return value;
  };

  return { t };
} 