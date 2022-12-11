import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Modal.module.scss'

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

function DeleteReviewModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        Delete review {'//'}?
                    </Typography>
                    <div style={{marginTop: '10px'}}>
                        <Button variant={'soft'} color={'danger'}>Delete</Button>
                        <Button variant={'soft'} color={'primary'}>Cancel</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default DeleteReviewModal