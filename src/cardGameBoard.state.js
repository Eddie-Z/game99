import React, {useEffect,useState} from 'react'
import { cardsObjToArray, imagesObjToArray, handleSpecial} from './utils'
import {createDeckAndDraw, drawCardFromDeck,AIDrawCards} from './api'

export const useBoardGame = () => {

    //states
    //player1
    const [{cardImageUrl,cardInHand}, setCardState] = useState({
        cardInHand:null,
        cardImageUrl:null
    })
     //AI
    const [{AIcardImageUrl,AIcardInHand}, AIsetCardState] = useState({
        AIcardInHand:null,
        AIcardImageUrl:null
    })

    const [AISelected,setAISelected] = useState(null)

    const [deckId, setDeckId]=useState(null)
    const [score,setScore]=useState(null)

    //turn
    const [turn,setTurn]=useState(true)
    const [winner,setWinner]=useState()

    //handle ace 
    const [ace,setAce]=useState(null)

    //use effect sychonrous to prevent race conditions

    useEffect(()=>{

        const drawCards = async ()=> {
            const cardDraw= await drawCardFromDeck(deckId)
            const AIdraw=await drawCardFromDeck(deckId)
            console.log(cardDraw)
            console.log(cardInHand)
            console.log(cardImageUrl)

          
            AIsetCardState(prevState => {
                let newState = {...prevState}
                newState.AIcardInHand=[...newState.AIcardInHand,AIdraw].sort()
                newState.AIcardImageUrl=[...newState.AIcardImageUrl,AIdraw[2]]

                return newState
            }
            )

            setCardState(prevState => {
                let newState = {...prevState}
                newState.cardInHand=[...newState.cardInHand,cardDraw]
                newState.cardImageUrl=[...newState.cardImageUrl,cardDraw[2]]
                return newState
            }
            )
        }
       
        //AI turn
        if(!turn){
            console.log("Change Turns")
            drawCards()

            console.log(AIcardInHand)
            debugger

          //  AIcardInHand.sort()
            //select first card
            let initialSelectedCardValue = AIcardInHand[0]

            
            debugger
            //handle secpail values
            let selectedCardValue = handleSpecial(initialSelectedCardValue[0],score,turn)
            setAISelected(initialSelectedCardValue[0]);
            console.log("ai selected",selectedCardValue)
            //update score
            setScore(prevState => {
                let newState = prevState + Number(selectedCardValue)
                if(newState>99){
                    alert("Human player has won! Restart browser")
                }
                return newState;
            })

            AIsetCardState(prevState => {
                let newState = {...prevState}

                newState.AIcardInHand=newState.AIcardInHand.filter(item => item[0]!=initialSelectedCardValue && item[2]!=initialSelectedCardValue[2])
                newState.AIcardImageUrl=newState.AIcardImageUrl.filter(item => item!=AIcardImageUrl[0])
                console.log(newState)
                return newState
            }
            )


            setTurn(!turn)
        }
        
    },[turn])


    useEffect(()=>{
        const fetchCardandDeck = async () =>{

            //draw 5 cards
            const {deckId,cardsArray} = await createDeckAndDraw();

            //draw 5 cards for AI
            const {cardsArray:AIcardsArray} = await AIDrawCards(deckId);
         
               //convert object to array of values
             const cards =  cardsObjToArray(cardsArray)
             const images = imagesObjToArray(cardsArray)


             //AI convert object to array of values
             const AIcards =  cardsObjToArray(AIcardsArray)
             const AIimages =  imagesObjToArray(AIcardsArray)

            
            setCardState({
                cardInHand:cards,
                cardImageUrl:images
            })
            AIsetCardState({
                AIcardInHand:AIcards,
                AIcardImageUrl:AIimages
            })
    
            setDeckId(deckId);
        }
        fetchCardandDeck();
    },[])

 
    // const update = (selectedCardValue,srcImgCard) =>{
    //     setCardState({
    //         cardInHand:cardInHand.filter(item => item!=selectedCardValue),
    //         cardImageUrl:cardImageUrl.filter(item => item!=srcImgCard)
    //     })
    // }

    const onCardClick = (event) => {
        event.preventDefault();
        if(turn)
        {
            let srcImgCard = event.target.src
            let pos = cardImageUrl.indexOf(srcImgCard)
            let initialSelectedCardValue = cardInHand[pos]
    
            console.log(cardInHand)
            console.log(cardImageUrl)
            console.log("you've selected ",initialSelectedCardValue)

            let selectedCardValue = handleSpecial(initialSelectedCardValue[0],score,turn)
            console.log("actual value is ",selectedCardValue)


            setScore(prevState => {
                let newState = prevState + Number(selectedCardValue)
                if(newState>99){
                    alert("Other player has won! Restart browser")
                }
                return newState;
            })
        

            //remove card from objects

            setCardState(prevState => {
                let newState = {...prevState}
               // console.log(newState.cardInHand.splice(pos,1))
                //console.log(newState.cardInHand)
                //cardInHand=newState.cardInHand.filter(item => { return console.log(item)})
                newState.cardInHand=newState.cardInHand.filter(item => item[0]!=initialSelectedCardValue && item[2]!=initialSelectedCardValue[2])
                newState.cardImageUrl=newState.cardImageUrl.filter(item => item!=srcImgCard)
                console.log(newState)
                return newState
            }
            )

            
            // setCardState({
            //     cardInHand:cardInHand.filter(item => item!=selectedCardValue),
            //     cardImageUrl:cardImageUrl.filter(item => item!=srcImgCard)
            // })
            //change turn
            setTurn(!turn)
        }
    }
    

    return {
        score,
        cardImageUrl,
        //cardImageUrl_2,
        //onButtonClick,
        AISelected,
        onCardClick,
        turn,
        winner,
    }
}