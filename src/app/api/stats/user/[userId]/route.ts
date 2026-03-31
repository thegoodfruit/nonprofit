import { NextRequest, NextResponse } from 'next/server'

// GET /api/stats/user/[userId] - Get user's personal impact statistics
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || 'all'

    // In production, fetch from database
    // const profile = await prisma.profile.findUnique({
    //   where: { userId }
    // })

    // Mock user stats
    const userStats = {
      userId,
      totalPrayers: 156,
      totalForgiveness: 23,
      totalEncouragements: 89,
      totalTimeWithChrist: 4560, // minutes (76 hours)
      totalContentShared: 45,
      totalResourcesGiven: 8,
      totalResourcesReceived: 2,
      totalLivesFed: 45,
      totalShelterGiven: 8,
      totalClothingGiven: 34,
      currentStreak: 14,
      longestStreak: 21,
      lastActiveDate: new Date().toISOString()
    }

    // Time breakdown by content type
    const contentBreakdown = {
      BIBLE_READING: 1200,
      SERMON: 950,
      WORSHIP_MUSIC: 850,
      DEVOTIONAL: 650,
      PODCAST: 450,
      OTHER: 460
    }

    // Weekly activity
    const weeklyActivity = [
      { day: 'Mon', minutes: 45, activities: 3 },
      { day: 'Tue', minutes: 62, activities: 4 },
      { day: 'Wed', minutes: 30, activities: 2 },
      { day: 'Thu', minutes: 55, activities: 3 },
      { day: 'Fri', minutes: 48, activities: 4 },
      { day: 'Sat', minutes: 75, activities: 5 },
      { day: 'Sun', minutes: 47, activities: 3 }
    ]

    return NextResponse.json({
      success: true,
      userStats,
      contentBreakdown,
      weeklyActivity,
      timeframe
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user statistics' },
      { status: 500 }
    )
  }
}
