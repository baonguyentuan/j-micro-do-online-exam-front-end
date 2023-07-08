import React from 'react'
import { Button, Drawer } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice'
const DrawerModifier = () => {
    let { title, component, submit, isOpen } = useSelector((state: RootState) => state.drawerSlice)
    const dispatch = useDispatch()
    return (
        <Drawer title={title} placement="right" open={isOpen} onClose={() => {
            dispatch(closeDrawer())
        }}>
            {component}
            <Button className='btn__contest' style={{padding:"8px 24px"}} onClick={() => {
                    submit()
            }}>Save</Button>
        </Drawer>
    )
}

export default DrawerModifier