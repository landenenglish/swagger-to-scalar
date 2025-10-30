# Privacy Policy for Swagger to Scalar

**Last Updated:** October 30, 2025

## Overview

Swagger to Scalar is a browser extension that enhances your API documentation viewing experience by converting Swagger UI pages to Scalar API Reference pages.

## Data Collection

**We do not collect, store, transmit, or share any user data.**

Specifically:
- ✅ No personal information is collected
- ✅ No browsing history is tracked
- ✅ No analytics or telemetry
- ✅ No third-party services
- ✅ No cookies or tracking

## Local Storage

The extension stores only one piece of data locally in your browser:
- **View preference**: Whether you prefer Swagger or Scalar view (stored as "swagger" or "scalar")

This data:
- Never leaves your device
- Is stored using the browser's localStorage API
- Can be cleared by clearing your browser data

## Permissions

The extension requires these permissions:

### Host Permissions
- Access to pages matching `/swagger/*`, `/api-docs*`, `/swagger-ui.html*`
- **Why:** To detect and convert Swagger UI pages
- **Usage:** Only activates on Swagger UI pages, reads the OpenAPI spec URL

### Storage Permission
- **Why:** To remember your view preference (Swagger vs Scalar)
- **Usage:** Stores only your view preference locally

## Network Activity

The extension:
- Loads the Scalar library from `cdn.jsdelivr.net` when rendering the Scalar view
- Uses the same OpenAPI spec URL that Swagger UI was using (no additional network requests)
- All authentication headers from the original page are preserved

## Third-Party Services

The only external resource loaded is:
- **Scalar API Reference** library from `https://cdn.jsdelivr.net/npm/@scalar/api-reference`
- This is required to render the Scalar documentation view
- No user data is sent to Scalar or jsdelivr

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be posted in this document with an updated "Last Updated" date.

## Contact

If you have questions about this privacy policy, please open an issue on our GitHub repository.

