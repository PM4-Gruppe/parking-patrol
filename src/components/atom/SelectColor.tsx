import React, { useState } from 'react'
import { SelectBox } from './SelectBox'
import { gql, useQuery } from '@apollo/client'

const GET_COLORS = gql`
query {
  colors {
    colorName
  }
}
`

interface SelectColorProps {
  model?: string
  addFormData: (arg0: string) => void
}

export const SelectColor: React.FC<SelectColorProps> = ( model, addFormData ) => {
  const defaultInformation = 'Bitte wählen Sie eine Autofarbe aus.'
  const doneMessage = 'Autofarbe ausgewählt ✅'

  if (!model) return <span></span>

  const { loading, error, data } = useQuery(GET_COLORS)

  const [color, setColor] = useState('')
  const [informationColor, setInformationColor] = useState<string>(defaultInformation)

  function handleColor(value: string) {
    setColor(value)
    if (value.length === 0) {
      setInformationColor(defaultInformation)
    } else {
      addFormData(value)
      setInformationColor(doneMessage)
    }
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  return (
    <SelectBox
      informationText={informationColor}
      value={color}
      data={data.colors.map((color: any) => color.colorName)}
      onChange={handleColor}
    />
  )
}