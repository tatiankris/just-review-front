import React, {useEffect, useState} from "react";
import s from './Tags.module.scss'
import {Box, Button, Checkbox, Chip, ChipDelete, FormLabel, Stack, styled, TextField, Typography} from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
// import {Autocomplete, Paper, styled, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import Autocomplete from "@mui/joy/Autocomplete";
import {getReviewsTC} from "../../store/reducers/reviewsReducer";
import {setSearchTagsAC} from "../../store/reducers/tagsReducer";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";



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
    maxWidth: '200px',
    outline: '0px',
    padding: '0px',
    border: 'none'
})


function Tags() {
    const iSmallScreen = useMediaQuery({ query: '(max-width: 728px)' })

    const dispatch = useAppDispatch()
    const allTags = useAppSelector(state => state.tags.tags)

    const searchTags = useAppSelector(state => state.tags.searchTags)
    // const startTags = allTags.slice(0, 12)
    // const nextTags = allTags.slice(12)
    // const [tags, setTags] = React.useState<Array<{ title: string }>>([...startTags]);
    //  const renderTags = tags.length ? tags : startTags
    // console.log("allTags", startTags)
    // console.log("selected", selected)
    // const [value, setValue] = React.useState<Array<{title: string}>>([]);
    const { t } = useTranslation();
    const [selected, setSelected] = React.useState<Array<{title: string}>>([]);

    const theme = useAppSelector(state => state.app.mode)

    const handleChange = (value: any) => {
        setSelected([value, ...selected])

    }

    useEffect(() => {
            const tags = selected.map(t => t.title)
        dispatch(setSearchTagsAC(tags))
    }, [selected])

    const handleReset = () => {
        setSelected([])
    }

    const handleApply = () => {
        if (selected.length) {

            const tags = selected.map(t => t.title)
            console.log('selected', tags)
            // dispatch(getReviewsTC(null, tags))
            dispatch(getReviewsTC())
        } else {
            // dispatch(getReviewsTC(null, null))
            dispatch(getReviewsTC())
        }
    }

    return (
            <Box className={s.tags}>

                    <Box
                        className={s.tagsField}
                        role="group"
                        aria-labelledby="tags"
                    >
                        {
                            selected.map(t => {
                                return <Chip
                                    size={iSmallScreen ? 'sm' : 'md'}
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
                    <Stack spacing={0.2} className={s.autocompleteStack} direction={iSmallScreen ? 'column' : 'row'}>
                    <Autocomplete
                        variant={theme ? 'solid' : 'outlined'}
                        size={iSmallScreen ? 'sm' : 'md'}
                        className={s.tagsAutocomplete}
                        id={'tagsSearch'}
                        placeholder={`${t('tags.tagsSearch')}`}
                        options={allTags}
                        isOptionEqualToValue={(option: string | {title: string}, value: string | {title: string}) => {
                            const optionTitle = typeof option === "string" ? option : option.title;
                            const valueTitle = typeof value === "string" ? value : value.title;
                            return optionTitle === valueTitle;
                        }}
                        limitTags={5}
                        onChange={(event, value) => {
                           if (value && !selected.find(s => s.title === value.title)) {
                               console.log('new value: ', value)
                               handleChange(value);
                           }
                           else {
                               console.log('value already exist: ', value)
                           }

                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
                    />
                        <Stack  className={s.buttonStack} direction={'row'} spacing={0.2}>
                            <Button size={iSmallScreen ? 'sm' : 'md'} onClick={handleApply} className={s.buttonApply} variant={'solid'}
                                    color={"info"}>{t('tags.apply')}</Button>
                            <Button size={iSmallScreen ? 'sm' : 'md'} onClick={handleReset} className={s.buttonApply} variant={'soft'}
                                    color={"success"} style={{border: theme ? 'none' : '1px solid green'}}>{t('tags.reset')}</Button>
                        </Stack>
                    </Stack>
            </Box>
    );
}

export default Tags;