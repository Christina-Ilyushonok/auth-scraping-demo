import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) FakeScraper/1.0',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(config => {
  console.log('\n--- REQUEST ---');
  console.log('URL:', (config.baseURL ?? '') + config.url);
  console.log('Method:', config.method?.toUpperCase());
  console.log('Headers:', config.headers);
  if (config.data) console.log('Body:', config.data);
  return config;
});

async function main() {
  try {
    const products = await api.get('/products?limit=2');
    console.log('\nProducts:', products.data);

    const loginRes = await api.post('/auth/login', {
      username: 'mor_2314',
      password: '83r5^_',
    });
    console.log('\nLogin response:', loginRes.data);

    const token = loginRes.data.token;

    const userRes = await api.get('/users/2', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('\nUser info:', userRes.data);
  } catch (err: any) {
    console.error('\n--- ERROR ---');
    console.error(err.response?.data || err.message);
  }
}

main();
