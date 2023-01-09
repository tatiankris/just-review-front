import { Paper, Rating } from "@mui/material";
import React, {useEffect, useState} from "react";
import s from './SearchReview.module.scss'
import {Avatar, Box, Chip, Grid, IconButton, Stack, Typography} from "@mui/joy";
import {NavLink, useNavigate} from "react-router-dom";
import {PROFILE_PAGE, REVIEW_PAGE} from "../../Routing";
import UpdateReviewModal from "./UpdateReview/UpdateReviewModal";
import DeleteModal from "../commonComponents/DeleteModal";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {setSearchAC, TagsType} from "../../store/reducers/reviewsReducer";
import LikeComponent from "../commonComponents/LikeComponent";
import { useMediaQuery } from 'react-responsive'
import RatingComponent from "../commonComponents/RatingComponent";
import {useTranslation} from "react-i18next";


type ReviewPropsType = {
    author?: boolean
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
    avatar?: string | null
}

function SearchReview({author, userName, tags, likes,imageURL, reviewId,
                   reviewTitle, workTitle, reviewText, category, authorGrade,
                    createdAt,rating, comments, avatar, ...props}: ReviewPropsType) {

    const iSmallScreen = useMediaQuery({ query: '(max-width: 728px)' })
    console.log('iSmallScreen', iSmallScreen)

    const navigate = useNavigate()
const dispatch = useAppDispatch()

    // const [ratingChanging, setRating] = useState<number | null>(2.5);
    // const overallRatingValue =
    // const [author, setAuthor] = useState(true)

    // useEffect(() => {
    //     // alert('changing')
    // }, [rating])

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedUserId = useAppSelector(state => state.auth.user.id)
    const like = likes.find(l => l.userId === loggedUserId)

    const search = useAppSelector(state => state.reviews.search)
    const { t } = useTranslation();
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

    const renderTags = tags.length > 5 ? tags.slice(0, 5) : tags

    const theme = useAppSelector(state => state.app.mode)


    return (
        <Paper className={s.review} elevation={12}>
            {/*{*/}
            {/*    author && <Stack className={s.tools} direction="row" spacing={2} justifyContent="right">*/}
            {/*        <div>*/}
            {/*            <UpdateReviewModal reviewId={reviewId} oldValues={{tags,imageURL, reviewTitle, workTitle, reviewText, category, authorGrade }}/>*/}
            {/*        </div>*/}
            {/*        <DeleteModal reviewId={reviewId} title={reviewTitle} type={'review'}/>*/}
            {/*        <div style={{padding: '6px', fontSize: '11px', color: 'gray'}}><NavLink to={'/*'}>Открыть в режиме*/}
            {/*            просмотра</NavLink></div>*/}
            {/*    </Stack>*/}
            {/*}*/}
            {iSmallScreen &&
                <Box className={theme ? `${s.darkBox}` : ''}>
                    <Box sx={{':hover': {cursor: 'pointer'}}}
                         onClick={(event) => {
                             event.stopPropagation()
                             navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                             dispatch(setSearchAC(''))
                         }}>
                        <div className={s.image} style={{backgroundImage: `url(${imageURL})`, backgroundSize: 'cover'}}>
                            <div className={theme ? `${s.categoryZ} ${s.categoryDark}` : `${s.categoryZ}`}>{category.title}</div>
                        </div>
                    </Box>
                    <Box sx={{':hover': {cursor: 'pointer'}}}
                         onClick={(event) => {
                             event.stopPropagation()
                             navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                             dispatch(setSearchAC(''))
                         }} style={{padding: '10px 20px 10px 10px'}}>
                        <Box>
                            <Box className={s.userLink}>
                                <Avatar src={avatar ? avatar : ''} className={s.avatar} onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`${PROFILE_PAGE}/${userName}`)
                                }} sx={{"--Avatar-size": "16px"}}/>
                                <span onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(setSearchAC(''))
                                    navigate(`${PROFILE_PAGE}/${userName}`)}}
                                      style={{fontSize: '10px', fontWeight: 'bold'}}

                                      className={theme ? `${s.dark} ${s.link}` : `${s.link}`}>{userName}</span>
                                {/*<a href={`${PROFILE_PAGE}/${userName}`} className={theme ? `${s.dark} ${s.link}` : `${s.link}`}>{userName}</a>*/}
                            </Box>

                            <Box className={s.titles}>
                                <NavLink className={theme ? `${s.dark} ${s.link}` : `${s.link}`}
                                         to={`${REVIEW_PAGE}/${userName}/${reviewId}`}>
                                    {includeSearch(reviewTitle)}
                                </NavLink>
                                <div>
                                    <span className={theme ? `${s.darkWork} ${s.workTitle}` : `${s.workTitle}`}>{includeSearch(workTitle)}</span>
                                </div>
                            </Box>
                            <div className={s.reviewText}>
                                {
                                    reviewText.length < 42 && <>{includeSearch(reviewText)}
                                        {'....'}
                                    </>
                                }
                                {
                                    reviewText.length > 42 &&
                                    <>{includeSearch(reviewText.slice(0, 42))}
                                        {'....'}
                                        {/*<NavLink to={`${REVIEW_PAGE}/${userName}/${reviewId}`} style={{color: 'grey'}}*/}
                                        {/*         className={s.reviewTitle}>*/}
                                        {/*    Read more*/}
                                        {/*</NavLink>*/}
                                    </>
                                }
                            </div>
                        </Box>
                        <Box>
                            <Box>
                                <div className={s.authorGrade}>
                                    <div className={theme ? `${s.darkGrade} ${s.gradeX}` : `${s.gradeX}`}><b style={{color: theme ? '#444242' : 'white'}}>{authorGrade}</b>/10</div>
                                </div>
                                <Stack className={s.overallRating} direction="row">
                                    <Box>
                                        <Rating name="read-only" value={Number(rating)} readOnly/>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box className={s.setRating}>
                                To rate the review, go to the review page...
                            </Box>
                            <Box className={s.tags}>
                                {renderTags.map(t => {
                                    return <div className={theme ? `${s.darkTag} ${s.tag}` : `${s.tag}`} key={t.title}>
                                        {t.title}
                                    </div>
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {
                !iSmallScreen &&

                <Grid marginBottom={0}
                    container spacing={2} className={theme ? `${s.darkBox}` : ``}>

                    <Grid
                        sx={{':hover': {cursor: 'pointer'}}}
                        onClick={(event) => {
                            event.stopPropagation()
                            navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                            dispatch(setSearchAC(''))
                        }}
                        xs={3}>
                        <div className={s.image} style={{backgroundImage: `url(${imageURL})`, backgroundSize: 'cover'}}>
                            <div className={theme ? `${s.categoryZ} ${s.categoryDark}` : `${s.categoryZ}`}>{category.title}</div>
                        </div>
                    </Grid>

                    <Grid xs={9} className={`${s.infoGrid}`}>
                        <Box sx={{':hover': {cursor: 'pointer'}}}
                             onClick={(event) => {
                                 event.stopPropagation()
                                 dispatch(setSearchAC(''))
                                 navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                             }}>
                            <Box className={s.userLink}>
                                <Avatar src={avatar ? avatar : ''}  className={s.avatar} onClick={() => {
                                    navigate(`${PROFILE_PAGE}/${userName}`)
                                }} sx={{"--Avatar-size": "20px"}}/>
                                <span onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(setSearchAC(''))
                                    navigate(`${PROFILE_PAGE}/${userName}`)}}
                                    style={{fontSize: '14px', fontWeight: 'bold'}}

                                   className={theme ? `${s.dark} ${s.link}` : `${s.link}`}>{userName}</span>
                            </Box>

                            <Box className={s.titles}>
                                <NavLink className={theme ? `${s.dark} ${s.link}` : `${s.link}`}
                                         to={`${REVIEW_PAGE}/${userName}/${reviewId}`}>
                                    {includeSearch(reviewTitle)}
                                </NavLink>
                                <div>
                                    <span className={theme ? `${s.darkWork} ${s.workTitle}` : `${s.workTitle}`}>{includeSearch(workTitle)}</span>
                                </div>
                            </Box>
                            <Typography className={theme ? `${s.darkReview} ${s.reviewText}` : `${s.reviewText}`} mb={1} lineHeight="sm" textAlign={'start'}
                                        margin={'8px 0px'}>
                                {
                                    reviewText.length < 42 && <>{includeSearch(reviewText)}
                                        {'....'}
                                    </>
                                }
                                {
                                    reviewText.length > 42 &&
                                    <>{includeSearch(reviewText.slice(0, 42))}
                                        {'....'}
                                        {/*<NavLink to={`${REVIEW_PAGE}/${userName}/${reviewId}`} style={{color: 'grey'}}*/}
                                        {/*         className={s.reviewTitle}>*/}
                                        {/*    Read more*/}
                                        {/*</NavLink>*/}
                                    </>
                                }
                            </Typography>
                            <Box className={s.tags}>
                                {renderTags.map(t => {
                                    return <div className={theme ? `${s.darkTag} ${s.tag}` : `${s.tag}`} key={t.title}>
                                        {t.title}
                                    </div>
                                })}
                            </Box>

                        </Box>

                        <Box className={s.gradesGrid}>

                            <Box>
                                <div className={s.authorGrade}>
                                    <Box>{t('review.authorGrade')}:</Box>
                                    <div className={theme ? `${s.darkGrade} ${s.gradeX}` : `${s.gradeX}`}><b style={{color: theme ? '#444242' : 'white'}}>{authorGrade}</b>/10</div>
                                </div>

                                <Stack className={s.overallRating} direction="row">

                                    <Box color={'gray'}>{t('review.averageRating')}:</Box>
                                    <Box>
                                        <Rating size="large" name="read-only" value={Number(rating)} readOnly/>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box className={s.setRating}>
                                👉 <RatingComponent reviewId={reviewId} />
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            }
            <Stack className={theme ? `${s.bottom} ${s.darkBottom}` : `${s.bottom}`} alignItems={'center'} direction="row" spacing={2} justifyContent="space-between">

                <div style={{padding: '6px'}}>{createdAt.slice(0, 10)}</div>
                <Stack direction={'row'} spacing={2}>
                    <div className={s.commentButton}>
                        <IconButton
                            variant={"plain"}
                            sx={{':hover' :{backgroundColor: '#addbff00'}}}
                            onClick={() => {
                            dispatch(setSearchAC(''))
                            navigate(`${REVIEW_PAGE}/${userName}/${reviewId}`)
                        }} size="sm" color="neutral">
                            💬
                        </IconButton>
                        <span style={{color: theme ? 'rgba(173,255,192,0.68)' : '#166d3d'}}>{comments}</span>
                    </div>
                    <LikeComponent likes={likes} reviewId={reviewId} current={"none"}/>
                </Stack>

            </Stack>
        </Paper>
    )
}

export default SearchReview;