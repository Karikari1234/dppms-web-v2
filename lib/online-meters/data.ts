// Time series data type
export interface TimeSeriesEntry {
  month_name: string;
  month_num: number;
  year: number;
  meter_count: number;
}

// Region data type
export interface RegionData {
  region: string;
  count: number;
}

// Time series data - Online meter growth by month
export const timeSeriesData: TimeSeriesEntry[] = [
  { month_name: "APRIL", month_num: 4, year: 2024, meter_count: 6331 },
  { month_name: "MAY", month_num: 5, year: 2024, meter_count: 19910 },
  { month_name: "JUNE", month_num: 6, year: 2024, meter_count: 25699 },
  { month_name: "JULY", month_num: 7, year: 2024, meter_count: 34949 },
  { month_name: "AUGUST", month_num: 8, year: 2024, meter_count: 36945 },
  { month_name: "SEPTEMBER", month_num: 9, year: 2024, meter_count: 243243 },
  { month_name: "OCTOBER", month_num: 10, year: 2024, meter_count: 266316 },
  { month_name: "NOVEMBER", month_num: 11, year: 2024, meter_count: 370380 },
  { month_name: "DECEMBER", month_num: 12, year: 2024, meter_count: 403483 },
  { month_name: "JANUARY", month_num: 1, year: 2025, meter_count: 374749 },
  { month_name: "FEBRUARY", month_num: 2, year: 2025, meter_count: 430898 },
  { month_name: "MARCH", month_num: 3, year: 2025, meter_count: 437738 }
];

// Geographical data - Distribution of meters by region
export const geographicalData: RegionData[] = [
  { region: "Chittagong", count: 216074 },
  { region: "Comilla", count: 182001 },
  { region: "Sylhet", count: 45892 }
];

// Total meters - This could come from an API in a real application
export const totalMeters = 353860;