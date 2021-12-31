import { API, graphqlOperation } from 'aws-amplify';

export const FetchAllPlayers = async() => {
  const query = `
    {
      players {
        player_id
        player_name
        profile_pic
        age
        country
        total_points
      }
    }`;
  const apiData = await API.graphql(graphqlOperation(query));
  const results = apiData.data.players;
  return results;
}

export const FetchAllRanks = async() => {
  const query = `
    {
      ranks {
        rank
        game_type
        player_id
        total_points
        player_name
        player_country
        player_profile_pic
      }
    }`;
  
  const apiData = await API.graphql(graphqlOperation(query));
  const results = apiData.data.ranks;
  return results;
}

export const FetchAllGames = async() => {
  const query = `
    {
      games {
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
    }`;
  
  const apiData = await API.graphql(graphqlOperation(query));
  const results = apiData.data.games;
  return results;
}

export const FetchAllDisplayGames = async() => {
  const query = `
    {
      displayGames {
        game_id
        event_name
        subevent_name
        player_1_name
        player_2_name
        player_1_profile
        player_2_profile
        player_1_score
        player_2_score
        score_description
      }    
    }`;
  
  const apiData = await API.graphql(graphqlOperation(query));
  const results = apiData.data.displayGames;
  return results;
}