import {Paper} from "@mui/material";
import {
    Box, Button,
    FormControl,
    FormLabel,
    IconButton,
    ListItemDecorator,
    Menu,
    MenuItem,
    Textarea,
    Typography
} from "@mui/joy";
import s from "../ReviewPage.module.scss";
import {FormatBold, FormatItalic, KeyboardArrowDown} from "@mui/icons-material";
import Comment from './Comment'
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../common/utils/hooks";
import {CommentType, createCommentTC} from "../../../store/reducers/commentsReducer";
import {useParams} from "react-router-dom";
import {log} from "util";
import {useTranslation} from "react-i18next";

type CommentsPropsType ={
    comments: CommentType[]
}
function Comments({comments, ...props}: CommentsPropsType) {

    const dispatch = useAppDispatch()
    const {review} = useParams()
    const { t } = useTranslation();

    const [value, setValue ] = useState('')
    const handleSubmit = () => {
        if (!value.trim().length) {
            return console.log('Comment text is required')
        } else if (!review) {
            return console.log('review not found')
        } else {
            dispatch(createCommentTC(review, {text: value}))
            setValue('')
        }


    }


    return (
        <Paper sx={{backgroundColor: 'rgba(255, 226, 187, 0.57)', margin: '10px 0px 30px 0px'}} elevation={6}>
            <Box className={s.commentsBox}>
                <Typography padding={'4px'} fontSize={'14px'} fontWeight={'bold'}>
                    💬 {t('review.comments')}
                </Typography>

                {   comments &&
                    comments.map(c => {
                        return <Comment key={c._id} comment={c}/>
                    })
                }
                <FormControl className={s.formControl}>
                    <FormLabel>🖊 {t('review.sendComment')}</FormLabel>
                    <Textarea
                        placeholder={`${t('review.writeComment')}`}
                        minRows={3}
                        value={value}
                        onKeyPress={(e) => {if (e.key === "Enter" && !e.shiftKey) { handleSubmit() }} }
                        onChange={(e) => {setValue(String(e.currentTarget.value))}}
                        endDecorator={
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 'var(--Textarea-paddingBlock)',
                                    pt: 'var(--Textarea-paddingBlock)',
                                    // borderTop: '1px solid',
                                    // borderColor: 'divider',
                                    flex: 'auto',
                                }}
                            >
                                <Button onClick={handleSubmit} variant={'soft'} sx={{ml: 'start'}}>{t('review.send')}</Button>
                            </Box>
                        }
                        sx={{
                            minWidth: '40%',
                            maxWidth: '80%'
                            // fontWeight,
                            // fontStyle: italic ? 'italic' : 'initial',
                        }}
                    />
                </FormControl>
            </Box>
        </Paper>
    )

}

export default Comments;