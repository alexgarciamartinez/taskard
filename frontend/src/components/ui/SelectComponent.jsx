import React from "react";
import { forwardRef } from "react";

import clsx from "clsx";

import { ChevronDown } from "lucide-react";

const SelectComponent = forwardRef(({
    id,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option...',
    valueKey = 'value',
    labelKey = 'label',
    className = '',
    disabled = false,
    error = '',
    required = false,
    size = 'md',
    variant = 'default',
    label,
    helperText,
    ...props
}, ref) => {

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
    }


    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-ribbon-500 focus:ring-blue-ribbon-500',
        filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-ribbon-500 focus:ring-blue-ribbon-500',
        outlined: 'border-2 border-gray-300 focus:border-blue-ribbon-500 focus:ring-0'
    }


    const selectClasses = clsx(

        'w-full rounded-md border border-gray-300 transition-colors duration-200 appearance-none',
        'focus:outline-none focus:ring-2 focus:ring-opacity-50',
        'cursor-pointer',

        sizeClasses[size],

        !error && variantClasses[variant],

        {
            'border-coral-red-500 focus:border-coral-red-500 focus:ring-coral-red-500': error,
            'bg-gray-100 cursor-not-allowed opacity-60': disabled,
            'text-gray-400': value === "",
            'text-black': value !== "",
        },
        className
    )

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id || name}
                    className={clsx(
                        'block font-medium text-gray-700 mb-1',
                        size === 'sm' && 'text-sm',
                        size === 'md' && 'text-sm',
                        size === 'lg' && 'text-base'
                    )}
                >
                    {label}
                    {required && <span className="text-coral-red-500 ml-1">*</span>}
                </label>
            )}

            <div className={clsx("relative", className)}>
                <select
                    ref={ref}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={selectClasses}
                    aria-describedby={clsx(
                        error && errorId,
                        helperText && `${id || name}-helper`
                    )}
                    {...props}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option[valueKey]} value={option[valueKey]}>
                            {option[labelKey]}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronDown
                        className={clsx(
                            'text-gray-400',
                            size === 'sm' && 'h-4 w-4',
                            size === 'md' && 'h-5 w-5',
                            size === 'lg' && 'h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    )
})

export default SelectComponent