// initializing the map
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let markers = [];

// it clears all the previous markers and result list
const clearPreviousResult = (searchResultSpace,markers) => {
    searchResultSpace.innerHTML='';
    markers.map((marker)=>{
        map.removeLayer(marker);
    })
}

// adding marker on map with review form
const addMarkerOnMap = (business,markers) => {
    let marker = L.marker([business.lat,business.lon]).addTo(map).bindPopup(`
        <h3>${business.name}</h3>
        <p>Description: ${business.description}</p>
        <p>Type: ${business.type}</p>
        <p>Country : ${business.description}</p>
        <p>Region : ${business.region}</p>
        <p>Recommendations: ${business.recommendations}</p>
    `);

    /*
        storing markers in array to delete/remove them later using clearPreviousResult() function
    */
    markers.push(marker);
}

document.getElementById('search-button').addEventListener('click',async(event)=>{
    event.preventDefault();
    const regionName = document.getElementById('search-field').value;
    const response = await fetch(`/business/all?region=${regionName}`);
    const businesses = await response.json();
    const searchResultSpace = document.getElementById('searchResult');
    
    /*
        removing previous results if any
        also removing previous markers if any
    */
    clearPreviousResult(searchResultSpace,markers);
    
    if(response.status === 400){
        alert(businesses.message);
    }else if(businesses.length === 0){
        searchResultSpace.innerHTML = `<h2> No Business Found in this area.</h2>`
    } else {
        searchResultSpace.appendChild(document.createElement('h2')).innerHTML = `Business nearby ${regionName} :`;
        searchResultSpace.appendChild(document.createElement('ul')).innerHTML = businesses.map((business)=>{
            
            // showing marker on a specific map position
            addMarkerOnMap(business,markers);
            
            // showing search result as an unordered list
            return `
                <li> 
                    <h3>${business.name} </h3>
                    <p> Recommendations : ${business.recommendations} </p>
                    <button class="recommend-button" id="${business.ID}"> Recommend </button>
                </li>
            `;
        }).join('');

        // recommend button with AJAX handling recommendation
        let buttons = document.querySelectorAll('.recommend-button');
        buttons.forEach((button)=>{
            button.addEventListener('click',async(event)=>{
                const business_id = button.id;
                const response = await fetch(
                    `/business/recommend/${business_id}`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                const result = await response.json();
                alert(result.message);
            });
        })
    }
});

/*
    popup form to add a business when clicked on map
*/
map.on('click',(event)=>{
    let popup = L.popup();
    popup.setLatLng(event.latlng)
    .setContent(`
        <div>
            <form>
                <input type="text" id="business-name" placeholder="Business Name"/> <br>
                <input type="text" id="business-type" placeholder="Type"/> <br>
                <input type="text" id="business-country" placeholder="Country"/> <br>
                <input type="text" id="business-region" placeholder="Region"/> <br>
                <input type="number" id="business-position-lon" value="${event.latlng.lng}" step="0.0000001"/> <br>
                <input type="number" id="business-position-lat" value="${event.latlng.lat}" step="0.0000001"/> <br>
                <input type="text" id="business-description" placeholder="Description"/> <br>
                <button type="submit" id="add-business-button">Add</button>
            </form>
        </div>
    `).openOn(map);

    /*
        adding new business when add business button clicked on map Popup
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
        if(response.status === 201){
            /*
                adding a marker only when a success response returned
            */
            map.closePopup();
            addMarkerOnMap({name, type, country, region, lon, lat, description, recommendations},markers);
        }else{
            alert(result.message);
        }
    });
});