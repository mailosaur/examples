/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

package mailosaurExample

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/mailosaur/mailosaur-go"
)

func TestOtpSms(t *testing.T) {
  t.Skip("reason")

  godotenv.Load()
  
  apiKey := os.Getenv("MAILOSAUR_API_KEY")
  serverId := os.Getenv("MAILOSAUR_SERVER_ID")

  // Add your mailosaur servers number to this variable
  phoneNumber := os.Getenv("MAILOSAUR_PHONE_NUMBER")

  // Instantiate Mailosaur client with api key
  m := mailosaur.New(apiKey)

  // 1 - Perform an action that sends an otp SMS message to your number
  // https://mailosaur.com/docs/sms-testing
  // ...
  // ...

  // 2 - Create the search criteria for the sms
  // https://mailosaur.com/docs/api/messages#4-search-for-messages
  params := &mailosaur.MessageSearchParams {
    Server: serverId,
    Timeout: 20000, // 20 seconds (in milliseconds)
  }

  criteria := &mailosaur.SearchCriteria {
    SentTo: phoneNumber,
  }

  // 3 - Get the sms from Mailosaur using the search criteria
  sms, err := m.Messages.Get(params, criteria)

  if (err != nil) {
    t.Error(err)
  }

  // 4 - Retrieve passcode from sms
  // https://mailosaur.com/docs/test-cases/codes
  passcode := sms.Text.Codes[0]

  fmt.Printf("\nSms otp code - " + passcode.Value + "\n")
}