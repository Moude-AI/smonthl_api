# GitHub Actions Workflows

## 🗑️ delete-smonthl-api-package.yml

**Purpose:** Automatically delete the `@moude-ai/smonthl-api@2.0.7` documentation package after 24 hours, then delete itself.

### What it does:

1. **Waits 24+ hours** - Scheduled to run on February 2, 2026 at 09:00 UTC (25 hours after package publication)
2. **Deletes the package** - Runs `npm unpublish @moude-ai/smonthl-api@2.0.7 --force`
3. **Verifies deletion** - Confirms the package no longer exists
4. **Self-destructs** - Deletes this workflow file from the repository
5. **Never runs again** - Once deleted, the workflow is gone forever

### Why?

The `@moude-ai/smonthl-api` package was a documentation-only package that's no longer needed. We now publish the actual HTML and React packages (`@moude-ai/smonthl` and `@moude-ai/smonthl-react`) from the main repository instead.

### Schedule:

- **Created:** February 1, 2026 ~08:00 UTC
- **Will run:** February 2, 2026 09:00 UTC
- **After completion:** Workflow file will be automatically deleted

### Manual Trigger:

You can also trigger this workflow manually from the Actions tab if you want to delete the package sooner (after 24 hours have passed).

### What remains after cleanup:

- ✅ `@moude-ai/smonthl@2.0.8` (HTML version)
- ✅ `@moude-ai/smonthl-react@2.0.8` (React version)
- ❌ `@moude-ai/smonthl-api@2.0.7` (deleted)

---

**Status:** ⏳ Waiting for scheduled execution...
