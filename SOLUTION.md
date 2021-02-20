# Solution Docs

1. I started by modifying the Autocomplete component method to handle Github API call if data is not provided.
   This can be additionaly improved by having a prop to define if the component uses local data or API

2. Modified the onQueryChange method to accept promises (async)

3. I checked if data is provided. if not forced to use github API

4. Imported Github component from seperate file githib.js

5. Defined Github API credentials in class constructor. These are needed in calls to avoid API limitation

6. API credentials should be defined on the server and not in the js file (improvement needed)

7. used fetch to get list of users with provided query and number of results

8. API does not return data in json so had to transform results into a json object

9. transform results into an object with text and value to match the states data format and allow reusability

10. API results does not need to be sliced since they are limited to numResults provided by the call

11. To handle keyboard actions i had to get the gh-user from the document and listen to keydown action. If i had more time i would create a separate class for that instead of writing the code in index.js

12. When the list is populated i added a hover class to the first item in createResultsEl method of Autocomplete

13. defined active to be first item in list and then navigated it according to keystrokes

14. The navigation is done by adding a hover class to the current active element of the list

15. Navigation up only happens if the item has a previousElementSibling

16. Navigation down only happens if the item has a nextElementSibling

17. on Enter i called the onSelect of the gh-user Autocomplete component now defined as githubUsers

18. Added id to each item list to be able to pass it on onSelect and console log it as required
