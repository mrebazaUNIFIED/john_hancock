import React from 'react'

export default function Popular() {
  return (
    <div className="mx-auto max-w-6xl px-4 m-10 mb-30">
      {/* Header */}
      <div className='text-center my-10'>
        <p className='text-[#AB0C2F] font-serif italic tracking-wide'>
          OUR MOST POPULAR DOCUMENTS
        </p>
        <p className='font-bold text-4xl pt-2'>
          Most Searched <span className='text-[#AB0C2F]'>Letters</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <a href="#" className="flex items-start gap-4 bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
          <img src="./prueba.jpg" alt="doc" className="rounded-md w-24 h-auto object-cover" />
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1">
              Committee of the Boston Sons of Liberty to John Wilkes,
            </h3>
            <p className="text-sm font-medium mb-1">4 November 1769</p>
            <p className="text-xs text-gray-500">Recipient: Wilkes, John</p>
          </div>
        </a>

        {/* Card 2 */}
        <a href="#" className="flex items-start gap-4 bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
          <img src="./prueba.jpg"  alt="doc" className="rounded-md w-24 h-auto object-cover" />
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1">
              Message to Lieutenant Governor Hutchinson on the Command of Castle William
            </h3>
            <p className="text-sm font-medium mb-1">20 November 1770</p>
            <p className="text-xs text-gray-500">Recipient: Hutchinson, Thomas</p>
          </div>
        </a>
      </div>
    </div>
  )
}
