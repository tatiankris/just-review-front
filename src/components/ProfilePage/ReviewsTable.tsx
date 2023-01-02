import {Box, Grid, IconButton, Stack} from '@mui/joy';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useEffect} from 'react';
import {ReviewType, TagsType} from "../../store/reducers/reviewsReducer";
import {NavLink} from "react-router-dom";
import {REVIEW_PAGE} from "../../Routing";
import StarIcon from '@mui/icons-material/Star';
import s from "./ReviewsTable.module.scss";
import UpdateReviewModal from "../Review/UpdateReview/UpdateReviewModal";
import DeleteModal from "../commonComponents/DeleteModal";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const URL = 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' //'https://static.okko.tv/images/v2/16449765?scale=1&quality=80'

type PropsType = {
    reviews: Array<ReviewType>
}
export const ReviewsTable = ({reviews,...props}: PropsType) => {


    const onSortHandler = () => {}

    return (
        <Grid container className={s.gridContainer}>
            <TableContainer className={s.tableContainer} component={Paper}>
                <Table className={s.table}  aria-label="simple table">
                    <TableHead style={{background: '#EFEFEF', padding: 0}}>
                        <TableRow className={s.headerRow}>
                            <TableCell className={s.cellHeader}></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader} >Category</div><ExpandMoreIcon className={s.sortIcon} onClick={onSortHandler}/></TableCell>
                            <TableCell className={s.cellHeader} align="center"><span className={s.cellHeader}>Review title</span></TableCell>
                            <TableCell className={s.cellHeader} align="center"><span className={s.cellHeader}>Work title</span></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>Author's assessment</div><ExpandMoreIcon className={s.sortIcon} onClick={onSortHandler}/></TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>Rating</div><ExpandMoreIcon className={s.sortIcon} onClick={onSortHandler}/></TableCell>
                            <TableCell className={s.cellHeader} align="center">Likes, comments</TableCell>
                            <TableCell className={`${s.cellHeader} ${s.cellTitleIcon}`} align="center"><div className={s.cellHeader}>Created at</div><UnfoldMoreIcon className={s.sortIcon} onClick={onSortHandler}/></TableCell>
                            <TableCell className={s.cellHeader}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((r) => {

                            // let day = row.lastUpdated.slice(8, 10)
                            // let month = row.lastUpdated.slice(5, 7)
                            // let year = row.lastUpdated.slice(0, 4)

                            return (
                                <TableRow
                                    hover
                                    key={r._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >

                                    <TableCell component="th">
                                        <img src={r.imageURL}
                                             style={{width: '80px', height: '46px', borderRadius: '4px'}}/>
                                    </TableCell>
                                    <TableCell className={`${s.cellText}`} align="center" ><span className={`${s.cellText}`}>{r.category.title}</span></TableCell>
                                    <TableCell className={`${s.cellText}`} align="left" scope="row">
                                        <NavLink className={`${s.cellText}`} to={`${REVIEW_PAGE}/${r.userName}/${r._id}`}>
                                            {r.reviewTitle}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell className={`${s.cellText}`} align="left" > <span className={`${s.cellText}`}>{r.workTitle}</span></TableCell>
                                    <TableCell className={`${s.cellText}`} align="center" ><span className={`${s.cellText}`}><b>{r.authorGrade}</b>/10</span></TableCell>
                                    <TableCell className={`${s.cellText}`} align="center">
                                        {/*<StarIcon sx={{color: 'yellow'}} />*/}
                                        <span className={`${s.cellText}`}>  ⭐️
                                        {3.5}</span>
                                    </TableCell>
                                    <TableCell className={`${s.cellText}`} align="center">
                                        <span className={`${s.cellText}`}>❤{r.likes.length}</span>,
                                        <span className={`${s.cellText}`}>💬{r.comments}</span>
                                    </TableCell>
                                    <TableCell className={`${s.cellText}`} align="right"><span className={`${s.cellText}`}>{r.createdAt.slice(0, 10)}</span></TableCell>
                                    <TableCell className={`${s.cellText}`} align="right"><Stack  direction="column" spacing={0} justifyContent="center">
                                        <Box className={s.options}>
                                        <div>
                                            <UpdateReviewModal reviewId={r._id} oldValues={{tags: r.tags, imageURL: r.imageURL ? r.imageURL : URL,
                                                                                            reviewTitle: r.reviewTitle, workTitle: r.workTitle,
                                                                                            reviewText: r.reviewText, category: r.category,
                                                                                            authorGrade: r.authorGrade }}/>
                                        </div>
                                        <DeleteModal reviewId={r._id} title={r.reviewTitle} type={'review'}/>
                                    </Box>
                                        <div className={`${s.cellText}`} style={{fontSize: '10px', color: 'gray', margin: '0'}}><NavLink to={`${REVIEW_PAGE}/${r.userName}/${r._id}`}>Открыть</NavLink>
                                        </div>
                                    </Stack></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*{search && rows.length < 1 &&*/}
            {/*    <div style={{marginTop: '20px'}}><span>There are no packs with this name...</span></div>}*/}
            {/*{!search && rows.length < 1 && <div style={{marginTop: '20px'}}><span>Packs not found...</span></div>}*/}

        </Grid>
    )
}