import React from 'react'

interface TextBoxProps {
    inputType: string
    inputDefaultValue: string
    informationText: string
    value: string
    onChange: (inputValue: string) => void
}

export const TextBox: React.FC<TextBoxProps> = ({ inputType, inputDefaultValue, informationText, value = '', onChange }) => {
    return (
        <div className="box mb-4 ">
            <input
                type={inputType}
                placeholder={inputDefaultValue}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value)
                }
                }
                className="w-full md:w-96 p-0 border-transparent rounded-lg bg-transparent text-white placeholder-neutral-400"
            />
            <hr className="w-full my-1 text-left ml-0" />
            <p className="text-white text-xs">
                {informationText}
            </p>
        </div>
    );
};