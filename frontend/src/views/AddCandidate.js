import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')(() => ({
    position: 'absolute',
    marginTop: -22,
    marginLeft: 270,
    paddingLeft: 20,
    top: 90
}));


const AddCandidate = () => {
    return (
        <StyledDiv>
            <h1>Add candidate page</h1>
        </StyledDiv>
    );
};

export default AddCandidate;
