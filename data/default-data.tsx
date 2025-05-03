// Default profile data
export const defaultProfileData = {
  name: "John Doe",
  title: "Full Stack Developer",
  about:
    "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building scalable applications and contributing to open source.",
  location: "San Francisco, CA",
  company: "Tech Innovations Inc.",
  website: "https://example.dev",
  github: "octocat", // GitHub's demo account
  twitter: "johndoe",
  linkedin: "johndoe",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
  ],
  stats: true,
  streak: true,
  topLangs: true,
  visitors: true,
  showRepos: true,
  showContribGraph: false,
  showTrophies: false,
  showProjects: false,
  showBlog: false,
  showTimeline: false,
  showEducation: false,
  showContact: false,
  githubDataFetched: false,
  avatarUrl: "",
  publicRepos: 0,
  followers: 0,
  following: 0,
  totalStars: 0,
  totalForks: 0,
  totalContributions: 0,
  currentStreak: 0,
  longestStreak: 0,
  languages: {},
  profileViews: 0,
  repositories: [],
  colors: {
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#7a6cf0", // lighter shade
    accent: "#4535c7", // darker shade
  },
  projects: [
    {
      title: "Project Alpha",
      description: "A machine learning application for predictive analytics",
      technologies: ["Python", "TensorFlow", "React"],
      image: "/placeholder.svg?key=2nd73",
      repoUrl: "https://github.com/octocat/project-alpha",
      liveUrl: "https://example.com/project-alpha",
    },
    {
      title: "Task Manager",
      description: "A full-stack task management application with real-time updates",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "/placeholder.svg?key=se8km",
      repoUrl: "https://github.com/octocat/task-manager",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern web technologies",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image: "/placeholder.svg?key=m6bgn",
      repoUrl: "https://github.com/octocat/portfolio",
      liveUrl: "https://example.dev",
    },
  ],
  blogPosts: [
    {
      title: "Getting Started with React Hooks",
      excerpt: "Learn how to use React Hooks to simplify your components and manage state effectively.",
      date: "2023-05-15",
      readTime: "5 min read",
      url: "https://example.dev/blog/react-hooks",
      image: "/placeholder.svg?key=uwq05",
      tags: ["React", "JavaScript", "Web Development"],
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for creating maintainable and scalable backend services with Node.js and Express.",
      date: "2023-04-22",
      readTime: "8 min read",
      url: "https://example.dev/blog/node-apis",
      image: "/placeholder.svg?key=kf6yw",
      tags: ["Node.js", "API", "Backend"],
    },
    {
      title: "Introduction to TypeScript",
      excerpt: "Why TypeScript is becoming essential for modern JavaScript development and how to get started.",
      date: "2023-03-10",
      readTime: "6 min read",
      url: "https://example.dev/blog/typescript-intro",
      image: "/placeholder.svg?key=zz7aw",
      tags: ["TypeScript", "JavaScript"],
    },
  ],
  timeline: [
    {
      title: "Senior Developer",
      organization: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Leading the frontend team and architecting scalable web applications",
      tags: ["React", "TypeScript", "AWS"],
    },
    {
      title: "Full Stack Developer",
      organization: "Digital Solutions LLC",
      period: "2018 - 2021",
      description: "Developed and maintained full-stack applications for enterprise clients",
      tags: ["Node.js", "React", "MongoDB"],
    },
    {
      title: "Junior Developer",
      organization: "WebTech Startup",
      period: "2016 - 2018",
      description: "Worked on frontend development and UI/UX implementation",
      tags: ["JavaScript", "HTML/CSS", "jQuery"],
    },
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Master's Degree",
      field: "Computer Science",
      location: "San Francisco, CA",
      startDate: "2014",
      endDate: "2016",
      description: "Specialized in Machine Learning and Artificial Intelligence",
      gpa: "3.9",
      achievements: ["Published research paper on neural networks", "Received academic excellence scholarship"],
    },
    {
      institution: "State College",
      degree: "Bachelor's Degree",
      field: "Software Engineering",
      location: "Boston, MA",
      startDate: "2010",
      endDate: "2014",
      description: "Focused on software development methodologies and practices",
      gpa: "3.7",
    },
  ],
  contactInfo: {
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    socials: [
      { platform: "GitHub", url: "https://github.com/octocat" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      { platform: "Twitter", url: "https://twitter.com/johndoe" },
    ],
  },
  repoSettings: {
    cardStyle: "default",
    gridColumns: 2,
    alignment: "center",
    showDescription: true,
    showLanguage: true,
    showStats: true,
    showOwner: false,
    theme: "default",
    borderStyle: "default",
    iconSize: "medium",
  },
}

// Default sections configuration
export const defaultSections = [
  { id: "intro", name: "Introduction", visible: true },
  { id: "skills", name: "Skills", visible: true },
  { id: "stats", name: "GitHub Stats", visible: true },
  { id: "repos", name: "Repositories", visible: true },
  { id: "projects", name: "Projects", visible: false },
  { id: "blog", name: "Blog Posts", visible: false },
  { id: "timeline", name: "Experience", visible: false },
  { id: "education", name: "Education", visible: false },
  { id: "contact", name: "Contact", visible: false },
]

// Default color themes
export const defaultThemes = [
  {
    name: "Purple Haze",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#7a6cf0", // lighter shade
    accent: "#4535c7", // darker shade
  },
  {
    name: "Deep Purple",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#9085f2", // even lighter shade
    accent: "#3626a7", // even darker shade
  },
  {
    name: "Royal Purple",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#6e5eee", // slightly lighter
    accent: "#4938c9", // slightly darker
  },
  {
    name: "Lavender",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#a59af5", // much lighter lavender
    accent: "#5847eb", // same as primary
  },
  {
    name: "Indigo",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#5847eb", // same as primary
    accent: "#3626a7", // darker shade
  },
  {
    name: "Violet",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#7a6cf0", // lighter shade
    accent: "#5847eb", // same as primary
  },
  {
    name: "Monochrome Purple",
    primary: "#5847eb", // rgb(88, 71, 235) - rich purple
    secondary: "#7a6cf0", // lighter shade
    accent: "#4535c7", // darker shade
  },
]
