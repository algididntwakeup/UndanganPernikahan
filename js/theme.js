import { storage } from './storage.js';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const THEME_BS_DATA = 'data-bs-theme';

export const theme = (() => {
  const theme = storage('theme');

  const onLight = () => {
    const elements = document.querySelectorAll('.text-light, .btn-theme-light, .bg-dark, .bg-black, .bg-theme-dark, .color-theme-black, .btn-outline-light');
    elements.forEach((element) => {
      if (element.classList.contains('text-light')) {
        element.classList.remove('text-light');
        element.classList.add('text-dark');
      }

      if (element.classList.contains('btn-theme-light')) {
        element.classList.remove('btn-theme-light');
        element.classList.add('btn-theme-dark');
      }

      if (element.classList.contains('bg-dark')) {
        element.classList.remove('bg-dark');
        element.classList.add('bg-light');
      }

      if (element.classList.contains('bg-black')) {
        element.classList.remove('bg-black');
        element.classList.add('bg-white');
      }

      if (element.classList.contains('bg-theme-dark')) {
        element.classList.remove('bg-theme-dark');
        element.classList.add('bg-theme-light');
      }

      if (element.classList.contains('color-theme-black')) {
        element.classList.remove('color-theme-black');
        element.classList.add('color-theme-white');
      }

      if (element.classList.contains('btn-outline-light')) {
        element.classList.remove('btn-outline-light');
        element.classList.add('btn-outline-dark');
      }
    });
  };

  const onDark = () => {
    const elements = document.querySelectorAll('.text-dark, .btn-theme-dark, .bg-light, .bg-white, .bg-theme-light, .color-theme-white, .btn-outline-dark');
    elements.forEach((element) => {
      if (element.classList.contains('text-dark')) {
        element.classList.remove('text-dark');
        element.classList.add('text-light');
      }

      if (element.classList.contains('btn-theme-dark')) {
        element.classList.remove('btn-theme-dark');
        element.classList.add('btn-theme-light');
      }

      if (element.classList.contains('bg-light')) {
        element.classList.remove('bg-light');
        element.classList.add('bg-dark');
      }

      if (element.classList.contains('bg-white')) {
        element.classList.remove('bg-white');
        element.classList.add('bg-black');
      }

      if (element.classList.contains('bg-theme-light')) {
        element.classList.remove('bg-theme-light');
        element.classList.add('bg-theme-dark');
      }

      if (element.classList.contains('color-theme-white')) {
        element.classList.remove('color-theme-white');
        element.classList.add('color-theme-black');
      }

      if (element.classList.contains('btn-outline-dark')) {
        element.classList.remove('btn-outline-dark');
        element.classList.add('btn-outline-light');
      }
    });
  };

  const isLightMode = (onLight = null, onDark = null) => {
    const status = theme.get('active') === THEME_LIGHT;

    if (onLight && onDark) {
      return status ? onLight : onDark;
    }

    return status;
  };

  const change = () => {
    if (isLightMode()) {
      onDark();
      document.documentElement.setAttribute(THEME_BS_DATA, THEME_DARK);
      theme.set('active', THEME_DARK);
    } else {
      onLight();
      document.documentElement.setAttribute(THEME_BS_DATA, THEME_LIGHT);
      theme.set('active', THEME_LIGHT);
    }
  };

  const check = () => {
    if (!theme.has('active')) {
      theme.set('active', THEME_DARK);

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        theme.set('active', THEME_LIGHT);
      }
    }

    if (isLightMode()) {
      onLight();
      document.documentElement.setAttribute(THEME_BS_DATA, THEME_LIGHT);
      theme.set('active', THEME_LIGHT);
      const toggle = document.getElementById('darkMode');
      if (toggle) {
        toggle.checked = false;
      }
    } else {
      onDark();
      document.documentElement.setAttribute(THEME_BS_DATA, THEME_DARK);
      const toggle = document.getElementById('darkMode');
      if (toggle) {
        toggle.checked = true;
      }
    }
  };

  const showButtonChangeTheme = () => {
    document.getElementById('button-theme').style.display = 'block';
  };

  return {
    change,
    check,
    isLightMode,
    showButtonChangeTheme,
  };
})();
