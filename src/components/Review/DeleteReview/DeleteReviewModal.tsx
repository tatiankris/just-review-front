import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Modal.module.scss'
import {deleteReviewTC} from "../../../store/reducers/reviewsReducer";
import {useAppDispatch} from "../../../common/utils/hooks";

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

function DeleteReviewModal({ reviewId,reviewTitle, ...props}:{ reviewId: string, reviewTitle: string }) {
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        dispatch(deleteReviewTC(reviewId))
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
                        Delete review {reviewTitle}?
                    </Typography>
                    <div style={{marginTop: '10px'}}>
                        <Button variant={'soft'} color={'danger'} onClick={handleDelete}>Delete</Button>
                        <Button variant={'soft'} color={'primary'} onClick={handleClose}>Cancel</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default DeleteReviewModal