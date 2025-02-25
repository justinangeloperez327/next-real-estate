'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Real Estate App";
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isPropertiesPage = pathname === '/properties';

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!(isHomePage || isPropertiesPage)) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage, isPropertiesPage]);

    return (
        <nav className={clsx("w-full z-50  top-0 flex justify-center border-b border-b-foreground/10 h-16",
            (isHomePage || isPropertiesPage) && (isScrolled ? 'fixed bg-gray-900' : 'fixed bg-transparent'),
            !(isHomePage || isPropertiesPage) && 'bg-gray-900'
        )}>
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>JUSTIN</Link>
                </div>
                <div className="flex gap-5 items-left font-semibold">
                    <Link href={"/properties"}>Properties</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/contact"}>Contact</Link>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/sign-in">Sign in</Link>

                    <Link href="/sign-up">Sign up</Link>
                </div>
            </div>
        </nav>
    )
}