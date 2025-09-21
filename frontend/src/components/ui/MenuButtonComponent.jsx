import React from "react";
import { useState, useRef } from "react";

import clsx from "clsx";

export default function MenuButtonComponent({
    icon,
    actions = [],
    right = true,
    size = "md"
}) {

    const [open, setOpen] = useState(false)

    const menuRef = useRef()

    const handleChangeOpen = () => {
        setOpen(!open)
    }

    const ButtonIconComponent = icon

    const sizeClasses = {
        sm: "p-1 w-6 h-6",
        md: "p-2 w-8 h-8",
        lg: "p-3 w-10 h-10",
    }

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={handleChangeOpen}
                className={clsx(
                    "text-gray-500 hover:text-black rounded hover:bg-neutral-200 transition flex items-center justify-center",
                    sizeClasses[size] || sizeClasses.md
                )}
            >
                <ButtonIconComponent />
            </button>

            {open && (
                <div className={clsx(
                    "absolute mt-2 min-w-[8rem] w-fit bg-white border border-gray-200 shadow-md rounded z-20",
                    {
                        "right-0": right
                    }
                )}>
                    {actions.map(({ label, icon: Icon, onClick }, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onClick?.()
                                handleChangeOpen()
                            }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm text-gray-700"
                        >
                            {Icon && (<Icon />)}
                            {label && (label)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}