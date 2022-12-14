import React, { useState } from "react";
import {Container} from "@mui/material";
import {Box, Button, Modal, Typography} from "@mui/joy";
import s from "./Test.module.scss";
import TestForm from "./TestForm";
import TestFormMaterial from "./TestFormMaterial";
import TestUseFormik from "./TestUseFormik";

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

function Test() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px'}}
        >
            tHIS IS TEST
            <div>
                <Button variant={'soft'} color={'info'} onClick={handleOpen}>+ New Review</Button>
                <Modal
                    sx={{zIndex: 1100}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={s.updateModal}>
                        <Typography sx={{paddingLeft: '40%'}} id="modal-modal-title" level="h2">
                            New Review
                        </Typography>

                        <TestUseFormik />
                    </Box>
                </Modal>
            </div>


            <TestUseFormik />
        </Container>
    )
}

export default Test