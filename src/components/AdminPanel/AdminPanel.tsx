import {Avatar, Container, Grid, Stack} from "@mui/joy";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import s from "../ProfilePage/ProfilePage.module.scss";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getUsersTC} from "../../store/reducers/userReducer";
import {NavLink, useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../Routing";
import {useTranslation} from "react-i18next";

function AdminPanel() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const users = useAppSelector(state => state.user.users)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const roles = useAppSelector(state => state.auth.user.roles)
    useEffect(() => {

            dispatch(getUsersTC())



    }, [])

    console.log('users', users)

    const search = useAppSelector(state => state.reviews.search)
    useEffect(() => {
        if (search.length) {
            navigate('/home')
        }
    }, [search])

    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px', padding: '0', width: '100%'}}

        >
            <Grid className={s.grid} container spacing={3}
                // sx={{padding: '0% 3%'}}
            >
                <Grid className={s.gridItem}>
                    <div style={{width: '100%'}}>
                        <TableContainer className={s.tableContainer} component={Paper}>
                            <Table className={s.table} aria-label="simple table">
                                <TableHead style={{background: '#EFEFEF', padding: 0}}>
                                    <TableRow className={s.headerRow}>
                                        <TableCell className={s.cellHeader}></TableCell>
                                        <TableCell className={s.cellHeader}>{t('admin.username')}</TableCell>
                                        <TableCell className={s.cellHeader}>{t('admin.email')}</TableCell>
                                        {/*<TableCell className={s.cellHeader}>reviews</TableCell>*/}
                                        {/*<TableCell className={s.cellHeader}>likes</TableCell>*/}
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {users && users.map((u, i) => {

                                        return (
                                            <TableRow
                                                onClick={() => {navigate(`${PROFILE_PAGE}/${u.username}`)}}

                                                hover

                                                key={i}
                                                sx={{':hover': {cursor: 'pointer'} ,'&:last-child td, &:last-child th': {border: 0, ':hover': {cursor: 'pointer'}}}}
                                            >

                                                <TableCell>{i}</TableCell>
                                                <TableCell >
                                                    <Stack direction={'row'} spacing={2}>
                                                    <Avatar size={'sm'} src={u.avatar}/>
                                                    <NavLink to={`${PROFILE_PAGE}/${u.username}`}>{u.username}</NavLink>
                                                </Stack>
                                                </TableCell>
                                                <TableCell>{u.email}</TableCell>
                                                {/*<TableCell>{u.reviews}</TableCell>*/}
                                                {/*<TableCell>{u.likes}</TableCell>*/}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminPanel;