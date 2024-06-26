import React from 'react'

function Grid() {
  return (
<section className='p-20'>
  <div className="container px-6 m-auto">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 border border-neutral-400 border-opacity-30">
      <div className="col-span-4 lg:col-span-7 border-r border-neutral-400 border-opacity-30">Column 7/12</div>
      <div className="col-span-4 lg:col-span-5">Column 5/12</div>
    </div>
  </div>
  <div className="container px-6 m-auto">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 border-t-0 border border-neutral-400 border-opacity-30">
      <div className="col-span-4 lg:col-span-6 border-r border-neutral-400 border-opacity-30">Column 1/2</div>
      <div className="col-span-4 lg:col-span-6">Column 2/2</div>
    </div>
  </div>
</section>


  
  )
}

export default Grid