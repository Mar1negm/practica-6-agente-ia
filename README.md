# Práctica 6: Integrar un agente IA en un aplicativo web

Proyecto de chat web conectado a OpenRouter mediante un backend en Node.js y Express.

## Estructura

```text
agente-ia-web/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
└── README.md
```

## Requisitos

- Node.js y npm instalados.
- Una API key de OpenRouter.

## 1. Configurar el backend

Abre una terminal dentro de la carpeta `backend` y ejecuta:

```bash
npm install
```

Crea una copia del archivo `.env.example` y nómbrala `.env`. Dentro de `.env`, reemplaza `pega_aqui_tu_api_key` por tu clave de OpenRouter.

**Importante:** no subas el archivo `.env` a GitHub ni compartas tu API key. El archivo está excluido mediante `.gitignore`.

Inicia el servidor:

```bash
npm start
```

El backend quedará disponible en `http://localhost:3000`.

## 2. Abrir el frontend

Abre `frontend/index.html` en el navegador. También puedes usar la extensión Live Server de Visual Studio Code.

Escribe un mensaje y presiona **Enviar** o la tecla Enter. El frontend enviará la petición al backend, y este solicitará la respuesta a OpenRouter.

## 3. Probar el backend

Puedes abrir `http://localhost:3000` en el navegador. Debe aparecer un mensaje indicando que el backend está funcionando.

## Notas

- El modelo predeterminado es `openai/gpt-4o-mini`.
- Puedes cambiarlo mediante `OPENROUTER_MODEL` en el archivo `.env`.
- El historial de conversación se conserva en memoria mientras la página permanezca abierta.
- El frontend se conecta a `http://localhost:3000/api/chat`. Si cambias la dirección o el puerto del backend, actualiza `API_URL` en `frontend/app.js`.
