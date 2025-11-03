# Swagger to Scalar

A Chrome extension that automatically converts Swagger UI pages to beautiful Scalar API Reference documentation.

![Version](https://img.shields.io/badge/version-1.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/chrome-extension-orange)

## Features

- **Automatic Conversion** - Instantly replaces Swagger UI with Scalar on any Swagger page
- **Toggle Anytime** - Switch between Swagger and Scalar views with a single click
- **Preserves Authentication** - All your API keys and auth headers carry over seamlessly
- **Remembers Your Preference** - Automatically shows your preferred view on page reload
- **Dark Mode Support** - Smooth transitions with no white flash for dark mode users
- **Zero Configuration** - Works out of the box, no setup required
- **Privacy First** - No data collection, tracking, or analytics

## Why Use This?

Scalar provides a modern, beautiful alternative to Swagger UI with:

- Cleaner, more intuitive interface
- Better syntax highlighting
- Improved request/response examples
- Modern design that matches 2024+ standards

## Installation

### From Chrome Web Store (Coming Soon)

1. Visit the [Chrome Web Store listing](#)
2. Click "Add to Chrome"
3. Done! Visit any Swagger page to see it in action

### Manual Installation (Developer Mode)

1. Clone this repository:

   ```bash
   git clone https://github.com/landenenglish/swagger-to-scalar.git
   cd swagger-to-scalar
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked"

5. Select the `extension` folder from this repository

6. The extension is now installed! Visit any Swagger UI page to test it

## Usage

1. Navigate to any page with Swagger UI (e.g., `https://example.com/swagger`)
2. The page automatically converts to Scalar
3. Use the toggle button (top right) to switch back to Swagger anytime
4. Your preference is saved and restored on page reload

## Supported Pages

Works on pages matching these patterns:

- `*://*/swagger/*`
- `*://*/api-docs*`
- `*://*/swagger-ui.html*`

## Development

### Project Structure

```
swagger-to-scalar/
├── extension/
│   ├── content.js       # Main extension logic
│   ├── manifest.json    # Extension configuration
│   └── icons/           # Extension icons
├── PRIVACY.md           # Privacy policy
├── LICENSE              # MIT License
└── README.md            # This file
```

### How It Works

1. **Detection**: Content script waits for `.swagger-ui` element to appear
2. **Spec Extraction**: Extracts the OpenAPI spec URL from Swagger's config
3. **Injection**: Creates an iframe with Scalar, pointing to the same spec
4. **Toggle**: Provides a button to switch between Swagger and Scalar views
5. **Persistence**: Stores view preference in localStorage

### Key Technologies

- **Manifest V3** - Latest Chrome extension standard
- **Scalar** - Modern API documentation renderer
- **MutationObserver** - Efficient DOM watching
- **localStorage** - Preference persistence

## Privacy

This extension:

- Does not collect any user data
- Does not track browsing history
- Does not use analytics or telemetry
- Stores only your view preference locally
- Does not communicate with external servers (except loading Scalar's CDN)

See [PRIVACY.md](PRIVACY.md) for full details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Bug Reports

Found a bug? Please open an issue with:

- Browser version
- Extension version
- Swagger page URL (if public)
- Steps to reproduce
- Expected vs actual behavior

## Support

- **Issues**: [GitHub Issues](https://github.com/landenenglish/swagger-to-scalar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/landenenglish/swagger-to-scalar/discussions)

## Acknowledgments

- [Scalar](https://github.com/scalar/scalar) - Beautiful API documentation
- [Swagger/OpenAPI](https://swagger.io/) - API specification standard

---

By [Landen English](https://github.com/landenenglish)
