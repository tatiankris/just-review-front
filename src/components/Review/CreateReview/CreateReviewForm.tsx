import React, {useCallback, useMemo, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, FormControl, FormLabel, Textarea, TextField, Typography} from "@mui/joy";
import {UpdateReviewImage} from "../UpdateReview/UpdateReviewImage";
import {imageDefault} from "../../../common/imageDefault";
import {useAppDispatch, useAppSelector} from "../../../common/utils/hooks";
import {createReviewTC, TagsType} from "../../../store/reducers/reviewsReducer";
import {TagsAutocomplete} from "../common/TagsAutocomplete";
import s from './CreateReview.module.scss'
import Autocomplete from "@mui/joy/Autocomplete";
import {CategoryAutocomplete} from "../common/CategoryAutocomplete";
import SimpleMdeReact from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import "easymde/dist/easymde.min.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SimpleMDE from "react-simplemde-editor";
import {SimpleMDEReactProps} from "react-simplemde-editor/src/SimpleMdeReact";
import EasyMDE, { Options } from "easymde";

type CreateType = {
    handleClose: () => void
}

export type CreateFormikType = {
    category: { title: string },
    reviewTitle: string,
    workTitle: string,
    tags: TagsType,
    // reviewText: string,
    authorGrade: number
}

function CreateReviewForm(props: CreateType) {

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

    const [reviewText, setReviewText] = useState('')
    const handleTextChange = useCallback ((text: string) => {
            setReviewText(text)
        }
    , [])


    const formik = useFormik({
        initialValues: {
            category: categoryOptions[0],
            reviewTitle: '',
            workTitle: '',
            tags: [tagsOptions[1]],
            // reviewText: '',
            authorGrade: 0
        },
        validationSchema: Yup.object().shape({
            category: Yup.object()
                // .min(2, 'Too Short!')
                // .max(20, 'Too Long!')
                .required('Field is required'),
            reviewTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Field is required'),
            workTitle: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Field is required'),
            // tags: Yup.string()
            //     .min(2, 'Too Short!')
            //     .max(30, 'Too Long!')
            //     .required('Field is required'),
            // reviewText: Yup.string()
            //     .min(2, 'Too Short!')
            //     .max(2000, 'Too Long!')
            //     .required('Field is required'),
            authorGrade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
        }),
        onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));

            dispatch(createReviewTC({...values, reviewText}))
            props.handleClose()

        },
    })



        const extraKeys = useMemo(() => {
            return {
                Up: function (cm: any) {
                    cm.replaceSelection(" surprise. ");
                },
                Down: function (cm: any) {
                    cm.replaceSelection(" surprise again! ");
                },
            };
        }, []);

        // const customRendererOptions = useMemo(() => {
        //     return {
        //         previewRender() {
        //             return (
        //                 <ReactMarkdown
        //                     // source={text}
        //                     // renderers={{
        //                     //     CodeBlock: CodeRenderer,
        //                     //     Code: CodeRenderer,
        //                     // }}
        //                     children={formik.values.reviewText}
        //                 />
        //             );
        //         },
        //     } as SimpleMDE.options;
        // }, []);

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

    console.log('reviewText', reviewText)
    return (
        <div className={s.container}>
            <div className={s.modalName}>
                New Review
            </div>
            <div className={s.category}>
                <CategoryAutocomplete categoryOptions={categoryOptions} value={formik.values.category} setFieldValue={formik.setFieldValue} />
            </div>
            <form  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{width: '60%'}}
                    id="reviewTitle"
                    placeholder="Review title"
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
                    placeholder="Work title"
                    name="workTitle"
                    label="Work title"
                    value={formik.values.workTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.workTitle && Boolean(formik.errors.workTitle)}
                    helperText={formik.touched.workTitle && formik.errors.workTitle}
                />

                <TagsAutocomplete tagsOptions={tagsOptions} values={formik.values.tags} setFieldValue={formik.setFieldValue} />

                <FormLabel className={s.formLabel} >Review text </FormLabel>
                {/*<Textarea*/}
                {/*    minRows={3}*/}
                {/*    sx={{width: '60%'}}*/}
                {/*    id="reviewText"*/}
                {/*    name="reviewText"*/}
                {/*    placeholder="Review text"*/}
                {/*    value={formik.values.reviewText}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    error={formik.touched.reviewText && Boolean(formik.errors.reviewText)}*/}
                {/*    // helperText={formik.touched.reviewText && formik.errors.reviewText}*/}
                {/*/>*/}
                <SimpleMdeReact className={s.reviewText} id="reviewText" placeholder="Review text"
                                value={reviewText} onChange={handleTextChange} options={customRendererOptions}
                />

                <UpdateReviewImage callback={setReviewImage} />
                <div>
                    <img src={image} width={'100%'} height={'180px'} style={{display: 'inline-block', marginTop: '8px'}}/>
                    <Button color={'danger'} onClick={deleteReviewImage} variant="soft">Delete uploaded image</Button>
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
                    Create
                </Button>
            </form>

        </div>
    )
}

export default CreateReviewForm;