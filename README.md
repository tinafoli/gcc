# Ghana Code Club Website

A modern, responsive website for Ghana Code Club - a STEM education organization focused on developing coding, digital literacy, and artificial intelligence competencies among children, young people, and educators in Ghana.

## 🚀 Features

- **Responsive Design**: Fully responsive website that works seamlessly on mobile, tablet, and desktop devices
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Contact Forms**: Multiple contact forms with email notifications (Contact, Partnership, Team Application)
- **Newsletter Subscription**: Integrated with Brevo (formerly Sendinblue) for newsletter management
- **Blog System**: Dynamic blog with rich content management
- **Program Showcase**: Interactive program cards with infinite scrolling carousel
- **Statistics Display**: Animated statistics counters using React CountUp
- **Social Media Integration**: Embedded social media feeds
- **HTTPS Enforcement**: Built-in security with automatic HTTPS redirection
- **SEO Optimized**: Meta tags, sitemap, and robots.txt for better search engine visibility

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Services**: 
  - [Resend](https://resend.com/) - For contact forms and notifications
  - [Brevo](https://www.brevo.com/) (formerly Sendinblue) - For newsletter subscriptions
- **UI Components**: 
  - Radix UI
  - Heroicons
  - React Icons
- **Carousels**: 
  - Swiper.js
  - Embla Carousel
- **Deployment**: Google Cloud App Engine

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tinafoli/gcc.git
   cd gcc
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   BREVO_API_KEY=your_brevo_api_key_here
   ```

   > **Note**: For production deployment on Google Cloud App Engine, add these variables to `app.yaml`. See `app.yaml.example` for reference.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server on HTTP (port 3000)
- `npm run dev:https` - Start development server with HTTPS (port 3001)
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run generate-certs` - Generate SSL certificates for local HTTPS development

## 📁 Project Structure

```
ghana-code-club/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   ├── reports/           # PDF reports
│   └── ...
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   │   ├── contact/
│   │   │   ├── newsletter/
│   │   │   ├── partnership/
│   │   │   └── team-application/
│   │   ├── about/        # About page
│   │   ├── blog/         # Blog pages
│   │   ├── contact/      # Contact page
│   │   ├── donate/       # Donate page
│   │   ├── partners/     # Partners page
│   │   ├── programs/     # Program pages
│   │   └── ...
│   ├── components/        # React components
│   │   ├── PartnershipModal.tsx
│   │   ├── JoinTeamModal.tsx
│   │   ├── ProgramCards.tsx
│   │   ├── HeroCarousel.tsx
│   │   └── ...
│   ├── context/          # React contexts
│   ├── lib/              # Utility libraries
│   └── types/            # TypeScript type definitions
├── docs/                 # Documentation
│   └── HTTPS_ENFORCEMENT.md
├── app.yaml.example      # Google Cloud App Engine config template
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🔌 API Endpoints

### Contact Form
- **Endpoint**: `POST /api/contact`
- **Description**: Handles contact form submissions
- **Required Fields**: `name`, `email`, `subject`, `message`
- **Email Service**: Resend

### Newsletter Subscription
- **Endpoint**: `POST /api/newsletter`
- **Description**: Subscribes users to the newsletter
- **Required Fields**: `email`
- **Email Service**: Brevo (Sendinblue)

### Partnership Inquiry
- **Endpoint**: `POST /api/partnership`
- **Description**: Handles partnership form submissions
- **Required Fields**: `name`, `email`, `phone`, `organization`, `partnershipType`, `message`
- **Optional Fields**: `website`, `interests`
- **Email Service**: Resend
- **Features**: Sends confirmation email to submitter

### Team Application
- **Endpoint**: `POST /api/team-application`
- **Description**: Handles team application form submissions
- **Required Fields**: `name`, `email`, `phone`, `role`, `experience`, `motivation`
- **Optional Fields**: `resume`
- **Email Service**: Resend
- **Features**: Sends confirmation email to applicant

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | API key for Resend email service | Yes | - |
| `BREVO_API_KEY` | API key for Brevo newsletter service | Yes | - |

### Getting API Keys

1. **Resend API Key**:
   - Sign up at [resend.com](https://resend.com)
   - Navigate to API Keys section
   - Create a new API key
   - Copy and add to `.env.local`

2. **Brevo API Key**:
   - Sign up at [brevo.com](https://www.brevo.com)
   - Go to Settings > API Keys
   - Create a new API key
   - Copy and add to `.env.local`

## 🚢 Deployment

### Google Cloud App Engine

1. **Install Google Cloud SDK**
   ```bash
   # Follow instructions at: https://cloud.google.com/sdk/docs/install
   ```

2. **Create app.yaml**
   ```bash
   cp app.yaml.example app.yaml
   ```
   Then edit `app.yaml` and add your API keys to `env_variables`.

3. **Deploy**
   ```bash
   gcloud app deploy
   ```

> **Important**: Never commit `app.yaml` with real API keys. It should be in `.gitignore`. Use `app.yaml.example` as a template.

### Other Deployment Options

The application can also be deployed to:
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Another great option for static sites
- **AWS**: Using AWS Amplify or Elastic Beanstalk
- **DigitalOcean**: Using App Platform

## 🔒 Security Features

- **HTTPS Enforcement**: Automatic HTTP to HTTPS redirection
- **Input Sanitization**: All form inputs are sanitized to prevent XSS attacks
- **Rate Limiting**: API routes include rate limiting to prevent abuse
- **Content Security Policy**: CSP headers configured for enhanced security
- **Environment Variables**: Sensitive data stored in environment variables

See [docs/HTTPS_ENFORCEMENT.md](docs/HTTPS_ENFORCEMENT.md) for more details on HTTPS implementation.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Mobile-optimized navigation menu
- Responsive program cards slider (one card on mobile, multiple on desktop)
- Adaptive image sizes
- Touch-friendly interactive elements

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Fonts

The project uses Google Fonts (Delius). To change fonts, update:
- `src/lib/fonts.ts` for font definitions
- `tailwind.config.ts` for font family configuration

## 🧪 Testing

Currently, the project doesn't include automated tests. To add testing:

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. Create test files following the `*.test.tsx` or `*.spec.tsx` naming convention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Ghana Code Club.

## 📞 Contact

For questions or support, contact:
- **Email**: codeclubghana@gmail.com
- **Website**: [ghanacodeclub.org](https://ghanacodeclub.org)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All contributors and supporters of Ghana Code Club
- The open-source community for the excellent tools and libraries

---

**Built with ❤️ for Ghana Code Club**
