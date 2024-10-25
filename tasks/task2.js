"Ваш код повинен зробити POST-запит до вказаного URL."
"Для створення нового користувача, передайте в запит наступні дані:"
"name: ваше ім’я"
"email: ваш email"
"Поверніть відповідь від сервера після створення користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function createUser(user) {
    const postData = JSON.stringify(user);
    
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Помилка при обробці відповіді: ' + error.message));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error('Помилка при запиті: ' + error.message));
        });

        req.write(postData);
        req.end();
    });
}

module.exports = createUser;