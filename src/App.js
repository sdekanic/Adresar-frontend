import React, { useState, useEffect } from 'react'
import Adresar from './components/Adresar'
import adresarServer from './services/adresar'

const App = (props) => {
  const [podaci, postaviPodatke] = useState([])
  const [unosImena, postaviIme] = useState("")
  const [unosAdrese, postaviAdresu] = useState("")
  const [ispisOsoba, postaviOsobe] = useState("")
  const [flag, postaviFlag] = useState(false)
  const [Id, postaviId] = useState(0)
  const ispisiSve = true

  useEffect( () => {
      console.log("Effect hook");
      adresarServer
      .dohvatiSve()
      .then( (response) => {
          console.log("Podaci učitani");
          postaviPodatke(response.data)
      })
  }, [])

  console.log("Renderirano je", podaci.length, "objekata")
  const podaciZaIspis = ispisiSve ? podaci : podaci.filter(p => p.ImePrezime === ispisOsoba)

  const noviKorisnik = (e) => {
    e.preventDefault()
    console.log("Klik", e.target);

    const noviObjekt = {           
        ImePrezime: unosImena,
        Email: unosAdrese
    }
    if(!flag){
      adresarServer
      .stvori(noviObjekt)
      .then( (response) => {
        postaviPodatke(podaci.concat(response.data))
        postaviIme('')
        postaviAdresu('')    
    })
  }
  else{
    const osoba = podaci.find(p => p.id === Id)
    const nova={
      ...osoba,
      ImePrezime:unosImena,
      Email:unosAdrese
    }
    adresarServer.osvjezi(Id, nova).then((response) => {
      console.log(response);
      postaviPodatke(podaci.map(p=> p.id !== Id ? p : response.data))
      postaviIme('')
      postaviAdresu('')
      postaviFlag(false)

    })
  }}

  const promjenaFiltera = (e) => {
    console.log(e.target.value);
    postaviOsobe(e.target.value)
  }

  const promjenaImena = (e) => {
    console.log(e.target.value);
    postaviIme(e.target.value)
  }

  const promjenaAdrese = (e) => {
    console.log(e.target.value);
    postaviAdresu(e.target.value)
  }

  const uredivanje = (id) => {
    postaviFlag(true)
    postaviId(id)
    const osoba = podaci.find(p => p.id === id)
    postaviIme(osoba.ImePrezime)
    postaviAdresu(osoba.Email)
  }

  const brisanje = (id) => {
    adresarServer
      .brisi(id)
      .then(response => {
        console.log(response);
        postaviPodatke(podaci.filter(p => p.id !== id))
      })
    }

return (
    <div>
      <h1>Adresar</h1>
      <div>
          <p>Filtriraj osobe</p>
          <input value={ispisOsoba} onChange={promjenaFiltera} />
          {/* {<button onClick={() => postaviIspis(!ispisiSve)}>Prikaži</button>} */}
      </div> 
      <ul>
        {podaciZaIspis.map(p =>
          <Adresar 
            key={p.id} 
            osoba={p} 
            brisanje = {() => brisanje(p.id)}
            urediOsobu = {() => uredivanje(p.id)}
            />
        )}
      </ul>
      <h2>Novi korisnik</h2>
      <form onSubmit={noviKorisnik}>
        <label>Ime i prezime: </label>
        <input value={unosImena} onChange={promjenaImena} /><br></br>
        <label>Email adresa: </label>
        <input value={unosAdrese} onChange={promjenaAdrese} /><br></br>
        <button type="submit">Spremi</button>
      </form>
    </div>
  )
}

export default App
