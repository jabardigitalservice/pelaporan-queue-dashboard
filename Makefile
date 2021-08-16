docker-build:
	docker-compose -f docker-compose-development.yml up --build --remove-orphans --force-recreate
docker-start:
	docker-compose -f docker-compose-development.yml up
docker-stop:
	docker-compose -f docker-compose-development.yml stop
docker-test:
	docker-compose -f docker-compose-development.yml exec dashboard-queue yarn test
docker-coverage:
	docker-compose -f docker-compose-development.yml exec dashboard-queue yarn test:coverage
docker-down:
	docker-compose -f docker-compose-development.yml down