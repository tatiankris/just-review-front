import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Modal.module.scss'
import UpdateReviewForm from "./UpdateReviewForm";

type UpdateType = {
    options: {
        tags: string[],
        imageURL: string,
        reviewTitle: string,
        workTitle: string,
        reviewText: string,
        category: string,
        authorGrade: number
    }

    reviewId: string
}

function UpdateReviewModal({ reviewId, ...props}: UpdateType) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={handleOpen} size="sm" color="warning" >
                ✏️
            </IconButton>
            <Modal

                className={s.modalStyle}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{backgroundColor: '#fff8c5'}} className={s.updateModal}>
                    <Typography paddingLeft={'40%'} id="modal-modal-title" level="h2">
                        Update
                    </Typography>

                    <UpdateReviewForm handleClose={handleClose} options={props.options}  reviewId={ reviewId} />
                </Box>
            </Modal>
        </div>
    );
}

export default UpdateReviewModal