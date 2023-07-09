import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  ContestInfoModel,
  ContestingInfoModel,
  ContestResultModel,
  ContestState,
  CreateContestFormModel
} from '../../../_core/ContestModel';
import {DispatchType} from '../../configStore';
import {setLoading} from '../loading/loadingSlice';
import {getLstContestComment} from '../comment/contestCommentSlice';
import {openNotificationWithIcon} from '../../../utils/operate';
import arrQuestion from './dethi.json'
import {history} from "../../../index";

let lstContest = [
  {
    id: 1,
    name: 'AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) Certification Video Training Course',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/9404.jpg',
    categories: ['aws'],
    duration: 90,
    rating: [
      {
        cmtID: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 1,
        vote: 4
      },
      {
        cmtID: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 2,
        vote: 5
      },
      {
        cmtID: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 3,
        vote: 5
      },
      {
        cmtID: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 4,
        vote: 5
      },
      {
        cmtID: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 5,
        vote: 5
      },
      {
        cmtID: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 6,
        vote: 5
      },
      {
        cmtID: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 7,
        vote: 5
      },
      {
        cmtID: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 8,
        vote: 5
      },
      {
        cmtID: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 9,
        vote: 5
      },
      {
        cmtID: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 10,
        vote: 5
      },
      {
        cmtID: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 11,
        vote: 4
      },
      {
        cmtID: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 12,
        vote: 3
      },
      {
        cmtID: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 13,
        vote: 3
      },
      {
        cmtID: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 14,
        vote: 4
      },
      {
        cmtID: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 15,
        vote: 2
      },
      {
        cmtID: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 16,
        vote: 1
      },
      {
        cmtID: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 17,
        vote: 5
      },
      {
        cmtID: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 18,
        vote: 2
      },
      {
        cmtID: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 19,
        vote: 4
      },
      {
        cmtID: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 20,
        vote: 5
      },
      {
        cmtID: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 21,
        vote: 3
      }
    ],
    description: 'Do you want to get efficient and dynamic preparation for your Amazon exam, dont you? AWS Certified Cloud Practitioner: AWS Certified Cloud Practitioner (CLF-C01) certification video training course is a superb tool in your preparation. The Amazon AWS Certified Cloud Practitioner certification video training course is a complete batch of instructor led self paced training which can study guide.',
    premium: 'premium',
    quantityDownload: 10,
    createBy: 'tsukuyomi'
  },
  {
    id: 2,
    name: 'Understanding Cisco Cybersecurity Operations Fundamentals (CBROPS) Certification',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/9896.jpg',
    categories: ['security', 'cisco'],
    duration: 60,
    rating: [
      {
        cmtID: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 1,
        vote: 4
      },
      {
        cmtID: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 2,
        vote: 5
      },
      {
        cmtID: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 3,
        vote: 5
      },
      {
        cmtID: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 4,
        vote: 5
      },
      {
        cmtID: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 5,
        vote: 5
      },
      {
        cmtID: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 6,
        vote: 5
      },
      {
        cmtID: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 7,
        vote: 5
      },
      {
        cmtID: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 8,
        vote: 5
      },
      {
        cmtID: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 9,
        vote: 5
      },
      {
        cmtID: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 10,
        vote: 5
      },
      {
        cmtID: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 11,
        vote: 4
      },
      {
        cmtID: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 12,
        vote: 3
      },
      {
        cmtID: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 13,
        vote: 3
      },
      {
        cmtID: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 14,
        vote: 4
      },
      {
        cmtID: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 15,
        vote: 2
      },
      {
        cmtID: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 16,
        vote: 1
      },
      {
        cmtID: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 17,
        vote: 5
      },
      {
        cmtID: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 18,
        vote: 2
      },
      {
        cmtID: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 19,
        vote: 4
      },
      {
        cmtID: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 20,
        vote: 5
      },
      {
        cmtID: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 21,
        vote: 3
      }
    ],
    description: 'Do you want to get efficient and dynamic preparation for your Cisco exam, dont you? 200-201: Understanding Cisco Cybersecurity Operations Fundamentals (CBROPS) certification video training course is a superb tool in your preparation. The Cisco CBROPS 200-201 certification video training course is a complete batch of instructor led self paced training which can study guide.',
    premium: 'premium',
    quantityDownload: 10,
    createBy: 'konoha'
  },
  {
    id: 3,
    name: 'AdWords Shopping Advertising: Google AdWords: Shopping Advertising Certification',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/8992.jpg',
    categories: ['ads', 'google'],
    duration: 90,
    rating: [
      {
        cmtID: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 1,
        vote: 4
      },
      {
        cmtID: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 2,
        vote: 5
      },
      {
        cmtID: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 3,
        vote: 5
      },
      {
        cmtID: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 4,
        vote: 5
      },
      {
        cmtID: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 5,
        vote: 5
      },
      {
        cmtID: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 6,
        vote: 5
      },
      {
        cmtID: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 7,
        vote: 5
      },
      {
        cmtID: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 8,
        vote: 5
      },
      {
        cmtID: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 9,
        vote: 5
      },
      {
        cmtID: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 10,
        vote: 5
      },
      {
        cmtID: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 11,
        vote: 4
      },
      {
        cmtID: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 12,
        vote: 3
      },
      {
        cmtID: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 13,
        vote: 3
      },
      {
        cmtID: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 14,
        vote: 4
      },
      {
        cmtID: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 15,
        vote: 2
      },
      {
        cmtID: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 16,
        vote: 1
      },
      {
        cmtID: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 17,
        vote: 5
      },
      {
        cmtID: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 18,
        vote: 2
      },
      {
        cmtID: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 19,
        vote: 4
      },
      {
        cmtID: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 20,
        vote: 5
      },
      {
        cmtID: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 21,
        vote: 3
      }
    ],
    description: 'AdWords Shopping Advertising: Google AdWords: Shopping Advertising certification video training course is a superb tool in your preparation. The Google AdWords Shopping Advertising certification video training course is a complete batch of instructor led self paced training which can study guide. ',
    premium: 'premium',
    quantityDownload: 15,
    createBy: 'uchiha'
  },
  {
    id: 4,
    name: 'Certified Business Analysis Professional Certification',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/4582.jpg',
    categories: ['business'],
    duration: 120,
    rating: [
      {
        cmtID: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 1,
        vote: 4
      },
      {
        cmtID: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 2,
        vote: 5
      },
      {
        cmtID: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 3,
        vote: 5
      },
      {
        cmtID: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 4,
        vote: 5
      },
      {
        cmtID: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 5,
        vote: 5
      },
      {
        cmtID: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 6,
        vote: 5
      },
      {
        cmtID: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 7,
        vote: 5
      },
      {
        cmtID: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 8,
        vote: 5
      },
      {
        cmtID: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 9,
        vote: 5
      },
      {
        cmtID: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 10,
        vote: 5
      },
      {
        cmtID: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 11,
        vote: 4
      },
      {
        cmtID: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 12,
        vote: 3
      },
      {
        cmtID: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 13,
        vote: 3
      },
      {
        cmtID: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 14,
        vote: 4
      },
      {
        cmtID: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 15,
        vote: 2
      },
      {
        cmtID: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 16,
        vote: 1
      },
      {
        cmtID: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 17,
        vote: 5
      },
      {
        cmtID: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 18,
        vote: 2
      },
      {
        cmtID: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 19,
        vote: 4
      },
      {
        cmtID: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 20,
        vote: 5
      },
      {
        cmtID: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 21,
        vote: 3
      }
    ],
    description: 'CBAP: Certified Business Analysis Professional certification video training course is a superb tool in your preparation. The IIBA CBAP certification video training course is a complete batch of instructor led self paced training which can study guide',
    premium: 'free',
    quantityDownload: 10,
    createBy: 'KOS'
  },
  {
    id: 5,
    name: 'Oracle Database SQL Certification',
    imgSrc: 'https://www.exam-labs.com/static/img/courses/8250.jpg',
    categories: ['IT', 'SQL', 'Oracle'],
    duration: 90,
    rating: [
      {
        cmtID: 1,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 1,
        vote: 4
      },
      {
        cmtID: 2,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 2,
        vote: 5
      },
      {
        cmtID: 3,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 3,
        vote: 5
      },
      {
        cmtID: 4,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 4,
        vote: 5
      },
      {
        cmtID: 5,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 5,
        vote: 5
      },
      {
        cmtID: 6,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 6,
        vote: 5
      },
      {
        cmtID: 7,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 7,
        vote: 5
      },
      {
        cmtID: 8,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 8,
        vote: 5
      },
      {
        cmtID: 9,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 9,
        vote: 5
      },
      {
        cmtID: 10,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 10,
        vote: 5
      },
      {
        cmtID: 11,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 11,
        vote: 4
      },
      {
        cmtID: 12,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 12,
        vote: 3
      },
      {
        cmtID: 13,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 13,
        vote: 3
      },
      {
        cmtID: 14,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 14,
        vote: 4
      },
      {
        cmtID: 15,
        comment: 'Thanks so much for taking the time to put this together and make it available for others Andrew! Nice format of high level intro, followed by super cheat-sheets and follow-alongs - it certainly helped me pass! Massive gratitude!',
        userId: 15,
        vote: 2
      },
      {
        cmtID: 16,
        comment: 'Starting Q2, all I wanted to do was build my cloud computing proficiency. Today, after over 40+ hours of studying, 20+ Hands-on labs, 10 workshops, 2 instructors-led trainings, multiple white-papers and documentations. I am happy to have passed the AWS Solutions Architect Associate Exam.Thanks to Andrew Brown ExamPro follow alongs.',
        userId: 16,
        vote: 1
      },
      {
        cmtID: 17,
        comment: 'Thank you very much for your extreme dedication, time, and amazing work you have put into this course. I, as well as many others, greatly appreciate it. :)',
        userId: 17,
        vote: 5
      },
      {
        cmtID: 18,
        comment: 'I\'ve studied SAA for roughly 2weeks with this video and had the exam today. passed. Thank you Andrew!',
        userId: 18,
        vote: 2
      },
      {
        cmtID: 19,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 19,
        vote: 4
      },
      {
        cmtID: 20,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME. ',
        userId: 20,
        vote: 5
      },
      {
        cmtID: 21,
        comment: 'This is one of the best videos of preparation for the exam. Thanks, Andrew for such a nice and thorough demonstration, this is like a quick tour of the Solutions Architect role and how to pass the certification. You are AWESOME.',
        userId: 21,
        vote: 3
      }
    ],
    description: 'Oracle Database SQL certification video training course is a superb tool in your preparation',
    premium: 'free',
    quantityDownload: 20,
    createBy: 'BC'
  }
]

