import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, FormLabel, Textarea, TextField} from "@mui/joy";
import {UpdateReviewImage} from "./UpdateReviewImage";
import {imageDefault} from "../../../common/imageDefault";
import {useAppDispatch, useAppSelector} from "../../../common/utils/hooks";
import {updateReviewTC} from "../../../store/reducers/reviewsReducer";
import {CategoryAutocomplete} from "../common/CategoryAutocomplete";
import {TagsAutocomplete} from "../common/TagsAutocomplete";

// const categoryOptions = [
//     {title: 'movie'},
//     {title: 'book'},
//     {title: 'game'},
//     {title: 'comic'},
//     {title: 'music'},
//     {title: 'art'},
//     {title: 'show'},
// ]
// const tagsOptions = [
//     {title: '90s'},
//     {title: '2022'},
//     {title: '2021'},
//     {title: 'adventures'},
//     {title: 'classic'},
//     {title: 'rock'},
//     {title: 'jazz'},
//     {title: 'helicopter'},
// ]

type UpdateType = {
    oldValues: {
        category: { title: string },
        reviewTitle: string,
        workTitle: string,
        tags: Array<{title: string | string}>,
        reviewText: string,
        authorGrade: number,
        imageURL: string,
    }

    reviewId: string
    handleClose: () => void
}

function UpdateReviewForm({ reviewId,oldValues, ...props}:UpdateType) {


    const tagsOptions = useAppSelector(state => state.tags.tags)
    const categoryOptions = useAppSelector(state => state.tags.categories)
    const dispatch = useAppDispatch()
    const [image, setImage] = useState('');

    const setReviewImage = (file64: string) => {
        setImage(file64);
    }
    const deleteReviewImage = () => {
        setImage(imageDefault)
    }

    const formik = useFormik({
        initialValues: {
            category: oldValues.category,
            reviewTitle: oldValues.reviewTitle,
            workTitle: oldValues.workTitle,
            tags: oldValues.tags,
            reviewText: oldValues.reviewText,
            authorGrade: oldValues.authorGrade
        },
        validationSchema: Yup.object().shape({
            category: Yup.object()
                // .min(2, 'Too Short!')
                // .max(20, 'Too Long!')
                .required('Field is required'),
            reviewTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            workTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Field is required'),
            // tags: Yup.string()
            //     .min(2, 'Too Short!')
            //     .max(30, 'Too Long!')
            //     .required('Field is required'),
            reviewText: Yup.string()
                .min(5, 'Too Short!')
                .max(2000, 'Too Long!')
                .required('Field is required'),
            authorGrade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
        }),
        onSubmit: (values) => {


            alert(JSON.stringify(values, null, 2));
            dispatch(updateReviewTC(reviewId, values))
            props.handleClose()

        },
    });
    return (
        <div >
            <div  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} >
                <CategoryAutocomplete categoryOptions={categoryOptions} value={formik.values.category} setFieldValue={formik.setFieldValue} />
            </div>
            <form  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
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
                <TextField
                    sx={{width: '60%'}}
                    id="workTitle"
                    name="workTitle"
                    label="Work title"
                    value={formik.values.workTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.workTitle && Boolean(formik.errors.workTitle)}
                    helperText={formik.touched.workTitle && formik.errors.workTitle}
                />

                <TagsAutocomplete tagsOptions={tagsOptions} values={formik.values.tags} setFieldValue={formik.setFieldValue} />

                <FormLabel>Review text </FormLabel>
                <Textarea
                    minRows={3}
                    sx={{width: '60%'}}
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
                    id="authorGrade"
                    name="authorGrade"
                    placeholder="Grade"
                    value={formik.values.authorGrade}
                    onChange={formik.handleChange}
                    error={formik.touched.authorGrade && Boolean(formik.errors.authorGrade)}
                    helperText={formik.touched.authorGrade && formik.errors.authorGrade}
                />

                <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    Update
                </Button>
            </form>

        </div>
    )
}

export default UpdateReviewForm;