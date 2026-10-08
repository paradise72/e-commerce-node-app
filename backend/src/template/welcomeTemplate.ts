export const welcomeEmail = (name: string) => {
  return `
    <html>
      <body>
        <h1>Welcome ${name}!</h1>

        <p>
          Thank you for registering with our application.
        </p>

        <p>
          We are happy to have you.
        </p>
      </body>
    </html>
  `;
};