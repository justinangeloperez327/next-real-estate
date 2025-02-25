'use client';

import { deleteProperty } from '@/app/(admin)/dashboard/properties/actions';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

interface DeleteButtonProps {
    propertyId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ propertyId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        // Handle delete logic here
        await deleteProperty(propertyId);
        console.log('Property deleted');
        setIsModalOpen(false);
        redirect('/dashboard/properties');
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="px-3 py-1.5 bg-gray-400 hover:bg-red-700 rounded-md">Delete</button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg text-black">
                        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                        <p className="mb-6">Do you really want to delete this property? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;