const searchbar = document.querySelector('.searchbar-container');
const profileContainer = document.querySelector('.profile-container');
const root = document.documentElement.style;
//we not select again again shotcut trick this name is alias
const get = (params) => document.getElementById(`${params}`);
const url = 'https://api.github.com/users/';
//document.quarySelector get ar modha niye asa get access korchi
const noResults = get('no-results');
const btnMode = get('btn-mode');
const modeText = get('mode-text');
const modeIcon = get('mode-icon');
const btnSubmit = get('submit');
const input = get('input');
const avater = get('avater');
const userName = get('name');
const date = get('date');
const user = get('user');
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const bio = get('bio');
const repos = get('repos');
const followers = get('followers');
const following = get('following');
const user_location = get('location');
const page = get('page');
const twitter = get('twitter');
const company = get('company');
let darkMode = false;

//api call base url+ input.value
btnSubmit.addEventListener('click', () => {
  if (input.value !== '') {
    getUserData(url + input.value);
  }
});

//enter key ar jonno
input.addEventListener(
  'keydown',
  function (e) {
    if (e.key == 'Enter') {
      if (input.value !== '') {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener('input', () => {
  noResults.style.display = 'none';
});

btnMode.addEventListener('click', () => {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

//apicall
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}

//Render Ui
function updateProfile(data) {
  //invalid name dila api ta messageshow korbak jakhana laka thakbak not found which is data.messsage

  if (data.message != 'Not Found') {
    noResults.style.display = 'none';
    avater.src = `${data.avatar_url}`;
    userName.innerText = data.name == null ? data.login : data.name;
    user.innerText = `${data.login}`;
    user.href = `${data.html_url}`;
    datesegment = data.created_at.split('T').shift().split('-');
    //2024-03-01 -> 2024 [0] index 03[1] index 01[2] index
    date.innerText = `Joined ${datesegment[2]} ${months[datesegment[1] - 1]} ${
      datesegment[0]
    }`;
    bio.innerText =
      data.bio == null ? 'This Profile has no bio' : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = data.location ? data.location : 'Not Available';
    page.innerText = data.blog ? data.blog : 'Not Available';
    page.href = data.blog ? data.blog : '#'; // ? if present : if not present
    twitter.innerText =
      data.twitter_username == null ? 'Not Available' : data.twitter_username;
    twitter.href = data.twitter_username == null ? '#' : data.twitter_username;
    company.innerText = data.company == null ? 'Not Available' : data.company;

    searchbar.classList.toggle('active');
    profileContainer.classList.toggle('active');
  } else {
    noResults.style.display = 'block'; //block visible syntex
  }
}

//switch to dark mode = activeDarkMode()

function darkModeProperties() {
  root.setProperty('--lm-bg', '#141D2F');
  root.setProperty('--lm-bg-content', '#1E2A47');
  root.setProperty('--lm-text', '#fff');
  root.setProperty('--lm-text-alt', '#fff');
  // root.setProperty('--lm-shadow-xl', '#fff');
  root.setProperty('--lm-shadow', 'rgba(70,88,109,0.25)');
  modeText.innerText = 'LIGHT';
  modeIcon.src = './Images/sun-icon.svg';
  root.setProperty(' --lm-icon-bg', 'brightness(100%)');
  darkMode = true;
  console.log('change into darkmode');
  //local storage save
  localStorage.setItem('dark-mode', true);
}

//switch to light mode = activelightModeMode()
function lightModeProperties() {
  root.setProperty('--lm-bg', '#f6f8ff');
  root.setProperty('--lm-bg-content', '#fefefe');
  root.setProperty('--lm-text', '#4b6a9b');
  root.setProperty('--lm-text-alt', '#2b3442');
  root.setProperty('--lm-shadow', 'rgba(70, 96, 187, 0.2)');
  modeText.innerText = 'DARK';
  modeIcon.src = './Images/moon-icon.svg';
  root.setProperty(' --lm-icon-bg', 'brightness(100%)');
  darkMode = false;
  console.log('change into lightmode');
  //local storage save
  localStorage.setItem('dark-mode', false);
}
function init() {
  darkMode = false;
  const value = localStorage.getItem('dark-mode');
  if (value == null) {
    localStorage.setItem('dark-mode', darkMode);
    lightModeProperties();
  } else if (value == 'true') {
    darkModeProperties();
  } else if (value == 'false') {
    lightModeProperties();
  }

  getUserData(url + 'student-MilanMandal');
}

init();
