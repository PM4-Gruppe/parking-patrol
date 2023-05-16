import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { SelectBox } from './SelectBox'

const GET_MODELS = gql`
  query ($manufacturer: String!) {
    carModels(where: $manufacturer) {
      modelName
    }
  }
`

interface SelectModelProps {
  manufacturer?: string
}

export const SelectModel: React.FC<SelectModelProps> = ({ manufacturer }) => {
  const defaultInformation = 'Bitte wählen Sie ein Model aus.'
  const doneMessage = 'Model ausgewählt ✅'

  if (!manufacturer) return <span></span>

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { manufacturer },
  })

  console.log('data for: ', manufacturer)
  console.log(data)
  const [model, setModel] = useState('')

  const [informationModel, setInformationModel] =
    useState<string>(defaultInformation)

  function handleModel(value: string) {
    console.log('in handleModel')
    console.log('Model = ', model)
    setModel(value)
    if (value.length === 0) {
      setInformationModel(defaultInformation)
    } else {
      setInformationModel(doneMessage)
    }
  }

  if (loading) return <p>loading...</p>
  console.log(data, error)
  if (error) return <p>error...</p>
  return (
    <SelectBox
      informationText={informationModel}
      value={model}
      data={data.carModels.map((model: any) => model.modelName)}
      onChange={handleModel}
    />
  )
}
