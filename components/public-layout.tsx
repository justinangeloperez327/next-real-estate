import React from 'react';
import Navbar from './navbar';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="public-layout">
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default PublicLayout;