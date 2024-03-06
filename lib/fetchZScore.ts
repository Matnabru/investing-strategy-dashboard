// Define interfaces to represent the expected structure of the API response
interface GoogleVizResponse {
    table: {
      cols: Array<{ id?: string; label?: string; type?: string; pattern?: string }>;
      rows: Array<{
        c: Array<{ v: any; f?: string | null } | null>;
      }>;
    };
  }
  
  interface ZScoreRow {
    date: string;
    zScore: number | null;
  }
  export const fetchZScores = async (): Promise<ZScoreRow[]> => {
    const spreadsheetId = '1eJ_Yfljx9-EAxhCDzruU29fmePFnuPWtJXg-ortUunk';
    const sheetName = 'Forward Testing';
    const queryString = encodeURIComponent('SELECT A, B');
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?sheet=${sheetName}&headers=1&tq=${queryString}`;
  
    try {
      const response = await fetch(url);
      const text = await response.text();
      const match = text.match(/(?<=\().*(?=\);)/gs);
      if (!match || match.length === 0) {
        throw new Error('No data found or could not parse data');
      }
      const jsonText = match[0];
      const data: GoogleVizResponse = JSON.parse(jsonText);
  
      const rows: ZScoreRow[] = data.table.rows.map(row => {
        // Attempt to use the formatted date if available, otherwise use the raw value
        const date = row.c[0]?.f || row.c[0]?.v;
        const zScore = typeof row.c[1]?.v === 'number' ? row.c[1].v : null;
  
        return date ? { date: String(date), zScore } : null;
      }).filter((row): row is ZScoreRow => row !== null);
  
      return rows;
    } catch (error) {
      console.error('Error fetching Z-Score data:', error);
      return [];
    }
  };
  
  