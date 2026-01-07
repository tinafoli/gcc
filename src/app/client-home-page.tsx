'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from './blog/types';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Script from 'next/script';
import { 
  HeroCarousel,
  StatisticItem,
  ProgramCards,
  FAQ,
  SocialMediaFeeds,
  TechnologyStack,
  Testimonials,
  BlogPreview
} from '@/app/home-components';
import ClientPromoModal from '@/components/ClientPromoModal';

interface ClientHomePageProps {
  blogPosts: BlogPost[];
}

export default function ClientHomePage({ blogPosts }: ClientHomePageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ghana Code Club',
    description: 'Empowering Ghana\'s youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.',
    url: 'https://ghanacode.club',
    logo: 'https://ghanacode.club/images/gcc-logo.png',
    sameAs: [
      'https://twitter.com/ghanacodeclub',
      'https://facebook.com/ghanacodeclub',
      'https://www.instagram.com/officialghanacodeclub'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GH',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      streetAddress: 'Hopper Dean AI Center'
    },
    location: {
      '@type': 'Place',
      name: 'Hopper Dean AI Center',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GH',
        addressLocality: 'Accra',
        addressRegion: 'Greater Accra'
      }
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'tinaappiah@ghanacodeclub.org',
      telephone: '+233 244 670 660'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ghana Code Club Programs',
      itemListElement: [
        {
          '@type': 'Course',
          name: 'Kids Coding Program',
          description: 'Interactive coding classes for children aged 5-17, teaching fundamental programming concepts through hands-on projects.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Ghana Code Club'
          },
          educationalLevel: 'Beginner to Intermediate',
          timeRequired: 'P12W',
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
            audienceType: 'Children aged 5-17'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: '0',
            priceCurrency: 'GHS'
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'mixed',
            location: {
              '@type': 'Place',
              name: 'Multiple Locations Across Ghana'
            }
          }
        },
        {
          '@type': 'Course',
          name: 'Teacher Training Program',
          description: 'Comprehensive training for educators to effectively teach coding and digital skills in their schools.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Ghana Code Club'
          },
          educationalLevel: 'Professional Development',
          timeRequired: 'P8W',
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'teacher',
            audienceType: 'School Teachers'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: '0',
            priceCurrency: 'GHS'
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'mixed',
            location: {
              '@type': 'Place',
              name: 'Multiple Locations Across Ghana'
            }
          }
        },
        {
          '@type': 'Course',
          name: 'AI & Robotics Program',
          description: 'Advanced program focusing on artificial intelligence and robotics, including hands-on experience with programming robots.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Ghana Code Club'
          },
          educationalLevel: 'Intermediate to Advanced',
          timeRequired: 'P16W',
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
            audienceType: 'Students aged 12-17'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: '0',
            priceCurrency: 'GHS'
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'mixed',
            location: {
              '@type': 'Place',
              name: 'Hopper Dean AI Center'
            }
          }
        },
        {
          '@type': 'Course',
          name: 'Community Tech Hub',
          description: 'Open access to technology resources and mentorship for community members interested in learning digital skills.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Ghana Code Club'
          },
          educationalLevel: 'All Levels',
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
            audienceType: 'Community Members'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: '0',
            priceCurrency: 'GHS'
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'mixed',
            location: {
              '@type': 'Place',
              name: 'Multiple Locations Across Ghana'
            }
          }
        }
      ]
    },
    accreditation: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Digital Skills Training',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Ghana Education Service'
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Script id="home-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      {/* <ClientPromoModal /> */}
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
        {/* Decorative SVGs */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-10">
          {/* Top left decorative element */}
          <div className="absolute top-10 left-[10%] text-6xl text-red-500 transform -rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          
          {/* Top right decorative element */}
          <div className="absolute top-1/3 right-[15%] text-5xl text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          
          {/* Bottom left decorative element */}
          <div className="absolute bottom-[20%] left-[15%] text-6xl text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          
          {/* Bottom right decorative element */}
          <div className="absolute bottom-[30%] right-[10%] text-5xl text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Center decorative element */}
          <div className="absolute top-[40%] right-[5%] text-6xl text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Delius'] relative inline-block">
              Our Impact in Numbers
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in our mission to empower the next generation of tech innovators in Ghana
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                end: 131000,
                label: "KIDS TRAINED",
                description: "Empowering young minds with coding skills",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
                ),
                color: "red"
              },
              {
                end: 7000,
                label: "TEACHERS TRAINED",
                description: "Equipping educators with digital skills",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                </svg>
                ),
                color: "blue"
              },
              {
                end: 324,
                label: "MENTORS VOLUNTEERED",
                description: "Dedicated professionals guiding our students",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                ),
                color: "green"
              },
              {
                end: 22,
                label: "DIGITAL LEARNING CENTERS",
                description: "Expanding our reach across Ghana",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                ),
                color: "purple"
              },
              {
                end: 30000,
                label: "GIRLS TRAINED THROUGH 100 GIRLS IN STEM",
                description: "Empowering girls in technology",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                ),
                color: "pink"
              },
              {
                end: 100,
                label: "WOMEN / ADULTS TRAINED",
                description: "Building tech skills for adults",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.059 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                ),
                color: "indigo"
              },
              {
                end: 8,
                label: "REGIONS COVERED",
                description: "Making coding education accessible nationwide",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                ),
                color: "yellow"
              },
              {
                end: 10,
                label: "YEARS OF IMPACT",
                description: "Building a brighter future through code",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "indigo"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group perspective-1000`}
              >
                {/* Decorative Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-${stat.color}-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}-50 opacity-10 transform rotate-45 translate-x-8 -translate-y-8`} />
                
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 mx-auto relative">
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-${stat.color}-50`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  />
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`relative group-hover:shadow-lg group-hover:shadow-${stat.color}-200 transition-shadow duration-300`}>
                      {stat.icon}
                    </div>
                  </motion.div>
                </div>
                
            <StatisticItem 
                  end={stat.end} 
                  label={stat.label} 
                  description={stat.description}
                />
                
                {/* Progress Bar */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background Icons */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-5">
          {/* Code Brackets */}
          <div className="absolute top-10 left-[10%] text-4xl text-gray-900 transform -rotate-12">
            &lt;/&gt;
          </div>
          {/* Terminal Icon */}
          <div className="absolute top-1/3 right-[15%] text-gray-900">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {/* Code Icon */}
          <div className="absolute bottom-[20%] left-[15%] text-gray-900">
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          {/* Brain Icon */}
          <div className="absolute bottom-[30%] right-[10%] text-gray-900">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          {/* Lightbulb Icon */}
          <div className="absolute top-[40%] right-[5%] text-gray-900">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          {/* Binary Code */}
          <div className="absolute top-1/2 left-[5%] text-2xl text-gray-900 transform -rotate-90 opacity-30">
            10110101
          </div>
          {/* Function Icon */}
          <div className="absolute bottom-[15%] right-[20%] text-4xl text-gray-900 transform rotate-6">
            ƒ(x)
          </div>
        </div>

        <div className="w-[80%] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Delius'] text-gray-900">Transforming Lives Through Code</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Discover our comprehensive programs designed to build digital skills and create opportunities for Ghana's youth</p>
          </div>
          <ProgramCards />
          <div className="flex justify-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              View All Programs
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Technology Stack Section */}
      <TechnologyStack />

      {/* Why Our Community Loves Us Section */}
      <Testimonials />

      {/* Latest from Our Blog Section */}
      <BlogPreview posts={blogPosts} />

      {/* Connect With Us Section */}
      <SocialMediaFeeds />

      {/* Frequently Asked Questions Section */}
      <FAQ />
    </div>
  );
} 