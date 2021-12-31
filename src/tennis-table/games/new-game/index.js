import { Typography, Avatar, Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import NewGameForm from './NewGameForm';

function ApplicationsPage() {
  return (
    <>
      <Helmet>
        <title>Players - Tennis Table</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <br />
            <NewGameForm />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsPage;
