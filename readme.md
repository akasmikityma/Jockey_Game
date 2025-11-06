so i wrote this card game, 'Jockey'  that we play in our local area . its rules are --

1. at max 5 players can be in a game
2. each player is given 8 cards in a round robin fashion but not seeing who gets what  
3. the remaining cards are put upside down so that no one can see it 
3.  the first player takes a card from the remaining card's deck and gives one card back that is less valuable in its 
    tactics 
4. the given-back card is now put separetely but not upside down .
5. from now on every player has 2 options to take card from - 1. remaining cards (total surprise) 2. given-back cards (anyone can see)
6. each time a player takes a card has to give one card back ..no matter if that card is just taken or not 
7. player can straight refuse to take a card if that doesnt make any sense with the existing cards that the player has 
8. the game continues and each player finds a way to create valid sets as soon as possible and see the Jockey of the game 
9. valid sets are nothing but a bunch of cards that are validated ..
10. any one can add their cards to another player/its-own valid sets 

>> rules that vaildates cards as a "valid set" :
sequence=['A',2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

1. at least 3 cards that are in order of the above mentioned sequence array would be called a valid set. but all of them has to be of same
   type ..example --{ [9,10,j] of spades }or {[Q,k,A] of diamonds }etc
2. at least 3 cards that are of same value ..example -- [9,9,9] or [k,k,k] etc


>>Jockey [Wild_Card_Value]:
- Jockey is the value that depends on the last card of the remaining deck after the first distribution.the next value of what the last 
   card has is defined as Jockey_value. doesnt matter which type  
  if the lastcard has 'A' then its 2 ..all 4 cards that has value 2 is now the wild-card/Jockey  of the Game

 - to able to use and see what the jockey is : a player first has to make a valid set 

>>benifits that the Jockey gives :
1. it can replace any card of a set to make it a valid one . example :if Jockey is A then this set [6,A,8] is a valid set 


HOW I WROTE THE GAME -->    

Backend : using Node.js and Websocket i built the server of the app. i wrote in typescript using  express .
FrontEnd : at the FrontEnd i used these following
           React + typescript ,beautiful-dnd kit,recoil,tailwind css

// on the turn where the user put a set to the board cant take another card >> it can see only the jockey card >> [
   1> close the modal if anywhere clicked except the card [that should be on every modal >> (one modal at a time)]
   2> when the jockey modal is opened then the cards cant be taken from the deck >> 
   3> 
]
// how can i make the notifications/alerts better
// do i get the images downloaded >>[no] 
// and some bugs >> [

]
// more smoother experience while getting into the game >> 
// main thing is ui >> how can i better it ? 
 
/// mostly alert messages that needs to be fixed first >>[
   i) your move's over
   ii) clicked on a set
   iii) jockeyNumber
   iv) u need to have a valid set first
]
----------------------------------------------------------------
>> major issues ==> 
1> once the page is refreshed the game state is gone 
2> once a game is done make sure to give option to make room for another game >> 
3> if a player clicks the init twice then its taking the same player again and again as different players>>
---------------------------------------------
>> have another global atom for the join game >> once its set then just make it disappear from every where or just make the button not clickable[done]

-----------------------------------------------------------------
show a message once a user puts a set to validation , and then direct them to click on the over message >>
card added 's alert doesnt make sense >> [in the end product][ done (removed) ]
>> 6,7,8,9 for this set if the jockey is 6 then its flipped on its front so that no other guy gets to see it >> but since its a series its obvious that 6 is the jocky >> [how do i fix it?? ]


>> when there are enough players get them a clear message >> that there are enough players u can press on start or wait >> [lets make for 3 players only ] [done]
>> if its not a user's turn get him a clear message that its not ur turn >> [done] 
>> reconnection fails sometimes [why's that ?? but happens for some players doesnt happen for others >> why's that ]
   also even at explore there reconnection message . explore doesnt send any reconnection thing to the backend >> [done]
>> imp >> when its not one's turn and he tried to take or do something >> show him a message >>  [ideally not needed but its better >> ] [done]  
>> better ui >> [for the alerts >> ] [done]

To be done : 
>> if the playerid is not found and the reconnection is not possible any more to that very specific game >> [let him choose if he wants to get to a new game >> ]
>> after end of a match also give them option to play >> 
>> when pressing the init game ,.. show press Enter Join >> 
>> over should not be always there .. or if there .. it should throw some messages to the user >> 


WHAT's DONE
2 buttons are added - "join new game" and "leave game" 
leave game works >> [atlealst it seemed] 
>>make sure players are sent to the explore .. [if possible make sure to put the existing name]
>> IF PLAYER IS RECONNECTED .. GET HIM TO THE BOARD >> [VERY IMP]
## 🎮 Gameplay Preview

for now >> 
just fix the join new game button [the ui and show case it]
IDEALLY  >> 
since the game from where a player has left must have another player to be joined or make some player win out of 2 or what ever >> 


![Gameplay](./Screenshots/Home.gif)
<!-- ![Lobby](./screenshots/lobby.png)
![Mobile View](./screenshots/mobile.png) -->
