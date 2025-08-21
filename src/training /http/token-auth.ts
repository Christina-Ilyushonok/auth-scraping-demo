import axios from "axios";

async function main() {
  try {
    const loginRes = await axios.post("https://fakestoreapi.com/auth/login", {
      username: "mor_2314",
      password: "83r5^_"
    });

    console.log("Login:", loginRes.data);

    const token = loginRes.data.token;

    const userRes = await axios.get("https://fakestoreapi.com/users/2", {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("User info:", userRes.data);

  } catch (err: any) {
    console.error("Error:", err.response?.data || err.message);
  }
}

main();