import { ContestResultModel, CreateContestFormModel } from "../_core/ContestModel"
import { BaseService } from "./BaseService"

class ContestService extends BaseService {
    constructor() {
        super()
    }
    creatContest = (contestDetail:CreateContestFormModel) => {
        return this.post('Contest/CreateContest', contestDetail)
    }
    sendContestResult=(contestResult:ContestResultModel[])=>{
        return this.post('Contest/sendContestResult',contestResult)
    }
}
export const contestService = new ContestService()