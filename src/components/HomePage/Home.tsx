import React from "react";
import {Container, Grid} from "@mui/joy";
import Tags from "../Tags/Tags";
import Review from "../Review/Review";


function Home() {
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
                            <Review />
                        </div>

                    </Grid>
                    <Grid xs={4}>

                       <Tags />

                    </Grid>
                </Grid>
            </Container>

    );
}

export default Home;