import React from "react";

export default function InputFieldComponent({ type, name, value, placeholder, action, required }) {
    return (
        <div className="flex flex-col gap-1">
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={action}
                required={required}
                className="border border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
            />
        </div>
    )
}