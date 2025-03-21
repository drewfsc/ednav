"use client"

import React, {useEffect, useState} from "react"
// import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
// import {Button} from "@/components/ui/button"
// import {Card} from "@/components/ui/card"
import {newQuestions} from "@/lib/response";


export function GuidedActivityForm({client}) {
    const [questions, setQuestions] = useState(newQuestions)
    const [answers, setAnswers] = useState({

    })
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null)
    const roundQuestion = Object.keys(questions).map(((key) => {
        return questions[key]
    }))
    console.log(roundQuestion)
    return (
       <div>
            <select onChange={(e) => {}} value={selectedValue}>
                <option value=""></option>
                {roundQuestion.map((question,i) => {
                    return <option key={question} value={question.id}>{question[i]}</option>
                })}
            </select>
       </div>
    )
}

