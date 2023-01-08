import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useNavigate} from "react-router-dom";
import s from "./HomePage.module.scss";
import Tags from "../Tags/Tags";
import {Container, Grid, Stack} from '@mui/joy';
import SearchPage from "../SearchPage/SearchPage";
import {MainPage} from "../MainPage/MainPage";
import {useDebounce} from "usehooks-ts";
import {getReviewsTC} from "../../store/reducers/reviewsReducer";
import {useMediaQuery} from "react-responsive";

export {}
export const HomePage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //
    //     if (search.length) {
    //         navigate('/search')
    //     } else if (searchTags.length) {
    //         navigate('/search')
    //     }
    //
    // }, [search, searchTags])

    const search = useAppSelector(state => state.reviews.search)
    const debouncedSearch = useDebounce(search, 500)
    const searchTags = useAppSelector(state => state.tags.searchTags)
    const debouncedTagsSearch = useDebounce(searchTags, 1200)
    useEffect(() => {
        if (!search.length && !searchTags.length)
        {
            dispatch(getReviewsTC(null, true))
        } else {
            dispatch(getReviewsTC())
        }

    }, [dispatch, debouncedSearch, debouncedTagsSearch])
    const iSmallScreen = useMediaQuery({ query: '(max-width: 728px)' })
    return (
        <Container maxWidth="lg"
                   sx={{marginTop: iSmallScreen ? '73px' :'55px'}}
        >
            <Tags />
            {
                !search.length && !searchTags.length

                ? <MainPage />
                    :<SearchPage />
            }
        </Container>
    )
}

export default HomePage;
