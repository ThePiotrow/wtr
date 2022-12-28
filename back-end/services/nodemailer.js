// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID, // ClientID
//     process.env.CLIENT_SECRET, // Client Secret
//     "https://developers.google.com/oauthplayground" // Redirect URL
// );

// oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN
// });
// const accessToken = oauth2Client.getAccessToken()

// const smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: accessToken
//     }
// });

// const sendEmail = (to, url, txt, type) => {
//     if (type === 'verify') {
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: to,
//             subject: "Email Confirmation",
//             html: `
//                 <h2>Please click on given link to activate your account</h2>
//                 <a href=${url}>${txt}</a>

//             `
//         };
//     } else if (type === 'reset') {
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: to,
//             subject: "Password Reset",
//             html: `
//                 <h2>Please click on given link to reset your password</h2>
//                 <a href=${url}>${txt}</a>
//             `
//         };
//     }  else if (type === 'welcome') {
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: to,
//             subject: "Welcome to the team",
//             html: `
//                 <h2>Welcome to the team</h2>
//                 <p>Thank you for joining us. We are excited to have you on board.</p>
//             `
//         };
//     } else if (type === 'goodbye') {
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: to,
//             subject: "We are sorry to see you go",
//             html: `
//                 <h2>We are sorry to see you go</h2>
//                 <p>Thank you for being a part of our team. We hope to see you again soon.</p>
//             `
//         };

//     }



    


//     smtpTransport.sendMail(mailOptions, (err, info) => {
//         if (err) return err;
//         return info;
//     });
// }   



// module.exports = sendEmail;

// // Path: back-end/routes/auth.js
// // Compare this snippet from back-end/routes/auth.js:
// //     const token = req.headers.authorization.split(' ')[1] ;
// //     try {
// //         const {id} = jwt.verify(token, process.env.JWT_SECRET) ;
// //         const user = await prisma.user.findUnique({where: {id}}) ;
// //         if (user) {
// //             res.json(user) ;
// //         } else {

// //             res.status(401).json({error: 'Invalid token'}) ;
// //         }
// //     } catch (error) {
// //         res.status(401).json({error: 'Invalid token'}) ;
// //     }
// // });
// //
// // router.patch('/confirm', async (req, res) => {
// //     const token = req.headers.authorization.split(' ')[1] ;
// //     try {        





