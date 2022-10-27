import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {

  const [buscaId, setBuscaId] = useState("")
  const [buscaNome, setBuscaNome] = useState("")
  const [ordenaAlfabeto, setOrdenaAlfabeto] = useState("")
  const [escolhePorTipo, setEscolhePorTipo] = useState("")

  return (
    <>
      <GlobalStyle />
      <Header 
        buscaId = {buscaId}
        setBuscaId = {setBuscaId}
        buscaNome = {buscaNome}
        setBuscaNome = {setBuscaNome}
        ordenaAlfabeto = {ordenaAlfabeto}
        setOrdenaAlfabeto = {setOrdenaAlfabeto}
        escolhePorTipo = {escolhePorTipo}
        setEscolhePorTipo = {setEscolhePorTipo}
        />
      <CardsContainer>
        {pokemons
        //-------------busca por id
        .filter((pokemon) => {
          return pokemon.id.includes(buscaId)
          // if(pokemon.id.includes(buscaId)){return pokemon}
        })
        //-------------busca por nome
        .filter((pokemon) => {
          return pokemon.name.english.toLowerCase().includes(buscaNome.toLowerCase())
        })
        //.filter((pokemon)=> pokemon.id.includes(buscaId) && pokemon.name.english.toLowerCase().includes(buscaNome.toLowerCase()))//
        //-------------ordena
        .sort((a, b) => {
          if(ordenaAlfabeto === "crescente"){
            if(a.name.english < b.name.english){
              return -1
            } else {
              return 1
            }
          } else if (ordenaAlfabeto === "decrescente") {
            if(a.name.english > b.name.english){
                return -1
              } else {
                return 1
              }
          }
        })
        //-------------tipo
        .filter((pokemon) => {
          return escolhePorTipo ? pokemon.type.includes(escolhePorTipo) : pokemon
        })
        .map((pokemon) => {
          return <PokemonCard
          cardColor={getColors(pokemon.type[0])}
          key={pokemon.id}
          pokemon={pokemon}
        />
        })}
        
      </CardsContainer>
    </>
  );
}

export default App;
