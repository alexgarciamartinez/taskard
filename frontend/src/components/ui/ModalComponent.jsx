import React from "react";
import { useEffect, useState } from "react";

import ButtonComponent from "./ButtonComponent";

import { X } from "lucide-react"

export default function ModalComponent({ onClose, children }) {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 10)
        return () => clearTimeout(timeout)
    }, [])

    const handleClose = () => {
        setIsVisible(false)

        setTimeout(() => {
            onClose()
        }, 300)
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`relative bg-white rounded-lg shadow-lg w-full sm:w-auto max-w-full max-h-full overflow-y-auto p-6 transition-transform duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>

                <div className="absolute top-2 right-2">
                    <ButtonComponent
                        variant={"neutral"}
                        size={"sm"}
                        onClick={handleClose}
                    >
                        <X />
                    </ButtonComponent>
                </div>

                <div className="p-6 flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}