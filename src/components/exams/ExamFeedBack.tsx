import { Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { RatingExamStatisticModel } from "../../_core/feedback";
import Constants from "../../constants/Constants";

const ExamFeedBack = (props: RatingExamStatisticModel) => {
  const { ratingData, totalRating, ranking } = props;
  return (
    <div className="feedback__box">
      <div className="grid grid-cols-3 gap-3 items-center">

        <div className="col-span-3 lg:col-span-1 text-center">
          <p className="text-6xl font-bold text-green-400">{totalRating.toFixed(2)}</p>
          <p className="text-2xl font-semibold text-green-400">{ranking}</p>
          <Rate value={totalRating} disabled />
        </div>
        <div className="col-span-3 lg:col-span-2">
          {
            ratingData !== undefined ? (
              ratingData.stars.map((start, index) => {
                return <FeedBackProgress key={index} star={start} startValue={ratingData.values[index]} />;
              })
            ) : Constants.EmptyString
          }
        </div>
      </div>
    </div>
  );
};

type FeedBackProgressProps = {
  star: number,
  startValue: number
}

const FeedBackProgress = (props: FeedBackProgressProps) => {
  const { star, startValue } = props;

  return (
    <FeedBackProgressWrapper className="h-4 bg-slate-200 relative rounded-2xl text-lg mx-auto my-4">
                              <span
                                className="font-medium absolute top-0 left-0 -translate-x-10 -translate-y-1/4">{star}
                                <StarFilled className="-translate-y-1 text-yellow-400" />
                              </span>
      <p className="bg-green-400 h-full rounded-2xl" style={{ width: `${startValue}%` }} />
      <span
        className="absolute top-0 font-medium right-0 translate-x-12 -translate-y-1/4">{startValue.toFixed(0)}%</span>
    </FeedBackProgressWrapper>
  );
};

const FeedBackProgressWrapper = styled.div`
  width: 86%;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
`;


export default ExamFeedBack;