const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = (to, subject, html) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html
    };

    console.log({
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    })

    // if (type === 'verify') {
    //     mailOptions = {
    //         ...mailOptions,
    //         subject: "Email Confirmation",
    //         html: `
    //             <h2>Please click on given link to activate your account</h2>
    //             <a href=${url}>${txt}</a>

    //         `
    //     };
    // } else if (type === 'reset') {
    //     mailOptions = {
    //         ...mailOptions,
    //         subject: "Password Reset",
    //         html: `
    //             <h2>Please click on given link to reset your password</h2>
    //             <a href=${url}>${txt}</a>
    //         `
    //     };
    // } else if (type === 'welcome') {
    //     mailOptions = {
    //         ...mailOptions,
    //         subject: "Welcome to the team",
    //         html: `
    //             <h2>Welcome to the team</h2>
    //             <p>Thank you for joining us. We are excited to have you on board.</p>
    //         `
    //     };
    // } else if (type === 'goodbye') {
    //     mailOptions = {
    //         ...mailOptions,
    //         subject: "We are sorry to see you go",
    //         html: `
    //             <h2>We are sorry to see you go</h2>
    //             <p>Thank you for being a part of our team. We hope to see you again soon.</p>
    //         `
    //     };
    // 
    // }

    transport.sendMail(mailOptions).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
}



module.exports = sendEmail;

// Path: back-end/routes/auth.js
// Compare this snippet from back-end/routes/auth.js:
//     const token = req.headers.authorization.split(' ')[1] ;
//     try {
//         const {id} = jwt.verify(token, process.env.JWT_SECRET) ;
//         const user = await prisma.user.findUnique({where: {id}}) ;
//         if (user) {
//             res.json(user) ;
//         } else {

//             res.status(401).json({error: 'Invalid token'}) ;
//         }
//     } catch (error) {
//         res.status(401).json({error: 'Invalid token'}) ;
//     }
// });
//
// router.patch('/confirm', async (req, res) => {
//     const token = req.headers.authorization.split(' ')[1] ;
//     try {        




