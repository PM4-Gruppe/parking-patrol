import React from 'react'
import { useRouter } from 'next/router'

interface BackButtonProps {
    label: string
}

export const BackButton: React.FC<BackButtonProps> = ({ label }) => {
    const router = useRouter()
    const handleBackButton = () => {
        router.back()
    }

    return (
        <button
            type="button"
            onClick={handleBackButton}
            className="p-2 bg-green-700 hover:bg-green-800 text-white rounded-lg my-2"
        >
            {label}
        </button>
    );
}