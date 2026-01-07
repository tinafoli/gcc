import { BlogPost } from '@/components/BlogPreview';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

export const blogPosts: BlogPost[] = [
  {
    id: "24",
    title: "Call for Schools, Educators & Learning Centres: Unplugged Coding & AI Workbooks",
    excerpt: "Ghana Code Club is inviting schools, educators, and learning centres across Ghana to express interest in our Unplugged Coding & AI Workbooks — hands-on learning resources designed to introduce coding, computational thinking, and basic AI concepts with or without computers or internet access.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "December 2025",
    readTime: "6 min read",
    image: "/images/blog/ai-workbooks.jpeg",
    image2: "/images/blog/ai-workbooks-2.jpeg",
    image3: "/images/blog/ai-workbooks-3.jpeg",
    slug: "call-for-schools-educators-learning-centres-unplugged-coding-ai-workbooks",
    content: `📣 PUBLIC ANNOUNCEMENT

Call for Schools, Educators & Learning Centres

Unplugged Coding & Artificial Intelligence (AI) Workbooks

By Ghana Code Club

Ghana Code Club is inviting schools, educators, and learning centres across Ghana to express interest in our Unplugged Coding & AI Workbooks — hands-on learning resources designed to introduce coding, computational thinking, and basic AI concepts with or without computers or internet access.

These workbooks provide a strong foundation for learners and teachers and can be used independently or as a pathway into screen-based coding tools such as Scratch and other programming platforms.

⸻

✅ Who These Workbooks Are For

The Unplugged Coding & AI Workbooks are suitable for:

✔ Public, private, and community schools

✔ Montessori and play-based learning environments

✔ International schools and homeschooling groups

✔ After-school programs, clubs, NGOs, and learning centres

✔ Schools with limited, shared, or no ICT labs

✔ Schools introducing coding and AI for the first time

✔ Beginners learning the fundamentals of coding

✔ Early years, primary, and mixed-ability classrooms

✔ Teachers and facilitators seeking confidence to teach coding and AI

✔ Rural, peri-urban, and urban communities

⸻

🔍 Why Unplugged Learning?

Many schools face challenges such as limited devices, unreliable internet, large class sizes, or concerns about excessive screen time.

Our unplugged approach ensures that every learner can participate, while building core skills such as:

• Logical thinking

• Sequencing and algorithms

• Problem-solving

• Creativity and collaboration

⸻

🧠 More Than Just Workbooks

Schools that purchase or receive the workbooks become part of the Ghana Code Club ecosystem.

Participating schools and educators benefit from:

• Follow-up teacher training and onboarding support

• Guidance on classroom implementation

• Access to additional learning resources and activity materials

• Ongoing mentorship, community support, and updates

• Opportunities to participate in Ghana Code Club programs, events, and showcases

Our focus is on long-term partnership and sustained impact, not one-time delivery.

⸻

📝 About This Expression of Interest Form

Information collected through this form will help Ghana Code Club to:

• Plan printing, distribution, and rollout

• Identify schools requiring partial or full sponsorship

• Match sponsors and partners to specific schools and communities

• Plan training schedules and support structures

• Strengthen impact reporting and funding proposals

Please note: submission of this form does not guarantee immediate supply of materials.

⸻

👩🏽‍🏫 Who Should Complete the Form?

• Headteachers and school administrators

• Montessori and early-years educators

• ICT, STEM, and classroom teachers

• Learning centre managers and NGO coordinators

• Teacher trainers and facilitators

⸻

🔗 Expression of Interest Form

👉 https://bit.ly/freegccresources

🗓 Deadline: Open until further notice

⸻

🤝 For Sponsors & Partners

We welcome individuals, organisations, and corporate partners interested in sponsoring Unplugged Coding & AI Workbooks for schools in need.

Sponsored schools receive learning materials, structured training support, and follow-up engagement, ensuring transparency, accountability, and measurable impact.

📩 Sponsorship enquiries:

tinaappiah@ghanacodeclub.org

🌐 www.ghanacodeclub.org

⸻

🌱 About Ghana Code Club

Ghana Code Club is a non-profit organisation committed to equipping children, teachers, and communities with coding, robotics, AI, and digital skills through inclusive, creative, and practical learning models.`
  },
  {
    id: "23",
    title: " Hon. Kojo Yankah extends his legacy to Ghana Code Club",
    excerpt: "We are honored to welcome Hon. Kojo Yankah as Chairman of the Ghana Code Club Advisory Board. His national leadership and passion for youth innovation will accelerate our 22 digital learning centers, 100 Girls in STEM initiative, upcoming Unplugged Coding & AI Workbook launch, and nationwide teacher training programs.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Leadership Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "November 24, 2025",
    readTime: "5 min read",
    image: "/images/blog/hon-yankah1.jpeg",
    image2: "/images/blog/hon-yankah2.jpeg",
    image3: "/images/blog/hon-yankah3.jpeg",
    slug: "a-new-chapter-begins-hon-kojo-yankah-leads-our-advisory-board",
    content: `Ghana Code Club is proud to announce a significant milestone in our journey to expand digital literacy, creativity, and early AI education across Ghana. We are honoured to welcome Hon. Kojo Yankah as the Chairman of our Advisory Board, marking the beginning of an exciting new chapter for our organisation and the thousands of young learners we serve.

Hon. Yankah is a highly respected national figure — a statesman, communicator, educator, author, cultural advocate, and founder of the African University College of Communications (AUCC). Throughout his decades of leadership in public service, media, education, and African heritage preservation, he has championed initiatives that uplift young people and strengthen national development. His alignment with our mission is both natural and deeply inspiring.

⸻

A Connection Sparked by Youth Innovation

Earlier this year at the Agile in Africa Conference, Hon. Yankah witnessed our students present their tech projects with remarkable confidence and clarity. Their stories, innovations, and problem-solving skills captivated the audience and demonstrated what Ghanaian youth can achieve when given the right tools and mentorship.

Moved by their brilliance, Hon. Yankah reached out to Ghana Code Club with a sincere interest in supporting and amplifying our work. After learning more about our growing footprint and transformative programming, he graciously accepted our invitation to serve as Chairman of the Advisory Board.

As part of his early support, Hon. Kojo Yankah has generously offered the AUBC University Auditorium as the venue for the upcoming launch of our Unplugged Coding & AI Workbook — a pioneering educational tool designed specifically for schools with limited or no access to computer labs.

⸻

Scaling Impact Across Ghana

Ghana Code Club continues to grow steadily, with a national footprint that is expanding year after year. In 2025, we have:

• 22 digital learning centers now under our direct management
• 11 from ATC Ghana
• 6 from Ecobank Ghana
• 1 from Samsung Ghana
• Plus multiple partner schools and community-based programs
• Trained over 2,000 girls through our 100 Girls in STEM initiative
• Hosted Coolest Projects Ghana 2025, featuring 100+ finalists from across the country
• Produced and printed 2,000+ copies of Ghana's first-ever Unplugged Coding & AI Workbook
• Expanded virtual and in-person teacher training across several regions
• Strengthened our global visibility through our international partnership with Raspberry pi foundation and Code.org

This year has been one of both quiet transformation and major breakthroughs. Hon. Kojo Yankah's appointment comes at a turning point — a moment where our reach is growing, our innovations are maturing, and our visibility is rising.

⸻

Why Hon. Kojo Yankah's Leadership Matters

As Chairman of the Advisory Board, Hon. Kojo Yankah will play a key role in guiding Ghana Code Club's national impact. His leadership will help us:

• Forge stronger partnerships with government and industry
• Scale teacher training programs in both virtual and in-person formats
• Strengthen our reach into underserved and remote communities
• Drive national advocacy for early digital literacy and AI education
• Position Ghana Code Club as a leading educational force in Ghana
• Amplify the rollout and adoption of our Unplugged Coding & AI Workbook nationwide

His experience, networks, and influence will significantly accelerate our mission of ensuring that no child in Ghana is left behind in the digital future.

⸻

Looking Ahead

We are entering a bold new chapter — one defined by growth, national partnerships, and innovative tools that bring coding and AI literacy to every Ghanaian child, regardless of their access to technology.

The addition of Hon. Kojo Yankah to our leadership family marks a powerful shift that will help us unlock new opportunities, strengthen our programs, and deepen our impact across Ghana.

We are honoured, grateful, and energized for the journey ahead.

Welcome, Hon. Kojo Yankah — together, we move Ghana forward. 🇬🇭✨`
  },
  {
    id: "1",
    title: "Adults in Tech – Cohort 1 Successfully Concluded!",
    excerpt: "Our inaugural Adults in Tech program has successfully concluded, empowering 35 participants with practical, income-generating tech skills. From basic computing to AI tools, participants are already securing remote jobs and building digital careers.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "July 19, 2025",
    readTime: "4 min read",
    image: "/images/blog/adults-tech.jpg",
    image2: "/images/blog/adults-tech-2.jpg",
    image3: "/images/blog/adults-tech-3.jpg",
    slug: "adults-in-tech-cohort-1-successfully-concluded",
    content: `Launched in February 2025, Adults in Tech was designed as an empowering journey for adults seeking to stay relevant in today's fast-changing, AI-driven world.

Over the past several months, 35 passionate and determined participants immersed themselves in a hands-on, practical learning experience that went far beyond theory. Courses were scheduled virtually and in-person. Each course was intentionally crafted to help participants not just learn tech — but use it to create real impact and income.

Here's what we explored together:

🟢 Basic Computing – building digital confidence from the ground up.
🟢 Graphic Design – followed by hands-on print sessions, creating T-shirts, flyers, banners, mugs, and more.
🟢 Web Design & Digital Marketing – from setting up websites to mastering social media strategies.
🟢 AI Prompt Engineering – using tools to generate content and automate workflows.
🟢 3D Modeling & Printing – introducing real-world product design possibilities.
🟢 AI Tools for Animation & Product Advertising – creating professional marketing assets from scratch.

And the results? 🔥
Some participants secured remote jobs using the very skills they were learning — even before the program ended! Others applied their new tech skills directly at their workplaces, improving productivity and processes. Many are now building digital careers and side hustles, living proof that the program's mission — to equip adults with practical, income-generating tech skills — has been fulfilled.
🧠💼 From business owners to first-time tech learners, our participants proved that it's never too late to embrace technology, retool, and reimagine what's possible.
To our resilient Cohort 1 — thank you for showing up, staying committed, and bringing your energy to every session. This is just the beginning. 🚀`
  },
  {
    id: "2",
    title: "Ghana Code Club Partners with The Ursula Foundation",
    excerpt: "Exciting news! The Ursula Foundation was launched by Hon. Ursula Owusu-Ekuful, and we're proud to be part of their digital skills training program for youth. During the launch, we demonstrated with 16 children and shared our work. Stay tuned for more details on how the people of Dansoman and its environs can get involved!",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Partnership Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 28, 2025",
    readTime: "2 min read",
    image: "/images/blog/ursula-foundation-launch.jpg",
    image2: "/images/blog/ursula-foundation-launch-2.jpg",
    image3: "/images/blog/ursula-foundation-launch-3.jpg",
    slug: "ghana-code-club-partners-with-the-ursula-foundation",
    content: `Exciting News from Ghana Code Club! 🥳🤗🎊

Yesterday was a thrilling day for us as the Ursula Foundation was launched by Hon. Ursula Owusu-Ekuful. One of the key programs rolled out by the foundation focuses on digital skills training for the youth, and we are proud to be a part of it. We've received numerous inquiries from the Dansoman area about joining our programs, and the launch of this non-political foundation is making it possible. Yay!

During the launch, Ghana Code Club had the opportunity to demonstrate with 16 children and share our work. Stay tuned for more details on how the people of Dansoman and its environs can get involved and benefit from these programs 💕💕💕!

#ghanacodeclub #TheUrsulaFoundation`
  },
  {
    id: "3",
    title: "Ghana Code Club at Accra Parent Expo",
    excerpt: "We showcased our programs, products, and services at the Accra Parent Expo, including robots programmed to follow lines, pick and deliver items, our upcoming drone project, coding workbooks, and 3D printed items. The event provided a great opportunity to connect with parents and showcase our innovative after-school programs.",
    category: 'behind-scenes',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 25, 2025",
    readTime: "3 min read",
    image: "/images/blog/parent-expo.jpg",
    image2: "/images/blog/parent-expo-2.jpg",
    image3: "/images/blog/parent-expo-3.jpg",
    slug: "ghana-code-club-at-accra-parent-expo"
  },
  {
    id: "4",
    title: "Robotics Lessons at Bright Lilies School",
    excerpt: "Our robotics lessons are in full swing at Bright Lilies School, where we're fostering teamwork and collaboration among students as they build robots and write programming commands. The program emphasizes hands-on learning and practical application of STEM concepts.",
    category: 'ai-robotics',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "March 22, 2025",
    readTime: "2 min read",
    image: "/images/blog/bright-lilies.jpg",
    image2: "/images/blog/bright-lilies-2.jpg",
    image3: "/images/blog/bright-lilies-3.jpg",
    slug: "robotics-lessons-at-bright-lilies-school"
  },
  {
    id: "5",
    title: "Teacher Training Workshop: Empowering Educators with Digital Skills",
    excerpt: "Our comprehensive teacher training program is equipping educators with essential digital skills and coding knowledge. Through hands-on workshops and practical sessions, teachers are learning how to integrate technology effectively into their classrooms and inspire the next generation of tech innovators.",
    category: 'tutorials',
    author: {
      name: "Ghana Code Club Team",
      role: "Training Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 20, 2025",
    readTime: "3 min read",
    image: "/images/blog/teacher-training.jpg",
    image2: "/images/blog/teacher-training-2.jpg",
    image3: "/images/blog/teacher-training-3.jpg",
    slug: "teacher-training-workshop-empowering-educators-with-digital-skills"
  },
  {
    id: "6",
    title: "National Robotics Competition: Showcasing Young Talent",
    excerpt: "Students from across Ghana gathered to demonstrate their robotics skills in our annual competition. Teams showcased innovative projects, from autonomous navigation robots to smart environmental solutions, highlighting the growing interest in robotics among Ghanaian youth.",
    category: 'ai-robotics',
    author: {
      name: "Ghana Code Club Team",
      role: "Events Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "March 18, 2025",
    readTime: "4 min read",
    image: "/images/blog/robotics-competition.jpg",
    image2: "/images/blog/robotics-competition-2.jpg",
    image3: "/images/blog/robotics-competition-3.jpg",
    slug: "national-robotics-competition-showcasing-young-talent"
  },
  {
    id: "7",
    title: "Computer Donation Drive: Bridging the Digital Divide",
    excerpt: "Thanks to our generous partners, we've successfully distributed computers to underserved schools across Ghana. This initiative is part of our ongoing commitment to ensure every child has access to the tools they need for digital literacy and coding education.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Operations Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 15, 2025",
    readTime: "2 min read",
    image: "/images/blog/computer-donation.jpg",
    image2: "/images/blog/computer-donation-2.jpg",
    image3: "/images/blog/computer-donation-3.jpg",
    slug: "computer-donation-drive-bridging-the-digital-divide"
  },
  {
    id: "8",
    title: "Hopper Dean Center Launch: A New Hub for Tech Education",
    excerpt: "We're thrilled to announce the opening of our new Hopper Dean Center, a state-of-the-art facility dedicated to computer science education. The center will serve as a hub for coding classes, robotics workshops, and tech innovation for students across Ghana.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Executive Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "March 12, 2025",
    readTime: "3 min read",
    image: "/images/blog/hopper-dean-launch.jpg",
    image2: "/images/blog/hopper-dean-launch-2.jpg",
    image3: "/images/blog/hopper-dean-launch-3.jpg",
    slug: "hopper-dean-center-launch-a-new-hub-for-tech-education"
  },
  {
    id: "9",
    title: "Firefly Competition: Celebrating Young Innovators",
    excerpt: "The annual Firefly Competition brought together young tech enthusiasts to showcase their coding projects. From mobile apps to web solutions, students demonstrated impressive technical skills and creative problem-solving abilities.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Events Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 10, 2025",
    readTime: "3 min read",
    image: "/images/blog/firefly-competition.jpg",
    image2: "/images/blog/firefly-competition-2.jpg",
    image3: "/images/blog/firefly-competition-3.jpg",
    slug: "firefly-competition-celebrating-young-innovators"
  },
  {
    id: "10",
    title: "Swedru Training Initiative: Expanding Our Reach",
    excerpt: "Our expansion to Swedru marks another milestone in our mission to bring coding education to every corner of Ghana. The training program focuses on basic programming concepts, web development, and digital literacy skills.",
    category: 'behind-scenes',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "March 8, 2025",
    readTime: "2 min read",
    image: "/images/blog/swedru-training.jpg",
    image2: "/images/blog/swedru-training-2.jpg",
    image3: "/images/blog/swedru-training-3.jpg",
    slug: "swedru-training-initiative-expanding-our-reach"
  },
  {
    id: "11",
    title: "Raspberry Pi Meetup: Hands-on Learning with Single-Board Computers",
    excerpt: "Our latest Raspberry Pi meetup introduced students to the world of single-board computing. Participants learned about hardware programming, IoT projects, and practical applications of these versatile devices.",
    category: 'tutorials',
    author: {
      name: "Ghana Code Club Team",
      role: "Technical Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 5, 2025",
    readTime: "3 min read",
    image: "/images/blog/raspberry-pi-meetup.jpg",
    image2: "/images/blog/raspberry-pi-meetup-2.jpg",
    image3: "/images/blog/raspberry-pi-meetup-3.jpg",
    slug: "raspberry-pi-meetup-hands-on-learning-with-single-board-computers"
  },
  {
    id: "12",
    title: "École Thérèse Innovation Lab: A New Chapter in STEM Education",
    excerpt: "Our partnership with École Thérèse has led to the creation of a cutting-edge innovation lab. This facility will provide students with access to advanced technology and hands-on learning experiences in coding and robotics.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Partnership Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "March 3, 2025",
    readTime: "3 min read",
    image: "/images/blog/ecole-therese-lab.jpg",
    image2: "/images/blog/ecole-therese-lab-2.jpg",
    image3: "/images/blog/ecole-therese-lab-3.jpg",
    slug: "ecole-therese-innovation-lab-a-new-chapter-in-stem-education"
  },
  {
    id: "13",
    title: "SAGE Competition: Young Entrepreneurs in Tech",
    excerpt: "The SAGE Competition showcased innovative tech solutions developed by young entrepreneurs. Projects ranged from educational apps to environmental monitoring systems, demonstrating the intersection of technology and social impact.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Events Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "March 1, 2025",
    readTime: "3 min read",
    image: "/images/blog/sage-competition.jpg",
    image2: "/images/blog/sage-competition-2.jpg",
    image3: "/images/blog/sage-competition-3.jpg",
    slug: "sage-competition-young-entrepreneurs-in-tech"
  },
  {
    id: "14",
    title: "St. Joseph's School Visit: Inspiring Future Technologists",
    excerpt: "Our visit to St. Joseph's School introduced students to the exciting world of coding and robotics. Through interactive demonstrations and hands-on activities, we sparked interest in technology among the next generation.",
    category: 'behind-scenes',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "February 28, 2025",
    readTime: "2 min read",
    image: "/images/blog/st-joseph-visit.jpg",
    image2: "/images/blog/st-joseph-visit-2.jpg",
    image3: "/images/blog/st-joseph-visit-3.jpg",
    slug: "st-josephs-school-visit-inspiring-future-technologists"
  },
  {
    id: "15",
    title: "Tech Expo 2025: Showcasing Innovation in Education",
    excerpt: "Our participation in Tech Expo 2025 highlighted the latest developments in coding education. We demonstrated our innovative teaching methods, student projects, and the impact of our programs on digital literacy in Ghana.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Events Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "February 25, 2025",
    readTime: "3 min read",
    image: "/images/blog/tech-expo.jpg",
    image2: "/images/blog/tech-expo-2.jpg",
    image3: "/images/blog/tech-expo-3.jpg",
    slug: "tech-expo-2025-showcasing-innovation-in-education"
  },
  {
    id: "16",
    title: "Girls in STEM Workshop: Empowering Future Leaders",
    excerpt: "Our Girls in STEM workshop provided hands-on experience in coding, robotics, and digital skills to young female students. The program aims to bridge the gender gap in technology and inspire more girls to pursue STEM careers.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "February 22, 2025",
    readTime: "3 min read",
    image: "/images/blog/girls-stem-workshop.jpg",
    image2: "/images/blog/girls-stem-workshop-2.jpg",
    image3: "/images/blog/girls-stem-workshop-3.jpg",
    slug: "girls-in-stem-workshop-empowering-future-leaders"
  },
  {
    id: "17",
    title: "American Spaces Visit: Fostering Digital Innovation",
    excerpt: "Our visit to American Spaces Ghana provided students with exposure to cutting-edge technology and digital resources. Through interactive sessions and hands-on activities, participants explored various aspects of coding and digital literacy in a state-of-the-art learning environment.",
    category: 'behind-scenes',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "February 20, 2025",
    readTime: "3 min read",
    image: "/images/blog/american-spaces-visit.jpg",
    image2: "/images/blog/american-spaces-visit-2.jpg",
    image3: "/images/blog/american-spaces-visit-3.jpg",
    slug: "american-spaces-visit-fostering-digital-innovation"
  },
  {
    id: "18",
    title: "Coolest Projects Showcase: Celebrating Young Innovation",
    excerpt: "The Coolest Projects showcase brought together young tech enthusiasts to present their innovative solutions. From mobile apps to hardware projects, students demonstrated their creativity and technical skills, inspiring their peers and the wider community.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Events Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "February 18, 2025",
    readTime: "3 min read",
    image: "/images/blog/coolest-projects.jpg",
    image2: "/images/blog/coolest-projects-2.jpg",
    image3: "/images/blog/coolest-projects-3.jpg",
    slug: "coolest-projects-showcase-celebrating-young-innovation"
  },
  {
    id: "19",
    title: "EdTech Forum: Shaping the Future of Education",
    excerpt: "Ghana Code Club participated in the EdTech Forum, discussing the integration of technology in education. We shared our experiences, best practices, and vision for the future of digital education in Ghana, while networking with other education innovators.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Executive Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "February 15, 2025",
    readTime: "3 min read",
    image: "/images/blog/edtech-forum.jpg",
    image2: "/images/blog/edtech-forum-2.jpg",
    image3: "/images/blog/edtech-forum-3.jpg",
    slug: "edtech-forum-shaping-the-future-of-education"
  },
  {
    id: "20",
    title: "Girls in ICT Day: Inspiring the Next Generation",
    excerpt: "Our Girls in ICT Day celebration focused on empowering young girls through technology. Through workshops, mentoring sessions, and hands-on activities, we encouraged participants to explore careers in technology and develop their digital skills.",
    category: 'success-stories',
    author: {
      name: "Ghana Code Club Team",
      role: "Education Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "February 12, 2025",
    readTime: "3 min read",
    image: "/images/blog/girls-ict-day.jpg",
    image2: "/images/blog/girls-ict-day-2.jpg",
    image3: "/images/blog/girls-ict-day-3.jpg",
    slug: "girls-in-ict-day-inspiring-the-next-generation"
  },
  {
    id: "21",
    title: "Ecobank Partnership: Advancing Digital Education",
    excerpt: "We're excited to announce our partnership with Ecobank Ghana to enhance digital literacy across the country. This collaboration will support our mission to provide quality coding education and expand our reach to more communities.",
    category: 'news',
    author: {
      name: "Ghana Code Club Team",
      role: "Partnership Team",
      avatar: "/images/team/mentor1.jpg"
    },
    date: "February 10, 2025",
    readTime: "2 min read",
    image: "/images/blog/ecobank-partnership.jpg",
    image2: "/images/blog/ecobank-partnership-2.jpg",
    image3: "/images/blog/ecobank-partnership-3.jpg",
    slug: "ecobank-partnership-advancing-digital-education"
  },
  {
    id: "22",
    title: "Mentorship Meetup: Building Future Tech Leaders",
    excerpt: "As part of our 10th Anniversary Celebrations, Ghana Code Club reconnected with past students—young minds we mentored who are now shaping their futures in higher institutions and careers. The meet-up was an inspiring experience celebrating their successes and helping them refine their visions for the next 3 to 5 years.",
    category: 'behind-scenes',
    author: {
      name: "Ghana Code Club Team",
      role: "Mentorship Team",
      avatar: "/images/team/mentor2.jpg"
    },
    date: "February 8, 2025",
    readTime: "4 min read",
    image: "/images/blog/mentorship-meetup.jpg",
    image2: "/images/blog/mentorship-meetup-2.jpg",
    image3: "/images/blog/mentorship-meetup-3.jpg",
    slug: "mentorship-meetup-building-future-tech-leaders",
    content: `As part of our 10th Anniversary Celebrations, Ghana Code Club took a special step to reconnect with some of our past students—young minds we mentored in basic schools who are now shaping their futures in higher institutions and careers. Our goal? A speed mentorship session to assess our impact, celebrate their successes, and help them refine their visions for the next 3 to 5 years.

To our delight, several alumni—especially young women—answered the call, and even though most of them couldn't show up in person due to circumstances beyond their control, the meet-up was still an inspiring experience indeed! These young changemakers are already making waves in the digital world:

✅ Some are pursuing science and technology courses in Senior High School.
✅ Others have become content creators and full-stack web developers.
✅ Several have dived into data analysis and are applying digital skills in various firms.
✅ Many are now in universities across the world, studying engineering, computer science, and STEM-related fields.
✅ Some are even law students leveraging technology to advocate for girls' empowerment—all while still in school!

Seeing these young talents excel reminds us of why we started this journey. At Ghana Code Club, our vision is to inspire and equip the next generation with the digital skills they need to innovate, thrive, and lead in a tech-driven world. Our goal after students exit the club is to see them either pursue Tech or STEM-related courses at higher institutions, embark on careers in STEM, or apply their skills as a hobby. It was inspiring to see how their early exposure to coding and technology has influenced their paths, reinforcing our mission to nurture lifelong digital skills.

This experience reaffirmed one key lesson—we need more of these mentorship sessions! Moving forward, we'll be hosting regular alumni meet-ups during school vacations, ensuring our past students get the guidance and networking opportunities they need to thrive in the digital space.

It also highlighted a crucial challenge: With Ghana Code Club active in 19 communities, we must find ways to support our teachers in tracking and reconnecting with past students. By doing so, we can celebrate their wins, follow their journeys, and continue shaping their visions through the power of technology.

🎉 Calling all Ghana Code Club alumni! If you were once part of our programs, we'd love to hear from you! Let's reconnect, mentor, and WIN TOGETHER! 💪`
  }
];

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
} 