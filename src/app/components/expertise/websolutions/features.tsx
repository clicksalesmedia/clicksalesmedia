import React from 'react'

function features() {
  return (
    <section>
        <div className="container px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">Column 1/2</div>
            <div className="col-span-4 lg:col-span-6">Column 2/2</div>
          </div>
        </div>
      </section>
  )
}

export default features