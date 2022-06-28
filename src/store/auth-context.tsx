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

  const storedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null')
  const [user, setUser] = useState<User | null>(storedUser)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(user))

  const logUserOut = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('user')
  }

  const logUserIn = (user: string, token: string, id: string, role: string, userImage?: string) => {
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