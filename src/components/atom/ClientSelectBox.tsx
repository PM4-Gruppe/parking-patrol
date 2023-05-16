import React from 'react'
import { useEffect } from 'react';
import { Select, Input, initTE } from 'tw-elements'
import { DocumentNode, gql, useQuery } from '@apollo/client';


const GET_CARMANUFACTURERS = gql`
  query {
    carManufacturers {
      manufacturerName
    }
  }
`;


interface TextBoxProps {
  informationText: string
  value: string
  query: DocumentNode
  onChange: (inputValue: string) => void
}
//TODO fix param types
export const ClientSelectBox: React.FC<TextBoxProps> = ({ informationText, value = '', query, onChange }) => {
  useEffect(() => {
    initTE({ Select, Input })
  }, [])

  //console.log('Query:', query) //idk wieso undefined?
  //console.log(GET_CARMANUFACTURERS)
  const { loading, error, data } = useQuery(GET_CARMANUFACTURERS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  //TODO text color in search bar
  //TODO add model names
  return (
    <div className="box mb-4 ">
      <select
        data-te-select-init data-te-select-filter="true"
        className="w-full md:w-96 p-0 bg-neutral-700 hover:bg-neutral-800 rounded-lg bg- text-white placeholder-neutral-400">
        onChange={(event) => {
                    onChange(event.target.value)
                }
                }
        {data.carManufacturers.map((manufacturer: any) => (
          <option key={manufacturer.id} value={manufacturer.manufacturerName} >
            {manufacturer.manufacturerName}
          </option>
        ))}
      </select>
      <hr className="w-full my-1 text-left ml-0" />
      <p className="text-white text-xs">
        {informationText}
      </p>
    </div>
  );
};
