import axios from 'axios';

async function followRedirect() {
  const url = 'https://httpbin.org/redirect-to?url=/get';
  try {
    const res = await axios.get(url);
    console.log('res=', res.status);
    console.log(' res.data.url=', res.data.url);
  } catch (err: any) {
    console.error('Error following redirect:', err.message);
  }
}

async function catchRedirect() {
  const url = 'https://httpbin.org/redirect-to?url=/get';
  try {
    const res = await axios.get(url, { maxRedirects: 0 });
    console.log('res=', res.headers.location);
    console.log('res.data.url=', res.data.url);
  } catch (err: any) {
    console.error(
      'Error following redirect:',
      err.message,
      ' error response:',
      err.response.headers.location,
       ' error status:',
      err.response.status,
      ' err.response.headers["set-cookie"]',
      err.response.headers["set-cookie"]
    );
  }
}

followRedirect();
catchRedirect();
