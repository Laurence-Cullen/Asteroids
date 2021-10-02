import {Modal} from "../../framework/modal/Modal";
import React from "react";
import {Line} from "react-chartjs-2";

type LightCurveData = {
    curve: number[]
}

const LightCurveModal: React.FC<LightCurveData> = (props) => {
    const {
        curve
    } = props;

    const options = {

    }

    const data = {
        labels: curve.map((_a,i) => i),
        datasets: [
            {
                label: 'Light curve',
                data: curve,
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(255, 255, 255, 0.8)',
            },
        ],
    };

    return (
        <Modal
            title="Rendered light curve"
            width={1000}
            height={500}
            initialPosition={[window.screen.width - 1010, 100]}
        >
            <Line data={data} options={options} />
        </Modal>
    )
}

export { LightCurveModal, LightCurveData };
