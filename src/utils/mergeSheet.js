import { getSpreadsheet, writeSpreadsheet } from '../services/spreadsheet.js';

async function mergeSheet() {
  const sheetData = await getSpreadsheet({
    url: '1tIoWL33yaJZ2Mv6UI2CmYW8WjBOm-Rt93-cJLkJc1OU',
    sheetName: 'KOTA BATAM',
  });
  const rawData = await sheetData.getRows();
  const banned = ['nama', 'nama sekolah', 'sederajat', 'kecamatan'];
  const data = rawData
    .map(r => {
      const nama = r._rawData[1];
      let email = r._rawData[2];

      if (email === '-') email = '';

      return { nama, email };
    })
    .filter(r => {
      const nama = (r.nama || '').toLowerCase();

      return nama && !banned.some(b => nama.includes(b));
    })
    .map((r, i) => [i + 1, r.nama, r.email]);

  await writeSpreadsheet({
    url: '19rV_Z1oY9EhMh-fUKLFBQ-e_ZotcgFkLavuMZDjjnjg',
    sheetName: 'Kota Batam',
    data,
  });
}

mergeSheet();
