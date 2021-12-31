import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActions,
  Typography,
  Grid,
  CardHeader,
  Avatar,
  CardContent,
  Button
} from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';


const GameBoard = ({ gameId, leftPlayer, rightPlayer }) => {
  
  const [isGameOver, setIsGameOver]= useState(false);
  const [leftPlayerPoints, setLeftPlayerPoints] = useState(0);
  const [rightPlayerPoints, setRightPlayerPoints] = useState(0);

  function incrementPointForLeftPlayer(player_id) {
    if (isGameOver) return;
    setLeftPlayerPoints(x=> x+1);
    console.log(player_id, ': ', leftPlayerPoints)
    addGamePoint(player_id)
  }

  function incrementPointForRightPlayer(player_id) {
    if (isGameOver) return;
    setRightPlayerPoints(x=> x+1);
    console.log(player_id, ': ', rightPlayerPoints)
    addGamePoint(player_id)
  }
  
  function addGamePoint(player_id) {
    
    const addGamePoint = `
      mutation {
        addGamePoint( game_id: ${gameId}, player_id: ${player_id}) 
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
    API.graphql({ query: addGamePoint })
      .then((e) => {
        console.log(e);
        //setGameId(e.data.addGame.game_id);
        if (e.data.addGamePoint.end_time != null ) {

        }
      });
  }
  return (
    <Card item xs={12}>
      {isGameOver && <Alert severity="success">Game is over !</Alert>}
      <Grid item padding={5} container>
        <Card item xs={6}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={leftPlayer.profile_pic}></Avatar>
            }
            title={leftPlayer.player_name}
            subheader="LEFT"
          />
          <CardContent>
            <Box
              sx={{
                width: 300,
                height: 100,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7]
                }
              }}
            >
              <Typography variant="h1" color={"white"} textAlign={"center"} fontSize={90}>{leftPlayerPoints}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={()=> incrementPointForLeftPlayer(leftPlayer.player_id)}>+ 1</Button>
          </CardActions>
        </Card>
        <span>{'    '}</span>
        <Card item xs={6}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={rightPlayer.profile_pic}
              ></Avatar>
            }
            title={rightPlayer.player_name}
            subheader="RIGHT"
          />
          <CardContent>
            <Box
              sx={{
                width: 300,
                height: 100,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7]
                }
              }}
            >
              <Typography variant="h1" color={"white"} textAlign={"center"} fontSize={90}>{rightPlayerPoints}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={()=> incrementPointForRightPlayer(rightPlayer.player_id)}>+ 1</Button>
          </CardActions>
        </Card>
      </Grid>
    </Card>
  );
};

GameBoard.propTypes = {
  gameId: PropTypes.number.isRequired,
  leftPlayer: PropTypes.object.isRequired,
  rightPlayer: PropTypes.object.isRequired
};

GameBoard.defaultProps = {
  gameId: -1,
  leftPlayer: {},
  rightPlayer: {}
};

export default GameBoard;
