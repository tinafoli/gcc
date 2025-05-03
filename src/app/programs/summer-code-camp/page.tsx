'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const programDetails = {
  title: "Summer Code Camp",
  description: "Intensive summer program for kids to learn coding and robotics",
  longDescription: `Get ready for an incredible 8-week tech adventure! Our Summer Code Camp is where young innovators aged 10-16 embark on an exciting journey from complete beginners to confident tech creators. 

Through hands-on projects, fun challenges, and creative exploration, students will dive into the fascinating world of coding, robotics, game development, and more. Each week brings new discoveries, friendships, and amazing creations that your child will be proud to show off!`,
  features: [
    'Create your own video games and apps! 🎮',
    'Build and program real robots! 🤖',
    'Design awesome websites! 🌐',
    'Make new friends who love tech! 👥',
    'Learn from industry experts! 👩‍💻',
    'Visit real tech companies! 🏢',
    'Show off your creations! 🌟',
    'Get your tech champion certificate! 🎓'
  ],
  targetAudience: 'Tech explorers aged 10-16',
  duration: '8 weeks (Monday to Friday)',
  schedule: '9:00 AM - 3:00 PM daily',
  image: '/images/summer-camp.jpg',
  curriculum: [
    {
      title: "Your Tech Journey Begins! 🚀",
      description: "From day one, you'll dive into hands-on coding adventures! Start with the basics and watch as your skills grow week by week. By the end of our 8-week journey, you'll be amazed at what you can create!"
    },
    {
      title: "What You'll Learn 🌟",
      description: "Master the art of coding through Python programming, create your own websites, design and build robots, develop exciting games, and even make your own mobile apps! Every day brings new challenges and victories."
    },
    {
      title: "The Grand Finale 🏆",
      description: "In the final week, showcase your skills with an amazing project of your choice! Build a game, program a robot, or create an app - the possibilities are endless. Present your creation to family and friends at our spectacular Tech Showcase!"
    },
    {
      title: "Beyond Coding 🌈",
      description: "This isn't just about coding - it's about creativity, problem-solving, teamwork, and building confidence. Make lasting friendships with fellow tech enthusiasts and learn from inspiring mentors who'll guide you every step of the way."
    }
  ],
  outcomes: [
    '🎯 Create your own games, apps, and websites',
    '🤖 Build and program real working robots',
    '💡 Master problem-solving like a pro',
    '🤝 Develop teamwork and leadership skills',
    '🎤 Gain confidence in public speaking',
    '🌟 Join a community of young innovators',
    '🎓 Graduate as a confident tech creator'
  ],
  testimonials: [
    {
      name: 'Sarah Addo',
      role: 'Parent',
      quote: 'The Summer Code Camp was transformative for my daughter. She came home every day excited about what she learned and created. The mix of coding and robotics really kept her engaged.'
    },
    {
      name: 'David Ibekwute',
      role: 'Student',
      quote: 'I loved building my own robot and programming it to move. The teachers made everything easy to understand, and I made great friends during the camp.'
    },
    {
      name: 'Grace Owusu',
      role: 'Parent',
      quote: 'The project showcase at the end was impressive. Seeing what the kids created in just two weeks was incredible. My son is already asking to join next year\'s camp!'
    }
  ]
};

export default function SummerCodeCampPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="Summer Code Camp"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-blue-600/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link href="/programs" className="text-gray-300 hover:text-white mb-8 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Programs
            </Link>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${delius.className}`}>{programDetails.title}</h1>
            <p className="text-xl text-gray-200 mb-8">{programDetails.description}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#program-details" className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors">
                Learn More
              </a>
              <a 
                href="https://forms.gle/vxUKQ5uVkhSfPUzAA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section id="program-details" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>About the Program</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{programDetails.longDescription}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Program Features</h2>
                <ul className="space-y-4">
                  {programDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Your 8-Week Adventure</h2>
                <div className="space-y-8">
                  {programDetails.curriculum.map((section, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{section.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Program Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Target Audience</h4>
                    <p className="text-gray-600">{programDetails.targetAudience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Duration</h4>
                    <p className="text-gray-600">{programDetails.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Schedule</h4>
                    <p className="text-gray-600">{programDetails.schedule}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-red-50 rounded-xl p-8"
              >
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Ready to Join?</h3>
                <p className="text-gray-600 mb-6">
                  Secure your spot in our upcoming Summer Code Camp. Limited seats available!
                </p>
                <a
                  href="https://forms.gle/vxUKQ5uVkhSfPUzAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                  Register Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${delius.className}`}>What Parents and Students Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programDetails.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-500 text-xl font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${delius.className}`}>Make This Summer Count!</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Give your child the opportunity to learn valuable tech skills while having fun. Join our Summer Code Camp and watch them thrive!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/signup" className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 