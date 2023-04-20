import React, { useState } from 'react'

interface WidgetProps {
    title: string;
    content: string;
}

export const Widget: React.FC<WidgetProps> = ({ title, content }) => {
    let fontStyle: string = 'text-white font-light'
    if (content.length < 5) {
        fontStyle += ' text-5xl text-center p-2'
    } else {
        fontStyle += ' text-2xl p-4'
    }

    return (
        <div className="bg-neutral-500/50 rounded-2xl">
            <div className="bg-green-700 p-3 text-xl text-white rounded-t-2xl">
                {title}
            </div>
            <p className={fontStyle}>
                {content}
            </p>
        </div>
    );
};