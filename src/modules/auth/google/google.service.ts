import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

async function authenticateUser(data: any) {
  const { token } = data;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();
  
  console.log('payload', payload)
}

export default {
  authenticateUser
}