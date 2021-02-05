import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useFlexSearch } from './react-use-flexsearch'
import { Formik, Form, Field } from 'formik'
import FlexSearch from 'flexsearch'
import names from './db'
import './styles/app.scss';

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
      <div class='form row'>
        <form >
          <label>Keresés:</label>
          <input name="query" type="text" onChange={(event) => setQuery(event.target.value) } />
          <span>{results.length} találat</span>
        </form>
      </div>
      <div class='species-list row'>
        <ul class='header'>
          <li>Latin név</li>
          <li>Latin szinonímák</li>
          <li>Magyar név</li>
          <li>Magyar szinonímák</li>
        </ul>
        {results.map(sp => (
          <ul>
            <li class='latin'>{sp.latin}</li>
            <li class='latin-syn'>{sp.latin_syn ? sp.latin_syn.join(", ") : ''}</li>
            <li class='hun'>{sp.hun}</li>
            <li class='hun-syn'>{sp.hun_syn ? sp.hun_syn.join(", ") : ''}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

ReactDOM.render(<SearchBar />, document.getElementById('app'))