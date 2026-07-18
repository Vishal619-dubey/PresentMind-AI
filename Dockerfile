FROM node:20-bookworm

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libreoffice \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package*.json ./server/
RUN npm install --prefix server

COPY python_engine/requirements.txt ./python_engine/requirements.txt
RUN pip3 install --no-cache-dir --break-system-packages -r python_engine/requirements.txt

COPY server ./server
COPY python_engine ./python_engine

WORKDIR /app/server

ENV PYTHON_COMMAND=python3

CMD ["npm", "start"]
