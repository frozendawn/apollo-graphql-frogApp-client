import React, { useState } from 'react';

interface User {
  username: string;
  userImage?: string;
  id: string;
  token: string;
  role: string;
}
interface ContextInterface {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: (user: string, token: string, id: string, role: string, userImage?: string) => void
}

const AuthenticationContext = React.createContext<ContextInterface>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
  login: () => {}
})

export const AuthenticationContextProvider:React.FC<any> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const logUserOut = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const logUserIn = (user: string, token: string, id: string,role: string, userImage?: string) => {
    setUser({
      username: user,
      id: id,
      token: token,
      userImage: userImage,
      role: role
    })
    setIsLoggedIn(true)
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