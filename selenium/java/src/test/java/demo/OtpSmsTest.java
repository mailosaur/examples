/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

package demo;

import org.junit.Ignore;
import org.junit.Test;
import io.github.cdimascio.dotenv.Dotenv;
import com.mailosaur.MailosaurClient;
import com.mailosaur.MailosaurException;
import com.mailosaur.models.*;
import java.io.IOException;

public class OtpSmsTest {
  @Ignore("Reason")
  @Test public void retrieveOneTimePasscode() throws IOException, MailosaurException {
    Dotenv dotenv = Dotenv.load();

    String apiKey = dotenv.get("mailosaurApiKey");
    String serverId = dotenv.get("mailosaurServerId"); 

    // Add your mailosaur servers number to this variable
    String phoneNumber = dotenv.get("mailosaurPhoneNumber");   

    // Instantiate Mailosaur client with api key
    MailosaurClient mailosaur = new MailosaurClient(apiKey);

    // 1 - Perform an action that sends an otp SMS message to your number
    // https://mailosaur.com/docs/sms-testing
    // ...
    // ...

    // 2 - Create the search criteria for the sms
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    MessageSearchParams params = new MessageSearchParams();
    params.withServer(serverId).withTimeout(20000); // 20 seconds (in milliseconds)

    SearchCriteria searchCriteria = new SearchCriteria();
    searchCriteria.withSentTo(phoneNumber);

    // 3 - Get the sms from Mailosaur using the search criteria
    Message sms = mailosaur.messages().get(params, searchCriteria);

    // 4 - Retrieve passcode from sms
    // https://mailosaur.com/docs/test-cases/codes
    Code passcode = sms.text().codes().get(0);

    System.out.printf("\nSms otp code -" + passcode.value()); // "564214"
  }
}