const initialState: ContestState = {
  contestDetail: null,
  contestingInfo: null,
  arrRelateContest: [],
  arrHotContest: [],
  lstAnswer: []
}

const contestSlice = createSlice({
  name: 'contestSlice',
  initialState,
  reducers: {
    getContestDetail: (state: ContestState, action: PayloadAction<{ contest: ContestInfoModel | null }>) => {
      state.contestDetail = action.payload.contest
    },
    getLstRelateContest: (state: ContestState, action: PayloadAction<{ lstContest: ContestInfoModel[] }>) => {
      if (action.payload.lstContest.length < 5) {
        state.arrRelateContest = action.payload.lstContest
      } else {
        state.arrRelateContest = action.payload.lstContest.slice(0, 4)
      }
    },
    getLstHotContest: (state: ContestState, action: PayloadAction) => {
      state.arrHotContest = lstContest
    },
    getContestingInfo: (state: ContestState, action: PayloadAction<{ contest: ContestingInfoModel | null }>) => {
      state.contestingInfo = action.payload.contest
    },
    createLstAnswer: (state: ContestState) => {
      state.lstAnswer = []
      state.contestingInfo?.lstQuestion.map((question, questionIndex) => {
        state.lstAnswer.push({
          questionIndex,
          answerSelected: []
        })
      })
    },
    setAnswer: (state: ContestState, action: PayloadAction<{ questionIndex: number, answerIndex: number, type: string, checked: boolean }>) => {
      let newLstAnswer = [...state.lstAnswer]
      if (action.payload.type === 'multi') {
        if (action.payload.checked) {
          newLstAnswer[action.payload.questionIndex].answerSelected.push(action.payload.answerIndex)
        } else {
          let findAnswerIndex = state.lstAnswer[action.payload.questionIndex].answerSelected.findIndex(answer => answer === action.payload.answerIndex)
          if (findAnswerIndex !== -1) {
            newLstAnswer[action.payload.questionIndex].answerSelected.splice(findAnswerIndex, 1)
          }
        }
      } else {
        if (state.lstAnswer[action.payload.questionIndex].answerSelected.length == 0) {
          newLstAnswer[action.payload.questionIndex].answerSelected.push(action.payload.answerIndex)
        } else {
          newLstAnswer[action.payload.questionIndex].answerSelected[0] = action.payload.answerIndex
        }
      }
      state.lstAnswer = newLstAnswer
    },
  }
});
export const {
  getContestDetail,
  getLstRelateContest,
  getLstHotContest,
  getContestingInfo,
  createLstAnswer,
  setAnswer
} = contestSlice.actions
export default contestSlice.reducer
export const getContestDetailApi = (contestId: Number) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      let contestFindIndex = lstContest.findIndex((contest) => contest.id === contestId)
      if (contestFindIndex !== -1) {
        let currentContestDetail = lstContest[contestFindIndex]
        await dispatch(getContestDetail({contest: currentContestDetail}))
        await dispatch(getLstRelateContest({lstContest: lstContest}))
        await dispatch(getLstContestComment({lstComment: currentContestDetail.rating}))
      } else {
        history.push('/home')
      }
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({isLoading: false}))
  }
}
export const createContestApi = (contestDetail: CreateContestFormModel) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      //   const result = await contestService.creatContest(contestDetail)
      //   if (result.status === STATUS_CODE.SUCCESS) {
      //     openNotificationWithIcon('success', 'Create Contest successful', '', 1)
      //   } else {
      //     console.log(result);
      //     openNotificationWithIcon('error', 'Create Contest failed', '', 1)
      //   }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Create Contest failed', '', 1)
    }
    await dispatch(setLoading({isLoading: false}))
  }
}
export const sendContestResultApi = (contestResult: ContestResultModel[]) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      // const result = await contestService.sendContestResult(contestResult)
      //   if (result.status === STATUS_CODE.SUCCESS) {
      //     openNotificationWithIcon('success', 'Send result successful', '', 1)
      //   } else {
      //     console.log(result);
      //     openNotificationWithIcon('error', 'Send Result failed', '', 1)
      //   }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Send Result failed', '', 1)
    }
    await dispatch(setLoading({isLoading: false}))
  }
}
export const getContestingInfoApi = (contestId: Number) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      let newContestDetail = {
        name: "Enlish",
        organization: 'baonguyen',
        category: ['english'],
        description: '123',
        duration: 120,
        timeStart: '2023-06-29 23:00:00',
        lstQuestion: arrQuestion
      }
      await dispatch(getContestingInfo({contest: newContestDetail}))
      await dispatch(createLstAnswer())
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({isLoading: false}))
  }
}
