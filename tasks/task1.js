"Ваша функція повинна робити GET-запит до вказаного URL і отримати дані."
"Поверніть дані користувачів у форматі масиву"
"Дані мають включати такі поля, як id та name."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function fetchUsers() {
    return new Promise((resolve, reject) => {
        https.get('https://jsonplaceholder.typicode.com/users', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const users = JSON.parse(data);
                    const filteredUsers = users.map(user => ({
                        id: user.id,
                        name: user.name
                    }));
                    resolve(filteredUsers);
                } catch (error) {
                    reject(new Error('Помилка при обробці даних: ' + error.message));
                }
            });
        }).on('error', (error) => {
            reject(new Error('Помилка при запиті: ' + error.message));
        });
    });
}

module.exports = fetchUsers;