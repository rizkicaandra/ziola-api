import { Injectable } from '@nestjs/common';
import { MailerTemplateNewUserDto } from '../dto';

@Injectable()
export class MailerTemplateService {
  /**
   * Generates a welcome email template for a new user.
   * @param {MailerTemplateNewUserDto} newUserDto - The data transfer object containing new user details.
   * @returns {string} - An HTML string representing the welcome email.
   * This email includes the user's name, email, password, and a link to reset the password.
   */
  newUser(newUserDto: MailerTemplateNewUserDto): string {
    const { name, email, password } = newUserDto;
    const companyName = 'Ziola Beauty';

    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${companyName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #e9ecef;
          margin: 0;
          padding: 0;
          color: #343a40;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #ffffff;
          padding: 10px;
          text-align: center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          color: #343a40;
        }
        .header img {
          max-width: 200px;
          margin-bottom: 10px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 20px;
          color: #007bff;
        }
        .content p {
          line-height: 1.6;
          font-size: 16px;
        }
        .content a {
          color: #007bff;
          text-decoration: none;
        }
        .content a:hover {
          text-decoration: underline;
        }
        .footer {
          text-align: center;
          padding: 20px;
          border-top: 1px solid #e9ecef;
          margin-top: 20px;
        }
        .footer p {
          color: #6c757d;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://i.pinimg.com/736x/51/02/00/510200b33a8878fd23e13003aee5b142.jpg" alt=${companyName}>
          <h1>Welcome to ${companyName}</h1>
        </div>
        <div class="content">
          <h2>Dear ${name},</h2>
          <p>Thank you for joining ${companyName}! Below are your account details:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>We recommend changing your password after your first login. Click the link below to reset your password:</p>
          <p><a href="[Password Reset Link]">Reset your password</a></p>
          <p>If you have any questions, please do not hesitate to contact our support team at <a href="mailto:support@zonarocket.com">support@zonarocket.com</a>.</p>
          <p>Best regards,</p>
          <p>The ${companyName} Team</p>
        </div>
        <div class="footer">
          <p>&copy; [2024] ${companyName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>    
    `;
  }
}
