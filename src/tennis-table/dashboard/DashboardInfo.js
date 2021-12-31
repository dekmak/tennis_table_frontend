import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  Hidden,
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';

import TrendingUp from '@mui/icons-material/TrendingUp';

function DashboardInfo() {

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography sx={{ pb: 3 }} variant="h4">
              Total Games
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                230 Games
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
              </Typography>
              <Box display="flex" sx={{ py: 4 }} alignItems="center">
                <Box>
                  <Typography variant="h4">+ 15</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Start a new game !
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} md={3}>
        </Grid>
        <Grid display="flex" item xs={12} md={3}>
          <div>
            <br/>
            <img src='/logo.jpg' width={"200px"} height={"150px"}>
            </img>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DashboardInfo;
