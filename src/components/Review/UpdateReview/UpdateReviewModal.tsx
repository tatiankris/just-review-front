import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Modal.module.scss'
import UpdateReviewForm from "./UpdateReviewForm";

function UpdateReviewModal() {
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

                    <UpdateReviewForm />
                </Box>
            </Modal>
        </div>
    );
}

export default UpdateReviewModal