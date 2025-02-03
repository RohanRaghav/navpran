import React, { useState, useEffect, useRef } from 'react';

const Slider = () => {
  const images = [
    'abc.jpg',
    'abcd.jpg',
    'abcde.jpg',
    'doctors.jpg', // Replace with actual image paths
  ];

  const [index, setIndex] = useState(0);
  const slideInterval = useRef(null);

  const moveToSlide = (newIndex) => {
    if (newIndex < 0) {
      setIndex(images.length - 1); // Wrap to the last slide
    } else if (newIndex >= images.length) {
      setIndex(0); // Wrap to the first slide
    } else {
      setIndex(newIndex);
    }
  };

  const startAutoplay = () => {
    slideInterval.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoplay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="slider" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="slider-text"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%', // Covers half of the slider
          background: 'linear-gradient(to left, rgba(208, 236, 247, 0), rgba(50, 108, 153, 1))', // Gradient background
          color: 'white',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            Welcome to Our Slider
          </h1>
          <p style={{ fontSize: '1.2rem' }}>
            This is a description text that overlays the slider images. You can
            customize it as needed.
          </p>
        </div>
      </div>
      <div
        className="slider-container"
        style={{
          display: 'flex',
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
          width: '100vw',
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className="slider-image"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ))}
      </div>
      <button
        className="prev-btn"
        onClick={() => moveToSlide(index - 1)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '10px',
        }}
      >
        ❮
      </button>
      <button
        className="next-btn"
        onClick={() => moveToSlide(index + 1)}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '10px',
        }}
      >
        ❯
      </button>
      <div
        className="indicators"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => moveToSlide(i)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index === i ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
