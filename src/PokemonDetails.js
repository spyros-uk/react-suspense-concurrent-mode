import React, { useState } from "react"
import { getPokemonById } from "./pokemonApi"
import suspensify from "./suspensify"
const pokemonId = 1
const initialPokemon = suspensify(getPokemonById(pokemonId))

export default function PokemonDetails() {
  // return new Error("Test Error")
  const [pokemonData, setPokemonData] = useState(initialPokemon)

  const pokemon = pokemonData.read()
  const onNext = () =>
    setPokemonData(suspensify(getPokemonById(pokemon.id + 1)))

  return (
    <>
      <p>Pokemon Name: {pokemon.name}</p>
      <button type="button" onClick={onNext}>
        Next
      </button>
    </>
  )
}
