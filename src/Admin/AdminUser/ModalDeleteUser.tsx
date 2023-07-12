import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteUser } from '../../redux/reducers/adminUser/adminUserSlice';

interface PopupDeleteUserProps {
    deletingUserId: number | null;
    onClose: () => void;
}
const PopupDeleteUser = ({ deletingUserId, onClose }: PopupDeleteUserProps) => {
    const { t } = useTranslation('adminUser');
    const dispatch = useDispatch();
    const handleConfirm = () => {
        dispatch(deleteUser({ id: deletingUserId }));
        onClose();
    };

    return (
        <Modal
            open={deletingUserId !== null}
            title={t('are_delete_user')}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>{t('cancel')}</Button>,
                <Button key="delete" type="primary" danger onClick={handleConfirm}>{t('delete')}</Button>,
            ]}
        />
    );
};

export default PopupDeleteUser;
