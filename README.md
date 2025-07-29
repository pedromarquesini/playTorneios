# PlayTorneios - Sistema de Gerenciamento de Campeonatos Amadores
## Ferramentas Utilizadas
| Categoria          | Ferramenta          |
|--------------------|---------------------|
| Versionamento      | Git (GitHub)        |
| Build              | Maven               |
| Testes             | JUnit               |
| Issue Tracking     | GitHub Issues       |
| Container          | Docker              |
| Banco de Dados     | PostgreSQL          |
## Frameworks Reutilizados
**Backend**
- Spring Boot
- Spring Data JPA
- Spring Web MVC
- Hibernate Validator

**Frontend**
- Bootstrap 5  
- Thymeleaf

## Gerando a Documentação do Código (JavaDoc)
```bash
mvn javadoc:javadoc
```
A documentação será gerada em HTML no diretório:  
`target/site/apidocs/`  
Abra o arquivo `index.html` neste diretório para visualizar a documentação completa.

## Executando o Sistema
### Pré-requisitos
- Java 17 ou superior
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
3. Executar com Docker:
```bash
docker build -t playtorneios .
docker run -p 8080:8080 playtorneios
```
### Acesso ao Sistema
Após iniciar a aplicação, acesse em seu navegador:  
[http://localhost:8080](http://localhost:8080)
## Estrutura do Projeto
```
playtorneios/
├── src/
│   ├── main/
│   │   ├── java/com/playtorneios/
│   │   │   ├── controller/    
│   │   │   ├── model/         
│   │   │   ├── repository/    
│   │   │   ├── service/       
│   │   │   ├── dto/           
│   │   │   └── App.java       
│   │   ├── resources/
│   │   │   ├── static/        
│   │   │   ├── templates/     
│   │   │   └── app.properties 
│   └── test/                  
├── .gitignore
├── pom.xml                    # Configuração do Maven
└── README.md                  # Este documento
```
## Equipe
- Gustavo Alves Penna Ferreira
- Pedro Vieira Marquesini