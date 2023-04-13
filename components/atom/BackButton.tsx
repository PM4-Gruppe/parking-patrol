import next from 'next/types';
import React from 'react'
import { useRouter } from 'next/router'

export const BackButton: React.FC = (action) => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center">
            <button
                type="button"
                onClick={(e) => {
                    router.back()
                    }
                }
                className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg my-1"
            >
                Zurück
            </button>
        </div>
    );
}