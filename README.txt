This is a quick development of Pokedex user interface.

Pokedex has a pokemon list screen which is redirected from main path. For this redirection react router is used.
PokemonList page shows a list of pokemons fetched by axios which is most popular  promis-based Http client. 
All server requests are done in services in order make the code clean and readable. 
If user clicks on any of pokemon items, he/she will be redirected by router to pokemon detail page. 
This page make another request to get the pokemon object again. This is not a real world problem. That is why the request is done once more for detail page.
In pokemon detail page, user will be seeing more details of the pokemon he clicked on. A fancy slider will welcome the user. Other details are available in various appearances.
Another fancy feature about the app is search bar. User is able to make searches by pokemon name. If the search is a valid one, then pokemon detail page will be shown as usual.
If user has recent valid searches, they will be shown under search textbox once he/she focus on the search textbox.
API url is saved in a dev file to make the usage clear.

Material UI is the main library which is used for main user interface. A lot of its features can be found in the project.
Pages are responsive so they have proper and robust views in mobile device sizes. All components on pages are designed in responsive way.
For instance grid items are full width columns in mobile phone size.

Of course this is a few hour project and there are a bunch of stuff to do. 
For instance, Redux info (recent searches) should be saved for each page refresh.


Project directory is designed to scale the project if it is needed in the future.






