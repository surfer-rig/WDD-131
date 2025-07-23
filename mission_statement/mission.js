// Select the dropdown element
const themeSelector = document.querySelector('#theme-select');

// Define the function to run when the theme changes
function changeTheme() {
    const body = document.body;
    const logo = document.querySelector('.logo img'); // assuming you're using an <img> for the logo

    if (themeSelector.value === 'dark') {
        body.classList.add('dark');
        if (logo) logo.src = 'images/white-logo.png'; // replace with correct path to white logo
    } else {
        body.classList.remove('dark');
        if (logo) logo.src = 'images/blue-logo.png'; // replace with correct path to blue logo
    }
}

// Attach the event listener to the dropdown
themeSelector.addEventListener('change', changeTheme);
