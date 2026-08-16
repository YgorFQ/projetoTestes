# Desenvolvimento local com Firebase

## Objetivo

O ambiente local permite testar autenticacao, regras, concorrencia, presenca e
fallback sem alterar producao. O frontend usa os mesmos modulos do site; apenas
os endpoints do SDK mudam para os emuladores.

## Iniciar

Terminal 1:

```powershell
npm run firebase:emulators
```

Terminal 2, quando quiser outra porta:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:5000/` para Hosting Emulator ou
`http://127.0.0.1:4173/` para o servidor estatico.

## Preparar uma conta local

O app nao cria owner automaticamente. Isso aproxima desenvolvimento da
seguranca real. Crie usuario no Auth Emulator e cadastre o membro com o script
administrativo ou importe uma fixture de teste. A interface Emulator UI mostra
os documentos e usuarios locais.

## Estado que desaparece

Sem `--import` e `--export-on-exit`, dados de emulador podem desaparecer ao
encerrar. Nao confunda isso com exclusao em producao. Para cenarios automatizados,
os testes criam e limpam seus proprios projetos isolados.

## Fluxo recomendado de uma alteracao

1. Inicie emuladores.
2. Abra duas janelas ou dois perfis.
3. Reproduza o comportamento atual.
4. Faça a mudanca no dono correto.
5. Teste sucesso e uma falha relevante.
6. Rode os testes automatizados.
7. Atualize docs e Guide.
8. Confira modo estatico antes de publicar.

## Ler logs

- console do navegador: carga, listeners e erros traduzidos;
- Emulator UI: documentos, requests e usuarios;
- `firestore-debug.log`: detalhes locais ignorados pelo Git;
- `database-debug.log`: Realtime Database local ignorado pelo Git.

Nunca versione logs. Eles podem conter emails, IDs, caminhos e payloads.

## Testar tempo real

1. Entre com duas contas autorizadas.
2. Abra a mesma feature.
3. Salve em uma janela.
4. Confirme que a outra atualiza sem F5.
5. Abra o mesmo editor nas duas.
6. Salve na primeira.
7. Tente salvar o rascunho atrasado na segunda.
8. Confirme aviso e ausencia de sobrescrita.

## Testar contingencia

O snapshot publico e carregado antes do Firebase. Para verificar o modo de
leitura, desative temporariamente Firebase pela configuracao local ou simule
falha de rede, sem editar o bundle gerado. Confirme:

- badge identifica snapshot;
- dados aparecem;
- criacao e edicao sao recusadas;
- busca, preview e copia continuam funcionando.

## Regras

Regras devem ser testadas no Emulator Suite. Nao use apenas a tela para provar
seguranca: qualquer pessoa pode chamar o SDK pelo console. Os testes exercitam
owner, admin, editor, visitante, schema invalido e conflito.

## Dependencias

`functions/` conserva o nome por estabilidade dos comandos, mas contem apenas
scripts administrativos locais. O frontend nao chama Cloud Functions. Depois
de mudar dependencias dessa pasta, rode `npm install` nela e versione o lockfile.
