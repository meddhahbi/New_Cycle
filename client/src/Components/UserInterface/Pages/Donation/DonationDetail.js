import React, {useEffect} from 'react';
import DonationSidebar from "./DonationSidebar";

function DonationDetail(props) {
    const postId = localStorage.getItem("postId")
    useEffect(()=>{

    })
    return (
        <section className="blog-section section-b-space">
            <div className="container-fluid-lg">
                <div className="row g-sm-4 g-3">
                    <DonationSidebar/>
                </div>
            </div>
        </section>
    );
}

export default DonationDetail;
