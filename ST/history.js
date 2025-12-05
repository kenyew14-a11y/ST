// History management system
class WatchHistory {
    constructor() {
        this.storageKey = 'watchHistory';
        this.init();
    }

    init() {
        this.checkAuthAndLoadHistory();
        this.setupClearButton();
    }

    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    }

    // Get user-specific storage key
    getUserStorageKey() {
        const username = localStorage.getItem('username') || 'guest';
        return `${this.storageKey}_${username}`;
    }

    // Check authentication and show appropriate view
    checkAuthAndLoadHistory() {
        const loggedInView = document.getElementById('loggedInView');
        const notLoggedInView = document.getElementById('notLoggedInView');

        if (this.isAuthenticated()) {
            // User is logged in, show history
            loggedInView.style.display = 'block';
            notLoggedInView.style.display = 'none';
            this.loadHistory();
        } else {
            // User is not logged in, show sign-in prompt
            loggedInView.style.display = 'none';
            notLoggedInView.style.display = 'flex';
        }
    }

    // Get all history from localStorage
    getHistory() {
        if (!this.isAuthenticated()) {
            return [];
        }
        const storageKey = this.getUserStorageKey();
        const history = localStorage.getItem(storageKey);
        return history ? JSON.parse(history) : [];
    }

    // Save history to localStorage
    saveHistory(history) {
        if (!this.isAuthenticated()) {
            return;
        }
        const storageKey = this.getUserStorageKey();
        localStorage.setItem(storageKey, JSON.stringify(history));
    }

    // Add video to history (called from video pages)
    addToHistory(videoData) {
        if (!this.isAuthenticated()) {
            return;
        }

        let history = this.getHistory();
        
        // Remove duplicate if exists (move to top)
        history = history.filter(item => item.url !== videoData.url);
        
        // Add to beginning of array (most recent first)
        history.unshift({
            ...videoData,
            timestamp: Date.now(),
            watchedAt: new Date().toISOString()
        });
        
        // Keep only last 50 videos
        history = history.slice(0, 50);
        
        this.saveHistory(history);
    }

    // Clear all history
    clearHistory() {
        if (!this.isAuthenticated()) {
            return;
        }

        if (confirm('Are you sure you want to clear all watch history?')) {
            const storageKey = this.getUserStorageKey();
            localStorage.removeItem(storageKey);
            this.loadHistory();
        }
    }

    // Load and display history
    loadHistory() {
        if (!this.isAuthenticated()) {
            return;
        }

        const history = this.getHistory();
        const historyContent = document.getElementById('historyContent');
        const emptyState = document.getElementById('emptyState');

        if (history.length === 0) {
            historyContent.style.display = 'none';
            emptyState.style.display = 'flex';
        } else {
            historyContent.style.display = 'block';
            emptyState.style.display = 'none';
            this.renderHistory(history);
        }
    }

    // Render history videos
    renderHistory(history) {
        const historyContent = document.getElementById('historyContent');
        const videoGrid = document.createElement('div');
        videoGrid.className = 'video-grid';

        history.forEach(video => {
            const videoCard = this.createVideoCard(video);
            videoGrid.appendChild(videoCard);
        });

        historyContent.innerHTML = '';
        historyContent.appendChild(videoGrid);
    }

    // Create video card element
    createVideoCard(video) {
        const card = document.createElement('a');
        card.href = video.url;
        card.className = 'video-card';

        // Calculate time ago
        const timeAgo = this.getTimeAgo(video.timestamp);

        card.innerHTML = `
            <div class="thumbnail-container">
                <img class="thumbnail" src="${video.thumbnail}" alt="${video.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22180%22><rect fill=%22%23303030%22 width=%22320%22 height=%22180%22/><text x=%2250%%22 y=%2250%%22 fill=%22%23aaa%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2218%22>No Image</text></svg>'">
                <span class="duration">${video.duration || '0:00'}</span>
            </div>
            <div class="video-info">
                <div class="channel-avatar"></div>
                <div class="video-details">
                    <div class="video-title">${video.title}</div>
                    <div class="video-meta">${video.category || 'Sports'} • ${timeAgo}</div>
                </div>
            </div>
        `;

        return card;
    }

    // Calculate time ago
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }

    // Setup clear history button
    setupClearButton() {
        const clearBtn = document.getElementById('clearHistoryBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearHistory());
        }
    }
}

// Initialize history on page load
document.addEventListener('DOMContentLoaded', () => {
    const watchHistory = new WatchHistory();
    
    // Make it globally available
    window.watchHistory = watchHistory;
});

// Export for use in other pages
window.WatchHistory = WatchHistory;