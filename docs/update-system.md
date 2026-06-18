# AnkiFX Template Update & Legacy Migration System

## Production Architecture Artifact (Agent Implementation Spec)

This document defines the **production-grade architecture** for template versioning, update notifications, and legacy template migration in AnkiFX.

It is written as an **implementation contract for agentic development systems**. All behavior described here is deterministic, failure-safe, and strictly layered.

---

# 1. System Overview

The system is composed of **three strictly separated layers**:

## Layer 1 — Core Render Layer (CRL)

**Purpose:** Always render card content. Never blocked.

* HTML structure
* MCQ table rendering
* `run()` execution
* Persistence logic

**Failure tolerance:** Must always succeed even if all other systems fail.

---

## Layer 2 — Enhancement Layer (EL)

**Purpose:** Progressive enhancements when engine is available.

* `_ankifx.js`
* visual effects
* optional interactivity upgrades

**Failure tolerance:** Safe to fail silently.

---

## Layer 3 — Meta Layer (ML)

**Purpose:** Detect template version updates and notify user of CDN upgrades.

* template version comparison
* remote manifest fetch (`ANKIFX_CDN_URL`)
* update notification UI
* **must function even if engine is absent or broken**

**Critical property:**

> Meta Layer must NOT depend on AnkiFX, run(), or any engine state.

---

# 2. Legacy Migration Layer (Engine-Owned Subsystem)

A separate system exists for **pre-versioned templates**.

## Definition of Legacy Template

A template is considered legacy if:

* `data-template-version` is missing OR invalid
* `#ankifx-template-meta` does not exist
* no meta layer hooks are present

These templates predate the versioning system and are not self-aware.

---

## Responsibility

Legacy detection is **engine-owned**, not meta-layer owned.

This is critical:

> Meta Layer cannot detect legacy templates because legacy templates may not support it.

Therefore:

* Engine is responsible for detecting legacy state
* Engine is responsible for onboarding notifications
* Meta Layer remains isolated and future-safe only

---

# 3. Engine vs Meta Separation Rule

## Hard Rule:

> Meta Layer = future versioning system
> Engine Layer = migration system for older templates

They must never merge responsibilities.

---

# 4. Notification System Design

There are **two independent notification systems**:

---

## 4.1 Meta Update Notification (CDN Versioning)

### Trigger:

* local template version < remote version

### Source:

* `ANKIFX_CDN_URL/_afx_version.json`

### Output:

* “New template version available”

### Constraints:

* Must work without engine
* Must never block rendering
* Must be stateless (except dismissal storage)

---

## 4.2 Legacy Migration Notification (Engine-Owned)

### Trigger:

* template missing version metadata
* OR engine detects `legacyTemplate = true`

### Output:

* “You are using a legacy template. Update required.”

### Constraints:

* Only runs if engine is loaded successfully
* May assume runtime stability
* Does NOT rely on meta layer

---

# 5. Shared UI Primitive (Optional Abstraction)

Both systems MAY use a shared rendering utility:

## `renderBanner(config)`

### Allowed responsibilities:

* DOM injection
* styling
* click handling
* dismissal UI

### Forbidden responsibilities:

* version detection
* engine detection
* CDN logic
* persistence rules

---

# 6. Execution Model

## 6.1 Meta Layer Execution

Order of execution:

1. DOM ready
2. requestIdleCallback (preferred)
3. setTimeout fallback (0ms)
4. rAF (before render injection)

### Constraints:

* Must not reference engine globals
* Must not depend on run()
* Must not assume engine presence

---

## 6.2 Engine Layer Execution

Order of execution:

1. engine initialization
2. legacy template detection
3. migration banner (if needed)

### Constraints:

* must only run if `window.AnkiFX && window.AnkiFX.initialized === true`
* must not block Core Render Layer

---

# 7. Persistence Model

Used by both systems independently.

## Supported storage layers (priority order):

1. sessionStorage (preferred)
2. localStorage (fallback)
3. in-memory window fallback

## Failure rule:

If all fail → system becomes stateless (no crash, no persistence)

---

# 8. Versioning Rules

## Format:

`MAJOR.MINOR.PATCH`

## Comparison rules:

* `1.10.0 > 1.2.0`
* Missing patch → assumed `0`
* `v` prefix ignored
* build metadata ignored (`+build123`)
* pre-release precedence:

  * alpha < beta < rc < stable
* malformed versions → return false (never throw)

---

# 9. Remote Manifest Fetch

## Endpoint:

`ANKIFX_CDN_URL/_afx_version.json`

## Constraints:

* fetch OR XMLHttpRequest fallback
* timeout: 2000ms hard limit
* AbortController used where possible
* no retries
* failure → silent no-op

---

# 10. DOM Contract

## Required Meta Element (if supported):

```html
<div id="ankifx-template-meta"
     data-template-name="..."
     data-template-version="..."></div>
```

## Required Banner Root:

```html
<div id="afx-update-banner-root"></div>
```

## Rules:

* Meta Layer may assume existence of banner root
* Engine Layer may assume existence of meta element (or absence = legacy)

---

# 11. Failure Isolation Guarantees

## Meta Layer must survive:

* missing engine
* broken run()
* network failure
* malformed DOM
* missing templates
* partial script execution

## Engine Layer must survive:

* meta layer absence
* CDN unavailability
* legacy templates
* partial DOM state

## Core Render Layer must survive everything.

---

# 12. Key Invariants

### Invariant 1:

Core Render Layer always executes.

### Invariant 2:

Meta Layer never blocks rendering.

### Invariant 3:

Engine Layer never controls versioning logic.

### Invariant 4:

Legacy detection never depends on Meta Layer.

### Invariant 5:

UI rendering is decoupled from detection logic.

---

# 13. Mental Model for Agents

When implementing changes, agents must classify logic as:

* **Rendering concern → Core Layer**
* **Enhancement concern → Engine Layer**
* **Versioning / update awareness → Meta Layer**
* **Missing system bootstrap → Engine Layer only**

If classification is ambiguous → default to isolation (Meta Layer must not depend on it).

---

# 14. System Intent Summary

This system ensures:

* Cards always render even under total system failure
* Users are always informed when templates are outdated
* Legacy users are migrated without requiring prior system awareness
* Engine evolution cannot break update visibility
* Versioning is decoupled from runtime stability

---

# End of Spec