import {Alert, Button } from "@mui/joy";
import React, {useState} from "react";
import {convertToBase64} from "../../../../common/utils/convertToBase64";
import {useTranslation} from "react-i18next";

type PropsType = {
    callback: (file64: string) => void

}
export const UploadImageButton = ({callback}: PropsType) => {

    const [errorImg, setErrorImg] = useState(false)
    const { t } = useTranslation();
    const alertErrorImg = () => {
        setErrorImg(true)
        setTimeout (() => {
            setErrorImg(false)
        }, 2000)
    }

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 400000) {
                convertToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    callback(file64);
                })
            } else {
                console.error('Error: ', `${t('uploadImg.toBig')}`)
                alertErrorImg();
            }
        }
    }


    return (
        <div>
            {
                errorImg &&
                <Alert color={'danger'} style={{
                    position: 'absolute' as 'absolute',
                    top: '-16%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240px'

                }}>{t('uploadImg.toBig')}</Alert>
            }
            <label style={{marginTop: '10px'}}>
                <input type="file"
                       onChange={uploadHandler}
                       accept="image/*"
                       style={{display: 'none'}}
                />
                <Button size={'sm'} variant="soft" component="span">
                    {t('uploadImg.browse')}
                </Button>
            </label>



        </div>
    )
}