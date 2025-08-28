# PlayTorneios - Sistema de Gerenciamento de Campeonatos Amadores
## Diagrama de classes
<img width="1415" height="1017" alt="image" src="https://github.com/user-attachments/assets/9ac2f6a9-bc5d-43f7-b3ee-200d66591030" alt="Diagrama de classes"/>


## Ferramentas Utilizadas
| Categoria          | Ferramenta          |
|--------------------|---------------------|
| Versionamento      | Git (GitHub)        |
| Build              | Maven               |
| Testes             | JUnit e Mockito     |
| Banco de Dados     | PostgreSQL          |

## Frameworks Reutilizados
**Backend**
- Spring Boot
- Spring Data JPA
- Spring Web MVC

**Frontend**
- Bootstrap 5  
- React
- FontAwesome
- Axios
- React Router Dom

## Gerando a Documentação do Código (JavaDoc)
```bash
mvn javadoc:javadoc
```
A documentação será gerada em HTML no diretório:  
`target/site/apidocs/`  
Abra o arquivo `index.html` neste diretório para visualizar a documentação completa.

## Executando o Sistema
### Pré-requisitos
- Java 21 ou superior
- Maven 3.8 ou superior
- PostgreSQL 14 ou superior
### Configuração Inicial
1. Crie o banco de dados no PostgreSQL:
```sql
CREATE DATABASE playtorneios;
CREATE USER playuser WITH PASSWORD 'play123';
GRANT ALL PRIVILEGES ON DATABASE playtorneios TO playuser;
```
2. Configure o arquivo `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/playtorneios
spring.datasource.username=playuser
spring.datasource.password=play123
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```
### Execução
#### Back-End
1. Compilar e executar com Maven:
```bash
mvn clean install
mvn spring-boot:run
```
2. Executar o arquivo JAR:
```bash
mvn package
java -jar target/playtorneios-0.0.1-SNAPSHOT.jar
```
#### Front-End
1. Instalar as dependências, compilar e executar com npm:
```bash
npm install
npm run dev
```

### Acesso ao Sistema
Após iniciar a aplicação, acesse em seu navegador:  
[http://localhost:8080](http://localhost:8080)
## Estrutura do Projeto - Back-End
```
playtorneios/
├── src/
│   ├── main/
│   │   ├── java/com/example/playtorneios/
│   │   │   ├── configuration/    
│   │   │   ├── controller/
│   │   │   ├── dto/      
│   │   │   ├── model/   
│   │   │   ├── service/       
│   │   │   └── PlayTorneioApplication.java       
│   │   ├── resources/
│   │   │   ├── static/        
│   │   │   ├── templates/     
│   │   │   └── app.properties 
│   └── test/                  
├── .gitignore
├── pom.xml                    # Configuração do Maven
└── README.md                  # Este documento
```
## Front-End
```
├── web/
|  |── node_modules/
|  ├── public/
|  ├── src/
|  │   ├── assets/
|  │   ├── components/
|  │   ├── pages/
|  │   ├── App.jsx
|  │   ├── main.jsx
|  ├── .gitignore
|  ├── eslint.config.js
|  ├── index.html
|  ├── package.json
|  ├── package-lock.json
|  ├── README.md
|  └── vite.config.js
```        
## Equipe
- Gustavo Alves Penna Ferreira
- Pedro Vieira Marquesini
