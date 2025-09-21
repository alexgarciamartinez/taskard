import { useState } from "react";
import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const PrioritySelectComponent = forwardRef(({
    value,
    onChange,
    options = [],
    size = "md",
    name = "priority",
    className = "",
}, ref) => {
    const [open, setOpen] = useState(false)

    const selected = options.find((opt) => opt.value === value)

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    }

    const iconSizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    }

    return (
        <div className={clsx("relative w-full max-w-[150px]", className)}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={clsx(
                    "w-full flex items-center justify-between rounded-md border border-gray-300 bg-white",
                    "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                    "transition-colors duration-200 cursor-pointer",
                    sizeClasses[size]
                )}
            >
                {selected ? (
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: selected.color }}
                        />
                        <span>{selected.label}</span>
                    </div>
                ) : (
                    <span className="text-gray-400">Prioridad</span>
                )}
                <ChevronDown className={clsx("text-gray-500", iconSizeClasses[size])} />
            </button>

            {open && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 overflow-hidden">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange({ target: { name, value: option.value } })
                                setOpen(false)
                            }}
                            className={clsx(
                                "w-full flex items-center gap-2 text-left hover:bg-gray-100",
                                sizeClasses[size],
                                option.value === value && "bg-gray-100 font-semibold"
                            )}
                        >
                            <span
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: option.color }}
                            />
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
})

export default PrioritySelectComponent
