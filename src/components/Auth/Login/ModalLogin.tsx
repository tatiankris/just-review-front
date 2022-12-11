import React, { useState } from "react";
import {Modal, Box, Typography, Button, TextField, Stack, Chip, Divider} from "@mui/joy";
import s from './Login.module.scss'
import Login from "./Login";
import GoogleIcon from '@mui/icons-material/Google';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20%',
  backgroundColor: '#e7ffeb',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalLogin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{height: '30px'}} variant={'soft'} color="success" onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modalBox} sx={style}>
          <Typography id="modal-modal-title"  component="h2">
            Login
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

          <Login />

        </Box>
      </Modal>
    </div>
  );
}

export default ModalLogin