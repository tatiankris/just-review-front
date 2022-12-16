import React, {useState} from "react";
import s from './Tags.module.scss'
import {Box, Button, Checkbox, Chip, ChipDelete, FormLabel, styled, TextField, Typography} from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
// import {Autocomplete, Paper, styled, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import Autocomplete from "@mui/joy/Autocomplete";


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

    const dispatch = useAppDispatch()
    const allTags = useAppSelector(state => state.tags.tags)

    // const startTags = allTags.slice(0, 12)
    // const nextTags = allTags.slice(12)
    // const [tags, setTags] = React.useState<Array<{ title: string }>>([...startTags]);
    //  const renderTags = tags.length ? tags : startTags
    // console.log("allTags", startTags)
    // console.log("selected", selected)
    // const [value, setValue] = React.useState<Array<{title: string}>>([]);

    const [selected, setSelected] = React.useState<Array<{title: string}>>([]);

    const handleChange = (value: any) => {
        setSelected([value, ...selected])
    }

    const handleApply = () => {
        if (selected.length) {
            // dispatch(searchReviewsByTags(selected))
        }

    }

    return (
            <Box className={s.tags} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box>
                    <Box
                        role="group"
                        aria-labelledby="tags"
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                        {
                            selected.map(t => {
                                return <Chip
                                    key={t.title}
                               variant={'soft'}
                              color={'primary'}
                                    endDecorator={<ChipDelete onClick={() => {
                                        const updatedTags = selected.filter(s => s.title !== t.title)
                                        setSelected(updatedTags)
                                    }}
                                    />}
                            >
                                    #{t.title}
                                </Chip>
                            })
                        }

                    </Box>

                    <FormLabel>Search tags</FormLabel>
                    <Autocomplete
                        id={'tagsSearch'}
                        placeholder={'Search...'}
                        options={allTags}
                        isOptionEqualToValue={(option: string | {title: string}, value: string | {title: string}) => {
                            const optionTitle = typeof option === "string" ? option : option.title;
                            const valueTitle = typeof value === "string" ? value : value.title;
                            return optionTitle === valueTitle;
                        }}
                        limitTags={5}
                        sx={{width: '100%'}}
                        onChange={(event, value) => {
                           if (value && !selected.includes(value)) {
                               console.log('new value: ', value)
                               handleChange(value);
                           }
                            console.log('value already exist: ', value)
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
                    />
                    <Button onClick={handleApply} sx={{marginTop: '8px'}} variant={'solid'} color={"info"}>Apply</Button>
                </Box>


            </Box>
    );
}

export default Tags;