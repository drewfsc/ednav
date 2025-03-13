"use client"

import React, {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"

// Import the guided questions JSON
// const guidedQuestions = {
//   adult: {
//     referred: [
//       "NWTC",
//       "Western Tech",
//       "LTC",
//       "WTC",
//       "NCTC",
//       "BTC",
//       "FVTC (Fox Valley Tech)",
//       "Mid-State",
//       "MATC (Madison College)",
//       "Omega School",
//       "Northwoods Tech",
//       "Oneida Community Educational Center",
//       "Medford Adult Diploma Academy",
//       "HSED",
//       "GED",
//       "ADVOCAP",
//       "ADRC",
//       "Kahoot.com",
//       "ESL",
//       "Test Prep Champions",
//     ],
//     enrolled: [
//       "NWTC",
//       "Western Tech",
//       "LTC",
//       "WTC",
//       "NCTC",
//       "BTC",
//       "FVTC (Fox Valley Tech)",
//       "Mid-State",
//       "MATC (Madison College)",
//       "Omega School",
//       "Northwoods Tech",
//       "Oneida Community Educational Center",
//       "Medford Adult Diploma Academy",
//     ],
//     graduated: [
//       "NWTC",
//       "Western Tech",
//       "LTC",
//       "WTC",
//       "NCTC",
//       "BTC",
//       "FVTC (Fox Valley Tech)",
//       "Mid-State",
//       "MATC (Madison College)",
//       "Omega School",
//       "Northwoods Tech",
//       "Oneida Community Educational Center",
//       "Medford Adult Diploma Academy",
//     ],
//     completed: [
//       "TABE",
//       "WOWI Career Assessment",
//       "GED Ready - RLA",
//       "GED Ready - Social Studies",
//       "GED Ready - Science",
//       "GED Ready - Math",
//       "GED - TABE",
//       "GED - GED.com account",
//       "GED - Career Assessment",
//       "GED - Orientation",
//       "GED - ROI",
//       "GED - Civics",
//       "GED - RLA",
//       "GED - Social Studies",
//       "GED - Science",
//       "GED - Math",
//       "HSED - TABE",
//       "HSED - GED.com account",
//       "HSED - Career Assessment",
//       "HSED - Orientation",
//       "HSED - ROI",
//       "HSED - HS Transcript",
//       "HSED - Employability",
//       "HSED - Health",
//       "HSED - Civics",
//       "HSED - RLA",
//       "HSED - Social Studies",
//       "HSED - Science",
//       "HSED - Math",
//       "HSED - 17-16",
//       "HSED - Journey Letter",
//     ],
//     needs: [
//       "money",
//       "food",
//       "transportation",
//       "shelter",
//       "legal help",
//       "mental health treatment",
//       "medical treatment",
//       "career assessment",
//       "GED.com account",
//       "GED Ready - RLA",
//       "GED Ready - Social Studies",
//       "GED Ready - Science",
//       "GED Ready - Math",
//     ],
//     obtained: ["transcripts", "journey letter", "GED", "HSED"],
//     inactive: [
//       "W-2 Case Closed",
//       "Graduated",
//       "Participant Declined Assistance",
//       "Participant Request (Barriers)",
//       "No contact with EN for 60 days",
//       "Participant request (Employment)",
//       "Participant decline prior to meeting EN",
//       "No show to warm hand off 3x",
//     ],
//   },
//   youth: {
//     attending: [
//       /* ... schools list ... */
//     ],
//     referred: ["Work program", "Apprenticeship", "Tech school", "Tutoring", "University"],
//     enrolled: ["Work program", "Apprenticeship", "Tech school", "Tutoring", "University"],
//     "grade advancement": ["6th", "7th", "8th", "9th", "10th", "11th", "12th", "Graduated"],
//     "support service": [
//       "School shoes",
//       "School clothes",
//       "School supplies",
//       "Personal care items",
//       "Drivers Education",
//       "Winter gear",
//       "Winter boots",
//       "Sport fee",
//       "Sport shoes",
//       "Sport gear",
//       "School fees",
//       "Graduation fees",
//       "Other",
//     ],
//     completed: ["driver's education", "other"],
//   },
// }

interface GuidedActivityFormProps {
  client: {
    _id: string,
    name: string,
    email: string,
    contactNumber: string,
    caseNumber: number,
    dob: string,
    fep: string,
    dateReferred: string,
    lastGrade: string,
    hadOrientation: string,
    pin: number,
    region: number,
    clientStatus: string,
    tabe: string,
    transcripts: string,
    officeCity: string,
    group: string,
    schoolIfEnrolled: string,
    ttsDream: string,
    createdAt: string,
    latestInteraction: string,
    isYouth: boolean,
  }
  onActivityAdded: () => void
}

export function GuidedActivityForm({client, onActivityAdded}: GuidedActivityFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [what, setWhat] = useState<string>("")
  const [when, setWhen] = useState<string>("")
  const [where, setWhere] = useState<string>("")
  const [who, setWho] = useState<string>(client.fep)
  const [activityDetail, setActivityDetail] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Record<string, any>>({
  })
  console.log(questions)
  // Get the appropriate question set based on whether the client is youth or adult
  const questionSet = client.isYouth ? questions["youth"] || {} : questions["adult"] || {}
  const activityTypes = Object.keys(questionSet)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions`)
        if (response.ok) {
          const data = await response.json()
          setQuestions(data)
        }
      } catch (error) {
        console.error("Error fetching client:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions().then()
  }, [])

  const handleSubmit = async () => {
    if (!what || !activityDetail) return

    setLoading(true)
    try {
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: client._id,
          clientEmail: client.email,
          clientName: client.name,
          what: what,
          when: new Date(when),
          where: where,
          who: who,
          activityDetail: activityDetail,
          createdAt: new Date(),
        }),
      })

      if (response.ok) {
        onActivityAdded()
        setIsOpen(false)
        setWhat("")
        setWhen("")
        setWhere("")
        // setWho("")
        setActivityDetail("")
      } else {
        console.error("Failed to save activity")
      }
    } catch (error) {
      console.error("Error saving activity:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="btn btn-primary">Add Activity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-base-100">
          <DialogHeader>
            <DialogTitle className="text-base-content">
              Add Activity for {client.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <Card className="p-4 bg-base-200 border-base-300">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content">What</label>
                  <Select
                      value={what}
                      onValueChange={(value) => {
                        setWhat(value)
                        setActivityDetail("")
                      }}
                  >
                    <SelectTrigger className="w-full bg-base-100 border-base-300">
                      <SelectValue placeholder="Select activity type"/>
                    </SelectTrigger>
                    <SelectContent className="bg-base-100 border-base-300">
                      {activityTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-base-content">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {what && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content">Where</label>
                      <Select value={where} onValueChange={setWhere}>
                        <SelectTrigger className="w-full bg-base-100 border-base-300">
                          <SelectValue placeholder="Select activity detail" />
                        </SelectTrigger>
                        <SelectContent className="bg-base-100 border-base-300">
                          {questionSet[what as keyof typeof questionSet].map((detail) => (
                              <SelectItem key={detail} value={detail} className="text-base-content">
                                {detail}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                )}

              {what && where && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content block">When</label>
                    <input type="date" className="input" value={when}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                             setWhen(event.target.value)
                           }}/>
                  </div>
              )}

                {
                  what && where && when && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-base-content">Activity Detail</label>
                          <Select value={activityDetail} onValueChange={setActivityDetail}>
                            <SelectTrigger className="w-full bg-base-100 border-base-300">
                              <SelectValue placeholder="Select activity detail" />
                            </SelectTrigger>
                            <SelectContent className="bg-base-100 border-base-300">
                              {questionSet[what as keyof typeof questionSet].map((detail) => (
                                  <SelectItem key={detail} value={detail} className="text-base-content">
                                    {detail}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                    )
                }

              {what && activityDetail && (
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="btn btn-outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading} className="btn btn-primary">
                    {loading ? "Saving..." : "Save Activity"}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

