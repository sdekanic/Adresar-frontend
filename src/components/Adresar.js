import React from 'react'

const Adresar = ({osoba, brisanje}) => {
    
    return (
        <li className="podaci">
            {osoba.ImePrezime+" "}
            {osoba.Email}
            <button onClick = {brisanje}>Briši</button>
        </li>
    )
}

export default Adresar