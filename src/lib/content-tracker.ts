/**
 * Content Tracking Service for The Living Bread
 *
 * This module provides functionality to track Christian content engagement
 * across web and mobile platforms. It integrates with browser extensions
 * and mobile apps to monitor:
 *
 * - Bible reading (Bible apps, online Bibles)
 * - Sermon watching (YouTube, church websites)
 * - Worship music listening (Spotify, Apple Music, YouTube Music)
 * - Podcast listening (podcast apps)
 * - Devotional reading (devotional apps and websites)
 * - Content sharing, liking, commenting, and posting
 */

export interface ContentActivity {
  id: string
  userId: string
  contentType: ContentType
  activityType: ActivityType
  title?: string
  source?: string
  platform?: string
  url?: string
  durationMinutes: number
  deviceType: 'mobile' | 'desktop' | 'tablet'
  timestamp: Date
  metadata?: Record<string, unknown>
}

export type ContentType =
  | 'SERMON'
  | 'DEVOTIONAL'
  | 'BIBLE_READING'
  | 'WORSHIP_MUSIC'
  | 'PODCAST'
  | 'VIDEO'
  | 'ARTICLE'
  | 'PRAYER_GUIDE'
  | 'TESTIMONY'
  | 'OTHER'

export type ActivityType =
  | 'READ'
  | 'WATCH'
  | 'LISTEN'
  | 'SHARE'
  | 'LIKE'
  | 'COMMENT'
  | 'POST'
  | 'SAVE'

// Known Christian content platforms and domains
export const CHRISTIAN_PLATFORMS = {
  bible: [
    'bible.com',
    'biblegateway.com',
    'biblehub.com',
    'blueletterbible.org',
    'youversion.com',
    'esv.org',
    'olivetree.com'
  ],
  sermons: [
    'youtube.com',
    'sermoncentral.com',
    'rightnowmedia.org',
    'lifeway.com',
    'desiringgod.org',
    'thegospelcoalition.org'
  ],
  music: [
    'spotify.com',
    'music.apple.com',
    'music.youtube.com',
    'pandora.com',
    'klove.com',
    'air1.com'
  ],
  podcasts: [
    'podcasts.apple.com',
    'spotify.com',
    'overcast.fm',
    'pocketcasts.com'
  ],
  devotionals: [
    'ourdalybread.org',
    'she-reads-truth.com',
    'he-reads-truth.com',
    'prayermate.net',
    'pray.com'
  ]
}

// Keywords to identify Christian content
export const CHRISTIAN_KEYWORDS = [
  'bible', 'scripture', 'gospel', 'jesus', 'christ', 'christian',
  'worship', 'prayer', 'sermon', 'church', 'faith', 'god',
  'devotional', 'psalm', 'verse', 'testament', 'ministry',
  'praise', 'hallelujah', 'amen', 'holy spirit', 'salvation'
]

/**
 * Detects if content is Christian-related based on URL and metadata
 */
export function isChristianContent(url: string, title?: string, metadata?: Record<string, unknown>): boolean {
  const urlLower = url.toLowerCase()
  const titleLower = (title || '').toLowerCase()

  // Check if URL is from a known Christian platform
  for (const platforms of Object.values(CHRISTIAN_PLATFORMS)) {
    for (const platform of platforms) {
      if (urlLower.includes(platform)) {
        return true
      }
    }
  }

  // Check for Christian keywords in URL or title
  for (const keyword of CHRISTIAN_KEYWORDS) {
    if (urlLower.includes(keyword) || titleLower.includes(keyword)) {
      return true
    }
  }

  // Check metadata if available
  if (metadata) {
    const metaString = JSON.stringify(metadata).toLowerCase()
    for (const keyword of CHRISTIAN_KEYWORDS) {
      if (metaString.includes(keyword)) {
        return true
      }
    }
  }

  return false
}

/**
 * Determines the content type based on URL and platform
 */
