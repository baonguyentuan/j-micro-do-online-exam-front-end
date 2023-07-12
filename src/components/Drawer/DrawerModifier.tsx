import React from 'react'
import { Drawer } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice'
import FormCategoryModifier from '../Form/FormCategoryModifier'
import Constants from '../../constants/Constants'
const DrawerModifier = () => {
    let { isOpen, typeContent } = useSelector((state: RootState) => state.drawerSlice)
    const dispatch = useDispatch()
    return (
        <Drawer placement="right" open={isOpen} onClose={() => {
            dispatch(closeDrawer())
        }}>
            {typeContent === Constants.typeDrawer.CREAT_CATEGORY && <FormCategoryModifier formStatus={Constants.formStatus.CREATE} />}
            {typeContent === Constants.typeDrawer.EDIT_CATEGORY && <FormCategoryModifier formStatus={Constants.formStatus.EDIT} />}
        </Drawer>
    )
}

export default DrawerModifier