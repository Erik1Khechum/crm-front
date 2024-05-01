import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../store/registration/action";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const HomePage = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const maxNumber = 60;
  const onChange = (newImg) => {
    setImage(newImg[0]);
  };
  const isUserAuthenticated = useSelector((store) => store);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      registration({
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("firstName"),
        surname: data.get("lastName"),
        birthday: data.get("birth"),
        gender: data.get("radio-buttons-group"),
        img: image.file,
      })
    );
    isUserAuthenticated ? navigate("people") : null;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Регистрация
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='Имя'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Фамилия'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Пароль'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label='Дата рождения' name='birth' />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>Пол</FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Мужской '
                    />
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                      label='Женский'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='login' variant='body2'>
                  У вас уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
