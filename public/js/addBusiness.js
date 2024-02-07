/*
    Adding new business when add business button clicked in addBusiness.html page
*/

document.getElementById('add-business-button').addEventListener('click', async (event)=>{
    event.preventDefault();
    const name = document.getElementById('business-name').value;
    const type = document.getElementById('business-type').value;
    const country = document.getElementById('business-country').value;
    const region = document.getElementById('business-region').value;
    const lon = document.getElementById('business-position-lon').value;
    const lat = document.getElementById('business-position-lat').value;
    const description = document.getElementById('business-description').value;
    const recommendations = 0;
    const response = await fetch('/business/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, type, country, region, lon, lat, description, recommendations})
    });
    const result = await response.json();
    alert(result.message);
})