document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById("loginError");

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);

        console.log('Login successful', data);

        window.location.href = 'todo.html';
    } catch (error) {
        console.error('Error during login:', error);

        loginError.innerHTML = error.message;
        loginError.style.display = 'block';
    }
    
};

document.getElementById('registerForm').onsubmit = async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const registerError = document.getElementById("registerError");

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        
        console.log('Registration successful', data);

        window.location.href = 'todo.html'
    } catch (error) {
        console.error('Error during registration:', error);

        registerError.innerHTML = error.message;
        registerError.style.display = 'block';
    }
};

