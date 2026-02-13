'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgramImage from '@/components/ProgramImage';
import { Delius } from 'next/font/google';
import Script from 'next/script';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Program categories and their programs
const programCategories = [
  {
    id: 'kids-youth',
    title: 'Kids and Youth Programs',
    description: 'Our programs are specially designed for children and young people, focusing on building foundational skills in coding and artificial intelligence (AI) while nurturing a passion for technology from an early age.',
    programs: [
      {
        id: '100-girls-in-stem',
        title: '100 Girls in STEM',
        description: 'A flagship initiative aimed at empowering young girls with coding skills and technology knowledge. This program focuses on bridging the gender gap in tech by providing specialized training, mentorship, and opportunities for girls aged 10-17.',
        features: [
          'Weekly coding sessions with female mentors',
          'Project-based learning with real-world applications',
          'Tech industry exposure and networking opportunities',
          'Leadership development workshops',
          'Annual showcase of projects'
        ],
        image: '/images/girls-in-tech.jpg',
        link: '/programs/100-girls-in-stem'
      },
      {
        id: 'saturday-coding-school',
        title: 'Saturday Coding School',
        description: 'A weekly program that provides structured coding education for children aged 5-17. Students learn programming fundamentals through interactive activities, games, and hands-on projects in a fun, supportive environment.',
        features: [
          'Age-appropriate curriculum for different skill levels',
          'Small group sessions with personalized attention',
          'Progress tracking and regular feedback',
          'Parent-teacher conferences to discuss development',
          'Certificate upon completion'
        ],
        image: '/images/saturday-school.jpg',
        link: '/programs/saturday-coding-school'
      },
      {
        id: 'summer-code-camp',
        title: 'Summer Code Camp',
        description: 'An intensive eight-week program during school holidays that immerses students in coding and technology. Participants work on real projects, learn from industry experts, and develop both technical and soft skills.',
        features: [
          'Daily coding sessions and workshops',
          'Guest speakers from tech industry',
          'Team projects and hackathons',
          'Field trips to tech companies',
          'Final project presentation to parents and mentors'
        ],
        image: '/images/summer-camp.jpg',
        link: '/programs/summer-code-camp'
      }
    ]
  },
  {
    id: 'school-programs',
    title: 'School Programs',
    description: 'Collaborative programs with schools to integrate computer science education into the curriculum, ensuring students receive quality tech education as part of their formal schooling.',
    programs: [
      {
        id: 'after-school-code-clubs',
        title: 'After School Code Clubs',
        description: 'A structured program that runs after regular school hours, providing students with additional coding education in a relaxed, extracurricular setting. This program helps reinforce classroom learning and allows students to explore coding at their own pace.',
        features: [
          'Flexible scheduling to accommodate school hours',
          'Curriculum aligned with school standards',
          'Experienced instructors with teaching backgrounds',
          'Regular progress reports to parents and teachers',
          'Opportunities for school competitions and showcases'
        ],
        image: '/images/code-club.jpg',
        link: '/programs/after-school-code-clubs'
      },
      {
        id: 'coolest-projects',
        title: 'Coolest Projects Ghana',
        description: 'A comprehensive program that brings coding education directly into the classroom during school hours. Our instructors work alongside teachers to deliver high-quality computer science education as part of the regular curriculum.',
        features: [
          'Curriculum integration with existing subjects',
          'Professional development for teachers',
          'Regular assessment and evaluation',
          'Access to online learning resources',
          'School-wide coding events and competitions'
        ],
        image: '/images/coolest-projects.jpg',
        link: '/programs/coolest-projects'
      },
      {
        id: 'digital-village',
        title: 'Digital Village Program',
        description: 'A community-based initiative that brings coding education to underserved areas through mobile labs and community centers. This program aims to make technology education accessible to all children, regardless of their location or background.',
        features: [
          'Mobile computer labs that travel to different communities',
          'Community-based learning centers',
          'Partnerships with local organizations',
          'Parent and community engagement programs',
          'Focus on practical applications relevant to local context'
        ],
        image: '/images/digital-village.jpg',
        link: '/programs/digital-village'
      }
    ]
  },
  {
    id: 'professional-programs',
    title: 'Professional Programs',
    description: 'Advanced programs designed for adults, teachers, and professionals who want to enhance their technical skills or learn how to teach coding to others.',
    programs: [
      {
        id: 'teacher-training',
        title: 'Teacher Training',
        description: 'A specialized program that equips educators with the knowledge and skills to teach coding effectively. Participants learn both coding fundamentals and pedagogical approaches for teaching computer science to students of different ages and abilities.',
        features: [
          'Comprehensive coding curriculum training',
          'Teaching methodologies for different age groups',
          'Classroom management techniques',
          'Assessment and evaluation strategies',
          'Ongoing support and mentorship'
        ],
        image: '/images/teacher-training.jpg',
        link: '/programs/teacher-training'
      },
      {
        id: 'adults-in-tech',
        title: 'Adults in Tech',
        description: 'A program designed for adults who want to transition into tech careers or enhance their digital skills. This program provides practical training in coding, web development, and other in-demand tech skills.',
        features: [
          'Flexible scheduling for working adults',
          'Industry-relevant curriculum',
          'Career counseling and job placement support',
          'Networking opportunities with tech professionals',
          'Portfolio development for job applications'
        ],
        image: '/images/adults-tech.jpg',
        link: '/programs/adults-tech'
      },
      {
        id: 'alumni-mentorship',
        title: 'Alumni Mentorship Program',
        description: 'A one-on-one mentoring program that pairs participants with experienced tech professionals. Mentees receive personalized guidance, career advice, and technical support to help them achieve their goals in technology.',
        features: [
          'Personalized mentoring plans',
          'Regular one-on-one sessions',
          'Project-based learning with mentor guidance',
          'Career development workshops',
          'Access to mentor\'s professional network'
        ],
        image: '/images/mentorship.jpg',
        link: '/programs/alumni-mentorship'
      }
    ]
  }
];

