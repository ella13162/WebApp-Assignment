function searchBusinesses() {
    const region = document.getElementById('regionInput').value;
    fetch(`http://localhost:3000/localbusiness/${region}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsContainer.innerHTML = '<p>No businesses found in this region.</p>';
                return;
            }

            // Loop through each business and display it
            data.forEach(business => {
                const businessElement = document.createElement('div');
                businessElement.innerHTML = `
                    <h3>${business.name}</h3>
                    <p>Type: ${business.type}</p>
                    <p>Description: ${business.description}</p>
                    <button onclick="recommendBusiness(${business.id})">Recommend</button>
                `;
                resultsContainer.appendChild(businessElement);
            });
        })
        .catch(error => {
            console.error('Error fetching businesses:', error);
            document.getElementById('results').innerHTML = `<p>Error loading businesses: ${error.message}</p>`;
        });
}

function recommendBusiness(id) {
    fetch(`http://localhost:3000/localbusiness/recommend/${id}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log('Recommendation Success:', data);
            alert(`Business recommended successfully!`);
        })
        .catch(error => console.error('Error recommending business:', error));
}
