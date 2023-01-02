import React, { useState } from "react";
import {Chip, Divider, Stack, Box, Button, Modal, Typography} from "@mui/joy";
import GoogleIcon from "@mui/icons-material/Google";
import Registration from "./Registration";
import s from './Registration.module.scss'
import GitHubIcon from "@mui/icons-material/GitHub";
import {useAppDispatch} from "../../../common/utils/hooks";

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

type PropsType = {
    isSmallScreen: boolean
}

function ModalRegistration({isSmallScreen}: PropsType) {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self")
    }
    const gitHub = () => {
        window.open("http://localhost:5000/auth/github", "_self")
    }


    return (
        <div>
            <Button variant={'outlined'} sx={{height: !isSmallScreen ? '30px' : 'auto'}} size={!isSmallScreen ? 'md' : 'sm'} onClick={handleOpen}>Sign Up</Button>
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
                        {/*<span style={{marginTop: '6px', color: 'gray'}}>Continue with</span>*/}

                        <Stack style={{margin: '6px 0px', width: '100%'}} spacing={0.5}>
                            <Chip color={'success'} startDecorator={<GoogleIcon />} onClick={google}>Sign up with Google</Chip>
                            <Chip startDecorator={<GitHubIcon />} onClick={gitHub}>Sign up with GitHub</Chip>
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