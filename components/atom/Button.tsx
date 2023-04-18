import React from 'react'

interface ButtonProps {
    label: string
    onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-col items-center justify-center w-full p-2 bg-green-700 hover:bg-green-800 text-white rounded-lg my-2"
        >
            {label}
        </button>
    );
}