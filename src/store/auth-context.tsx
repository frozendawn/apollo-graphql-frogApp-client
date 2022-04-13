import React, { useState } from 'react';

interface User {
  username: string;
  id: string;
  token: string;
}
interface ContextInterface {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: (user: string, token: string, id: string) => void
}

const AuthenticationContext = React.createContext<ContextInterface>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
  login: () => {}
})

interface ProviderProps {}

export const AuthenticationContextProvider:React.FC<ProviderProps> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const logUserOut = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const logUserIn = (user: string, token: string, id: string) => {
    setIsLoggedIn(true)
    setUser({
      username: user,
      id: id,
      token: token
    })
  }

  const defaultContext = {
    isLoggedIn: isLoggedIn,
    user: user,
    logout: logUserOut,
    login: logUserIn
  }

  return (
    <AuthenticationContext.Provider value={defaultContext}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext;