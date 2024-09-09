import nodemailer from 'nodemailer';

export const POST = async(req) => {
 
    const { fullName, email } = await req.json();

    if (!fullName || !email) {

      return new Response("Name and Email are required", {
        status: 400,
      })
    }

    try {
      // Configure your nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail, Outlook
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kenjoejoe38@gmail.com', // Recipient email address
        subject: 'New Lead Submission',
        text: `You received a new lead from Supracarer with details: ${fullName} (${email})`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return new Response("Email sent successfully", {
        status: 200,
      }) 
    } catch (error) {
      console.error('Error sending email:', error);
      return new Response("Error sending email", {
        status: 500,
      }) 
    }

 
}
