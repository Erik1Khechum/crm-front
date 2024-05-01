import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { get } from "../utils/storage";
import { updateUser } from "../store/users/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const maxNumber = 60;
  const onChange = (newImg) => {
    setImage(newImg[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      updateUser({
        name: data.get("name"),
        password: data.get("password"),
        img: image.file,
        email: get("email"),
      })
    )
      .then(() => {
        navigate("/people");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h5'>
            Редактировать
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Имя'
              name='name'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <ImageUploading
              value={image}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({ onImageUpload, isDragging, dragProps }) => (
                <div className='upload__image-wrapper'>
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Загрузить фото профиля
                  </Button>
                  {image && (
                    <div className='image-item'>
                      <img src={image["data_url"]} alt='' width='100' />
                      <div className='image-item__btn-wrapper'></div>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Редактировать
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Accounts;
