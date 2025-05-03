"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedProfileForm } from "@/components/enhanced-profile-form";
import { ProfilePreview } from "@/components/profile-preview";
import { useToast } from "@/hooks/use-toast";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { trackEvent } from "@/utils/analytics";
import { fetchGitHubData } from "@/services/github";
import { generateMarkdown } from "@/utils/markdown-generator";
import {
  defaultProfileData,
  defaultSections,
  defaultThemes,
} from "@/data/default-data";
import { ElegantLandingPage } from "@/components/elegant-landing-page";
import { TooltipGuide } from "@/components/tooltip-guide";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfettiButton } from "@/components/confetti-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [isFetching, setIsFetching] = useState(false);
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [sections, setSections] = useState(defaultSections);
  const [themes] = useState(defaultThemes);
  const [currentTheme, setCurrentTheme] = useState("Default");
  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [expandedPreview, setExpandedPreview] = useState(false);
  const [isLoadingFromStorage, setIsLoadingFromStorage] = useState(true);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);

  // Guide steps for the tooltip tour
  const guideSteps = [
    {
      target: "#profile-tab",
      content: "Start by filling in your basic information in the Profile tab.",
      position: "bottom",
    },
    {
      target: "#github-username",
      content:
        "Enter your GitHub username and click 'Fetch Data' to automatically import your GitHub stats.",
      position: "right",
    },
    {
      target: "#skills-tab",
      content:
        "Add your technical skills and technologies you're proficient in.",
      position: "bottom",
    },
    {
      target: "#template-select",
      content:
        "Choose from 6 professionally designed templates to match your style.",
      position: "left",
    },
    {
      target: "#preview-tab",
      content:
        "Preview how your GitHub profile will look and copy the markdown when you're done.",
      position: "bottom",
    },
  ];

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const loadProfileFromStorage = () => {
      setIsLoadingFromStorage(true);
      try {
        const savedProfile = localStorage.getItem("github-profile-data");
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfileData(parsedProfile);

          // If template was saved, restore it
          const savedTemplate = localStorage.getItem("github-profile-template");
          if (savedTemplate) {
            setActiveTemplate(savedTemplate);
          }

          setHasLoadedFromStorage(true);

          // Track successful profile load
          trackEvent(
            "profile_loaded",
            "storage_action",
            "load_from_localstorage"
          );

          toast({
            title: "Profile loaded",
            description:
              "Your saved profile has been loaded from browser storage",
          });
        }
      } catch (error) {
        console.error("Error loading profile from localStorage:", error);

        // Track error in loading profile
        trackEvent("profile_load_error", "storage_action", "load_error");

        toast({
          title: "Error loading profile",
          description:
            "Could not load your saved profile. Using default profile instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingFromStorage(false);
      }
    };

    // Only load from storage if not on landing page
    if (!showLandingPage) {
      loadProfileFromStorage();
    }
  }, [showLandingPage, toast]);

  // Handle theme change
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme.name);
    setProfileData({
      ...profileData,
      colors: {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
      },
    });

    // Track theme change
    trackEvent("theme_changed", "user_preference", theme.name);
  };

  // Handle section visibility toggle
  const handleToggleSection = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, visible: !section.visible }
          : section
      )
    );

    // Update profileData for the corresponding switches
    if (sectionId === "stats") {
      setProfileData({ ...profileData, stats: !profileData.stats });
    } else if (sectionId === "repos") {
      setProfileData({ ...profileData, showRepos: !profileData.showRepos });
    } else if (sectionId === "projects") {
      setProfileData({
        ...profileData,
        showProjects: !profileData.showProjects,
      });
    } else if (sectionId === "blog") {
      setProfileData({ ...profileData, showBlog: !profileData.showBlog });
    } else if (sectionId === "timeline") {
      setProfileData({
        ...profileData,
        showTimeline: !profileData.showTimeline,
      });
    } else if (sectionId === "education") {
      setProfileData({
        ...profileData,
        showEducation: !profileData.showEducation,
      });
    } else if (sectionId === "contact") {
      setProfileData({ ...profileData, showContact: !profileData.showContact });
    }

    // Track section toggle
    const newState = !sections.find((section) => section.id === sectionId)
      .visible;
    trackEvent(
      newState ? "section_enabled" : "section_disabled",
      "user_preference",
      sectionId
    );
  };

  // Handle section reordering
  const handleMoveSection = (sectionId, direction) => {
    const sectionIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    if (
      (direction === "up" && sectionIndex === 0) ||
      (direction === "down" && sectionIndex === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex =
      direction === "up" ? sectionIndex - 1 : sectionIndex + 1;
    const temp = newSections[targetIndex];
    newSections[targetIndex] = newSections[sectionIndex];
    newSections[sectionIndex] = temp;

    setSections(newSections);

    // Track section reordering
    trackEvent("section_reordered", "user_action", `${sectionId}_${direction}`);
  };

  // Auto-generate markdown whenever profileData or activeTemplate changes
  useEffect(() => {
    setGeneratedMarkdown(generateMarkdown(profileData, activeTemplate));

    // Save template preference to localStorage
    if (!isLoadingFromStorage) {
      localStorage.setItem("github-profile-template", activeTemplate);
    }
  }, [profileData, activeTemplate, isLoadingFromStorage]);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description:
        "You can now paste this into your GitHub profile README.md file",
    });

    // Track this action in Google Analytics
    trackEvent("copy_markdown", "user_action", activeTemplate);

    // Show confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => setCopied(false), 2000);
  };

  // Handle template selection
  const handleTemplateChange = (value) => {
    setActiveTemplate(value);

    // Track template selection in Google Analytics
    trackEvent("select_template", "user_preference", value);
  };

  // Fetch GitHub data
  const handleFetchGitHubData = async (username) => {
    if (!username) return;

    setIsFetching(true);
    try {
      const updatedData = await fetchGitHubData(username, profileData);
      setProfileData(updatedData);

      // Track successful GitHub data fetch
      trackEvent("github_data_fetched", "api_action", username);

      toast({
        title: "GitHub data fetched successfully",
        description: `Found user ${updatedData.name || username} with ${
          updatedData.publicRepos || 0
        } repositories`,
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);

      // Track error in fetching GitHub data
      trackEvent(
        "github_data_error",
        "api_action",
        error.message || "unknown_error"
      );

      toast({
        title: "Error fetching data",
        description:
          error.message || "Could not fetch GitHub data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  // Reset profile to default
  const handleResetProfile = () => {
    setProfileData(defaultProfileData);
    setActiveTemplate("modern");
    localStorage.removeItem("github-profile-data");
    localStorage.removeItem("github-profile-template");
    setHasLoadedFromStorage(false);
    setShowResetAlert(false);

    // Track profile reset
    trackEvent("profile_reset", "storage_action", "reset_to_default");

    toast({
      title: "Profile reset",
      description: "Your profile has been reset to default settings",
    });
  };

  // Start the builder
  const handleStartBuilder = () => {
    setShowLandingPage(false);
    // Show the guide after a short delay
    setTimeout(() => setShowGuide(true), 1000);

    // Track this action in Google Analytics
    trackEvent("start_builder", "user_action", "landing_page");
  };

  // Track tab changes
  const handleTabChange = (tab) => {
    trackEvent("tab_changed", "navigation", tab);
  };

  // Track preview expansion
  const toggleExpandPreview = () => {
    const newState = !expandedPreview;
    setExpandedPreview(newState);
    trackEvent(
      newState ? "preview_expanded" : "preview_collapsed",
      "user_action",
      "preview_toggle"
    );
  };

  if (showLandingPage) {
    return <ElegantLandingPage onStartBuilder={handleStartBuilder} />;
  }

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <ThemeToggle />
        <TooltipGuide
          steps={guideSteps}
          isOpen={showGuide}
          onClose={() => {
            setShowGuide(false);
            trackEvent("guide_closed", "user_action", "tooltip_guide");
          }}
        />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold tracking-tight shimmer-effect">
              GitHub Profile README Builder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Create an impressive GitHub profile page with our easy-to-use
              builder
            </p>
          </motion.div>

          {hasLoadedFromStorage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Alert className="bg-primary/10 border-primary/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <div>
                      <AlertTitle>
                        Profile loaded from browser storage
                      </AlertTitle>
                      <AlertDescription>
                        Your previously saved profile has been loaded. Any
                        changes will be automatically saved.
                      </AlertDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowResetAlert(true);
                      trackEvent(
                        "reset_button_clicked",
                        "user_action",
                        "reset_profile"
                      );
                    }}
                    className="ml-4"
                  >
                    Reset to Default
                  </Button>
                </div>
              </Alert>
            </motion.div>
          )}

          {showResetAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 mr-2" />
                <div className="flex justify-between items-center w-full">
                  <div>
                    <AlertTitle>Reset profile to default?</AlertTitle>
                    <AlertDescription>
                      This will delete your saved profile and cannot be undone.
                    </AlertDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleResetProfile}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowResetAlert(false);
                        trackEvent(
                          "reset_cancelled",
                          "user_action",
                          "cancel_reset"
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Alert>
            </motion.div>
          )}

          {isLoadingFromStorage ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <RefreshCw
                  size={40}
                  className="mx-auto animate-spin text-primary mb-4"
                />
                <p className="text-lg font-medium">Loading your profile...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Retrieving your saved data
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <EnhancedProfileForm
                      profileData={profileData}
                      setProfileData={setProfileData}
                      activeTemplate={activeTemplate}
                      setActiveTemplate={handleTemplateChange}
                      handleGenerateMarkdown={generateMarkdown}
                      fetchGitHubData={handleFetchGitHubData}
                      isFetching={isFetching}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preview Section */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  className={`flex-grow shadow-md hover:shadow-lg transition-shadow ${
                    expandedPreview ? "fixed inset-4 z-50 overflow-auto" : ""
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Preview</h2>
                      <div className="flex gap-2">
                        <ConfettiButton
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="flex items-center gap-1"
                          confettiColors={[
                            profileData.colors.primary,
                            profileData.colors.secondary,
                            profileData.colors.accent,
                          ]}
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? "Copied" : "Copy Markdown"}
                        </ConfettiButton>
                      </div>
                    </div>

                    <Tabs
                      defaultValue="preview"
                      className="w-full"
                      onValueChange={handleTabChange}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview" id="preview-tab">
                          Visual Preview
                        </TabsTrigger>
                        <TabsTrigger value="markdown">Markdown</TabsTrigger>
                        <TabsTrigger value="contributions">
                          Contribution Graph
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="preview"
                        className="border rounded-md p-4 mt-4 min-h-[500px] bg-white dark:bg-gray-950"
                      >
                        <ProfilePreview
                          profileData={profileData}
                          template={activeTemplate}
                        />
                      </TabsContent>
                      <TabsContent value="markdown" className="mt-4">
                        <div className="relative">
                          <Textarea
                            className="font-mono text-sm h-[500px] resize-none p-4 border-2 focus:border-primary/50 transition-colors"
                            value={generatedMarkdown}
                            readOnly
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={handleCopy}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="contributions" className="mt-4">
                        {profileData.github ? (
                          <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 border rounded-md p-4">
                              <h3 className="text-lg font-semibold mb-4">
                                GitHub Contribution Graph
                              </h3>
                              <GitHubContributionGraph
                                username={profileData.github}
                                theme={currentTheme.toLowerCase()}
                              />
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                              <p>
                                This contribution graph is automatically
                                generated based on your GitHub username.
                              </p>
                              <p>
                                It will be included in your README when you
                                enable the "Contribution Graph" option in
                                Settings.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-gray-500 dark:text-gray-400">
                              Please enter your GitHub username in the Profile
                              tab
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                              The contribution graph will be generated
                              automatically
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}
