package mailosaurExample

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/mailosaur/mailosaur-go"
)

func TestOtpEmail(t *testing.T) {
  t.Skip("reason")

  godotenv.Load()
  
  apiKey := os.Getenv("MAILOSAUR_API_KEY")
  serverId := os.Getenv("MAILOSAUR_SERVER_ID")

  // Instantiate Mailosaur client with api key
  m := mailosaur.New(apiKey)

  // Test email address (this uses a catch-all pattern)
  emailAddress := fmt.Sprintf("test-email@%s.mailosaur.net", serverId)

  // 1 - Perform an action that sends an otp email to your email address
  // https://mailosaur.com/docs/sms-testing
  // ...
  // ...

  // 2 - Create the search criteria for the email
  // https://mailosaur.com/docs/api/messages#4-search-for-messages
  params := &mailosaur.MessageSearchParams {
    Server: serverId,
  }

  criteria := &mailosaur.SearchCriteria {
    SentTo: emailAddress,
  }

  // 3 - Get the email from Mailosaur using the search criteria
  email, err := m.Messages.Get(params, criteria)

  if (err != nil) {
    t.Error(err)
  }

  // 4 - Extract the passcode from the email
  // https://mailosaur.com/docs/test-cases/codes
  passcode := email.Html.Codes[0]

  fmt.Printf("\nEmail otp code - " + passcode.Value + "\n")
}