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
import {logoutAC} from "../store/reducers/authReducer";
import {setSearchAC} from "../store/reducers/reviewsReducer";
import {setSearchTagsAC} from "../store/reducers/tagsReducer";
import {useMediaQuery} from "react-responsive";
import {BurgerMenu} from "./BurgerMenu";




function Header() {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })
    // console.log('isSmallScreen', isSmallScreen)

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
            <AppBar color={'inherit'}
                // className={s.appBar}
            >
                <Toolbar
                    sx={{"@media(min-width: 600px)": {minHeight: "50px"}}}
                         className={s.toolbar}>
                    <CssVarsProvider>


                            <Stack direction="row" spacing={1}>
                                {
                                    !isSmallScreen &&
                                <Tooltip title="Home" variant="soft" className={s.tooltip}>
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
                                }
                                <OptionsStack isSmallScreen={isSmallScreen} mode={mode} handleSetMode={handleSetMode} handleSetLanguage={handleSetLanguage} language={language}/>
                            </Stack>


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
                                sx={!isSmallScreen ? {borderRadius: '20px',
                                    maxWidth: '300px',
                                    // minWidth: '100px',
                                } : {borderRadius: '20px',
                                    width: '100%'}}
                                placeholder="Search…"
                                startDecorator={!isSmallScreen ? <SearchIcon /> : ''}
                            />
                        </Box>

                       <Stack direction={ !isSmallScreen ? "row" : "column"} spacing={!isSmallScreen ? 1 : 0}>
                                {isLoggedIn &&
                                    <Stack direction={!isSmallScreen ? "row" : "column"} spacing={!isSmallScreen ? 2 : 0}>
                                        {/*<Tooltip title="Profile" variant="soft" className={s.tooltip}>*/}
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            onClick={() => {
                                                setOpen(!open)
                                            }}
                                            style={{position: 'relative'}}
                                            // aria-label="avatar"
                                        >
                                            {!isSmallScreen && <span>{username}</span>}
                                            <Avatar size={'sm'} src={avatar}/>
                                            <Menu
                                                style={{position: 'absolute', left: '75%', top: '48px', width: '130px'}}
                                                id="positioned-demo-menu"
                                                open={open}
                                                onClose={handleCLose}
                                                aria-labelledby="positioned-demo-button"
                                                placement="bottom-end"
                                            >
                                                <MenuItem onClick={handleProfile}>
                                                    Open profile
                                                </MenuItem>
                                            </Menu>
                                        </IconButton>
                                        {/*</Tooltip>*/}
                                        <Button onClick={handleLogout} variant={'soft'} color={'primary'} size={isSmallScreen ? 'sm': 'md'}>Logout</Button>
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

                    </CssVarsProvider>
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

    return (
        <Stack direction={isSmallScreen ? 'column' : 'row'}>
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
    )
}

export default Header;