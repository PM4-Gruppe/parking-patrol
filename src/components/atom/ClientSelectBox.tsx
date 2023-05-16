import React, { useState } from 'react'
import { useEffect } from 'react'
import { Select, Input, initTE } from 'tw-elements'
import { DocumentNode, gql, useQuery } from '@apollo/client'

interface ClientSelectBoxProps {
  informationText: string
  value: string
  data: string[]
  onChange: (inputValue: string) => void
}
//TODO fix param types
export const ClientSelectBox: React.FC<ClientSelectBoxProps> = ({
  informationText,
  value = '',
  data,
  onChange,
}) => {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    initTE({ Select, Input })
    if (data.length < 1) setDisabled(true)
  }, [])

  //TODO text color in search bar
  //TODO add model names
  return (
    <div className="box mb-4 ">
      <select
        disabled={disabled}
        data-te-select-init
        data-te-select-filter="true"
        className="w-full md:w-96 p-0 bg-neutral-700 hover:bg-neutral-800 rounded-lg bg- text-white placeholder-neutral-400"
        onChange={(e) => onChange(e.target.value)}
      >
        {data.map((item: string) => (
          <option className={'hallo ' + item} key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <hr className="w-full my-1 text-left ml-0" />
      <p className="text-white text-xs">{informationText}</p>
    </div>
  )
}
