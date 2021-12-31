import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        {/* <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        /> */}
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          You are welcome to manage ping pong games from this useful tool,
        </Typography>
        <Typography variant="subtitle2">
          Enjoy starting with a new game or navigate through old data !
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
