import React from "react";
import s from './Tags.module.scss'
import {Box, Checkbox, Chip, Typography} from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
import {Autocomplete, Paper, styled, TextField} from "@mui/material";


const CssTextField = styled(TextField)({
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'Public Sans',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    minWidth: '0px',
    outline: '0px',
    padding: '0px',
    border: 'none'
})


function Tags() {

    const [selected, setSelected] = React.useState<string[]>([]);

    return (
            <Box className={s.tags} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box>
                    <Box
                        role="group"
                        aria-labelledby="tags"
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                        {[
                            '#new',
                            '#old',
                            '#popular',
                            '#underground',
                            '#90s',
                            '#2000s',
                            '#80s',
                            '#newyear',
                            '#franch',
                        ].map((name) => {
                            const checked = selected.includes(name);
                            return (
                                <Chip
                                    key={name}
                                    variant={checked ? 'soft' : 'plain'}
                                    color={checked ? 'primary' : 'neutral'}
                                    startDecorator={
                                        checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                                    }
                                >
                                    <Checkbox
                                        variant="outlined"
                                        color={checked ? 'primary' : 'neutral'}
                                        disableIcon
                                        overlay
                                        label={name}
                                        checked={checked}
                                        onChange={(event) => {
                                            setSelected((names) =>
                                                !event.target.checked
                                                    ? names.filter((n) => n !== name)
                                                    : [...names, name],
                                            );
                                        }}
                                    />
                                </Chip>
                            );
                        })}
                    </Box>
                    <Autocomplete
                    fullWidth
                    id="tags"
                    options={['#60s', '#cars', '#dolls', '#marvel', '#russians', '#davidLynch', '#gyeRichy', '#tarantino', '#betchoven']}
                    // value={values.recipient}
                    // onChange={(e, value) => {
                    //     setFieldValue(
                    //         "recipient",
                    //         value !== null ? value : initialValues.recipient
                    //     );}}
                    //
                    renderInput={(params) => (
                        <CssTextField

                            // margin="normal"
                            placeholder="Search with tags..."

                            sx={{padding: '0px'}}
                            // name="recipient"
                            {...params}
                        />
                    )}
                />
                </Box>

            </Box>
    );
}

export default Tags;