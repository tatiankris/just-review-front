import React, {useCallback, useEffect, useState} from "react";
import {Modal, Box, Typography, Button, TextField, Stack, Chip, Divider} from "@mui/joy";
import s from './Login.module.scss'
import Login from "./Login";
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleLogin, GoogleLogout, useGoogleLogout} from 'react-google-login';
import { gapi } from 'gapi-script';
import jwt_decode from 'jwt-decode';
import LoginGithub from "react-login-github";
import GitHubIcon from '@mui/icons-material/GitHub';
import {authAPI} from "../../../api/auth-api";
import {useAppDispatch} from "../../../common/utils/hooks";
import {useTranslation} from "react-i18next";
import { baseURL } from "../../../api/api";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20%',
  backgroundColor: '#e7ffeb',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 4,
};

declare var google: any;

type PropsType = {
  isSmallScreen: boolean
}
function ModalLogin({isSmallScreen} : PropsType) {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()



  const [open, setOpen] = useState(false);
  const handleOpen = () => {

    setOpen(true);
    console.log('open login')


  }

  const handleClose = () => {
    console.log('close login')
    setOpen(false);
  }

  const google = () => {
    window.open(baseURL + "/auth/google", "_self")

  }

  const gitHub = () => {
    window.open(baseURL + "/auth/github", "_self")
  }

  // function handleCallbackResponse(response: any) {
  //   console.log('encoded JWT ID token:' + response.credential)
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: "301022637814-i3noevnhjjh0rn88avi7p3d0q5m6hucj.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })
  //
  //   google.accounts.id.renderButton(
  //       document.getElementById("signInDiv"),
  //       { type: "standard", theme: "filled_blue", size: "large", shape: "rectangular"}
  //   )
  //
  //
  // }, [])



  return (
      <div>
      {/*<GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />*/}
      <Button sx={{height: !isSmallScreen ? '30px' : 'auto'}} size={!isSmallScreen ? 'md' : 'sm'} variant={'soft'} color="success" onClick={handleOpen} fullWidth> {t('header.login')}</Button>


      {/*<div id={"signInDiv"}></div>*/}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modalBox} sx={style}>
          <Typography id="modal-modal-title"  component="h2">
            {t('header.login')}
          </Typography>
          <div style={{marginTop: '12px'} }>
            {/*<span style={{marginTop: '6px', color: 'gray'}}>Continue with</span>*/}

            <Stack style={{margin: '6px 0px', width: '100%'}} spacing={0.5}>
              {/*<div onClick={handleGoogleClick}>*/}
              {/*  <GoogleLogin*/}
              {/*    clientId={clientId}*/}
              {/*    buttonText="Sign in with Google"*/}
              {/*    onSuccess={onSuccessGoogle}*/}
              {/*    onFailure={onFailureGoogle}*/}
              {/*    cookiePolicy={'single_host_origin'}*/}
              {/*    isSignedIn={true}*/}
              {/*/>*/}
              {/*</div>*/}
              {/*<LoginGithub clientId={ghClientId}*/}
              {/*             onSuccess={onSuccessGH}*/}
              {/*             onFailure={onFailureGH}*/}
              {/*             className={s.ghButton}*/}
              {/*><GitHubIcon className={s.ghIcon} /><span style={{color: 'rgba(0, 0, 0, 0.54)'}}>Sign in with GitHub</span></LoginGithub>*/}

              <Chip color={'success'} startDecorator={<GoogleIcon />} onClick={google}>{t('login.google')}</Chip>
              <Chip startDecorator={<GitHubIcon />} onClick={gitHub}>{t('login.gh')}</Chip>
            </Stack>
          </div>
          <Divider />
          <Typography id="modal-modal-title"  component="h6">
            {t('login.or')}
          </Typography>

          <Login />

        </Box>
      </Modal>

    </div>
  );
}

export default ModalLogin