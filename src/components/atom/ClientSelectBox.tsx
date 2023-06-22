import React, { useState } from 'react'
import { useEffect } from 'react'
import { Select, Input, initTE } from 'tw-elements'
import { DocumentNode, gql, useQuery } from '@apollo/client'

interface ClientSelectBoxProps {
  informationText: string
  value: string
  data: string[]
  onChange?: (inputValue: string) => void
  disable?: boolean
}

export const ClientSelectBox: React.FC<ClientSelectBoxProps> = ({
  informationText,
  value = '',
  data,
  onChange,
}) => {
  useEffect(() => {
    initTE({ Select, Input })
  }, [data.length])

  return (
    <div className="box mb-4 ">
      <select
        data-te-select-init
        data-te-select-filter="true"
        className="w-full md:w-96 p-0 bg-neutral-700 hover:bg-neutral-800 rounded-lg text-white placeholder-neutral-400"
        onChange={(e) => {
          onChange ? onChange(e.target.value) : ''
        }}
      >
        {data.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <hr className="w-full my-1 text-left ml-0" />
      <p className="text-white text-xs">{informationText}</p>
    </div>
  )
}
