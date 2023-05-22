import React, { useState } from 'react'
import { SelectBox } from './SelectBox'
import { gql, useQuery } from '@apollo/client'

const GET_MANUFACTURERS = gql`
  query {
    carManufacturers {
      manufacturerName
    }
  }
`

interface SelectManufacturerProps {
  addFormData: (arg0: string) => void
}

export const SelectManufacturer: React.FC<SelectManufacturerProps> = ({
  addFormData,
}) => {
  const defaultInformation = 'Bitte wählen Sie eine Marke aus.'
  const doneMessage = 'Marke ausgewählt ✅'
  const [information, setInformation] = useState<string>(defaultInformation)
  const [manufacturer, setManufacturer] = useState('')
  const { loading, error, data } = useQuery(GET_MANUFACTURERS)

  function handleManufacturer(value: string) {
    setManufacturer(value)
    addFormData(value)
    if (value.length === 0) {
      setInformation(defaultInformation)
    } else {
      setInformation(doneMessage)
    }
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  return (
    <SelectBox
      informationText={information}
      value={''}
      data={data.carManufacturers.map((item: any) => item.manufacturerName)}
      onChange={handleManufacturer}
    />
  )
}
