<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MiniOS Login</title>
    <link rel="stylesheet" href="m.css" />
    <style>
        #taskbar {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(12px);
        padding: 8px 16px;
        border-radius: 20px;
        display: flex;
        gap: 16px;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        #taskbar img {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
        }

        #taskbar img:hover {
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }

        #app {
            margin-top: 20px;
            width: 100%;
            height: calc(100vh - 80px);
            border: none;
        }

        .welcome-message {
            position: fixed;
            top: 20px;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 16px;
            font-weight: 500;
            opacity: 0;
            visibility: hidden;
            transition: opacity 2s ease-in-out, visibility 2s ease-in-out;
            z-index: 1000;
            text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        .welcome-message.show {
            opacity: 1;
            visibility: visible;
        }
    </style>
</head>
<body class="mac-blur-background">
    <script src="https://ayaan-creator-web.github.io/Libraries/tako.js"></script>
    <script async src="https://cse.google.com/cse.js?cx=a41e3e3b74f504ac5"></script>
    <div class="login-container">
        <div class="date-time-section">
            <div class="date" id="current-date"></div>
            <div class="time" id="current-time"></div>
        </div>

        <div class="input-section">
            <input type="text" id="username" placeholder="Username" class="input-field"/>
        </div>

        <div class="input-section">
            <input type="password" id="password" placeholder="Password" class="input-field" />
        </div>
    </div>

    <div id="welcomeMessage" class="welcome-message">
        Welcome, <span id="messageUsername"></span>!
    </div>

    <script>
        document.getElementById('username').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('password').focus();
        });
        async function updateDateTime() {
            const now = new Date();

            const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
            document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', optionsDate);

            const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: false };
            let timeString = now.toLocaleTimeString('en-US', optionsTime);

            timeString = timeString.replace(/ (AM|PM)/i, '');

            document.getElementById('current-time').textContent = timeString;
        }

        async function updateTimeLoop() {
            while (document.getElementById('current-time')) {
                updateDateTime();
                await delay(1000);
            }
        }

        updateTimeLoop();

        updateDateTime();

        document.getElementById('username').addEventListener('focus', function() {
            this.parentNode.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.5)';
        });

        document.getElementById('username').addEventListener('blur', function() {
            this.parentNode.style.boxShadow = 'none';
        });

        document.getElementById('password').addEventListener('focus', function() {
            this.parentNode.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.5)';
        });

        document.getElementById('password').addEventListener('blur', function() {
            this.parentNode.style.boxShadow = 'none';
        });
        function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    </script>
    <script src="m.js"></script>
</body>
</html>
