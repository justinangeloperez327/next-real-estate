export default function Testimonials() {
    return (
        <section className="py-20 ">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl mb-4">What Our Clients Say</h2>
                <h6 className="text-md mb-6">Testimonials from our happy clients</h6>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 shadow-lg rounded-sm">
                        <p className="text-gray-800 mb-4">"The best real estate service I have ever experienced. Highly recommended!"</p>
                        <h5 className="text-lg font-bold text-black">John Doe</h5>
                        <p className="text-sm text-gray-500">Home Buyer</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-sm">
                        <p className="text-gray-800 mb-4">"Professional and efficient. They helped me find my dream home in no time."</p>
                        <h5 className="text-lg font-bold text-black">Jane Smith</h5>
                        <p className="text-sm text-gray-500">Home Buyer</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-sm">
                        <p className="text-gray-800 mb-4">"Great experience from start to finish. The team was very supportive."</p>
                        <h5 className="text-lg font-bold text-black">Michael Johnson</h5>
                        <p className="text-sm text-gray-500">Home Seller</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
