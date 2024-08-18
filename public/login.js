document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful', data);
        window.location.href = 'todo.html';
    } catch (error) {
        console.error('Error during login:', error);
    }
    
};

document.getElementById('registerForm').onsubmit = async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful', data);

        window.location.href = 'todo.html'
    } catch (error) {
        console.error('Error during registration:', error);
    }
};

