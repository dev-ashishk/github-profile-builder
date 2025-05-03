"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Trash2, Edit2, GraduationCap } from "lucide-react"
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

export function EducationForm({ profileData, setProfileData }) {
  const { toast } = useToast()
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false)
  const [editingEducationIndex, setEditingEducationIndex] = useState(null)
  const [newAchievement, setNewAchievement] = useState("")
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    logo: "",
    gpa: "",
    achievements: [],
  })

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target
    setNewEducation({
      ...newEducation,
      [name]: value,
    })
  }

  const handleAddAchievement = (e) => {
    e.preventDefault()
    if (newAchievement.trim() && !newEducation.achievements.includes(newAchievement.trim())) {
      setNewEducation({
        ...newEducation,
        achievements: [...newEducation.achievements, newAchievement.trim()],
      })
      setNewAchievement("")
    }
  }

  const handleRemoveAchievement = (achievementToRemove) => {
    setNewEducation({
      ...newEducation,
      achievements: newEducation.achievements.filter((achievement) => achievement !== achievementToRemove),
    })
  }

  const handleAddEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter an institution and degree",
        variant: "destructive",
      })
      return
    }

    if (editingEducationIndex !== null) {
      // Update existing education
      const updatedEducation = [...(profileData.education || [])]
      updatedEducation[editingEducationIndex] = newEducation

      setProfileData({
        ...profileData,
        education: updatedEducation,
      })

      setEditingEducationIndex(null)
    } else {
      // Add new education
      setProfileData({
        ...profileData,
        education: [...(profileData.education || []), newEducation],
      })
    }

    // Reset form
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      logo: "",
      gpa: "",
      achievements: [],
    })

    setIsEducationDialogOpen(false)

    toast({
      title: editingEducationIndex !== null ? "Education updated" : "Education added",
      description:
        editingEducationIndex !== null
          ? "Your education has been updated successfully"
          : "Your education has been added to your profile",
    })
  }

  const handleEditEducation = (index) => {
    setNewEducation({ ...profileData.education[index] })
    setEditingEducationIndex(index)
    setIsEducationDialogOpen(true)
  }

  const handleDeleteEducation = (index) => {
    const updatedEducation = [...profileData.education]
    updatedEducation.splice(index, 1)

    setProfileData({
      ...profileData,
      education: updatedEducation,
    })

    toast({
      title: "Education deleted",
      description: "The education entry has been removed from your profile",
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button
          onClick={() => {
            setNewEducation({
              institution: "",
              degree: "",
              field: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
              logo: "",
              gpa: "",
              achievements: [],
            })
            setEditingEducationIndex(null)
            setIsEducationDialogOpen(true)
          }}
        >
          <Plus size={16} className="mr-2" />
          Add Education
        </Button>
      </div>

      {profileData.education && profileData.education.length > 0 ? (
        <div className="space-y-4">
          {profileData.education.map((education, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{education.degree}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{education.institution}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {education.startDate} - {education.endDate || "Present"}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {education.field && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Field: {education.field}</p>
                )}
                {education.location && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Location: {education.location}</p>
                )}
                {education.gpa && <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">GPA: {education.gpa}</p>}
                {education.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{education.description}</p>
                )}

                {education.achievements && education.achievements.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Achievements:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                      {education.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm" onClick={() => handleEditEducation(index)}>
                  <Edit2 size={14} className="mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteEducation(index)}>
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <GraduationCap size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">No education added yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click "Add Education" to showcase your academic background
          </p>
        </div>
      )}

      {/* Education Dialog */}
      <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEducationIndex !== null ? "Edit Education" : "Add Education"}</DialogTitle>
            <DialogDescription>
              Add details about your educational background to showcase in your GitHub profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution/University</Label>
                <Input
                  id="institution"
                  name="institution"
                  value={newEducation.institution}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. Stanford University"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  value={newEducation.degree}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. Bachelor's, Master's, PhD"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  name="field"
                  value={newEducation.field}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={newEducation.location}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  value={newEducation.startDate}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. 2018"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  value={newEducation.endDate}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. 2022 or Present"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  name="gpa"
                  value={newEducation.gpa}
                  onChange={handleEducationInputChange}
                  placeholder="e.g. 3.8/4.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newEducation.description}
                onChange={handleEducationInputChange}
                placeholder="Brief description of your studies or research"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL (Optional)</Label>
              <Input
                id="logo"
                name="logo"
                value={newEducation.logo}
                onChange={handleEducationInputChange}
                placeholder="e.g. https://example.com/university-logo.png"
              />
              <p className="text-xs text-gray-500">Leave empty for a default icon</p>
            </div>

            <div className="space-y-2">
              <Label>Achievements</Label>
              <form onSubmit={handleAddAchievement} className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="e.g. Dean's List, Scholarship"
                  className="flex-grow"
                />
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 mt-2">
                {newEducation.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {achievement}
                    <button
                      onClick={() => handleRemoveAchievement(achievement)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
                    >
                      <X size={12} />
                      <span className="sr-only">Remove {achievement}</span>
                    </button>
                  </Badge>
                ))}
                {newEducation.achievements.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No achievements added yet</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddEducation}>
              {editingEducationIndex !== null ? "Update Education" : "Add Education"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
