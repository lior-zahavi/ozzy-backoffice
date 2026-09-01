import { useTranslation } from 'react-i18next';

function AccessDeniedPage() {
    const { t } = useTranslation();

    return (
      <main>
        <h1>{t('backoffice.common.accessDeniedTitle')}</h1>
        <p>{t('backoffice.common.accessDeniedText')}</p>
      </main>
    )
  }
  
  export default AccessDeniedPage;
