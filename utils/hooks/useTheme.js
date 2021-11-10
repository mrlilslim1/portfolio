import {useEffect, useState} from 'react'

function useTheme() {
  const [theme, setTheme] = useState(true)

  const saveLocal = v => {
    localStorage.setItem('theme', v)
    return setTheme(v)
  }
  useEffect(() => {
    const saved = localStorage.getItem('theme') // Check if existed
    const value = !!saved ? JSON.parse(saved) : true
    return setTheme(value)
  }, [])

  useEffect(
    () =>
      !theme
        ? (document.documentElement.setAttribute('data-theme', 'fantasy'),
          localStorage.setItem('theme', false))
        : (document.documentElement.setAttribute('data-theme', 'halloween'),
          localStorage.setItem('theme', true)),
    [theme]
  )

  return {theme, saveLocal}
}

export {useTheme}
