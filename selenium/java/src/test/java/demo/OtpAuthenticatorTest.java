/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

package demo;

import org.junit.Ignore;
import org.junit.Test;
import io.github.cdimascio.dotenv.Dotenv;
import com.mailosaur.MailosaurClient;
import com.mailosaur.MailosaurException;
import com.mailosaur.models.*;
import java.io.IOException;

public class OtpAuthenticatorTest {
  @Ignore("Reason")
  @Test public void retrieveOneTimePasscode() throws IOException, MailosaurException {
    Dotenv dotenv = Dotenv.load();

    String apiKey = dotenv.get("mailosaurApiKey");

    // Instantiate Mailosaur client with api key
    MailosaurClient mailosaur = new MailosaurClient(apiKey);

    /**
     * This is a base32-encoded shared secret.
     * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
     * Learn more at https://mailosaur.com/docs/mfa
    */
    String sharedSecret = "ONSWG4TFOQYTEMY=";
    OtpResult currentOtp = mailosaur.devices().otp(sharedSecret);

    System.out.printf("\nAuthenticator otp code -" + currentOtp.code()); // "564214"
  }
}