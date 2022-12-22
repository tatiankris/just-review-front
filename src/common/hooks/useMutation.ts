import {useState} from "react";
import {reviewsAPI} from "../../api/review-api";

type ParamsType = {
    url: string,
    method: "POST"
}
export const useMutation = () => {

    const [state, setState] = useState({
        isLoading: false,
        error: ''
    })

    const fn = async (file: any) => {
        setState({...state, isLoading: true})
        // console.log('UPLOAD', file)
        reviewsAPI.images(file).then((res) => {
            console.log('res.data' ,res.data)
            setState({isLoading: false, error: ''})
        }).catch((error: any) => {
            setState({isLoading: false, error: error.message})
            }
        );
    }
    return {mutate: fn, ...state}
}