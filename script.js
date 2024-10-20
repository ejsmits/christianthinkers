// script.js

// Laad de JSON-data
fetch('christian_thinkers.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log de data om te controleren wat er wordt geladen
        const container = document.getElementById('cards-container');

        // Sorteer de data op basis van het laatste woord in de naam
        data.sort((a, b) => {
            const lastNameA = a.name.split(' ').pop().toLowerCase();
            const lastNameB = b.name.split(' ').pop().toLowerCase();
            return lastNameA.localeCompare(lastNameB);
        });

        data.forEach(person => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            // Voorkant van de kaart
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');

            // Controleer of er een foto is
            if (person.photo) {
                const image = document.createElement('img');
                image.src = person.photo;
                image.alt = person.name;
                image.classList.add('card-image'); // Voeg een CSS-klasse toe voor styling
                cardFront.appendChild(image);

                // Naam van de persoon over de foto
                const overlay = document.createElement('div');
                overlay.classList.add('card-overlay');
                overlay.textContent = person.name;
                cardFront.appendChild(overlay);
            } else {
                // Voeg een CSS-klasse toe voor de standaard achtergrondkleur als er geen foto is
                cardFront.classList.add('no-photo');
                cardFront.textContent = person.name; // Toon de naam op de voorkant
            }

            cardInner.appendChild(cardFront);

            // Achterkant van de kaart
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            const name = document.createElement('h2');
            name.textContent = person.name;

            // Levensjaren weergeven
            const birthYear = person.birth_year;
            const deathYear = person.death_year || 'heden';
            const currentYear = new Date().getFullYear();
            const age = deathYear === 'heden' ? currentYear - birthYear : deathYear - birthYear;

            const lifeInfo = document.createElement('p');
            lifeInfo.textContent = `Geboortejaar: ${birthYear} - ${deathYear} (${age} jaar)`;
            
            const specialization = document.createElement('p');
            specialization.classList.add('specialization');
            specialization.textContent = `Specialisatie: ${person.specialization}`;

            const knownFor = document.createElement('p');
            knownFor.classList.add('known-for');
            knownFor.textContent = Array.isArray(person.known_for) ? `Bekend om: ${person.known_for.join(', ')}` : `Bekend om: ${person.known_for}`;

            const notableBook = document.createElement('p');
            notableBook.classList.add('notable-book');
            notableBook.textContent = `Bekend boek: ${person.notable_book}`;

            const organization = document.createElement('p');
            organization.classList.add('organization');
            organization.textContent = `Organisatie: ${person.organization}`;

            // Voeg de zoekknop toe
            const searchButton = document.createElement('button');
            searchButton.textContent = 'Zoek op Google';
            searchButton.classList.add('search-button'); // Voeg de CSS-klasse toe

            searchButton.onclick = () => {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(person.name)}`, '_blank');
            };

            // Voeg alles toe aan de achterkant
            cardBack.appendChild(name);
            cardBack.appendChild(lifeInfo);

            cardBack.appendChild(organization);
            cardBack.appendChild(specialization);
            cardBack.appendChild(knownFor);
            cardBack.appendChild(notableBook);
            cardBack.appendChild(searchButton); // Voeg de zoekknop toe

            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
