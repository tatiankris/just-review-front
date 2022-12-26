import React, {useState} from "react";
import {reviewsAPI} from "../../../../api/review-api";
import {UploadImageButton} from "./UploadImageButton";
import {DragDropImage} from "./DragDropImage";
import {Box, Button} from "@mui/joy";
import s from './UploadImage.module.scss'
import {imageDefault} from "../../../../common/imageDefault";

type UploadImagePropsType = {
    image: string
    handleImage: (file64: string) => void
    handleDelete: () => void
}

export const UploadImage = ({image, handleImage, handleDelete}: UploadImagePropsType) => {

    // const uploadImageToServer = (file: string | ArrayBuffer | null) => {
    //     reviewsAPI.images(file).then((res) => {
    //         console.log('res.data' ,res.data)
    //     }).catch((error: any) => {
    //             throw new Error(error.message)
    //         }
    //     );
    // }

    return (
        <Box className={s.uploadBox}>

            <DragDropImage image={image} callback={handleImage} />
            {/*<UploadImageButton callback={handleImage} />*/}
            {/*<img src={image} width={'120px'} height={'90'} style={{display: 'block', marginTop: '8px'}}/>*/}
            {/*<Button onClick={() => {uploadImageToServer(image)}}>Upload</Button>*/}
            {
                image && <Button size={'sm'} className={s.deleteButton} onClick={handleDelete}>DELETE</Button>
            }

        </Box>
    )
}
