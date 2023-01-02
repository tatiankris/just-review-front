import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../common/utils/hooks";
import {googleAuthTC} from "../../store/reducers/authReducer";

export const GoogleAuth = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
         dispatch(googleAuthTC())
    }, [])

    return (
        <div>
            google auth
        </div>
    )
}
