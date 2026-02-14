import { getSpreadsheet, writeSpreadsheet } from '../services/spreadsheet.js';

async function mergeSheet() {
  const sheetData = await getSpreadsheet({
    url: '1jZttl1oCxnCRKhphiFNohfKI1F1IxQTdtC5-WqR7hxg',
    sheetName: 'Kab. Bangli',
  });
  const rawData = await sheetData.getRows();
  const banned = [
    'nama',
    'nama sekolah',
    'sederajat',
    'kecamatan',
    'no',
    'email',
    'kabupaten',
    '/',
  ];
  const data = rawData
    .map(r => {
      let nama = (r._rawData[1] || '').trim();
      let email = (r._rawData[2] || '').trim();

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
    sheetName: 'Kabupaten Bangli',
    data,
  });
}

mergeSheet();
