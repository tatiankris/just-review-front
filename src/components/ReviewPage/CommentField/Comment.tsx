import {Avatar, Box, Card, CardOverflow, Divider, Typography} from "@mui/joy";
import s from "../ReviewPage.module.scss";
import React from "react";

function Comment() {
    return (
        <Box className={s.commentsStack}>
            <Card variant="outlined" sx={{margin: '0px'}}>
                <Box className={s.comment}>

                    <Box style={{display: 'inline-flex', alignItems: 'center'}}><Avatar sx={{
                        "--Avatar-size": "20px"
                    }}/><span style={{fontSize: '14px', fontWeight: 'bold'}}>Иван Иванов</span>
                    </Box>

                    <Typography mb={1} lineHeight="sm" textAlign={'start'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet beatae deserunt,
                        ea error esse, eum id maxime, mollitia natus nesciunt nisi odit officia quam ratione
                        reprehenderit saepe sit veritatis.
                    </Typography>

                </Box>


                <Divider/>
                <CardOverflow
                    variant="soft"
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        py: 1.5,
                        px: 'var(--Card-padding)',
                        bgcolor: 'background.level1',
                    }}
                >
                    <Typography level="body3" sx={{fontWeight: 'md', color: 'text.secondary'}}>
                        12.12.2022
                    </Typography>
                </CardOverflow>
            </Card>
        </Box>
    )
}

export default Comment;