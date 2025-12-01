#!/bin/bash

echo "🔨 Building PHNXForge..."
echo ""

# Build mathematics-engine
echo "📚 Building mathematics-engine..."
cd packages/mathematics-engine
pnpm build || (echo "❌ Failed to build mathematics-engine" && exit 1)
echo "✅ mathematics-engine built successfully"
echo ""

# Build common
echo "🔧 Building common..."
cd ../common
pnpm build || (echo "❌ Failed to build common" && exit 1)
echo "✅ common built successfully"
echo ""

# Build web-app
echo "🌐 Building web-app..."
cd ../../apps/web-app
pnpm build || (echo "❌ Failed to build web-app" && exit 1)
echo "✅ web-app built successfully"
echo ""

echo "🎉 Build completed successfully!"
echo ""
echo "To start the dev server:"
echo "  cd apps/web-app && pnpm dev"
echo ""
echo "To start production server:"
echo "  cd apps/web-app && pnpm start"
