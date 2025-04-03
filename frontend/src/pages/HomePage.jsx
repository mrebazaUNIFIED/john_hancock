import React from 'react'
import Hero from '../components/ui/Hero'
import Access from '../components/ui/Access'
import Linea from '../components/ui/Linea'
import Popular from '../components/ui/Popular'
import Recommendation from '../components/ui/Recommendation'
import Search from '../components/ui/Search'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-3">
        <Linea />
      </div>
      <Search />
      <Recommendation />
      <Popular />

    </>

  )
}
