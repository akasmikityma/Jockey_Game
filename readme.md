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

