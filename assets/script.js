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