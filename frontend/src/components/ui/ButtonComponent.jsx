import React from "react";
import { forwardRef } from "react";

import clsx from "clsx";

const ButtonComponent = forwardRef(({
    children,
    size = 'md',
    variant = 'primary',
    ghost = false,
    fullWidth = false,
    className = '',
    type = 'button',
    ...props
}, ref) => {

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer'

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
    }

    const variantClasses = {
        primary: ghost
            ? 'bg-white text-blue-ribbon-600 border border-blue-ribbon-600 hover:bg-blue-ribbon-50 active:bg-blue-ribbon-100'
            : 'bg-blue-ribbon-600 text-white hover:bg-blue-ribbon-700 active:bg-blue-ribbon-800',
        secondary: ghost
            ? 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
        warning: ghost
            ? 'bg-white text-sunglow-600 border border-sunglow-600 hover:bg-sunglow-50 active:bg-sunglow-100'
            : 'bg-sunglow-600 text-white hover:bg-sunglow-700 active:bg-sunglow-800',
        danger: ghost
            ? 'bg-white text-coral-red-600 border border-coral-red-600 hover:bg-coral-red-50 active:bg-coral-red-100'
            : 'bg-coral-red-600 text-white hover:bg-coral-red-700 active:bg-coral-red-800',
        outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200'
    }

    return (
        <button
            ref={ref}
            type={type}
            className={clsx(
                baseClasses,
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
})

export default ButtonComponent