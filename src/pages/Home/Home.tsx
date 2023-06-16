import React from 'react'
import SkillCategory from '../../components/SkillExam/SkillCategory'
import Statistics from '../../components/Statistics/Statistics'
import Feedback from '../../components/Feedbacks/Feedback'
import HomeBanner from '../../components/Banner/HomeBanner'
import Partners from '../../components/Partners/Partners'
import HotCourse from '../../components/Courses/HotCourse'


type Props = {}

export default function Home({}: Props) {
  return (
    <div className='relative'>
      <HomeBanner/>
      <Partners/>
      <Statistics/>
      <SkillCategory/>
      <Feedback/>
      <HotCourse/>
    </div>
  )
}