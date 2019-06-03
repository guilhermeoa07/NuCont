## Instructions

### Dependencias:
    Deve ter instalado Versão v10.10.0 ou superior do Node.js
    Versão 6.9.0 ou superior do NPM.
    MongoDB versão v4.0.8 ou superior


### Iniciando projeto. 

- Iniciar com o comando:
        
        npm install

- Configurar caminho do mongoDB:

        Abrir a pasta src/app/config, localize o config.json
        Em database ajuste o caminho para a collection

- Após a instalação e configuração dos pacotes apropriados:

        npm start

### Rotas:

#### GET

- Busca por todos os itens: 

       Requisição GET:  http://127.0.0.1:port/transform

- Busca por Descrição:

        Requisição GET: http://127.0.0.1:port/transform/:description

