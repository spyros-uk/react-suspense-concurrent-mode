export { getPokemonById, getPokemonCollection }

function getPokemonById(pokemonId) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res =>
    res.json()
  )
}

function getPokemonCollection() {
  return fetch("https://pokeapi.co/api/v2/pokemon/").then(res => res.json())
}
