import React from 'react'
import '../../assets/css/partner/partner.css'
import awsLogo from '../../assets/img/logo/aws-logo.svg'
import azureLogo from '../../assets/img/logo/azure-logo.svg'
// import comptiaLogo from '../../assets/img/logo/comptia-logo.svg'
import gcpLogo from '../../assets/img/logo/gcp-logo.svg'
import kubernetesLogo from '../../assets/img/logo/kubernetes-logo.svg'
import linuxLogo from '../../assets/img/logo/Linux_Logo.svg'
import oracleLogo from '../../assets/img/logo/oracle-logo.svg'
import teraformLogo from '../../assets/img/logo/terraform-logo.svg'
import moreLogo from '../../assets/img/logo/more-svgrepo-com.svg'

import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
type Props = {}

const Partners = (props: Props) => {
    const {t}=useTranslation('partner')
    return (
        <div className='size__component py-12'>
            <h1 className='text__title'>{t('partnering with world\'s leading universities and companies')}</h1>
        <div className='flex justify-around mt-8' >
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={awsLogo} alt="logo" />
                <p className='name__partner'>AWS</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner' >
                <img className='logo__partner' src={azureLogo} alt="logo" />
                <p className='name__partner'>Azure</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={gcpLogo} alt="logo" />
                <p className='name__partner'>GCP</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={oracleLogo} alt="logo" />
                <p className='name__partner'>Oracle</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={teraformLogo} alt="logo" />
                <p className='name__partner'>Terraform</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={kubernetesLogo} alt="logo" />
                <p className='name__partner'>Kubernetes</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={linuxLogo} alt="logo" />
                <p className='name__partner'>Linux</p>
            </NavLink>
            <NavLink to={'/home'} className='box__partner'>
                <img className='logo__partner' src={moreLogo} alt="logo" />
                <p className='name__partner'>More</p>
            </NavLink>
        </div>

        </div>
    )
}

export default Partners