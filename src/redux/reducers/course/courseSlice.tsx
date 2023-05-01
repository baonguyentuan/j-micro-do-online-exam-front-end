import { createSlice } from '@reduxjs/toolkit'
import { CourseState } from '../../../_core/CourseModel';


const initialState: CourseState = {
    arrHotCourse: [
        {
            id: 1,
            name: 'AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) Certification Video Training Course',
            imgSrc: 'https://www.exam-labs.com/static/img/courses/9404.jpg',
            categories: ['aws'],
            duration: 90,
            rating: 4,
            description: 'Do you want to get efficient and dynamic preparation for your Amazon exam, dont you? AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) certification video training course is a superb tool in your preparation. The Amazon AWS Certified Cloud Practitioner certification video training course is a complete batch of instructor led self paced training which can study guide.',
            premium: 'premium',
            quantityDownload:10,
            createBy:'tsukuyomi'
        },
        {
            id: 2,
            name: 'Understanding Cisco Cybersecurity Operations Fundamentals (CBROPS) Certification',
            imgSrc: 'https://www.exam-labs.com/static/img/courses/9896.jpg',
            categories: ['security','cisco'],
            duration: 60,
            rating: 4,
            description: 'Do you want to get efficient and dynamic preparation for your Cisco exam, dont you? 200-201: Understanding Cisco Cybersecurity Operations Fundamentals (CBROPS) certification video training course is a superb tool in your preparation. The Cisco CBROPS 200-201 certification video training course is a complete batch of instructor led self paced training which can study guide.',
            premium: 'premium',
            quantityDownload:10,
            createBy:'konoha'
        },
        {
            id: 3,
            name: 'AdWords Shopping Advertising: Google AdWords: Shopping Advertising Certification',
            imgSrc: 'https://www.exam-labs.com/static/img/courses/8992.jpg',
            categories: ['ads','google'],
            duration: 90,
            rating: 5,
            description: 'AdWords Shopping Advertising: Google AdWords: Shopping Advertising certification video training course is a superb tool in your preparation. The Google AdWords Shopping Advertising certification video training course is a complete batch of instructor led self paced training which can study guide. ',
            premium: 'premium',
            quantityDownload:15,
            createBy:'uchiha'
        },
        {
            id: 4,
            name: 'Certified Business Analysis Professional Certification',
            imgSrc: 'https://www.exam-labs.com/static/img/courses/4582.jpg',
            categories: ['business'],
            duration: 120,
            rating: 3,
            description: 'CBAP: Certified Business Analysis Professional certification video training course is a superb tool in your preparation. The IIBA CBAP certification video training course is a complete batch of instructor led self paced training which can study guide',
            premium: 'free',
            quantityDownload:10,
            createBy:'KOS'
        },
        {
            id: 5,
            name: 'Oracle Database SQL Certification',
            imgSrc: 'https://www.exam-labs.com/static/img/courses/8250.jpg',
            categories: ['IT','SQL','Oracle'],
            duration: 90,
            rating: 4,
            description: 'Oracle Database SQL certification video training course is a superb tool in your preparation',
            premium: 'free',
            quantityDownload:20,
            createBy:'BC'
        }
    ]
}

const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {}
});

export const { } = courseSlice.actions

export default courseSlice.reducer