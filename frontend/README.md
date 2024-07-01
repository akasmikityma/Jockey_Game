# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

onMount get a socket instance and then connect and return () would be onClose>>


using button client1 sending a data to the server and then the server listens to the message and send another message to the clients that are connected except the one the message came from..for example client 2 recieves the message and that message pushes the message to the array of messages and then simply just map the messages there 

useEffect -- inside this a instance/object  of websocket is created and then set as the socket state and then just listen on to some messages ..onopen,onclose,onerror,onmessage .... 


points >> 

1 make the cards more centralized --> make the Valid_Sets closer to the players div --> then write the logic  


1. make the valid sets card a bit >> [some what done ]
2. make the modal that shows the card [remaining_card/given_back-card] [somewhat done]



3. make the logic of using recoil-atoms-selectors ---
  
   cards >>  
   
   cards of the respective players has to be maintained 
      -- lets say i'll have 4 atoms for 4 players 

   valid-sets of the respective players 
       --- suppose 4 atoms for 4 players 

   the game has a valid sets property that ultimately has all the sets of all the players ..[How_do_i_list_the_sets_as_per_players?]
       -->> when the player sends the message "showSet" then only if the set is valid get that pushed into the players atom_state ..and at the same time the players cardInHands atom_state has to be taken care of ..

   When a player adds to another players valid set>>

     -->> handle the state of the cardInHands of the player who's adding and the state of te valid_set where the card getting pushed to  
   
   remaining cards and the given_back cards >>


   CARD FETCHING ==>

       the player gets to pick either from the remaining Ones or given_backs --[so if clicked on the either option means the player cant click on the other on that very turn ] 
   
       * while taking the card clicking anywhere outside of the card makes the card disappear >>

       when the player takes the card immediately alert comes give one card back .. all the cards gets one button there like an arraow or something ..on which the player has to click to give that very card >>

       when the remainings deck is empty then  the given given back is disappeared and as soon as one player moves eventually the given_backs deck gets rendered