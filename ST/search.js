// Search engine data
const searchData = {
    videos: [
        // Basketball
        { title: "LOWLIGHTS FROM BASKETBALL STARS! (Compilation)", category: "Basketball", url: "basketball/baskvid1.html" },
        { title: "NBA Epic Moments", category: "Basketball", url: "basketball/baskvid2.html" },
        { title: "No Regard For Human Life Compilation", category: "Basketball", url: "basketball/baskvid3.html" },
        { title: "Top Basketball PLAYS of 2024 Lonnie WALKER IV Compilation", category: "Basketball", url: "basketball/baskvid4.html" },
        
        // Football
        { title: "1 in a Trillion Moments in Football", category: "Football", url: "football/footvid1.html" },
        { title: "Best Skills Of Year 2024", category: "Football", url: "football/footvid2.html" },
        { title: "Moments that Can't be Repeated in Football", category: "Football", url: "football/footvid3.html" },
        { title: "Unforgettable Goals In Football • Football Greatest Moments", category: "Football", url: "football/footvid4.html" },
        
        // Hockey
        { title: "Best Dangles in NHL History - The Highlight Factory", category: "Hockey", url: "hockey/hockvid1.html" },
        { title: "Best Saves in NHL History - The Highlight Factory", category: "Hockey", url: "hockey/hockvid2.html" },
        { title: "Great Goals of the Decade 2010-2019", category: "Hockey", url: "hockey/hockvid3.html" },
        { title: "NHL He's Not Human Moments", category: "Hockey", url: "hockey/hockvid4.html" },
        
        // Baseball
        { title: "Inside World Series Game 7 Raw footage of the Dodgers clinching the World Series in Toronto!", category: "Baseball", url: "baseball/basvid1.html" },
        { title: "MLB Compilation of painful Baseball hits", category: "Baseball", url: "baseball/basvid2.html" },
        { title: "MLB Unexpected Trick Compilation", category: "Baseball", url: "baseball/basvid3.html" },
        { title: "Super Rare Moments In Baseball Compilations", category: "Baseball", url: "baseball/basvid4.html" },
        
        // Badminton
        { title: "10 Bad Habits To Avoid In 2025!", category: "Badminton", url: "badminton/badvid1.html" },
        { title: "These 13 Skills Will Make You a GREAT Badminton Player", category: "Badminton", url: "badminton/badvid2.html" },
        { title: "Top 50 BULLET SMASHES in Badminton that You Must Watch!", category: "Badminton", url: "badminton/badvid3.html" },
        { title: "When Badminton Players Use 1000% Skills", category: "Badminton", url: "badminton/badvid4.html" }
    ],
    
    categories: [
        { title: "Basketball", url: "basketball/basketball.html", type: "category" },
        { title: "Football", url: "football/football.html", type: "category" },
        { title: "Hockey", url: "hockey/hockey.html", type: "category" },
        { title: "Baseball", url: "baseball/baseball.html", type: "category" },
        { title: "Badminton", url: "badminton/badminton.html", type: "category" }
    ],
    
    pages: [
        { title: "Home", url: "index.html", type: "page" },
        { title: "Explore", url: "explore.html", type: "page" },
        { title: "History", url: "history.html", type: "page" }
    ]
};

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/basketball/') || path.includes('/football/') || 
        path.includes('/hockey/') || path.includes('/baseball/') || 
        path.includes('/badminton/')) {
        return '../';
    }
    return '';
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchInput || !searchBtn || !searchContainer) return;
    
    // Create suggestions dropdown
    const suggestionsBox = document.createElement('div');
    suggestionsBox.className = 'search-suggestions';
    searchContainer.appendChild(suggestionsBox);
    
    // Show suggestions on click
    searchInput.addEventListener('click', () => {
        showSuggestions('');
    });
    
    // Show suggestions on input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        showSuggestions(query);
    });
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value.trim());
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsBox.classList.remove('show');
        }
    });
    
    function showSuggestions(query) {
        const basePath = getBasePath();
        let results = [];
        
        if (query === '') {
            // Show random 4 items when clicked without typing
            const allItems = [
                ...searchData.videos,
                ...searchData.categories,
                ...searchData.pages
            ];
            results = allItems.sort(() => 0.5 - Math.random()).slice(0, 4);
        } else {
            // Filter based on query
            const lowerQuery = query.toLowerCase();
            
            const videoMatches = searchData.videos.filter(item => 
                item.title.toLowerCase().includes(lowerQuery) ||
                item.category.toLowerCase().includes(lowerQuery)
            );
            
            const categoryMatches = searchData.categories.filter(item =>
                item.title.toLowerCase().includes(lowerQuery)
            );
            
            const pageMatches = searchData.pages.filter(item =>
                item.title.toLowerCase().includes(lowerQuery)
            );
            
            results = [...categoryMatches, ...pageMatches, ...videoMatches].slice(0, 4);
        }
        
        if (results.length === 0 && query !== '') {
            suggestionsBox.innerHTML = '<div class="suggestion-item no-results">No results found</div>';
            suggestionsBox.classList.add('show');
            return;
        }
        
        suggestionsBox.innerHTML = results.map(item => `
            <a href="${basePath}${item.url}" class="suggestion-item">
                <div class="suggestion-content">
                    <div class="suggestion-title">${highlightMatch(item.title, query)}</div>
                    ${item.type ? `<div class="suggestion-type">${item.type}</div>` : `<div class="suggestion-category">${item.category}</div>`}
                </div>
            </a>
        `).join('');
        
        suggestionsBox.classList.add('show');
    }
    
    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    function performSearch(query) {
        if (!query) {
            alert('Please enter a search term');
            return;
        }
        
        const basePath = getBasePath();
        const lowerQuery = query.toLowerCase();
        
        // Search in all items
        const allItems = [
            ...searchData.videos,
            ...searchData.categories,
            ...searchData.pages
        ];
        
        const match = allItems.find(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            (item.category && item.category.toLowerCase().includes(lowerQuery))
        );
        
        if (match) {
            window.location.href = basePath + match.url;
        } else {
            // If no match, go to explore page with search query
            const explorePath = basePath + 'explore.html';
            window.location.href = `${explorePath}?search=${encodeURIComponent(query)}`;
        }
    }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', initializeSearch);