import { createContext } from 'react'


export const ViewContext = createContext({
    view: 'portraits',
    setView: (value) => value
  })