import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios.js';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Iconify from '../components/Iconify';

const StyledDiv = styled('div')(() => ({
  position: 'absolute',
  marginTop: -22,
  marginLeft: 470,
  paddingTop: 60,
  paddingLeft: 20,
  top: 90
}));


const Dashboard = () => {

  const navigate = useNavigate();

  const api = useAxios();
  const [res, setRes] = useState("");
  const [status, setStatus] = useState("");
  const [deleteUser, setDeleteUser] = useState("");

  const ResumeButton = (params) => {
    return (
      <strong>
        <a href={params.row.resume}><Button
          variant="contained"
          color="success"
          size="small"
          style={{ marginLeft: 16 }}
        >
          More Info
        </Button></a>
      </strong>
    )
  }

  const MoreOptionsButton = (params) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeStatusofCandidate = async (e) => {

      console.log(e.target.innerText);

      if (e.target.innerText == 'Accept') {
        try {
          const patchBody = { "status": "accepted" }
          const response = await api.patch(`/candidates/${params.row.id}/`, patchBody);
          setStatus(response.data);
          console.log(response.data);
        } catch {
          setStatus("Something went wrong");
        }
      }

      else if (e.target.innerText == 'Reject') {
        try {
          const patchBody = { "status": "rejected" }
          const response = await api.patch(`/candidates/${params.row.id}/`, patchBody);
          setStatus(response.data);
          console.log(response.data);
        } catch {
          setStatus("Something went wrong");
        }
      }
    }

    const deleteCandidate = async () => {
      console.log(deleteUser);
      try {
        const response = await api.delete(`/candidates/${params.row.id}/delete/`);
        setDeleteUser("deleted");
      } catch {
        setDeleteUser("Something went wrong");
      }
      console.log(deleteUser);
    }

    const handleViewMore = (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigate(`/candidate/${params.row.id}`);
    }

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Iconify
            icon={'mdi:dots-vertical'}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 144,
              overflow: 'visible',
              boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleViewMore} >
            <Iconify height={20} width={20} sx={{ mr: 1 }} icon={'eva:edit-fill'}></Iconify>
            <Typography variant={'body2'}>View More</Typography>
          </MenuItem>
          <Divider />
          {(params.row.status == 'rejected' || params.row.status == 'applied') && (<MenuItem onClick={(e) => { changeStatusofCandidate(e) }}>
            <Iconify color={'green'} height={20} width={20} sx={{ mr: 1 }} icon={'eva:checkmark-circle-2-outline'}></Iconify>
            <Typography color={'green'} variant={'body'}>Accept</Typography>
          </MenuItem>)}
          {(params.row.status == 'accepted' || params.row.status == 'applied') && (<MenuItem onClick={(e) => { changeStatusofCandidate(e) }}>
            <Iconify color={'red'} height={20} width={20} sx={{ mr: 1 }} icon={'eva:close-circle-outline'}></Iconify>
            <Typography color={'red'} variant={'body'}>Reject</Typography>
          </MenuItem>)}
          <MenuItem onClick={(e) => { deleteCandidate(e) }}>
            <Iconify color={'red'} height={20} width={20} sx={{ mr: 1 }} icon={'eva:trash-2-outline'}></Iconify>
            <Typography color={'red'} variant={'body2'}>Delete</Typography>
          </MenuItem>
        </Menu>
      </div >
    )
  }

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
      field: 'primary_role',
      headerName: 'Role',
      width: 180,
      editable: false,
    },
    {
      field: 'resume',
      headerName: 'Resume',
      width: 150,
      renderCell: ResumeButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: false,
    },

    {
      field: 'moreOptions',
      headerName: '',
      width: 2,
      renderCell: MoreOptionsButton,
      disableClickEventBubbling: true,
    },
  ];

  useEffect(() => {
    fetchData();
    console.log("data", res);
  }, [status, deleteUser])

  const fetchData = async () => {
    try {
      const response = await api.get("/candidates/");
      setRes(response.data);
      console.log(response.data);
    } catch {
      setRes("Something went wrong");
    }
  }

  return (
    <StyledDiv>
      <h1>Candidates List</h1>
      <div style={{ height: 650, width: 1200 }}>
        <DataGrid
          rows={res}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </StyledDiv>
  );
};

export default Dashboard;
