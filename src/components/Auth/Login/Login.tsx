import React from "react";
import s from './Login.module.scss'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { TextField, Button } from "@mui/joy";
import {useAppDispatch} from "../../../common/utils/hooks";
import {loginTC} from "../../../store/reducers/authReducer";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        // .email('Enter a valid email')
        .min(2, 'Email too Short!')
        .max(50, 'Email too Long!')
        .required('Email is required'),
    password: Yup.string()
        .min(2, 'Password too Short!')
        .max(50, 'Password too Long!')
        .required('Password is required'),
});


const Login = () => {
    const dispatch = useAppDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values)
            dispatch(loginTC(values));

            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{width: '90%'}}>
            <form  style={{width: '90%', display: 'flex', alignItems:'center', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
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
                <Button sx={{marginTop: '6px', borderRadius: '22px'}} color="neutral" variant="solid"  type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
