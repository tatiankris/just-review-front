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
import SearchReview from "../Review/SearchReview";
import {useMediaQuery} from "react-responsive";
import {ReviewsTable} from "./ReviewsTable";
const URL = 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' //'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'


function ProfilePage() {
    const dispatch = useAppDispatch()
    const {username} = useParams()

    const authUser = useAppSelector(state => state.auth.user)

    const reviews = useAppSelector(state => state.reviews.reviews)
    const user = useAppSelector(state => state.user.user)
    const iSmallScreen = useMediaQuery({ query: '(max-width: 712px)' })
    // console.log('REVIEWS',reviews )


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
                   sx={{marginTop: '80px', padding: '0', width: '100%'}}

        >
            <Grid className={s.grid} container spacing={3}
                  // sx={{padding: '0% 3%'}}
            >
                <Grid className={s.gridItem} >

                    <Paper sx={{borderRadius: "2px", backgroundColor: ' rgba(230, 230, 250, 0) '}} elevation={0}>
                        <Box className={s.profileInfo}>

                            <Box style={{display: 'inline-flex', alignItems: 'center'}}>
                                <Avatar sx={{"--Avatar-size": !iSmallScreen ? "160px" : '90px'}} src={user ? user.avatar : ''}/>
                            </Box>
                            <Box>
                            <Box style={{marginBottom: '20px'}}>
                                <span style={{fontSize: !iSmallScreen ? '24px' : '18px', fontWeight: 'bold'}}>{user ? username : ' '}</span>
                            </Box>
                            <Box style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                height: '40px',
                                fontSize: !iSmallScreen ? '34px' : '24px',
                                paddingLeft: '16px'
                            }}>
                                ❤️
                                <span style={{
                                    fontSize: !iSmallScreen ? '24px' : '14px',
                                    fontWeight: 'bold',
                                    color: 'red'
                                }}>{user && user.likes ? `${user.likes.length}` : ''}</span>
                            </Box>
                            <Box style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                height: '40px',
                                fontSize: !iSmallScreen ? '34px' : '24px',
                                paddingLeft: '16px'
                            }}>
                                📃
                                <span style={{
                                    fontSize: !iSmallScreen ? '24px' : '14px',
                                    fontWeight: 'bold',
                                    color: 'green'
                                }}>{reviews ? `${reviews.length}` : ''}</span>
                            </Box>
                            {
                                authUser && user && authUser.username === user.username &&

                                <Box style={{
                                    marginLeft: '8px',
                                    marginTop: "8px",
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: iSmallScreen ? '28px' : '40px',
                                    fontSize: iSmallScreen ? '18px' : '34px'
                                }}>

                                    <CreateReviewModal variant={'solid'}/>
                                </Box>
                            }
                            </Box>
                        </Box>
                    </Paper>
                    <div style={{width: '100%'}}>
                        {
                            reviews.length === 0 && authUser && authUser.username === username
                            && <div style={{fontSize: '30px', color: 'grey'}}>
                            Create your first review...
                                <CreateReviewModal variant={'soft'}/>
                            </div>
                        }
                        {
                            !authUser || authUser.username !== username &&
                            reviews.length !== 0 && reviews.map(r => {
                                return <SearchReview
                                    key={r._id}
                                    reviewId={r._id}
                                    imageURL={r.imageURL ? r.imageURL : URL}
                                    reviewTitle={r.reviewTitle}
                                    workTitle={r.workTitle}
                                    reviewText={r.reviewText.slice(0, 20)}
                                    tags={r.tags}
                                    category={r.category}
                                    createdAt={r.createdAt.slice(0, 11)}
                                    likes={r.likes}
                                    overallRating={r.overallRating}
                                    userName={r.userName}
                                    authorGrade={r.authorGrade}
                                    comments={r.comments}
                                />
                            })
                        }
                        {
                            authUser && authUser.username === username &&
                            reviews.length !== 0
                            && <ReviewsTable reviews={reviews} />

                        }
                    </div>

                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage;