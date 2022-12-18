import {Avatar, Box, Card, CardOverflow, Divider, Typography} from "@mui/joy";
import s from "../ReviewPage.module.scss";
import React from "react";
import {CommentType} from "../../../store/reducers/commentsReducer";


type CommentPropsType ={
    comment: CommentType
}
function Comment({comment,...props}: CommentPropsType) {

    return (
        <Box className={s.commentsStack}>
            <Card variant="outlined" sx={{margin: '0px'}}>
                <Box className={s.comment}>
                    <Box style={{display: 'inline-flex', alignItems: 'center'}}><Avatar sx={{"--Avatar-size": "20px"}}/>
                        <span style={{fontSize: '14px', fontWeight: 'bold'}}>
                            Иван Иванов
                        </span>
                    </Box>
                    <Typography mb={1} lineHeight="sm" textAlign={'start'}>
                        {comment.text}
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
                        {comment.createdAt.slice(0, 10)}
                    </Typography>
                </CardOverflow>
            </Card>
        </Box>
    )
}

export default Comment;