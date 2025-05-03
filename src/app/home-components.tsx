import dynamic from 'next/dynamic';

export const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"), {
  loading: () => <div className="h-[85vh] bg-gray-100 animate-pulse" />
});

export const StatisticItem = dynamic(() => import("@/components/StatisticItem"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />
});

export const ClientPromoModal = dynamic(() => import("@/components/ClientPromoModal"), {
  loading: () => null
});

export const ProgramCards = dynamic(() => import("@/components/ProgramCards"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

export const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

export const SocialMediaFeeds = dynamic(() => import("@/components/SocialMediaFeeds"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

export const TechnologyStack = dynamic(() => import('@/components/TechnologyStack'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

export const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

export const BlogPreview = dynamic(() => import('@/components/BlogPreview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
}); 