import React, {useEffect} from "react";
import {Avatar, Box, Button, CircularProgress, Container, Grid} from "@mui/joy";
import Review from "../Review/Review";
import s from './ProfilePage.module.scss'
import Tags from "../Tags/Tags";
import {Backdrop, Paper} from "@mui/material";
import CreateReviewModal from "../Review/CreateReview/CreateReviewModal";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {getAuthorTC, getReviewsTC} from "../../store/reducers/reviewsReducer";
import {useParams} from "react-router-dom";
import {getUserTC} from "../../store/reducers/userReducer";
const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'


function ProfilePage() {
    const dispatch = useAppDispatch()
    const {username} = useParams()

    const authUser = useAppSelector(state => state.auth.user)

    const reviews = useAppSelector(state => state.reviews.reviews)
    const user = useAppSelector(state => state.user.user)

    console.log('REVIEWS',reviews )


    useEffect(() => {
        if (username) {
            dispatch(getUserTC(username))
            // dispatch(getAuthorTC(username))

        }
    }, [username])

    if (!user || !reviews) {
        return  <Backdrop open={true} sx={{color: '#fff', zIndex: 10}}>
            <CircularProgress />
        </Backdrop>
    }

    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px'}}
        >
            <Grid container spacing={3} sx={{padding: '0% 3%'}}>
                <Grid xs={8}>
                    <div>
                        {
                            reviews.length === 0 && authUser && authUser.username === username
                            && <div style={{fontSize: '30px', color: 'grey'}}>
                            Create your first review...
                                <CreateReviewModal variant={'soft'}/>
                            </div>
                        }
                        {
                            reviews.length !== 0 && reviews.map(r => {
                                return <Review
                                    author={
                                        authUser && user && authUser.username === user.username ? true : false
                                    }
                                    key={r._id}
                                    reviewId={r._id}
                                    imageURL={r.imageURL ? r.imageURL : URL}
                                    reviewTitle={r.reviewTitle}
                                    workTitle={r.workTitle}
                                    reviewText={r.reviewText}
                                    tags={r.tags}
                                    category={r.category}
                                    createdAt={r.createdAt}
                                    likes={r.likes}
                                    overallRating={r.overallRating}
                                    userName={r.userName}
                                    authorGrade={r.authorGrade}
                                    comments={r.comments}
                                />
                            })
                        }
                    </div>

                </Grid>
                <Grid xs={4}>

                    <Paper sx={{borderRadius: "30px"}} elevation={8}>
                        <Box className={s.profileInfo}>

                            <Box style={{display: 'inline-flex', alignItems: 'center'}}>
                                <Avatar sx={{"--Avatar-size": "160px"}}  src={user ? user.avatar : ''}/>
                            </Box>
                            <Box style={{marginBottom: '20px'}}>
                                <span style={{fontSize: '24px', fontWeight: 'bold'}}>{ user ? username : ' '}</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                ❤️
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'red'}}>{user && user.likes ? `${user.likes.length}` : ''}</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                📃
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{reviews ? `${reviews.length}`  : ''}</span>
                            </Box>
                            {
                                authUser && user && authUser.username === user.username &&

                                <Box style={{marginTop: "8px", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '40px', fontSize: '34px'}}>

                                    <CreateReviewModal variant={'solid'}/>
                                </Box>

                            }


                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage;