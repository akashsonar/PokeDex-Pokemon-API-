import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import "./app.scss";

export default function App() {
    const [pokemonName,
        setPokemonName] = useState("");
    const [pokeChoosen,
        setPokeChoosen] = useState(false);
    const [pokeInfo,
        setPokeInfo] = useState({
        name: "",
        species: "",
        img: "",
        hp: "",
        attack: "",
        defence: "",
        type: ""
    });

    const searchPokemon = () => {
        Axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(res => {
                setPokeInfo({
                    name: pokemonName,
                    species: res.data.species.name,
                    img: res.data.sprites.front_default,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defence: res.data.stats[2].base_stat,
                    type: res.data.types[0].type.name
                });

                setPokeChoosen(true);
            });
    };

    return (

        <div className="app">
            <div className="titleSection">

                <img className="title" src="https://i.imgur.com/k4tYktt.png"/>
                <img className="pokedex" src="https://bit.ly/3u4iJAe"/>
                <input
                    type="text"
                    onChange={(e) => {
                    setPokemonName(e.target.value)
                }}/>
                <button onClick={searchPokemon}><img className="search" src="https://i.imgur.com/OR1qVRj.png"/></button>
            </div>
            <div className="displaySection">
                {!pokeChoosen
                    ? (<img className="choosePokemon" src="https://i.imgur.com/AM9pxUH.png"/>)
                    : (
                        <div className="info">
                            <h1>{pokeInfo.name}</h1>
                            <img src={pokeInfo.img}/>
                            <h3><img src="https://i.imgur.com/Fr9dssX.png" border="0"/> : {pokeInfo.species}</h3>
                            <h3><img src="https://i.imgur.com/12t2a44.png" border="0"/>: {pokeInfo.type}</h3>
                            <h3><img src="https://i.imgur.com/MiBfnDx.png" border="0"/>: {pokeInfo.hp}</h3>
                            <h3><img src="https://i.imgur.com/OugaI5a.png" border="0"/>: {pokeInfo.attack}</h3>
                            <h3><img src="https://i.imgur.com/VjcRo1v.png" border="0"/>: {pokeInfo.defence}</h3>
                        </div>
                    )}
            </div>
        </div>
    );
}
