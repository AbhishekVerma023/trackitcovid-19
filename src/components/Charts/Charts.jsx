import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Charts.module.css' ;

const Charts = ( {data :{ confirmed, deaths, recovered}, country }) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData());
        }
       // console.log(dailyData);
        fetchAPI();
    },[setDailyData]);

    const lineChart = (
        dailyData[0] ? (
            <Line 
                data = {{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data : dailyData.map(({ confirmed }) => confirmed ),
                        label : 'Infected',
                        borderColor : '#3333ff',
                        fill: true,
                    }, {
                        data : dailyData.map(({ deaths }) => deaths ),
                        label : 'Deaths',
                        borderColor : 'red',
                        backgroundColor : 'rgba(255, 0, 0, 0.5)',
                        fill: true, 
                    }],
                }}
            />

        ) : null 
    );

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected','Active', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['blue', 'orange', 'green', 'red'],
                  data: [confirmed.value, confirmed.value-recovered.value-deaths.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );
    

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>

    )
};

export default Charts;