import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, FormLabel, Textarea, TextField} from "@mui/joy";
import {UpdateReviewImage} from "./UpdateReviewImage";
import {imageDefault} from "../../../common/imageDefault";



function UpdateReviewForm() {

    const [image, setImage] = useState('');

    const setReviewImage = (file64: string) => {
        setImage(file64);
    }
    const deleteReviewImage = () => {
        setImage(imageDefault)
    }


    const formik = useFormik({
        initialValues: {
            category: 'film',
            reviewTitle: 'Поговорим о Гае Ричи',
            workTitle: 'Карты, деньги, два ствола',
            tags: '#90s',
            reviewText: 'film film film filmfilm film film film film filmfilm film',
            grade: 0
        },
        validationSchema: Yup.object().shape({
            category: Yup.string()
                .min(2, 'Too Short!')
                .max(20, 'Too Long!')
                .required('Field is required'),
            reviewTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            workTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            tags: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            reviewText: Yup.string()
                .min(5, 'Too Short!')
                .max(2000, 'Too Long!')
                .required('Field is required'),
            grade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div >
            <form  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{width: '100%'}}
                    id="category"
                    name="category"
                    label="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="reviewTitle"
                    name="reviewTitle"
                    label="Review title"
                    value={formik.values.reviewTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.reviewTitle && Boolean(formik.errors.reviewTitle)}
                    helperText={formik.touched.reviewTitle && formik.errors.reviewTitle}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="workTitle"
                    name="workTitle"
                    label="Work title"
                    value={formik.values.workTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.workTitle && Boolean(formik.errors.workTitle)}
                    helperText={formik.touched.workTitle && formik.errors.workTitle}
                />

                <TextField
                sx={{width: '100%'}}
                id="tags"
                name="tags"
                label="Tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
            />
                <FormLabel>Review text </FormLabel>
                <Textarea
                    minRows={3}
                    sx={{width: '100%'}}
                    id="reviewText"
                    name="reviewText"
                    placeholder="Review text"
                    value={formik.values.reviewText}
                    onChange={formik.handleChange}
                    error={formik.touched.reviewText && Boolean(formik.errors.reviewText)}
                />
                {
                formik.touched.reviewText && <div style={{color: 'red'}}>{formik.errors.reviewText}</div>
            }




                <UpdateReviewImage callback={setReviewImage} />
                <div>
                    <img src={image} width={'100%'} height={'180px'} style={{display: 'inline-block', marginTop: '8px'}}/>
                    <Button color={'danger'} onClick={deleteReviewImage} variant="outlined">Delete uploaded image</Button>
                </div>

                <FormLabel>Grade</FormLabel>
                <TextField
                    type={'number'}
                    id="grade"
                    name="grade"
                    placeholder="Grade"
                    value={formik.values.grade}
                    onChange={formik.handleChange}
                    error={formik.touched.grade && Boolean(formik.errors.grade)}
                    helperText={formik.touched.grade && formik.errors.grade}
                />

                <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    Update
                </Button>
            </form>

        </div>
    )
}

export default UpdateReviewForm;