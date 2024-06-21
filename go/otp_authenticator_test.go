/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

package mailosaurExample

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/mailosaur/mailosaur-go"
)

func TestOtpAuthenticator(t *testing.T) {
  t.Skip("reason")

  godotenv.Load()
  
  apiKey := os.Getenv("MAILOSAUR_API_KEY")

  // Instantiate Mailosaur client with api key
  m := mailosaur.New(apiKey)

	/**
   * This is a base32-encoded shared secret.
   * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
   * Learn more at https://mailosaur.com/docs/mfa
  */
  sharedSecret := "ONSWG4TFOQYTEMY="
	currentOtp, err := m.Devices.Otp(sharedSecret)

	if (err != nil) {
    t.Error(err)
  }

  fmt.Printf("\nAuthenticator otp code - " + currentOtp.Code + "\n") // "564214"
}