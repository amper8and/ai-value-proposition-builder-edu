import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for all routes
app.use('*', cors())

// Serve static files from public/static directory
app.use('/static/*', serveStatic({ root: './public' }))

// Main application route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MTN Education Solution Developer (Demo)</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Custom CSS -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Favicon -->
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>">
    </head>
    <body class="bg-gray-50 antialiased">
        <div id="app" class="min-h-screen">
            <!-- Loading state -->
            <div class="flex items-center justify-center h-screen">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-orange-600 text-4xl mb-4"></i>
                    <p class="text-gray-600">Loading MTN Education Solution Developer...</p>
                </div>
            </div>
        </div>
        
        <!-- Data -->
        <script src="/static/data.js"></script>
        
        <!-- Main Application -->
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    service: 'MTN Education Solution Developer',
    timestamp: new Date().toISOString()
  })
})

// API endpoint for saving deals (placeholder for future backend integration)
app.post('/api/deals', async (c) => {
  const body = await c.req.json()
  
  // In a real app, this would save to a database
  // For demo, we just return success
  return c.json({ 
    success: true, 
    message: 'Deal saved successfully',
    dealId: Date.now()
  })
})

// API endpoint for getting saved deals
app.get('/api/deals', (c) => {
  // In a real app, this would fetch from a database
  // For demo, return empty array as data is stored in localStorage
  return c.json({ 
    success: true, 
    deals: []
  })
})

// 404 handler
app.notFound((c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Not Found</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 flex items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-orange-600 mb-4">404</h1>
            <p class="text-xl text-gray-600 mb-4">Page not found</p>
            <a href="/" class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-block">
                Return to Home
            </a>
        </div>
    </body>
    </html>
  `, 404)
})

export default app
