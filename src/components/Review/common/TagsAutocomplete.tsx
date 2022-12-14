import React, {useState} from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import {FormControl, FormLabel} from "@mui/joy";
import {FormikErrors} from "formik/dist/types";
import {CreateFormikType} from "../CreateReview/CreateReviewForm";

type AutocompleteType = {
    tagsOptions: Array<{ title: string } | string>
    values: Array<{ title: string } | string>
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<CreateFormikType>> | Promise<void>
}

export const TagsAutocomplete = ({ setFieldValue, values , tagsOptions, ...props}: AutocompleteType) => {

    const [inputValue, setInputValue] = useState('')

    return (
        <FormControl sx={{width: '60%'}}>
            <FormLabel>Tags</FormLabel>
            <Autocomplete
                multiple
                id={'tags'}
                placeholder={'tags'}
                options={tagsOptions}
                value={values}
                isOptionEqualToValue={(option: string | {title: string}, value: string | {title: string}) => {
                    const optionTitle = typeof option === "string" ? option : option.title;
                    const valueTitle = typeof value === "string" ? value : value.title;
                    return optionTitle === valueTitle;
                }}
                limitTags={5}
                sx={{width: '100%'}}
                onChange={(event, value) => {
                    console.log('now value: ', value)
                    setFieldValue('tags',value);
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                onInputChange={(event, value) => {
                    setInputValue(value)
                }}
                inputValue={inputValue}

            />
        </FormControl>
    )
}