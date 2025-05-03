"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  X,
  RefreshCw,
  Check,
  Plus,
  Trash2,
  Edit2,
  User,
  Code,
  Briefcase,
  BookOpen,
  Settings,
  Github,
  Copy,
  Download,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorPicker } from "@/components/color-picker"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RepositoryCustomizer, defaultRepoSettings } from "@/components/repository-customizer"
import { EducationForm } from "@/components/education-form"

export function ProfileForm({
  profileData,
  setProfileData,
  activeTemplate,
  setActiveTemplate,
  handleGenerateMarkdown,
  fetchGitHubData,
  isFetching,
}) {
  const { toast } = useToast()
  const [newSkill, setNewSkill] = useState("")
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    image: "/placeholder.svg",
    repoUrl: "",
    liveUrl: "",
  })
  const [newProjectSkill, setNewProjectSkill] = useState("")
  const [editingProjectIndex, setEditingProjectIndex] = useState(null)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)

  const [newExperience, setNewExperience] = useState({
    title: "",
    organization: "",
    period: "",
    description: "",
    tags: [],
  })
  const [newExperienceTag, setNewExperienceTag] = useState("")
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null)
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false)

  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
  })
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name, checked) => {
    setProfileData({
      ...profileData,
      [name]: checked,
    })
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleTemplateChange = (value) => {
    setActiveTemplate(value)
  }

  const handleColorChange = (colors) => {
    setProfileData({
      ...profileData,
      colors: colors,
    })
  }

  const handleFetchGitHubData = async () => {
    if (!profileData.github.trim()) {
      toast({
        title: "GitHub username required",
        description: "Please enter a GitHub username to fetch data",
        variant: "destructive",
      })
      return
    }

    try {
      await fetchGitHubData(profileData.github)
    } catch (error) {
      // Error is already handled in the fetchGitHubData function
      console.error("Error in handleFetchGitHubData:", error)
    }
  }

  // Project management functions
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target
    setNewProject({
      ...newProject,
      [name]: value,
    })
  }

  const handleAddProjectSkill = (e) => {
    e.preventDefault()
    if (newProjectSkill.trim() && !newProject.technologies.includes(newProjectSkill.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newProjectSkill.trim()],
      })
      setNewProjectSkill("")
    }
  }

  const handleRemoveProjectSkill = (skillToRemove) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Project title required",
        description: "Please enter a title for your project",
        variant: "destructive",
      })
      return
    }

    if (editingProjectIndex !== null) {
      // Update existing project
      const updatedProjects = [...profileData.projects]
      updatedProjects[editingProjectIndex] = newProject

      setProfileData({
        ...profileData,
        projects: updatedProjects,
      })

      setEditingProjectIndex(null)
    } else {
      // Add new project
      setProfileData({
        ...profileData,
        projects: [...(profileData.projects || []), newProject],
      })
    }

    // Reset form
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      image: "/placeholder.svg",
      repoUrl: "",
      liveUrl: "",
    })

    setIsProjectDialogOpen(false)

    toast({
      title: editingProjectIndex !== null ? "Project updated" : "Project added",
      description:
        editingProjectIndex !== null
          ? "Your project has been updated successfully"
          : "Your project has been added to your profile",
    })
  }

  const handleEditProject = (index) => {
    setNewProject({ ...profileData.projects[index] })
    setEditingProjectIndex(index)
    setIsProjectDialogOpen(true)
  }

  const handleDeleteProject = (index) => {
    const updatedProjects = [...profileData.projects]
    updatedProjects.splice(index, 1)

    setProfileData({
      ...profileData,
      projects: updatedProjects,
    })

    toast({
      title: "Project deleted",
      description: "The project has been removed from your profile",
    })
  }

  // Experience management functions
  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target
    setNewExperience({
      ...newExperience,
      [name]: value,
    })
  }

  const handleAddExperienceTag = (e) => {
    e.preventDefault()
    if (newExperienceTag.trim() && !newExperience.tags.includes(newExperienceTag.trim())) {
      setNewExperience({
        ...newExperience,
        tags: [...newExperience.tags, newExperienceTag.trim()],
      })
      setNewExperienceTag("")
    }
  }

  const handleRemoveExperienceTag = (tagToRemove) => {
    setNewExperience({
      ...newExperience,
      tags: newExperience.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleAddExperience = () => {
    if (!newExperience.title.trim() || !newExperience.organization.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter a title and organization",
        variant: "destructive",
      })
      return
    }

    if (editingExperienceIndex !== null) {
      // Update existing experience
      const updatedTimeline = [...profileData.timeline]
      updatedTimeline[editingExperienceIndex] = newExperience

      setProfileData({
        ...profileData,
        timeline: updatedTimeline,
      })

      setEditingExperienceIndex(null)
    } else {
      // Add new experience
      setProfileData({
        ...profileData,
        timeline: [...(profileData.timeline || []), newExperience],
      })
    }

    // Reset form
    setNewExperience({
      title: "",
      organization: "",
      period: "",
      description: "",
      tags: [],
    })

    setIsExperienceDialogOpen(false)

    toast({
      title: editingExperienceIndex !== null ? "Experience updated" : "Experience added",
      description:
        editingExperienceIndex !== null
          ? "Your work experience has been updated successfully"
          : "Your work experience has been added to your profile",
    })
  }

  const handleEditExperience = (index) => {
    setNewExperience({ ...profileData.timeline[index] })
    setEditingExperienceIndex(index)
    setIsExperienceDialogOpen(true)
  }

  const handleDeleteExperience = (index) => {
    const updatedTimeline = [...profileData.timeline]
    updatedTimeline.splice(index, 1)

    setProfileData({
      ...profileData,
      timeline: updatedTimeline,
    })

    toast({
      title: "Experience deleted",
      description: "The work experience has been removed from your profile",
    })
  }

  // Social links management
  const handleSocialLinkInputChange = (e) => {
    const { name, value } = e.target
    setNewSocialLink({
      ...newSocialLink,
      [name]: value,
    })
  }

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform.trim() || !newSocialLink.url.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter both platform name and URL",
        variant: "destructive",
      })
      return
    }

    // Add new social link
    setProfileData({
      ...profileData,
      contactInfo: {
        ...profileData.contactInfo,
        socials: [...(profileData.contactInfo?.socials || []), newSocialLink],
      },
    })

    // Reset form
    setNewSocialLink({
      platform: "",
      url: "",
    })

    setIsSocialDialogOpen(false)

    toast({
      title: "Social link added",
      description: "Your social link has been added to your profile",
    })
  }

  const handleDeleteSocialLink = (index) => {
    const updatedSocials = [...profileData.contactInfo.socials]
    updatedSocials.splice(index, 1)

    setProfileData({
      ...profileData,
      contactInfo: {
        ...profileData.contactInfo,
        socials: updatedSocials,
      },
    })

    toast({
      title: "Social link deleted",
      description: "The social link has been removed from your profile",
    })
  }

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(handleGenerateMarkdown(activeTemplate))
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this into your GitHub profile README.md file",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      })
    }
  }

  const handleDownloadMarkdown = () => {
    const markdown = handleGenerateMarkdown(activeTemplate)
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "README.md"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded README.md",
      description: "Your markdown file has been downloaded",
    })
  }

  const handleOpenInGitHub = () => {
    if (profileData.github) {
      window.open(`https://github.com/${profileData.github}`, "_blank")
    } else {
      toast({
        title: "GitHub username required",
        description: "Please enter a GitHub username first",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Editor</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyMarkdown}>
                <Copy size={16} className="mr-2" />
                Copy Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadMarkdown}>
                <Download size={16} className="mr-2" />
                Download README.md
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenInGitHub}>
                <Github size={16} className="mr-2" />
                Open in GitHub
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User size={16} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-1">
            <Code size={16} />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1">
            <BookOpen size={16} />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-1">
            <Briefcase size={16} />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={profileData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={profileData.about}
                  onChange={handleInputChange}
                  placeholder="Write a brief description about yourself"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={profileData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Tech Innovations Inc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  placeholder="e.g. https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="github"
                    name="github"
                    value={profileData.github}
                    onChange={handleInputChange}
                    placeholder="e.g. johndoe"
                    className="flex-grow"
                  />
                  <Button
                    variant="outline"
                    onClick={handleFetchGitHubData}
                    disabled={isFetching || !profileData.github.trim()}
                    className="flex-shrink-0"
                  >
                    {isFetching ? (
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                    ) : profileData.githubDataFetched ? (
                      <Check size={16} className="mr-2 text-green-500" />
                    ) : (
                      <RefreshCw size={16} className="mr-2" />
                    )}
                    Fetch Data
                  </Button>
                </div>
                {profileData.githubDataFetched && (
                  <p className="text-xs text-green-600 dark:text-green-400">GitHub data successfully fetched</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Username</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={profileData.twitter}
                  onChange={handleInputChange}
                  placeholder="e.g. johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Username</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  placeholder="e.g. johndoe"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  value={profileData.contactInfo?.email || ""}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      contactInfo: {
                        ...profileData.contactInfo,
                        email: e.target.value,
                      },
                    })
                  }}
                  placeholder="e.g. yourname@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customLocation">Custom Location</Label>
                <Input
                  id="customLocation"
                  name="customLocation"
                  value={profileData.contactInfo?.location || profileData.location}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      contactInfo: {
                        ...profileData.contactInfo,
                        location: e.target.value,
                      },
                    })
                  }}
                  placeholder="e.g. San Francisco, CA"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Override location information from GitHub</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <Label>Additional Social Links</Label>
                  <Button size="sm" variant="outline" onClick={() => setIsSocialDialogOpen(true)}>
                    <Plus size={14} className="mr-1" />
                    Add Link
                  </Button>
                </div>

                {profileData.contactInfo?.socials && profileData.contactInfo.socials.length > 0 ? (
                  <div className="space-y-2">
                    {profileData.contactInfo.socials.map((social, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
                      >
                        <div>
                          <p className="font-medium">{social.platform}</p>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            {social.url}
                          </a>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteSocialLink(index)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No additional social links added</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Skills & Technologies</h3>
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g. JavaScript)"
                className="flex-grow"
              />
              <Button type="submit">Add</Button>
            </form>

            <div className="flex flex-wrap gap-2 mt-2">
              {profileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
                  >
                    <X size={12} />
                    <span className="sr-only">Remove {skill}</span>
                  </button>
                </Badge>
              ))}
              {profileData.skills.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">No skills added yet</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional skills-related content can be added here if needed */}
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="showProjects">Show Projects</Label>
                  <Switch
                    id="showProjects"
                    checked={profileData.showProjects}
                    onCheckedChange={(checked) => handleSwitchChange("showProjects", checked)}
                  />
                </div>
                <Button
                  onClick={() => {
                    setNewProject({
                      title: "",
                      description: "",
                      technologies: [],
                      image: "/placeholder.svg",
                      repoUrl: "",
                      liveUrl: "",
                    })
                    setEditingProjectIndex(null)
                    setIsProjectDialogOpen(true)
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Add Project
                </Button>
              </div>
            </div>

            {profileData.projects && profileData.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.projects.map((project, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="ghost" size="sm" onClick={() => handleEditProject(index)}>
                        <Edit2 size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(index)}>
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No projects added yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Click "Add Project" to showcase your work
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="showTimeline">Show Experience</Label>
                  <Switch
                    id="showTimeline"
                    checked={profileData.showTimeline}
                    onCheckedChange={(checked) => handleSwitchChange("showTimeline", checked)}
                  />
                </div>
                <Button
                  onClick={() => {
                    setNewExperience({
                      title: "",
                      organization: "",
                      period: "",
                      description: "",
                      tags: [],
                    })
                    setEditingExperienceIndex(null)
                    setIsExperienceDialogOpen(true)
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Add Experience
                </Button>
              </div>
            </div>

            {profileData.timeline && profileData.timeline.length > 0 ? (
              <div className="space-y-4">
                {profileData.timeline.map((experience, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{experience.title}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{experience.organization}</p>
                        </div>
                        <p className="text-sm text-gray-500">{experience.period}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{experience.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {experience.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="ghost" size="sm" onClick={() => handleEditExperience(index)}>
                        <Edit2 size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteExperience(index)}>
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No work experience added yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Click "Add Experience" to showcase your professional background
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              <div className="flex items-center gap-2">
                <Label htmlFor="showEducation">Show Education</Label>
                <Switch
                  id="showEducation"
                  checked={profileData.showEducation}
                  onCheckedChange={(checked) => handleSwitchChange("showEducation", checked)}
                />
              </div>
            </div>
            <EducationForm profileData={profileData} setProfileData={setProfileData} />
          </div>
        </TabsContent>

        {/* Settings Tab */}

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Template Customization</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-select">Choose a Template</Label>
                <Select value={activeTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern - Clean and professional</SelectItem>
                    <SelectItem value="minimal">Minimal - Simple and elegant</SelectItem>
                    <SelectItem value="creative">Creative - Eye-catching and unique</SelectItem>
                    <SelectItem value="developer">Developer - Code-focused and technical</SelectItem>
                    <SelectItem value="professional">Professional - Business-oriented and polished</SelectItem>
                    <SelectItem value="elegant">Elegant - Sophisticated and refined</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color Theme</Label>
                <ColorPicker colors={profileData.colors} onChange={handleColorChange} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Customize the colors used in your profile README template
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                <p className="font-medium mb-1">
                  Selected Template: {activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeTemplate === "modern" && "Clean and professional layout with a focus on readability"}
                  {activeTemplate === "minimal" && "Simple and elegant design with minimalist aesthetics"}
                  {activeTemplate === "creative" && "Eye-catching and unique style with colorful elements"}
                  {activeTemplate === "developer" &&
                    "Code-focused design with technical elements and syntax highlighting"}
                  {activeTemplate === "professional" && "Business-oriented layout with a corporate, polished feel"}
                  {activeTemplate === "elegant" && "Sophisticated and refined design with subtle, tasteful elements"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">GitHub Stats & Widgets</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stats">GitHub Stats</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your GitHub statistics</p>
                </div>
                <Switch
                  id="stats"
                  checked={profileData.stats}
                  onCheckedChange={(checked) => handleSwitchChange("stats", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="streak">GitHub Streak</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your GitHub streak statistics</p>
                </div>
                <Switch
                  id="streak"
                  checked={profileData.streak}
                  onCheckedChange={(checked) => handleSwitchChange("streak", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="topLangs">Top Languages</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your most used programming languages</p>
                </div>
                <Switch
                  id="topLangs"
                  checked={profileData.topLangs}
                  onCheckedChange={(checked) => handleSwitchChange("topLangs", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="visitors">Profile Visitors</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show profile visitor count</p>
                </div>
                <Switch
                  id="visitors"
                  checked={profileData.visitors}
                  onCheckedChange={(checked) => handleSwitchChange("visitors", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showRepos">Featured Repositories</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your pinned repositories</p>
                </div>
                <Switch
                  id="showRepos"
                  checked={profileData.showRepos}
                  onCheckedChange={(checked) => handleSwitchChange("showRepos", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showContribGraph">Contribution Graph</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your GitHub contribution graph</p>
                </div>
                <Switch
                  id="showContribGraph"
                  checked={profileData.showContribGraph}
                  onCheckedChange={(checked) => handleSwitchChange("showContribGraph", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showTrophies">Achievement Trophies</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your GitHub achievement trophies</p>
                </div>
                <Switch
                  id="showTrophies"
                  checked={profileData.showTrophies}
                  onCheckedChange={(checked) => handleSwitchChange("showTrophies", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Repository Card Customization</h3>
            <RepositoryCustomizer
              repoSettings={profileData.repoSettings || defaultRepoSettings}
              setRepoSettings={(settings) => {
                setProfileData({
                  ...profileData,
                  repoSettings: settings,
                })
              }}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Content Sections</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showProjects">Projects Section</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your projects showcase</p>
                </div>
                <Switch
                  id="showProjects"
                  checked={profileData.showProjects}
                  onCheckedChange={(checked) => handleSwitchChange("showProjects", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showBlog">Blog Posts</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your latest blog posts</p>
                </div>
                <Switch
                  id="showBlog"
                  checked={profileData.showBlog}
                  onCheckedChange={(checked) => handleSwitchChange("showBlog", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showTimeline">Work Experience</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your professional timeline</p>
                </div>
                <Switch
                  id="showTimeline"
                  checked={profileData.showTimeline}
                  onCheckedChange={(checked) => handleSwitchChange("showTimeline", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showEducation">Education</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show your educational background</p>
                </div>
                <Switch
                  id="showEducation"
                  checked={profileData.showEducation}
                  onCheckedChange={(checked) => handleSwitchChange("showEducation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showContact">Contact Information</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show contact section</p>
                </div>
                <Switch
                  id="showContact"
                  checked={profileData.showContact}
                  onCheckedChange={(checked) => handleSwitchChange("showContact", checked)}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProjectIndex !== null ? "Edit Project" : "Add New Project"}</DialogTitle>
            <DialogDescription>Add details about your project to showcase in your GitHub profile.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                name="title"
                value={newProject.title}
                onChange={handleProjectInputChange}
                placeholder="e.g. Portfolio Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                name="description"
                value={newProject.description}
                onChange={handleProjectInputChange}
                placeholder="Brief description of your project"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-image">Image URL</Label>
              <Input
                id="project-image"
                name="image"
                value={newProject.image}
                onChange={handleProjectInputChange}
                placeholder="e.g. https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">Leave as is for a placeholder image</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-repo">Repository URL</Label>
                <Input
                  id="project-repo"
                  name="repoUrl"
                  value={newProject.repoUrl}
                  onChange={handleProjectInputChange}
                  placeholder="e.g. https://github.com/username/repo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-live">Live Demo URL</Label>
                <Input
                  id="project-live"
                  name="liveUrl"
                  value={newProject.liveUrl}
                  onChange={handleProjectInputChange}
                  placeholder="e.g. https://myproject.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <form onSubmit={handleAddProjectSkill} className="flex gap-2">
                <Input
                  value={newProjectSkill}
                  onChange={(e) => setNewProjectSkill(e.target.value)}
                  placeholder="e.g. React"
                  className="flex-grow"
                />
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {tech}
                    <button
                      onClick={() => handleRemoveProjectSkill(tech)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
                    >
                      <X size={12} />
                      <span className="sr-only">Remove {tech}</span>
                    </button>
                  </Badge>
                ))}
                {newProject.technologies.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No technologies added yet</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddProject}>
              {editingProjectIndex !== null ? "Update Project" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Experience Dialog */}
      <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExperienceIndex !== null ? "Edit Experience" : "Add Work Experience"}</DialogTitle>
            <DialogDescription>
              Add details about your work experience to showcase in your GitHub profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="experience-title">Job Title</Label>
              <Input
                id="experience-title"
                name="title"
                value={newExperience.title}
                onChange={handleExperienceInputChange}
                placeholder="e.g. Senior Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-organization">Company/Organization</Label>
              <Input
                id="experience-organization"
                name="organization"
                value={newExperience.organization}
                onChange={handleExperienceInputChange}
                placeholder="e.g. Tech Innovations Inc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-period">Time Period</Label>
              <Input
                id="experience-period"
                name="period"
                value={newExperience.period}
                onChange={handleExperienceInputChange}
                placeholder="e.g. 2020 - Present"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-description">Description</Label>
              <Textarea
                id="experience-description"
                name="description"
                value={newExperience.description}
                onChange={handleExperienceInputChange}
                placeholder="Brief description of your responsibilities and achievements"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Skills/Technologies</Label>
              <form onSubmit={handleAddExperienceTag} className="flex gap-2">
                <Input
                  value={newExperienceTag}
                  onChange={(e) => setNewExperienceTag(e.target.value)}
                  placeholder="e.g. React"
                  className="flex-grow"
                />
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 mt-2">
                {newExperience.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveExperienceTag(tag)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
                    >
                      <X size={12} />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </Badge>
                ))}
                {newExperience.tags.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No skills/technologies added yet</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddExperience}>
              {editingExperienceIndex !== null ? "Update Experience" : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Social Link Dialog */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Social Link</DialogTitle>
            <DialogDescription>Add a custom social media or website link to your profile.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="social-platform">Platform</Label>
              <Input
                id="social-platform"
                name="platform"
                value={newSocialLink.platform}
                onChange={handleSocialLinkInputChange}
                placeholder="e.g. Instagram, YouTube, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social-url">URL</Label>
              <Input
                id="social-url"
                name="url"
                value={newSocialLink.url}
                onChange={handleSocialLinkInputChange}
                placeholder="e.g. https://instagram.com/username"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddSocialLink}>Add Social Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
