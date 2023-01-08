import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Review/Modal.module.scss'
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {deleteCommentTC} from "../../store/reducers/commentsReducer";
import {deleteReviewTC, dislikeReviewTC, likeReviewTC} from "../../store/reducers/reviewsReducer";

type LikePropsType = {
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewId: string
    current: 'current' | 'none'
}

function LikeComponent( { likes, reviewId,current, ...props }:LikePropsType ) {

    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.app.mode)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedUserId = useAppSelector(state => state.auth.user.id)
    const like = likes.find(l => l.userId === loggedUserId)


    const handleLike = () => {

        if (isLoggedIn) {
            if (!!like && loggedUserId) {
                current === 'current'
                    ? dispatch(dislikeReviewTC(reviewId, current))
                    : dispatch(dislikeReviewTC(reviewId, 'none'))

            }
            if (!like && loggedUserId) {

                current === 'current'
                ? dispatch(likeReviewTC(reviewId, current))
                : dispatch(likeReviewTC(reviewId, 'none'))
            }
        } else {
            alert('Log IN!!')
        }
    }

    return (
        <div>
            <IconButton onClick={handleLike} size="sm" color="danger"  variant={"plain"} sx={{':hover' :{backgroundColor: '#addbff00'},':active': {backgroundColor: 'none'} }}>
                { !!like
                    ? <div>❤</div>
                    : <div>🤍</div> }
            </IconButton>
            {
                !!like
                    ? <span style={{color: theme ? 'pink' : '#c4111f'}}>{likes.length}</span>
                    : <span style={{color: theme ? 'whitesmoke' : '#474343'}}>{likes.length}</span>
            }
        </div>

    );
}

export default LikeComponent