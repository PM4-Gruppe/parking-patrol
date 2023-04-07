import React from 'react'

export const Submit: React.FC = () => {
    //TODO add functionality to submit button -> send data to backend
    const handleImageSelect = () => {
        console.log('Submit button clicked')
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <button
                type="submit"
                onClick={handleImageSelect}
                className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
            >
                Submit
            </button>
        </div>
    );
};