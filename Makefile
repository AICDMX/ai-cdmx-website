.PHONY: help install build dev serve down restart clean sprite hugo rosey-generate rosey-build

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

sprite: ## Build SVG sprite
	npm run build:sprite

hugo: ## Build Hugo site
	npm run build:hugo

rosey-generate: ## Generate Rosey base translations
	npm run rosey:generate

rosey-build: ## Build multilingual site with Rosey
	npm run rosey:build

build: ## Build complete site (sprite + hugo + rosey)
	npm run build

dev: ## Run Hugo development server (Spanish only, no Rosey)
	hugo server -D --bind 0.0.0.0

serve: build ## Build and serve the complete multilingual site
	@echo "Building site..."
	@echo ""
	@if python -c "import socket; s = socket.socket(); s.bind(('0.0.0.0', 8000)); s.close()" 2>/dev/null; then \
		cd dist && python -m http.server 8000 > /dev/null 2>&1 & \
		echo "Server started at http://localhost:8000"; \
		echo "Spanish version: http://localhost:8000/es/"; \
		echo "English version: http://localhost:8000/en/"; \
		echo ""; \
		echo "Use 'make down' to stop the server"; \
	else \
		echo "A server is already running on port 8000."; \
		echo "Use 'make down' to stop it first."; \
	fi

down: ## Stop the server running on port 8000
	@echo "Stopping server on port 8000..."
	@pkill -f "python.*http.server 8000" && echo "Server stopped." || echo "No server found running on port 8000."

restart: down serve ## Restart the server (stop and start fresh)

clean: ## Clean build artifacts
	rm -rf public/ dist/ .hugo_build.lock rosey/base.json rosey/base.urls.json

.DEFAULT_GOAL := help
