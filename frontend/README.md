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

task>> 
 get the cards from the message and populate the playercards state and send the user to the game/home page [done]


 for start : 
             populate the cardsINhands --> the cards coming from backend doesnt have images so to set the cards to the state ==>
                                                                                                                                1.change the cards there in the backend 
                                                                                                                                or in frontend [do change the backend] [done]

 so the player clicks the take it sends takefromrem and leave means give back [if the player didnt take that card he saw he dont need to give any of the inhandcards back ]

 seeJockey: a card or some button that lets the player see the jockey . but the player anyway automatically gets to see the card after verifying a validset >>

 * remaining cards are set at the explore only ..

 for now from board players are only sending messages not REACTING to it >>

     how to do that? 

      inside useEffect have some onmessage handlers ==> to take and give the card back and then set the inHandCards
      handle the turns .. put some messages on if its turn has come or not >>
      set some time limit like 30 secs .. one player can only think for maximum 30 seconds >>
      handle show set ..
      make a jockey card or set the modal to be jockey >
      handle the situation when a player wins/ the game gets over ..


      issues -> (1) the top card shows the 0th card instead of the last one >>
                top card doesnt actually get in the hands since the backend pushes the last one >>so there are 9 cards after take but the card is not the modal has showed>>
                the card that is given back is not being shown to everybody <>> [resolved all]
                
                (2) the leave button doesnt work >> 
       how to directly leave the the card and push that to the given_backs?

       MAJOR>> how do i let the user make the set ?

              lets say there would be a button that lets u atleast click on 3 cards and then once there are 3 cards ..player sends the message >> 
              
              there would be a button clicking which  anew modal pops up ..and the player then clicks on the cards it has and those cards then enters 
              to the modal  


next one hour> try to incorporate dnd on the cards in hands >>


             helper -------------
onDragEnd : the function that sets the order/postion the list 
DragDropContext : the whole area having the functionality : inHandCards
Droppable: the area where the draggbles can be put :  
Draggable: the divs/tags that are to be dragged :



minor issues --> player clicking on the given_backs knows what he wants to get ..so dont open the modal rather add that card directly >> 
             --> given_backCards clicked -- then clicked on the leave makes the top card from the remaining get pulled to the given_backs >> [resolved]
             --> toggle selection of the cards >>
              [done]
             [if the set is not valid /less than length make the setselecteds empty] is the move incremented once the player successfully put valids to the overall set
             --> think of rearranging the board/players >>

             see jockey --get the width/height fixed of the cards when there are less in the div than 8 -- 

             
             [today]-->
             fix the board [one player must see all the other's valids so that its cards can be pushed to their sets (if valid)] -- jockey card [done] -- 

major -- how do players put cards to another player's valid sets .. how do they get validated -- how are they included .. 
      -- how do i end the game .. 1st once there is atleast one player that has no cards in the hands ... 
        
        
      -- one's valid sets are not visible to others ..

       dont have to give a button but maybe a right click >>
      

      today--> 
      >get the set of the current player not shown in the others too .. 
      >players should be able to use the jockey ..[done 1/2]
      >even if the players can validate their lol cards to other sets .. how is it the card dragged and dropped .. how the cards are reduced >>
       -- clicking on any set would open a modal that has the set .. that modal ideally should be draggable-droppable -- then open the cards and drag from ur cards and drop that to the modal .. click on validate -- if validated card gets removed from the cardsInhands and gets added to the set instead >>

       i) make a modal 
       ii)get the cards of that set in the modal >> 
       iii)think of how drag and drop can be done !
        

>>test if the leavecard is working or not >> 
>>try to first give some alert that your turn has done >> 
>> [BIG] alert every one when the game has ended .. [check on the backend if any player's cardsInhands have gone empty just broadcast that the game is over ]
>>> make sure a player doesnt join a game twice >> [
  1> like what happens when the player clicks the join or init twice or more >> 
]

>>when a player has not seen the jockey the other player's set must be having jockey somewhat hidden 

>>make another comp that is only for the losers 