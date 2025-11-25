import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get('/download', async (req, res) => {
  try {
    const html = `
      <html>
        <body>
          <h1>PDF Ukuran F4</h1>
          <p>Ini PDF dengan ukuran kertas F4 (210mm x 330mm).</p>
        </body>
      </html>
    `;

    const pdfBuffer = await pdf.generatePdf(
      { content: html },
      {
        printBackground: true,
        width: '210mm',
        height: '330mm',
        margin: {
          top: '20mm',
          bottom: '20mm',
          left: '15mm',
          right: '15mm',
        },
      }
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=laporan.pdf');

    return res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send('Gagal membuat PDF');
  }
});

app.listen(3000, () => {
  console.log(`Server berjalan di port ${3000}`);
});
