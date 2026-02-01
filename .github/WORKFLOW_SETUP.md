# 🔧 Workflow Setup Instructions

## ⚠️ Manual Setup Required

The workflow file `.github/workflows/delete-smonthl-api-package.yml` is in this repository but **cannot be pushed via API** due to GitHub security restrictions.

### To Enable the Workflow:

**Option 1: Push via Git CLI with proper credentials**
```bash
git add .github/workflows/
git commit -m "Add auto-delete workflow for smonthl-api package"
git push origin main
```

**Option 2: Create via GitHub Web Interface**
1. Go to https://github.com/Moude-AI/smonthl_api
2. Navigate to `.github/workflows/`
3. Click "Add file" → "Create new file"
4. Name: `delete-smonthl-api-package.yml`
5. Copy content from local file
6. Commit to main branch

**Option 3: Use GitHub CLI**
```bash
gh workflow enable delete-smonthl-api-package.yml
```

### What the Workflow Does:

1. ⏰ **Scheduled to run:** February 2, 2026 at 09:00 UTC
2. 🗑️ **Deletes package:** `@moude-ai/smonthl-api@2.0.7`
3. ✅ **Verifies deletion:** Confirms package is gone
4. 💥 **Self-destructs:** Deletes the workflow file itself
5. 🚫 **Never runs again:** Workflow is permanently removed

### Why This Workflow Exists:

The `@moude-ai/smonthl-api` package was a documentation-only package that's no longer needed. We now publish the actual packages from the main repository:
- ✅ `@moude-ai/smonthl@2.0.8` (HTML version)
- ✅ `@moude-ai/smonthl-react@2.0.8` (React version)

### Manual Alternative:

If you prefer not to use the workflow, you can manually delete the package after 24 hours:

```bash
export GITHUB_TOKEN="your_token_here"
npm unpublish @moude-ai/smonthl-api@2.0.7 --force --registry=https://npm.pkg.github.com
```

---

**Status:** ⏳ Workflow file created locally, waiting for manual push to GitHub
