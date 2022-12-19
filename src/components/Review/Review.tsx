import { Paper, Rating } from "@mui/material";
import React, {useState} from "react";
import s from './Review.module.scss'
import {Avatar, Box, Chip, IconButton, Stack, Typography} from "@mui/joy";
import {NavLink, useNavigate} from "react-router-dom";
import {REVIEW_PAGE} from "../../Routing";
import UpdateReviewModal from "./UpdateReview/UpdateReviewModal";
import DeleteReviewModal from "./DeleteReview/DeleteReviewModal";
import DeleteModal from "../../common/DeleteModal";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {dislikeReviewTC, likeReviewTC} from "../../store/reducers/reviewsReducer";


type ReviewPropsType = {
    reviewId: string
    imageURL: string
    userName: string
    category: { title: string },
    tags: Array<{title: string | string}>,
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewTitle: string
    workTitle: string
    reviewText: string
    comments: number
    authorGrade: number
    createdAt: string
    overallRating: {1: number, 2: number, 3: number, 4: number, 5: number}
}

function Review({userName, tags, likes,imageURL, reviewId,
                   reviewTitle, workTitle, reviewText, category, authorGrade,
                    createdAt, overallRating,comments,...props}: ReviewPropsType) {

    const navigate = useNavigate()
const dispatch = useAppDispatch()
    const [rating, setRating] = useState<number | null>(2.5);
    // const overallRatingValue =
    const [author, setAuthor] = useState(true)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedUserId = useAppSelector(state => state.auth.user.id)
    const like = likes.find(l => l.userId === loggedUserId)

    // const [liked, setLiked] = useState(!!like)
    const handleLike = () => {
        if (isLoggedIn) {
            if (!!like && loggedUserId) {
                dispatch(dislikeReviewTC(reviewId))
            }
            if (!like && loggedUserId) {
                dispatch(likeReviewTC(reviewId))
            }
        } else {
            alert('Log IN!!')
        }
    }

    return (
        <Paper className={s.review} elevation={12}>
            {
                author && <Stack className={s.tools} direction="row" spacing={2} justifyContent="right">
                    <div>
                        <UpdateReviewModal reviewId={reviewId} oldValues={{tags,imageURL, reviewTitle, workTitle, reviewText, category, authorGrade }}/>
                    </div>

                    {/*<DeleteReviewModal reviewTitle={reviewTitle}  reviewId={reviewId}/>*/}
             <DeleteModal reviewId={reviewId} title={reviewTitle} type={'review'}/>
                    <div style={{padding: '6px', fontSize: '11px', color: 'gray'}}><NavLink to={'/*'}>Открыть в режиме
                        просмотра</NavLink></div>
                </Stack>
            }

            <Box className={s.reviewBox}>

                <Box style={{display: 'inline-flex', alignItems: 'center'}}><Avatar sx={{
                    "--Avatar-size": "20px"
                }}/>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>{userName}</span>
                </Box>

                <div style={{fontSize: '24px', fontWeight: 'bold'}}>
                    <NavLink target={'_blank'} className={s.reviewTitle} to={`${REVIEW_PAGE}/${userName}/${reviewId}`}>
                        {reviewTitle}
                    </NavLink></div>

                <Stack width={'100%'} direction="row" spacing={2} justifyContent="space-between" alignItems={'center'}>
                    <div>
                        <span style={{fontSize: '18px'}}>{workTitle}</span>

                    </div>

                    <Stack direction="row" spacing={1} alignItems={'center'}>
                        <Box>
                            <Chip sx={{marginLeft: '8px'}} color="info">{category.title}</Chip>
                        </Box>
                        <Box color={'gray'}>Overall rating:</Box>
                        <Box>

                            <Rating size="large" name="read-only" value={4} readOnly/>

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
                    {reviewText}
                    {reviewText}
                    {reviewText}
                    {' '}
                    <NavLink to={`${REVIEW_PAGE}/${userName}/${reviewId}`} style={{color: 'grey'}} className={s.reviewTitle}>Читать
                        больше... </NavLink>
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
                        👉 <Rating name="controlled"
                                   value={rating}
                                   onChange={(event, newValue) => {
                                       setRating(newValue);
                                   }}/>
                    </Box>
                </Stack>


            </Box>
            <Stack className={s.bottom} direction="row" spacing={2} justifyContent="space-around">
                <div>
                    <IconButton onClick={handleLike} size="sm" color="danger">
                        { !!like ? <div>❤</div> : <div style={{display: "inline-block"}}>🤍</div> }
                    </IconButton>
                    {
                        !!like
                            ? <span style={{color: '#e81224'}}>{likes.length}</span>
                            : <span style={{color: '#ffffff'}}>{likes.length}</span>
                    }

                </div>

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