import { Paper, Rating } from "@mui/material";
import React, {useCallback, useState} from "react";
import s from './Review.module.scss'
import {Avatar, Box, Chip, IconButton, Stack, Typography} from "@mui/joy";
import {NavLink, useNavigate} from "react-router-dom";
import {PROFILE_PAGE, REVIEW_PAGE} from "../../Routing";
import UpdateReviewModal from "./UpdateReview/UpdateReviewModal";
import DeleteReviewModal from "./DeleteReview/DeleteReviewModal";
import DeleteModal from "../commonComponents/DeleteModal";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {dislikeReviewTC, likeReviewTC, TagsType} from "../../store/reducers/reviewsReducer";
import LikeComponent from "../commonComponents/LikeComponent";
import RatingComponent from "../commonComponents/RatingComponent";


type ReviewPropsType = {
    author: boolean
    reviewId: string
    imageURL: string
    userName: string
    category: { title: string },
    tags: TagsType,
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewTitle: string
    workTitle: string
    reviewText: string
    comments: number
    authorGrade: number
    createdAt: string
    rating: number
}

function Review({author, userName, tags, likes,imageURL, reviewId,
                   reviewTitle, workTitle, reviewText, category, authorGrade,
                    createdAt, rating,comments,...props}: ReviewPropsType) {

    const navigate = useNavigate()
const dispatch = useAppDispatch()
    const [ratingChanging, setRating] = useState<number | null>(2.5);
    // const overallRatingValue =
    // const [author, setAuthor] = useState(true)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedUserId = useAppSelector(state => state.auth.user.id)
    const like = likes.find(l => l.userId === loggedUserId)


    const search = useAppSelector(state => state.reviews.search)

    const includeSearch = (str: string) => {

        if (search && str.includes(search)) {
            const regex = new RegExp(search, 'gi')
            const matchValue = str.match(regex)

            if (matchValue) {
                return str.split(regex).map((s, i, arr) =>{
                    if (i < arr.length - 1) {
                        const c = matchValue.shift()
                        return <>{s}<span style={{backgroundColor: 'yellow'}}>{c}</span></>
                    }
                    return s
                } )
            }

            return str

        }
        return str
    }

    // const light = useCallback((str: string ) => {}, search)

    return (
        <Paper className={s.review} elevation={12}>
            {
                author && <Stack className={s.tools} direction="row" spacing={2} justifyContent="right">
                    <div>
                        <UpdateReviewModal reviewId={reviewId} oldValues={{tags,imageURL, reviewTitle, workTitle, reviewText, category, authorGrade }}/>
                    </div>
                    <DeleteModal reviewId={reviewId} title={reviewTitle} type={'review'}/>
                    <div style={{padding: '6px', fontSize: '11px', color: 'gray'}}><NavLink to={'/*'}>Открыть в режиме
                        просмотра</NavLink></div>
                </Stack>
            }

            <Box className={s.reviewBox}>

                <Box style={{display: 'inline-flex', alignItems: 'center'}}>
                    <Avatar onClick={() => {navigate(`${PROFILE_PAGE}/${userName}`)}} sx={{"--Avatar-size": "20px"}}/>
                    <a href={`${PROFILE_PAGE}/${userName}`} style={{fontSize: '14px', fontWeight: 'bold'}} className={s.reviewTitle}>{userName}</a>
                </Box>

                <div style={{fontSize: '24px', fontWeight: 'bold'}}>
                    <NavLink className={s.reviewTitle} to={`${REVIEW_PAGE}/${userName}/${reviewId}`}>
                        {includeSearch(reviewTitle)}
                    </NavLink></div>

                <Stack width={'100%'} direction="row" spacing={2} justifyContent="space-between" alignItems={'center'}>
                    <div>
                        <span style={{fontSize: '18px'}}>{includeSearch(workTitle)}</span>

                    </div>

                    <Stack direction="row" spacing={1} alignItems={'center'}>
                        <Box>
                            <Chip sx={{marginLeft: '8px'}} color="info">{category.title}</Chip>
                        </Box>
                        <Box color={'gray'}>Average rating:</Box>
                        <Box>

                            <Rating size="large" name="read-only" value={rating} readOnly/>

                        </Box>
                    </Stack>
                </Stack>

                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    {tags.map(t => {
                        return <Chip key={t.title} color={'neutral'} size={'sm'} variant={'soft'}>
                            {t.title}
                        </Chip>
                    })}
                </Box>

                <Typography mb={1} lineHeight="sm" textAlign={'start'} margin={'8px 0px'}>
                    {
                        reviewText.length < 35 && <>{includeSearch(reviewText)}</>
                    }
                    {
                        reviewText.length > 35 &&
                        <>{includeSearch(reviewText.slice(0, 20))}
                            {'....'}
                            <NavLink to={`${REVIEW_PAGE}/${userName}/${reviewId}`} style={{color: 'grey'}} className={s.reviewTitle}>Читать
                                больше </NavLink>
                        </>
                    }
                </Typography>

                <div style={{
                    minHeight: '120px',
                    maxHeight: '500px',
                    backgroundImage: `url(${imageURL})`,
                    backgroundSize: 'cover',
                    width: '100%'
                }}></div>

                <Stack sx={{margin: '12px 4px 8px 4px'}} width={'100%'} direction="row" spacing={2}
                       justifyContent="space-between">
                    <div>
                        <Typography>Author grade: <Typography variant="outlined" color="success">
                            <b>{authorGrade}</b>/10
                        </Typography></Typography>

                    </div>
                    <Box>
                        👉 <RatingComponent reviewId={reviewId} />
                    </Box>
                </Stack>


            </Box>
            <Stack className={s.bottom} direction="row" spacing={2} justifyContent="space-around">
                {/*<div>*/}
                {/*    <IconButton onClick={handleLike} size="sm" color="danger">*/}
                {/*        { !!like ? <div>❤</div> : <div style={{display: "inline-block"}}>🤍</div> }*/}
                {/*    </IconButton>*/}
                {/*    {*/}
                {/*        !!like*/}
                {/*            ? <span style={{color: '#e81224'}}>{likes.length}</span>*/}
                {/*            : <span style={{color: '#ffffff'}}>{likes.length}</span>*/}
                {/*    }*/}

                {/*</div>*/}
                <LikeComponent  likes={likes} reviewId={reviewId} current={'none'}/>

                <div>
                    <IconButton onClick={() => {
                        navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                    }} size="sm" color="neutral">
                        💬
                    </IconButton>
                    <span style={{color: '#166d3d'}}>{comments}</span>
                </div>
                <div style={{padding: '6px'}}>{createdAt.slice(0, 10)}</div>
            </Stack>
        </Paper>
    )
}

export default Review;