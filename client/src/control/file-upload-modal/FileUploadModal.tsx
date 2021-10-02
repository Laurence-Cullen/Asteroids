import React, {ChangeEvent} from "react";
import {Modal} from "../../framework/modal/Modal";
import {useControls} from "../control-context/ControlContext";

type FileEventTarget = HTMLInputElement & { files: FileList };

const FileUploadModal: React.FC<{}> = () => {
    const {
        setFile
    } = useControls();

    const handleChange = (e: ChangeEvent<FileEventTarget>) => {
        setFile(
            window.URL.createObjectURL(e.target.files[0])
        );
    }

    return (
        <Modal
            title="Upload an STL file"
            width={200}
            height={100}
            initialPosition={[10, 200]}
        >
            <form>
                <input type="file" onChange={handleChange} />
            </form>
        </Modal>
    );
}

export { FileUploadModal };
