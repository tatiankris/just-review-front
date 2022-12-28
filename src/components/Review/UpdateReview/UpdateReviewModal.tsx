import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton, ModalDialog} from "@mui/joy";
import s from '../Modal.module.scss'
import st from '../CreateReview/CreateReview.module.scss'
import UpdateReviewForm from "./UpdateReviewForm";

type UpdateType = {
    oldValues: {

        reviewTitle: string,
        workTitle: string,
        category: { title: string },
        tags: Array<{title: string | string}>,
        reviewText: string,
        authorGrade: number,
        imageURL: string,
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
                sx={{zIndex: 1100}}
                className={s.modalStyle}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <ModalDialog className={st.createModal}>
                    <UpdateReviewForm handleClose={handleClose} oldValues={props.oldValues}  reviewId={ reviewId} />
                </ModalDialog>
            </Modal>
        </div>
    );
}

export default UpdateReviewModal