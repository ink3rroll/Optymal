import { useState } from "react";
import '../styles/Confirm.css'

export default function useConfirm() {
    const [confirmState, setConfirmState] = useState(null)

    const confirm = (message) => {
        return new Promise((resolve) => {
            setConfirmState({
                message,
                resolve
            })
        })
    }

    const handleConfirm = () => {
        confirmState.resolve(true)
        setConfirmState(null)
    }

    const handleCancel = () => {
        confirmState.resolve(false)
        setConfirmState(null)
    }

    const ConfirmDialog = confirmState && (
        <div className='confirm-modal'>
                        <div className='card'>
                            <p>{confirmState.message}</p>
                            <div>
                                <button onClick={() => handleConfirm()}>Yes</button>
                                <button onClick={() => handleCancel()}>No</button>
                            </div>
                        </div>
                    </div>
    )

    return { confirm, ConfirmDialog }
}