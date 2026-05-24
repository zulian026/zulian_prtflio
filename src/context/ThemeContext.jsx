// src/context/ThemeContext.jsx
// Provides { theme, toggleTheme, isDark } across the entire app.
// Reads localStorage on mount, falls back to system preference, defaults to 'dark'.
// Writes to <html> className synchronously to avoid flicker.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Initialise from <html> class set by the anti-flicker script
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  // Keep <html> class + localStorage in sync whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Convenience hook
export function useTheme() {
  return useContext(ThemeContext);
}
