//Axios Globals

axios.defaults.headers.common['X-Auth_TOken' ] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {
  //console.log('GET Request');
  axios.get('https://jsonplaceholder.typicode.com/todos', {params:{_limit: 10}})
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // console.log('POST Request');
  axios.post('https://jsonplaceholder.typicode.com/todos',
            {title: 'TodoList',
              completed: false})
              .then(res => showOutput(res))
              .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  axios.put('https://jsonplaceholder.typicode.com/todos/1',
            {title: 'Update Todo',
          completed: true})
          .then(response => showOutput(response))
          .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
          .then(response => showOutput(response))
          .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  // console.log('Simultaneous Request');

    axios.all([
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')

    ])
    // .then(response => {
    //   console.log(response[0]);
    //   console.log(response[1]);
    //   showOutput(response[1]);
    // })
      .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
  }

// CUSTOM HEADERS
function customHeaders() {
  //console.log('Custom Headers');
  const config = {
    headers: {
      'Content-Type': 'application/json', 
      Authorization: 'sometoken'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos',
  {title: 'TodoList',
    completed: false},config)
    .then(res => showOutput(res))
    .catch(err => console.error(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
//   console.log('Transform Response');

    const options = {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
        title : 'Hello hi'
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    }

    axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {

  //console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/todosss?_limit=5',{
  //   validateStatus : function(status) {
  //     return status < 500; //reject only if greater or equal to 500 
  //   }
   })
  
        .then(res => showOutput(res))
        .catch(err => {
          if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
              if(err.response.status === 404){
                alert("Error: page not found");
              }     

          }
        });

}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.cancelToken.source();
  
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log('Request cancelled', thrown,message);
    }
  });

  if(true){
    source.cancel(' Request cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()}  request sent to ${config.url} at ${new Date().getTime()}`);

  return config
}, err => {
  return Promise(err)
})
// AXIOS INSTANCES

const axiosInstance = axios.create({

  /*other custom settings */
  baseURL: 'https://jsonplaceholder.typicode.com',
});

axiosInstance.get('/comments').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
