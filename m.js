var email;
var password;
var clicked;
var username;
var savedusername = '';

let apps = JSON.parse(localStorage.getItem('apps')) || [{
    name: 'Google',
    url: 'https://bing.com/search?q=search',
    //url: 'https://ayaan-creator-web.github.io/MiniOS/hi.html'
    image: 'google.jpg'
}, {
    name: 'Timely',
    url: 'https://www.timelypro.online',
    image: 'timely.jpg'
}, {
    name: 'BuzzLine',
    url: 'https://ayaan-creator-web.github.io/BuzzLine/',
    image: 'buzzline.jpg'
}/*, {
    name: 'Khan',
    url: 'https://www.khanacademy.org',
}*/, {
    name: 'Terminal',
    url: 'https://ayaan-creator-web.github.io/CMD-Prompt/',
    image: 'terminal.png'
}, {
    name: 'Help',
    url: 'https://ayaan-creator-web.github.io/MiniOS/hi.html',
    image: 'help.png'
}, {
    name: 'Profile',
    url: 'https://ayaan-creator-web.github.io/MiniOS/profile.html',
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
    start();
    document.body.classList.add('unblurred');

    await delay(8);
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

async function start() {
    tako.log('MiniOS Started');
    await loginSound.play();
    document.body.innerHTML = `
        <div id="taskbar">
        </div>
        <iframe id="app" style="width: 100%; height: 90vh; border: none;"></iframe>
    `;
    showApps();
    document.addEventListener('keydown', event => {
        if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
            event.preventDefault();
            window.location.href='';
        }
    });
}

function showApps() {
    const taskbar = document.getElementById('taskbar');
    taskbar.innerHTML = ''; // clear previous icons

    apps.forEach((app) => {
        const icon = document.createElement('img');
        icon.src = app.image;
        icon.alt = app.name;
        icon.title = app.name;

        icon.addEventListener('click', () => {
            const appIframe = document.getElementById('app');
            if (appIframe.src === app.url || appIframe.src === app.url + '/') {
                appIframe.src = 'about:blank';
            } else {
                appIframe.src = app.url;
            }
        });

        taskbar.appendChild(icon);
    });
}

String.prototype.startApp = function() {
    const appIframe = document.getElementById('app'); 

    apps.forEach((app) => {
        if (app.name == this) {
            if (appIframe.src === app.url || appIframe.src === app.url + '/') {
                appIframe.src = 'about:blank';
            }
            else {
                appIframe.src = app.url;
            }
        }
    });
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
