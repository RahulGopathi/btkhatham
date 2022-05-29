import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Chip,
  CardActions,
  CardContent,
  NativeSelect,
  Paper,
  Tab,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import Iconify from '../components/Iconify';
import useAxios from '../utils/useAxios.js';
import toast from 'react-hot-toast';

const StyledDiv = styled('div')(() => ({
  position: 'absolute',
  marginTop: -22,
  marginLeft: 400,
  top: 90,
}));

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#00AB55',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B0B9C2',
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00AB55',
    },
  },
});

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ButtonStyled = styled(LoadingButton)(() => ({
  fontWeight: 700,
  marginRight: 30,
  textTransform: 'none',
  backgroundColor: '#00AB55',
  boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
  '&:hover': {
    backgroundColor: '#007B55',
  },
}));

const IndividualCandidate = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const api = useAxios();
  const [res, setRes] = useState(' ');

  const [value, setValue] = useState('1');
  const [chipData, setChipData] = useState([]);
  const [candidateStatus, setCandidateStatus] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStatusChange = (e) => {
    setCandidateStatus(e.target.value);
    console.log(status);
  };

  const goToNextTab = (newValue) => {
    setValue(newValue);
  };

  const changeStatusofCandidate = async () => {
    if (candidateStatus === 'accepted') {
      try {
        const patchBody = { status: 'accepted' };
        const response = await api.patch(`/candidates/${id}/`, patchBody);
        setStatus(response.data);
        toast.success('Successfully changed the status!');
      } catch {
        setStatus('Something went wrong');
        toast.error('Something went wrong');
      }
    } else if (candidateStatus === 'rejected') {
      try {
        const patchBody = { status: 'rejected' };
        const response = await api.patch(`/candidates/${id}/`, patchBody);
        setStatus(response.data);
        toast.success('Successfully changed the status!');
      } catch {
        setStatus('Something went wrong');
        toast.error('Something went wrong');
      }
    } else if (candidateStatus === 'applied') {
      try {
        const patchBody = { status: 'applied' };
        const response = await api.patch(`/candidates/${id}/`, patchBody);
        setStatus(response.data);
        toast.success('Successfully changed the status!');
      } catch {
        setStatus('Something went wrong');
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await api.get(`/candidates/${id}/`);
      setRes(response.data);
      const skills = response.data.skills;
      setChipData(skills.split(', '));
    } catch {
      setRes('Something went wrong');
      toast.error('Candidate not found');
      navigate('/');
    }
  };

  return (
    <StyledDiv>
      <h1>Candidate Info</h1>
      <Box sx={{ width: 700, typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: '#00AB55', height: 3 },
              }}
              aria-label="lab API tabs example"
            >
              <Tab label="General" value="1" />
              <Tab label="Experience" value="2" />
              <Tab label="Projects" value="3" />
              <Tab label="Portfolio" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="Full Name"
                  variant="outlined"
                  value={res.first_name + ' ' + res.last_name}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
                <StyledTextField
                  label="Email Address"
                  variant="outlined"
                  value={res.email || ''}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="Phone Number"
                  variant="outlined"
                  value={res.phone || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
                <StyledTextField
                  label="Address"
                  variant="outlined"
                  value={res.adress || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="Country"
                  variant="outlined"
                  value={res.country || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
                <StyledTextField
                  label="State"
                  variant="outlined"
                  value={res.state || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="City"
                  variant="outlined"
                  value={res.city || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
                <StyledTextField
                  label="Zipcode"
                  variant="outlined"
                  value={res.zipcode || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="Edcation"
                  variant="outlined"
                  value={res.education || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 663,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <StyledTextField
                  label="Bio"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={res.bio || ' '}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 663,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <ButtonStyled
                sx={{ marginTop: 2, marginRight: 0, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('2');
                }}
              >
                Next
              </ButtonStyled>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            {res.experience}
            <Box>
              <ButtonStyled
                sx={{ marginLeft: 0, marginTop: 2, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('1');
                }}
              >
                Back
              </ButtonStyled>
              <ButtonStyled
                sx={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 3,
                  marginRight: 2,
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('3');
                }}
              >
                Next
              </ButtonStyled>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            {res.projects}
            <Box>
              <ButtonStyled
                sx={{ marginLeft: 0, marginTop: 2, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('2');
                }}
              >
                Back
              </ButtonStyled>
              <ButtonStyled
                sx={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 3,
                  marginRight: 2,
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('4');
                }}
              >
                Next
              </ButtonStyled>
            </Box>
          </TabPanel>
          <TabPanel value="4">
            <Card sx={{ minWidth: 250 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, display: 'flex' }}
                  >
                    Website :
                    {res.website ? (
                      <a
                        style={{ marginLeft: 10, color: '#00AB55' }}
                        href={res.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {res.website}{' '}
                        <Iconify
                          sx={{ position: 'relative', top: 3, left: 3 }}
                          icon={'eva:external-link-outline'}
                        />{' '}
                      </a>
                    ) : (
                      <p style={{ margin: 0, paddingLeft: 10 }}>
                        {' '}
                        Not Provided{' '}
                      </p>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, display: 'flex' }}
                  >
                    Resume :
                    {res.resume ? (
                      <a
                        style={{ marginLeft: 10, color: '#00AB55' }}
                        href={res.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {' '}
                        {res.resume}{' '}
                        <Iconify
                          sx={{ position: 'relative', top: 3, left: 3 }}
                          icon={'eva:external-link-outline'}
                        />{' '}
                      </a>
                    ) : (
                      <p style={{ margin: 0, paddingLeft: 10 }}>
                        {' '}
                        Not Provided{' '}
                      </p>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ position: 'relative', left: 20, fontWeight: 600 }}
                  >
                    Skills :
                    <Paper
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                        width: 500,
                        height: 10,
                        maxHeight: 50,
                        position: 'relative',
                        left: 63,
                        top: -35,
                        boxShadow: 0,
                      }}
                      component="ul"
                    >
                      {chipData.map((item, index) => {
                        return (
                          <ListItem key={index}>
                            <Chip label={item} />
                          </ListItem>
                        );
                      })}
                    </Paper>
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    position: 'relative',
                    left: 13,
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  Status :
                  <NativeSelect
                    defaultValue={res.status}
                    sx={{ marginLeft: 2 }}
                    inputProps={{
                      name: '',
                      id: 'uncontrolled-native',
                    }}
                    onChange={(e) => {
                      handleStatusChange(e);
                    }}
                  >
                    <option value={'applied'}>Applied</option>
                    <option value={'accepted'}>Accepted</option>
                    <option value={'rejected'}>Rejected</option>
                  </NativeSelect>
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <ButtonStyled
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={changeStatusofCandidate}
                >
                  Update
                </ButtonStyled>
              </CardActions>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </StyledDiv>
  );
};

export default IndividualCandidate;
