package mailosaurExample

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/mailosaur/mailosaur-go"
	"github.com/stretchr/testify/assert"
)

func TestPasswordReset(t *testing.T) {
  t.Skip("reason")

  godotenv.Load()
  
  apiKey := os.Getenv("MAILOSAUR_API_KEY")
  serverId := os.Getenv("MAILOSAUR_SERVER_ID")

  // Instantiate Mailosaur client with api key
  m := mailosaur.New(apiKey)

  // Test email address (this uses a catch-all pattern)
  emailAddress := fmt.Sprintf("test-email@%s.mailosaur.net", serverId)

  // 1 - Perform an action that sends a password reset email with a link to your email address
  // https://mailosaur.com/docs/email-testing
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

  // 4 - Extract the link from the email
  // https://mailosaur.com/docs/test-cases/links
  passwordResetLink := email.Html.Links[0]

  // 5 - Assert link matches sent link
  expectedPasswordResetLink := "https://example.mailosaur.com/password-reset"
  assert.Equal(t, expectedPasswordResetLink, passwordResetLink.Href)

  fmt.Printf("\nPassword reset link - " + passwordResetLink.Href + "\n")
}