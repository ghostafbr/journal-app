import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../journal/components';

export const NoteView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 3 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          28 de agosto, 2022
        </Typography>
      </Grid>

      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Put a title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What happened today?'
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
