import React, { useState } from "react";
import {Button, Modal, Box, Typography} from "@mui/joy";
import s from "../Modal.module.scss";
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

function CreateReviewModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant={'soft'} color={'info'} onClick={handleOpen}>+ New Review</Button>
        <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
            <Box className={s.updateModal}>
                <Typography sx={{paddingLeft: '40%'}} id="modal-modal-title" level="h2">
                    New Review
                </Typography>

                <CreateReviewForm handleClose={handleClose} />
            </Box>
    </Modal>
    </div>
);
}

export default CreateReviewModal