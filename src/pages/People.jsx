import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getUsers } from "../store/users/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/login/action";

const People = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  const setAge = (birthday) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthday.slice(6), 10);
    return age;
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Пользователи
            </Typography>
            <Button color='inherit' onClick={() => navigate("/account")}>
              Редактировать
            </Button>
            <Button color='inherit' onClick={() => logOutHandler()}>
              Выход
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <ImageList sx={{ width: 800, height: 500, margin: "30px auto" }}>
        {users.map((item) => (
          <ImageListItem key={item.createdAt} sx={{ margin: 5 }}>
            {item.img && item.img !== undefined ? (
              <img
                src={`http://localhost:3001/images/${item.img}`}
                loading='lazy'
              />
            ) : (
              <PersonIcon fontSize='large' />
            )}
            <ImageListItemBar
              subtitle={<span style={{ fontSize: 20 }}>Имя: {item.name}</span>}
              position='below'
            />
            <ImageListItemBar
              subtitle={
                <span style={{ fontSize: 17, color: "gray" }}>
                  Возраст: {setAge(item.birthday)}
                </span>
              }
              position='below'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default People;
