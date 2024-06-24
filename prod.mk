build-web:
	docker build -t thdeathzz/kanjigami:web-latest -f ./deploy/web.Dockerfile ./web

build-api:
	docker build -t thdeathzz/kanjigami:api-latest -f ./deploy/api.Dockerfile ./api

build:
	@make build-web
	@make build-api

prod-clean:
	docker rmi $$(docker images 'thdeathzz/kanjigami:web-latest' -a -q)
	docker rmi $$(docker images 'thdeathzz/kanjigami:api-latest' -a -q)

prod-web:
	docker run -it --name $(COMPOSE_PROJECT_NAME)-web-prod -p 3000:3000 thdeathzz/kanjigami:web-latest

prod-api:
	docker run -it --name $(COMPOSE_PROJECT_NAME)-api-prod -p 3500:3500 thdeathzz/kanjigami:api-latest

prod-up:
	docker compose -f ./deploy/docker-compose.yml up -d

prod-down:
	docker compose -f ./deploy/docker-compose.yml down
