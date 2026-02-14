import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import { getSpreadsheet } from './spreadsheet.js';
import path from 'path';
import dns from 'dns/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailTemplate = fs.readFileSync(
  path.join(__dirname, '../templates/email.html'),
  'utf-8'
);

async function isEmailDomainValid(email) {
  const domain = email.split('@')[1];

  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (e) {
    return false;
  }
}

export async function emailAutomation({
  spreadsheetUrl,
  sheetName,
  emailColumnIndex = 2,
  nameColumnIndex = 1,
  statusColumnIndex = 3,
  dateColumnIndex = 4,
  emailSender,
  smtpUser,
  smtpPass,
  delay = 15000,
}) {
  const template = handlebars.compile(emailTemplate);

  const sheet = await getSpreadsheet({
    url: spreadsheetUrl,
    sheetName,
  });

  const rows = await sheet.getRows();

  const data = rows
    .map((row, index) => ({
      email: row._rawData[emailColumnIndex],
      nameSchool: row._rawData[nameColumnIndex],
      status: row._rawData[statusColumnIndex],
      rowIndex: index,
    }))
    .filter(
      d =>
        d.email &&
        d.email !== 'Email' &&
        d.email !== '-' &&
        d.email !== '' &&
        d.status !== 'Terkirim' &&
        d.status !== 'Gagal' &&
        d.status !== 'Invalid'
    );

  console.log(`Total email terbaca: ${data.length}`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const limit = data.length;

  for (let i = 0; i < limit; i++) {
    const { email, nameSchool, rowIndex } = data[i];
    const row = rows[rowIndex];

    console.log(`(${i + 1}/${limit}) validasi domain: ${email}`);

    const domainValid = await isEmailDomainValid(email);

    if (!domainValid) {
      row._rawData[statusColumnIndex] = 'Invalid';
      row._rawData[dateColumnIndex] = new Date().toLocaleString('id-ID');
      await row.save();

      continue;
    }

    console.log(`Mengirim ke: ${email}`);

    try {
      const html = template({ nama_sekolah: nameSchool });

      await transporter.sendMail({
        from: emailSender,
        to: email,
        subject: 'Undangan Olimpiade Matematika 26 FKIP Universitas Riau',
        html,
      });

      row._rawData[statusColumnIndex] = 'Terkirim';
      row._rawData[dateColumnIndex] = new Date().toLocaleString('id-ID');
      await row.save();
    } catch (err) {
      row._rawData[statusColumnIndex] = 'Gagal';
      row._rawData[dateColumnIndex] = new Date().toLocaleString('id-ID');
      await row.save();
    }

    if (i < limit - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('Selesai mengirim email...');
}
