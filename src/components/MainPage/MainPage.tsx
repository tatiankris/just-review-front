import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useNavigate} from "react-router-dom";
import {Grid, Stack} from "@mui/joy";
import s from "./MainPage.module.scss";
import Tags from "../Tags/Tags";
import SearchReview from "../Review/SearchReview";
import MainReview from "../Review/MainReview";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
const URL = 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' //'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'



export const MainPage = () => {

    const { t } = useTranslation();

    const iSmallScreen = useMediaQuery({ query: '(max-width: 728px)' })

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: !iSmallScreen ? 3 : 1,
        slidesToScroll: !iSmallScreen ? 1 : 1,
    };

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const theme = useAppSelector(state => state.app.mode)
    const latest = useAppSelector(state => state.reviews.latest)
    const highestRating = useAppSelector(state => state.reviews.highestRating)

    console.log('latest', latest)
    console.log('highestRating', highestRating)
    return (
        <Grid className={s.mainPage} container spacing={3}>

            <Grid className={s.reviewsGrid}>
                <div className={theme ? `${s.title} ${s.darkTitle}` : `${s.title}`}>
                    {t('main.latest')}
                </div>
                <Slider className={s.slider} {...sliderSettings}>
                {
                    latest && latest.map(r => {
                        return <MainReview
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
                        />
                    })
                }
                </Slider>
            </Grid>

            <Grid className={s.reviewsGrid}>
                <div className={theme ? `${s.title} ${s.darkTitle}` : `${s.title}`}>
                    {t('main.highGrade')}
                </div>
                <Slider {...sliderSettings}>
                {
                    highestRating && highestRating.map(r => {
                        return <MainReview
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
                        />
                    })
                }
                </Slider>
            </Grid>

        </Grid>
    )
}