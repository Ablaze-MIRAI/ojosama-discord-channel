FROM golang:1.18-alpine3.16

WORKDIR /usr/src/api

RUN apk add --update git
RUN git clone --depth 1 https://github.com/jiro4989/ojosama-web.git
WORKDIR /usr/src/api/ojosama-web
RUN ls -a && sleep 10
RUN go build -o app .
CMD [ "./app" ]