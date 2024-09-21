import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TrafficIcon from '@mui/icons-material/Traffic';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import GridViewIcon from '@mui/icons-material/GridView';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';
export default function LogScreen({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentHost = window.location.hostname;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height:"90%" } }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold", color: "rgb(116, 165, 138)", display: 'flex', alignItems: 'center' }}>
        <GridViewIcon  sx={{ marginRight: '8px', fontSize: '32px' }} /> Log Screen
      </DialogTitle>

      <DialogContent dividers>

        <Box
        display="grid"
        gridTemplateColumns="32% 32% 32%"
        gap="20px"
        alignItems="start"
      > 
{/*1------------begin--------------------------------------- */}
  <Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=gutsssssssss9&parent=${currentHost}`}
    height="70%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter1Icon style={{ fontSize: '30px', color: 'white', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

  </Box>

{/*2------------begin----------------------------------------------------------------- */}
<Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=dat_live2&parent=${currentHost}`}
    height="70%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter2Icon style={{ fontSize: '30px', color: 'white', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

  </Box>
{/*3------------begin------------------------------------------------------------- */}


<Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=dat_live1&parent=${currentHost}`}
    height="70%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter3Icon style={{ fontSize: '30px', color: 'white', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'white' }} />
<Typography variant="h3" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

  </Box>
      </Box>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
