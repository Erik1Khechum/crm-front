import notfoundPicture from "../../public/notfound.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateBackHandler = () => {
    navigate(-1);
  };
  return (
    <Box>
      <img src={notfoundPicture} alt='img' />
      <Button variant='text' onClick={navigateBackHandler} color="warning">
        Назад
      </Button>
    </Box>
  );
};

export default NotFound;
