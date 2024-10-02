import { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import * as Switch from '@radix-ui/react-switch'

function getMode() {
  return typeof window == 'undefined'
    ? ''
    : localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light'
}

function Icon({ mode }: { mode: string }) {
  if (mode === 'dark') return <FaMoon />
  if (mode === 'light') return <FaSun />
  return null
}

export default function DarkModeToggle() {
  const [mode, setMode] = useState(getMode())

  useEffect(() => {
    const initialMode = getMode()
    setMode(initialMode)
  }, [])

  useEffect(() => {
    localStorage.theme = mode
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return (
    <div className="flex items-center">
      <Switch.Root
        checked={mode === 'dark'}
        onCheckedChange={(checked) => setMode(checked ? 'dark' : 'light')}
        className={`${mode === 'dark' ? 'bg-blue-400' : mode === 'light' ? 'bg-orange-400' : 'bg-gray-400'}
          relative inline-flex flex-shrink-0 h-[28px] w-[56px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use Dark Mode</span>
        <Switch.Thumb asChild>
          <div
            aria-hidden="true"
            className={`bg-background ${mode === 'dark' ? 'translate-x-[28px]' : mode === 'light' ? 'translate-x-0' : 'translate-x-[14px]'}
            pointer-events-none h-[24px] w-6 rounded-full transform ring-0 transition ease-in-out duration-200 overflow-hidden flex items-center justify-center`}
          >
            <span
              className={`${mode === 'dark' ? 'text-blue-400' : mode === 'light' ? 'text-orange-400' : 'text-gray-400'} transition ease-in-out duration-200`}
            >
              <Icon mode={mode} />
            </span>
          </div>
        </Switch.Thumb>
      </Switch.Root>
    </div>
  )
}
