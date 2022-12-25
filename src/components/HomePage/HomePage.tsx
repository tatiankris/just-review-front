import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useNavigate} from "react-router-dom";
import s from "./HomePage.module.scss";
import Tags from "../Tags/Tags";
import {Container, Grid, Stack} from '@mui/joy';

export {}
export const HomePage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const search = useAppSelector(state => state.reviews.search)
    const searchTags = useAppSelector(state => state.tags.searchTags)

    useEffect(() => {

        if (search.length) {
            navigate('/search')
        } else if (searchTags.length) {
            navigate('/search')
        }

    }, [search, searchTags])

    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px', border: '1px solid black'}}
        >
            <Grid container spacing={3}>
                <Stack className={s.homePageStack} spacing={2}>
                    <Tags />
                </Stack>
            </Grid>
        </Container>
    )
}

export default HomePage;
