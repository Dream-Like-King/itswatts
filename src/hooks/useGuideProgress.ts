import { useEffect, useState } from 'react'

/** Saves the learner's last open lesson locally on the device. */
export function useGuideProgress(storageKey: string, lessonCount: number) {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === 'undefined') return 0
    const savedValue = Number(window.localStorage.getItem(storageKey))
    return Number.isInteger(savedValue) && savedValue >= 0 && savedValue < lessonCount ? savedValue : 0
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(activeIndex))
    window.localStorage.setItem(`${storageKey}-updated`, String(Date.now()))
  }, [activeIndex, storageKey])

  return [activeIndex, setActiveIndex] as const
}
