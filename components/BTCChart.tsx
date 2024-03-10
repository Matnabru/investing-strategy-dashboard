// Note that fetchBTCPrices and fetchZScores imports are no longer needed.

"use client"
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { SimplifiedBinanceKline } from '@/lib/fetchBTCPrices';
import { ZScoreRow } from '@/lib/fetchZScore';

type BtcChartType = {
    btcData: SimplifiedBinanceKline[],
    zScoreData: ZScoreRow[]
}

const BTCChart = ({ btcData, zScoreData }: BtcChartType) => {
    const [series, setSeries] = useState<any[]>([]);

    useEffect(() => {
        // Assuming btcData and zScoreData are already in the expected format,
        // directly map them to the format required by ApexCharts.
        const btcPriceData = btcData.map(d => ({
            x: new Date(d.closeTime).toISOString(),
            y: parseFloat(d.close)
        }));

        const formattedZScoreData = zScoreData.map(d => ({
            x: new Date(d.date).toISOString(),
            y: (d.zScore ? -d.zScore : d.zScore)
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
    // The useEffect dependency array now includes btcData and zScoreData to re-render when these props change.
    }, [btcData, zScoreData]);

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
