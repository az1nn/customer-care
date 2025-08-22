setup:
	pnpm install

build:
	pnpm run build

test:
	pnpm test

lint:
	pnpm lint

format:
	pnpm format

update-lib:
	pnpm install light-portal-components@latest --registry http://10.230.43.182:8081/repository/npm-group/
