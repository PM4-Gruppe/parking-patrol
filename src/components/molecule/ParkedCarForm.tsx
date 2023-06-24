import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { SelectManufacturer } from '../atom/SelectManufacturer'
import { SelectModel } from '../atom/SelectModel'
import { SelectColor } from '../atom/SelectColor'
import { ParkedCarContext } from '../../lib/parkedCar'
import { LicensePlateTextBox } from '../atom/LicensePlateTextBox'
import { SelectBox } from '../atom/SelectBox'
import { ImageSelect } from '../atom/ImageSelect'
import { getGeoInformations } from '../../lib/photoAnalyzer'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'
import { toastError } from '../../lib/toasts'
import { AlprStatistic } from '../../schemas/AlprStatistic'

interface ParkedCarFormProps {
  setImage: (arg0: File) => void
}

export const ParkedCarForm: React.FC<ParkedCarFormProps> = ({ setImage }) => {
  const api = new LocalEndpoint()
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const { carInformations, setCarInformations } = useContext(ParkedCarContext)

  const handleImageSelect = async (selectedImage: File) => {
    if (!carInformations || !selectedImage) return

    let alprRes
    setAnalyzing(true)

    setImage(selectedImage)
    setSelectedImageURL(URL.createObjectURL(selectedImage))

    try {
      alprRes = await api.readAlprStats(selectedImage)
    } catch (err) {
      toastError('Error analyzing image')
    }

    const geoInformations = await getGeoInformations(selectedImage)

    if (alprRes && alprRes.results.length > 0) {
      setCarInformations({
        parkedCar: {
          ...carInformations.parkedCar,
          numberPlate: alprRes.results[0].plate.toUpperCase(),
        },
        alprStats: alprRes,
        geoLocation: geoInformations,
      })
    } else {
      setCarInformations({
        parkedCar: {
          ...carInformations.parkedCar,
          numberPlate: '',
        },
        alprStats: undefined,
        geoLocation: geoInformations,
      })
      toastError('Kein Kennzeichen erkannt')
    }
    setAnalyzing(false)
  }

  if (!carInformations) return <p>missing context...</p>
  return (
    <div>
      <ImageSelect handleImage={handleImageSelect} />

      {selectedImageURL && (
        <Image
          src={selectedImageURL}
          width={150}
          height={150}
          alt="Preview"
          className="my-2"
        />
      )}

      <LicensePlateTextBox loading={analyzing} />

      <SelectManufacturer />

      {carInformations.parkedCar.manufacturer ? (
        <SelectModel
          manufacturer={carInformations.parkedCar.manufacturer}
          model={carInformations.parkedCar.model}
        />
      ) : (
        <SelectBox value="VALUE" informationText="infomation" data={[]} />
      )}

      <SelectColor />
    </div>
  )
}
