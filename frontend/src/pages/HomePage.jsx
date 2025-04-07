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
      <div className="">
        <Linea />
      </div>
      <Search />
      <Recommendation />
      <Popular />

    </>

  )
}
