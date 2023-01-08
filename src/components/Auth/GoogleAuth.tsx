import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/utils/hooks";
import {googleAuthTC} from "../../store/reducers/authReducer";

export const GoogleAuth = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
         dispatch(googleAuthTC())
    }, [])

    const search = useAppSelector(state => state.reviews.search)
    useEffect(() => {
        if (search.length) {
            navigate('/home')
        }
    }, [search])

    return (
        <div>
            google auth
        </div>
    )
}
