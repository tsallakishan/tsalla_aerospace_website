"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import FlowingMenu from "./FlowingMenu"

export default function InnovationSection() {
    const items = [
        {
            link: '#',
            text: 'Family First',
            image: '/images/careers/Familyfirst.jpg',
            description: 'Platinum medical, dental, and vision coverage.'
        },
        {
            link: '#',
            text: 'NextGen Care',
            image: '/images/careers/NextGen.jpg',
            description: 'Fertility benefits and future family planning.'
        },
        {
            link: '#',
            text: 'Life Leave',
            image: '/images/careers/lifeleave.jpg',
            description: 'Unlimited paid time off when life happens.'
        },
        {
            link: '#',
            text: 'Mind Support',
            image: '/images/careers/MindSupport.jpg',
            description: '24/7 coaching and mental wellness stipends.'
        },
        {
            link: '#',
            text: 'Career Boost',
            image: '/images/careers/careerboost.jpg',
            description: 'Annual learning budgets and global mentorship.'
        }
    ];

    return (
        <section className="w-full bg-white text-black py-20 md:py-32 relative overflow-hidden">
            <ContentWrapper>
                <div className="flex flex-col items-center justify-center mb-4 md:mb-8 relative">
                    <h2
                        className="text-4xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tight text-center leading-[0.85] mb-12 font-clash"
                        style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                    >
                        Innovation<br />
                        in <span className="text-[#5ce1e6]">our</span><br />
                        DNA
                    </h2>

                    {/* Subheader aligned to left bottom of title area as per image reference */}
                    <div className="w-full relative mt-8 md:mt-12">
                        <span className="absolute top-0 left-0 -translate-y-full text-sm font-medium pb-2 uppercase tracking-wide">Why You’ll Love It Here</span>
                    </div>
                </div>

                <div className="h-[500px] w-full border border-neutral-200">
                    <FlowingMenu
                        items={items}
                        textColor="#000"
                        bgColor="#fff"
                        marqueeBgColor="#000"
                        marqueeTextColor="#fff"
                        borderColor="#e5e5e5"
                    />
                </div>
            </ContentWrapper>
        </section>
    )
}
