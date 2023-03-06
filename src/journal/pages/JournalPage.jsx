import { AddOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { NoteView, NothingSelectedView } from '../../views';
import { JournalLayout } from '../layout/JournalLayout';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis natus eos
        maxime dolor? Dolorum rem voluptatibus assumenda nisi accusamus
        molestiae similique sit quidem, distinctio ducimus odio, voluptas
        ratione tempora. Quidem.
      </Typography> */}
      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
