import React from 'react'
import { useSelector} from 'react-redux'
export default function themeProvider({children}) {
    const {theme} = useSelector((state)=> state.theme)
  return (
    <div className={theme}>
        <div className='bg-white min-h-screen text-gray-700 dark:bg-[rgb(15,25,39)] dark:text-white'>
        {children}
        </div>
        
    </div>
  )
}
