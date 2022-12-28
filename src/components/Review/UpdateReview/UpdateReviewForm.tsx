import React, {useCallback, useMemo, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, FormLabel, Textarea, TextField} from "@mui/joy";
import {UpdateReviewImage} from "./UpdateReviewImage";
import {imageDefault} from "../../../common/imageDefault";
import {useAppDispatch, useAppSelector} from "../../../common/utils/hooks";
import {updateReviewTC} from "../../../store/reducers/reviewsReducer";
import {CategoryAutocomplete} from "../common/CategoryAutocomplete";
import {TagsAutocomplete} from "../common/TagsAutocomplete";
import st from '../CreateReview/CreateReview.module.scss'
import s from "../CreateReview/CreateReview.module.scss";
import SimpleMdeReact from "react-simplemde-editor";
import {UploadImage} from "../common/UploadImage/UploadImage";
import ReactDOMServer from "react-dom/server";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {Options} from "easymde";



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

    const [reviewText, setReviewText] = useState(oldValues.reviewText)
    const handleTextChange = useCallback ((text: string) => {
            setReviewText(text)
        }
        , [])

    const [image, setImage] = useState(oldValues.imageURL);
    const handleImage = (file64: string) => {
        setImage(file64)
    }
    const handleDelete = () => {
        setImage('')
    }

    const formik = useFormik({
        initialValues: {
            category: oldValues.category,
            reviewTitle: oldValues.reviewTitle,
            workTitle: oldValues.workTitle,
            tags: oldValues.tags,
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
            authorGrade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
        }),
        onSubmit: (values) => {


            alert(JSON.stringify(values, null, 2));
            dispatch(updateReviewTC(reviewId, {...values, reviewText, file: image}))
            props.handleClose()

        },
    });

    const customRendererOptions = useMemo(() => {
        return {
            previewRender() {
                return ReactDOMServer.renderToString(
                    <ReactMarkdown
                        children={reviewText}
                    />
                );
            },
        } as Options;
    }, []);

    return (
        <div className={st.container}>
            <div className={st.modalName}>
                Update Review
            </div>
            <div  className={st.category} >
                <CategoryAutocomplete categoryOptions={categoryOptions} value={formik.values.category} setFieldValue={formik.setFieldValue} />
            </div>
            <form  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                <TextField
                    className={st.item}
                    id="reviewTitle"
                    name="reviewTitle"
                    label="Review title"
                    value={formik.values.reviewTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.reviewTitle && Boolean(formik.errors.reviewTitle)}
                    helperText={formik.touched.reviewTitle && formik.errors.reviewTitle}
                />
                <TextField
                    className={st.item}
                    id="workTitle"
                    name="workTitle"
                    label="Work title"
                    value={formik.values.workTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.workTitle && Boolean(formik.errors.workTitle)}
                    helperText={formik.touched.workTitle && formik.errors.workTitle}
                />

                <TagsAutocomplete tagsOptions={tagsOptions} values={formik.values.tags} setFieldValue={formik.setFieldValue} />

                <FormLabel className={st.formLabel} >Review text </FormLabel>
                <SimpleMdeReact className={`${st.reviewText} ${st.item}`} id="reviewText" placeholder="Review text"
                                value={reviewText} onChange={handleTextChange} options={customRendererOptions}
                />

                <UploadImage handleDelete={handleDelete} image={image} handleImage={handleImage}/>

                <FormLabel sx={{width: '40%', marginTop: '14px'}}>Grade</FormLabel>
                <TextField
                    sx={{width: '40%'}}
                    type={'number'}
                    id="authorGrade"
                    name="authorGrade"
                    placeholder="Grade"
                    value={formik.values.authorGrade}
                    onChange={formik.handleChange}
                    error={formik.touched.authorGrade && Boolean(formik.errors.authorGrade)}
                    helperText={formik.touched.authorGrade && formik.errors.authorGrade}
                />
                <div style={{color: 'grey'}}>Evaluation of the work (from 1 to 10)</div>
                <Button sx={{marginTop: '6px', marginBottom: '20px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    Update
                </Button>
            </form>
        </div>
    )
}

export default UpdateReviewForm;