export default function ClientProgramsPage() {
  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ghana Code Club Programs",
    "description": "Explore our comprehensive range of coding and technology education programs designed for students of all ages in Ghana.",
    "url": "https://ghanacodeclub.org/programs",
    "numberOfItems": programCategories.reduce((total, category) => total + category.programs.length, 0),
    "itemListElement": programCategories.flatMap((category, categoryIndex) => 
      category.programs.map((program, programIndex) => ({
        "@type": "ListItem",
        "position": categoryIndex * 100 + programIndex + 1,
        "item": {
          "@type": "Course",
          "name": program.title,
          "description": program.description,
          "url": `https://ghanacodeclub.org${program.link}`,
          "provider": {
            "@type": "Organization",
            "name": "Ghana Code Club",
            "url": "https://ghanacodeclub.org"
          },
          "image": `https://ghanacodeclub.org${program.image}`
        }
      }))
    )
  };

  return (
    <>
      <Script
        id="programs-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero/slide1.jpg"
              alt="Programs Background"
              fill
              className="object-cover scale-105 motion-safe:animate-subtle-zoom"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/75 to-gray-900/85"></div>
            
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"
              ></motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-1/2 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
              ></motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-0 left-1/3 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl"
              ></motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Decorative Element */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm rounded-2xl mb-8 rotate-12 flex items-center justify-center relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-red-400/30"
                ></motion.div>
                <svg className="w-10 h-10 text-white -rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-['Delius'] leading-tight relative inline-block">
                  Our Programs
                  <div className="absolute -bottom-2 left-0 w-full h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-500 to-red-500"></div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 via-white to-red-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <motion.div
                    className="absolute -right-4 -top-4 w-8 h-8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="absolute inset-0 animate-ping-slow">
                      <div className="w-2 h-2 bg-red-500 rounded-full transform rotate-45"></div>
                    </div>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
              >
                Discover our comprehensive range of programs designed to build digital skills and create opportunities for Ghana's youth.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <motion.button 
                  onClick={() => {
                    const element = document.getElementById('programs-in-action');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10"> Currently Running Programs</span>
                  <motion.svg 
                    className="w-5 h-5 ml-2 relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.button>
                <motion.a 
                  href="/contact#contact-form" 
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-lg font-semibold border border-white/10 hover:border-white/25 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10">Contact Us</span>
                  <motion.svg 
                    className="w-5 h-5 ml-2 relative z-10"
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-red-500/20 rounded-tl-3xl"
            ></motion.div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-red-500/20 rounded-br-3xl"
            ></motion.div>
          </div>
        </section>

        {/* Program Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Delius']"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Program Categories
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our programs are organized into three main categories, each targeting specific age groups and learning objectives.
              </motion.p>
            </motion.div>

            <div className="space-y-16">
              {programCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-8">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-4 font-['Delius']"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {category.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-8"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {category.description}
                    </motion.p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {category.programs.map((program, programIndex) => (
                        <motion.div
                          key={program.id}
                          initial={{ opacity: 0, y: 25, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: programIndex * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                          whileHover={{ y: -5 }}
                        >
                          <Link 
                            href={program.link}
                            className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
                          >
                            <div className="relative h-48">
                              <ProgramImage
                                src={program.image}
                                alt={program.title}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-6">
                              <h4 className={`text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors ${delius.className}`}>
                                {program.title}
                              </h4>
                              <p className="text-gray-600 mb-4 line-clamp-3">
                                {program.description}
                              </p>
                              <div className="flex items-center text-red-500 font-medium">
                                <span>Learn More</span>
                                <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Delius']"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Why Choose Our Programs?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our programs are designed with a focus on quality, accessibility, and real-world application.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  bgColor: "bg-red-100",
                  title: "Innovative Curriculum",
                  description: "Our curriculum is constantly evolving to incorporate the latest technologies and teaching methodologies, ensuring students learn relevant skills for the digital age."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  bgColor: "bg-blue-100",
                  title: "Expert Instructors",
                  description: "Our instructors are experienced professionals with backgrounds in education and technology, providing students with high-quality guidance and mentorship."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  bgColor: "bg-green-100",
                  title: "Real-World Projects",
                  description: "Students work on practical projects that solve real problems, helping them develop portfolio-worthy work and gain hands-on experience."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="bg-gray-50 p-8 rounded-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-4 ${delius.className}`}>{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs in Action Section */}
        <section id="programs-in-action" className="py-16 bg-gradient-to-br from-red-50 to-white relative overflow-hidden">
          {/* Decorative SVG Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute top-0 left-0 w-32 h-32 text-red-100" viewBox="0 0 200 200" fill="none">
              <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z" fill="currentColor"/>
            </svg>
            <svg className="absolute bottom-0 right-0 w-32 h-32 text-red-100" viewBox="0 0 200 200" fill="none">
              <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z" fill="currentColor"/>
            </svg>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-red-50" viewBox="0 0 200 200" fill="none">
              <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z" fill="currentColor"/>
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-12"
            >
              <motion.div 
                className="inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center bg-red-100 text-red-600 text-sm font-bold px-4 py-1 rounded-full mb-4">
                  <span className="mr-2">🔥</span> Currently Running
                </span>
              </motion.div>
              <motion.h2 
                className={`text-4xl font-bold text-gray-900 mb-4 ${delius.className}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Currently Running Programs
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join our active programs and start your tech journey today! These programs are currently in session and accepting new participants.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Adults in Tech Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500 opacity-10"></div>
                  <Image
                    src="/images/adults-tech.jpg"
                    alt="Adults in Tech"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Enrolling Now
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>Adults in Tech</h3>
                  <p className="text-gray-600 mb-4">
                    Evening classes for adults looking to transition into tech careers. Learn coding, web development, and more!
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Evening Classes
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Online & In-Person
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Career Support
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/programs/adults-tech"
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfMzT8Mxu9iX0oFyMweLIZqPcY3EJ-1yaG6YoZvzGz9UYdt_g/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors group"
                    >
                      Enrol Now
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Saturday Coding School Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
                  <Image
                    src="/images/saturday-school.jpg"
                    alt="Saturday Coding School"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Enrolling Now
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>Saturday Coding School</h3>
                  <p className="text-gray-600 mb-4">
                    Weekend coding classes for kids and teens. Learn programming, robotics, and digital skills!
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Saturdays, 9AM - 1PM
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Multiple Locations
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Ages 8-16
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/programs/saturday-coding-school"
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSftXm5Upf3eI2-LLv9n33fJDQLeYhfVlcEZl64UdGMz6XQJ8Q/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors group"
                    >
                      Apply Now
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 font-['Delius']"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ready to Start Your Coding Journey?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join one of our programs today and take the first step towards a future in technology. Our team is here to help you find the right program for your needs.
              </motion.p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact#contact-form" className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 