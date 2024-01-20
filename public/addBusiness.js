function addBusiness() {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const country = document.getElementById('country').value;
    const region = document.getElementById('region').value;
    const lon = document.getElementById('lon').value;
    const lat = document.getElementById('lat').value;
    const description = document.getElementById('description').value;
 
    fetch('http://localhost:3000/localbusiness/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, country, region, lon, lat, description }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
            response.json({message : 'Business added succesfully'});
        }
        return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}
