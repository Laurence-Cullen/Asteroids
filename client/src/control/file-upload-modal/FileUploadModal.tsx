import React, {ChangeEvent} from "react";
import {Modal, ModalProps} from "../../framework/modal/Modal";
import {useControls} from "../control-context/ControlContext";

type FileEventTarget = HTMLInputElement & { files: FileList };

const FILE_LIST = [
    './asteroids/216kleopatra.stl',
    './asteroids/bella-the-cat.stl',
    './asteroids/golevka.stl',
    './asteroids/hw1.stl',
    './asteroids/mithra.stl',
    './asteroids/toutatis.stl',
    './asteroids/1620geographos.stl',
    './asteroids/utahteapot.stl',
    './spacecraft/voyager.stl',
    './asteroids/football.stl',
    './asteroids/sphere.stl',
    './asteroids/comet-67P-CG.stl'
];

const FileUploadModal: React.FC<ModalProps> = (props) => {
    const {
        file,
        setFile
    } = useControls();

    const handleLoadFileChange = (e: ChangeEvent<FileEventTarget>) => {
        setFile(
            window.URL.createObjectURL(e.target.files[0])
        );
    }

    const handleLoadExample = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (FILE_LIST.includes(val)) {
            setFile(val);
        }
    }

    let selectedFile = "custom-file";
    if (file && FILE_LIST.includes(file)) {
        selectedFile = file;
    }

    return (
        <Modal {...props}>
            <div>
                Choose your own file:
                <input type="file" onChange={handleLoadFileChange} />
            </div>
            <p>
                Or load an example:
                <select onChange={handleLoadExample} value={selectedFile}>
                    <option value="custom-file">Select file</option>
                    {
                        FILE_LIST.map((name) =>
                            <option key={name} value={name}>{name}</option>
                        )
                    }
                </select>
            </p>
        </Modal>
    );
}

export { FileUploadModal };
