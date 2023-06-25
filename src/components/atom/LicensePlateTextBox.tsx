import React, { useContext, useState, useEffect } from 'react'
import { TextBox } from './TextBox'
import { ParkedCarContext } from '../../lib/parkedCar'

interface LicensePlateTextBoxProps {
  loading: boolean
}

export const LicensePlateTextBox: React.FC<LicensePlateTextBoxProps> = ({
  loading,
}) => {
  const { carInformations, setCarInformations } = useContext(ParkedCarContext)
  const [informationLicenceplate, setInformationLicenseplate] = useState('')

  useEffect(() => {
    if (!carInformations || !carInformations.alprStats) {
      setInformationLicenseplate('Lade ein Bild hoch um es zu analysieren.')
    } else {
      const plate = carInformations.alprStats.results[0].plate.toUpperCase()
      const score = (carInformations.alprStats.results[0].score * 100).toFixed(1)

      setInformationLicenseplate(
        `Vorhersage mit ${score}% Wahrscheinlichkeit (${plate})`
      )
    }
  }, [carInformations, informationLicenceplate])

  const setLicensePlate = (value: string) => {
    value = value.toUpperCase()

    if (carInformations) {
      setCarInformations({
        ...carInformations,
        parkedCar: { ...carInformations.parkedCar, numberPlate: value },
      })
    }
  }

  return (
    <TextBox
      inputType="text"
      inputDefaultValue="Autonummer"
      informationText={
        loading ? 'Bild wird verarbeitet...' : informationLicenceplate
      }
      value={carInformations?.parkedCar.numberPlate}
      onChange={setLicensePlate}
    />
  )
}
