import { emailAutomation } from '../services/emailAutomation.js';

emailAutomation({
  spreadsheetUrl: '19rV_Z1oY9EhMh-fUKLFBQ-e_ZotcgFkLavuMZDjjnjg',
  sheetName: 'test',
  emailColumnIndex: 2,
  nameColumnIndex: 1,
  statusColumnIndex: 3,
  emailSubject: 'UNDANGAN OLIMPIADE MATEMATIKA 26 FKIP UNIVERSITAS RIAU',
  emailSender:
    '"Olimpiade Matematika 26" <olimpiadematematika26fkipunri@gmail.com>',
  smtpUser: 'olimpiadematematika26fkipunri@gmail.com',
  smtpPass: 'gxfoteuyvslftqht',
  delay: 10000,
});
