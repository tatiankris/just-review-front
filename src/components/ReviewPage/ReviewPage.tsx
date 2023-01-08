import React, {useEffect} from "react";
import s from './ReviewPage.module.scss'
import {Avatar, Box, Chip, Container, IconButton, Stack, Typography} from "@mui/joy";
import {Paper, Rating} from "@mui/material";
import Comments from './CommentField/Comments'
import {PROFILE_PAGE, REVIEW_PAGE} from "../../Routing";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {getCurrentReviewsTC, getReviewsTC, setSearchAC} from "../../store/reducers/reviewsReducer";
import LikeComponent from "../commonComponents/LikeComponent";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import RatingComponent from "../commonComponents/RatingComponent";
import {useTranslation} from "react-i18next";
import SearchPage from "../SearchPage/SearchPage";

const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

function ReviewPage() {

    // `${REVIEW_PAGE}/:username/:review`
    const reviews = useAppSelector(state => state.reviews.reviews)
    const current = useAppSelector(state => state.reviews.currentReview)
    const comments = useAppSelector(state => state.comments.comments)
    const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const search = useAppSelector(state => state.reviews.search)
    const {username, review} = useParams()


    useEffect(() => {
        // dispatch(getReviewsTC(review, false))

        if (review) {
            console.log('review', review)

            dispatch(getCurrentReviewsTC(review))
        }
    }, [review])

    // console.log('current', current)

    useEffect(() => {
        dispatch(setSearchAC(''))
    }, [])

    if (search.length) {
        return <SearchPage notMain />
    }

    return (
        <Container maxWidth="md"
                   sx={{marginTop: '80px', marginBottom: '20px'}}
        >

            {current &&
                <Paper  sx={{marginBottom: '8px'}} elevation={12}>

                        <Box className={s.reviewBox}>

                            <Box style={{display: 'inline-flex', alignItems: 'center'}}>
                                <Avatar onClick={() => {navigate(`${PROFILE_PAGE}/${current.userName}`)}} sx={{"--Avatar-size": "20px"}}/>
                                <a href={`${PROFILE_PAGE}/${current.userName}`} style={{fontSize: '14px', fontWeight: 'bold'}} className={s.reviewTitle}>{current.userName}</a>
                            </Box>

                        <div style={{fontSize: '24px', fontWeight: 'bold'}}><span >{current.reviewTitle}</span></div>

                        <Stack width={'100%'} direction="row" spacing={2} justifyContent="space-between" alignItems={'center'}>
                            <div>
                                <span style={{fontSize: '18px'}}>{current.workTitle}</span>

                            </div>

                            <Stack direction="row" spacing={1}  alignItems={'center'}>
                                {current.category &&
                                <Box>
                                    <Chip sx={{marginLeft: '8px'}} color="info">{current.category.title}</Chip>
                                </Box>
                                }
                                <Box color={'gray'}>{t('review.averageRating')}:</Box>
                                <Box>
                                    <Rating size="large" value={Number(current.rating)} readOnly/>

                                </Box>
                            </Stack>
                        </Stack>

                            {
                                current.tags &&

                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                {
                                    current.tags.map(t => {
                                        return <Chip key={t.title} color={'neutral'} size={'sm'} variant={'soft'}>
                                            {t.title}
                                        </Chip>
                                    })
                                }
                            </Box>
                            }
                        {/*<Typography mb={1} lineHeight="sm" textAlign={'start'} margin={'8px 0px'} fontSize={20}>*/}
                        {/*    <ReactMarkdown*/}
                        {/*        children={current.reviewText}*/}
                        {/*    />*/}
                        {/*</Typography>*/}
                            <ReactMarkdown
                                children={current.reviewText}
                            />


                        {/*<div style={{minHeight: '120px', maxHeight: '500px', backgroundImage: `url(${URL})`, backgroundSize: 'cover', width: '100%'}}></div>*/}
                            {
                                current.imageURL &&
                                <img src={`${current.imageURL}`} style={{minHeight: '120px', width: '100%'}}/>
                            }
                        <Stack sx={{margin: '12px 4px 8px 4px'}} width={'100%'} direction="row" spacing={2} justifyContent="space-between">
                            <div>
                                <Typography>{t('review.authorGrade')}: <Typography variant="outlined" color="success">
                                    <b>{current.authorGrade}</b>/10
                                </Typography></Typography>

                            </div>
                            <Box>
                                👉 <RatingComponent reviewId={current._id} current />
                            </Box>
                        </Stack>


                    </Box>
                    <Stack className={s.bottom} direction="row" spacing={2} justifyContent="space-around">
                        { current.likes &&
                            <LikeComponent likes={current.likes} reviewId={current._id} current={'current'} />
                        }
                        {
                            current.createdAt &&
                        <div style={{padding: '6px' }}>{current.createdAt.slice(0,10)}</div>
                   }
                    </Stack>


                </Paper>
            }
            {current &&
                <Comments comments={comments} />
            }

            {!current && <div>{t('review.notFound')}</div>}



        </Container>
    )

}

// const MyComponent = ({visibility}: {visibility: 'hidden' | 'visible'}) => createPortal(<div style={{visibility}}><ReviewPage/></div>, document.getElementById('appid')!)
export default ReviewPage;


