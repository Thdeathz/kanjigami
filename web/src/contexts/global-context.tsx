'use client'

import React, { createContext, useMemo } from 'react'
import { useToggle } from 'usehooks-ts'

export interface IGlobalContext {
  isOpenSidebar: boolean
  toggle: () => void
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<IGlobalContext>({
  isOpenSidebar: false,
  toggle: () => {},
  setValue: () => {}
})

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, toggle, setValue] = useToggle()

  const contextValue = useMemo(
    () => ({
      isOpenSidebar: value,
      toggle,
      setValue
    }),
    [value, toggle]
  )

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}
