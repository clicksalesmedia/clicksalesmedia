import React from "react";

export default function Portfolio() {
  return (
    <section>
      <div className="px-6 m-auto">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          {/* Column 1/2 with background, overlay, title, and button */}
          <div className="col-span-4 lg:col-span-6 relative">
            <img src="/expertise/branding/projects/morocco-matashi.jpg" alt="Branding & Brand Strategy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            {/*
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-white text-4xl mb-4">Branding & Brand Strategy</h2>
              <button className="bg-blue-500 text-white px-6 py-2 rounded">Discover More</button>
            </div>
            */}
          </div>
          {/* Column 2/2 with background, overlay, title, and button */}
          <div className="col-span-4 lg:col-span-6 relative">
            <img src="/expertise/branding/projects/continental.jpg" alt="Brand Stationery Design" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            {/*
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-white text-4xl mb-4">Brand Stationery Design</h2>
              <button className="bg-green-500 text-white px-6 py-2 rounded">Learn More</button>
            </div>
            */}
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          {/* Column 1/2 with background, overlay, title, and button */}
          <div className="col-span-4 lg:col-span-6 relative">
            <img src="/expertise/branding/projects/winobio.jpg" alt="Branding & Brand Strategy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            {/*
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-white text-4xl mb-4">Branding & Brand Strategy</h2>
              <button className="bg-blue-500 text-white px-6 py-2 rounded">Discover More</button>
            </div>
             */}
          </div>
          {/* Column 2/2 with background, overlay, title, and button */}
          <div className="col-span-4 lg:col-span-6 relative">
            <img src="/expertise/branding/projects/khbizati.jpg" alt="Brand Stationery Design" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            {/*
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-white text-4xl mb-4">Brand Stationery Design</h2>
              <button className="bg-green-500 text-white px-6 py-2 rounded">Learn More</button>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
