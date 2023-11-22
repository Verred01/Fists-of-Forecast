function storeSearch() {
    const searchBox = document.getElementById('search-box');
    const searchTerm = searchBox.value.trim();

    if (searchTerm) {
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
        searches.unshift(searchTerm); 
        searches = searches.slice(0, 10); 
        localStorage.setItem('searches', JSON.stringify(searches));

        updateRecentSearches(searches);
    }

    searchBox.value = ''; 
}

function updateRecentSearches(searches) {
    const recentSearches = document.getElementById('recent-searches');
    recentSearches.innerHTML = ''; 

    searches.forEach(term => {
        const entry = document.createElement('div');
        entry.className = 'search-history-entry';
        entry.textContent = term;
        recentSearches.appendChild(entry);
    });
}

window.onload = function() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    updateRecentSearches(searches);
    document.getElementById('search-btn').onclick = storeSearch;
}
//API for fishing areas based on zip code start
function searchFishingAreas(zipCode) {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions", + '?zipCode=' + zipCode)
        .then(response => response.json())
        .then(data => displayFishingAreas(data))
        .catch(error => console.error('Error:', error));
}

function displayFishingAreas(data) {
    const container = document.getElementById('geoApiContainer');
    container.innerHTML = ''; 


    data.forEach(area => {
        const entry = document.createElement('div');
        entry.className = 'fishing-area-entry';
        entry.textContent = area.name; 
        container.appendChild(entry);
    });
}

document.getElementById('search-btn').onclick = function() {
    const zipCode = document.getElementById('search-box').value.trim();
    storeSearch();
    searchFishingAreas(zipCode);
};
//API for fishing areas based on zip code end