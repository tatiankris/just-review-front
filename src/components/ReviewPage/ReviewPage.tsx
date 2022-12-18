import React, {useEffect} from "react";
import s from './ReviewPage.module.scss'
import {Avatar, Box, Chip, Container, IconButton, Stack, Typography} from "@mui/joy";
import {Paper, Rating} from "@mui/material";
import Comments from './CommentField/Comments'
import {REVIEW_PAGE} from "../../Routing";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useParams} from "react-router-dom";
import {getReviewsTC} from "../../store/reducers/reviewsReducer";

const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

function ReviewPage() {

    // `${REVIEW_PAGE}/:username/:review`
    const reviews = useAppSelector(state => state.reviews.reviews)
    const current = useAppSelector(state => state.reviews.currentReview)
    const comments = useAppSelector(state => state.comments.comments)

    const dispatch = useAppDispatch()

    const {username, review} = useParams()
    console.log('review', review)

    ///НЕ ПОПАДАЕТ В ISEeFFECT!!!
    useEffect(() => {
        // debugger
            console.log('diiiss')
            dispatch(getReviewsTC(review))
    }, [])

    console.log('current', current)

    return (
        <Container maxWidth="md"
                   sx={{marginTop: '80px'}}
        >

            {current &&
                <Paper  sx={{marginBottom: '8px'}} elevation={12}>

                        <Box className={s.reviewBox}>

                        <Box style={{display: 'inline-flex', alignItems: 'center'}}>
                            <Avatar sx={{"--Avatar-size": "20px"}} />
                            <span style={{fontSize: '14px', fontWeight: 'bold'}}>{current.userName}</span>
                        </Box>

                        <div style={{fontSize: '24px', fontWeight: 'bold'}}><a className={s.reviewTitle} href={'*'}>{current.reviewTitle}</a></div>

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
                                <Box color={'gray'}>Overall rating:</Box>
                                <Box>

                                    <Rating size="large"  name="read-only" value={4} readOnly/>

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
                        <Typography mb={1} lineHeight="sm" textAlign={'start'} margin={'8px 0px'} fontSize={20}>
                            {current.reviewText}

                        </Typography>

                        <div style={{minHeight: '120px', maxHeight: '500px', backgroundImage: `url(${URL})`, backgroundSize: 'cover', width: '100%'}}></div>

                        <Stack sx={{margin: '12px 4px 8px 4px'}} width={'100%'} direction="row" spacing={2} justifyContent="space-between">
                            <div>
                                <Typography>Author grade: <Typography variant="outlined" color="success">
                                    <b>{current.authorGrade}</b>/10
                                </Typography></Typography>

                            </div>
                            <Box>
                                👉 <Rating/>
                            </Box>
                        </Stack>


                    </Box>
                    <Stack className={s.bottom} direction="row" spacing={2} justifyContent="space-around">
                        <div>
                            <IconButton size="sm" color="danger" >
                                ❤️
                            </IconButton>
                            <span style={{color: '#e81224'}}>{current.likes}</span>
                        </div>

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

            {!current && <div>not FOUND</div>}



        </Container>
    )

}

// const MyComponent = ({visibility}: {visibility: 'hidden' | 'visible'}) => createPortal(<div style={{visibility}}><ReviewPage/></div>, document.getElementById('appid')!)
export default ReviewPage;


