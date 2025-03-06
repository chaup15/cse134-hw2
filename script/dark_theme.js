document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme) {
        if(savedTheme === 'dark') {
            toggle.checked = true;
        }
        else {
            toggle.checked = false;
        }
    }

    toggle.addEventListener('change', function() {
        if(toggle.checked) {
            localStorage.setItem('theme', 'dark');
        }
        else {
            localStorage.setItem('theme', 'light');
        }
        console.log(localStorage.getItem('theme'));
    });
});