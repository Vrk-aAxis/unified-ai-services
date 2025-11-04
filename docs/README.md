# Documentation

This directory contains the API documentation for Generative AI Services.

## GitHub Pages Setup

To host this documentation on GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` (or your default branch)
   - Folder: Select `/docs`
   - Click Save

2. **Your documentation will be available at:**
   ```
   https://yourusername.github.io/repository-name/
   ```

3. **Jekyll Configuration:**
   - GitHub Pages automatically uses Jekyll to process the documentation
   - The `_config.yml` file configures Jekyll settings
   - The `_layouts/default.html` provides the navigation and styling

## Local Testing

To test the documentation locally before pushing:

1. **Install Jekyll** (if not already installed):
   ```bash
   gem install bundler jekyll
   ```

2. **Serve locally:**
   ```bash
   cd docs
   jekyll serve
   ```

3. **View at:**
   ```
   http://localhost:4000
   ```

## File Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── _layouts/
│   └── default.html     # HTML layout with navigation
├── index.md             # Home page
├── getting-started.md   # Getting started guide
├── endpoints.md         # API endpoints reference
├── authentication.md    # Authentication docs
├── error-handling.md    # Error handling guide
└── examples.md          # Code examples
```

## Navigation

The navigation is automatically generated from the layout file. To add new pages:

1. Create a new `.md` file in the `docs/` directory
2. Add a link to the navigation in `_layouts/default.html`
3. The page will automatically be included in the documentation

## Customization

- **Styling**: Edit `_layouts/default.html` to customize colors, fonts, and layout
- **Configuration**: Edit `_config.yml` to change site title, description, etc.
- **Navigation**: Update the navigation links in `_layouts/default.html`

