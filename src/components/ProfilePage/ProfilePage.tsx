import React, {useEffect} from "react";
import {Avatar, Box, Button, Container, Grid} from "@mui/joy";
import Review from "../Review/Review";
import s from './ProfilePage.module.scss'
import Tags from "../Tags/Tags";
import { Paper } from "@mui/material";
import CreateReviewModal from "../Review/CreateReview/CreateReviewModal";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {getAuthorTC, getReviewsTC} from "../../store/reducers/reviewsReducer";
import {useParams} from "react-router-dom";
const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'


function ProfilePage() {

    const {username} = useParams()

    const avatar = useAppSelector(state => state.auth.user.avatar)
    const authUserName = useAppSelector(state => state.auth.user.username)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const reviews = useAppSelector(state => state.reviews.reviews)
    const currentReview = useAppSelector(state => state.reviews.currentReview)
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (username) {
            dispatch(getAuthorTC(username))
        }

    }, [])

    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px'}}
        >
            <Grid container spacing={3} sx={{padding: '0% 3%'}}>
                <Grid xs={8}>
                    <div>
                        {
                            reviews && reviews.map(r => {
                                return <Review
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
                                />
                            })
                        }
                    </div>

                </Grid>
                <Grid xs={4}>

                    <Paper sx={{borderRadius: "30px"}} elevation={8}>
                        <Box className={s.profileInfo}>

                            <Box style={{display: 'inline-flex', alignItems: 'center'}}><Avatar sx={{
                                "--Avatar-size": "80px"
                            }}  src={avatar}/><span style={{fontSize: '24px', fontWeight: 'bold'}}>{" " + username}</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                ❤️
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'red'}}>318</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                📃
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>6</span>
                            </Box>
                            <Box style={{marginTop: "8px", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '40px', fontSize: '34px'}}>

                                <CreateReviewModal />
                            </Box>

                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage;