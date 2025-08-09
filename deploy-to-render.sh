#!/bin/bash
# Variables
DOCKER_USER="squarestory"                # Your Docker Hub username/org
IMAGE_NAME="survey-backend"               # Your repo name in Docker Hub
TAG="latest"                              # Change if needed
DOCKERFILE_PATH="backend/Dockerfile"      # Path to your Dockerfile
CONTEXT_PATH="."                          # Project root as build context

# Full image name
FULL_IMAGE="$DOCKER_USER/$IMAGE_NAME:$TAG"

echo "🚀 Building Docker image for linux/amd64..."
docker buildx build \
  --platform linux/amd64 \
  -t $FULL_IMAGE \
  -f $DOCKERFILE_PATH \
  $CONTEXT_PATH \
  --push

echo "✅ Image pushed to Docker Hub: $FULL_IMAGE"
echo "💡 Use this in Render: $FULL_IMAGE"
