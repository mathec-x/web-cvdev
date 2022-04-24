import React from 'react';
import Helmet from 'react-helmet';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import Container from '../../components/Container';
import Candidate from '../../services/Candidate';
import StackIconButton from '../../components/StackIconButton';
import useAuth from '../../hooks/useAuth';

const CandidateRegister = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user);

  const { login } = useAuth({
    onLogin: () => navigate({hash: 'menu'})
  })
  const [ok, setOk] = React.useState(false);
  const [data, setData] = React.useState({
    name: '',
    email: user?.email || '',
    image: null
  });

  const [nickname, setNickname] = React.useState(() => {
    return '@' + (user.email?.substring(0, user.email?.indexOf('@')) || '');
  });

  const debounceNickname = useDebounce(nickname);
  const handleNickname = (e) => {
    const value = e.target.value.startsWith('@') ? e.target.value.replace(' ', '') : '@' + e.target.value.replace(' ', '');
    setNickname(value);
  }

  const isValidForm = React.useMemo(() => {
    return data.name.TestName() && data.email.TestMail() && nickname.length > 4 && ok

  }, [data, nickname, ok])

  React.useEffect(() => {
    const checkAvailability = async () => {
      const res = await Candidate.search({ nick: debounceNickname });
      if (res.status === 200) {
        setOk(false);
      } else {
        setOk(true);
      }
    }
    if (debounceNickname) {
      checkAvailability();
    }
  }, [debounceNickname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      return login()
    }

    const res = await Candidate.create({ ...data, nick: nickname });
    if (res.status !== 201) {
      setTimeout(() => window.Alert('Falha ao cadastrar'), 400)
    } else {
      navigate(`/candidate/${nickname}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>Cadastrar</title>
      </Helmet>
      <Container
        justifyContent="center"
        alignItems="center"
        height="100%"
        minHeight="calc(100vh - 64px)"
        sx={{
          '@media (min-device-width: 933px)': {
            backgroundImage: 'url(/assets/background.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }
        }}
      >
        <Grid item xs={10} sm={6} lg={4} p={4} boxShadow={4} bgcolor="background.paper" component="form">
          <Stack mb={4}>
            <Typography>Cadastrar novo currículo</Typography>
            <Typography variant='caption'>Preencha todos os campos a seguir</Typography>
          </Stack>
          <Stack>
            <StackIconButton
              button={true}
              onClick={() => window
                .Prompt(`Preciso apenas de uma url com a imagem para o perfil`, [{ type: 'url', name: 'image', label: 'Cole um link válido' }])
                .then(({ image }) => setData({ ...data, image }))
                .catch(() => setData({ ...data, image: null }))
              }
            >
              <Avatar
                src={data?.image}
                variant="rounded"
                alt='register'
                onDropCapture={e => console.log(e)}
                sx={{
                  bgcolor: 'primary.main',
                  width: 120,
                  height: 120,
                  boxShadow: 10,
                  m: 'auto'
                }}
              />
            </StackIconButton>
          </Stack>
          <TextField
            autoFocus
            required
            onFocus={(e) => e.target.select()}
            margin='normal'
            fullWidth
            type="text"
            value={data.name}
            error={!data.name.TestName()}
            onChange={(e) => setData({ ...data, name: e.target.value.Capitalize() })}
            autoComplete='off'
            label="Nome"
            variant='standard'
            helperText={"Informe o nome do candidato"}
          />
          <TextField
            required
            margin='normal'
            fullWidth
            onFocus={(e) => e.target.select()}
            type="text"
            value={nickname}
            error={!ok || nickname.length < 5}
            onChange={handleNickname}
            autoComplete='off'
            label="Nickname"
            variant='standard'
            helperText={ok ? "Informe um nickname, inicie com @ para um perfil público" : "Nickname indisponível"}
          />
          <TextField
            required
            margin='normal'
            fullWidth
            type="email"
            value={data.email}
            error={!data.email.TestMail()}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            autoComplete='off'
            label="Email"
            variant='standard'
            helperText={"Informe o email do candidato"}
          />

          <Stack mt={4} width="auto">
            <Button fullWidth disabled={!isValidForm} onClick={handleSubmit} variant='outlined'>Criar</Button>
          </Stack>
        </Grid>
      </Container>
    </>
  )
}

export default CandidateRegister;