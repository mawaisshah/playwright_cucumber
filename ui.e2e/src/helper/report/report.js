const report = require('multiple-cucumber-html-reporter');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Specify the path to your text file
const filePath = '@rerun.txt';

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = dd + '/' + mm + '/' + yyyy;
const broswerType = [];
report.generate({
  jsonDir: 'test-results',
  reportPath: 'test-results/reports',
  reportName: 'Dechert-Playwright',
  displayDuration: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: '114.0.5735.134',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '16.04',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Dechert-Playwright' },
      { label: 'Execution Start Time', value: formattedToday },
      { label: 'Execution End Time', value: formattedToday },
    ],
  },
});

// // Step 1: Set up the nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '1mohsinihsan@gmail.com',
//     pass: 'qowzqrnxpudffbbp',
//   },
// });
// const attachments = [
//   { filename: 'failedTestScenarios.txt', path: '@rerun.txt' },
//   { filename: 'cucumberReport.html', path: 'test-results/cucumber-report.html' },
// ];

// // Set up the email options
// const mailOptions = {
//   from: 'mansoor@designfiles.co',
//   to: '1mohsinihsan@gmail.com',
//   subject: 'Cucumber Report',
//   html: '<p>Please find attached the Cucumber report</p>',
//   attachments: attachments,
// };

// fs.readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

  //   //Check if the file is empty
  //   if (data.length === 0) {
  //     console.log('All scenarios successfully passed');
  //   } else {
  //     console.log('Failed Scenarios sending via email.');

  //     transporter.sendMail(mailOptions, (error, info) => {
  //       if (error) {
  //         console.log('Error sending email:', error);
  //       } else {
  //         console.log('Email sent successfully', info.response);
  //       }
  //     });
  //   }
// });
