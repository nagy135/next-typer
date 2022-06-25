
import { createContext, ReactNode, useContext, useState } from "react"

export type GlobalContent = {
  nickname: string
  setNickname: (c: string) => void
}
export type MyGlobalProviderProps = {
  children: ReactNode
}

const initialGlobalContent: GlobalContent = {
  nickname: '',
  setNickname: () => { },
}
export const MyGlobalContext = createContext<GlobalContent>(initialGlobalContent)
export const useGlobalContext = () => useContext(MyGlobalContext)

export const GlobalContextProvider = ({ children }: MyGlobalProviderProps) => {
  const [nickname, setNickname] = useState<string>("feri");
  return <MyGlobalContext.Provider value={{ nickname, setNickname }}>{children}</MyGlobalContext.Provider>;
}
