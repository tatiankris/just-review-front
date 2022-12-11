import React, {ChangeEvent, useState} from 'react'
import {Alert, Button} from "@mui/joy";
import {convertToBase64} from "../../../common/utils/convertToBase64";
import * as Yup from "yup";

type PropsType = {
    callback: (file64: string) => void

}
export const UpdateReviewImage = ({callback}: PropsType) => {

    const [errorImg, setErrorImg] = useState(false)

    const alertErrorImg = () => {
        setErrorImg(true)
        setTimeout (() => {
            setErrorImg(false)
        }, 2000)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                convertToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    callback(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                alertErrorImg();
            }
        }
    }


    return (
        <div style={{marginTop: '6px'}}>
            {
                errorImg &&
                <Alert
                    color={'danger'}
                    // severity="error"
                    style={{
                    position: 'absolute' as 'absolute',
                    top: '-16%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240px'

                }}>Error: The file is too big!</Alert>
            }
            <label style={{marginTop: '10px'}}>
                <input type="file"
                       onChange={uploadHandler}
                       accept="image/*"
                       style={{display: 'none'}}
                />
                <Button variant="soft" component="span" style={{width: '100%'}}>
                    Upload image
                </Button>
            </label>
        </div>
    )
}