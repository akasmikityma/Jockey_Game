## 

i have the cards the process to distribute them between players>>

server==> players connects to the server and become the pendingJoiner once there are 2 players they are sent to the game 

          ideally at the beginning both the players are distributed 8 cards each and then the jockey is decided >>.
          
          

game rules-- except the last card all are for the game ..
             1. first player pulls a card from the deck and gives  that very card /one of the given 8 cards back 
             2. from second player every player either pick the top card of the deck or the top card from the remaining cards that are there 
             3. when a player shows  others that it has made a valid set cant take participation in pulling/picking another card but gets 
                to see the jockey instead..
             4. now once the player has seen the jockey it can use the jockey to make other cards turn into valid sets 

    
    how are sets declared valid --

            1. the set has cards that are sequentially one after another ex-['A',2,3,4] not ['A',3,4] and has the length>=3  {there should be any gap} 
            2. the set has cards that are same ex.[3,3,3],[K,K,K],[A,A,A,A] and has the length>=3

    other ways--  players can put cards to other players set that are either sequentially valid or the same as the set's cards 
                 ex-[A,2,3,4] after [A,2,3,4,5,6]  or [8,8,8] after [8,8,8,8]

    the first player to release all the cards to the board making either valid sets or putting cards in the stack of valid sets becomes the 
    winner .... all the other players scores then gets increased by the number of cards they got left in hands ..

    whover has the smallest score is the winner [after one/multiple rounds of game] 
           
           whenever a player takes a card gives back a card too 
    
    
    
    after 3 player joins the game the game starts>>

    lets make the system like 3 players gets into the game and then they types start .. its when the card distribution happens ...if there

    idea -- make another message type and listen for that 

     suppose that is join ...
     init-game just builds the array 
     join initiates the game actually 
     start distributes the cards 


     execution of the game-logic --

                what if have a board class that has the remainig cards and the given-back cards that are supposed to be open to everyone 
                players either pulls card from eother of the arrays it has but gives back to the givenback array only 

                the board must be having a property of valid sets that the players have created .its an  array of arrays that has card-- card[][]

                whenever the remaining cards get empty ..the given back cards become the remainig cards and the given-back cards array becomes empty ..

                if there are 5 players then there would be only 2 shuffle and else there are unlimited shuffles 

     how does the players move ---- == 

                makeMove [takes a card and gives back a card]

                showSet [push the valid set of the cards to the board.validsets]



             
            
             
            


            
