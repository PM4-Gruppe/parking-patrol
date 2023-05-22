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
  addFormData: (arg0: string) => void
}

export const SelectModel: React.FC<SelectModelProps> = ({ manufacturer, addFormData }) => {
  const defaultInformation = 'Bitte wählen Sie ein Model aus.'
  const doneMessage = 'Model ausgewählt ✅'

  //TODO: Fix dirty hack => causes Reac Hook Warnings
  if (!manufacturer) return <span></span>

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { manufacturer },
  })

  const [model, setModel] = useState('')

  const [informationModel, setInformationModel] = useState<string>(defaultInformation)

  function handleModel(value: string) {
    setModel(value)
    if (value.length === 0) {
      setInformationModel(defaultInformation)
    } else {
      addFormData(value)
      setInformationModel(doneMessage)
    }
  }

  if (loading) return <p>loading...</p>
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
