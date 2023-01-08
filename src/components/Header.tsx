import React, {useState} from "react";
import {AppBar, Experimental_CssVarsProvider, Toolbar} from "@mui/material";

import {Avatar, IconButton, Box, Stack, TextField, Tooltip, MenuItem, Menu, Button, CssVarsProvider} from "@mui/joy";
import s from './Header.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useNavigate} from "react-router-dom";
import {ADMIN_PANEL, PROFILE_PAGE} from "../Routing";
import ModalLogin from "./Auth/Login/ModalLogin";
import ModalRegistration from "./Auth/Registration/ModalRegistration";
import {useAppDispatch, useAppSelector} from "../common/utils/hooks";
import {logoutAC} from "../store/reducers/authReducer";
import {setSearchAC} from "../store/reducers/reviewsReducer";
import {setSearchTagsAC} from "../store/reducers/tagsReducer";
import {useMediaQuery} from "react-responsive";
import {BurgerMenu} from "./BurgerMenu";
import AdminPanel from "./AdminPanel/AdminPanel";
import HomeIcon from '@mui/icons-material/Home';
import {setLangAC, setThemeAC} from "../store/reducers/appReducer";
import { useTranslation, Trans } from 'react-i18next';

function Header() {

    const { t, i18n } = useTranslation();


    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })
    // console.log('isSmallScreen', isSmallScreen)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const avatar = useAppSelector(state => state.auth.user.avatar)
    const username = useAppSelector(state => state.auth.user.username)
    const search = useAppSelector(state => state.reviews.search)
    const roles = useAppSelector(state => state.auth.user.roles)
    const theme = useAppSelector(state => state.app.mode)

    const [mode, setMode] = useState('light')
    const handleSetMode = () => {
        mode === 'light' ? setMode('dark') : setMode('light')
    }

    // const [language, setLanguage] = useState('ENG')
    const language = useAppSelector(state => state.app.language)
    const handleSetLanguage = () => {
        if (language === 'en') {
            dispatch(setLangAC('ru'))
            i18n.changeLanguage('ru')
            localStorage.setItem('lang', 'ru')
        } else {
            dispatch(setLangAC('en'))
            i18n.changeLanguage('en')
            localStorage.setItem('lang', 'en')
        }

    }
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleCLose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        dispatch(logoutAC())
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchAC(e.currentTarget.value.trim()))
    }

    const homeHandler = () => {
        dispatch(setSearchAC(''))
        dispatch(setSearchTagsAC([]))
        navigate('/')
    }

    const handleProfile = () => {
        navigate(`${PROFILE_PAGE}/${username}`);
        handleCLose()
    }




    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar sx={{backgroundColor: theme ? 'rgba(66,61,61,0.87)' : 'white' }}
                // className={s.appBar}
            >
                <Toolbar
                    sx={{"@media(min-width: 600px)": {minHeight: "50px"}}}
                         className={s.toolbar}>
                        <CssVarsProvider disableNestedContext={false} >
                            <Stack direction="row" spacing={1} alignItems={'center'}>
                                {
                                    !isSmallScreen &&
                                <Tooltip title={`${t('header.home')}`} variant="soft" className={s.tooltip}>
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
                                        <div className={theme ? `${s.homeButton} ${s.darkHome}`:`${s.homeButton}`}>JustReview</div>
                                    </IconButton>
                                </Tooltip>
                                }
                                {isSmallScreen &&
                                <HomeIcon onClick={homeHandler} sx={{
                                    color: theme ? '#ddf1ff' : '#939da7',
                                    ":hover": {cursor: 'pointer'},
                                    ":active": {cursor: 'pointer'}
                                }}/>
                            }
                                <OptionsStack isSmallScreen={isSmallScreen} mode={mode} handleSetMode={handleSetMode} handleSetLanguage={handleSetLanguage} language={language}/>
                            </Stack>
                        </CssVarsProvider>
                        <Box
                            sx={isSmallScreen
                                ? {display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60%'}
                                : {flexGrow: 1, padding: '0 1%'}
                        }
                        >

                            <TextField
                                size={'md'}
                                value={search}
                                onChange={handleSearch}
                                variant={theme ? 'solid' : 'outlined'}
                                sx={!isSmallScreen ? {borderRadius: '20px',
                                    maxWidth: '300px',
                                    // minWidth: '100px',
                                } : {borderRadius: '20px',
                                    width: '100%'}}
                                placeholder={`${t('header.search')}`}
                                startDecorator={!isSmallScreen ? <SearchIcon /> : ''}
                            />
                        </Box>

                       <Stack direction={ !isSmallScreen ? "row" : "column"} spacing={!isSmallScreen ? 1 : 0}>
                                {isLoggedIn &&
                                    <Stack direction={!isSmallScreen ? "row" : "column"} spacing={!isSmallScreen ? 2 : 0}>
                                        {
                                            roles && roles.includes('ADMIN')
                                            && <Button onClick={() => {navigate(ADMIN_PANEL)}}> {t('header.admin')}</Button>
                                        }
                                        <IconButton
                                            size="sm"
                                            color={theme ? "info" : "neutral"}
                                            variant={theme ? 'solid' : 'soft'}
                                            onClick={() => {
                                                // setOpen(!open)
                                                handleProfile()
                                            }}
                                            style={{position: 'relative'}}
                                            // aria-label="avatar"
                                        >
                                            {!isSmallScreen && <span>{username}</span>}
                                            <Avatar size={'sm'} src={avatar}/>
                                        </IconButton>
                                        <Button onClick={handleLogout} variant={theme ? 'solid' : 'soft'} color={theme ? 'neutral' : 'primary'} size={isSmallScreen ? 'sm': 'md'}>{t('header.logout')}</Button>
                                    </Stack>
                                }
                                {!isLoggedIn &&

                                    <Stack direction={!isSmallScreen ? "row" : "column"} spacing={!isSmallScreen ? 2 : 0}>

                                        <ModalLogin isSmallScreen={isSmallScreen}/>
                                        <ModalRegistration isSmallScreen={isSmallScreen}/>
                                    </Stack>
                                }
                            </Stack>

                        {/*{*/}
                        {/*    isSmallScreen &&*/}
                        {/*    <BurgerMenu handleLogout={handleLogout} mode={mode} handleSetMode={handleSetMode} handleSetLanguage={handleSetLanguage} language={language} isLoggedIn={isLoggedIn} handleProfile={handleProfile}  />*/}

                        {/*}*/}

                </Toolbar>
            </AppBar>

        </Box>
    );
}


type OptionsPropsType = {
    handleSetMode: () => void
    mode: string
    handleSetLanguage: () => void
    language: string
    isSmallScreen: boolean
}

export function OptionsStack({handleSetMode, mode, handleSetLanguage, language, isSmallScreen}: OptionsPropsType) {

    const theme = useAppSelector(state => state.app.mode)
    const dispatch = useAppDispatch()
    const setTheme = () => {

        document.body.setAttribute('theme', String(!theme))
        dispatch(setThemeAC(!theme))
        localStorage.setItem('theme', String(!theme))
    }
    return (
        <Stack direction={isSmallScreen ? 'column' : 'row'}>
            <IconButton onClick={setTheme} size="sm"
                        color="neutral">
                {
                    theme
                        ? <LightModeIcon color={'action'}/>
                        : <DarkModeIcon color={'secondary'}/>

                }
            </IconButton>
            <IconButton onClick={handleSetLanguage} size="sm" color="neutral">
                {language === 'ru' ? <>АНГ</> : <>RU</>}
            </IconButton>
        </Stack>
    )
}

export default Header;