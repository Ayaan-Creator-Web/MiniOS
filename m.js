var email;
var password;
var clicked;
var username;
var savedusername = '';

let apps = JSON.parse(localStorage.getItem('apps')) || [{
    name: 'Google',
    url: 'https://bing.com/search?q=search',
    image: 'google.jpg'
}, {
    name: 'Timely',
    url: 'https://www.timelypro.online',
    image: 'timely.jpg'
}, {
    name: 'BuzzLine',
    url: 'https://staklabs.github.io/BuzzLine/',
    image: 'buzzline.jpg'
}, {
    name: 'Terminal',
    url: 'https://staklabs.github.io/CMD-Prompt/',
    image: 'terminal.png'
}, {
    name: 'Help',
    url: 'https://staklabs.github.io/MiniOS/hi.html',
    image: 'help.png'
}, {
    name: 'Profile',
    url: 'https://staklabs.github.io/MiniOS/profile.html',
    image: 'profile.png'
}];

const verifypath = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let users = [{
    username: 'Ayaan',
    email: 'ayaan.khalique3@gmail.com',
    password: 'sd',
}, {
    username: 'Khalique',
    email: 'khaliquer@gmail.com',
    password: 'Oyster@22',
}, {
    username: 'Wasiullah',
    email: '',
    password: 'sd'
}];

document.getElementById('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') signin();
});

document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
        event.preventDefault();
        window.location.href='';
    }
});
const loginSound = new Audio('startup.mp3');

async function signin() {
    const password = document.getElementById('password').value;
    const usernameOrEmail = document.getElementById('username').value;

    const user = users.find(u =>
        u.username === usernameOrEmail || u.email === usernameOrEmail
    );

    if (!user) {
        alert('Please Check Username or Email');
        return;
    }

    if (user.password !== password) {
        alert('Please Check Email or Password');
        return;
    }
    localStorage.setItem('miniOS-User', JSON.stringify(user));
    
    const loggedInUsername = user.username;

    document.body.classList.add('unblurred');
    await loginSound.play();

    document.body.innerHTML = `
        <div id="welcomeMessage" class="welcome-message show" style="top: 20px; font-size: 16px;">
            Welcome, <span id="messageUsername">${loggedInUsername}</span>!
        </div>
        <div id="taskbar">
        </div>
        <iframe id="app" style="width: 100%; height: calc(100vh - 80px); border: none;"></iframe>
    `;

    document.getElementById('messageUsername').textContent = loggedInUsername;

    showApps();
    tako.log('MiniOS Started');
}

function CheckUserExist(email) {
    let doesExist = false;
    users.forEach((check) => {
        if (check.email == email) {
            doesExist = true;
        }
    });
    return doesExist;
}

function showApps() {
    const taskbar = document.getElementById('taskbar');
    taskbar.innerHTML = '';

    const appIframe = document.getElementById('app');
    const welcomeMessage = document.getElementById('welcomeMessage');

    apps.forEach((app) => {
        const icon = document.createElement('img');
        icon.src = app.image;
        icon.alt = app.name;
        icon.title = app.name;

        icon.addEventListener('click', () => {
            if (appIframe.src === app.url || appIframe.src === app.url + '/') {
                appIframe.src = 'about:blank';
                if (welcomeMessage) {
                    welcomeMessage.classList.add('show');
                }
            } else {
                appIframe.src = app.url;
                if (welcomeMessage) {
                    welcomeMessage.classList.remove('show');
                }
            }
        });

        taskbar.appendChild(icon);
    });
    
    if (appIframe.src === 'about:blank' || appIframe.src === '') {
        if (welcomeMessage) {
            welcomeMessage.classList.add('show');
        }
    }
}

String.prototype.startApp = function() {
    const appIframe = document.getElementById('app'); 
    const welcomeMessage = document.getElementById('welcomeMessage');

    apps.forEach((app) => {
        if (app.name == this) {
            if (appIframe.src === app.url || appIframe.src === app.url + '/') {
                appIframe.src = 'about:blank';
                if (welcomeMessage) {
                    welcomeMessage.classList.add('show');
                }
            }
            else {
                appIframe.src = app.url;
                if (welcomeMessage) {
                    welcomeMessage.classList.remove('show');
                }
            }
        }
    });
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
