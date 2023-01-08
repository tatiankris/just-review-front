import React, {useEffect} from "react";
import {Container, Grid, Stack} from "@mui/joy";
import Tags from "../Tags/Tags";
import Review from "../Review/Review";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {getReviewsTC} from "../../store/reducers/reviewsReducer";
import { useDebounce } from "usehooks-ts";
import s from './SearchPage.module.scss'
import SearchReview from "../Review/SearchReview";
import {URL} from '../../common/imageDefault'
//const URL = 'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

type PropsType = {
    notMain?: boolean
}
function SearchPage({notMain}: PropsType) {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const reviews = useAppSelector(state => state.reviews.reviews)
    const currentReview = useAppSelector(state => state.reviews.currentReview)
    // const dispatch = useAppDispatch()
    //
    // const search = useAppSelector(state => state.reviews.search)
    // const debouncedSearch = useDebounce(search, 500)
    // const searchTags = useAppSelector(state => state.tags.searchTags)
    // const debouncedTagsSearch = useDebounce(searchTags, 1200)
    // useEffect(() => {
    //     dispatch(getReviewsTC())
    // }, [dispatch, debouncedSearch, debouncedTagsSearch])

    return (

                <Grid container spacing={3}>
                    <Grid className={s.searchPageStack}>
                        {/*<div>*/}
                        {
                           notMain &&
                            <div style={{marginTop: '30px'}}><Tags /></div>
                        }
                            {
                                reviews && reviews.map(r => {
                                    return <SearchReview
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
                                        rating={r.rating}
                                        userName={r.userName}
                                        authorGrade={r.authorGrade}
                                        comments={r.comments}
                                        avatar={r.avatar ? r.avatar : null}
                                    />
                                })
                            }

                        {/*</div>*/}
                    </Grid>
                </Grid>

    );
}

export default SearchPage;