import { createContext, ReactNode, useContext, useState } from "react";

export type GlobalContent = {
  nickname: string;
  setNickname: (c: string) => void;
  playing: boolean;
  setPlaying: (c: boolean) => void;
};
export type MyGlobalProviderProps = {
  children: ReactNode;
};

const initialGlobalContent: GlobalContent = {
  nickname: "",
  setNickname: () => {},
  playing: false,
  setPlaying: () => {},
};
export const MyGlobalContext =
  createContext<GlobalContent>(initialGlobalContent);
export const useGlobalContext = () => useContext(MyGlobalContext);

export const GlobalContextProvider = ({ children }: MyGlobalProviderProps) => {
  const [nickname, setNickname] = useState("feri");
  const [playing, setPlaying] = useState(false);
  return (
    <MyGlobalContext.Provider
      value={{ nickname, setNickname, playing, setPlaying }}
    >
      {children}
    </MyGlobalContext.Provider>
  );
};
