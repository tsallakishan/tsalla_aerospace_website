"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function ThreeDMarqueeDemo() {
    const newsItems = [
        {
            title: "Tsalla Aerospace and Rheinmetall Partner to Design and Manufacture Advanced Propulsion Systems for Next-Gen Aircraft",
            image: "https://cdn.sanity.io/images/z5s3oquj/production/40c0d9411b398e8b3e1114c6269c39c9a86195f8-3840x2160.jpg?auto=format&fit=max&w=1920&q=90"
        },
        {
            title: "Riverside Research and Tsalla Aerospace Collaborate to Cyber Harden Critical Defense Capabilities",
            image: "https://cdn.sanity.io/images/z5s3oquj/production/987e977c745ccff57f4f705ca6335eb3ddf0dc5f-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
        },
        {
            title: "Tsalla Aerospace Unveils Revolutionary AI Pilot System for Autonomous Flight Operations",
            image: "https://cdn.sanity.io/images/z5s3oquj/production/8ba9aa42b68cb9b70f07dfe1583f4d0ed4477dd1-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
        }
    ];

    // Repeat items to fill 6 columns with enough depth
    const repeatedItems = Array.from({ length: 48 }, (_, i) => newsItems[i % newsItems.length]);

    return (
        <div className="mx-auto my-4 lg:my-6 max-w-[95rem] w-full">
            <ThreeDMarquee items={repeatedItems} />
        </div>
    );
}
