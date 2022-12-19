import React, {useEffect} from "react";
import {Container, Grid} from "@mui/joy";
import Tags from "../Tags/Tags";
import Review from "../Review/Review";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {getReviewsTC} from "../../store/reducers/reviewsReducer";
import { useDebounce } from "usehooks-ts";
const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

function Home() {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const reviews = useAppSelector(state => state.reviews.reviews)
    const currentReview = useAppSelector(state => state.reviews.currentReview)
    const dispatch = useAppDispatch()

    const search = useAppSelector(state => state.reviews.search)
    const debouncedSearch = useDebounce(search, 500)


    useEffect(() => {
        dispatch(getReviewsTC())
    }, [dispatch, debouncedSearch])

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
                                        author={false}
                                        reviewId={r._id}
                                        key={r._id}
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

                       <Tags />

                    </Grid>
                </Grid>
            </Container>

    );
}

export default Home;