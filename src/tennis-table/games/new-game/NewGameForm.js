import {
  Typography,
  Select,
  Avatar,
  Grid,
  Card,
  InputLabel,
  MenuItem,
  FormControl,
  Divider,
  Button
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FetchAllPlayers } from 'src/utils/FetchGraphql';
import GameBoard from './GameBoard';
import { API, graphqlOperation } from 'aws-amplify';

function NewGame() {
  const [gameId, setGameId] = useState(null);
  const [playersLeft, setPlayersLeft] = useState([]);
  const [playersRight, setPlayersRight] = useState([]);
  const [selectedPlayerLeft, setSelectedPlayerLeft] = useState(-1);
  const [selectedPlayerRight, setSelectedPlayerRight] = useState(-1);

  const handleSelectedLeftChange = (e) => {
    setSelectedPlayerLeft(e.target.value);
  };

  const handleSelectedRightChange = (e) => {
    setSelectedPlayerRight(e.target.value);
  };

  const onStartGame = () => {
    console.log(
      'starting the game: ' + selectedPlayerLeft + ', ' + selectedPlayerRight
    );

    const addGame = `
      mutation {
        addGame(
          input: {
              player_1: ${selectedPlayerLeft},
              player_2: ${selectedPlayerRight},
              event_name: "event-${parseInt(Date.now() / 1000)}",
              subevent_name: "men's singles",
          }) 
      {
          game_id
          event_name
          subevent_name
          player_1
          player_2
          player_1_score
          player_2_score
          winner_id
          start_time
          end_time
      }
    }  
    `;
    API.graphql({ query: addGame }).then((e) => {
      console.log(e);
      setGameId(e.data.addGame.game_id);
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const data = await FetchAllPlayers();
    setPlayersLeft(data);
    setPlayersRight(data);
  }

  return (
    <Card>
      <Grid item padding={5} container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="left-player-name">Left Player</InputLabel>
            <Select
              labelId="left-player-name"
              label="Left Player"
              onChange={handleSelectedLeftChange}
            >
              <option defaultValue={selectedPlayerLeft}>[Select a Player]</option>
              {playersLeft.map((s) => (
                <MenuItem value={s.player_id} key={s.player_id}>
                  <span>
                    <Avatar src={s.profile_pic}></Avatar>
                  </span>
                  <span>{s.player_name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="right-player-name">Right Player</InputLabel>
            <Select
              labelId="right-player-name"
              label="Right Player"
              onChange={handleSelectedRightChange}
            >
              <option defaultValue={selectedPlayerRight}>[Select a Player]</option>
              {playersRight.map((s) => (
                <MenuItem value={s.player_id} key={s.player_id}>
                  <span>
                    <Avatar src={s.profile_pic}></Avatar>
                  </span>
                  <span>{s.player_name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={onStartGame}>
            Start Game !
          </Button>
        </Grid>
      </Grid>
      <Divider></Divider>
      {gameId && (
        <GameBoard
          leftPlayer={playersLeft.find(
            (p) => p.player_id === selectedPlayerLeft
          )}
          rightPlayer={playersRight.find(
            (p) => p.player_id === selectedPlayerRight
          )}
          gameId={gameId}
        ></GameBoard>
      )}
    </Card>
  );
}

export default NewGame;
