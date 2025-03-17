class ProjectCard extends HTMLElement {
    constructor() {
        super(); // Always call super first in constructor

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title') || 'Project Title';

        const picture = document.createElement('picture');
        const img = document.createElement('img');
        img.src = this.getAttribute('image') || 'default-image.jpg';
        img.alt = this.getAttribute('alt') || 'Project Image';
        picture.appendChild(img);

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description') || 'This is a short description of the project.';

        const link = document.createElement('a');
        link.href = this.getAttribute('link') || '#';
        link.textContent = 'Learn more';

        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(description);
        card.appendChild(link);

        const style = document.createElement('style');
        style.textContent = `
        :host {
            display: block;
            margin: 1rem;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            width: 400px;
        }

        .card {
            display: flex;
            flex-direction: column;
            background-color: white;
            color: #333;
            border-radius: 15px;
            padding: 1rem;
            height: 500px;
        }

        h2 {
            font-size: 1.5rem;
            margin: 0.5rem 0;
            color: var(--headings-color, #000);
        }

        picture img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
        }

        p {
            flex: 1;
            font-size: 1rem;
            margin: 0.5rem 0;
        }

        a {
            text-decoration: none;
            font-weight: bold;
            color: var(--hover-color, #000);
        }

        a:hover {
            text-decoration: underline;
        }

        :host(:hover) {
            transform: scale(1.05);
        }
        `;

        this.shadowRoot.append(style, card);
    }
}

customElements.define('project-card', ProjectCard);

const projectData = [
    {
        title: 'PantryPal Application',
        image: 'media/recipe.jpg',
        alt: 'Image of a pancake and its ingredients',
        description: 'App powered by ChatGPT AI to generate budget-friendly recipe using leftover ingredients.',
        link: 'https://drive.google.com/file/d/1qwK_l3pbgpyL6aqvnsxiyNfYQy2ZniB9/view?usp=sharing'
    },
    {
        title: 'Coffee Recipe Web Application',
        image: 'media/coffee.jpg',
        alt: 'Image of a cup of coffee',
        description: 'This is a coffee recipe management web application',
        link: 'https://www.youtube.com/watch?v=R2Cw1NZH7bc&ab_channel=StevenHsu'
    }
];

localStorage.setItem('projects', JSON.stringify(projectData));

function populateProjectCards(projectData) {
    const container = document.querySelector('.project-container');

    projectData.forEach(project => {
        const card = document.createElement('project-card');
        card.setAttribute('title', project.title);
        card.setAttribute('image', project.image);
        card.setAttribute('alt', project.alt);
        card.setAttribute('description', project.description);
        card.setAttribute('link', project.link);
        container.appendChild(card);
    });
}

function loadLocalData() {
    const container = document.querySelector('.project-container');
    container.innerHTML = ''; // Clear previous cards

    const storedData = localStorage.getItem('projects');
    if (storedData) {
        const projectData = JSON.parse(storedData);
        populateProjectCards(projectData);
    } else {
        console.log("No project data in localStorage.");
    }
}

function loadRemoteData() {
    const container = document.querySelector('.project-container');
    container.innerHTML = ''; // Clear previous cards

    fetch('https://my-json-server.typicode.com/chaup15/cse134-hw2/db')  
        .then(response => response.json())
        .then(data => {
            const projectData = data.projects || [];
            populateProjectCards(projectData);
        })
        .catch(error => console.error('Error fetching remote data:', error));
}

document.getElementById('local-button').addEventListener('click', loadLocalData);
document.getElementById('remote-button').addEventListener('click', loadRemoteData);

// document.addEventListener('DOMContentLoaded', loadLocalData);