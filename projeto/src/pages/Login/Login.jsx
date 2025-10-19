// Importação 1 do REA bootstrap
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Alert,
} from "react-bootstrap";

// Importando css
import styles from "./Login.module.css";

// Importando hook para a Verificação de Login
import { useVerLogin } from "../../hooks/useUsuarios";

// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

// Importando useState para tratar de variáveis
import { useState } from "react";

// importação do Navigate para transitar entre as paginas
import { useNavigate } from "react-router-dom";

const Login = () => {
  //register = cria um objeto com os valores retirados dos inputs
  //handleSubmit = envia os dados formulário, caso dê erro ou sucesso
  //formState { erros } = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Variável para a classe de Alerta
  const [alertClass, setAlertClass] = useState("d-none");

  //Usando apenas a função verificaLogin, que importei do hook
  const { verificaLogin } = useVerLogin();

  // Hook de navegação entre as páginas
  const navigate = useNavigate();

  // Caso de SUCESSO
  // data => contém todos os valores dos campos (email e senha)
  const onSubmit = (data) => {
    // Mostra no console os dados digitados (apenas para debug)
    console.log("Dados enviados:", data);

    // Chama função que verifica se email/senha estão corretos
    // Guarda a resposta ("Login efetuado com sucesso" ou erro)
    const resposta = verificaLogin(data);

    // SE login correto: mostra alerta e redireciona para página
    if (resposta === "Login efetuado com Sucesso") {
      alert(resposta);
      navigate("/home");

      // SENÃO: Torna o alerta de erro visível mudando a classe CSS
    } else {
      setAlertClass("my-3 w-75 mx-auto");
    }
  };

  // Caso de ERROR
  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <div className={styles.pagelogin}>
      <Container className="justify-content-center align-content-center min-vh-100">
        {/* Linha para os campos de login e icone */}
        <Row>
          {/* Coluna com o icone da página */}
          <Col>
            {/* Icone de Login */}
            {/* <BsBoxArrowInRight style={{ fontSize: "500px", color: "white" }} /> */}
            {/* <img src={logo} alt="" width={"600px"} height={"600px"}/> */}
          </Col>
          {/* Coluna com os campos de login */}
          <Col className="d-flex flex-column">
            <Form
              style={{ width: "75%", margin: "auto", textAlign: "center" }}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              {/* alteração feita para adicionar texto na caixa de login */}

              <h2 className={styles.tituloLogin}>Login</h2>
              {/* Caixinha de email */}
              <FloatingLabel
                controlId="inputEmail"
                label="Email"
                className="mb-5"
              >
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "Email inválido",
                    },
                    validate: (value) =>
                      value.includes("@") || "Email deve possuir um @",
                  })}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </FloatingLabel>
              {/* Fim de caixinha de email */}

              {/* Fim de senha */}
              <FloatingLabel
                controlId="inputSenha"
                label="Senha"
                className="mb-5"
              >
                <Form.Control
                  type="password"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                  })}
                />
                {errors.senha && (
                  <p className="error">{errors.senha.message}</p>
                )}
              </FloatingLabel>
              {/* Fim da senha */}

              {/* Botão para envio */}
              <Button
                style={{ backgroundColor: "#344250" }}
                variant="primary"
                type="submit"
                className="mb-5"
                size="lg"
              >
                Login
              </Button>

              {/* Alerta, caso aja algum erro */}
              <Alert variant="danger" className={alertClass}>
                Usuário ou senha inválidos
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
