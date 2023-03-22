import fetch from 'node-fetch'
import FormData from 'form-data'
import fs, { PathLike } from 'fs'


function getPhotoInformations(photoPath: PathLike) {
    fs.createReadStream(photoPath)
    fetch('https://api.platerecognizer.com/v1/plate-reader/', {
        method: 'POST',
        headers: {
            Authorization: "Token !mach sign up und hol dir eigene token amk!",
        },
        body: body,
        })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => {
        console.log(err);
        });
}
    


    export default getPhotoInformations;