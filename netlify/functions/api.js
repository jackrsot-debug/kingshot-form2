const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEoKhfYVn9HU4i0tFZDnkR2DlZv2aYzMAjUC-Wmpyw2pEwJZXsbQLvk76ln_btvjU/exec";

exports.handler = async (event) => {
  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { "Allow": "GET, POST" }, body: "Method Not Allowed" };
  }
  try {
    const options = { method: event.httpMethod };
    if (event.httpMethod === "POST") {
      options.headers = { "Content-Type": "text/plain;charset=utf-8" };
      options.body = event.body || "";
    }
    const upstream = await fetch(SCRIPT_URL, options);
    const body = await upstream.text();
    return {
      statusCode: upstream.status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
      body
    };
  } catch (error) {
    return { statusCode: 502, headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify({ ok: false, error: "Proxy error" }) };
  }
};
