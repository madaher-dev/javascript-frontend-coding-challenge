import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';

// US States
const data = usStates.map((state) => ({
  text: state.name,
  value: state.abbreviation,
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

//Github Users
const githubUsers = new Autocomplete(document.getElementById('gh-user'), {
  //modified onSelect to get access to both id and username
  onSelect: (ghUserId, ghLogin) => {
    console.log('selected github user id:', ghUserId);
    //Set the first child of the gh element which is the form and set its value to clicked username
    document.getElementById('gh-user').childNodes[0].value = ghLogin;
  },
});

// Handle Keyboard listeners
document.getElementById('gh-user').addEventListener('keydown', (event) => {
  //keyboard event code
  const code = event.code;
  let active =
    document.querySelector('.hover') || document.querySelector('#gh-user li');
  if (active) active.classList.remove('hover');

  if (code === 'ArrowDown') {
    active = active.nextElementSibling || active;
  } else if (code === 'ArrowUp') {
    active = active.previousElementSibling || active;
  } else if (code === 'Enter') {
    // Pass the value on key Enter
    const { onSelect } = githubUsers.options;
    if (typeof onSelect === 'function') onSelect(active.id, active.innerHTML);
  }
  if (active) active.classList.add('hover');
});
