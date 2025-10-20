// importações do REA Bootstrap
import {
  /* 
        Permite criar um campo de formulário (`input`, `textarea`, etc.),
        onde o **rótulo (label)** “flutua” acima do campo quando o usuário digita algo. 
    */
  FloatingLabel,

  /*
        usado como **bloco principal de layout**.  
        Ele adiciona **margens laterais automáticas** e centraliza o conteúdo dentro da tela.  
        Pode ser usado com `fluid` para ocupar 100% da largura.
    */
  Container,

  /*
        Row = Linha
        Usado para criar **linhas** dentro do sistema de **grid (grade)** do Bootstrap.  
        Ele serve para **organizar o layout horizontalmente** — normalmente contém vários `<Col>` dentro.
    */
  Row,
  /*
        Col = Colunas
        Usado **dentro de um `<Row>`** para dividir a linha em partes proporcionais.  
        Cada `<Col>` ocupa uma fração da largura total e,
        se ajusta automaticamente em telas menores (responsividade).
    
    */
  Col,
  /*
        Form = Formulários Completos
        Ele fornece estilos e comportamentos padrão do Bootstrap para campos de entrada, 
        botões e validação.
    */
  Form,
  /*
        Button = Botões
        Usado para criar **botões estilizados** 
        com classes e temas do Bootstrap (`primary`, `secondary`, etc.).
    */
  Button,

  /* 
        Alert = Caixa de Alerta
        Usado para **mostrar mensagens visuais de feedback**, como erros, avisos ou confirmações.
    */
  Alert,
} from "react-bootstrap";

// Importando LOGO
import logo from "../../assets/Logo.png";

// Importando a estilização
import styles from "./Login.module.css";

// Importando useState para tratar de variáveis
import { useState } from "react";

// Importando useForm para tratar de Formulários
import { useForm } from "react-hook-form";

// Importando hook de verificação de login
import { useVerificaLogin } from "../../hooks/useUsuarios.jsx";

// Utilizando useNavigate para navegação entre páginas
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Criando navegação
  const navigate = useNavigate();

  // Chamando useState para a classe Alerta
  const [alertClass, setAlertClass] = useState("d-none");

  // Chamando e utilizando o useForm
  const {
    register, // Conecta inputs
    handleSubmit, // Lida com envios do form
    formState: { errors }, // Informações sobre o estado do form (erros, envio, etc.)
  } = useForm();

  // Chamando e utilizando o hook useVerLogin
  const { verificaLogin } = useVerificaLogin();

  // Envio => SUCESSO
  // data => objeto que contém todos os valores digitados pelo usuário nos campos do formulário
  const onSubmit = (data) => {
    console.log("Dados Enviados: ", data);

    //  Cria uma variável para armazenar a resposta completa que veio da função
    const resposta = verificaLogin();

    // Declaração do SE-SENÃO para verificação de erro:
    // Caso de SE SIM, mostra alerta e leva para home
    if (resposta === "Login efetuado com Sucesso!") {
      alert(resposta);
      navigate("/home");
    }
    // Caso de SENÃO, mostra o alerta
    else {
      setAlertClass("my-3 w-75 mx-auto");
    }
  };

  // Envio => INSUCESSO
  const onError = (errors) => {
    console.log("Errors: ", errors);
  };

  return (
    <div className={styles.pagelogin}>
      {/* Centraliza e limita a largura do conteúdo */}
      <Container className="justify-content-center align-content-center min-vh-100">

        {/* Cria uma linha horizontal na grade */}
        <Row className="flex-grow-1 d-flex align-items-center justify-content-center">

          {/* Coluna com o icone da página */}
          <Col 
            md={6}
            className="d-flex justify-content-center align-items-center">
            {/* Icone de Login */}
            {/* <BsBoxArrowInRight style={{ fontSize: "500px", color: "white" }} /> */}
            <img src={logo} alt="RhConnect Logo" className={styles.logo}/>
          </Col>

          {/* Uma "coluna" (pode haver várias) */}
          <Col className="d-flex flex-column">
            {/* Um formulário completo */}
            <Form
              // Estilizando o Form
              style={{ width: "75%", margin: "auto", textAlign: "center" }}
              // Utilizar o evento onSubmit pra envio do formulário
              // e o HandleSubmit vindo do hookForm
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <h2 className={styles.tituloLogin}>Bem Vindos ao RhConnect</h2>
              {/* Campo para Email */}
              <FloatingLabel
                controlId="InputEmail"
                label="Email"
                className="mb-5"
              >
                <Form.Control
                  type="email"
                  // Registra input
                  {...register("email", {
                    // Marca como campo Obrigatório
                    required: "Email ou Usuário Obrigatórios",
                    // Verificação para email correto
                    pattern: {
                      // é a regex que valida o formato do email.
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      // mensagem exibida se a regex não for satisfeita.
                      message: "Email ou Usuário inválidos",
                    },
                    // validação customizada.
                    validate: (value) =>
                      value.includes("@") || "Email deve possuir um @",
                  })}
                  placeholder="Seu Email ou Usuário"
                />

                {/* 
                        Se houver erro no campo email, 
                        ele exibirá a mensagem correspondente dentro de um <p> com a classe "error". 
                    */}
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </FloatingLabel>

              {/* Campo para Senha */}
              <FloatingLabel
                controlId="InputSenha"
                label="Senha"
                className="mb-5"
              >
                <Form.Control
                  type="password"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                  })}
                  placeholder="Sua senha"
                />

                {errors.senha && (
                  <p className="error">{errors.senha.message}</p>
                )}
              </FloatingLabel>

              {/* Botão para Envio */}
              <Button 
              style={{backgroundColor: "#344250"}}
              variant="danger" 
              type="submit" 
              className="mb-5" 
              size="lg">
                Login
              </Button>

              {/* Alerta, caso haja algum erro */}
              {/* <Alert variant="danger" className="my-3 w-75 mx-auto"> */}
              <Alert variant="warning" className={alertClass}>
                Usuário ou Senha, inválidos!
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
