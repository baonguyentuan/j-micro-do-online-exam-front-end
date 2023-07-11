import React from 'react';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useTranslation } from 'react-i18next';

type Props = {}

function Contact(props: Props) {
    const { t } = useTranslation('contact');
    const items = [
        { name: t('home'), link: "/" },
        { name: t('contactUs') },
    ];

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="p-4 flex-grow">
                <Breadcrumb items={items} />
                <div className="p-4">
                    <h1 className="text-3xl font-medium mb-2">{t('contactUs')}</h1>
                    <p className="mb-4">{t('getInTouch')}&nbsp;
                        <a href="mailto:support@exam-destroyer.com" className="text-blue-500 hover:underline">{t('emailUs')}</a>
                    </p>
                    <p className="text-base font-normal mb-2">{t('companyName')}</p>
                    <p className="text-base font-normal">{t('companyAddress')}</p>
                </div>
            </div>
        </div>
    )
}

export default Contact;
