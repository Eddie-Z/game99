import React, { useEffect, useState } from "react";

import { CardLayout, ScoreLayout, Img} from "./Layout.component";
import { ButtonsTab } from "./ButtonsTab";

import { useBoardGame } from "./cardGameBoard.state";

export const GameBoard = () => {
  const { cardImageUrl, onButtonClick, result, score, onCardClick,AISelected} = useBoardGame();

  if (!cardImageUrl) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <ScoreLayout>
        {score}
            <h1>AI selected {AISelected}</h1>
            {AISelected === 4 ? <h1>and passed!</h1> : ""}
            {AISelected === 9 ? <h1> and passed!</h1> : ""}
            {AISelected === 10 ? <h1>and reduced score by 10</h1> : ""}
        
      </ScoreLayout>
      <CardLayout>
        {/* {
        turn ?
        cardImageUrl.map((eachCardUrl) => {
          return <Img src={eachCardUrl} onClick={onCardClick}></Img>;
        })
        :
        cardImageUrl_2.map((eachCardUrl) => {
          return <Img src={eachCardUrl} onClick={onCardClick}></Img>;
        })
        
        } */}

{
         cardImageUrl ?
        cardImageUrl.map((eachCardUrl) => {
          return <Img src={eachCardUrl} onClick={onCardClick}></Img>;
        })
        :
        <h1>loading</h1>
}
      </CardLayout>

      
    </div>
  );
};
