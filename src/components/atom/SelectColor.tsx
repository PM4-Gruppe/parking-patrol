import React, { useContext, useState } from 'react'
import { SelectBox } from './SelectBox'
import { gql, useQuery } from '@apollo/client'
import { ParkedCarContext } from '../../lib/parkedCar'

const GET_COLORS = gql`
  query {
    colors {
      colorName
    }
  }
`

export const SelectColor: React.FC = () => {
  const defaultInformation = 'Bitte wählen Sie eine Autofarbe aus.'
  const doneMessage = 'Autofarbe ausgewählt ✅'
  const { carInformations, setCarInformations } = useContext(ParkedCarContext)
  const { loading, error, data } = useQuery(GET_COLORS)

  function handleColor(value: string) {
    if (!carInformations) return
    setCarInformations({
      ...carInformations,
      parkedCar: { ...carInformations.parkedCar, color: value },
    })
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  if (!carInformations) return <p>missing context...</p>
  return (
    <SelectBox
      informationText={
        carInformations.parkedCar.color == 'Nicht verfügbar' ? defaultInformation : doneMessage
      }
      value={carInformations.parkedCar.color}
      data={data.colors.map((color: any) => color.colorName)}
      onChange={handleColor}
    />
  )
}
