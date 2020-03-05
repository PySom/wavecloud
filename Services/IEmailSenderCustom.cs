using System.Collections.Generic;
using System.Threading.Tasks;

namespace WaveCloud.Services
{
	public interface IEmailSender
	{
		Task SendEmailAsync(string email, string subject, string message);
		Task SendEmailToAllAsync(IEnumerable<string> emails, string subject, string message);
	}
}
