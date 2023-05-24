import React, { useContext, useState } from 'react'
import { SelectBox } from './SelectBox'
import { gql, useQuery } from '@apollo/client'
import { ParkedCarContext } from '../../lib/parkedCar'

const GET_MANUFACTURERS = gql`
  query {
    carManufacturers {
      manufacturerName
    }
  }
`

export const SelectManufacturer: React.FC = () => {
  const defaultInformation = 'Bitte wählen Sie eine Marke aus.'
  const doneMessage = 'Marke ausgewählt ✅'
  const { carInformations, setCarInformations } = useContext(ParkedCarContext)
  const [information, setInformation] = useState<string>(defaultInformation)
  const [manufacturer, setManufacturer] = useState('')
  const { loading, error, data } = useQuery(GET_MANUFACTURERS)

  function handleManufacturer(value: string) {
    if (!carInformations) return
    setCarInformations({
      ...carInformations,
      parkedCar: { ...carInformations.parkedCar, manufacturer: value },
    })
    if (value.length === 0) {
      setInformation(defaultInformation)
    } else {
      setInformation(doneMessage)
    }
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  if (!carInformations) return <p>missing context...</p>

  return (
    <SelectBox
      informationText={information}
      value={carInformations?.parkedCar.manufacturer}
      data={data.carManufacturers.map((item: any) => item.manufacturerName)}
      onChange={handleManufacturer}
    />
  )
}
