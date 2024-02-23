﻿using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WaveCloud.Services
{
	// This class is used by the application to send email for account confirmation and password reset.
	// For more details see https://go.microsoft.com/fwlink/?LinkID=532713
	public class EmailSender : IEmailSender
	{
		private readonly ILogger<EmailSender> _logger;
		private const string senderEmail = "";
		private const string password = "";
		public EmailSender(ILogger<EmailSender> logger)
		{
			_logger = logger;
		}
		public async Task SendEmailAsync(string email, string subject, string message)
		{
			var mimeMessage = new MimeMessage();
			mimeMessage.From.Add(new MailboxAddress(
				"Contact",
				senderEmail
			));
			mimeMessage.Subject = !string.IsNullOrEmpty(subject) ? subject : "StudyMATE";
			mimeMessage.Cc.Add(new MailboxAddress(email));
            BodyBuilder builder = new BodyBuilder
            {
                HtmlBody = message
            };
            mimeMessage.Body = builder.ToMessageBody() ?? new TextPart("plain");

			using var client = new SmtpClient();
			client.Connect("infomall.ng", 25, SecureSocketOptions.None);
			client.AuthenticationMechanisms.Remove("XOAUTH2");
			client.Authenticate(senderEmail, password);
			await client.SendAsync(mimeMessage);
			_logger.LogInformation("message sent successfully...");
			await client.DisconnectAsync(true);

		}

		public async Task SendEmailToAllAsync(IEnumerable<string> emails, string subject, string message)
		{
			var mimeMessage = new MimeMessage();
			mimeMessage.From.Add(new MailboxAddress(
				"Contact",
                senderEmail
            ));
			
			foreach (string email in emails)
			{
				mimeMessage.Bcc.Add(new MailboxAddress(email));
			}
			mimeMessage.Subject = !string.IsNullOrEmpty(subject) ? subject : "Government Checker";
            BodyBuilder builder = new BodyBuilder
            {
                HtmlBody = message
            };
            mimeMessage.Body = builder.ToMessageBody() ?? new TextPart("plain");

			using var client = new SmtpClient();
			client.Connect("infomall.ng", 25, SecureSocketOptions.None);
			client.AuthenticationMechanisms.Remove("XOAUTH2");
			client.Authenticate(senderEmail, password);
			await client.SendAsync(mimeMessage);
			_logger.LogInformation("message sent successfully...");
			await client.DisconnectAsync(true);
		}
	}
}
