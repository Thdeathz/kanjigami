prisma-format:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma format

prisma-generate:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma generate

prisma-migrate:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate dev --name init --create-only

prisma-deploy:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate deploy

prisma-reset:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate reset --force
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn seed

prisma-seed:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn seed
