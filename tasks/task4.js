"Ваш код повинен зробити DELETE-запит до вказаного URL, де {userId} – це ID користувача, якого потрібно видалити."
"Поверніть статус відповіді сервера після видалення."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function deleteUser(id) {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: `/users/${id}`,
        method: 'DELETE'
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    resolve({
                        status: response.statusCode,
                        message: 'User deleted successfully'
                    });
                } catch (error) {
                    reject(new Error('Помилка при обробці відповіді: ' + error.message));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error('Помилка при запиті: ' + error.message));
        });

        req.end();
    });
}

module.exports = deleteUser;