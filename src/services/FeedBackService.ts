import { BaseService } from "./BaseService";
import { FeedBackExamCommand, FeedBackSearchParams } from "../_core/feedback";
import ApiEndpoint from "../constants/ApiEndpoint";

class FeedBackService extends BaseService{
  
  createFeedBack = (feedBack: FeedBackExamCommand)=>{
    return this.post(ApiEndpoint.feedback.CREATE_EXAM_FEEDBACK,feedBack);
  }
  
  editFeedBack = (feedBack: FeedBackExamCommand,params:object)=>{
    return this.putByCondition(ApiEndpoint.feedback.EDIT,feedBack,params)
  }
  
  getExamRating = (name: object) =>{
    return this.getByCondition(ApiEndpoint.feedback.GET_EXAM_RATING,name)
  }
  
  getFeedBackByExamName = (params:FeedBackSearchParams) =>{
    return this.getByCondition(ApiEndpoint.feedback.GET_FEEDBACK_BY_EXAM_NAME,params);
  }
  
  getStatusUserFeedBack = (params:object) =>{
    return this.getByCondition(ApiEndpoint.feedback.GET_STATUS_USER_FEEDBACK,params);
  }
  
  deleteFeedBack = (id: number) =>{
    return this.delete(ApiEndpoint.feedback.DELETE,id)
  }
}

export const feedBackService = new FeedBackService();