import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import AppTheme from '../shared-theme/AppTheme';
import AddPurchase from './AddPurchase';
import Container from "./Container";
import Card from "./Card";

export default function App(props) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h2"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Orden de Compra
          </Typography>
          <AddPurchase />
        </Card>
      </Container>
    </AppTheme>
  );
}
