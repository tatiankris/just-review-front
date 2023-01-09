import {Box, Grid, IconButton, Stack} from '@mui/joy';
import {
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRow,
    Select, SelectChangeEvent
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {getAuthorTC, ReviewType, TagsType} from "../../store/reducers/reviewsReducer";
import {NavLink, useNavigate} from "react-router-dom";
import {PROFILE_PAGE, REVIEW_PAGE} from "../../Routing";
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import s from "./ReviewsTable.module.scss";
import UpdateReviewModal from "../Review/UpdateReview/UpdateReviewModal";
import DeleteModal from "../commonComponents/DeleteModal";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {useTranslation} from "react-i18next";
import {URL} from '../../common/imageDefault'
//const URL = 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' //'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

type PropsType = {
    reviews: Array<ReviewType> | null
    username: string
}
export const ReviewsTable = ({reviews, username, ...props}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const username = useAppSelector(state => state.auth.user.username)
    const categories = useAppSelector(state => state.tags.categories)

    const onSortHandler = (create: string, grade: string, rating: string, category: string) => {
        dispatch(getAuthorTC(username, create, grade, rating, category))
    }

    // const [category, setCategory] = useState('null')



    // const categoryHandler = () => {
    //
    // }
    const [category, setCategory] = React.useState('null');

    const handleChangeCategory = (event: SelectChangeEvent) => {
        // console.log('category', category)
        setCategory(event.target.value);
        onSortHandler('-1', 'null', 'null', String(event.target.value))

    };


    const [grade, setGrade] = useState(false)
    const gradeHandler = () => {
        grade
            ? onSortHandler('null', '-1', 'null', category)
            : onSortHandler('null', '1', 'null', category)
        setGrade(!grade)
    }

    const [rating, setRating] = useState(false)
    const ratingHandler = () => {
        rating
            ? onSortHandler('null', 'null', '-1', category)
            : onSortHandler('null', 'null', '1', category)
        setRating(!rating)
    }

    const [create, setCreate] = useState(false)
    const createHandler = () => {
        create
            ? onSortHandler('-1', 'null', 'null', category)
            : onSortHandler('1', 'null', 'null', category)
        setCreate(!create)
    }
    const { t } = useTranslation();
    const theme = useAppSelector(state => state.app.mode)




    return (
        <Grid container className={s.gridContainer}>
            <TableContainer className={s.tableContainer} component={Paper}>
                <Table className={theme ? `${s.table} ${s.darkTable}`: `${s.table}`}  aria-label="simple table">
                    <TableHead style={{background: '#EFEFEF', padding: 0}}>
                        <TableRow className={s.headerRow}>
                            <TableCell className={s.cellHeader}></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center">
                                {/*<Box width={'100px'}>*/}
                                    <Select
                                        value={category}
                                        onChange={handleChangeCategory}
                                        placeholder={'category'}
                                        fullWidth
                                        size={'small'}
                                    >
                                        <MenuItem value="null">
                                            <em>{t('reviewTable.all')}</em>
                                        </MenuItem>
                                        { categories && categories.map((c, i) => {
                                            return <MenuItem key={i} value={c.title}>{c.title}</MenuItem>
                                        })}
                                    </Select>
                                {/*</Box>*/}
                            </TableCell>
                            <TableCell className={s.cellHeader} align="center"><span className={s.cellHeader}>{t('reviewTable.rTitle')}</span></TableCell>
                            <TableCell className={s.cellHeader} align="center"><span className={s.cellHeader}>{t('reviewTable.wTitle')}</span></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>{t('reviewTable.aGrade')}</div><ExpandMoreIcon className={s.sortIcon} onClick={gradeHandler}/></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>{t('reviewTable.rating')}</div><ExpandMoreIcon className={s.sortIcon} onClick={ratingHandler}/></TableCell>
                            <TableCell className={s.cellHeader} align="center">{t('reviewTable.likesComments')}</TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>{t('reviewTable.createdAt')}</div><ExpandMoreIcon className={s.sortIcon} onClick={createHandler}/></TableCell>
                            <TableCell className={s.cellHeader}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {reviews && reviews.map((r) => {

                            // let day = row.lastUpdated.slice(8, 10)
                            // let month = row.lastUpdated.slice(5, 7)
                            // let year = row.lastUpdated.slice(0, 4)

                            return (
                                <TableRow
                                    // hover
                                    key={r._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0},
                                        backgroundColor: theme ? '#5a5a5a' : '#ffffff',
                                    ':hover': {backgroundColor: theme ? '#787575' : '#f6f1f1' }
                                    }}
                                >

                                    <TableCell
                                        className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}
                                        component="th"
                                               sx={{':hover': {cursor: 'pointer'}}}
                                               onClick={() => {navigate(`${REVIEW_PAGE}/${r.userName}/${r._id}`)}}
                                    >
                                        <img src={r.imageURL ? r.imageURL : URL}
                                             style={{width: '80px', height: '46px', borderRadius: '4px'}}/>
                                    </TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="center" ><span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>{r.category.title}</span></TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="left" scope="row"
                                               sx={{':hover': {cursor: 'pointer'}}}
                                               onClick={() => {navigate(`${REVIEW_PAGE}/${r.userName}/${r._id}`)}}
                                    >
                                        <NavLink className={theme ? `${s.cellText} ${s.link} ${s.darkCell}`: `${s.cellText} ${s.link}`} to={`${REVIEW_PAGE}/${r.userName}/${r._id}`}>
                                            {r.reviewTitle}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="left"
                                               sx={{':hover': {cursor: 'pointer'}}}
                                               onClick={() => {navigate(`${REVIEW_PAGE}/${r.userName}/${r._id}`)}}
                                    > <span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>{r.workTitle}</span></TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="center" ><span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}><b>{r.authorGrade}</b>/10</span></TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="center">
                                        {/*<StarIcon sx={{color: 'yellow'}} />*/}
                                        <span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>  ⭐️
                                        {r.rating.toFixed(1)}</span>
                                    </TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="center">
                                        <span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>❤{r.likes.length}</span>,
                                        <span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>💬{r.comments}</span>
                                    </TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="right"><span className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`}>{r.createdAt.slice(0, 10)}</span></TableCell>
                                    <TableCell className={theme ? `${s.cellText} ${s.darkCell}`: `${s.cellText}`} align="right"><Stack  direction="column" spacing={0} justifyContent="center">
                                        <Box className={s.options}>
                                        <div>
                                            <UpdateReviewModal reviewId={r._id} oldValues={{tags: r.tags, imageURL: r.imageURL ? r.imageURL : URL,
                                                                                            reviewTitle: r.reviewTitle, workTitle: r.workTitle,
                                                                                            reviewText: r.reviewText, category: r.category,
                                                                                            authorGrade: r.authorGrade }}/>
                                        </div>
                                        <DeleteModal reviewId={r._id} title={r.reviewTitle} type={'review'}/>
                                    </Box>
                                        <div className={`${s.cellText}`} style={{fontSize: '10px', color: 'gray', margin: '0'}}><NavLink to={`${REVIEW_PAGE}/${r.userName}/${r._id}`}>{t('reviewTable.open')}</NavLink>
                                        </div>
                                    </Stack></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
            {!reviews &&
                <div style={{margin: '1% 0 0 1%', color: 'grey'}}>
                    No reviews found
                </div>}
            {/*{search && rows.length < 1 &&*/}
            {/*    <div style={{marginTop: '20px'}}><span>There are no packs with this name...</span></div>}*/}
            {/*{!search && rows.length < 1 && <div style={{marginTop: '20px'}}><span>Packs not found...</span></div>}*/}

        </Grid>
    )
}