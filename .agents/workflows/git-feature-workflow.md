---
description: How to manage Git branching and commits for new features and fixes with automated commit-to-version matching
---

# Git Feature Workflow & Commit-to-Version Matching

This workflow ensures every task is tracked in a clean feature branch, commits remain granular and conventional, and the compiled engine version always matches your Git commit history using automated compilers.

---

## 🚀 The Commit-to-Version Matching Process

This repository utilizes an automated build-pipeline linked to Git commit events:
1. **Source Commit**: You make changes and commit them (e.g., in the `src/` directory).
2. **Post-Commit Hook**: The `.git/hooks/post-commit` script automatically triggers.
3. **Dynamic Compiler**: The hook runs `npm run build`, which triggers `build.js`:
   * **Hash Resolution**: It queries `git rev-parse --short HEAD` to extract the hash of the commit you *just* made.
   * **Dirty Check**: It runs `git status --porcelain`. If your workspace has untracked or uncommitted changes, it appends a `+` to the version (e.g. `1.0.0-7af40a2+`). If your workspace is clean, it uses the clean hash (e.g. `1.0.0-7af40a2`).
   * **Environment Injection**: Esbuild injects this string into the bundle as `process.env.ANKIFX_VERSION`.
4. **Build Commit**: The post-commit hook automatically stages `build/_ankifx.js` and commits it with the message:
   `build: compile build for [commit_hash]`

This guarantees that:
* **Legibility**: The Diagnostics panel on both desktop and mobile displays the exact version hash matching your Git log.
* **Traceability**: You can instantly confirm whether your device has loaded the latest build or is running cached/older CDN assets.

---

## 📝 Best Practices

1. **Never Edit or Stage `build/_ankifx.js` Manually**:
   * Let the automated `post-commit` hook handle compiling and committing the build bundle. Only stage and commit files in `src/`, `configs/`, or package files.
2. **Maintain a Clean Working Tree Before Committing**:
   * If you commit while having uncommitted or untracked changes, the version stamp will include a `+` suffix, signifying a "dirty" development state.
   * Keep a clean tree to ensure clean, traceable production-like version hashes.
3. **Push All Commits**:
   * Because every source commit generates a companion build commit, you will see your branch is ahead of `origin` by `2` commits after a single save.
   * Always run `git push origin [branch]` to push both commits to the remote branch, which immediately triggers the jsdelivr CDN refresh.

---

## ⚙️ Step-by-Step Feature Lifecycle

### 1. Check Current State
Ensure you are on a clean working tree:
```bash
git status
```

### 2. Sync with Main
Ensure your local `main` is up to date:
```bash
git checkout main
git pull origin main
```

### 3. Create Feature Branch
Create and switch to a new descriptive branch (e.g. `feat/` or `fix/`):
```bash
git checkout -b feat/my-new-feature
```

### 4. Incremental Commits
Commit your source changes frequently using standard Conventional Commits prefix tags:
```bash
git add src/core/engine.js
git commit -m "feat: added new visual effect loader"
```
*(The automated hook will run immediately, compiling the asset and creating a `build: compile build for...` commit).*

### 5. Merge back to Main
Once your changes are fully verified on desktop and mobile and you are ready to publish:
```bash
git checkout main
git merge feat/my-new-feature
git push origin main
```
*(Since both the source and build commits are already cleanly created on the feature branch, a fast-forward merge integrates them seamlessly into main).*

### 6. Cleanup
Delete your local feature branch to keep your environment clean:
```bash
git branch -d feat/my-new-feature
```

