import React from 'react'

interface WidgetProps {
    title: string;
    children: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({ title, children }) => {
    return (
        <div className="bg-neutral-500/50 rounded-2xl">
            <div className="bg-green-700 p-3 text-xl text-white rounded-t-2xl">
                {title}
            </div>
            <div className="p-3">
                {children}
            </div>
        </div>
    );
};
