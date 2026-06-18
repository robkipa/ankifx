---
description: Guide on how to bump version and perform clean releases (including tags and CDN purging)
---

# Release and Version Bump Workflow Guide

This guide details the step-by-step process for bumping versions and releasing new builds. Failing to follow these synchronization checks will trigger update warning toasts in user templates or serve stale cache assets from the CDN.

---

## ⚠️ Checklist: Files to Synchronize on Version Bump

Every version bump (e.g. from `1.0.0` to `1.0.1`) requires updating the version string in exactly **7 locations** before staging the commit.

1. **`package.json`**:
   * Update the `"version": "X.Y.Z"` property in the package root.

2. **`CHANGELOG.md`**:
   * Change the release header to the new version: `## [X.Y.Z] - YYYY-MM-DD`.

3. **`configs/_afx_version.json`**:
   * Update `"latestTemplateVersion": "X.Y.Z"`.
   * Update all entry versions in `"templates"`: `"front_basic"`, `"front_mcq"`, `"back_basic"`, `"back_mcq"`.
   * Update the compatibility engine constraint: `"engine": ">=X.Y.Z"`.

4. **`build/card templates/ankifx_basic_front.html`**:
   * Div metadata (line 3): `data-template-version="X.Y.Z" data-engine-compatibility=">=X.Y.Z"`
   * Local Version fallback (around line 30): `|| "X.Y.Z"`
   * Initialization logging (around line 330): `Version: X.Y.Z`

5. **`build/card templates/ankifx_basic_back.html`**:
   * Div metadata (line 3): `data-template-version="X.Y.Z" data-engine-compatibility=">=X.Y.Z"`

6. **`build/card templates/ankifx_mcq_front.html`**:
   * Div metadata (line 3): `data-template-version="X.Y.Z" data-engine-compatibility=">=X.Y.Z"`
   * Local Version fallback (around line 56): `|| "X.Y.Z"`
   * Initialization logging (around line 357): `Version: X.Y.Z`

7. **`build/card templates/ankifx_mcq_back.html`**:
   * Div metadata (line 3): `data-template-version="X.Y.Z" data-engine-compatibility=">=X.Y.Z"`

---

## 🚀 Step-by-Step Release Lifecycle

### Step 1: Commit the Version Bump
Stage all 7 modified files and commit them to the `main` branch. This triggers the local post-commit hook to compile the assets and create a companion build commit:
```bash
git add package.json CHANGELOG.md configs/_afx_version.json "build/card templates/"*
git commit -m "chore: release vX.Y.Z"
```

### Step 2: Push Main Commits
Push the local `main` commits to the remote:
```bash
git push origin main
```

### Step 3: Tag and Push the Tag
Tag the HEAD compile commit and push the tag to GitHub. This triggers the GitHub Actions release workflow:
```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

### Step 4: Verify GitHub Actions Release Status
Verify that the `Release` job run succeeds on GitHub. The workflow checks that your committed build directory exactly matches a clean local build, parses release notes from the changelog, and publishes a GitHub Release with the templates and compiled bundles attached.

### Step 5: Purge CDN Cache (CRITICAL)
jsDelivr permanently caches tag resolutions at the origin server layer. To force jsDelivr to serve the fresh version immediately:
1. **Purge specific tag files**:
   ```bash
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/_ankifx.js
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/_afx_defaults.json
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/_afx_version.json
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/card%20templates/card_styling.css"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/card%20templates/ankifx_mcq_front.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/card%20templates/ankifx_basic_front.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/card%20templates/ankifx_mcq_back.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@vX.Y.Z/build/card%20templates/ankifx_basic_back.html"
   ```

2. **Purge `@v1` wildcard range files**:
   ```bash
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/_ankifx.js
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/_afx_defaults.json
   curl -s https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/_afx_version.json
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/card%20templates/card_styling.css"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/card%20templates/ankifx_mcq_front.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/card%20templates/ankifx_basic_front.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/card%20templates/ankifx_mcq_back.html"
   curl -s "https://purge.jsdelivr.net/gh/robkipa/ankifx@v1/build/card%20templates/ankifx_basic_back.html"
   ```

*Note: If jsDelivr returns a `throttled` response status, pause for a few seconds until the `throttlingReset` timer clears, then retry the request.*
