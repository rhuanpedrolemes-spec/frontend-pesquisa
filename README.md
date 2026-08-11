# Tradição do Boleiro — Frontend (Angular)

Frontend da pesquisa de satisfação da barbearia Tradição do Boleiro, reescrito em Angular 22 (standalone components, sem NgModules) a partir do HTML original. Visual, textos e lógica condicional reproduzem fielmente a especificação e o protótipo em HTML — só a stack por baixo mudou.

Consome a API do backend (Node.js + Express + MongoDB), publicada separadamente em [backend-pesquisa](https://github.com/rhuanpedrolemes-spec/backend-pesquisa).

## Estrutura

```
src/app/
├── lock-screen/            # tela de bloqueio inicial
├── survey/
│   ├── question-scale-faces/   # escala de rostinhos 1-10
│   ├── question-choice/        # botões de múltipla escolha
│   ├── survey.ts                # renderiza a pergunta atual
│   └── survey-flow.service.ts   # máquina de estados / lógica condicional
├── referral-screen/        # indicação de amigo
├── thanks-screen/          # tela final de agradecimento
├── admin-panel/
│   ├── pin-pad/             # teclado numérico do PIN
│   └── admin-list/          # resumo + lista de respostas
├── shared/                  # ícones SVG, escala de cores dos rostinhos, logo
├── models/                   # tipos da Resposta
└── services/
    └── respostas.service.ts  # chamadas HTTP para o backend
```

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18+ e o [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`).

```bash
npm install
ng serve
```

Abra `http://localhost:4200/`. Por padrão, `src/environments/environment.ts` aponta para `http://localhost:3000` — suba o [backend](https://github.com/rhuanpedrolemes-spec/backend-pesquisa) localmente nessa porta (e configure o `ALLOWED_ORIGIN` dele para `http://localhost:4200`) para testar o fluxo completo, incluindo o envio de respostas e o painel administrativo.

## Variáveis de ambiente (URL da API)

A URL base da API **nunca** é hardcoded dentro dos componentes — está centralizada em dois arquivos:

- `src/environments/environment.ts` — usado em desenvolvimento (`ng serve`)
- `src/environments/environment.prod.ts` — usado no build de produção (`ng build`), via `fileReplacements` configurado em `angular.json`

Para apontar para outro backend, edite `apiBaseUrl` nesses arquivos:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://backend-pesquisa.onrender.com',
};
```

## Build de produção

```bash
ng build
```

Gera os arquivos estáticos em:

```
dist/frontend-pesquisa/browser/
```

Esse é o caminho real gerado pela versão atual do Angular CLI (22.x, builder `@angular/build:application`) — diferente de versões antigas do Angular, que geravam direto em `dist/frontend-pesquisa/`.

## Deploy na Vercel

1. Em [vercel.com](https://vercel.com), crie um **New Project** e importe o repositório `frontend-pesquisa`.
2. Configure:
   - **Framework Preset**: Angular
   - **Build Command**: `ng build`
   - **Output Directory**: `dist/frontend-pesquisa/browser`
   - **Root Directory**: raiz do repositório (sem subpasta)
3. Deploy. A Vercel não precisa de nenhuma variável de ambiente — a URL da API já está embutida no bundle de produção via `environment.prod.ts`.

Se o backend mudar de URL, edite `src/environments/environment.prod.ts`, dê commit e push — a Vercel republica automaticamente.
