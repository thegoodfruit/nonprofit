import { NextRequest, NextResponse } from 'next/server'

// POST /api/activities/manual - Log a manual entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      userId,
      category,
      description,
      durationMinutes,
      scriptureRef
    } = body

    // Validate required fields
    if (!userId || !category || !durationMinutes) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, this would save to the database
    const entry = {
      id: crypto.randomUUID(),
      userId,
      category,
      description,
      durationMinutes,
      scriptureRef,
      timestamp: new Date().toISOString()
    }

    // TODO: In production, save to database
    // await prisma.manualEntry.create({ data: entry })

    // Update user profile stats
    // await prisma.profile.update({
    //   where: { userId },
    //   data: { totalTimeWithChrist: { increment: durationMinutes } }
    // })

    return NextResponse.json({
      success: true,
      entry,
      message: 'Activity logged successfully. Your time with Christ has been recorded.'
    })
  } catch (error) {
    console.error('Error logging manual entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log activity' },
      { status: 500 }
    )
  }
}
