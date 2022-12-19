import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Review/Modal.module.scss'
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {deleteCommentTC} from "../../store/reducers/commentsReducer";
import {deleteReviewTC, dislikeReviewTC, likeReviewTC} from "../../store/reducers/reviewsReducer";

type LikePropsType = {
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewId: string
    current?: boolean
}

function LikeComponent( { likes, reviewId,current, ...props }:LikePropsType ) {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedUserId = useAppSelector(state => state.auth.user.id)
    const like = likes.find(l => l.userId === loggedUserId)

    const handleLike = () => {
        if (isLoggedIn) {
            if (!!like && loggedUserId) {
                current
                    ? dispatch(dislikeReviewTC(reviewId, current))
                    : dispatch(dislikeReviewTC(reviewId))

            }
            if (!like && loggedUserId) {
                current
                ? dispatch(likeReviewTC(reviewId, current))
                : dispatch(likeReviewTC(reviewId))
            }
        } else {
            alert('Log IN!!')
        }
    }

    return (
        <div>
            <IconButton onClick={handleLike} size="sm" color="danger">
                { !!like
                    ? <div>❤</div>
                    : <div>🤍</div> }
            </IconButton>
            {
                !!like
                    ? <span style={{color: '#e81224'}}>{likes.length}</span>
                    : <span style={{color: '#ffffff'}}>{likes.length}</span>
            }
        </div>

    );
}

export default LikeComponent