import { useState } from "react";
import { SessionHistoryContext } from "../contexts/SessionHistory";

export default function SessionHistoryProvider({ children }) {
    const [sessionHistoryContext, setSessionHistoryContext] = useState([])
    return (
        <SessionHistoryContext.Provider value={{ sessionHistoryContext, setSessionHistoryContext }}>
            { children }
        </SessionHistoryContext.Provider>
    )
}