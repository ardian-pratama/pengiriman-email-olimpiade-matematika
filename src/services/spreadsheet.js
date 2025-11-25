import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credential = fs.readFileSync(
  path.join(__dirname, '../../service-key.json')
);

export async function getSpreadsheet({ url, sheetName }) {
  const auth = new JWT({
    email: credential.client_email,
    key: credential.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(url, auth);
  await doc.loadInfo();

  return doc.sheetsByTitle[sheetName];
}

export async function writeSpreadsheet({ url, sheetName, data }) {
  const sheet = await getSpreadsheet({ url, sheetName });
  await sheet.addRows(data);

  console.log('selesai menulis...');
}
