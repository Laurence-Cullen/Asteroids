import React, {ChangeEvent} from "react";
import {Modal, ModalProps} from "../../framework/modal/Modal";
import {useControls} from "../control-context/ControlContext";

type FileEventTarget = HTMLInputElement & { files: FileList };

const FileUploadModal: React.FC<ModalProps> = (props) => {
    const {
        setFile
    } = useControls();

    const handleChange = (e: ChangeEvent<FileEventTarget>) => {
        setFile(
            window.URL.createObjectURL(e.target.files[0])
        );
    }

    return (
        <Modal {...props}>
            <form>
                <input type="file" onChange={handleChange} />
            </form>
        </Modal>
    );
}

export { FileUploadModal };
