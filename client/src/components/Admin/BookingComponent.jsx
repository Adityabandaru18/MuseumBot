import React from 'react';

const BookingComponent = ({ title,subtitle, times, bookings, remaining }) => {
  return (
    <div className="booking-container">
      <h2 className='ShowTitle'>{title}</h2>
      <h2 className='ShowSubTitle'>{subtitle}</h2>
      <div className="times">
        <div className="times-hed">
        <p>Booked</p>
        <p>Remaining</p>
        </div>
        
        {times.map((time, index) => (
          <div key={index} className="time-slot">
            <p className='slot-time'>{time}</p>
            <p className='book-count'>{bookings[index]}</p>
            <p className='book-count'>{remaining[index]}</p>
          </div>
        ))}
      </div>
      <button className='stop-btn'>Stop Booking</button>
    </div>
  );
};

export default BookingComponent;
