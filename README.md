<h1>Bem vindo ao projeto Bê á Bá</h1>
<h2>Projeto Bê á Bá é um sistema de gerenciamento de templates, com o intuito de padronizar fluxo de dados entre equipes de diversas squads.</h2>

<div class="container-proposta">
<h3>Proposta do projeto</h3>
<p>
Versão: 1
  
Data: 22/08/2023

Descrição de Alteração: Versão Inicial do Documento 

Responsável: Allan Crasso

SISTEMA DE GERENCIAMENTO ELETRÔNICO DE TEMPLATE

Resumo do Projeto: Com o intuito de padronizar seu fluxo de dados. As equipes de diversas
squads precisam, com certa frequência, enviar arquivos, porém, a falta de padronização e
validação resulta em erros. Para solucionar isso, faz-se necessário o desenvolvimento de
uma solução que valide esses envios. A solução deverá permitir que os usuários criem
templates específicos para cada tipo de arquivo. Para controlar envio e validação, permissões
deverão ser atribuídas aos cargos para garantir a segurança. Algumas validações deverão
ser automáticas, dessa forma os erros serão minimizados. Os arquivos deverão ser
armazenados em um repositório seguro, além disso, um relatório deverá ser gerado,
mostrando, por exemplo, a quantidade e quem cadastrou determinado template.

Requisitos:
RQ001 – Cadastro de Templates: Permitir o cadastro de templates para os arquivos,
especificando os campos e formatos esperados.

RQ002 – Perfil de quem pode fazer upload dos arquivos: Definir perfis de usuários que têm
permissão para fazer upload dos arquivos.

RQ003 – Aqueles que visualizam os uploads somente terão acesso às rotinas ativas,
garantindo que apenas as informações relevantes sejam exibidas.

RQ004 – Permitir que os usuários que realizam o cadastro vejam todas as rotinas,
proporcionando uma visão completa das informações.

RQ005 – Realizar a verificação dos campos dos arquivos enviados, garantindo que
correspondam aos templates cadastrados. Ex.: Quantidade de colunas.

RQ006 – Armazenar os arquivos enviados em um repositório seguro para posterior acesso e
análise.

RQ007 – Permitir o cadastro de campos, nome dos arquivos e o número de linhas esperado
em cada arquivo.

RQ008 – - Incluir uma flag para ativar ou desativar um template, permitindo o controle de
quais templates estão disponíveis para uso.

RQ009 – Realizar o upload automático dos arquivos validados. (Python). 

RQ010 – Apresentar um dashboard que exiba os arquivos enviados, fornecendo informações
como data, nome do arquivo e quantidade de linhas. (Python)
</p>
</div>
