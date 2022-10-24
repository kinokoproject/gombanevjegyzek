import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Index } from 'flexsearch'
import { useFlexSearch } from './react-use-flexsearch'
import names from './db.json'
import './style/app.scss';

const index = new Index({
  tokenize: "reverse",
  suggest: true,
  cache: true
});

for (const [id, sp] of Object.entries(names)) {
  var text = sp.latin
  if(sp.latin_syn) { text += " " + sp.latin_syn.join(" ") }
  text += " " + sp.hun
  if(sp.hun_syn) { text += " " + sp.hun_syn.join(" ") }
  if(sp.eng) { 
    text += " " + sp.eng
  }
  index.add(id, text)
}

export default function SearchBar() {

  const [timer, setTimer] = useState(null)
  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, index, names)

  const inputChanged = event => {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      setQuery(event.target.value)
    }, 400)

    setTimer(newTimer)
  }

  return (
    <div>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input placeholder="Keresés" className="input" name="query" type="text" onChange={inputChanged} />
                  </p>
                </div>
              </div>
              <div className="field-label is-normal">
                <span className="label">{results.length} találat</span>
              </div>
            </div>      
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="b-table">
            <div className="table-wrapper has-mobile-cards">
              <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                  <tr>
                    <th>Latin név</th>
                    <th>Latin szinonímák</th>
                    <th>Magyar név</th>
                    <th>Magyar szinonímák</th>
                    <th>Angol név</th>
                  </tr>
                  </thead>
                  <tbody>
                  {results.map(sp => (
                    <tr>
                      <td data-label="latin">{sp.latin}</td>
                      <td data-label="latin szin.">{sp.latin_syn ? sp.latin_syn.join(", ") : ''}</td>
                      <td data-label="magyar">{sp.hun}</td>
                      <td data-label="magyar szin.">{sp.hun_syn ? sp.hun_syn.join(", ") : ''}</td>
                      <td data-label="angol">{sp.eng ? sp.eng : ''}</td>
                    </tr>
                  ))}
                 </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ReactDOM.render(<SearchBar />, document.getElementById('app'))
