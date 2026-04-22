import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0d47a1',
          secondary: '#00695c',
          info: '#1565c0',
          success: '#2e7d32',
          error: '#c62828',
          background: '#f3f6fb',
          surface: '#ffffff'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});
