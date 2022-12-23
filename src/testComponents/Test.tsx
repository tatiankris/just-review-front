import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {Container} from "@mui/material";
import {Box, Button, Input, Modal, Typography} from "@mui/joy";
import s from "./Test.module.scss";
import TestForm from "./TestForm";
import TestFormMaterial from "./TestFormMaterial";
import TestUseFormik from "./TestUseFormik";
import {imageDefault} from "../common/imageDefault";

import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor'
import SimpleMdeReact from "react-simplemde-editor";
import ReactMarkdown from 'react-markdown'
import {useMutation} from "../common/hooks/useMutation";
import children = ReactMarkdown.propTypes.children;
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {reviewsAPI} from "../api/review-api";
import {UploadImageButton} from "./UploadImageButton";
import {DragDropImage} from "./DragDropImage";
import {PROFILE_PAGE} from "../Routing";



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

const URL = '/images'
const ErrorText = ({children,...props}: {children: ReactNode}) => {
     return <Typography sx={{color: 'red'}}>
         {children}
    </Typography>
}

function Test() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [image, setImage] = useState(imageDefault);
    const handleImage = (file64: string) => {
        setImage(file64)

    }

    const [value, setValue] = useState("Initial value");

    const onChange = useCallback((value: string) => {
        setValue(value);
    }, []);
    // const autofocusNoSpellcheckerOptions = useMemo(() => {
    //     return {
    //         autofocus: true,
    //         spellChecker: false,
    //     } as SimpleMDE.Options;
    // }, []);


    const {mutate: uploadImage, isLoading: uploading, error: uploadError} = useMutation()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

        console.log('FILE', file)
        setFileToBase(file);
        // if (file) {
        //     await uploadImage(file)
        // }
    }
    const setFileToBase = (file: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            console.log('reader.result', reader.result)
            uploadImageToServer(reader.result)
    }}
    const uploadImageToServer = (file: string | ArrayBuffer | null) => {
        reviewsAPI.images(file).then((res) => {
            console.log('res.data' ,res.data)
        }).catch((error: any) => {
                throw new Error(error.message)
            }
        );
    }




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
            {/*<TestUseFormik />*/}
<div style={{textAlign: 'start'}}>
    <input accept={"image/*"} id={'image'}
           type={'file'}
           onChange={handleUpload}

           disabled={uploading}
    />
    {uploadError && <ErrorText>{uploadError}</ErrorText>}


    {/*<Input type={'file'}  />*/}
    {/*<Button loading={uploading}>upload</Button>*/}
    <UploadImageButton callback={handleImage} />
    <DragDropImage callback={handleImage} />


    <img src={image} width={'120px'} height={'90'} style={{display: 'block', marginTop: '8px'}}/>
    <Button onClick={() => {uploadImageToServer(image)}}>Upload</Button>
    <SimpleMdeReact value={value} onChange={onChange} />
    <ReactMarkdown children={value} />

    <a href={`${PROFILE_PAGE}/user1?text=${null}`}>link</a>
</div>

        </Container>
    )
}

export default Test