export function detectContentType(url: string, platform?: string): ContentType {
  const urlLower = url.toLowerCase()

  // Bible reading
  for (const site of CHRISTIAN_PLATFORMS.bible) {
    if (urlLower.includes(site)) {
      return 'BIBLE_READING'
    }
  }

  // Music/Worship
  for (const site of CHRISTIAN_PLATFORMS.music) {
    if (urlLower.includes(site)) {
      return 'WORSHIP_MUSIC'
    }
  }

  // Podcasts
  if (urlLower.includes('podcast') || platform?.toLowerCase().includes('podcast')) {
    return 'PODCAST'
  }

  // Video/Sermons
  if (urlLower.includes('youtube') || urlLower.includes('video') || urlLower.includes('watch')) {
    return 'SERMON'
  }

  // Devotionals
  for (const site of CHRISTIAN_PLATFORMS.devotionals) {
    if (urlLower.includes(site)) {
      return 'DEVOTIONAL'
    }
  }

  return 'OTHER'
}

/**
 * Tracks a content activity
 */
export async function trackActivity(
  activity: Omit<ContentActivity, 'id' | 'timestamp'>
): Promise<ContentActivity> {
  const fullActivity: ContentActivity = {
    ...activity,
    id: crypto.randomUUID(),
    timestamp: new Date()
  }

  // Send to API
  try {
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullActivity)
    })

    if (!response.ok) {
      throw new Error('Failed to track activity')
    }

    return fullActivity
  } catch (error) {
    console.error('Error tracking activity:', error)
    // Store locally for later sync
    storeActivityLocally(fullActivity)
    return fullActivity
  }
}

/**
 * Stores activity locally for offline support
 */
function storeActivityLocally(activity: ContentActivity): void {
  try {
    const stored = localStorage.getItem('pending_activities')
    const activities: ContentActivity[] = stored ? JSON.parse(stored) : []
    activities.push(activity)
    localStorage.setItem('pending_activities', JSON.stringify(activities))
  } catch (error) {
    console.error('Error storing activity locally:', error)
  }
}

/**
 * Syncs pending local activities to the server
 */
export async function syncPendingActivities(): Promise<void> {
  try {
    const stored = localStorage.getItem('pending_activities')
    if (!stored) return

    const activities: ContentActivity[] = JSON.parse(stored)
    if (activities.length === 0) return

    // Send all pending activities
    const response = await fetch('/api/activities/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities })
    })

    if (response.ok) {
      localStorage.removeItem('pending_activities')
    }
  } catch (error) {
    console.error('Error syncing activities:', error)
  }
}

/**
 * Gets time spent with Christ for a given period
 */
export async function getTimeWithChrist(
  userId: string,
  period: 'today' | 'week' | 'month' | 'all'
): Promise<{
  totalMinutes: number
  breakdown: Record<ContentType, number>
  activities: ContentActivity[]
}> {
  try {
    const response = await fetch(`/api/activities?userId=${userId}&timeframe=${period}`)
    const data = await response.json()

    return {
      totalMinutes: data.summary?.totalMinutes || 0,
      breakdown: data.breakdown || {},
      activities: data.activities || []
    }
  } catch (error) {
    console.error('Error fetching time with Christ:', error)
    return {
      totalMinutes: 0,
      breakdown: {} as Record<ContentType, number>,
      activities: []
    }
  }
}

/**
 * Message interface for browser extension communication
 */
export interface ExtensionMessage {
  type: 'TRACK_ACTIVITY' | 'GET_STATUS' | 'SYNC_ACTIVITIES'
  payload?: unknown
}

/**
 * Handles messages from the browser extension
 */
export function handleExtensionMessage(message: ExtensionMessage): void {
  switch (message.type) {
    case 'TRACK_ACTIVITY':
      trackActivity(message.payload as Omit<ContentActivity, 'id' | 'timestamp'>)
      break
    case 'SYNC_ACTIVITIES':
      syncPendingActivities()
      break
    default:
      console.log('Unknown extension message type:', message.type)
  }
}
