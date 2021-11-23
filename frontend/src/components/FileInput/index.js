import React, { Fragment, useEffect, useState } from "react";

import "./fileInput.css";
// const initImg = "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg";
export default ({ profileURL, onChange, className = "" }) => {
    const [images, setImages] = useState([]);
    const onFileChange = async (file) => {
        const fileRefs = file.target.files;
        const allFileReader = await Promise.all(Object.values(fileRefs).map(fileDataConvertToBinary));
        setImages(allFileReader);
        onChange && onChange(allFileReader);
    };

    useEffect(() => {
        const getImage = async () => {
            if (profileURL) {
                try {
                    setImages([]);
                } catch (error) {}
            }
        };
        getImage();
    }, [profileURL]);

    const onRemoveImg = (index) => {
        const copyImages = [...images];
        copyImages.splice(index, 1);
        setImages(copyImages);
        onChange && onChange(copyImages);
    };

    return (
        <Fragment>
            <div className={`file-upload ${className}`}>
                <label>
                    <div>
                        <img src="https://static.thenounproject.com/png/3546661-200.png" height="60" width="60" />
                    </div>
                    Drag and drop or browse your files
                    {onChange && (
                        <input type="file" accept="image/*" className="file-input" onChange={onFileChange} alt="product images" multiple />
                    )}
                </label>
            </div>
            <div className="file-prev-container">
                {images.map((fileObj, i) => (
                    <PrevImage key={`file-prev-${i}`} onRemoveImg={() => onRemoveImg(i)} {...fileObj} />
                ))}
            </div>
        </Fragment>
    );
};

function PrevImage({ onRemoveImg, fileData }) {
    return (
        <div className="file-prev-img">
            <img src={fileData} />
            <span onClick={onRemoveImg}>X</span>
        </div>
    );
}

function fileDataConvertToBinary(file) {
    const { type: fileType, name: fileName } = file;
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onloadend = ({ target: { result: fileData } }, ...rest) => {
            res({ fileName, fileType, fileData });
        };
        reader.readAsDataURL(file);
    });
}
