import { NextRequest, NextResponse } from 'next/server'

// POST /api/resources - Create a resource offer or request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      userId,
      type, // 'offer' or 'request'
      category,
      title,
      description,
      country,
      region,
      city,
      urgency
    } = body

    if (type === 'offer') {
      const offer = {
        id: crypto.randomUUID(),
        userId,
        category,
        title,
        description,
        country,
        region,
        city,
        isAvailable: true,
        timesFulfilled: 0,
        createdAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        resource: offer,
        message: 'Your resource offer has been posted. Thank you for your generosity!'
      })
    } else {
      const request = {
        id: crypto.randomUUID(),
        userId,
        category,
        title,
        description,
        country,
        region,
        city,
        urgency: urgency || 'normal',
        status: 'OPEN',
        createdAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        resource: request,
        message: 'Your request has been posted. The community will be notified.'
      })
    }
  } catch (error) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}

// GET /api/resources - Get resources
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'offer'
    const category = searchParams.get('category')
    const country = searchParams.get('country')

    // Mock data - in production, fetch from database
    const resources = type === 'offer' ? [
      {
        id: '1',
        category: 'FOOD',
        title: 'Weekly Meal Packages',
        description: 'Offering weekly meal packages for families in need.',
        country: 'United States',
        city: 'Houston, TX',
        isAvailable: true,
        timesFulfilled: 23
      }
    ] : [
      {
        id: '1',
        category: 'SHELTER',
        title: 'Family Needs Temporary Housing',
        description: 'Family of 4 relocating for work.',
        country: 'United States',
        city: 'Phoenix, AZ',
        urgency: 'high',
        status: 'OPEN'
      }
    ]

    return NextResponse.json({
      success: true,
      resources,
      total: resources.length
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
