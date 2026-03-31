/**
 * The Living Bread - Browser Extension Background Script
 *
 * Tracks time spent on Christian content across the web.
 * Monitors Bible reading, sermons, worship music, podcasts, and more.
 */

// Known Christian content platforms
const CHRISTIAN_PLATFORMS = {
  bible: [
    'bible.com', 'biblegateway.com', 'biblehub.com',
    'blueletterbible.org', 'youversion.com', 'esv.org'
  ],
  sermons: [
    'sermoncentral.com', 'rightnowmedia.org', 'desiringgod.org',
    'thegospelcoalition.org', 'gracetoyou.org'
  ],
  music: [
    'spotify.com', 'music.apple.com', 'music.youtube.com',
    'klove.com', 'air1.com'
  ],
  devotionals: [
    'ourdailybread.org', 'she-reads-truth.com', 'he-reads-truth.com',
    'prayermate.net', 'pray.com'
  ]
};

// Christian keywords for content detection
const CHRISTIAN_KEYWORDS = [
  'bible', 'scripture', 'gospel', 'jesus', 'christ', 'christian',
  'worship', 'prayer', 'sermon', 'church', 'faith', 'god',
  'devotional', 'psalm', 'verse', 'testament', 'ministry',
  'praise', 'hallelujah', 'amen', 'holy spirit', 'salvation'
];

// Track active time on tabs
let activeTab = null;
let trackingStartTime = null;
let pendingActivities = [];

// Initialize
chrome.runtime.onInstalled.addListener(() => {
  console.log('The Living Bread extension installed');
  chrome.storage.local.set({
    totalMinutesToday: 0,
    activities: [],
    lastSyncDate: new Date().toISOString().split('T')[0]
  });
});

// Check if URL contains Christian content
function isChristianContent(url, title = '') {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();

  // Check known platforms
  for (const platforms of Object.values(CHRISTIAN_PLATFORMS)) {
    for (const platform of platforms) {
      if (urlLower.includes(platform)) {
        return true;
      }
    }
  }

  // Check for Christian keywords
  for (const keyword of CHRISTIAN_KEYWORDS) {
    if (urlLower.includes(keyword) || titleLower.includes(keyword)) {
      return true;
    }
  }

  // Check for YouTube with Christian content
  if (urlLower.includes('youtube.com/watch')) {
    for (const keyword of CHRISTIAN_KEYWORDS) {
      if (titleLower.includes(keyword)) {
        return true;
      }
    }
  }

  return false;
}

// Determine content type
function getContentType(url) {
  const urlLower = url.toLowerCase();

  for (const site of CHRISTIAN_PLATFORMS.bible) {
    if (urlLower.includes(site)) return 'BIBLE_READING';
  }

  for (const site of CHRISTIAN_PLATFORMS.music) {
    if (urlLower.includes(site)) return 'WORSHIP_MUSIC';
  }

  for (const site of CHRISTIAN_PLATFORMS.devotionals) {
    if (urlLower.includes(site)) return 'DEVOTIONAL';
  }

  if (urlLower.includes('youtube.com') || urlLower.includes('vimeo.com')) {
    return 'SERMON';
  }

  if (urlLower.includes('podcast')) {
    return 'PODCAST';
  }

  return 'OTHER';
}

// Save activity
async function saveActivity(url, title, duration, activityType = 'READ') {
  const activity = {
    id: Date.now().toString(),
    url,
    title,
    contentType: getContentType(url),
    activityType,
    durationMinutes: Math.round(duration / 60),
    timestamp: new Date().toISOString(),
    source: new URL(url).hostname
  };

  // Store locally
  const { activities = [] } = await chrome.storage.local.get('activities');
  activities.push(activity);
  await chrome.storage.local.set({ activities: activities.slice(-100) }); // Keep last 100

  // Update daily total
  const { totalMinutesToday = 0 } = await chrome.storage.local.get('totalMinutesToday');
  await chrome.storage.local.set({
    totalMinutesToday: totalMinutesToday + activity.durationMinutes
  });

  // Add to pending sync
  pendingActivities.push(activity);

  console.log('Activity saved:', activity);
}

// Track tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // Stop tracking previous tab
  if (activeTab && trackingStartTime) {
    const duration = (Date.now() - trackingStartTime) / 1000; // seconds
    if (duration > 30) { // Only track if more than 30 seconds
      const tab = await chrome.tabs.get(activeTab.id).catch(() => null);
      if (tab && isChristianContent(tab.url, tab.title)) {
        await saveActivity(tab.url, tab.title, duration);
      }
    }
  }

  // Start tracking new tab
  const tab = await chrome.tabs.get(activeInfo.tabId).catch(() => null);
  if (tab && isChristianContent(tab.url || '', tab.title || '')) {
    activeTab = tab;
    trackingStartTime = Date.now();
  } else {
    activeTab = null;
    trackingStartTime = null;
  }
});

// Track URL changes within a tab
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    // Stop tracking if URL changed
    if (activeTab && trackingStartTime && activeTab.id === tabId) {
      const duration = (Date.now() - trackingStartTime) / 1000;
      if (duration > 30 && activeTab.url) {
        await saveActivity(activeTab.url, activeTab.title || '', duration);
      }
    }

    // Start tracking new URL
    if (isChristianContent(changeInfo.url, tab.title || '')) {
      activeTab = tab;
      trackingStartTime = Date.now();
    } else {
      activeTab = null;
      trackingStartTime = null;
    }
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_STATS') {
    chrome.storage.local.get(['totalMinutesToday', 'activities'], (data) => {
      sendResponse(data);
    });
    return true;
  }

  if (message.type === 'SYNC') {
    syncActivities().then(() => sendResponse({ success: true }));
    return true;
  }
});

// Sync activities to server
async function syncActivities() {
  if (pendingActivities.length === 0) return;

  try {
    const response = await fetch('https://thelivingbread.org/api/activities/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities: pendingActivities })
    });

    if (response.ok) {
      pendingActivities = [];
      console.log('Activities synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync activities:', error);
  }
}

// Set up periodic sync
chrome.alarms.create('syncActivities', { periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'syncActivities') {
    syncActivities();
  }
});

// Reset daily stats at midnight
chrome.alarms.create('resetDaily', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'resetDaily') {
    const { lastSyncDate } = await chrome.storage.local.get('lastSyncDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastSyncDate !== today) {
      await chrome.storage.local.set({
        totalMinutesToday: 0,
        lastSyncDate: today
      });
    }
  }
});
