import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useFlexSearch } from './react-use-flexsearch'
import FlexSearch from 'flexsearch'
import names from './db.json'
import './style/app.scss';

const index = new FlexSearch({
  encode: "advanced",
  tokenize: "reverse",
  suggest: true,
  cache: true
});

names.forEach(sp => {
  var text = sp.latin
  if(sp.latin_syn) { text += " " + sp.latin_syn.join(" ") }
  text += " " + sp.hun
  if(sp.hun_syn) { text += " " + sp.hun_syn.join(" ") }
  index.add(sp.id, text)
})

export default function SearchBar() {

  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, index, names)

  return (
    <div>
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container is-max-desktop">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input placeholder="Keresés" class="input" name="query" type="text" onChange={(event) => setQuery(event.target.value) } />
                  </p>
                </div>
              </div>
              <div class="field-label is-normal">
                <span class="label">{results.length} találat</span>
              </div>
            </div>      
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
              <table class="table is-fullwidth is-striped is-hoverable">
                  <thead>
                  <tr>
                    <th>Latin név</th>
                    <th>Latin szinonímák</th>
                    <th>Magyar név</th>
                    <th>Magyar szinonímák</th>
                  </tr>
                  </thead>
                  <tbody>
                  {results.map(sp => (
                    <tr>
                      <td data-label="latin">{sp.latin}</td>
                      <td data-label="latin szin.">{sp.latin_syn ? sp.latin_syn.join(", ") : ''}</td>
                      <td data-label="magyar">{sp.hun}</td>
                      <td data-label="magyar szin.">{sp.hun_syn ? sp.hun_syn.join(", ") : ''}</td>
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