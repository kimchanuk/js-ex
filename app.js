let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector('#login-btn');
let loginInput = document.querySelector('#login-input');
let greeting = document.querySelector('#greeting');
const time = document.querySelector('.time');
const weather = document.querySelector('.weather');

const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

const images = [
  '훈이.jpg',
  '유리.jpg',
  '철수.jpeg',
  '흰둥이.jpeg',
  '부리부리3.png',
];

let randomIndex = Math.floor(Math.random() * images.length);
let container = document.querySelector('.container');

//폼태그
function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}
toDoForm.addEventListener('submit', handleTodoSubmit);

//그림
function paintTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

//삭제 버튼
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos();
}

//API
function onGeoOk(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log('you live in', lat, lon);
}
function onGeoError() {
  alert('cant find you');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const APIKEY = '5cd573a8ce776f27da42df1c1a16a60a';
const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=35.1688048&lon=129.1745855&appid=5cd573a8ce776f27da42df1c1a16a60a&units=metric';

fetch(url)
  .then(Response => Response.json())
  .then(data => {
    const weather = document.querySelector('#weather span:first-child');
    const city = document.querySelector('#weather span:last-child');
    const name = data.name;
    city.innerText = `위치 : ${name}`;
    weather.innerText = `날씨 정보 : ${data.weather[0].main} / ${data.main.temp}`;
  });

//배경 이미지
function backImg() {
  container.style.backgroundImage = `url(./image/${images[randomIndex]})`;
  container.style.backgroundSize = '160px';
  container.style.backgroundRepeat = 'repeat';
}

backImg();

////로그인
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function loginHandle(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  greeting.innerHTML = `<span style="color:blue">${userName}</span> 님이 로그인함`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);
  weather.classList.remove(HIDDEN_CLASSNAME);
  time.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);
loginForm.addEventListener('submit', loginHandle);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerHTML = `<span style="color:blue">${savedUserName}</span> 님이 로그인함`;
  toDoForm.classList.remove(HIDDEN_CLASSNAME);
  time.classList.remove(HIDDEN_CLASSNAME);
  weather.classList.remove(HIDDEN_CLASSNAME);
}

//시계
let getClock = () => {
  let date = new Date(); //new라서 객체임 현재 시간을 가저옴
  const clock = document.querySelector('#clock');

  let hour = String(date.getHours()).padStart(2, '0');
  let mimute = String(date.getMinutes()).padStart(2, '0');
  let second = String(date.getSeconds()).padStart(2, '0');

  clock.innerHTML = `<span style="color:red">${hour}시 ${mimute}분 ${second}초</span>`;
};

//타이머 함수를 통해서 1초마다 시간을 받아오게 작성
setInterval(getClock, 1000);
getClock();

//로컬스토리지
let toDos = [];
const TODOS_KEY = 'todos';

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}
