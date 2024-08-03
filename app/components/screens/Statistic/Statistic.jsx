import * as React from 'react';
import styles from './Statistic.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '../../ui/Left/LeftIntro';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);


const Statistic = () => {
    const { lan } = React.useContext(Context);
    const data = [
        { value: 30, label: 'Faol lidlar', icon: 'fa-user' },
        { value: 15, label: 'Faol talabalar', icon: 'fa-user-group' },
        { value: 4500, label: 'Guruxlar', icon: 'fa-layer-group' },
        { value: 120, label: 'Qarzdorlar', icon: 'fa-triangle-exclamation' },
        { value: 75, label: 'Sinov darsida', icon: 'fa-check-to-slot' },
        { value: 50, label: 'Joriy oyda to`laganlar', icon: 'fa-dollar-sign' },
        { value: 20, label: 'Faol guruxni tark etganlar', icon: 'fa-user-xmark' },
        { value: 5, label: 'Sinov muddatidan keyin ketdi', icon: 'fa-user-minus' }
    ];

    const dataLineChart = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#FF6A77',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: '#4285F4',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    }
    const optionsLineChart = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#EAE9FA',
                },
            },
        },
    };

    const dataDoughnutChart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
            {
                data: [12, 19, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    '#fff',
                ],
                borderWidth: 5,
                borderRadius: 20,
            },
        ],
    };

    const optionsDoughnutChart = {
        responsive: true,
        cutout: '70%',
        circumference: 360,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    };


    return (
        <LeftIntro>
            <div className={styles.statistic}>
                <div className={styles.statistic__top}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.statistic__top__item}>
                            <p className={styles.statistic__top__item__icon}>
                                <i className={`fa-solid ${item.icon}`}></i>
                            </p>
                            <span className={styles.statistic__top__item__element}>
                                <b>{item.value}</b>
                                <p>{item.label}</p>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.statistic__chart}>
                    <div className={styles.statistic__chart__line}>
                        <Line data={dataLineChart} options={optionsLineChart} />
                    </div>
                    <div className={styles.statistic__chart__doughnut}>
                        <h5 className={styles.statistic__chart__doughnut__title}>Statistika</h5>
                        <Doughnut data={dataDoughnutChart} options={optionsDoughnutChart} />
                    </div>
                </div>
            </div>
        </LeftIntro>
    )
}

export default Statistic;