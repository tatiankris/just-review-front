import React, {useState} from "react";
import {AppBar, Toolbar} from "@mui/material";
import {Avatar, IconButton, Box, Stack, TextField, Tooltip, MenuItem, Menu, Button} from "@mui/joy";
import s from './Header.module.scss'
import { CssVarsProvider } from '@mui/joy/styles';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../Routing";
import ModalLogin from "./Auth/Login/ModalLogin";
import ModalRegistration from "./Auth/Registration/ModalRegistration";
import {useAppDispatch, useAppSelector} from "../common/utils/hooks";
import { logoutAC } from "../store/reducers/authReducer";
import {setSearchAC} from "../store/reducers/reviewsReducer";
import {setSearchTagsAC} from "../store/reducers/tagsReducer";

function Header() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const avatar = useAppSelector(state => state.auth.user.avatar)
    const username = useAppSelector(state => state.auth.user.username)
    const search = useAppSelector(state => state.reviews.search)

    const [mode, setMode] = useState('light')
    const handleSetMode = () => {
        mode === 'light' ? setMode('dark') : setMode('light')
    }

    const [language, setLanguage] = useState('ENG')
    const handleSetLanguage = () => {
        language === 'ENG' ? setLanguage('RU') : setLanguage('ENG')
    }
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleCLose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        dispatch(logoutAC())}

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchAC(e.currentTarget.value.trim()))
    }

    const homeHandler = () => {
        dispatch(setSearchAC(''))
        dispatch(setSearchTagsAC([]))
        navigate('/')
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar color={'inherit'}
                // className={s.appBar}
            >
                <Toolbar sx={{"@media(min-width: 600px)": {minHeight: "50px", padding: '0% 10%'}}} className={s.toolbar}>
                    <CssVarsProvider>
                        <Stack direction="row" spacing={1}>

                            <Tooltip title="SearchPage" variant="soft" className={s.tooltip}>
                        <IconButton
                            onClick={homeHandler}
                            // className={s.homeIconButton}
                            size="sm"
                            sx={{
                                backgroundColor: '#ba191900',
                                ":hover": {backgroundColor: '#ba191900'},
                                ":active": {backgroundColor: '#ba191900'}
                            }}
                        >
                            <div className={s.homeButton}>JustReview</div>
                        </IconButton>
                            </Tooltip>

                        <IconButton onClick={handleSetMode} size="sm" color="neutral">
                            {
                                mode === 'light'
                                    ? <LightModeIcon/>
                                    : <DarkModeIcon/>
                            }
                        </IconButton>
                        <IconButton onClick={handleSetLanguage} size="sm" color="neutral">
                            {language}
                        </IconButton>
                        </Stack>
                        <Box
                            sx={{flexGrow: 1, padding: '0px 80px'}}
                        >
                            <TextField
                                value={search}
                                onChange={handleSearch}
                                sx={{borderRadius: '20px', maxWidth: '300px'}}
                                placeholder="Search…"
                                startDecorator={<SearchIcon />}
                            />
                        </Box>

                        <Stack direction="row" spacing={1}>
                            {isLoggedIn &&
                                <Stack direction={'row'} spacing={2}>
                                {/*<Tooltip title="Profile" variant="soft" className={s.tooltip}>*/}
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        onClick={() => {setOpen(!open)}}
                                        style={{position: 'relative'}}
                                        // aria-label="avatar"
                                    >
                                        <span>{username}</span>
                                        <Avatar src={avatar}/>
                                        <Menu
                                            style={{position: 'absolute', left: '75%', top: '48px', width: '130px'}}
                                            id="positioned-demo-menu"
                                            open={open}
                                            onClose={handleCLose}
                                            aria-labelledby="positioned-demo-button"
                                            placement="bottom-end"
                                        >
                                            <MenuItem onClick={() => {navigate(`${PROFILE_PAGE}/${username}`); handleCLose()}}>
                                                Open profile
                                            </MenuItem>
                                        </Menu>
                                    </IconButton>
                                {/*</Tooltip>*/}
                                    <Button onClick={handleLogout} variant={'soft'} color={'primary'}>Logout</Button>
                                </Stack>
                            }
                            {!isLoggedIn &&

                                <Stack direction={'row'} spacing={2}>
                                    <ModalLogin />
                                    <ModalRegistration />
                                </Stack>
                            }
                        </Stack>
                    </CssVarsProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;