import { NextRequest, NextResponse } from 'next/server'

// GET /api/stats/kingdom - Get global Kingdom of God statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || 'all'

    // In production, aggregate from database
    // const stats = await prisma.globalStats.findFirst({
    //   orderBy: { date: 'desc' }
    // })

    // Mock data representing global Christian impact
    const globalStats = {
      totalUsers: 1247892,
      newUsersToday: 3421,
      totalPrayers: 45678234,
      prayersToday: 234567,
      totalForgiveness: 8945123,
      forgivenessToday: 45678,
      totalEncouragements: 12345678,
      encouragementsToday: 67890,
      totalTimeWithChrist: 987654321, // minutes
      timeWithChristToday: 1234567,
      totalResourcesShared: 2345678,
      resourcesSharedToday: 8567,
      totalLivesFed: 456789,
      livesFedToday: 1234,
      totalShelterProvided: 89234,
      shelterProvidedToday: 234,
      totalClothingGiven: 234567,
      clothingGivenToday: 567
    }

    const countryStats = [
      { country: 'United States', userCount: 420000, prayerCount: 12500000 },
      { country: 'Nigeria', userCount: 180000, prayerCount: 8900000 },
      { country: 'Brazil', userCount: 156000, prayerCount: 7200000 },
      { country: 'Philippines', userCount: 134000, prayerCount: 6800000 },
      { country: 'South Korea', userCount: 98000, prayerCount: 4500000 },
      { country: 'Kenya', userCount: 87000, prayerCount: 3900000 },
      { country: 'Mexico', userCount: 76000, prayerCount: 3200000 },
      { country: 'India', userCount: 65000, prayerCount: 2800000 }
    ]

    return NextResponse.json({
      success: true,
      globalStats,
      countryStats,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching kingdom stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch kingdom statistics' },
      { status: 500 }
    )
  }
}
