"use client";

import {
  Github,
  ArrowRight,
  Code,
  Sparkles,
  Star,
  GitFork,
  FileCode,
  User,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

export function ElegantLandingPage({ onStartBuilder }) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleSectionHover = (section) => {
    setHoveredSection(section);
    // We don't track hover events to avoid excessive analytics events
  };

  const handleSectionClick = (section) => {
    const newExpandedState = expandedSection === section ? null : section;
    setExpandedSection(newExpandedState);

    // Track section interaction in Google Analytics
    trackEvent(
      newExpandedState ? "section_expanded" : "section_collapsed",
      "landing_page_interaction",
      section
    );
  };

  const handleStartBuilding = () => {
    // Track the start building button click
    trackEvent("start_building", "landing_page_action", "primary_cta");
    onStartBuilder();
  };

  const handleGitHubLink = () => {
    // Track GitHub link click
    trackEvent("github_link_click", "landing_page_action", "secondary_cta");
  };

  const handlePreviewClick = () => {
    // Track preview button click
    trackEvent("preview_click", "landing_page_interaction", "code_preview");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Decorative circles */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-secondary/10 to-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Main content */}
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-8">
          {/* Left side - Text content */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm">
              <Github size={16} className="text-primary" />
              <span>Elevate your GitHub profile</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              GitHub Profile <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4535c7] via-[#5847eb] to-[#7a6cf0] animated-gradient">
                README Builder
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              Create an impressive GitHub profile in minutes with our elegant,
              easy-to-use builder
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 group"
                onClick={handleStartBuilding}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span>Start Building</span>
                <motion.div
                  animate={{ x: isHovering ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              </Button>

              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a
                  href="https://github.com/dev-ashishk/github-profile-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGitHubLink}
                >
                  <Github size={18} />
                  <span>View on GitHub</span>
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Code size={14} />
                <span>6 Templates</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles size={14} />
                <span>No login required</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Interactive code preview */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5847eb] to-[#7a6cf0] rounded-lg blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                {/* Code preview with interactive elements */}
                <div className="p-1">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      README.md
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="text-gray-500 hover:text-primary transition-colors"
                            onClick={handlePreviewClick}
                          >
                            <ExternalLink size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preview in full screen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-4 font-mono text-sm overflow-hidden text-gray-800 dark:text-gray-200">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="space-y-4"
                    >
                      {/* Header section - interactive */}
                      <div
                        className={`flex items-center gap-2 ${
                          hoveredSection === "header"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("header")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("header")}
                        data-section="header"
                      >
                        <User
                          size={18}
                          className={`${
                            hoveredSection === "header"
                              ? "text-primary"
                              : "text-primary/80"
                          } transition-colors duration-200`}
                        />
                        <span className="font-semibold">
                          Hi there, I'm John Doe 👋
                        </span>
                        {hoveredSection === "header" && (
                          <span className="ml-auto text-xs text-primary opacity-80">
                            Edit header
                          </span>
                        )}
                      </div>

                      {expandedSection === "header" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Change your name and greeting
                            <br />• Add a professional title
                            <br />• Include a personal tagline
                          </div>
                        </motion.div>
                      )}

                      {/* Bio section - interactive */}
                      <div
                        className={`${
                          hoveredSection === "bio"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("bio")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("bio")}
                        data-section="bio"
                      >
                        <div className="text-gray-700 dark:text-gray-300">
                          Full Stack Developer passionate about creating elegant
                          solutions
                          {hoveredSection === "bio" && (
                            <span className="ml-2 text-xs text-primary opacity-80">
                              Edit bio
                            </span>
                          )}
                        </div>
                      </div>

                      {expandedSection === "bio" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Describe your expertise
                            <br />• Mention your interests
                            <br />• Share what you're working on
                          </div>
                        </motion.div>
                      )}

                      {/* Skills section - interactive */}
                      <div
                        className={`flex items-center gap-2 ${
                          hoveredSection === "skills"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("skills")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("skills")}
                        data-section="skills"
                      >
                        <Code
                          size={14}
                          className={`${
                            hoveredSection === "skills"
                              ? "text-secondary"
                              : "text-gray-600 dark:text-gray-400"
                          } transition-colors duration-200`}
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          <span
                            className={
                              hoveredSection === "skills"
                                ? "text-secondary"
                                : ""
                            }
                          >
                            JavaScript
                          </span>{" "}
                          |
                          <span
                            className={
                              hoveredSection === "skills"
                                ? "text-secondary"
                                : ""
                            }
                          >
                            {" "}
                            React
                          </span>{" "}
                          |
                          <span
                            className={
                              hoveredSection === "skills"
                                ? "text-secondary"
                                : ""
                            }
                          >
                            {" "}
                            Node.js
                          </span>{" "}
                          |
                          <span
                            className={
                              hoveredSection === "skills"
                                ? "text-secondary"
                                : ""
                            }
                          >
                            {" "}
                            TypeScript
                          </span>
                        </span>
                        {hoveredSection === "skills" && (
                          <span className="ml-auto text-xs text-primary opacity-80">
                            Edit skills
                          </span>
                        )}
                      </div>

                      {expandedSection === "skills" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Add your technical skills
                            <br />• Highlight your expertise
                            <br />• Show language proficiency
                          </div>
                        </motion.div>
                      )}

                      {/* Stats section - interactive */}
                      <div
                        className={`flex items-center gap-4 ${
                          hoveredSection === "stats"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("stats")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("stats")}
                        data-section="stats"
                      >
                        <div className="flex items-center gap-1">
                          <Star
                            size={14}
                            className={`fill-current ${
                              hoveredSection === "stats"
                                ? "text-yellow-500"
                                : "text-yellow-600 dark:text-yellow-500"
                            } transition-colors duration-200`}
                          />
                          <span className="text-xs">120 stars</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork
                            size={14}
                            className={`${
                              hoveredSection === "stats"
                                ? "text-blue-500"
                                : "text-blue-600 dark:text-blue-500"
                            } transition-colors duration-200`}
                          />
                          <span className="text-xs">48 forks</span>
                        </div>
                        {hoveredSection === "stats" && (
                          <span className="ml-auto text-xs text-primary opacity-80">
                            Edit stats
                          </span>
                        )}
                      </div>

                      {expandedSection === "stats" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Display GitHub statistics
                            <br />• Show contribution graph
                            <br />• Add achievement badges
                          </div>
                        </motion.div>
                      )}

                      {/* Projects section - interactive */}
                      <div
                        className={`border-t border-gray-200 dark:border-gray-800 pt-3 ${
                          hoveredSection === "projects"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md border-0 pt-4"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("projects")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("projects")}
                        data-section="projects"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FileCode
                            size={14}
                            className={`${
                              hoveredSection === "projects"
                                ? "text-secondary"
                                : "text-secondary/80"
                            } transition-colors duration-200`}
                          />
                          <span className="font-medium">Featured Projects</span>
                          {hoveredSection === "projects" && (
                            <span className="ml-auto text-xs text-primary opacity-80">
                              Edit projects
                            </span>
                          )}
                        </div>
                        <ul className="list-disc list-inside text-xs space-y-1 text-gray-700 dark:text-gray-300">
                          <li
                            className={
                              hoveredSection === "projects"
                                ? "text-secondary/90"
                                : ""
                            }
                          >
                            React Dashboard
                          </li>
                          <li
                            className={
                              hoveredSection === "projects"
                                ? "text-secondary/90"
                                : ""
                            }
                          >
                            Node.js API
                          </li>
                          <li
                            className={
                              hoveredSection === "projects"
                                ? "text-secondary/90"
                                : ""
                            }
                          >
                            TypeScript Library
                          </li>
                        </ul>
                      </div>

                      {expandedSection === "projects" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Showcase your best work
                            <br />• Add project descriptions
                            <br />• Include links to repositories
                          </div>
                        </motion.div>
                      )}

                      {/* Contact section - interactive */}
                      <div
                        className={`flex items-center gap-2 ${
                          hoveredSection === "contact"
                            ? "bg-gray-100 dark:bg-gray-800/60 -mx-2 px-2 py-1 rounded-md"
                            : ""
                        } transition-all duration-200 cursor-pointer`}
                        onMouseEnter={() => handleSectionHover("contact")}
                        onMouseLeave={() => handleSectionHover(null)}
                        onClick={() => handleSectionClick("contact")}
                        data-section="contact"
                      >
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Mail
                              size={12}
                              className={`${
                                hoveredSection === "contact"
                                  ? "text-primary"
                                  : ""
                              } transition-colors duration-200`}
                            />
                            <span>john@example.com</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin
                              size={12}
                              className={`${
                                hoveredSection === "contact"
                                  ? "text-primary"
                                  : ""
                              } transition-colors duration-200`}
                            />
                            <span>San Francisco, CA</span>
                          </div>
                        </div>
                        {hoveredSection === "contact" && (
                          <span className="ml-auto text-xs text-primary opacity-80">
                            Edit contact
                          </span>
                        )}
                      </div>

                      {expandedSection === "contact" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-xs border-l-2 border-primary/30 ml-2"
                        >
                          <div className="text-gray-600 dark:text-gray-400">
                            • Add contact information
                            <br />• Include social media links
                            <br />• Share your location
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Github size={24} className="text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1,
                }}
              >
                <Code size={24} className="text-secondary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
