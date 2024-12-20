import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { SocialGetAllApi } from '../Utils/Apis'
import { personal_info_Social__GetById } from '../Utils/Apis'


const Per_info_soc_pro = ({ data }) => {

    const staffId = data.data;

    const MyUserID = localStorage.getItem('MyUserID');

    const [forDelete, setForDelete] = useState(false)
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [searchKey, setSearchKey] = useState('')
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)
    const [status, setStatus] = useState()
    const [insttaaa, setInsttaaa] = useState('')

    const [faceBookUrl, setFaceBookUrl] = useState()
    const [linkedInUrl, setLinkedInUrl] = useState()
    const [twitterUrl, settwitterUrl] = useState()
    const [googlePlus, setGooglePlus] = useState()
    const [updateStatus, setUpdateStatus] = useState()

    console.log('true false', status)
    const [loader, setLoader] = useState(false)

    const [isValidFaceBookUrlRequired, setIsValidFaceBookUrlRequired] = useState(false);
    const [isValidLinkedInUrlRequired, setIsValidLinkedInUrlRequired] = useState(false);
    const [isValidGooglePlusRequired, setIsValidGooglePlusRequired] = useState(false);
    const [isValidTwitterUrlRequired, setIsValidTwitterUrlRequired] = useState(false);

    // ###### validation ##########
    const [errors, setErrors] = useState({});

    const FuncValidation = () => {

        //  faceBookUrl
        if (faceBookUrl === "" || !faceBookUrl) {
            setIsValidFaceBookUrlRequired(true)
        }
        else {
        }
        //  linkedInUrl
        if (linkedInUrl === "" || !linkedInUrl) {
            setIsValidLinkedInUrlRequired(true)
        }
        else {
        }
        // twitterUrl
        if (twitterUrl === "" || !twitterUrl) {
            setIsValidTwitterUrlRequired(true)
        }
        else {
        }
        // googlePlus
        if (googlePlus === "" || !googlePlus) {
            setIsValidGooglePlusRequired(true)
        }
        else {
        }

        return errors;
    }

    // faceBookUrl 
    const handlfaceBookUrl = (e2) => {
        setFaceBookUrl(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidFaceBookUrlRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidFaceBookUrlRequired(true)
        } else {
            setIsValidFaceBookUrlRequired(false)
        }
    }
    //   linkedInUrl
    const handlelinkedInUrl = (e2) => {
        setLinkedInUrl(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidLinkedInUrlRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidLinkedInUrlRequired(true)
        } else {
            setIsValidLinkedInUrlRequired(false)
        }
    }
    //   twitterUrl
    const handletwitterUrl = (e2) => {
        settwitterUrl(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidTwitterUrlRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTwitterUrlRequired(true)
        } else {
            setIsValidTwitterUrlRequired(false)
        }
    }
    //   googlePlus
    const handlegooglePlus = (e2) => {
        setGooglePlus(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidGooglePlusRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidGooglePlusRequired(true)
        } else {
            setIsValidGooglePlusRequired(false)
        }
    }


    // ###### validation ##########
    // User post Api 
    const ContactDataApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('faceBookUrl', faceBookUrl);
            formData.append('linkedInUrl', linkedInUrl);
            formData.append('instagramUrl', insttaaa);
            formData.append('twitterUrl', twitterUrl);
            formData.append('googlePlus', googlePlus);

            setLoader(true)
            try {
                const response = await SocialGetAllApi(MyUserID, formData);
                console.log('my staff post api response in SOCIALLLLLLLL', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    setStatus(response?.data?.status)
                    // setFunction(response?.data?.otherstaff?.staffStatus)

                    setLoader(false)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        MyStaffGetById()
    }, [])

    // Staff Get by id
    const MyStaffGetById = async () => {
        // setIdForUpdate(id);
        setLoader(true);
        try {
            const response = await personal_info_Social__GetById(MyUserID);
            console.log("my social information get by id api is here______________ ", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);

                setFaceBookUrl(response?.data?.social?.faceBookUrl);
                setLinkedInUrl(response?.data?.social?.linkedInUrl);
                settwitterUrl(response?.data?.social?.twitterUrl);
                setGooglePlus(response?.data?.social?.googlePlus);

                setLoader(false);
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row px-3 mt-4 ">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <label for="basic-url" class="form-label mb-0">Facebook</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text p-0" id="basic-addon1">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5557_2563)">
                                        <path d="M37 34.6875C37 35.964 35.964 37 34.6875 37H2.3125C1.036 37 0 35.964 0 34.6875V2.3125C0 1.036 1.036 0 2.3125 0H34.6875C35.964 0 37 1.036 37 2.3125V34.6875Z" fill="#3B5998" />
                                        <path d="M25.4375 37V23.125H30.0625L31.2188 17.3438H25.4375V15.0312C25.4375 12.7188 26.5961 11.5625 28.9062 11.5625H31.2188V5.78125C30.0625 5.78125 28.6287 5.78125 26.5938 5.78125C22.3445 5.78125 19.6562 9.11241 19.6562 13.875V17.3438H15.0312V23.125H19.6562V37H25.4375Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5557_2563">
                                            <rect width="37" height="37" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <input type="text" class="form-control form-control-sm" value={faceBookUrl} onChange={(e) => handlfaceBookUrl(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className='pt-1'>
                            {isValidFaceBookUrlRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid userName is required
                                </p>
                            )}
                        </div>
                        <label for="basic-url" class="form-label mb-0">Twitter</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text p-0" id="basic-addon1">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5557_2594)">
                                        <path d="M32.375 37H4.625C2.072 37 0 34.928 0 32.375V4.625C0 2.072 2.072 0 4.625 0H32.375C34.928 0 37 2.072 37 4.625V32.375C37 34.928 34.928 37 32.375 37Z" fill="#1DA1F2" />
                                        <path d="M14.2066 27.898C22.9293 27.898 27.7023 20.6645 27.7023 14.4022C27.7023 14.1987 27.7023 13.9952 27.6931 13.7917C28.6181 13.1257 29.4228 12.284 30.0611 11.3312C29.2101 11.7105 28.2943 11.9602 27.3323 12.0805C28.3128 11.4977 29.0621 10.5635 29.4228 9.45349C28.5071 9.99924 27.4896 10.3877 26.4073 10.6005C25.5378 9.67549 24.3076 9.10199 22.9478 9.10199C20.3301 9.10199 18.2026 11.2295 18.2026 13.8472C18.2026 14.2172 18.2488 14.578 18.3228 14.9295C14.3823 14.7352 10.8858 12.839 8.54556 9.97149C8.13856 10.6745 7.90731 11.4885 7.90731 12.358C7.90731 14.0045 8.74906 15.4567 10.0163 16.3077C9.23931 16.28 8.50856 16.0672 7.87031 15.7157V15.7805C7.87031 18.0745 9.50756 19.9985 11.6721 20.4332C11.2743 20.5442 10.8581 20.5997 10.4233 20.5997C10.1181 20.5997 9.82206 20.572 9.53531 20.5165C10.1366 22.4035 11.8941 23.7725 13.9661 23.8095C12.3381 25.086 10.2938 25.8445 8.07381 25.8445C7.69456 25.8445 7.31531 25.826 6.94531 25.7797C9.03581 27.1117 11.5333 27.898 14.2066 27.898Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5557_2594">
                                            <rect width="37" height="37" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </span>
                            <input type="text" class="form-control form-control-sm" value={twitterUrl} onChange={(e) => handletwitterUrl(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className='pt-1'>
                            {isValidTwitterUrlRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid userName is required
                                </p>
                            )}
                        </div>

                        <label for="basic-url" class="form-label mb-0">Google Plus</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text p-0" id="basic-addon1">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5557_2598)">
                                        <path opacity="0.2" d="M34.0789 0H2.92105C1.31447 0 0 1.31447 0 2.92105V3.16447C0 1.55789 1.31447 0.243421 2.92105 0.243421H34.0789C35.6855 0.243421 37 1.55789 37 3.16447V2.92105C37 1.31447 35.6855 0 34.0789 0Z" fill="white" />
                                        <path d="M34.0789 37H2.92105C1.31447 37 0 35.6855 0 34.0789V2.92105C0 1.31447 1.31447 0 2.92105 0H34.0789C35.6855 0 37 1.31447 37 2.92105V34.0789C37 35.6855 35.6855 37 34.0789 37Z" fill="#DD4B38" />
                                        <path opacity="0.2" d="M34.0789 36.7566H2.92105C1.31447 36.7566 0 35.4421 0 33.8355V34.0789C0 35.6855 1.31447 37 2.92105 37H34.0789C35.6855 37 37 35.6855 37 34.0789V33.8355C37 35.4421 35.6855 36.7566 34.0789 36.7566Z" fill="#BE3A26" />
                                        <path opacity="0.2" d="M34.0789 0H2.92105C1.31447 0 0 1.31447 0 2.92105V3.16447C0 1.55789 1.31447 0.243421 2.92105 0.243421H34.0789C35.6855 0.243421 37 1.55789 37 3.16447V2.92105C37 1.31447 35.6855 0 34.0789 0Z" fill="white" />
                                        <path opacity="0.1" d="M34.0789 37H18.5V0H34.0789C35.6855 0 37 1.31447 37 2.92105V34.0789C37 35.6855 35.6855 37 34.0789 37Z" fill="white" />
                                        <path d="M27.6537 17.8915C27.6537 18.2322 27.532 18.3783 27.1668 18.3783C26.3635 18.3783 25.5603 18.3783 24.757 18.3783C24.6839 18.3783 24.5866 18.3783 24.4892 18.3783C24.4892 18.4757 24.4892 18.5487 24.4892 18.6217C24.4892 19.425 24.4892 20.2283 24.4892 21.0316C24.4892 21.3967 24.3675 21.5428 23.978 21.5428C23.7833 21.5428 23.5642 21.5428 23.3695 21.5428C23.0774 21.5428 22.9313 21.3967 22.9313 21.1046C22.9313 20.277 22.9313 19.4493 22.9313 18.6461C22.9313 18.573 22.9313 18.5 22.9313 18.4026C22.8339 18.4026 22.7609 18.4026 22.6879 18.4026C21.8846 18.4026 21.0813 18.4026 20.278 18.4026C19.9129 18.4026 19.7668 18.2809 19.7668 17.8915C19.7668 17.6967 19.7668 17.5263 19.7668 17.3316C19.7668 16.9665 19.8885 16.8204 20.2537 16.8204C21.057 16.8204 21.8359 16.8204 22.6392 16.8204C22.7122 16.8204 22.8096 16.8204 22.907 16.8204C22.907 16.723 22.907 16.65 22.907 16.577C22.907 15.7737 22.907 14.9704 22.907 14.1428C22.907 13.7776 23.0287 13.6559 23.3938 13.6559C23.5642 13.6559 23.7346 13.6559 23.905 13.6559C24.3431 13.6559 24.4649 13.7776 24.4649 14.1915C24.4649 14.9704 24.4649 15.7737 24.4649 16.5526C24.4649 16.6257 24.4649 16.6987 24.4649 16.7961C24.5622 16.7961 24.6353 16.7961 24.7326 16.7961C25.5359 16.7961 26.3149 16.7961 27.1181 16.7961C27.4833 16.7961 27.6293 16.9178 27.6293 17.3072C27.6537 17.5263 27.6537 17.6967 27.6537 17.8915ZM20.0103 10.8809C19.7425 11.0757 19.4504 11.2704 19.1826 11.4895C18.9879 11.6355 18.8175 11.7329 18.5741 11.6842C18.5254 11.6842 18.4767 11.6842 18.428 11.6842C18.4524 11.7329 18.4524 11.7572 18.4767 11.7572C19.4504 13.0961 19.6695 15.3112 17.8195 16.8447C17.6004 17.0151 17.3813 17.1855 17.1866 17.3803C16.8945 17.648 16.7484 18.0132 17.1379 18.4026C17.4056 18.6704 17.6978 18.9382 17.9899 19.1816C18.1359 19.3276 18.3063 19.425 18.4767 19.5467C20.1806 20.8368 20.2537 23.3441 19.2313 24.6586C18.6228 25.4618 17.8195 25.9974 16.8701 26.2651C14.9958 26.825 13.1458 26.679 11.3445 25.9C10.9793 25.754 10.6385 25.5105 10.3464 25.2671C9.37275 24.4638 9.12933 23.3197 9.66486 22.1513C10.176 21.0559 11.0524 20.3743 12.1478 19.9118C12.8537 19.6197 13.5839 19.4737 14.3385 19.4493C14.4116 19.4493 14.4846 19.4493 14.6063 19.4493C14.3629 18.9625 14.2899 18.4757 14.4116 17.9888C14.0951 17.9401 13.7787 17.9158 13.4622 17.8428C11.5635 17.4046 10.3464 15.7737 10.4681 13.8263C10.5168 12.95 10.9306 12.2197 11.5392 11.5868C12.4885 10.6132 13.6813 10.102 15.0445 10.0776C16.651 10.0533 18.2576 10.0776 19.8399 10.0776C20.0589 10.0776 20.205 10.1263 20.278 10.3454C20.278 10.5888 20.2293 10.7349 20.0103 10.8809ZM12.5616 21.5184C12.2451 21.7618 12.0017 22.0783 11.9043 22.4921C11.7339 23.2711 12.0504 23.904 12.6346 24.3908C13.2918 24.9507 14.0951 25.0967 14.9471 25.0724C15.0931 25.0724 15.2392 25.0724 15.3853 25.048C15.9451 24.9993 16.505 24.8533 17.0162 24.5612C17.8925 24.05 18.2576 22.4434 17.2109 21.6888C16.8458 21.4211 16.4806 21.1533 16.0912 20.8855C16.0425 20.8612 16.0181 20.8368 15.9695 20.8368C14.728 20.5447 13.5839 20.7395 12.5616 21.5184ZM16.3589 13.1691C16.0912 12.5605 15.6774 12.0493 15.0445 11.7572C14.2412 11.3678 13.4866 11.6599 13.1214 12.4388C12.951 12.804 12.878 13.1691 12.9024 13.5586C12.9267 14.6053 13.2918 15.5059 14.0708 16.2118C14.3385 16.4553 14.655 16.65 15.0445 16.6987C15.7017 16.7961 16.2616 16.4553 16.5537 15.7493C16.8458 14.8974 16.7484 14.0211 16.3589 13.1691Z" fill="white" />
                                        <g opacity="0.2">
                                            <path d="M10.418 14.1184C10.4667 13.2421 10.8805 12.5119 11.489 11.879C12.4384 10.9053 13.6311 10.3941 14.9943 10.3697C16.6009 10.3454 18.2074 10.3697 19.7897 10.3697C20.0088 10.3697 20.1548 10.4184 20.2278 10.6375C20.2522 10.5645 20.2522 10.4915 20.2278 10.3941C20.1548 10.175 19.9844 10.1263 19.7897 10.1263C18.1831 10.1263 16.5765 10.102 14.9943 10.1263C13.6311 10.1507 12.4627 10.6375 11.489 11.6355C10.8805 12.2441 10.4667 12.9987 10.418 13.875C10.418 14.0211 10.418 14.1428 10.418 14.2888C10.418 14.2158 10.418 14.1671 10.418 14.1184Z" fill="white" />
                                            <path d="M24.5117 17.0638C24.6091 17.0638 24.6821 17.0638 24.7795 17.0638C25.5828 17.0638 26.3617 17.0638 27.165 17.0638C27.5301 17.0638 27.6762 17.1855 27.6762 17.5507C27.6762 17.4776 27.6762 17.3803 27.6762 17.3073C27.6762 16.9421 27.5545 16.7961 27.165 16.7961C26.3617 16.7961 25.5828 16.7961 24.7795 16.7961C24.7065 16.7961 24.6334 16.7961 24.5117 16.7961C24.5117 16.8934 24.5117 16.9665 24.5117 17.0638Z" fill="white" />
                                            <path d="M18.5757 11.9276C18.5271 11.9276 18.5027 11.9276 18.4297 11.9276C18.454 11.9763 18.454 12.0007 18.4784 12.0007C18.8922 12.5849 19.16 13.3151 19.2086 14.0941C19.2086 13.3151 18.9652 12.5362 18.5757 11.9276Z" fill="white" />
                                            <path d="M14.0473 16.4796C14.3151 16.723 14.6315 16.9178 15.021 16.9665C15.6782 17.0638 16.2381 16.723 16.5302 16.0171C16.6763 15.6276 16.7493 15.2138 16.725 14.8244C16.7006 15.1408 16.6519 15.4572 16.5302 15.7737C16.2625 16.4796 15.7026 16.8204 15.021 16.723C14.6559 16.6744 14.3394 16.4796 14.0473 16.2362C13.2927 15.5303 12.9276 14.654 12.8789 13.6559C12.8789 13.7046 12.8789 13.7533 12.8789 13.8263C12.9032 14.8487 13.2684 15.7737 14.0473 16.4796Z" fill="white" />
                                            <path d="M19.8164 17.3316C19.8164 17.4046 19.8164 17.502 19.8164 17.575C19.8164 17.2099 19.9381 17.0638 20.3032 17.0638C21.1065 17.0638 21.8855 17.0638 22.6888 17.0638C22.7618 17.0638 22.8592 17.0638 22.9565 17.0638C22.9565 16.9665 22.9565 16.8934 22.9565 16.8204C22.9565 16.0171 22.9565 15.2138 22.9565 14.3862C22.9565 14.0211 23.0782 13.8994 23.4434 13.8994C23.6138 13.8994 23.7842 13.8994 23.9546 13.8994C24.3927 13.8994 24.5144 14.0211 24.5144 14.4349C24.5144 15.2138 24.5144 16.0171 24.5144 16.7961C24.5144 16.6987 24.5144 16.6257 24.5144 16.5526C24.5144 15.7737 24.5144 14.9704 24.5144 14.1915C24.5144 13.7776 24.3927 13.6559 23.9546 13.6559C23.7842 13.6559 23.6138 13.6559 23.4434 13.6559C23.0782 13.6559 22.9565 13.7776 22.9565 14.1428C22.9565 14.9461 22.9565 15.7494 22.9565 16.577C22.9565 16.65 22.9565 16.723 22.9565 16.8204C22.8592 16.8204 22.7618 16.8204 22.6888 16.8204C21.8855 16.8204 21.1065 16.8204 20.3032 16.8204C19.9381 16.8204 19.8164 16.9665 19.8164 17.3316Z" fill="white" />
                                            <path d="M18.4267 19.5954C18.2563 19.4737 18.0859 19.352 17.9399 19.2303C17.6478 18.9625 17.3557 18.7191 17.0879 18.4513C16.9662 18.3296 16.8932 18.2079 16.8688 18.0862C16.8201 18.2809 16.8688 18.4757 17.0879 18.6947C17.3557 18.9625 17.6478 19.2303 17.9399 19.4737C18.0859 19.6197 18.2563 19.7171 18.4267 19.8388C19.376 20.5447 19.8142 21.6401 19.8386 22.6869C19.8872 21.5671 19.4491 20.35 18.4267 19.5954Z" fill="white" />
                                            <path d="M14.3151 18.2566C14.2908 18.3783 14.2908 18.5 14.3151 18.6217C14.3151 18.5 14.3395 18.4026 14.3638 18.2809C14.3395 18.2809 14.3395 18.2809 14.3151 18.2566Z" fill="white" />
                                            <path d="M9.61609 22.4434C10.1273 21.348 11.0036 20.6665 12.099 20.204C12.8049 19.9118 13.5352 19.7658 14.2898 19.7415C14.3628 19.7415 14.4358 19.7415 14.5575 19.7415C14.5089 19.6684 14.4845 19.5711 14.4358 19.498C14.3871 19.498 14.3141 19.498 14.2654 19.498C13.5108 19.5224 12.7806 19.6684 12.0746 19.9605C10.9793 20.423 10.1029 21.1046 9.59175 22.2C9.39702 22.6382 9.29965 23.0763 9.32399 23.4901C9.37267 23.1493 9.4457 22.7842 9.61609 22.4434Z" fill="white" />
                                            <path d="M12.6358 24.6342C13.2931 25.1941 14.0964 25.3401 14.9483 25.3158C15.0944 25.3158 15.2404 25.3158 15.3865 25.2915C15.9464 25.2428 16.5062 25.0967 17.0174 24.8046C17.5529 24.4882 17.8937 23.7823 17.845 23.1007C17.7964 23.7092 17.4799 24.2934 17.0174 24.5612C16.5062 24.8533 15.9707 24.975 15.3865 25.048C15.2404 25.0724 15.0944 25.0724 14.9483 25.0724C14.0964 25.0967 13.3174 24.9507 12.6358 24.3908C12.1733 24.0257 11.9056 23.5632 11.8569 23.0276C11.8325 23.6849 12.1246 24.2204 12.6358 24.6342Z" fill="white" />
                                        </g>
                                        <path opacity="0.2" d="M11.4656 11.879C12.4149 10.9053 13.6077 10.3941 14.9708 10.3697C16.5774 10.3454 18.184 10.3697 19.7662 10.3697C19.9853 10.3697 20.1314 10.4184 20.2044 10.6375C20.2287 10.5645 20.2287 10.4915 20.2044 10.3941C20.1557 10.248 20.034 10.175 19.9123 10.1263C19.9123 10.1263 19.9123 10.1263 19.888 10.1263C19.8636 10.1263 19.8393 10.1263 19.8393 10.1263C19.8149 10.1263 19.7906 10.1263 19.7662 10.1263C18.1597 10.1263 16.5531 10.102 14.9708 10.1263C13.6077 10.1507 12.4393 10.6375 11.4656 11.6355C10.857 12.2441 10.4432 12.9987 10.3945 13.875C10.3945 14.0211 10.3945 14.1428 10.3945 14.2888C10.3945 14.2401 10.3945 14.1915 10.3945 14.1184C10.4676 13.2178 10.857 12.4875 11.4656 11.879Z" fill="#202020" />
                                        <g opacity="0.2">
                                            <path d="M16.3596 13.1691C16.0918 12.5605 15.678 12.0493 15.0451 11.7572C14.2418 11.3678 13.4872 11.6599 13.1221 12.4388C12.9517 12.804 12.8787 13.1691 12.903 13.5586C12.903 13.5829 12.903 13.6072 12.903 13.6316C12.9273 13.2908 12.976 12.9743 13.1221 12.6579C13.4872 11.8546 14.2662 11.5868 15.0451 11.9763C15.678 12.2684 16.0675 12.7796 16.3596 13.3882C16.5787 13.8507 16.7004 14.3375 16.7247 14.8C16.7491 14.2645 16.603 13.7046 16.3596 13.1691Z" fill="#202020" />
                                            <path d="M17.2107 21.6888C16.8456 21.4211 16.4805 21.1533 16.091 20.8855C16.0423 20.8612 16.018 20.8368 15.9693 20.8368C14.7278 20.5447 13.5838 20.7151 12.5614 21.5184C12.2449 21.7619 12.0015 22.0783 11.9042 22.4921C11.8555 22.6869 11.8555 22.8572 11.8555 23.0033C11.8555 22.9059 11.8798 22.8086 11.9042 22.7355C12.0015 22.3217 12.2449 22.0053 12.5614 21.7619C13.5838 20.9586 14.7278 20.7882 15.9693 21.0803C16.018 21.0803 16.0667 21.1046 16.091 21.129C16.4561 21.3967 16.8213 21.6645 17.2107 21.9322C17.6245 22.2243 17.8193 22.6625 17.8436 23.1007C17.868 22.5895 17.6976 22.054 17.2107 21.6888Z" fill="#202020" />
                                            <path d="M17.7942 16.8447C17.5751 17.0151 17.356 17.1855 17.1613 17.3803C16.9666 17.575 16.8449 17.7941 16.8935 18.0375C16.9422 17.8915 17.0396 17.7454 17.1613 17.6237C17.356 17.429 17.5751 17.2586 17.7942 17.0882C18.8409 16.2118 19.2304 15.1408 19.1817 14.0941C19.1574 15.0678 18.7679 16.0658 17.7942 16.8447Z" fill="#202020" />
                                            <path d="M14.4607 19.498C14.485 19.498 14.5337 19.498 14.5824 19.498C14.4363 19.2059 14.339 18.9138 14.339 18.6217C14.2903 18.9138 14.339 19.2059 14.4607 19.498Z" fill="#202020" />
                                            <path d="M20.2271 10.6375C20.2028 10.7105 20.1297 10.7836 20.008 10.8809C19.7403 11.0757 19.4482 11.2704 19.1804 11.4895C18.9857 11.6355 18.8153 11.7329 18.5718 11.6842C18.5232 11.6842 18.4745 11.6842 18.4258 11.6842C18.4501 11.7329 18.4501 11.7572 18.4745 11.7572C18.4988 11.8059 18.5475 11.8546 18.5718 11.9033C18.5718 11.9033 18.5718 11.9033 18.5962 11.9033C18.8396 11.9276 19.0343 11.8546 19.2047 11.7086C19.4725 11.4895 19.7403 11.3191 20.0324 11.1C20.2271 10.9783 20.2758 10.8322 20.2271 10.6375Z" fill="#202020" />
                                            <path d="M13.4135 18.1105C13.7056 18.1836 14.022 18.2079 14.3141 18.2566C14.3141 18.1836 14.3385 18.1105 14.3628 18.0132C14.0464 17.9645 13.7299 17.9401 13.4135 17.8671C11.6609 17.4533 10.4681 16.0171 10.4194 14.2645C10.3707 16.1388 11.5635 17.6724 13.4135 18.1105Z" fill="#202020" />
                                            <path d="M22.9809 18.3783C22.8835 18.3783 22.8105 18.3783 22.7375 18.3783C21.9342 18.3783 21.1309 18.3783 20.3276 18.3783C19.9625 18.3783 19.8164 18.2566 19.8164 17.8671C19.8164 17.9401 19.8164 18.0375 19.8164 18.1105C19.8164 18.4757 19.9381 18.6217 20.3276 18.6217C21.1309 18.6217 21.9342 18.6217 22.7375 18.6217C22.8105 18.6217 22.8835 18.6217 22.9809 18.6217C22.9809 18.5487 22.9809 18.4757 22.9809 18.3783Z" fill="#202020" />
                                            <path d="M27.6521 17.8915C27.6521 18.2322 27.5303 18.3783 27.1652 18.3783C26.3619 18.3783 25.5586 18.3783 24.7553 18.3783C24.6823 18.3783 24.585 18.3783 24.4876 18.3783C24.4876 18.4757 24.4876 18.5487 24.4876 18.6217C24.4876 19.425 24.4876 20.2283 24.4876 21.0316C24.4876 21.3967 24.3659 21.5428 23.9764 21.5428C23.7817 21.5428 23.5626 21.5428 23.3678 21.5428C23.0757 21.5428 22.9297 21.3967 22.9297 21.1046C22.9297 20.277 22.9297 19.4494 22.9297 18.6461C22.9297 18.7434 22.9297 18.8165 22.9297 18.8895C22.9297 19.7171 22.9297 20.5447 22.9297 21.348C22.9297 21.6401 23.0757 21.7862 23.3678 21.7862C23.5626 21.7862 23.7817 21.7862 23.9764 21.7862C24.3415 21.7862 24.4876 21.6645 24.4876 21.275C24.4876 20.4717 24.4876 19.6684 24.4876 18.8651C24.4876 18.7921 24.4876 18.7191 24.4876 18.6217C24.585 18.6217 24.658 18.6217 24.7553 18.6217C25.5586 18.6217 26.3619 18.6217 27.1652 18.6217C27.506 18.6217 27.6521 18.4757 27.6521 18.1349C27.6521 17.9401 27.6521 17.7454 27.6521 17.575C27.6521 17.6724 27.6521 17.7941 27.6521 17.8915Z" fill="#202020" />
                                            <path d="M19.206 24.6829C18.5974 25.4862 17.7941 26.0217 16.8448 26.2895C14.9705 26.8493 13.1205 26.7033 11.3191 25.9243C10.954 25.7783 10.6132 25.5349 10.3211 25.2915C9.71256 24.7803 9.39611 24.1717 9.37177 23.4901C9.32309 24.2691 9.66388 24.975 10.3211 25.5349C10.6132 25.7783 10.9783 26.0217 11.3191 26.1678C13.1205 26.9467 14.9705 27.0928 16.8448 26.5329C17.7941 26.2651 18.5974 25.7296 19.206 24.9263C19.6685 24.3421 19.8876 23.5145 19.8632 22.6625C19.8389 23.4415 19.6198 24.1717 19.206 24.6829Z" fill="#202020" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5557_2598">
                                            <rect width="37" height="37" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </span>
                            <input type="text" class="form-control form-control-sm" value={googlePlus} onChange={(e) => handlegooglePlus(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className='pt-1'>
                            {isValidGooglePlusRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid userName is required
                                </p>
                            )}
                        </div>
                        <label for="basic-url" class="form-label mb-0">Linkedin</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text p-0" id="basic-addon1">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5557_2628)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37 4.625C37 2.07236 34.9276 0 32.375 0H4.625C2.07236 0 0 2.07236 0 4.625V32.375C0 34.9276 2.07236 37 4.625 37H32.375C34.9276 37 37 34.9276 37 32.375V4.625Z" fill="#2867B2" />
                                        <path d="M10.6077 12.9115H4.41016V31.5533H10.6077V12.9115Z" fill="white" />
                                        <path d="M7.55263 3.92258C5.43228 3.92258 4.04688 5.31658 4.04688 7.14367C4.04688 8.93239 5.39015 10.3648 7.4706 10.3648H7.51064C9.6716 10.3648 11.0167 8.93239 11.0167 7.14367C10.9766 5.31658 9.67174 3.92258 7.55263 3.92258Z" fill="white" />
                                        <path d="M25.8194 12.4731C22.532 12.4731 21.0595 14.281 20.235 15.5508V12.9115H14.0391C14.1212 14.6601 14.0391 31.5532 14.0391 31.5532H20.2349V21.1423C20.2349 20.5851 20.2749 20.028 20.4392 19.6297C20.8864 18.5168 21.9065 17.3641 23.6184 17.3641C25.8595 17.3641 26.7573 19.0741 26.7573 21.5791V31.5532H32.9534V20.8629C32.9534 15.1368 29.8962 12.4731 25.8194 12.4731Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5557_2628">
                                            <rect width="37" height="37" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </span>
                            <input type="text" class="form-control form-control-sm" value={linkedInUrl} onChange={(e) => handlelinkedInUrl(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className='pt-1'>
                            {isValidLinkedInUrlRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid userName is required
                                </p>
                            )}
                        </div>

                        <div className="row mt-4 buttons-tops">
                            <div className='my-button11 heading-14'>
                                {
                                    updateStatus === "success"
                                        ?
                                        <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Update Social</button>
                                        :
                                        <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Submit Social</button>

                                }
                                <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Per_info_soc_pro
