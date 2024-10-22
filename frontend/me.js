// Example API URL - replace with your actual endpoint
const apiUrl = 'http://localhost:8080/api/test/me';

// Retrieve the Bearer token from localStorage (assuming it's stored with the key 'authToken')
const token = localStorage.getItem('token');

// Function to fetch data from the API with Bearer token authorization
async function fetchUserData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adding the Bearer token to the request
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        displayUserData(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to display user data in the HTML
function displayUserData(user) {
    const userInfoDiv = document.getElementById('user-info');

    // Creating HTML structure to display user data
    userInfoDiv.innerHTML = `
        <div class="user-info"><strong>ID:</strong> ${user.id}</div>
        <div class="user-info"><strong>Username:</strong> ${user.username}</div>
        <div class="user-info"><strong>Email:</strong> ${user.email}</div>
        <div class="user-info"><strong>Password:</strong> <code>${user.password}</code></div>
        <div class="roles">
            <p><span>Roles:</span></p>
            <ul>
                ${user.roles.map(role => `<li>${role.name}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Fetch and display the user data when the page loads
fetchUserData();
