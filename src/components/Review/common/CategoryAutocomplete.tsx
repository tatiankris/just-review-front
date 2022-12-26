import React, {useState} from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import {FormControl, FormLabel} from "@mui/joy";
import {FormikErrors} from "formik/dist/types";
import {CreateFormikType} from "../CreateReview/CreateReviewForm";
import s from "../CreateReview/CreateReview.module.scss";

type AutocompleteType = {
    categoryOptions: Array<{ title: string }>
    value: { title: string }
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<CreateFormikType>> | Promise<void>
}

export const CategoryAutocomplete = ({ setFieldValue, value , categoryOptions, ...props}: AutocompleteType) => {

    return (
        <FormControl  className={s.item}
                      // sx={{width: '100%'}}
        >
            <FormLabel>Category</FormLabel>
            <Autocomplete
                id={'category'}
                placeholder={'category'}
                options={categoryOptions}
                value={value}
                isOptionEqualToValue={(option: string | {title: string}, value: string | {title: string}) => {
                    const optionTitle = typeof option === "string" ? option : option.title;
                    const valueTitle = typeof value === "string" ? value : value.title;
                    return optionTitle === valueTitle;
                }}
                sx={{width: '100%'}}
                onChange={(event, value) => {
                    console.log('now value: ', value)
                    setFieldValue('category',value);
                }}
                getOptionLabel={(option) => option.title}
            />
        </FormControl>
    )
}