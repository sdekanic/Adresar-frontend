import React from 'react'

const Podatak = ({osoba, brisanje}) => {
    
    return (
        <li className="podaci">
            {osoba.ImePrezime+" "}
            {osoba.Email}
            <button onClick = {brisanje}>Briši</button>
        </li>
    )
}

export default Podatak