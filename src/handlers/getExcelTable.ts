import { ExcelData } from '@/lib/types';
import xlsx, { IJsonSheet } from 'json-as-xlsx';

export const getExcelTable = (data: ExcelData[]) => {
  const firstItemKeys = Object.keys(data[0]).filter(i => i !== '__v');
  const columns: IJsonSheet[] = [
    {
      sheet: 'Dashboard Info',
      columns: firstItemKeys.map(key => ({
        label: key,
        value: key,
      })),
      content: data.map(item => ({...item})),
    },
  ];

  const settings = {
    fileName: 'Dashboard Info',
  };

  xlsx(columns, settings);
};
