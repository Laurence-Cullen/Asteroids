import React, {useEffect, useState} from "react";
import classNames from "classnames";

import "./Modal.scss";

type ModalProps = {
    title?: string;
    initialPosition?: [number, number],
    width: number;
    height: number;
    order?: number;
    reverse?: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
    const {
        children,
        title,
        initialPosition,
        width,
        height,
        order
    } = props;

    const [visible, setVisible] = useState(true);
    const [expanded, setExpanded] = useState(true);
    const [position, setPosition] = useState<[number, number]>(initialPosition ? initialPosition : [0, 0]);

    const [
        x, top
    ] = position;

    const zIndex = order || 1;

    useEffect(() => {
        document.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);
    }, [])

    const modalStyle: React.CSSProperties = {
        top: `${top}px`,
        left: `${x}px`,
        visibility: visible ? 'inherit' : 'hidden',
        zIndex
    }

    return (
        <div
            className="modal"
            style={modalStyle}
        >
            <div
                className="modal-header"
                draggable={true}
                onDragEnter={() => setVisible(false)}
                onDragEnd={(e) => {
                    e.preventDefault();
                    setPosition([e.clientX, e.clientY]);
                    setVisible(true);
                }}
            >
                <i className="modal-title">
                    {title ? title : ''}
                </i>
                <div className="modal-expand">
                    <button onClick={() => setExpanded((current) => !current)}>
                        {expanded ? '^' : 'v'}
                    </button>
                </div>
            </div>
            <div
                className={classNames(
                "modal-content",
                )}
                aria-hidden={!expanded}
                style={{
                    width: `${width}px`,
                    height: expanded ? `${height}px` : 0
                }}
            >
                {children}
            </div>
        </div>
    );
}

export { Modal, ModalProps };
