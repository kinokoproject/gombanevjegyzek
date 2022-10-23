import names from './db.json'
import test from 'ava';

test('required fields', t => {
  let ids = [];
  let latins = [];
  let huns = [];  
  let engs = [];
  names.forEach(name => {

    t.not(ids.includes(name.id), name.id + ' found twice');
    ids.push(name.id)

    t.not(latins.includes(name.latin), name.latin + ' found twice');
    latins.push(name.latin)

    t.not(huns.includes(name.hun), name.hun + ' found twice');
    huns.push(name.hun)

    t.not(huns.includes(name.eng), name.eng + ' found twice');
    engs.push(name.eng)

    t.assert(name.hasOwnProperty('id'), name.id + ' has no "id" property');

    t.is(
      typeof(name.id), 'number',
      name.id + ' is not a number'
    );

    t.assert(name.hasOwnProperty('latin'), name.id + ' has no "latin" property');

    t.notRegex(name.latin, /,/, name.id + ' has comma in "latin" property');

    t.assert(name.hasOwnProperty('hun'), name.id + ' has no "hun" property');

    t.notRegex(name.hun, /,/, name.id + ' has comma in "hun" property');

    if(name.hasOwnProperty('latin_syn')) {
      t.assert(
        Array.isArray(name.latin_syn),
        name.id + ' has "latin_syn", but it`s a ' + typeof(name['latin_syn']) + ' instead of Array'
      );
    }

    if(name.hasOwnProperty('hun_syn')) {
      t.assert(
        Array.isArray(name.hun_syn),
        name.id + ' has "hun_syn", but it`s a ' + typeof(name['hun_syn']) + ' instead of Array'
      );
    }
  });
});
