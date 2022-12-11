import React from "react";
import {Avatar, Box, Button, Container, Grid} from "@mui/joy";
import Review from "../Review/Review";
import s from './ProfilePage.module.scss'
import Tags from "../Tags/Tags";
import { Paper } from "@mui/material";
import CreateReviewModal from "../Review/CreateReview/CreateReviewModal";


function ProfilePage() {
    return (
        <Container maxWidth="lg"
                   sx={{marginTop: '80px'}}
        >
            <Grid container spacing={3} sx={{padding: '0px 80px'}}>
                <Grid xs={8}>
                    <div>
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />

                    </div>

                </Grid>
                <Grid xs={4}>

                    <Paper elevation={8}>
                        <Box className={s.profileInfo}>

                            <Box style={{display: 'inline-flex', alignItems: 'center'}}><Avatar sx={{
                                "--Avatar-size": "80px"
                            }}  /><span style={{fontSize: '24px', fontWeight: 'bold'}}>{"  "}Иван Иванов</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                ❤️
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'red'}}>318</span>
                            </Box>
                            <Box style={{display: 'inline-flex', alignItems: 'center', height: '40px', fontSize: '34px', paddingLeft: '16px'}}>
                                📃
                                <span style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>6</span>
                            </Box>
                            <Box style={{marginTop: "8px", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '40px', fontSize: '34px'}}>

                                <CreateReviewModal />
                            </Box>

                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage;