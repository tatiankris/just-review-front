import React, {useState} from "react";
import {convertToBase64} from "../common/utils/convertToBase64";

const style = {
    width: 400,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18
}
const style2 = {
    width: '80%',
    height: '80%',
    border: '3px dashed grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey'
}
type PropsType = {
    callback: (file64: string) => void

}
export const DragDropImage = ({callback}: PropsType) => {

    // const [image, setImage] = useState()
    const [drag, setDrag] = useState(true)

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
            console.log('file: ', file)

            if (file.size < 400000) {
                convertToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    callback(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                // alertErrorImg();
            }
        }
    }

    return (
        <div style={style}>
            {
                drag
                    ? <div style={style2}
                           onDragStart={(e) => dragStartHandler(e)}
                           onDragLeave={(e) => dragLeaveHandler(e)}
                           onDragOver={(e) => dragStartHandler(e)}
                           onDrop={(e) => onDropHandler(e)}
                    >Отпустите файлы, чтоб загрузить их</div>
                    : <div
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        style={style2}>Перетащите файл в область загрузки</div>
            }
        </div>
    )
}
