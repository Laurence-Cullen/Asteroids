import React from "react";
import {RotationModal} from "./rotation-modal/RotationModal";
import {FileUploadModal} from "./file-upload-modal/FileUploadModal";

const Controls: React.FC<{}> = () => {
    return (
        <>
            <RotationModal />
            <FileUploadModal />
        </>
    );
}

export { Controls };
