import React, { useState } from 'react'
import { Button, Rate, Avatar, Input, Form, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';
import { ArrowRightOutlined, UserOutlined, StarFilled } from '@ant-design/icons'
import CardCourse from '../../components/Card/CardCourse';
import '../../assets/css/feedback/feedback.css'
import '../../assets/css/contest/contest.css'
const { TextArea } = Input;
const DEFAULT__PAGESIZE=10
interface CommentInfoModel{
    id:number,
    comment:string,
    user:string,
    vote:number
}
type Props = {

}
let trainingCourse = {
    id: 1,
    name: 'AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) Certification Video Training Course',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/9404.jpg',
    categories: ['aws'],
    duration: 90,
    rating: 4,
    description: 'Do you want to get efficient and dynamic preparation for your Amazon exam, dont you? AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) certification video training course is a superb tool in your preparation. The Amazon AWS Certified Cloud Practitioner certification video training course is a complete batch of instructor led self paced training which can study guide.',
    premium: 'premium',
    quantityDownload: 10,
    createBy: 'tsukuyomi'
}
let arrComment = [
    {
        id: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        user: 'konoha',
        vote:4
    },
    {
        id: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        user: 'uchiha',
        vote:5
    },
    {
        id: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        user: 'yua',
        vote:5
    },
    {
        id: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        user: 'arita',
        vote:5
    },
    {
        id: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'miru',
        vote:5
    },
    {
        id: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        user: 'ayami',
        vote:5
    },
    {
        id: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'shunka',
        vote:5
    },
    {
        id: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        user: 'konoha',
        vote:5
    },
    {
        id: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        user: 'uchiha',
        vote:5
    },
    {
        id: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        user: 'yua',
        vote:5
    },
    {
        id: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        user: 'arita',
        vote:4
    },
    {
        id: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'miru',
        vote:3
    },
    {
        id: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        user: 'ayami',
        vote:3
    },
    {
        id: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'shunka',
        vote:4
    },
    {
        id: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        user: 'konoha',
        vote:2
    },
    {
        id: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        user: 'uchiha',
        vote:1
    },
    {
        id: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        user: 'yua',
        vote:5
    },
    {
        id: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        user: 'arita',
        vote:2
    },
    {
        id: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'miru',
        vote:4
    },
    {
        id: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        user: 'ayami',
        vote:5
    },
    {
        id: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        user: 'shunka',
        vote:3
    }
]
const ContestDetail = ({ }: Props) => {
    let [currentPage, setCurrentPage] = useState(1)
    let [filter, setFilter] = useState(0)
    let currentCommentList:CommentInfoModel[]=arrComment
    if(filter===0){
        currentCommentList=arrComment
    }else{
        currentCommentList=arrComment.filter(cmtItem=>cmtItem.vote===filter)
    }
    const selectFilter = (e: React.MouseEvent<HTMLElement>,value:number) => {
        let lstBtn = document.getElementsByClassName('btnFilter')
        for (let i = 0; i < lstBtn.length; i++) {
            if (lstBtn[i] === e.target|| lstBtn[i]===e.currentTarget) {
                lstBtn[i].classList.add('btn__filter__active');
            } else {
                lstBtn[i].classList.remove('btn__filter__active');
            }
        }
        setFilter(value)

    }
    return (
        <div className='size__component py-12'>
            <div className='grid grid-cols-5 gap-4 mb-6' >
                <div className='col-span-2 bg-slate-200 rounded-3xl' style={{ backgroundImage: `url('${trainingCourse.imgSrc}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', height: 400 }}>
                </div>
                <div className='col-span-3'>
                    <h1 className='font-bold text-xl mb-2'>{trainingCourse.name}</h1>
                    <p className='text-justify'>
                        <span className='statsName'>Description: </span>
                        <span>{trainingCourse.description}</span>
                    </p>
                    <div>
                        <div className='grid grid-cols-2'>
                            <div >
                                <p className='statsName'>Upload by</p>
                                <p>{trainingCourse.createBy}</p>
                            </div>
                            <div >
                                <p className='statsName'>Rating</p>
                                <Rate className='flex items-center text-xs' disabled defaultValue={trainingCourse.rating} />
                            </div>
                            <div >
                                <p className='statsName'>Duration</p>
                                <p>{trainingCourse.duration}min</p>
                            </div>

                            <div >
                                <p className='statsName'>Download</p>
                                <p>{trainingCourse.quantityDownload}</p>
                            </div>
                        </div>
                    </div>
                    <div >
                        <Button className='btn__contest'>Go to contest</Button>
                        <Button  className='btn__contest'>Download now</Button>
                    </div>
                </div>
            </div>
            <div id='feedbackArea' className='grid grid-cols-4 gap-4'>
                <div className='col-span-3 '>
                    <div className='feedback__box '>
                        <h1 className='font-bold text-2xl text-center'>Customer Feedback</h1>
                        <div className='grid grid-cols-4 items-center' >
                            <div className='col-span-1 text-center' >
                                <p className='text-6xl font-bold text-green-400'>{trainingCourse.rating}</p>
                                <p className='text-2xl font-semibold text-green-400'>Good</p>
                                <Rate value={trainingCourse.rating} disabled />
                            </div>
                            <div className='col-span-3'>
                                <p className=' w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>5 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: "46%" }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>46%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>4 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: "40%" }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>40%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>3 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: "3%" }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>3%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>2 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: "2%" }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>2%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>1 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: "1%" }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>1%</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='feedback__box '>
                        <Form className='pb-2'>
                            <h1 className='font-bold text-xl'>Comment</h1>
                            <span>Vote: </span>
                            <Rate value={0} />
                            <TextArea rows={5} placeholder='Input comment' />
                        </Form>
                        <div>
                            <span className='mr-4'>Filter</span>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,0)

                            }}>All</Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,5)
                            }}>5<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,4)
                            }}>4<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,3)
                            }}>3<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,2)
                            }}>2<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e,1)
                            }}>1<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                        </div>
                        {currentCommentList.map((cmtItem, index) => {
                            if (index >= (currentPage - 1) * DEFAULT__PAGESIZE && index < currentPage * DEFAULT__PAGESIZE) {
                                return <div className='py-2 border-b-2'>
                                    <div className='flex justify-start items-center'>
                                        <Avatar size='default' icon={<UserOutlined />} />
                                        <div className='ml-4'>
                                            <p>{cmtItem.user}</p>
                                            <Rate value={cmtItem.vote} disabled />
                                        </div>
                                    </div>
                                    <p>{cmtItem.comment}</p>
                                </div>
                            }
                        })}

                        <Pagination className='text-center mt-4' defaultCurrent={1} total={currentCommentList.length} defaultPageSize={DEFAULT__PAGESIZE} onChange={(page, pageSize) => {
                            let topScroll = document.getElementById('feedbackArea')?.offsetTop
                            if (topScroll) {
                                document.body.scrollTo({
                                    top: topScroll,
                                    behavior: 'smooth'
                                });
                                document.documentElement.scrollTo({
                                    top: topScroll,
                                    behavior: 'smooth'
                                });
                            }
                            setCurrentPage(page)
                        }} />
                    </div>
                </div>
                <div className='col-span-1'>
                    <NavLink to={'/home'}>Relate Course <ArrowRightOutlined className='-translate-y-1' /></NavLink>
                    <CardCourse courseDetail={trainingCourse} />
                    <br />
                    <CardCourse courseDetail={trainingCourse} />
                    <br />
                    <CardCourse courseDetail={trainingCourse} />
                    <br />
                    <CardCourse courseDetail={trainingCourse} />

                </div>
            </div>
        </div>
    )
}

export default ContestDetail