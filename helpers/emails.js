import nodemailer from "nodemailer";

const registerEmail = async(data) => {
    // Create transport
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    // Deconstruct
    const { email, name, token } = data;
    
    // Send E-Mail
    await transport.sendMail({
        from: "noreply@goodroots.com",
        to: email,
        subject: "Confirm E-Mail at Good Roots",
        text: "Confirm E-Mail at Good Roots",
        html: `
            <p>Hello ${name}, verify your E-Mail for Good Roots</p>
            
            <p>Your account is ready you have to confirm it by clicking 'Verify'</p>
            <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/confirmAccount/${token}">Verify</a>
            
            <p>If you didn't create this account, you can ignore this message</p>
        `
    });
}

export {
    registerEmail,
};
