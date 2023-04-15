import React, { MouseEventHandler } from 'react'


interface ButtonProps {
    label: string
    onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-col items-center justify-center w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg my-1"
        >
            {label}
        </button>
    );
}