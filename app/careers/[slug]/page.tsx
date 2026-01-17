"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { MoveLeft, MapPin, Briefcase, Paperclip, ChevronsRight } from "lucide-react"
import { allJobs } from "../data/jobs"
import { ContentWrapper } from "@/components/ContentWrapper"
import { useState, use } from "react"

export default function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const job = allJobs.find((j) => j.slug === slug)

    if (!job) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#F9F9F7] text-black font-sans selection:bg-[#F3E5D8]">
            <ContentWrapper>
                <div className="pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

                    {/* LEFT COLUMN - STICKY INFO */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit lg:-ml-24">
                        <Link
                            href="/careers#open-positions"
                            className="group inline-flex items-center gap-3 px-5 py-2 bg-white border border-neutral-200 hover:border-[#5ce1e6] rounded-full transition-all duration-300 mb-12 hover:shadow-[0_4px_20px_-10px_rgba(92,225,230,0.4)]"
                        >
                            <div className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-[#5ce1e6] flex items-center justify-center transition-all duration-300">
                                <MoveLeft size={12} className="text-neutral-500 group-hover:text-black transition-colors" />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest text-neutral-500 group-hover:text-[#5ce1e6] transition-colors">Back</span>
                        </Link>

                        <h1
                            className="text-4xl md:text-6xl font-bold uppercase leading-[0.9] mb-8 tracking-tight"
                            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                        >
                            {job.title}
                        </h1>

                        <div className="flex flex-col gap-4 text-sm font-medium text-neutral-600">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Briefcase size={18} />
                                <span>{job.department}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - CONTENT & FORM */}
                    <div className="lg:col-span-7">
                        {/* ABOUT */}
                        <section className="mb-16">
                            <h2 className="text-xl font-medium mb-6">About The Position</h2>
                            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                                {job.about}
                            </p>
                            <br />
                            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                                {job.shortDescription}
                            </p>
                        </section>

                        {/* RESPONSIBILITIES */}
                        <section className="mb-16">
                            <h2 className="text-xl font-medium mb-6">Key Responsibilities:</h2>
                            <ul className="space-y-4">
                                {job.responsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm md:text-base leading-relaxed">
                                        <ChevronsRight className="w-5 h-5 text-[#5ce1e6] shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* REQUIREMENTS */}
                        <section className="mb-20">
                            <h2 className="text-xl font-medium mb-6">Requirements</h2>
                            <ul className="space-y-4">
                                {job.requirements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm md:text-base leading-relaxed">
                                        <ChevronsRight className="w-5 h-5 text-[#5ce1e6] shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* DIVIDER */}
                        <div className="w-full h-px bg-[#E5E5E0] mb-20 relative overflow-hidden">
                            <div className="absolute left-0 top-0 w-4 h-4 -translate-y-1/2 -ml-2 -rotate-45 border border-[#5ce1e6]" />
                            <div className="absolute right-0 top-0 w-4 h-4 -translate-y-1/2 -mr-2 -rotate-45 border border-[#5ce1e6]" />
                        </div>

                        {/* APPLICATION FORM */}
                        <section id="application-form">
                            <div className="relative p-8 md:p-12 bg-neutral-900 border border-white/5">
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#5ce1e6]" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#5ce1e6]" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#5ce1e6]" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#5ce1e6]" />

                                <h3 className="text-2xl text-white font-bold mb-8 font-clash uppercase tracking-wider">Apply for this role</h3>

                                <form className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">First name</label>
                                            <input type="text" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Last name</label>
                                            <input type="text" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email</label>
                                        <input type="email" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Phone</label>
                                        <input type="tel" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                    </div>

                                    {/* Attachments */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Resume</label>
                                        <div className="flex items-center gap-4">
                                            <button type="button" className="text-sm text-[#5ce1e6] hover:text-white font-medium flex items-center gap-2 transition-colors">
                                                <Paperclip size={14} />
                                                Attach Resume
                                            </button>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">LinkedIn Profile URL</label>
                                        <input type="url" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Personal website</label>
                                        <input type="url" className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors" />
                                    </div>

                                    {/* Cover Letter */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Cover Letter</label>
                                        <div>
                                            <button type="button" className="text-sm text-[#5ce1e6] hover:text-white font-medium flex items-center gap-2 transition-colors">
                                                <Paperclip size={14} />
                                                Attach Cover Letter
                                            </button>
                                        </div>
                                    </div>

                                    {/* Portfolio */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Portfolio</label>
                                        <div>
                                            <button type="button" className="text-sm text-[#5ce1e6] hover:text-white font-medium flex items-center gap-2 transition-colors">
                                                <Paperclip size={14} />
                                                Attach Portfolio
                                            </button>
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Personal note</label>
                                        <textarea className="w-full h-32 p-4 bg-white/5 border border-white/10 text-white rounded-none focus:outline-none focus:border-[#5ce1e6] transition-colors resize-y" />
                                    </div>

                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-[#5ce1e6] hover:bg-[#4aced3] text-black font-bold text-sm uppercase tracking-wider rounded-none transition-all hover:scale-[1.01]"
                                        >
                                            Submit Application
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </ContentWrapper>
        </main>
    )
}
