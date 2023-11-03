import xlsx, { IJsonSheet } from 'json-as-xlsx';

export const getExcelTable = () => {
  const columns: IJsonSheet[] = [
    {
      sheet: 'Dashboard Info',
      columns: [
        { label: 'Id', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ],
      content: [
        { id: 1, name: 'Leanne', email: 'Sincere@april.biz', phone: '1-770-736-8031' },
        { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', phone: '90566-7771' },
      ],
    },
  ];

  const settings = {
    fileName: "MySpreadsheet"
  }

  xlsx(columns, settings)
};
