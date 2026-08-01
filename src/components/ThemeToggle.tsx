type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}>
    {theme === 'dark' ? '☼' : '☾'}
  </button>
}
