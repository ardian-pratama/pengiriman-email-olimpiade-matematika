import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const credential = {
  type: 'service_account',
  project_id: 'axial-keep-478202-c6',
  private_key_id: '7d53fd2bc6f9049eeff55cded0bab97f64205e75',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnv8uzj+bP33v+\n0ekY/zq1xpTrGBv9TfV3hSrlW/97DEnjDkngEqONCFvMwP+YUvgyat+Jbf+8uPqJ\nqGrFK/P85ywZxC3B5QdqbpVSLxMxXFnEVVcHQPUM4qxod+nLquMk9+2dKi+SE5MR\nxDuHxuwL2QlSaUfh+iId8HbD3Yigq/IqgG+jwQBOUYw/UvFf8YtuxjiUIup7h3+s\nqR1/gleYzOPXzY5uP1lF6z0GF6xtP866QNLEfm7iFYGTHlQMYD02utCowFC136Ne\n14X/5PCmnfLvO8/SbzLLm++KXVp+pif//I+oYucpa98xiw9CKZd9K6gY2g8k+6LR\nSYC7SjXvAgMBAAECggEADbxCCEYZJrfS5e7EJyk6FaML+iMzb4GppSUaed59kQXu\nXhDppaPndmdsm0H8uIYN3C4tQ/B/OmTr4GFE7mrtHUeRSdueL4kt56rkWSIq1r8/\nSAWac0KZwUaLyjk/XU9ByBSKhUFS1QnIE6VXIB5lB4qFUK7ELwTiZ3cs3yUz+1ij\ny3jxEy1tPKNwSqwTiZYXNSiPrEwXWS56qg9f8cCVyVbf/oUpG6cw+qkJzw4fJLf7\nF54aNREBPQ/Nvr/ntLK/wRHwZXed/erURF8qOEyDMLUIUsNjSG5KolkhEz3wxsp1\nA89OX+1RNg1wvDEQZ2I0IW+BdECqqL0aV3XEensoeQKBgQDS7POR7HvZy39Afrvh\nORziUi1BwaF37AUCokl80Kq1CHya4XLdV53wiKi5kwfdHgLDamCPV+m2hdWEAGGe\nhrM3+mO0qh4leNhqq1WLdX+LNZS9XaK/U8E4YJQaTHGc3BCjnRndISpO6szwX1tS\nUHD+oojqNAAJLgUMUmKMriVZ0wKBgQDLmM4rJ/m5/u4JF5kMFYpruKU2q1JXJS5m\nToZE8qLMe1lBxLuNfVFWfAkLI9W9+xRBSWNlf0zZzwJwnRslLsWf7SJhqgpgBgDK\nnWFRzSi6ok4/eQO0Sat+j9Uv6c4MM1xTr04G8AlNSlXAoWvi0g2wiwDLb1YhQwcK\n6OFxApll9QKBgQCdI6zepRksDEB0kzZzt7H+JozS9WfPSQX+jVtEYs0a7ASw+o8x\nucnP3nAdOR3drTMP1Ru1DyDuO0zz97jCesXgSWmouiiVcC+DYLvtlw77bmKupajO\n853623DbGuJ1ozm+Oxd+t+umOaWO2uvVKlrUSdDI8w6nyCI4qNQEzOTEwwKBgAXj\n3dMRzP+8iFZrAFqBJQgIx37VZgRvZvA+xVOpUVxpFSP59RMa1QeTfw97ceuVH/jj\njqSZEjga7Q8k/GwO9liyG5SHvtUYV12FQBOFw+/iUjEz5w+IMhXvQ1Onh/aCZeFl\n6PP6bcp2pBR2lxBw00SQQO2hwvQjZEjEhAEo+hchAoGANLKR+hYQJdT0c3PEe2iy\n7bLOTjaVYIziwq7nKDbAA465diqgCFDot+ROw7BZXJ9vpzftMVa/Nu+aCCf7J9mI\nVNzpdj+h7EJVMhs8AWBmf4K0MEGtLV71zqabpG0eUs6eU45pdwuSVva16QS6cWRd\nBiuaqSkDlF/g5629MWUm20k=\n-----END PRIVATE KEY-----\n',
  client_email: 'ardian-pratama@axial-keep-478202-c6.iam.gserviceaccount.com',
  client_id: '102824616602458743169',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/ardian-pratama%40axial-keep-478202-c6.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

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
