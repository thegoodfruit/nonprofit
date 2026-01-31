/**
 * The Living Bread - Browser Extension Popup Script
 */

const contentTypeIcons = {
  BIBLE_READING: '📖',
  SERMON: '🎬',
  WORSHIP_MUSIC: '🎵',
  PODCAST: '🎙️',
  DEVOTIONAL: '📝',
  OTHER: '✨'
};

async function loadStats() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_STATS' }, (response) => {
      resolve(response || { totalMinutesToday: 0, activities: [] });
    });
  });
}

function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function renderActivity(activity) {
  const icon = contentTypeIcons[activity.contentType] || '✨';
  return `
    <div class="activity-item">
      <div class="activity-icon">${icon}</div>
      <div class="activity-info">
        <div class="activity-title">${activity.title || 'Unknown content'}</div>
        <div class="activity-source">${activity.source || 'Unknown source'}</div>
      </div>
      <div class="activity-duration">${activity.durationMinutes}m</div>
    </div>
  `;
}

async function init() {
  const stats = await loadStats();

  // Update total minutes
  document.getElementById('todayMinutes').textContent = stats.totalMinutesToday || 0;

  // Render activities
  const activityList = document.getElementById('activityList');
  const activities = stats.activities || [];

  if (activities.length > 0) {
    // Show last 5 activities, most recent first
    const recentActivities = activities.slice(-5).reverse();
    activityList.innerHTML = recentActivities.map(renderActivity).join('');
  } else {
    activityList.innerHTML = `
      <div class="empty-state">
        <p>Start browsing Christian content to track your time with Christ.</p>
      </div>
    `;
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
