import React, { useState } from "react";
import {Button, Modal, Box, Typography, ModalDialog} from "@mui/joy";
import s from "./CreateReview.module.scss";
import UpdateReviewForm from "../UpdateReview/UpdateReviewForm";
import CreateReviewForm from "./CreateReviewForm";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#e7ffeb',
    border: '0.5px solid #000',
    // borderRadius: '6px',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    variant: 'soft' | 'solid' | 'outlined'
}

function CreateReviewModal({variant}: PropsType) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant={variant} color={'info'} onClick={handleOpen} style={{fontSize: '18px'}}>+ New Review</Button>
            <Modal
                disableAutoFocus
                // disableEnforceFocus
                disableRestoreFocus
                sx={{zIndex: 1100}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

            <ModalDialog className={s.createModal}>


                <CreateReviewForm handleClose={handleClose} />
            </ModalDialog>
    </Modal>
    </div>
);
}

export default CreateReviewModal