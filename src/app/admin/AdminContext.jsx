import { createContext } from 'react'


export const ViewContext = createContext({
    view: 'Portraits',
    setView: (value) => value
  })