import React from 'react';
import Laptop from '../assets/laptop.jpg';

const Analytics = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold ">
            The ministry of road transport and highway
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Pothole free National Highway
          </h1>
          <p>
            The government will soon firm up a roadmap to make India’s national
            highways pothole free by December 2023 with construction focus
            shifting from the engineering, procurement and construction (EPF)
            model to build-operate-transfer (BOT) model and the hybrid annuity
            model (HAM) for government projects under the ministry of road
            transport and highways.
          </p>
          <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
