import React, {useState} from "react";
import {AppBar, Toolbar} from "@mui/material";
import {Avatar, IconButton, Box, Stack, TextField, Tooltip, MenuItem, Menu} from "@mui/joy";
import s from './Header.module.scss'
import { CssVarsProvider } from '@mui/joy/styles';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../Routing";
import ModalLogin from "./Auth/Login/ModalLogin";
import ModalRegistration from "./Auth/Registration/ModalRegistration";

function Header() {

    const navigate = useNavigate();

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


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar color={'inherit'}
                // className={s.appBar}
            >
                <Toolbar sx={{"@media(min-width: 600px)": {minHeight: "46px"}}} className={s.toolbar}>
                    <CssVarsProvider>
                        <Stack direction="row" spacing={1}>

                            <Tooltip title="Home" variant="soft" className={s.tooltip}>
                        <IconButton
                            onClick={() => {navigate('/')}}
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
                                sx={{borderRadius: '20px', maxWidth: '300px'}}
                                placeholder="Search…"
                                startDecorator={<SearchIcon />}
                            />
                        </Box>

                        <Stack direction="row" spacing={1}>
                            <Tooltip title="Profile" variant="soft" className={s.tooltip}>
                            <IconButton
                                size="sm"
                                color="neutral"
                                onClick={() => {setOpen(!open)}}
                                style={{position: 'relative'}}
                                // aria-label="avatar"
                            >
                                <Avatar/>
                                <Menu
                                    style={{position: 'absolute', left: '75%', top: '48px', width: '130px'}}
                                    id="positioned-demo-menu"
                                    open={open}
                                    onClose={handleCLose}
                                    aria-labelledby="positioned-demo-button"
                                    placement="bottom-end"
                                >
                                    <MenuItem onClick={() => {navigate(PROFILE_PAGE); handleCLose()}}>
                                        Open profile
                                    </MenuItem>
                                </Menu>
                            </IconButton>
                            </Tooltip>
                            <ModalLogin />
                            <ModalRegistration />
                        </Stack>
                    </CssVarsProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;