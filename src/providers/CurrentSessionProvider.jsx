import { useEffect, useState } from "react";
import { CurrentSessionContext } from "../contexts/CurrentSession";
import { getCurrentSessionApi } from "../api/apiExercises";

export default function CurrentSessionProvider({ children }) {
    const [currentSessionLoading, setCurrentSessionLoading] = useState(true)
    const [currentSessionContext, setCurrentSessionContext] = useState(null)

    const fetchSession = async () => {
        let isMounted = true
        try {
            const data = await getCurrentSessionApi()
            if (isMounted) {
                setCurrentSessionContext(data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setCurrentSessionLoading(false)
        }

        return () => {
            isMounted = false
        }
    }

   useEffect(() => {
    fetchSession()
   }, [])

    return (
        <CurrentSessionContext.Provider value={{ currentSessionContext, setCurrentSessionContext, currentSessionLoading, fetchSession }}>
            {children}
        </CurrentSessionContext.Provider>
    )
}