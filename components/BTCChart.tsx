"use client"
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { fetchBTCPrices } from '@/lib/fetchBTCPrices'; // Ensure this path is correct
import { fetchZScores } from '@/lib/fetchZscore';

const BTCChart = () => {
    const [series, setSeries] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchBTCPrices();


            const btcPriceData = data.map(d => ({
                x: new Date(d.closeTime).toISOString(),
                y: parseFloat(d.close)
            }));

            const zScoreData = await fetchZScores();
            const formattedZScoreData = zScoreData.map(d => ({
                x: new Date(d.date).toISOString(),
                y: d.zScore
            }));

            setSeries([
                {
                    name: "BTC Price",
                    data: btcPriceData,
                },
                {
                    name: "Z-Score",
                    data: formattedZScoreData,
                }
            ]);
        };

        loadData();
    }, []);

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: [{
            title: {
                text: 'BTC Price',
            },
        }, {
            opposite: true,
            title: {
                text: 'Z-Score',
            },
            min: -3,
            max: 3,
        }],
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
    };

    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default BTCChart;
