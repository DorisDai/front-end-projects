// this function is from ass3
export default function fetchAPI (dir, method, body, doNotShowError) {
  return new Promise((resolve, reject) => {
    const headers = {};
    const options = {};
    if (body) {
      headers['Content-Type'] = 'application/json; charset=UTF-8';
      options.body = JSON.stringify(body);
    }

    if (localStorage.getItem('token')) {
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    options.headers = headers;
    options.method = method;
    fetch('http://localhost:' + 5005 + dir, options).then((resp) => {
      // return a promise, this promise result is an object, returned data is an object
      return resp.json()
    }).then((data) => {
      if (data.error) {
        resolve({ error: data.error })
      } else {
        resolve(data)
      }
    }).catch((error) => {
      // page erros, something wrong with url, error inside fetch
      alert(error);
    })
  })
}
