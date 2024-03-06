import axios from 'axios';
import { subDays, differenceInCalendarDays, addDays } from 'date-fns';

interface SimplifiedBinanceKline {
  close: string;
  closeTime: number;
}

const fetchKlinesInInterval = async (startTime: number, endTime: number): Promise<SimplifiedBinanceKline[]> => {
  const response = await axios.get('https://api.binance.com/api/v3/klines', {
    params: {
      symbol: 'BTCUSDT',
      interval: '1d',
      startTime,
      endTime,
      limit: 1000,
    },
  });
  return response.data.map((item: any[]) => ({
    close: item[4], // Date
    closeTime: item[6],
  }));
};

export const fetchBTCPrices = async (): Promise<SimplifiedBinanceKline[]> => {
  const startDate = new Date('2018-01-01');
  const endDate = new Date();
  let fetchedData: SimplifiedBinanceKline[] = [];
  
  let diffDays = differenceInCalendarDays(endDate, startDate);
  
  while (diffDays > 0) {
    let batchStartDate = subDays(endDate, diffDays);
    let startTime = batchStartDate.getTime();
    let endTime = Math.min(addDays(batchStartDate, 1000).getTime(), endDate.getTime()); // End time for the batch or current date
    
    const data = await fetchKlinesInInterval(startTime, endTime);
    fetchedData = fetchedData.concat(data);
    
    diffDays = differenceInCalendarDays(endDate, addDays(batchStartDate, data.length));
  }
  
  return fetchedData;
};
