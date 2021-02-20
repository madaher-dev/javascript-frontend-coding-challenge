import Github from './github';

export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    Object.assign(this, { rootEl, options });

    this.init();
  }

  //modified function to async to handle API call promise
  async onQueryChange(query) {
    // Get data for the dropdown
    let results;

    //Check if data is provided. if not use github API
    if (this.options.data.length === 0) {
      try {
        results = await Github.getUsers(query, this.options.numOfResults);
      } catch (error) {
        console.log(error);
      }
    } else {
      results = this.getResults(query, this.options.data);
      results = results.slice(0, this.options.numOfResults);
    }
    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  // This will only be called when data is provided
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    if (results)
      results.forEach((result) => {
        const el = document.createElement('li');
        // Added id to each result
        Object.assign(el, {
          className: 'result',
          textContent: result.text,
          id: result.value,
        });

        // Pass the value to the onSelect callback
        el.addEventListener('click', (event) => {
          const { onSelect } = this.options;
          if (typeof onSelect === 'function')
            onSelect(result.value, result.text);
        });

        fragment.appendChild(el);
      });
    //adding hover class to first element in list
    if (fragment.children[0]) fragment.children[0].classList.add('hover');
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', (event) =>
      this.onQueryChange(event.target.value)
    );

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl);

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results', id: 'results' });

    this.rootEl.appendChild(this.listEl);
  }
}
