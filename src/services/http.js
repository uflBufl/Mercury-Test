async function post(url, params) {
  // const response = await request(url, params, "POST");
  return await request(url, params, "POST");
}

async function get(url, params) {
  return await request(url, params, "GET");
}

async function request(url, params, type) {
  const response = await fetch(url, {
    method: type,
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    let errorMessage = json.error;
    if (response.status == 0) errorMessage = "No internet connection";
    if (response.status == 503)
      errorMessage = "Server is temporarily unavailable";
    if (response.status == 400)
      errorMessage = "E-Mail or password is incorrect";
    throw {
      error: errorMessage,
      status: response.status
    };
  }
}

const http = {post, get, request}
export default http;
