import React, {useState} from "react";
import {convertToBase64} from "../../../../common/utils/convertToBase64";
import {UploadImageButton} from "./UploadImageButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import s from './UploadImage.module.scss'

type PropsType = {
    image: string
    callback: (file64: string) => void

}
export const DragDropImage = ({callback, image}: PropsType) => {

    // const [image, setImage] = useState()
    const [drag, setDrag] = useState(false)

    const dragStartHandler = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            const file = e.dataTransfer.files[0]
            // console.log('file: ', file)

            if (file.size < 400000) {
                convertToBase64(file, (file64: string) => {
                    // console.log('file64: ', file64)
                    callback(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                // alertErrorImg();
            }
        }
    }

    return (
        <div className={s.dragDrop}>

            {!image &&
                    <div className={drag ? `${s.dragDropBox} ${s.onDrag}` : `${s.dragDropBox}`}
                         onDragStart={(e) => dragStartHandler(e)}
                         onDragLeave={(e) => dragLeaveHandler(e)}
                         onDragOver={(e) => dragStartHandler(e)}
                         onDrop={(e) => onDropHandler(e)}
                    >
                        <CloudUploadIcon sx={{fontSize:'50px'}}/>
                        {
                            drag
                                ? <div className={s.informText}>Release to upload image</div>
                                : <div className={s.informText}>Drag and drop file</div>
                        }
                        <div className={s.dragItem}>OR</div>
                        <UploadImageButton callback={callback}/>
                    </div>
            }
            {
                image &&
                <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                width: '100%',
                    height: '100%'
            }}></div>

            }

        </div>
    )
}
