import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';
import { deleteEndpointApi } from '../../../redux/reducers/endpoint/endpointSlice';

interface PopupDeleteUserProps {
    deletingId: any;
    onClose: () => void;
}
const ModalDeleteEndpoint = ({ deletingId, onClose }: PopupDeleteUserProps) => {
    const dispatch = useDispatch<DispatchType>()
    const handleConfirm = () => {
        dispatch(deleteEndpointApi(deletingId));
        onClose();
    };

    return (
        <Modal
            open={deletingId !== null}
            title='Are you sure to delete this endpoint'
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="delete" type="primary" danger onClick={handleConfirm}>Confirm</Button>,
            ]}
        />
    );
};

export default ModalDeleteEndpoint;
