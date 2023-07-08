import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {DispatchType, RootState} from "../../redux/configStore";
import {useDispatch, useSelector} from "react-redux";
import {getExamsApi} from "../../redux/reducers/exam/examSlice";

type Props = {}

function TrainingCoursesByCategory(props: Props) {
    const dispatch: DispatchType = useDispatch()
    let { categoryId } = useParams();

    const {examsByCategory} = useSelector((state: RootState) => state.examSlice)

    useEffect(() => {
        dispatch(getExamsApi({name:'',category_ids:categoryId || '',duration:-1,from_date:'',to_date:'',page_index:1,page_size:10,order_by:-1}))
    },[categoryId])

    return (
        <div>
            {
                examsByCategory.map((item,index)=>{
                    return <div>
                        {item.categoryName}
                    </div>
                })
            }
        </div>
    );
}

export default TrainingCoursesByCategory;