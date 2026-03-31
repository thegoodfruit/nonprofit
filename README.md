# The Living Bread

> "I am the living bread that came down from heaven. Whoever eats this bread will live forever." — John 6:51

A platform bringing together all who believe in the name and power of Jesus Christ, in fellowship with one another, to love and share resources freely — building the Kingdom of God together.

## Vision

In a world that is increasingly becoming more divided, The Living Bread aims to gather people from all walks of life and every corner of the world who believe in the name and power of Jesus Christ—collectively known as "the Children of God"—to serve one another by freely offering what they have: gifts, talents, services, food, clothing, shelter, and other resources.

This exchange is facilitated through fellow brothers and sisters who also believe in the name and power of Christ, and all others who seek to come, experience, and build a relationship with Christ, culminating in the creation of the Kingdom of God—one in which Christ is glorified by the faith demonstrated in His name which is revealed through their love for one another for all the world to see.

## Core Features

### Time with Christ Tracking
Track all spiritual activity across mobile or desktop:
- **Reading**: Bible apps, online scripture, devotionals
- **Watching**: Sermons, Christian videos, teachings
- **Listening**: Worship music, podcasts, audiobooks
- **Engaging**: Sharing, liking, commenting on Christian content

See "How much time you've spent with Christ today" with daily, weekly, and monthly breakdowns.

### Social Impact Dashboard
Personal dashboard showing your acts of love:
- Prayers offered
- Forgiveness given
- Encouragements sent
- Resources shared (food, shelter, clothing)
- Lives touched

### Kingdom of God Dashboard
Global aggregation showing Christians helping Christians:
- Real-time map of believers helping believers worldwide
- Country-by-country impact statistics
- Collective acts of service tracked
- Live activity feed

### Community Feed
- Share testimonies
- Request prayers
- Post praise reports
- Encourage one another
- Ask questions and receive wisdom

### Resource Sharing
Ask for or offer:
- Food
- Shelter
- Clothing
- Transportation
- Medical assistance
- Childcare
- Education
- Employment opportunities

### Immanuel AI Assistant
An AI companion named Immanuel ("God with us") to:
- Explore Scripture
- Deepen prayer life
- Find encouragement in God's Word
- Answer faith-based questions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Database**: PostgreSQL with Prisma ORM
- **Maps**: Leaflet/React-Leaflet
- **Charts**: Chart.js
- **UI Components**: Radix UI

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/thegoodfruit/nonprofit.git
cd nonprofit

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Set up the database
npm run db:generate
npm run db:push

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/living_bread"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   ├── community/         # Community feed
│   │   ├── dashboard/         # Personal dashboards
│   │   ├── immanuel/          # AI assistant
│   │   ├── kingdom/           # Kingdom dashboard
│   │   ├── resources/         # Resource sharing
│   │   └── join/              # Onboarding
│   ├── components/            # React components
│   │   ├── community/
│   │   ├── dashboard/
│   │   ├── kingdom/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/                   # Utilities
│   └── stores/                # Zustand stores
├── browser-extension/          # Chrome extension for tracking
├── prisma/                    # Database schema
└── public/                    # Static assets
```

## Browser Extension

The Living Bread includes a browser extension to track Christian content engagement:

1. Navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `browser-extension` folder

The extension automatically detects and tracks time spent on:
- Bible reading websites (Bible.com, BibleGateway, etc.)
- Sermon videos (YouTube with Christian content)
- Worship music (Spotify, Apple Music, etc.)
- Christian podcasts
- Devotional websites

## Guiding Scripture

> "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me." — Matthew 25:40

> "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another." — John 13:34-35

> "And behold, I am with you always, to the end of the age." — Matthew 28:20

## Future Roadmap

- [ ] Membership cards with benefits
- [ ] Christian business discounts
- [ ] Job board for believers
- [ ] Insurance programs
- [ ] Shared real estate/housing
- [ ] Devotional challenges
- [ ] Deep reflection exercises
- [ ] Church connection features
- [ ] Sermon listening within app
- [ ] Music integration
- [ ] Political advocacy coordination
- [ ] Global missions support
- [ ] Persecution protection initiatives

## Contributing

This is an open-source project driven by volunteers who freely give of themselves. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Philosophy

The beauty of this platform is that it focuses solely on the spiritual. Just as no one knows Matthew's favorite color, Luke's favorite meal, or what John's parents did as a hobby, this platform is not about personal details—it is about one's relationship with Christ, glorifying Him, and calling others to know Him.

Here, every person has the opportunity to create significant value for the Kingdom of God by forgiving others, praying for them, offering encouragement, and using their God-given gifts and talents. All are truly called.

Since Christ is spirit, there is zero relationship or connection with one's religious identity in one's ability to call upon His Name, thus there is absolutely no discrimination in whether one belongs to any other group, so long as one recognizes the name and power of Christ.

## License

This project is open-source and available under the MIT License.

---

*The Living Bread — Building the Kingdom of God, One Act of Love at a Time*
