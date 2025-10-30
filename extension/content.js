/**
 * Swagger to Scalar - Chrome Extension
 * Automatically converts Swagger UI pages to beautiful Scalar API documentation
 *
 * @version 1.0.0
 * @license MIT
 * @author landenenglish
 */
;(function () {
  'use strict'

  // ============================================================================
  // Constants
  // ============================================================================
  const SWAGGER_SELECTOR = '.swagger-ui'
  const SCALAR_CDN = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference'
  const WAIT_TIMEOUT = 3000
  const STORAGE_KEY = 'swagger-to-scalar-preference'

  // ============================================================================
  // Utility Functions
  // ============================================================================

  /**
   * Wait for an element to appear in the DOM (optimized with MutationObserver)
   */
  function waitForElement(selector, timeoutMs = WAIT_TIMEOUT) {
    return new Promise((resolve, reject) => {
      // Check if element already exists
      const existing = document.querySelector(selector)
      if (existing) return resolve(existing)

      // Use MutationObserver for efficient DOM watching (throttled)
      let checking = false
      const observer = new MutationObserver(() => {
        if (checking) return
        checking = true

        requestAnimationFrame(() => {
          const element = document.querySelector(selector)
          if (element) {
            observer.disconnect()
            clearTimeout(timer)
            resolve(element)
          }
          checking = false
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      // Timeout fallback
      const timer = setTimeout(() => {
        observer.disconnect()
        reject(new Error(`Timeout waiting for ${selector}`))
      }, timeoutMs)
    })
  }

  /**
   * Convert relative URL to absolute
   */
  function toAbsoluteUrl(url) {
    try {
      return new URL(url, location.href).href
    } catch {
      return null
    }
  }

  // ============================================================================
  // Spec URL Detection
  // ============================================================================

  /**
   * Try to extract OpenAPI spec URL from DOM
   */
  function extractSpecFromDom() {
    // Look for spec links in HTML (excluding validator URLs)
    const links = document.querySelectorAll(
      'a[href$="swagger.json"], a[href$="openapi.json"], a[href*="/swagger/"]'
    )
    for (const link of links) {
      if (link.href && !link.href.includes('validator.swagger.io')) {
        return toAbsoluteUrl(link.href)
      }
    }

    // Parse SwaggerUIBundle config from inline scripts
    const swaggerScript = Array.from(document.scripts).find((s) =>
      s.textContent?.includes('SwaggerUIBundle')
    )

    if (!swaggerScript?.textContent) return null

    // Match single URL: url: "..." or multiple URLs: urls: [{ url: "..." }]
    const match = swaggerScript.textContent.match(
      /(?:^|,|\{)\s*url:\s*["']([^"']+)["']/
    )
    return match?.[1] ? toAbsoluteUrl(match[1]) : null
  }

  /**
   * Get OpenAPI spec URL from various sources
   */
  async function getSpecUrl() {
    // 1. Try window.ui.getConfigs() - most reliable (official Swagger UI API)
    try {
      if (window.ui?.getConfigs) {
        const config = window.ui.getConfigs()
        if (config?.url) return toAbsoluteUrl(config.url)
        if (config?.urls?.[0]?.url) return toAbsoluteUrl(config.urls[0].url)
      }
    } catch {}

    // 2. Check performance API for actual network requests (excludes validator URLs)
    try {
      const resources = performance.getEntriesByType('resource')
      const specResource = resources.find(
        (r) =>
          /swagger\.json|openapi\.json/i.test(r.name) &&
          !r.name.includes('validator.swagger.io')
      )
      if (specResource) return specResource.name
    } catch {}

    // 3. Fall back to DOM extraction (least reliable)
    const domUrl = extractSpecFromDom()
    if (domUrl) return domUrl

    return null
  }

  // ============================================================================
  // UI Manipulation
  // ============================================================================

  /**
   * Create and return the Scalar root container
   */
  function createScalarRoot() {
    let root = document.getElementById('scalar-root')
    if (root) return root

    root = document.createElement('div')
    root.id = 'scalar-root'
    root.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: 9999;
    `

    document.body.appendChild(root)
    document.body.style.overflow = 'hidden'
    return root
  }

  /**
   * Create toggle button to switch between Swagger and Scalar
   */
  function createToggleButton() {
    const button = document.createElement('button')
    button.id = 'scalar-toggle'
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M2 8h12M10 4l4 4-4 4"/>
      </svg>
      <span>Swagger</span>
    `
    button.style.cssText = `
      position: fixed;
      top: 12px;
      right: 80px;
      z-index: 10000;
      padding: 6px 12px;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      color: rgba(255, 255, 255, 0.95);
      border: none;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: none;
      letter-spacing: -0.01em;
    `

    // Hover effect
    button.onmouseenter = () => {
      button.style.background = 'rgba(0, 0, 0, 0.65)'
      button.style.transform = 'translateY(-1px)'
    }
    button.onmouseleave = () => {
      button.style.background = 'rgba(0, 0, 0, 0.5)'
      button.style.transform = 'translateY(0)'
    }

    return button
  }

  /**
   * Get/set saved view preference
   */
  function getSavedPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'scalar'
    } catch {
      return 'scalar'
    }
  }

  function savePreference(view) {
    try {
      localStorage.setItem(STORAGE_KEY, view)
    } catch {}
  }

  /**
   * Toggle between Swagger and Scalar views
   */
  function toggleView() {
    const scalarRoot = document.getElementById('scalar-root')
    const button = document.getElementById('scalar-toggle')
    if (!scalarRoot || !button) return

    const showingScalar = scalarRoot.style.display !== 'none'

    if (showingScalar) {
      // Switch to Swagger
      scalarRoot.style.display = 'none'
      setSwaggerVisibility(true)
      document.body.style.overflow = ''
      document.body.style.backgroundColor = ''
      button.querySelector('span').textContent = 'Scalar'
      savePreference('swagger')
    } else {
      // Switch to Scalar
      scalarRoot.style.display = ''
      setSwaggerVisibility(false)
      document.body.style.overflow = 'hidden'
      applyDarkThemeIfPreferred()
      button.querySelector('span').textContent = 'Swagger'
      savePreference('scalar')
    }
  }

  /**
   * Show/hide Swagger and its parent container
   */
  function setSwaggerVisibility(visible) {
    const swagger = document.querySelector(SWAGGER_SELECTOR)
    if (!swagger) return

    const display = visible ? '' : 'none'
    swagger.style.display = display

    const parent = swagger.parentElement
    if (parent && parent !== document.body) {
      parent.style.display = display
    }
  }

  /**
   * Apply dark theme to body if user prefers dark mode
   */
  function applyDarkThemeIfPreferred() {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      document.body.style.backgroundColor = '#1a1a1a'
    }
  }

  /**
   * Apply saved preference on load
   */
  function applySavedPreference() {
    if (getSavedPreference() === 'swagger') {
      const scalarRoot = document.getElementById('scalar-root')
      const button = document.getElementById('scalar-toggle')

      if (scalarRoot && button) {
        scalarRoot.style.display = 'none'
        setSwaggerVisibility(true)
        document.body.style.overflow = ''
        document.body.style.backgroundColor = ''
        button.querySelector('span').textContent = 'Scalar'
      }
    }
  }

  // ============================================================================
  // Scalar Injection
  // ============================================================================

  /**
   * Generate iframe HTML for Scalar with spec content
   */
  function generateScalarHtml(specContent) {
    // Store spec in a global variable instead of inline JSON to avoid escaping issues
    const specJson = JSON.stringify(specContent)
    return `<!DOCTYPE html>
<html style="margin:0;padding:0;height:100%">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Scalar API Reference</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; }
    #scalar-container { width: 100%; height: 100%; }
  </style>
  <script id="spec-data" type="application/json">${specJson}</script>
</head>
<body>
  <div id="scalar-container"></div>
  <script src="${SCALAR_CDN}" async onload="initScalar()"></script>
  <script>
    function initScalar() {
      if (window.Scalar?.createApiReference) {
        const specData = JSON.parse(document.getElementById('spec-data').textContent);
        window.Scalar.createApiReference('#scalar-container', {
          content: specData,
          persistAuth: true,
          hideClientButton: true
        });
      }
    }
  </script>
</body>
</html>`
  }

  /**
   * Fetch the OpenAPI spec
   */
  async function fetchSpec(specUrl) {
    try {
      const response = await fetch(specUrl, {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch spec: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('[Swagger→Scalar] Failed to fetch spec:', error)
      return null
    }
  }

  /**
   * Render Scalar in an iframe
   */
  async function renderScalar(specUrl) {
    // Setup: dark theme + hide Swagger (prevents flash)
    applyDarkThemeIfPreferred()
    setSwaggerVisibility(false)

    // Fetch the spec content
    const specContent = await fetchSpec(specUrl)
    if (!specContent) {
      console.error('[Swagger→Scalar] Could not load spec from:', specUrl)
      return
    }

    // Create Scalar container
    const root = createScalarRoot()

    // Create and inject iframe with blob URL to bypass CSP
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'border:0;width:100%;height:100%;display:block'
    iframe.referrerPolicy = 'no-referrer'
    iframe.sandbox = 'allow-scripts allow-same-origin'

    // Use blob URL to create an independent document (bypasses frame-ancestors CSP)
    const html = generateScalarHtml(specContent)
    const blob = new Blob([html], { type: 'text/html' })
    iframe.src = URL.createObjectURL(blob)
    root.appendChild(iframe)

    // Add toggle button
    const toggleButton = createToggleButton()
    toggleButton.onclick = toggleView
    document.body.appendChild(toggleButton)

    // Apply saved preference
    applySavedPreference()

    window.__scalarInjected = true
  }

  // ============================================================================
  // Main Entry Point
  // ============================================================================

  async function main() {
    if (window.__scalarInjected) return

    // Wait for Swagger UI to appear
    const swaggerEl =
      document.querySelector(SWAGGER_SELECTOR) ||
      (await waitForElement(SWAGGER_SELECTOR).catch(() => null))
    if (!swaggerEl) return

    // Extract spec URL
    const specUrl = await getSpecUrl()
    if (!specUrl) {
      console.warn('[Swagger→Scalar] Could not find OpenAPI spec URL')
      return
    }

    // Inject Scalar
    renderScalar(specUrl)
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
  } else {
    main()
  }
})()
