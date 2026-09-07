const language = new URLSearchParams(window.location.search).get('lang') === 'pt' ? 'pt' : 'en';

const copy: Record<string, Record<string, string>> = {
  en: {
    'inquiry_actions.accept': 'Accept',
    'inquiry_actions.decline': 'Decline',
    'general.type_message': 'Type your message...',
    'common:actions.send': 'Send',
  },
  pt: {
    'inquiry_actions.accept': 'Aceitar',
    'inquiry_actions.decline': 'Recusar',
    'general.type_message': 'Escreva a sua mensagem...',
    'common:actions.send': 'Enviar',
  },
};

export function useTranslation() {
  return {
    i18n: { language },
    t(key: string) {
      return copy[language][key] || key;
    },
  };
}
