import Image from 'next/image';
import React from 'react'

interface CarouselProps {
  slides: string[];
}

const Carousel = ({ slides }: CarouselProps) => {
  return (
    <div className="flex overflow-x-scroll space-x-4">
        {slides.map((slide, index) => (
        <div key={index} className="carousel-slide min-w-full">
            <Image src={slide} alt={`Slide ${index + 1}`} className="w-full h-auto" />
        </div>
        ))}
  </div>
  )
}

export default Carousel