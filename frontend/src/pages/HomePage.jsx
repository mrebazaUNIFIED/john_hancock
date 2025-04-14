import React, { useRef } from 'react'
import Hero from '../components/ui/Hero'
import Linea from '../components/ui/Linea'
import Popular from '../components/ui/Popular'
import Recommendation from '../components/ui/Recommendation'
import Search from '../components/ui/Search'

export default function HomePage() {
  const searchRef = useRef(null);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onSearchClick={scrollToSearch} />
      <div>
        <Linea />
      </div>
      
      <div ref={searchRef}>
      <Recommendation />
      </div>
      <Search />
      
      <Popular />
    </>
  )
}
