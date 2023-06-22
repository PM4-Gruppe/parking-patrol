import React, { useContext, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { SelectBox } from './SelectBox'
import { ParkedCarContext } from '../../lib/parkedCar'

const GET_MODELS = gql`
  query ($manufacturer: String!) {
    carModels(where: $manufacturer) {
      modelName
    }
  }
`

interface SelectModelProps {
  manufacturer: string
}

export const SelectModel: React.FC<SelectModelProps> = ({ manufacturer }) => {
  const defaultInformation = 'Bitte wählen Sie ein Model aus.'
  const doneMessage = 'Model ausgewählt ✅'

  const { carInformations, setCarInformations } = useContext(ParkedCarContext)

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { manufacturer },
  })

  function handleModel(value: string) {
    if (!carInformations) return
    setCarInformations({
      ...carInformations,
      parkedCar: { ...carInformations.parkedCar, model: value },
    })
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  if (!carInformations) return <p>missing context...</p>
  return (
    <SelectBox
      informationText={
        carInformations.parkedCar.model == 'Nicht erkennbar' ? defaultInformation : doneMessage
      }
      value={manufacturer}
      data={data.carModels.map((model: any) => model.modelName)}
      onChange={handleModel}
    />
  )
}
