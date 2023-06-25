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
  const { loading, error, data } = useQuery(GET_MANUFACTURERS)

  function handleManufacturer(value: string) {
    if (!carInformations) return
    setCarInformations({
      ...carInformations,
      parkedCar: { ...carInformations.parkedCar, manufacturer: value, model: 'Nicht erkennbar' },
    })
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  if (!carInformations) return <p>missing context...</p>

  return (
    <SelectBox
      informationText={
        carInformations.parkedCar.manufacturer == 'Nicht erkennbar' ? defaultInformation : doneMessage
      }
      value={carInformations?.parkedCar.manufacturer}
      data={data.carManufacturers.map((item: any) => item.manufacturerName)}
      onChange={handleManufacturer}
    />
  )
}
