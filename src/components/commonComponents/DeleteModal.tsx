import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Review/Modal.module.scss'
import { useAppDispatch } from "../../common/utils/hooks";
import {deleteCommentTC} from "../../store/reducers/commentsReducer";
import {deleteReviewTC} from "../../store/reducers/reviewsReducer";
import {useTranslation} from "react-i18next";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#e7ffeb',
    border: '0.5px solid #000',
    boxShadow: 24,
    p: 4,
};

type DeletePropsType = {
    reviewId: string
    commentId?: string
    title: string
    type: 'review' | 'comment'
}

function DeleteModal( { reviewId, commentId,title,type, ...props }:DeletePropsType ) {


    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { t } = useTranslation();

    const handleDelete = () => {

        if (type === "review") {
            dispatch(deleteReviewTC(reviewId))
        }
        if (type === "comment" && commentId) {
            dispatch(deleteCommentTC(reviewId, commentId))
        }

        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleOpen} size="sm" color={'danger'}>
                🗑️
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={s.modalBox} sx={style}>
                    <Typography id="modal-modal-title" level="h4">
                        {t('delete.delete')} {t('delete.publish')} {title}?
                    </Typography>
                    <div style={{marginTop: '10px'}}>
                        <Button variant={'soft'} color={'danger'} onClick={handleDelete}>{t('delete.delete')} </Button>
                        <Button variant={'soft'} color={'primary'} onClick={handleClose}>{t('delete.cancel')} </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default DeleteModal