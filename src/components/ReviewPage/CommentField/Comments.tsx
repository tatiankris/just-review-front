import {Paper} from "@mui/material";
import {
    Box, Button,
    FormControl,
    FormLabel,
    IconButton,
    ListItemDecorator,
    Menu,
    MenuItem,
    Textarea,
    Typography
} from "@mui/joy";
import s from "../ReviewPage.module.scss";
import {FormatBold, FormatItalic, KeyboardArrowDown} from "@mui/icons-material";
import Comment from './Comment'
import React from "react";

function Comments() {
    return (
        <Paper sx={{backgroundColor: 'rgba(255, 226, 187, 0.57)', margin: '10px 0px'}} elevation={6}>
            <Box className={s.commentsBox}>
                <Typography padding={'4px'} fontSize={'14px'} fontWeight={'bold'}>
                    💬 Comments
                </Typography>

                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>

                <FormControl className={s.formControl}>
                    <FormLabel>🖊 Send comment</FormLabel>
                    <Textarea
                        placeholder="Type something here…"
                        minRows={3}
                        endDecorator={
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 'var(--Textarea-paddingBlock)',
                                    pt: 'var(--Textarea-paddingBlock)',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    flex: 'auto',
                                }}
                            >
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    // onClick={(event) => setAnchorEl(event.currentTarget)}
                                >
                                    <FormatBold/>
                                    <KeyboardArrowDown fontSize="medium"/>
                                </IconButton>
                                <Menu
                                    // anchorEl={anchorEl}
                                    // open={Boolean(anchorEl)}
                                    // onClose={() => setAnchorEl(null)}
                                    size="sm"
                                    placement="bottom-start"
                                    sx={{'--List-decorator-size': '24px'}}
                                >
                                    {['200', 'normal', 'bold'].map((weight) => (
                                        <MenuItem
                                            // key={weight}
                                            // selected={fontWeight === weight}
                                            // onClick={() => {
                                            //     setFontWeight(weight);
                                            //     setAnchorEl(null);
                                            // }}
                                            // sx={{ fontWeight: weight }}
                                        >
                                            <ListItemDecorator>
                                                {/*{fontWeight === weight && <Check fontSize="sm" />}*/}
                                            </ListItemDecorator>
                                            {weight === '200' ? 'lighter' : weight}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <IconButton
                                    // variant={italic ? 'soft' : 'plain'}
                                    // color={italic ? 'primary' : 'neutral'}
                                    // aria-pressed={italic}
                                    // onClick={() => setItalic((bool) => !bool)}
                                >
                                    <FormatItalic/>
                                </IconButton>
                                <Button variant={'soft'} sx={{ml: 'auto'}}>Send</Button>
                            </Box>
                        }
                        sx={{
                            minWidth: '40%',
                            maxWidth: '80%'
                            // fontWeight,
                            // fontStyle: italic ? 'italic' : 'initial',
                        }}
                    />
                </FormControl>
            </Box>
        </Paper>
    )

}

export default Comments;