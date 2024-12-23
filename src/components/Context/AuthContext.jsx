import {createContext, useContext, useState ,useEffect} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [toggle,setIsToggle] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    const logIn = () => setIsLoggedIn(true)
    const logOut = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("token") 
        if (token) {
            setIsLoggedIn(true);
        }else{
            localStorage.removeItem("name")
            localStorage.removeItem("userId")
            localStorage.removeItem("theme")
        }
    }, [logOut]);

    return(
        <AuthContext.Provider value={{toggle,isLoggedIn,logIn,logOut,setIsToggle}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => useContext(AuthContext)