import { LuMinimize2 } from 'react-icons/lu'
import '../styles/Header.css'

export function Header({ children }) {
    return (
        <>
            <div className='header'>
                
                    {children}
            </div>
        </>
    )
}