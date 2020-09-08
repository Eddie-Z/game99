import axios from 'axios'

const api = axios.create({
    baseURL:'https://deckofcardsapi.com/api/deck/'
})

//draw 5 cards for initial hand
export const createDeckAndDraw = async () =>{
    const {data} = await api.get('new/shuffle',{
        params:{
            deck_count: 1
        }
    })
    console.log({data})
    //rename
    const {deck_id:deckId} = data;
    
    const {data:cardResponse} = await api.get(`${deckId}/draw/`,{
        params:{
            count:5
        }
    })
    const cardSuits = cardResponse.cards.map(cards=> {
        let arr = [cards.value,cards.suit,cards.image]
        return arr
    }
    )
    console.log(cardSuits)
    //return object
    return {cardsArray:cardSuits,deckId:deckId}
}

export const AIDrawCards = async (deckId) => {
    const {data:cardResponse} = await api.get(`${deckId}/draw/`,{
        params:{
            count:5
        }
    })
    const cardSuits = cardResponse.cards.map(cards=> {
        let arr = [cards.value,cards.suit,cards.image]
        return arr
    }
    )
    //return object
    return {cardsArray:cardSuits}
}


 
export const drawCardFromDeck = async (deckId) => {
    const {data} = await api.get(`${deckId}/draw/`,{
        params:{
            count:1
        }
    })

    const {cards} = data
    const {value,image} = cards[0]
    return [value,cards[0].suit,image]
}