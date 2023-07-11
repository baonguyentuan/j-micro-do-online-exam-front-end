import { Modal, Form, Input, Upload, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IUser } from '../../../_core/AdminUser';
import { useEffect, useState } from 'react';
import { updateUser } from '../../../redux/reducers/adminUser/adminUserSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface PopupEditUserProps {
    editingUser: IUser | null;
    onClose: () => void;
    onSave: (updatedUser: IUser) => void;
}

const PopupEditUser = ({ editingUser, onClose, onSave }: PopupEditUserProps) => {
    const {t}=useTranslation('adminUser');
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (editingUser) {
            form.setFieldsValue({
                avatar: editingUser.avata,
                email: editingUser.email,
                username: editingUser.username,
                accountType: editingUser.accountType,
            });
        }
    }, [editingUser]);

    const onFinish = (values: any) => {
        const { avatar, email, username, accountType } = values;
        const updatedUser = {
            avata: avatar,
            email: email,
            username: username,
            accountType: accountType,
        };
        dispatch(updateUser({ id: editingUser?.id, updatedUser }));
        onClose();
    };

    return (
        <Modal
            open={!!editingUser}
            title="Update user information"
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                validateTrigger="onBlur"
            >
                <Form.Item label="Avatar" name="avatar">
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.avatar !== currentValues.avatar}
                    >
                        {({ getFieldValue, setFieldsValue }) => {
                            const avatar = getFieldValue('avatar');
                            return (
                                <>
                                    <Upload
                                        showUploadList={false}
                                        action={editingUser ? undefined : avatar}
                                        beforeUpload={() => false}
                                        onChange={(info) => {
                                            if (info.file.status === 'done') {
                                                const response = info.file.response;
                                                setImageUrl(response?.data?.url || '');
                                                setFieldsValue({
                                                    avatar: response?.data?.url || '',
                                                });
                                            }
                                        }}
                                    >
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                        ) : editingUser?.avata ? (
                                            <img src={editingUser?.avata} alt="avatar" style={{ width: '100%' }} />
                                        ) : (
                                            <Button icon={<UploadOutlined />}>{t('click_upload')}</Button>
                                        )}
                                    </Upload>
                                </>
                            );
                        }}
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: t('validate_email_required') },
                        { type: 'email', message: t('validate_email_condition') }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label={t('username')}
                    rules={[
                        { required: true, message: t('validate_username_required') },
                        { min: 6, message: t('validate_username_min_length') },
                        { max: 15, message: t('validate_username_max_length') }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="accountType"
                    label={t('account_type')}
                    rules={[{ required: true, message: t('validate_account_required') }]}
                >
                    <Select>
                        <Select.Option value="basic">{t('free')}</Select.Option>
                        <Select.Option value="premium">{t('premium')}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='default' htmlType="submit">
                        {t('save')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PopupEditUser;
