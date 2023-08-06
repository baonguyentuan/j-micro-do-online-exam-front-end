import { ContestResultModel, CreateContestFormModel } from "../_core/contest"
import ApiEndpoint from "../constants/ApiEndpoint"
import { BaseService } from "./BaseService"

class ContestService extends BaseService {
    constructor() {
        super()
    }
    creatContest = (contestDetail:FormData) => {
        return this.post(ApiEndpoint.contest.CREATE, contestDetail)
    }
    sendContestResult=(contestResult:ContestResultModel[])=>{
        return this.post('Contest/sendContestResult',contestResult)
    }
    getContestOwner=(param:object)=>{
        return this.getByParams(ApiEndpoint.contest.GET,param)
    }
}
export const contestService = new ContestService()