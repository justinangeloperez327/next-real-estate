import React from 'react'

const ContactPage = () => {
    return (
        <section className='w-96 mx-auto justify-center my-20'>
            <h1 className='text-3xl font-bold'>Contact Us</h1>
            <form className='mt-8 space-y-6'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-white'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-white'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='message' className='block text-sm font-medium text-white'>
                        Message
                    </label>
                    <textarea
                        name='message'
                        id='message'
                        rows={4}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                        required
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ContactPage