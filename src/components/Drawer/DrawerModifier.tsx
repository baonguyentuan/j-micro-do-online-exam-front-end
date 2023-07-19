import React from 'react'
import { Button, Drawer } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice'
import FormCategoryModifier from '../Form/FormCategoryModifier'
import Constants from '../../constants/Constants'
import CreateExam from '../../pages/Exam/CreateExam'
import ViewExam from '../../pages/Exam/ViewExam'
const DrawerModifier = () => {
    let { isOpen, typeContent, sizeDrawer } = useSelector((state: RootState) => state.drawerSlice)
    const dispatch = useDispatch()
    return (
        <Drawer width={sizeDrawer} placement="right" open={isOpen} onClose={() => {
            dispatch(closeDrawer())
        }}>
            {typeContent === Constants.typeDrawer.CREAT_CATEGORY && <FormCategoryModifier formStatus={Constants.formStatus.CREATE} />}
            {typeContent === Constants.typeDrawer.EDIT_CATEGORY && <FormCategoryModifier formStatus={Constants.formStatus.EDIT} />}
            {typeContent === Constants.typeDrawer.CREAT_EXAM && <CreateExam status={Constants.formStatus.CREATE} />}
            {typeContent === Constants.typeDrawer.EDIT_EXAM && <CreateExam status={Constants.formStatus.EDIT} />}
            {typeContent === Constants.typeDrawer.VIEW_EXAM && <ViewExam />}
        </Drawer>
    )
}

export default DrawerModifier