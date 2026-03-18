import { useState } from "react";
import { CurrentSessionContext } from "../contexts/CurrentSession";

export default function CurrentSessionProvider({ children }) {
    const [currentSessionContext, setCurrentSessionContext] = useState([])

    return (
        <CurrentSessionContext.Provider value={{ currentSessionContext, setCurrentSessionContext }}>
            {children}
        </CurrentSessionContext.Provider>
    )
}