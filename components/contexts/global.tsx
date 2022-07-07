import { createContext, ReactNode, useContext, useState } from "react";

export type GlobalContent = {
  nickname: string;
  setNickname: (c: string) => void;

  playing: boolean;
  setPlaying: (c: boolean) => void;

  userId: number | null;
  setUserId: (c: number) => void;

  freshProgresses: boolean;
  setFreshProgresses: (c: boolean) => void;
};
export type MyGlobalProviderProps = {
  children: ReactNode;
};

const initialGlobalContent: GlobalContent = {
  nickname: "",
  setNickname: () => {},

  playing: false,
  setPlaying: () => {},

  userId: null,
  setUserId: () => {},

  freshProgresses: false,
  setFreshProgresses: () => {},
};
export const MyGlobalContext =
  createContext<GlobalContent>(initialGlobalContent);
export const useGlobalContext = () => useContext(MyGlobalContext);

export const GlobalContextProvider = ({ children }: MyGlobalProviderProps) => {
  const [nickname, setNickname] = useState("feri");
  const [playing, setPlaying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [freshProgresses, setFreshProgresses] = useState(false);
  return (
    <MyGlobalContext.Provider
      value={{
        nickname,
        setNickname,
        playing,
        setPlaying,
        userId,
        setUserId,
        freshProgresses,
        setFreshProgresses,
      }}
    >
      {children}
    </MyGlobalContext.Provider>
  );
};
