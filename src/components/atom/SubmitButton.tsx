import React from 'react'
import { toastSuccess } from '../../lib/toasts'
import { toastError } from '../../lib/toasts'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'

interface SubmitButtonProps {
    label: string
    selectedImage?: File
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ label, selectedImage }) => {
    const api = new LocalEndpoint()

    const toastSuccessMessage = 'Das Foto wurde erfolgreich hochgeladen!'
    const toastErrorMessage = 'Das Foto konnte nicht hochgeladen werden!'
    const toastChoosePhotoMessage = 'Bitte wählen Sie ein Foto aus!'

    const handleSubmit = async () => {
        if (!selectedImage) {
            toastError(toastChoosePhotoMessage)
            return
        }
        const body = new FormData()
        body.append('image', selectedImage)
        try {
            /*
            DOES NOT WORK
            const token = localStorage.getItem('token')
            const decodedToken: any = jwt_decode(token)
            const carInspector = decodedToken.name
            console.log('carInspector', carInspector)
            */
            const res = await api.postRequest('/image-storage/image-upload', body)

            if (res) {
                toastSuccess(toastSuccessMessage)
                //TODO: no redirection => reset form
            }
            else toastError(toastErrorMessage)
        } catch (error) {
            toastError(toastErrorMessage)
        }
    }

    return (
        <button
            type="button"
            onClick={handleSubmit}
            className="p-2 bg-green-700 hover:bg-green-800 text-white rounded-lg my-2"
        >
            {label}
        </button>
    );
}