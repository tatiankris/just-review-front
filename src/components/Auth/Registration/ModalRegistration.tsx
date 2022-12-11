import React, { useState } from "react";
import {Chip, Divider, Stack, Box, Button, Modal, Typography} from "@mui/joy";
import GoogleIcon from "@mui/icons-material/Google";
import Registration from "./Registration";
import s from './Registration.module.scss'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#fff3f3',
    border: '0.5px solid #000',
};

function ModalRegistration() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant={'outlined'} sx={{height: '30px'}} onClick={handleOpen}>Sign Up</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={s.modalBox} sx={style}>
                    <Typography id="modal-modal-title" component="h2">
                        Sign Up
                    </Typography>

                    <div style={{marginTop: '12px'} }>
                        <span style={{marginTop: '6px', color: 'gray'}}>Continue with</span>

                        <Stack style={{margin: '6px 0px', width: '100%'}} spacing={0.5}>
                            <Chip color={'success'} startDecorator={<GoogleIcon />} onClick={() => {alert('Google')}}>Google</Chip>
                            <Chip startDecorator={<div>🐩</div>} onClick={() => {alert('VK')}}>VK</Chip>
                        </Stack>
                    </div>
                    <Divider />
                    <Typography id="modal-modal-title"  component="h6">
                        or
                    </Typography>

                    <Registration />

                </Box>
            </Modal>
        </div>
    );
}

export default ModalRegistration