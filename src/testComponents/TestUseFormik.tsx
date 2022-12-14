import React, { useState } from "react";
import {Container} from "@mui/material";
import Autocomplete from "@mui/joy/Autocomplete";
import {Button, FormControl, FormLabel, TextField} from "@mui/joy";
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
    authorGrade: number
    tags: Array<{ title: string }>
}
function TestUseFormik() {

    const [inputValue, setInputValue] = useState('')

    const formik = useFormik({
        initialValues: {
            reviewTitle: '',
            authorGrade: 2,
            tags: [tagsOptions[1]]
        },
        validationSchema: Yup.object().shape({
            reviewTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            authorGrade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
            // tags: Yup.string()
            //     .min(2, 'Too Short!')
            //     .max(30, 'Too Long!')
            //     .required('Field is required'),
        }),
        onSubmit: (values: FormikValues) => {
            // props.handleClose()
            alert(JSON.stringify(values, null, 2));
        },
    })

    return (
<div>
       <form onSubmit={formik.handleSubmit}>

                <TextField
                    sx={{width: '60%'}}
                    id="reviewTitle"
                    name="reviewTitle"
                    label="Review title"
                    value={formik.values.reviewTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.reviewTitle && Boolean(formik.errors.reviewTitle)}
                    helperText={formik.touched.reviewTitle && formik.errors.reviewTitle}
                />

       </form>
    <FormControl>
        <FormLabel>Tags</FormLabel>
        <Autocomplete
            multiple
            id={'tags'}
            placeholder={'tags'}
            options={tagsOptions}
            value={formik.values.tags}
            isOptionEqualToValue={(option: string | {title: string}, value: string | {title: string}) => {
                const optionTitle = typeof option === "string" ? option : option.title;
                const valueTitle = typeof value === "string" ? value : value.title;
                return optionTitle === valueTitle;
            }}
            limitTags={5}
            sx={{width: '60%'}}
            onChange={(event, value) => {
                console.log('now value: ', value)
                    formik.setFieldValue('tags',value);
            }}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                return option.title;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            onInputChange={(event, value) => {
                setInputValue(value)
            }}
            inputValue={inputValue}

        />
    </FormControl>

    <form onSubmit={formik.handleSubmit}>

        <TextField
            sx={{width: '60%'}}
            id="authorGrade"
            name="authorGrade"
            label="Author Grade "
            value={formik.values.authorGrade}
            onChange={formik.handleChange}
            error={formik.touched.authorGrade && Boolean(formik.errors.authorGrade)}
            helperText={formik.touched.authorGrade && formik.errors.authorGrade}
        />
    </form>
    <form onSubmit={formik.handleSubmit}>
        <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
            Submit
        </Button>
    </form>

</div>

    )
}

export default TestUseFormik