"use client"

import React from 'react'
import Image from 'next/image';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';

export const ShareButton = () => {

    const { user } = useAuthStore();
    
    const handleShare = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${user}`);
        toast.success("Successfully copied to your clipboard")
    }

    return (
        <button onClick={handleShare} className='h-10 w-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.2)] fixed top-5 right-10 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <Image src='/Share.svg' alt='sharelink' width={25} height={25} />
        </button>
    )
}
