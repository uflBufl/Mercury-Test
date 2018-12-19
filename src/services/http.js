// async function post1(login, password, type) {
//   var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
//   const params = JSON.stringify({ email: login, password: password });
//   // здесь, в итоге надо сделать проверку на тип запроса, но поскольку у нас сейчас только post, то проверку
//   // я не делаю, и от type ничего не зависит. Сейчас всегда выполняется только setPost!!
//   const response = await setPost(url, params);

//   return response;
// }

async function post(login, password) {
  var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
  const params = JSON.stringify({ email: login, password: password });
  const response = await request(url, params, "POST");

  return response;
}


//Полагаю он не нужен, но пусть будет для примера
async function get(login, password) {
  var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
  const params = JSON.stringify({ email: login, password: password });
  const response = await request(url, params, "GET");

  return response;
}

// async function setPost(url, params) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: params
//   };
//   const response = await request(url, options);
//   return response;
// }

async function request(url, params, type) {
  // const options = {
  //   method: type,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: params
  // };
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

//Здесь также get только для примера
export { post, get, request };
