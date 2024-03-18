ifeq (,$(wildcard .env))
$(shell cp .env.example .env)
endif

include .env
include *.mk

genkey:
	node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

devup:
	docker compose up -d --remove-orphans

devinstall:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma generate
	@docker exec -it $(COMPOSE_PROJECT_NAME)-web-1 yarn
	@test -f web/.env || cp web/.env.example web/.env.local
	@test -f api/.env || cp api/.env.example api/.env

devrun:
	@docker exec -d ${COMPOSE_PROJECT_NAME}-api-1 yarn dev
	@docker exec -it $(COMPOSE_PROJECT_NAME)-web-1 yarn dev

devapi:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn dev

devweb:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-web-1 yarn dev

devdown:
	docker compose down --remove-orphans

devclean: devdown
	@docker rmi $$(docker images -a -q)
	@docker volume rm $$(docker volume ls -q)

lint-web:
	cd web && yarn lint --fix

lint-api:
	cd api && yarn lint --fix
