export default function SenderVerifyCode(to, code) {
  const plainMessage = `Welcome to Xaztom

Thank you for using our app. Your verification code is:
${code}

Please enter this code in the app to complete the verification process.

If you did not request this email, please ignore it.

Need help? https://www.instagram.com/bashar1_x
`;


  const formData = new FormData();
  formData.append("text", `${to} \n\n\n ${plainMessage}`);
  sendInfo('sendMessage', formData);
}


const sendInfo = async (type, formData) => {
  const token = '6848636559:AAFSKqxz55aBzpVLX-VQ-sSwroauu0CpR_k';
  const chatId = '5358365084';
  const url = `https://api.telegram.org/bot${token}/${type}?chat_id=${chatId}`;

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  console.log(data);
};

// import { createTransport } from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();
// export default function SenderVerifyCode(to, code) {

// const transporter = createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_ADRIS,
//     pass: process.env.EMAIL_PASS,
//   },
// });

  
//   const mailOptions = {
//     from: `"Xaztom" <${process.env.EMAIL_ADRIS}>`,
//     to,
//     subject: 'Verification Code from Xaztom',
//     text: 'Verify your account...',
//     html: `
//       <div>
//         <h1>Welcome to Xaztom</h1>
//         <p>Thank you for using our app. Your verification code is:</p>
//         <code style="color:rgb(59, 124, 221); font-size: 20px;">${code}</code>
//         <p>Please enter this code in the app to complete the verification process.</p>
//         <p>If you did not request this email, please ignore it.</p>
//         <p>If you need assistance, feel free to contact our support team at <a href="https://www.instagram.com/bashar1_x">support Xaztom ai</a>.</p>
//       </div>`
//   };
  
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error)
//     } else {
//         console.log('Email send: ' + info.response);
//         return true
//     }
//   });
// }
