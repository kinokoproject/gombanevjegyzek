import names from './db.json'
import test from 'ava';

test('required fields', t => {
  let latins = [];
  let huns = [];  
  let engs = [];

  for (const [id, name] of Object.entries(names)) {
    t.not(latins.includes(name.latin), name.latin + ' found twice');
    latins.push(name.latin)

    t.not(huns.includes(name.hun), name.hun + ' found twice');
    huns.push(name.hun)

    t.not(huns.includes(name.eng), name.eng + ' found twice');
    engs.push(name.eng)

    t.not(isNaN(id), id + ' is not a number');

    t.assert(name.hasOwnProperty('latin'), id + ' has no "latin" property');

    t.notRegex(name.latin, /,/, id + ' has comma in "latin" property');

    t.assert(name.hasOwnProperty('hun'), id + ' has no "hun" property');

    t.notRegex(name.hun, /,/, id + ' has comma in "hun" property');

    if(name.hasOwnProperty('latin_syn')) {
      t.assert(
        Array.isArray(name.latin_syn),
        id + ' has "latin_syn", but it`s a ' + typeof(name['latin_syn']) + ' instead of Array'
      );
    }

    if(name.hasOwnProperty('hun_syn')) {
      t.assert(
        Array.isArray(name.hun_syn),
        id + ' has "hun_syn", but it`s a ' + typeof(name['hun_syn']) + ' instead of Array'
      );
    }
  };
});
