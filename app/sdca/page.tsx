
"use client"
import React, { useEffect, useState } from 'react';
import BTCChart from "@/components/BTCChart";
import GaugeChart from "@/components/Gauge";
import Navbar from "@/components/Navbar";
import SDCAExplanation from "@/components/SDCAExplanation";
import { fetchBTCPrices } from '@/lib/fetchBTCPrices'; // Ensure this path is correct
import { fetchZScores } from '@/lib/fetchZScore';

export default function Home() {
    // State to store fetched data
    const [btcData, setBtcData] = useState<any[]>([]);
    const [zScoreData, setZScoreData] = useState<any[]>([]);

    // Fetch data on component mount
    useEffect(() => {
        const loadData = async () => {
            const btcPrices = await fetchBTCPrices();
            const zScores = await fetchZScores();

            
            setBtcData(btcPrices);
            setZScoreData(zScores);
        };

        loadData();
    }, []);

    // Calculate the last Z-Score value
    const lastZScoreValue = zScoreData.length > 0 ? zScoreData[zScoreData.length - 1].zScore : 0;

    return (
        <div>
            <Navbar />
            {/* Pass data to BTCChart */}
            <BTCChart btcData={btcData} zScoreData={zScoreData} />
            <div className="bg-gray-800 min-h-screen text-white flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-white mb-4">Strategic Dollar Cost Averaging (SDCA)</h2>
                <p> Current Z-Score: {-lastZScoreValue} </p>
                <GaugeChart value={-lastZScoreValue/2} />
                <SDCAExplanation imageSrc="/dollarCostAverage.jpg" zscoreSrc="/ZSCORE.png" indicatorSrc="/RHODL.png" />
            </div>
        </div>
    );
}
