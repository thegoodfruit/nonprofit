import { NextRequest, NextResponse } from 'next/server'

// POST /api/activities - Log a content activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      userId,
      contentType,
      activityType,
      title,
      source,
      platform,
      durationMinutes,
      deviceType
    } = body

    // In production, this would save to the database using Prisma
    const activity = {
      id: crypto.randomUUID(),
      userId,
      contentType,
      activityType,
      title,
      source,
      platform,
      durationMinutes: durationMinutes || 0,
      deviceType,
      timestamp: new Date().toISOString()
    }

    // TODO: In production, save to database
    // await prisma.contentActivity.create({ data: activity })

    return NextResponse.json({
      success: true,
      activity,
      message: 'Activity logged successfully'
    })
  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log activity' },
      { status: 500 }
    )
  }
}

// GET /api/activities - Get activities for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const timeframe = searchParams.get('timeframe') || 'week'

    // In production, this would fetch from the database
    // const activities = await prisma.contentActivity.findMany({
    //   where: { userId },
    //   orderBy: { timestamp: 'desc' }
    // })

    // Mock data for demonstration
    const mockActivities = [
      {
        id: '1',
        userId,
        contentType: 'BIBLE_READING',
        activityType: 'READ',
        title: 'John 3:16-21',
        source: 'Bible App',
        durationMinutes: 15,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: '2',
        userId,
        contentType: 'SERMON',
        activityType: 'WATCH',
        title: 'Finding Peace in Troubled Times',
        source: 'YouTube',
        durationMinutes: 25,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      }
    ]

    // Calculate summary
    const totalMinutes = mockActivities.reduce((acc, a) => acc + a.durationMinutes, 0)

    return NextResponse.json({
      success: true,
      activities: mockActivities,
      summary: {
        totalMinutes,
        activityCount: mockActivities.length,
        timeframe
      }
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
