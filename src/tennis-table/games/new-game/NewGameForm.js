import { Typography, Avatar, Grid, Card} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function NewGame() {
  return (
    <Card>
      <Grid item>
        <Typography variant="h2" component="h2" gutterBottom>
          Under construction ...
        </Typography>
        <Typography variant="subtitle2">
          Enjoy starting with a new game or navigate through old data !
        </Typography>
      </Grid>
    </Card>
  );
}

export default NewGame;
