export { getPokemonById }

function getPokemonById(pokemonId) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res =>
    res.json()
  )
}
