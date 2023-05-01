import React from 'react'
import CardSkills from '../Card/CardSkills'
import pm from '../../assets/img/imgsrc/pm.jpeg'
import language from '../../assets/img/imgsrc/language.jpg'
import graduate from '../../assets/img/imgsrc/graduate.jpg'
import qa from '../../assets/img/imgsrc/qualityassurance.jpg'
import { useTranslation } from 'react-i18next'
let arrSkill=[
    {
        id:1,
        img:language,
        tiltle:'Languages',
        skills:['IELTS','HSK','JPLT']
    },
    {
        id:2,
        img:pm,
        tiltle:'Project Management',
        skills:['PMI']
    },
    {
        id:3,
        img:qa,
        tiltle:'Quality Assurance & Software Testing',
        skills:['ASQ','ISTQB']
    },
    {
        id:4,
        img:graduate,
        tiltle:'Graduate',
        skills:['Secondary','Academy']
    },
]
type Props = {}
const SkillCategory = (props: Props) => {
    const {t}=useTranslation('skills')
    return (
        <div className='size__component py-12'>
            <h1 className='text__title'>{t('improving your skills to look for more opportunities')} </h1>
            <div className="grid grid-cols-4 gap-8 pt-8">
                {arrSkill.map((skillItem,index)=>{
                    return <CardSkills key={skillItem.id} skills={skillItem}/>
                })}

            </div>
        </div>
    )
}
export default SkillCategory