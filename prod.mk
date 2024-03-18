build-web:
	docker build -t web:latest -f ./deploy/web.Dockerfile ./web

build-api:
	docker build -t api:latest -f ./deploy/api.Dockerfile ./api

build-nginx:
	docker build -t nginx:latest -f ./deploy/nginx/Dockerfile ./deploy/nginx

build:
	@make build-web
	@make build-api

prod-clean:
	docker rmi $$(docker images 'web:latest' -a -q)
	docker rmi $$(docker images 'api:latest' -a -q)

prod-web:
	docker run -it --name $(COMPOSE_PROJECT_NAME)-web-prod -p 3000:3000 web:latest

prod-api:
	docker run -it --name $(COMPOSE_PROJECT_NAME)-api-prod -p 3500:3500 api:latest

prod-up:
	docker compose -f ./deploy/docker-compose.yml up -d

prod-down:
	docker compose -f ./deploy/docker-compose.yml down
