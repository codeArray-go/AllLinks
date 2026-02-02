"use client"

import React, { useEffect } from 'react'
import UseLoader from "@/store/loaderStore";
import { usePathname } from "next/navigation";

const Loader = () => {
    const { loading, hideLoader } = UseLoader();
    const pathname = usePathname();

    useEffect(() => {
        hideLoader();
    }, [pathname, hideLoader]);

    return loading ? (
        <div className='fixed top-0 right-0 h-screen w-screen bg-[rgba(255,255,255,0.6)] flex items-center justify-center z-50'>
            {/* <div className="w-12 text-blue-700"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"></animate></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"></animate></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"></animate></circle></svg></div> */}

            <div className="breeding-rhombus-spinner">
                <div className="rhombus child-1"></div>
                <div className="rhombus child-2"></div>
                <div className="rhombus child-3"></div>
                <div className="rhombus child-4"></div>
                <div className="rhombus child-5"></div>
                <div className="rhombus child-6"></div>
                <div className="rhombus child-7"></div>
                <div className="rhombus child-8"></div>
                <div className="rhombus big"></div>
            </div>
        </div>
    ) : null;
}

export default Loader
