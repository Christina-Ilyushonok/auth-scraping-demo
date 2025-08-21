import axios from 'axios';

async function loginWithCookies() {
  const url = 'https://the-internet.herokuapp.com/authenticate';

  try {
    const res = await axios.post(
      url,
      new URLSearchParams({
        username: 'tomsmith',
        password: 'SuperSecretPassword!',
      }),
      {
        maxRedirects: 0,
        validateStatus: () => true,
      }
    );

    const rawCookies = res.headers['set-cookie'];

    if (rawCookies && rawCookies.length > 0) {
      const cookie = rawCookies.map((c: string) => c.split(';')[0]).join('; ');

      console.log('cookie:', cookie);
    } else {
      console.error('No cookies from login response.');
    }
  } catch (e) {
    console.error('Login error:', e);
  }
}

loginWithCookies();
