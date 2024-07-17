import { storage } from './storage.js';

export const THEME_LIGHT = 'light';
export const THEME_BS_DATA = 'data-bs-theme';

export const theme = (() => {
  const theme = storage('theme');

  const applyLightMode = () => {
    document.documentElement.setAttribute(THEME_BS_DATA, THEME_LIGHT);
    theme.set('active', THEME_LIGHT);
  };

  const check = () => {
    if (!theme.has('active')) {
      theme.set('active', THEME_LIGHT);
    }

    applyLightMode();
  };

  const showButtonChangeTheme = () => {
    document.getElementById('button-theme').style.display = 'block';
  };

  return {
    check,
    showButtonChangeTheme,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  theme.check();

  const openInvitationButton = document.querySelector('.btn-invitation');
  if (openInvitationButton) {
    openInvitationButton.addEventListener('click', () => {
      theme.check();
    });
  }
});
