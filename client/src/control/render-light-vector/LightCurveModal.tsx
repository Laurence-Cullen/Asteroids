import {Modal} from "../../framework/modal/Modal";
import React from "react";
import {Line} from "react-chartjs-2";
import {ChartOptions} from "chart.js";

type LightCurveData = {
    curve: number[]
}

const LightCurveModal: React.FC<LightCurveData> = (props) => {
    const {
        curve
    } = props;

    const options: ChartOptions = {
        scales: {
            xAxis: {
                title: {
                    display: true,
                    text: 'Degree of rotation',
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            },
            yAxis: {
                title: {
                    display: true,
                    text: 'Light intensity',
                    color: 'white'
                },
                min: 0,
                max: 1,
                ticks: {
                    color: 'white'
                }
            }
        }
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
            initialPosition={[document.body.clientWidth - 1010, 100]}
        >
            <Line data={data} options={options} />
        </Modal>
    )
}

export { LightCurveModal, LightCurveData };
