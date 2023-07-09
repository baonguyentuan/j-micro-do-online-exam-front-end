import {useSelector} from "react-redux";
import {RootState} from "../../redux/configStore";
import {Rate} from "antd";
import {calculateAverageRate} from "../../utils/operate";
import {StarFilled} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import {ContestCommentModel} from "../../_core/CommentModel";

const demoStart = [1, 2, 3, 4, 5];

const ExamFeedBack = () => {
  let {lstComment} = useSelector((state: RootState) => state.contestCommentSlice)

  return (
    <div className='feedback__box'>
      <div className='grid grid-cols-3 gap-3 items-center'>

        <div className='col-span-1 text-center'>
          <p className='text-6xl font-bold text-green-400'>{calculateAverageRate(lstComment)}</p>
          <p className='text-2xl font-semibold text-green-400'>Good</p>
          <Rate value={calculateAverageRate(lstComment)} disabled/>
        </div>
        <div className='col-span-2'>
          {
            demoStart.map((progress, index) => {
              return <FeedBackProgress key={index} comments={lstComment} star={progress}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

type FeedBackProgressProps = {
  star: number,
  comments: ContestCommentModel[]
}

const FeedBackProgress = (props: FeedBackProgressProps) => {
  const {comments, star} = props;

  const getPercentRate = (star: number) => {
    let totalRate: number = comments.reduce((total, currentComment) => {
      if (currentComment.vote === star) {
        return total + 1
      } else {
        return total
      }
    }, 0);
    return Math.round(totalRate * 100 / comments.length)
  }

  return (
    <FeedBackProgressWrapper className='h-4 bg-slate-200 relative rounded-2xl text-lg mx-auto my-4'>
                              <span
                                className='font-medium absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>{star}
                                <StarFilled className='-translate-y-1 text-yellow-400'/>
                              </span>
      <p className='bg-green-400 h-full rounded-2xl' style={{width: `${getPercentRate(star)}%`}}/>
      <span
        className='absolute top-0 font-medium right-0 translate-x-12 -translate-y-1/4'>{getPercentRate(star)}%</span>
    </FeedBackProgressWrapper>
  )
}

const FeedBackProgressWrapper = styled.div`
  width: 86%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`


export default ExamFeedBack;