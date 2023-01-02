import React, {useState} from "react";
import { Button, Menu, MenuItem } from "@mui/joy";
import ListIcon from '@mui/icons-material/List';
import ModalLogin from "./Auth/Login/ModalLogin";
import ModalRegistration from "./Auth/Registration/ModalRegistration";
import {OptionsStack} from "./Header";
type BurgerMenuPropsType = {
    handleSetMode: () => void
    mode: string
    handleSetLanguage: () => void
    language: string
    handleProfile: () => void
    isLoggedIn: boolean
    handleLogout: () => void
}

export function BurgerMenu({handleSetMode,
                               mode,
                               handleSetLanguage,
                               language,handleProfile,
                               isLoggedIn, handleLogout
                           }: BurgerMenuPropsType) {


    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [open, setOpen] = useState(false)
    // const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };

    const [openLogin, setOpenLogin] = useState(false)
    const handleLogin = () => {
        setOpenLogin(true)
        // handleClose()
    }

    return (
        <div>
            <Button
                id="basic-demo-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color="neutral"
                onClick={handleClick}
            >
                <ListIcon/>
            </Button>
            {!isLoggedIn &&
                <Menu

                    id="basic"
                    anchorEl={anchorEl}
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="basic-demo-button"
                >
                    {/*<MenuItem onClick={handleLogin}>Login<ModalLogin openSmall={{value: openLogin}}/></MenuItem>*/}
                    {/*<ModalRegistration />*/}
                    <MenuItem>
                        {/*<OptionsStack handleSetMode={handleSetMode} mode={mode}*/}
                        {/*              handleSetLanguage={handleSetLanguage} language={language} />*/}
                    </MenuItem>
                </Menu>

            }
            {isLoggedIn &&
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="basic-demo-button"
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem>
                        {/*<OptionsStack handleSetMode={handleSetMode} mode={mode}*/}
                        {/*              handleSetLanguage={handleSetLanguage} language={language} />*/}
                    </MenuItem>
                    <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                </Menu>
            }

        </div>
    )
}