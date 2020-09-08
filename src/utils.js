const cardValues = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'ACE',
    'JACK',
    'QUEEN',
    'KING'
];

//handle special cards

const handleAce = () =>{
    const aceValue = prompt("Please enter your ace value from 1-11", "1");
    return aceValue;
}

export const handleSpecial = (selectedCardValue,score,turn) => {
    if(selectedCardValue=='4'){
        // setCardState({
        //     cardInHand:cardInHand.filter(item => item!=selectedCardValue),
        //     cardImageUrl:cardImageUrl.filter(item => item!=srcImgCard)
        // })
        //setTurn(!turn)
        return 0
    }
    else if(selectedCardValue=='9'){
        // setCardState({
        //     cardInHand:cardInHand.filter(item => item!=selectedCardValue),
        //     cardImageUrl:cardImageUrl.filter(item => item!=srcImgCard)
        // })
       // setTurn(!turn)
        return 0 
    }
    else if(selectedCardValue=='10'){
        return selectedCardValue=-10
    }
    else if(selectedCardValue=='KING'){
         return selectedCardValue=99-Number(score)
    }
    else if(selectedCardValue=='QUEEN'){
        return selectedCardValue=12
    }
    else if(selectedCardValue=='JACK'){
        return selectedCardValue=11
    }
    else if(selectedCardValue=='ACE'){
        
        return selectedCardValue=handleAce();
    }
    else{
        
        return selectedCardValue
    }

   
}

//convert object to array of values
export const cardsObjToArray = (cardsArray) => {
    return cardsArray.map(obj => {
        //console.log(obj[0])
        return [obj[0],obj[1],obj[2]]
        //return obj.value
    })
   
}

//convert object to array of images
export const imagesObjToArray = (imagesArray) =>{
    return imagesArray.map(obj => {
        return obj[2]
       // return obj.image
   })
}
  

export const compareValues = ({previousCardValue,currentCardValue,bet}) =>{
    const previousCardValueIndex = cardValues.indexOf(previousCardValue)
    const currentCardValueIndex = cardValues.indexOf(currentCardValue)

    if(previousCardValueIndex === -1 || currentCardValueIndex==1){
        throw new Error('Not found')
    }

    if(bet ==="up" && previousCardValueIndex >= currentCardValueIndex){
        return "lose"
    }
    if(bet ==="up" && previousCardValueIndex < currentCardValueIndex){
        return "win"
    }

    if(bet ==="down" && previousCardValueIndex <= currentCardValueIndex){
        return "lose"
    }
    if(bet ==="down" && previousCardValueIndex > currentCardValueIndex){
        return "win"
    }
}