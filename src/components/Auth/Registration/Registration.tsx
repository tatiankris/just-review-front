import React from "react";
import s from './Registration.module.scss'
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/joy";
import {registerTC} from "../../../store/reducers/authReducer";
import {useAppDispatch} from "../../../common/utils/hooks";

const Registration = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .min(2, 'Username too Short!')
                .max(22, 'Username too Long!')
                .required('Username is required'),
            email: Yup.string()
                // .email('Enter a valid email')
                .min(2, 'Email too Short!')
                .max(22, 'Email too Long!')
                .required('Email is required'),
            password: Yup.string()
                .min(2, 'Password too Short!')
                .max(22, 'Password too Long!')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (values) => {
            // console.log(values)
            dispatch(registerTC(values));
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{width: '90%'}}>
            <form  style={{width: '90%', display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{width: '100%'}}
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    sx={{width: '100%'}}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    Registration
                </Button>
            </form>
        </div>
    );
}

export default Registration;
