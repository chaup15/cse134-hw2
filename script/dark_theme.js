document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme) {
        //set theme according to theme saved in local storage
        if(savedTheme === 'dark') {
            toggle.checked = true;
            document.body.classList.add('dark-theme');
        }
        else {
            toggle.checked = false;
            document.body.classList.remove('dark-theme');
        }
    }

    toggle.addEventListener('change', function() {
        //change theme according to toggle
        if(toggle.checked) {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark-theme');
        }
        else {
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark-theme');
        }
        console.log(localStorage.getItem('theme'));
    });
});