import React from 'react'
import { useEffect } from 'react';
import { Datepicker, Input, initTE } from 'tw-elements'
import { gql, useQuery } from '@apollo/client';

/*
const GET_CARMANUFACTURERS = gql`
  query {
    CarManufacturer {
      manufacturerName
    }
  }
`;
*/


interface TextBoxProps {
  inputType: string
  inputDefaultValue: string
  informationText: string
  value: string
  //onChange: (inputValue: string) => void
}

export const ClientSelectBox: React.FC<TextBoxProps> = ({ inputType, inputDefaultValue, informationText, value = '' }) => {
  useEffect(() => {
    initTE({ Datepicker, Input })
  }, [])

  /*
  const { loading, error, data } = useQuery(GET_CARMANUFACTURERS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  */

  /*
  replace hardcoded select options with: 

  {data.carManufacturers.map((manufacturer: any) => (
          <option key={manufacturer.id} value={manufacturer.manufacturerName}>
            {manufacturer.manufacturerName}
          </option>
        ))}
  */

  return (
    <div className="box mb-4 ">
      <select
        name="carManufacturers"
        data-te-select-init data-te-select-filter="true"

        className="w-full md:w-96 p-0 bg-neutral-700 hover:bg-neutral-800 rounded-lg bg- text-white placeholder-neutral-400">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
      </select>
      <hr className="w-full my-1 text-left ml-0" />
      <p className="text-white text-xs">
        {informationText}
      </p>
    </div>
  );
};
