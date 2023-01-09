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
import {UploadImageButton} from "../common/UploadImage/UploadImageButton";
import {DragDropImage} from "../common/UploadImage/DragDropImage";
import {UploadImage} from "../common/UploadImage/UploadImage";
import {useTranslation} from "react-i18next";

type CreateType = {
    handleClose: () => void
    userId: string
}

export type CreateFormikType = {
    category: { title: string },
    reviewTitle: string,
    workTitle: string,
    tags: TagsType,
    authorGrade: number

}

function CreateReviewForm(props: CreateType) {

    const tagsOptions = useAppSelector(state => state.tags.tags)
    const categoryOptions = useAppSelector(state => state.tags.categories)
    const { t } = useTranslation();

    const dispatch = useAppDispatch()

    const [reviewText, setReviewText] = useState('')
    const handleTextChange = useCallback ((text: string) => {
            setReviewText(text)
        }
    , [])


    const [image, setImage] = useState('');
    const handleImage = (file64: string) => {
        setImage(file64)
    }
    const handleDelete = () => {
        setImage('')
    }

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
            authorGrade: Yup.number()
                .min(0, 'Invalid grade')
                .max(10, 'Invalid grade')
        }),
        onSubmit: (values) => {

            dispatch(createReviewTC({...values, reviewText, file: image}, props.userId))
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
                {t('createReview.new')}
            </div>
            <div className={s.category}>
                <CategoryAutocomplete categoryOptions={categoryOptions} value={formik.values.category} setFieldValue={formik.setFieldValue} />
            </div>
            <form  style={{ display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                <TextField
                    className={s.item}
                    // sx={{width: '100%'}}
                    id="reviewTitle"
                    placeholder={`${t('createReview.rTitle')}`}
                    name="reviewTitle"
                    label={`${t('createReview.rTitle')}`}
                    value={formik.values.reviewTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.reviewTitle && Boolean(formik.errors.reviewTitle)}
                    helperText={formik.touched.reviewTitle && formik.errors.reviewTitle}
                />
                <TextField
                    className={s.item}
                    // sx={{width: '100%'}}
                    id="workTitle"
                    placeholder={`${t('createReview.wTitle')}`}
                    name="workTitle"
                    label={`${t('createReview.wTitle')}`}
                    value={formik.values.workTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.workTitle && Boolean(formik.errors.workTitle)}
                    helperText={formik.touched.workTitle && formik.errors.workTitle}
                />

                <TagsAutocomplete tagsOptions={tagsOptions} values={formik.values.tags} setFieldValue={formik.setFieldValue} />

                <FormLabel className={s.formLabel}>{t('createReview.rText')}</FormLabel>
                <SimpleMdeReact className={`${s.reviewText} ${s.item}`} id="reviewText" placeholder={`${t('createReview.rText')}`}
                                value={reviewText} onChange={handleTextChange} options={customRendererOptions}
                />

               <UploadImage handleDelete={handleDelete} image={image} handleImage={handleImage}/>

                <FormLabel sx={{width: '40%', marginTop: '14px'}}>{t('createReview.grade')}</FormLabel>
                <TextField
                    sx={{width: '40%'}}
                    type={'number'}
                    id="authorGrade"
                    name="authorGrade"
                    placeholder={`${t('createReview.grade')}`}
                    value={formik.values.authorGrade}
                    onChange={formik.handleChange}
                    error={formik.touched.authorGrade && Boolean(formik.errors.authorGrade)}
                    helperText={formik.touched.authorGrade && formik.errors.authorGrade}
                />
                <div style={{color: 'grey'}}>{t('createReview.gradeInfo')}</div>
                <Button sx={{marginTop: '14px', marginBottom: '20px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    {t('createReview.create')}
                </Button>
            </form>

        </div>
    )
}

export default CreateReviewForm;