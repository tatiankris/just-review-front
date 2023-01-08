import React, {useState} from "react";
import {reviewsAPI} from "../../../../api/review-api";
import {UploadImageButton} from "./UploadImageButton";
import {DragDropImage} from "./DragDropImage";
import {Box, Button} from "@mui/joy";
import s from './UploadImage.module.scss'
import {imageDefault} from "../../../../common/imageDefault";
import {useTranslation} from "react-i18next";

type UploadImagePropsType = {
    image: string
    handleImage: (file64: string) => void
    handleDelete: () => void
}

export const UploadImage = ({image, handleImage, handleDelete}: UploadImagePropsType) => {
    const { t } = useTranslation();
    return (
        <Box className={s.uploadBox}>

            <DragDropImage image={image} callback={handleImage} />
            {
                image && <Button size={'sm'} className={s.deleteButton} onClick={handleDelete}>{t('uploadImg.delete')}</Button>
            }

        </Box>
    )
}
