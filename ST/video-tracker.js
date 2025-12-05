// Video History Tracking Script
// This script should be included in all video pages (footvid1.html, baskvid1.html, etc.)

// Function to track video view
function trackVideoView() {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
        return; // Don't track if not logged in
    }

    // Get the current page info
    const currentUrl = window.location.pathname;
    const videoData = getVideoDataForCurrentPage();
    
    if (videoData) {
        // Get or create WatchHistory instance
        const getUserStorageKey = () => {
            const username = localStorage.getItem('username') || 'guest';
            return `watchHistory_${username}`;
        };

        // Get existing history
        const storageKey = getUserStorageKey();
        let history = localStorage.getItem(storageKey);
        history = history ? JSON.parse(history) : [];
        
        // Remove duplicate if exists
        history = history.filter(item => item.url !== videoData.url);
        
        // Add to beginning of array
        history.unshift({
            ...videoData,
            timestamp: Date.now(),
            watchedAt: new Date().toISOString()
        });
        
        // Keep only last 50 videos
        history = history.slice(0, 50);
        
        // Save updated history
        localStorage.setItem(storageKey, JSON.stringify(history));
        
        console.log('Video tracked:', videoData.title);
    }
}

// Function to get video data based on current page
function getVideoDataForCurrentPage() {
    const url = window.location.pathname;
    
    // Video data mapping (customize this based on your actual video pages)
    const videoDataMap = {
        // Football videos
        'football/footvid1.html': {
            url: 'football/footvid1.html',
            title: '1 in a Trillion Moments in Football',
            category: 'Football',
            thumbnail: 'images/1 in a Trillion Moments in Football.png',
            duration: '11:50'
        },
        'football/footvid2.html': {
            url: 'football/footvid2.html',
            title: 'Best Skills Of Year 2024',
            category: 'Football',
            thumbnail: 'images/Best Skills Of Year 2024.png',
            duration: '9:35'
        },
        'football/footvid3.html': {
            url: 'football/footvid3.html',
            title: 'Moments that Can\'t be Repeated in Football',
            category: 'Football',
            thumbnail: 'images/Moments that Can\'t be Repeated in Football.png',
            duration: '14:15'
        },
        'football/footvid4.html': {
            url: 'football/footvid4.html',
            title: 'Unforgettable Goals In Football • Football Greatest Moments',
            category: 'Football',
            thumbnail: 'images/Unforgettable Goals In Football â— Football Greatest Moments.png',
            duration: '7:22'
        },
        // Basketball videos
        'basketball/baskvid1.html': {
            url: 'basketball/baskvid1.html',
            title: 'LOWLIGHTS FROM BASKETBALL STARS! (Compilation)',
            category: 'Basketball',
            thumbnail: 'images/LOWLIGHTS FROM BASKETBALL STARS! (Compilation).png',
            duration: '10:48'
        },
        'basketball/baskvid2.html': {
            url: 'basketball/baskvid2.html',
            title: 'NBA Epic Moments',
            category: 'Basketball',
            thumbnail: 'images/NBA Epic Moments.png',
            duration: '08:45'
        },
        'basketball/baskvid3.html': {
            url: 'basketball/baskvid3.html',
            title: 'No Regard For Human Life Compilation',
            category: 'Basketball',
            thumbnail: 'images/No Regard For Human Life Compilation.png',
            duration: '09:48'
        },
        'basketball/baskvid4.html': {
            url: 'basketball/baskvid4.html',
            title: 'Top Basketball PLAYS of 2024 Lonnie WALKER IV Compilation',
            category: 'Basketball',
            thumbnail: 'images/Top Basketball PLAYS of 2024  Lonnie WALKER IV Compilation.png',
            duration: '06:48'
        },
        // Hockey videos
        'hockey/hockvid1.html': {
            url: 'hockey/hockvid1.html',
            title: 'Best Dangles in NHL History - The Highlight Factory',
            category: 'Hockey',
            thumbnail: 'images/Best Dangles in NHL History - The Highlight Factory.png',
            duration: '04:38'
        },
        'hockey/hockvid2.html': {
            url: 'hockey/hockvid2.html',
            title: 'Best Saves in NHL History - The Highlight Factory',
            category: 'Hockey',
            thumbnail: 'images/Best Saves in NHL History - The Highlight Factory.png',
            duration: '07:09'
        },
        'hockey/hockvid3.html': {
            url: 'hockey/hockvid3.html',
            title: 'Great Goals of the Decade 2010-2019',
            category: 'Hockey',
            thumbnail: 'images/Great Goals of the Decade  2010-2019.png',
            duration: '09:59'
        },
        'hockey/hockvid4.html': {
            url: 'hockey/hockvid4.html',
            title: 'NHL He\'s Not Human Moments',
            category: 'Hockey',
            thumbnail: 'images/NHL He\'s Not Human Moments.png',
            duration: '10:29'
        },
        // Baseball videos
        'baseball/basvid1.html': {
            url: 'baseball/basvid1.html',
            title: 'Inside World Series Game 7 Raw footage of the Dodgers clinching the World Series in Toronto!',
            category: 'Baseball',
            thumbnail: 'images/Inside World Series Game 7 Raw footage of the Dodgers clinching the World Series in Toronto!.png',
            duration: '8:27'
        },
        'baseball/basvid2.html': {
            url: 'baseball/basvid2.html',
            title: 'Super Rare Moments In Baseball  Compilations',
            category: 'Baseball',
            thumbnail: 'images/Super Rare Moments In Baseball  Compilations.png',
            duration: '09:45'
        },
        'baseball/basvid3.html': {
            url: 'baseball/basvid3.html',
            title: 'MLB  Compilation of painful Baseball hits',
            category: 'Baseball',
            thumbnail: 'images/MLB  Compilation of painful Baseball hits.png',
            duration: '10:06'
        },
        'baseball/basvid4.html': {
            url: 'baseball/basvid4.html',
            title: 'MLB  Unexpected Trick Compilation',
            category: 'Baseball',
            thumbnail: 'images/MLB  Unexpected Trick Compilation.png',
            duration: '09:38'
        },
        // Badminton videos
        'badminton/badvid1.html': {
            url: 'badminton/badvid1.html',
            title: '10 Bad Habits To Avoid In 2025!',
            category: 'Badminton',
            thumbnail: 'images/10 Bad Habits To Avoid In 2025!.png',
            duration: '13:48'
        },
        'badminton/badvid2.html': {
            url: 'badminton/badvid2.html',
            title: 'These 13 Skills Will Make You a GREAT Badminton Player',
            category: 'Badminton',
            thumbnail: 'images/These 13 Skills Will Make You a GREAT Badminton Player.png',
            duration: '09:01'
        },
        'badminton/badvid3.html': {
            url: 'badminton/badvid3.html',
            title: 'Top 50 BULLET SMASHES in Badminton that You Must Watch!',
            category: 'Badminton',
            thumbnail: 'images/Top 50 BULLET SMASHES in Badminton that You Must Watch!.png',
            duration: '09:05'
        },
        'badminton/badvid4.html': {
            url: 'badminton/badvid4.html',
            title: 'When Badminton Players Use 1000% Skills',
            category: 'Badminton',
            thumbnail: 'images/When Badminton Players Use 1000% Skills.png',
            duration: '11:22'
        }
    };

    // Find matching video data
    for (const [path, data] of Object.entries(videoDataMap)) {
        if (url.includes(path)) {
            return data;
        }
    }

    return null;
}

// Auto-track when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure localStorage is ready
    setTimeout(() => {
        trackVideoView();
    }, 500);
});

// Export for manual tracking if needed
window.trackVideoView = trackVideoView;