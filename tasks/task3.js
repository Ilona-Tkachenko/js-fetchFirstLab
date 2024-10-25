"Ваш код повинен зробити PATCH-запит до вказаного URL, де {userId} – це ID існуючого користувача."
"Для оновлення користувача передайте в запит нові дані, наприклад, нове ім’я."
"Поверніть відповідь від сервера з оновленими даними користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function updateUser(id, updatedData) {
    const patchData = JSON.stringify(updatedData);
   
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: `/users/${id}`,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(patchData)
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

        req.write(patchData);
        req.end();
    });
}

module.exports = updateUser;