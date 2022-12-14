import React, { useState } from "react";
import {Autocomplete, Button, Container, FormControl, FormLabel, TextField} from "@mui/material";

import {Form, Formik, FormikState, useFormik} from "formik";
import * as Yup from "yup";

const tagsOptions = [
    {title: '90s'},
    {title: '2022'},
    {title: '2021'},
    {title: 'adventures'},
    {title: 'classic'},
    {title: 'rock'},
    {title: 'jazz'},
    {title: 'helicopter'}
]

type FormikValues = {
    reviewTitle: string
    tags: Array<{ title: string }>
}
function TestFormMaterial() {

        const initialValues = {
            reviewTitle: '',
            tags: [tagsOptions[1]]
        }

        const validationSchema = Yup.object().shape({
            reviewTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            // tags: Yup.string()
            //     .min(2, 'Too Short!')
            //     .max(30, 'Too Long!')
            //     .required('Field is required'),
        })
        const onSubmit = (values: FormikValues) => {
            // props.handleClose()
            alert(JSON.stringify(values, null, 2));
        }

    return (

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleChange, values, setFieldValue, resetForm, touched, errors }) => (
                <Form style={{display:"flex", flexDirection: 'column'}}>

                <TextField
                    sx={{width: '60%'}}
                    id="reviewTitle"
                    name="reviewTitle"
                    label="Review title"
                    value={values.reviewTitle}
                    onChange={handleChange}
                    error={touched.reviewTitle && Boolean(errors.reviewTitle)}
                    helperText={touched.reviewTitle && errors.reviewTitle}
                />
                <button type="button">llllll</button>
                <FormControl sx={{width: '60%'}}>


                <FormLabel>Tags</FormLabel>
                <Autocomplete

                    onSubmit={() => {
                        console.log('submit')
                    }}
                    onOpen={() => {
                        console.log('open')
                    }}
                    onClose={() => {
                        console.log('close')
                    }}
                    multiple={true}
                    id={'tags'}
                    placeholder={'tags'}
                    options={tagsOptions}
                    getOptionLabel={(option) => option.title}
                    defaultValue={values.tags}
                    renderInput={params => <TextField {...params} />}

                    // limitTags={5}
                    sx={{ width: '100%' }}
                />
                </FormControl>
                <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="primary" variant="contained"  type="submit">
                    Submit
                </Button>

                </Form>
            )}
        </Formik>
    )
}

export default TestFormMaterial