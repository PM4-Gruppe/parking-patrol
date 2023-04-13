import React from 'react'

interface TextBoxProps {
    inputType: string
    inputDefaultValue:string
    informationText: string
    value: string
    onChange: (inputValue: string) => void
}

export const TextBox: React.FC<TextBoxProps> = ({ inputType, inputDefaultValue, informationText, value = '', onChange }) => {
    return (
        <div className="box mb-4">
            <input
                type={inputType}
                placeholder={inputDefaultValue}
                value={
                    value
                        ? `${value}`
                        : ''
                }
                onChange={(event) => {
                    console.log(event.target.value)
                    onChange(event.target.value)
                }
                }
                className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
            />
            <hr className="width:50%;text-align:left;margin-left:0 my-1" />
            <p>
                {informationText}
            </p>
        </div>
    );
};