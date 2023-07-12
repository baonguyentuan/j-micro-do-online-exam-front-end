import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Contact() {
    const { t } = useTranslation('contact');
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
    });


    const initialValues = {
        email: '',
        firstname: '',
        lastname: '',
    };


    const onSubmit = (values: any) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className='text-center my-8'>
                <h2 className='text-3xl font-bold'>{t('contactUs')}</h2>
            </div>
            <div className="flex items-center justify-evenly h-full">
                <div className="w-64 h-80 bg-white-200 shadow-lg shadow-slate-200 rounded-lg hover:scale-110 transition-transform duration-300 flex flex-col justify-between">
                    <div className="w-64 h-2 bg-indigo-300 hover:scale-105 transition-transform duration-300" />
                    <div className="text-center p-4">
                        <h2 className="text-2xl font-bold">{t('press')}</h2>
                        <p className="text-sm text-gray-500">{t('content_1')}</p>
                    </div>
                    <button className="w-44 mx-10 my-4 border border-indigo-300 bg-white text-indigo-300 px-4 py-2 rounded-lg transition-colors duration-300">
                        {t('button_1')}
                    </button>
                </div>
                <div className="w-64 h-80 bg-white-200 shadow-lg shadow-slate-200 rounded-lg hover:scale-110 transition-transform duration-300 flex flex-col justify-between">
                    <div className="w-64 h-2 bg-green-400 hover:scale-105 transition-transform duration-300" />
                    <div className="text-center p-4">
                        <h2 className="text-2xl font-bold">{t('help')}</h2>
                        <p className="text-sm text-gray-500">{t('content_2')}</p>
                    </div>
                    <button className="w-44 mx-10 my-4 border border-green-400 bg-green-400 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        {t('button_2')}
                    </button>
                </div>
                <div className="w-64 h-80 bg-white-200 shadow-lg shadow-slate-200 rounded-lg hover:scale-110 transition-transform duration-300 flex flex-col justify-between">
                    <div className="w-64 h-2 bg-cyan-300 hover:scale-105 transition-transform duration-300" />
                    <div className="text-center p-4">
                        <h2 className="text-center text-2xl font-bold">{t('sale')}</h2>
                        <p className="text-center text-sm text-gray-500">{t('content_3')}</p>
                    </div>
                    <button className="w-44 mx-10 my-4 border border-cyan-300 bg-white text-cyan-300 px-4 py-2 rounded-lg transition-colors duration-300">
                        {t('button_3')}
                    </button>
                </div>
            </div>
            <div className='bg-sky-100 shadow-lg shadow-slate-200 my-16'>
                <div className="flex flex-col space-y-2 items-center p-4">
                    <h3>{t('title')}</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col space-y-2 items-center p-4">
                            <input
                                type="text"
                                className={`border rounded-lg px-4 py-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            )}
                            <input
                                type="text"
                                className={`border rounded-lg px-4 py-2 ${formik.touched.firstname && formik.errors.firstname ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="First Name"
                                name="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstname && formik.errors.firstname && (
                                <div className="text-red-500 text-sm">{formik.errors.firstname}</div>
                            )}

                            <input
                                type="text"
                                className={`border rounded-lg px-4 py-2 ${formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Last Name"
                                name="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastname && formik.errors.lastname && (
                                <div className="text-red-500 text-sm">{formik.errors.lastname}</div>
                            )}
                            <button
                                type="submit"
                                className="w-44 mx-10 my-4 border border-indigo-300 bg-indigo-300 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                                {t('submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
