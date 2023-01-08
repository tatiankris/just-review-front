import React, { useState } from "react";
import {Button, Modal, Box, Typography, IconButton} from "@mui/joy";
import s from '../Review/Modal.module.scss'
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {deleteCommentTC} from "../../store/reducers/commentsReducer";
import {deleteReviewTC, dislikeReviewTC, likeReviewTC, ratedReviewTC} from "../../store/reducers/reviewsReducer";
import {Rating} from "@mui/material";

type LikePropsType = {
    reviewId: string
    current?: boolean
}

function RatingComponent( { reviewId,current, ...props }:LikePropsType ) {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const ratings = useAppSelector(state => state.auth.user.ratings)
    const rating = ratings&&isLoggedIn ? ratings.find(r => r.reviewId === reviewId) : {rating: 0}




    const handleRate = ( newValue: number | null) => {

        if (typeof  newValue === 'number') {
            current
                ? dispatch(ratedReviewTC(newValue, reviewId, current))
                : dispatch(ratedReviewTC(newValue, reviewId))
        }

    }

    return (
        <div>
            {
                isLoggedIn &&
                <Rating name="controlled"
                        value={rating ? rating.rating: 0}
                        onChange={(event, newValue) => {
                            event.stopPropagation()
                            handleRate(newValue);
                        }}/>
            }
            {
                !isLoggedIn &&
                <Rating onChange={() => {alert('Log In!')}}/>
            }
        </div>

    );
}

export default RatingComponent