Vercel Deployment: [https://bpdb-prepaid-meter-website.vercel.app/]

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Recent Changes

### April 7, 2025 - Video Tutorial Feature

Added new features to improve user experience:

- **Interactive Payment Tutorial**: Added a modal video tutorial feature to the bKash payment logo in the VendingOptionComponent
- **Enhanced UI**: Implemented hover effects and visual indicators on payment logos
- **Video Modal**: Created a custom video modal component that embeds Google Drive videos
- **Client-side Translation**: Implemented client-side translation handling for the VendingOptionComponent
- **Performance Improvements**: Optimized client components with proper dynamic imports

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

### Key Components

- `VendingOptionComponent`: Displays payment partner logos with interactive elements
- `VideoModal`: Reusable modal component for displaying videos with proper styling
- `HeroSection`: Main hero section of the homepage
- `AboutComponent`: Information about the prepaid metering system
- `FAQAccordion`: Frequently asked questions in an accordion format

## Translation System

The application supports both English and Bengali languages. Translation is handled through:

- Server-side translations for most components
- Client-side translations for interactive components
- Locale is passed through URL parameters

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
