# Tintly

## Project Description
Your app is a simple, aesthetic, smart-feeling web app where users upload pictures of their clothes, and the app magically picks which items go well together based on color harmony and vibe rules. It is generally made for people who are lacking fashion sense and would use it on a daily basis.

## Product Requirements Document
# Product Requirements Document (PRD): Tintly MVP

## 1. Introduction

### 1.1 Purpose
This Product Requirements Document (PRD) defines the scope, goals, features, and technical constraints for the Minimum Viable Product (MVP) of Tintly. Tintly is a minimalist, web-based application designed to provide users with immediate, aesthetically pleasing outfit suggestions based on the color harmony and compatibility of their uploaded clothing items.

### 1.2 Goals
The primary goal of the MVP is to create a lightning-fast, client-side application that delivers a "magical" and trustworthy outfit recommendation experience to users lacking fashion intuition. The experience must prioritize aesthetics, speed, and visual calm.

### 1.3 Target Audience
Individuals aged 18–30 who are generally interested in fashion but lack the confidence or knowledge for daily outfit coordination. The app must be highly intuitive for users with average technical proficiency.

## 2. Core Features (MVP Scope)

The MVP will focus solely on client-side processing and deterministic logic based on color theory.

### 2.1 Clothing Inventory Management (Local Storage)
Users must be able to import their clothing items.

*   **Data Persistence:** All inventory data (images and metadata) must be stored locally using **IndexedDB (via Dexie.js)** to handle image size limitations of LocalStorage.
*   **Upload Mechanism:** Drag-and-drop upload interface with an animated outline feedback.
*   **Image Requirements (Input):** Images should ideally be 500–800px minimum, JPEG/PNG format, clear, and centered on the garment. No automatic background removal is required for MVP.
*   **Metadata Capture (Per Item):**
    *   `id` (Unique Identifier)
    *   `imageData` (Base64 or Blob)
    *   `category` (Required: shirt, pants, dress, shoes, jacket, accessory – user-selectable via dropdown/radio)
    *   `dominantColor` (Extracted client-side)
    *   `tone` (Extracted: warm / cool / neutral based on dominant color analysis)
    *   `pattern` (User-selected for MVP: solid, striped, graphic, floral)

### 2.2 Outfit Suggestion Engine (Client-Side Logic)
The core functionality is the algorithmic matching of two or more items into an outfit.

*   **Scenario Trigger:** Outfit generation is triggered by the user selecting a context (e.g., "Casual," "Professional"). This context will internally map to predefined weighting rules (e.g., "Casual" prioritizes T-shirt + Jeans compatibility).
*   **Color Harmony Rules (Core Logic):** Matching must incorporate fundamental color theory:
    *   Complementary (High contrast, rewarding, high score potential)
    *   Analogous (Low contrast, harmonious, moderate score potential)
    *   Monochrome (Very low contrast, neutral score potential)
*   **Scoring System (0–100):** A composite score must be calculated based on a weighted combination of factors:
    1.  **Color Harmony Match:** (Highest Weight) How closely the colors adhere to one of the supported harmony rules.
    2.  **Saturation Balancing:** Penalize extreme mismatches (e.g., pairing a highly saturated item with a very dull one, unless intentionally styled as a "pop").
    3.  **Contrast Weighting:** Assessing the overall visual lightness/darkness contrast between items.
    4.  **Category Compatibility:** Basic filtering to prevent illogical pairings (e.g., Shirt + Shirt).
*   **User Feedback Loop (MVP Constraint):** **LEVEL 1 – Deterministic Logic only.** No ML training, user upvotes/downvotes, or learning of preferences is required for the MVP. The logic must be consistent, fast, and predictable.

### 2.3 Primary Output Display
The suggested outfit must be displayed immediately following computation.

*   **Outfit Card Presentation:** Displayed as two (or more) item cards placed next to each other, emphasizing partnership.
*   **Item Card Details:** Each component item in the suggested outfit must show:
    *   The original uploaded image (with soft shadow and 8px rounding).
    *   A small, extracted color swatch (circular, prominent).
    *   The garment label (Category: Shirt, Pants, etc.).
    *   **Match Score:** Prominently displayed (e.g., 92/100).
*   **Vibe Sentence:** A short, human-toned explanation accompanying the score, based on the primary matching logic applied:
    *   *Example:* “Balanced complementary contrast — clean, modern look.”
    *   *Example:* “Neutral anchor with a bright pop.”

## 3. Aesthetic and Design Specifications

The application must embody a premium, minimalist, and calm digital environment.

### 3.1 Overall Mood
Minimalist, soft, clean lines, airy, calm. The design should evoke a blend of "Pinterest Wardrobe Moodboard" meets refined tech (Apple/Notion).

### 3.2 Color Palette (Soft Dark Mode Default)
*   **Background:** Deep charcoal base: `#0D0F11` or `#111315`. Subtle, soft gradient preferred.
*   **Surface Cards:** Glassmorphism effect. Transparent panels using low opacity white overlays (`#FFFFFF10` to `#FFFFFF15`) with low blur.
*   **Accent Colors (Sparingly Used):** Soft Lavender (`#B7A9FF`), Muted Teal (`#86D1C8`), Peach/Coral (`#FFB5A7`). These are reserved for color swatches, match score highlights, and animated elements.

### 3.3 Typography
A two-font system to create a soft tech-fashion mix.
*   **Main Font (UI/Body):** Clean Sans-serif (Inter, Satoshi, or similar). Weights: 400 (Body), 500 (Labels), 600 (Headings).
*   **Secondary Font (Vibe Accent - Optional):** Condensed/Editorial style (e.g., Space Grotesk) for subtle headings or decorative text.

### 3.4 Component Styling
*   **Cards (Item + Match):** Rounded-2xl, Glassmorphism panels, subtle 10–15% opacity white edge highlights. Soft, low-strength drop shadows for depth.
*   **Buttons:** Pill-shaped, minimalist text, soft pastel gradient backgrounds, subtle hover effects.
*   **Color Swatches:** 16–20px circles, displayed in a palette strip, thin border, tiny glow effect.

### 3.5 Animation and Interaction
Heavy emphasis on smooth, deliberate microinteractions to convey the "smart-feeling."
*   **Motion Style:** Cubic Bézier easing (`cubic-bezier(0.22, 1, 0.36, 1)`).
*   **Micro-animations:** Subtle hover scale (1–2%), soft slide-up (10–14px) on load, delayed cascading/staggered entry for match cards.
*   **Smart-Feeling Visuals:** Animated color halos around high-score matches (>85), subtle dynamic shadows, and pulsation effects on the corresponding color swatch.

## 4. Technical Constraints and Performance

The MVP must be entirely client-side and optimized for speed.

### 4.1 Technology Constraints
*   **No Backend:** No servers, authentication, or cloud storage for MVP.
*   **No ML/AI:** Strictly deterministic, rule-based logic. No TensorFlow.js, CLIP, or complex CNN processing.
*   **Client-Side:** Must run effectively in Chrome, Safari, and Edge. Offline capability after initial load is desired.
*   **Image Processing:** Limited to color extraction, contrast analysis, and basic palette generation. No segmentation or background removal.

### 4.2 Performance Targets
| Action | Target Time | Notes |
| :--- | :--- | :--- |
| Image Upload → Processing | Under 800 ms | Must be near-instantaneous. |
| Outfit Matching Computation | Under 150 ms | Logic must be extremely fast comparison. |
| Full Outfit Suggestion Render | Under 2 seconds | From input trigger to visual display. |
| Local DB Fetch (Post-load) | Under 100 ms | IndexedDB interaction speed. |

## 5. Future Scope (Out of MVP)

The following features are explicitly out of scope for the MVP but represent potential future directions:

*   User account synchronization or cloud wardrobe backup.
*   AI-based outfit history learning or preference adaptation.
*   Integration with weather APIs for contextual dressing.
*   Shopping/affiliate links integration.
*   Social sharing features for generated outfits.

## Technology Stack
# Tintly Technology Stack Documentation

## 1. Overview and Philosophy

The Tintly tech stack is engineered for speed, aesthetics, and a \"magical,\" lightweight client-side experience. Following the project mandate, the stack is aggressively **front-end focused (No Backend for MVP)**, relying on modern browser capabilities for data persistence and computation. Performance targets (sub-800ms processing, sub-150ms matching) dictate the choice of fast, non-ML libraries. The stack prioritizes developer experience (DX) alongside achieving the specified "soft tech-fashion" aesthetic.

---

## 2. Front-End Framework and Core UI

The entire application logic, rendering, and state management will reside in the browser.

| Category | Recommended Technology | Justification |
| :--- | :--- | :--- |
| **Core Framework** | **React (with Next.js or Vite)** | React provides the component-based architecture necessary for complex, aesthetic UI construction. **Vite** is strongly preferred over Create-React-App/traditional Next.js setups for this project due to its superior build speed, aligning with performance goals. |
| **Styling** | **Tailwind CSS** | Essential for achieving the specific, highly detailed aesthetic requirements (glassmorphism, custom spacing, soft shadows, specific border radii) rapidly and consistently. Utility-first approach minimizes style drift. |
| **Aesthetics/Animation** | **Framer Motion** | Critical for implementing the required heavy microinteractions, delayed cascading animations, hover effects, and smooth transitions that convey the \"smart-feeling\" and premium vibe without feeling chaotic. |
| **State Management** | **React Context / Zustand (Simple Global State)** | Given the client-only nature and lack of complex asynchronous operations (no complex server sync), a lightweight state manager like Zustand or React's built-in Context API is sufficient. Avoid heavy solutions like Redux for MVP simplicity. |

---

## 3. Data Persistence and Local Storage

Since no backend is planned for MVP, all user-uploaded clothing items and metadata must persist reliably in the user's browser.

| Category | Recommended Technology | Justification |
| :--- | :--- | :--- |
| **Primary Data Store** | **IndexedDB** | Required for storing potentially hundreds of high-resolution images (as Blobs or Base64 strings) without hitting LocalStorage limits (~5-10MB). Necessary for a stable wardrobe experience. |
| **IndexedDB Wrapper** | **Dexie.js** | Provides a clean, promise-based wrapper around the complex native IndexedDB API. Highly recommended for simplifying CRUD operations and adhering to the \"easiest to build\" constraint while handling image data robustly. |
| **Configuration/Small State** | **LocalStorage** | Used only for small, non-image data like user preferences (e.g., default theme setting, current session data). |

---

## 4. Image Processing and Color Logic (Client-Side Computation)

This section is critical for achieving the core functionality (color harmony and vibe scoring) entirely client-side and meeting strict performance budgets.

| Category | Recommended Technology | Justification |
| :--- | :--- | :--- |
| **Image Handling/Loading** | **Native Browser APIs (File Reader, Canvas)** | Direct use of browser APIs for reading image files (upload) and basic resizing/manipulation is fastest and avoids library overhead. |
| **Color Extraction** | **Fast Color Quantization Library (e.g., `quantize.js` or a custom, simplified K-means implementation using pure JS)** | Must be extremely fast. The goal is to extract a few dominant colors (1-5) per image within 100-300ms. Heavy, complex ML-based color analysis is explicitly excluded. |
| **Color Analysis / Matching Logic** | **Pure JavaScript Algorithms** | All color harmony rules (complementary, analogous, saturation balancing, contrast weighting) will be implemented using custom mathematical functions in pure JS, leveraging libraries like **`color-convert`** or **`tinycolor2`** for RGB/HSL manipulation. This ensures maximum speed for the sub-150ms matching goal. |
| **Vibe/Category Tagging** | **Manual User Input / Simple Switch Logic** | MVP relies on user-selected category/vibe tags stored in the metadata, avoiding complex automatic detection. |

---

## 5. Typography and Visual Language

The font selection directly impacts the premium, soft, and modern aesthetic.

| Element | Recommended Font Family | Weight Usage | Justification |
| :--- | :--- | :--- | :--- |
| **Primary UI/Body** | **Inter** (or **Geist Sans** as an alternative) | 400 (Body), 500 (Labels), 600 (Headings) | Excellent legibility, modern, clean lines, highly versatile for digital interfaces. Fits the Apple/Notion feel. |
| **Accent/Editorial (Optional)** | **Outfit** or **Space Grotesk** | Light/Regular | Used sparingly for high-impact headings or decorative elements to introduce the subtle \"tech-fashion\" mix. |
| **CSS Handling** | **Google Fonts / Local Hosting** | N/A | Host required font files locally if possible via Vite's asset handling to improve offline capability and load consistency, adhering to the lightweight requirement. |

---

## 6. Development Environment and Tooling

| Category | Recommended Technology | Justification |
| :--- | :--- | :--- |
| **Bundler/Build Tool** | **Vite** | Superior speed for HMR (Hot Module Replacement) and final build output compared to Webpack-based tooling, crucial for a fast-paced \"vibe project.\" |
| **Code Quality** | **ESLint + Prettier** | Enforce consistent code style, especially regarding the delicate spacing and naming conventions required for complex styling systems like Tailwind/Glassmorphism. |
| **Version Control** | **Git / GitHub** | Standard industry practice for managing the code evolution, even for a non-budgeted project. |
| **Deployment Target** | **Vercel or Netlify (Static Hosting)** | Simple, zero-configuration hosting optimized for static assets and SPAs (Single Page Applications). Perfect for a completely client-side MVP. |

## Project Structure
PROJECT STRUCTURE DOCUMENT: TINTLY (Client-Side Vibe Web App)
---------------------------------------------------------------
VERSION: 1.0 (MVP Scope)
DATE: 2024-05-20
AUTHOR: Documentation Generator

1. OVERVIEW

This document outlines the file and directory structure for the Tintly client-side web application. Given the constraint of a "Front-end only for MVP" approach, the structure prioritizes performance, local data management (IndexedDB), and adherence to the specified minimalist, modern aesthetic.

2. CORE DIRECTORY STRUCTURE

```
/tintly-app
|
├── /node_modules/          # (If using a build system like Vite/Webpack) Dependencies
├── /public/                # Static assets accessible directly by the browser
│   ├── index.html          # Main HTML entry point
│   ├── assets/             # Global static assets (fonts, general icons)
│   │   ├── fonts/          # (e.g., Inter-Regular.woff2, Satoshi-Medium.woff2)
│   │   └── icons/          # SVG icons (e.g., upload-icon.svg, settings-gear.svg)
│   └── favicon.ico
|
├── /src/                   # All primary application source code
│   ├── /app/               # Main application logic and structure
│   │   ├── App.tsx         # Root component (Handles routing/state context)
│   │   └── types.d.ts      # Global TypeScript interfaces/types
│   |
│   ├── /components/        # Reusable UI elements adhering to the aesthetic
│   │   ├── /layout/        # Structural components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── /ui/            # Atomic/primitive components
│   │   │   ├── Button.tsx      # Pill-shaped, pastel gradient, hover glow
│   │   │   ├── Card.tsx        # Glassmorphism base wrapper (used for items/outfits)
│   │   │   ├── Input.tsx
│   │   │   └── Swatch.tsx      # Color Swatch circle component
│   │   └── /molecules/     # Compound, functional components
│   │       ├── ItemUploadArea.tsx # Drag-and-drop zone
│   │       ├── ClothingItemCard.tsx # Individual uploaded item display
│   │       └── OutfitMatchCard.tsx  # Side-by-side outfit display (Core Output)
│   │
│   ├── /context/           # Global state management (Minimal, focused on wardrobe)
│   │   └── WardrobeContext.tsx # Handles interaction with Dexie DB
│   |
│   ├── /data/              # Local persistence and database interaction layer
│   │   ├── db.ts           # Dexie.js initialization and schema definition
│   │   └── schema.ts       # Detailed schema definition matching metadata requirements
│   |
│   ├── /features/          # Logical sections of the application
│   │   ├── /wardrobe/      # Inventory management view
│   │   │   └── WardrobeScreen.tsx
│   │   └── /matching/      # Outfit generation view
│   │       └── MatchScreen.tsx
│   │
│   ├── /hooks/             # Custom React Hooks
│   │   ├── useColorAnalysis.ts # Logic for color extraction/tone analysis (Client-side math)
│   │   └── useOutfitScorer.ts  # Logic for color harmony, contrast, and category scoring
│   |
│   ├── /styles/            # Styling definitions (CSS Modules, Styled Components, or Tailwind config)
│   │   ├── theme.css       # Variables for #0D0F11, accent colors, and typography settings
│   │   └── globals.css     # Global resets, font imports, and base dark mode setup
│   |
│   └── index.tsx           # Application entry point (Mounts context/router)
|
├── .gitignore
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Build tool configuration (Assumes Vite for speed)
```

3. DETAILED DIRECTORY EXPLANATIONS

3.1. `/public/`

*   **Purpose**: Holds files that do not need processing by the build tool (e.g., fonts, static images).
*   **`index.html`**: Must include necessary meta tags and link to the primary compiled JS bundle. Must establish the dark background color (#0D0F11) immediately via the body tag or a linked style tag to prevent FOUC (Flash of Unstyled Content) on load.

3.2. `/src/components/`

*   **Aesthetic Enforcement**: Every component here must strictly adhere to the Glassmorphism, soft shadow, rounded-2xl requirements.
*   **`/ui/`**: Contains the building blocks. For example, `Card.tsx` will contain the base styles for the transparent overlay (`#FFFFFF10` to `#FFFFFF15`) and the soft drop shadow.
*   **`OutfitMatchCard.tsx`**: This is the most complex component. It must handle the display of two images, extracted swatches, labels, the match score (utilizing soft gradient colors based on score), and the generated "vibe" sentence. Animation (gliding into view) is critical here.

3.3. `/src/data/` (Local Persistence Layer)

*   **Constraint Compliance**: Directly addresses the "IndexedDB via Dexie.js" requirement.
*   **`schema.ts`**: Must explicitly define the required metadata fields: `id`, `imageData` (Blob/Base64), `category`, `dominantColor`, `palette`, `tone`, `vibeAttributes`, `pattern`. This schema ensures fast retrieval for matching computations.

3.4. `/src/hooks/` (The "Smart" Logic)

*   **`useColorAnalysis.ts`**: Implements client-side image manipulation (via Canvas or browser APIs) to extract the dominant color and determine the `tone` (warm/cool/neutral) based on HSV analysis of the extracted colors.
*   **`useOutfitScorer.ts`**: Contains the core business logic:
    1.  Comparison against defined color harmony rules (Complementary, Analogous, Monochrome).
    2.  Application of Contrast Weighting and Saturation Balancing factors.
    3.  Category Compatibility check (e.g., preventing matching Shoes with another Shoes item).
    4.  Final 0-100 score calculation. This hook must run extremely fast (< 150ms).

3.5. `/src/styles/`

*   **Aesthetic Control**: Centralizes styling constants.
*   **`theme.css`**: Should define CSS variables for the Soft Dark Mode background, the specific accent colors (Soft Lavender, Muted Teal, etc.), and the font stack selections (e.g., `--font-body: Inter, sans-serif;`).

4. FRONT-END TECHNOLOGY STACK (Implied Structure)

Based on requirements (Client-side, Fast, Modern UI):

| Layer | Technology (Inferred) | Purpose in Structure |
| :--- | :--- | :--- |
| **Framework** | React / Next.js (Static Export) / Astro | Component architecture and rendering. |
| **Styling** | Tailwind CSS (Highly likely) or CSS Modules | Achieving complex, custom, minimalist styling rapidly. |
| **Data Storage** | Dexie.js | Abstraction layer over the required IndexedDB for reliable local image storage. |
| **Image Processing** | Canvas API / Color-Thief (if lightweight JS library is permitted) | Color extraction and basic palette generation. |
| **Animation** | Framer Motion | Implementing required micro-interactions (hover scale, gliding entrance) with smooth easing. |

## Database Schema Design
# SCHEMADESIGN: Tintly Database Structure (Local-First MVP)

## 1. Overview and Technology Rationale

This schema is designed for a local-first MVP utilizing **IndexedDB** (managed via Dexie.js) for robust storage of user clothing items and associated metadata. This approach satisfies the constraints of having **No Backend** for the MVP, ensuring fast performance and offline capability while adequately handling base64-encoded image strings.

The core focus is on storing item specifics necessary for the deterministic color harmony and vibe-matching algorithms.

## 2. Primary Data Model: `ClothingItem` Store

This object store will hold the user's entire digital wardrobe.

| Field Name | Data Type (IndexedDB) | Description | Constraints/Notes |
| :--- | :--- | :--- | :--- |
| **id** | String (Key) | Unique identifier for the item. | Primary Key (UUID recommended). |
| **imageData** | String (Base64) / Blob | The raw uploaded image file data. | Essential for display. Must be stored in IndexedDB due to size constraints of LocalStorage. |
| **category** | String | Garment type classification. | Required for Category Compatibility scoring. Examples: "Shirt", "Pants", "Dress", "Shoes", "Jacket", "Accessory". |
| **dominantColor** | String (Hex) | The primary color extracted from the image. | E.g., `#1A2B3C`. Crucial for color harmony calculations. |
| **palette** | Array of Strings (Hex) | A small set (3-5) of secondary, extracted colors. | Used for finer comparison during vibe matching. E.g., `["#FF0000", "#CCCCCC"]`. |
| **tone** | String | General thermal classification of the item's overall color. | Controlled vocabulary: "Warm", "Cool", "Neutral". Used for Saturation Balancing and contrast checks. |
| **vibeAttributes** | Array of Strings | User-selected or default tags describing the item's style. | E.g., ["minimal", "streetwear", "formal"]. Used for context-based filtering (e.g., casual vs. professional settings). |
| **pattern** | String | Visual texture/design of the fabric. | Controlled vocabulary: "Solid", "Striped", "Graphic", "Floral". Defaults to "Solid" if undetermined. |
| **uploadTimestamp** | Number (Timestamp) | When the item was added. | Useful for potential future sorting/recency features. |

## 3. Outfit Generation and Metadata Store (Future Expansion/Context)

While the MVP matching logic is deterministic and does not require saving complex outfits, a separate store will be necessary to handle the *context* of the match query, which might evolve if daily settings are introduced.

### 3.1. `UserSettings` Store (Singleton Object)

A single record store holding user preferences that influence matching logic (e.g., desired daily setting).

| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| **id** | String | Fixed ID (e.g., "user_config"). |
| **currentSetting** | String | The user's immediate need (e.g., "Casual", "Professional", "Evening"). |
| **defaultMode** | String | UI preference (e.g., "DarkMode"). |
| **lastVersion** | String | For tracking schema compatibility if updates are deployed. |

### 3.2. `OutfitSuggestion` Store (Optional/Post-MVP)

If the user frequently saves/shares specific successful matches, this store would log the successful pairings and scores.

| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| **id** | String (Key) | Unique ID for the saved outfit. |
| **itemIds** | Array of Strings | IDs of the two (or more) items included in the match. (References `ClothingItem.id`). |
| **matchScore** | Number | The final computed score (0-100) at the time of saving. |
| **vibeSentence** | String | The accompanying descriptive text. |
| **timestamp** | Number (Timestamp) | When the outfit was generated/saved. |

## 4. Relationship Mapping

The structure is fundamentally relational, although implemented within separate object stores connected by IDs (similar to a normalized SQL structure, but client-side).

**Relationship:** **One-to-Many** (User to Clothing Items)

*   `ClothingItem.id` is the Foreign Key within the `OutfitSuggestion` model.
*   The Matching Engine queries the `ClothingItem` store to fetch all items, filtered by the current user context (if any settings are active) or a random selection, and performs cross-product comparisons.

## 5. MVP Score Calculation Data Requirements

The matching logic relies heavily on the processed metadata:

1.  **Color Harmony:** Requires `dominantColor` and `palette` from both items being compared.
2.  **Contrast Weighting/Saturation Balancing:** Requires `dominantColor` and `tone` from both items.
3.  **Category Compatibility:** Requires `category` from both items. (E.g., A Shirt + Pants combination scores higher than Shirt + Shirt).

**Actionable Schema Requirement:** The extraction pipeline upon upload **must** populate `dominantColor`, `palette`, `tone`, and `category`.

## User Flow
# USER FLOW DOCUMENT: Tintly (v1.0 MVP)

## 1. Overview and Design Philosophy

This document outlines the core user flows for Tintly, focusing on rapid, aesthetically pleasing outfit generation using client-side color logic. The flow prioritizes speed, minimal input, and a "magical," high-fidelity visual output congruent with the soft, minimalist, tech-fashion aesthetic.

**Key Goal:** Enable users to instantly find aesthetically compatible outfits from their saved wardrobe with minimal cognitive load.

**Aesthetic Adherence:** All transitions will utilize smooth easing (`cubic-bezier(0.22, 1, 0.36, 1)`), soft micro-interactions, and the Dark Mode glassmorphic style described.

## 2. Core User Flow: Onboarding & Wardrobe Setup (Initial Use)

This flow assumes the user has never used the app or is starting a new session without existing local data.

| Step | Action (User) | System Response (Wireframe/Interaction) | Notes/Constraints |
| :--- | :--- | :--- | :--- |
| **2.1 Welcome & Initial Load** | Opens the application URL. | Displays a full-screen, softly animated splash screen (Logo + "Tintly"). Fades quickly to the main Dashboard/Wardrobe View. | Soft gradient background (#0D0F11 to #111315). Immediate visual calm. |
| **2.2 Wardrobe Prompt** | Views empty Wardrobe area. | A single, central, pill-shaped prompt appears: **[ + Add First Item ]**. Fades in with a soft slide-up. | Encourages immediate data input without feeling like a mandatory setup screen. |
| **2.3 Item Upload Initiation** | Clicks **[ + Add First Item ]**. | Opens the system file selector overlay. (If on mobile, opens camera/gallery prompt). | **Wireframe:** Full-screen modal overlay with blurred background. |
| **2.4 Image Selection & Pre-Processing** | Selects an image of a clothing item (e.g., a shirt). | Image immediately appears in a central preview card (rounded-2xl, soft shadow). **Interaction:** Drag-and-drop zone subtly glows upon hover/drop. | Performance Target: Image reading under 200ms. |
| **2.5 Data Input (Metadata Capture)** | User fills out required/optional metadata fields. | The Item Card expands slightly to reveal form fields:  * **Category** (Dropdown: Shirt, Pants, Jacket, Shoes, Accessory) * **Pattern** (Dropdown: Solid, Striped, Graphic, Floral) * **Vibe Tags** (Optional Text Input) | Category is essential for compatibility rules. Minimalist form design using the secondary font for clarity. |
| **2.6 Item Persistence & Confirmation** | Clicks **[ Save to Wardrobe ]** (accented button). | 1. Image data saved to IndexedDB (base64 string + metadata). 2. System performs initial color extraction (Dominant Color, Tone). 3. The new Item Card smoothly flies into the Wardrobe grid with staggered entry timing. 4. Prompt dismisses. | **Smart-Feeling:** A brief, subtle halo pulse (using a soft accent color) appears around the newly saved item card upon successful save, indicating successful processing. |
| **2.7 Loop** | Returns to the Wardrobe View. | User can now repeat Steps 2.3-2.6 to build their inventory or proceed to Outfit Generation (Section 3). | Wardrobe view displays item cards utilizing the aesthetic schema (glass panels, soft shadows). |

## 3. Core User Flow: Outfit Generation (Daily Use)

This is the primary, high-frequency flow, designed to be extremely fast and intuitive.

| Step | Action (User) | System Response (Wireframe/Interaction) | Notes/Constraints |
| :--- | :--- | :--- | :--- |
| **3.1 Initiate Generation** | User is on the Wardrobe or dedicated "Generate" view. Clicks a primary action button: **[ Generate Outfit ]** or **[ What should I wear? ]** | Screen transitions smoothly to the "Setting Selection" overlay. | **Wireframe:** Full-screen modal overlay. |
| **3.2 Setting Selection** | User selects the context for the outfit (since color logic depends on context). | User selects from pre-defined, styled buttons: * **Casual** (default) * **Work/Formal** * **Evening** * **Relaxed** | These settings map directly to internal filtering/weighting rules (e.g., Formal weighting favors monochrome/analogous, de-prioritizes high contrast patterns). |
| **3.3 Computation Trigger** | Clicks **[ Find Harmony ]** after selecting a setting. | The screen transitions to a centralized computation visualization. | **Performance Target:** Under 150ms for computation. |
| **3.4 Smart Processing Visualization** | Waits momentarily. | **Interaction:** A series of soft, overlapping color swatches representing the wardrobe are seen swirling and merging briefly within a central area (visualizing color theory logic being applied). Fades quickly into the results view. | No heavy loading bars. Use ephemeral, aesthetic motion to convey speed and intelligence. |
| **3.5 Results Display (Initial View)** | Views the generated outfits. | The screen defaults to displaying the **Top Ranked Outfit** prominently in a **Match Card Layout**. | **Wireframe:** Two item cards (Top + Bottom) displayed side-by-side or slightly overlapping for depth. |
| **3.6 Match Card Detail Rendering** | Observes the Top Outfit. | Each item card displays: * Original Uploaded Image (with subtle boost/glow) * Small Extracted Color Swatch (Accent color for high scores) * Garment Label (e.g., "Jacket") * **Match Score** (e.g., 92/100, highlighted in accent color if >85) * **Vibe Sentence** (e.g., "Clean complementary contrast — modern and sharp.") | **Aesthetics:** Glassmorphism overlay on item images, scores rendered in bold weight 700. |
| **3.7 Reviewing Alternatives** | Scrolls or swipes horizontally/vertically. | Subsequent alternative outfits smoothly glide into the view, staggering slightly behind the first result. | Encourages browsing multiple options without leaving the main result screen. |
| **3.8 Selection Confirmation (Exit Flow)** | Finds a satisfactory outfit and clicks the card for confirmation. | The chosen Match Card expands slightly, and a final call-to-action appears: **[ I'll wear this! ]** | This action dismisses the generation view and returns the user to the Wardrobe, leaving the chosen outfit highlighted momentarily. |

## 4. Item Management Flow (Editing/Deleting)

This flow ensures users can maintain their inventory easily.

| Step | Action (User) | System Response (Wireframe/Interaction) | Notes/Constraints |
| :--- | :--- | :--- | :--- |
| **4.1 Access Item Detail** | Taps on any existing item card in the Wardrobe View. | Opens a dedicated Item Detail View (similar to Step 2.5, but read-only initially). | Soft slide-up animation. |
| **4.2 Enter Edit Mode** | Clicks a small, subtle **[ Edit ]** icon (e.g., pencil icon) in the header. | Input fields become editable. Color analysis results (Dominant Color) are displayed non-editable below the image. | |
| **4.3 Update Metadata** | Changes the Category or Pattern. | System logs changes internally, awaiting save. | |
| **4.4 Save Changes** | Clicks **[ Update Item ]**. | Data is updated in IndexedDB. The Item Card in the Wardrobe view pulses once to acknowledge the change. | If color rules are triggered by the change, the next Outfit Generation run will use the new values instantly. |
| **4.5 Deletion Action** | Clicks a discrete **[ Delete Item ]** button (usually in the footer of the detail view). | Prompts a confirmation overlay: "Are you sure you want to remove [Item Label]? This cannot be undone." | **Confirmation Interaction:** The delete button is styled subtly in red/low opacity to prevent accidental taps. User must confirm via **[ Yes, Remove ]**. |
| **4.6 Deletion Confirmation** | Confirms deletion. | Item card smoothly fades out and shrinks from the Wardrobe grid. IndexedDB record is deleted. | Fast, clean removal. |

## 5. Interaction Patterns Summary

| Pattern | Location | Behavior | Aesthetic Goal |
| :--- | :--- | :--- | :--- |
| **Glassmorphism Cards** | All Item and Match Cards | Transparent overlay (#FFFFFF10–15) with minimal blur, soft white 1px edge highlight. | Premium, layered, clean separation. |
| **Soft Hover Scale** | All actionable buttons/cards | Scale up by 1.02–1.04 with smooth easing upon pointer entry. | Tactile feedback, high responsiveness. |
| **Staggered Entry** | Wardrobe Load, Results Load | Elements appear sequentially with a 50–100ms delay between each item. | Conveys computation/intelligence organizing elements elegantly. |
| **Accent Glow Halo** | Match Score > 85 | A thin, colored (pastel accent) ring pulses gently around the entire Match Card. | Visual reward for high compatibility. |
| **Color Swatch Pulse** | Saved Item Card | The small extracted color swatch subtly expands and contracts (pulsates) once per second. | Indicates data richness and processing readiness. |

## Styling Guidelines
# Tintly Styling Guidelines Document

## 1. Design Philosophy & Aesthetic Mood

Tintly is designed to feel like a sophisticated, quiet digital moodboard—a blend of high-end digital aesthetics (Apple/Notion) and visual inspiration (Pinterest). The primary goal is to convey intelligence and aesthetic alignment without resorting to corporate stiffness or digital clutter.

**Core Aesthetic:** Minimalist, Soft, Quiet, Color-Driven, Modern Premium.

*   **Clarity:** Clean lines, generous spacing, and extreme reduction of unnecessary UI elements.
*   **Weight:** Lightweight and airy feel, prioritizing visual breathing room.
*   **Focus:** The uploaded clothing imagery and the resulting color harmony must take center stage.
*   **Vibe:** "Smart-feeling" technology that operates like an intuitive personal stylist, not a database query tool.

## 2. Color Palette

The system operates primarily in a **Soft Dark Mode**, chosen to make the extracted clothing colors and accent highlights truly pop without overwhelming the user.

### 2.1. Primary Backgrounds & Surfaces

| Element | Hex Code | Description |
| :--- | :--- | :--- |
| Primary Background | `#0D0F11` | Deep charcoal; slightly warm base for the dark mode. |
| Secondary Background | `#111315` | Used for subtle layering or surrounding elements. |
| Surface Cards (Glassmorphism) | `#FFFFFF10` to `#FFFFFF15` | Transparent overlays (low opacity white) providing definition without heavy borders. |
| Subtle Edge Highlight | N/A | 1px white/grey line at 10–15% opacity for card definition. |

### 2.2. Accent Colors (Harmony & Feedback)

Accents are used sparingly—only for critical feedback, color swatches, scores, and interactive states. They should feel curated and slightly muted.

| Use Case | Color Name | Hex Code |
| :--- | :--- | :--- |
| Primary Accent | Soft Lavender | `#B7A9FF` |
| Secondary Accent 1 | Muted Teal | `#86D1C8` |
| Secondary Accent 2 | Peach/Coral | `#FFB5A7` |
| Secondary Accent 3 | Muted Lime | `#C6F68D` |
| Secondary Accent 4 | Sky Blue | `#A7DFFF` |

**Application:** Accents are crucial for the color swatches displayed next to the item cards and for highlighting highly compatible match scores (e.g., >90).

## 3. Typography

We employ a two-font system to balance technical clarity with subtle editorial flair.

### 3.1. Font Selection

| Role | Recommended Fonts | Rationale |
| :--- | :--- | :--- |
| **Main Font (UI/Body)** | Inter, Satoshi, Manrope, Geist Sans | Clean, highly legible sans-serif optimized for screens. Satoshi/Manrope preferred for their modern, clean geometry. |
| **Secondary Font (Vibe Accent)** | Outfit, Space Grotesk, Mona Sans | Condensed or slightly unusual sans-serifs for subtle headings or decorative callouts to add a tech-fashion edge. |

### 3.2. Weight Usage (Main Font)

| Weight | Usage |
| :--- | :--- |
| 400 (Regular) | Body text, descriptions. |
| 500 (Medium) | Garment labels (Shirt, Pants), small informational text. |
| 600 (Semi-Bold) | Primary headings, Match Score numbers. |
| 700 (Bold) | Used rarely, only for urgent emphasis or critical calls to action (avoid if possible). |

## 4. Component Styling

Consistency is achieved through soft shapes, transparency, and subtle depth cues.

### 4.1. Cards (Item & Match Output)

These form the core visual unit for displaying clothing and outfit suggestions.

*   **Shape:** Heavily rounded corners (`rounded-2xl`).
*   **Background:** Glassmorphism panels utilizing the transparent white overlay (`#FFFFFF10` to `#FFFFFF15`).
*   **Borders:** Extremely subtle 1px light border (10–15% opacity white) for structure.
*   **Shadows:** Soft, diffused drop shadows used solely to provide depth layering between components. Shadows must not be hard or dark.

### 4.2. Imagery Treatment (Uploaded Clothes)

The focus is on presenting the garment cleanly and slightly elevated.

*   **Corners:** Moderate rounding (`8px`).
*   **Shadow:** Soft drop shadow for basic depth.
*   **Premium Effect:** A faint, internal white glow (if implemented via CSS filters) to highlight saturation within the clothing area.
*   **Color Emphasis:** Subtle, client-side saturation boost on the source image data to ensure the extracted color swatch is representative and vibrant against the dark background.

### 4.3. Buttons

Buttons must be minimal and interact smoothly.

*   **Shape:** Pill-shaped (`rounded-full`).
*   **Background:** Subtle pastel gradient derived from the accent colors, or a light grey transparent fill.
*   **Interactions:** Hover state must trigger a soft, expanding glow effect. Subtle scale change (`1.02` to `1.04`) on click/press via Framer Motion.

### 4.4. Color Swatches

These display the extracted colors used in the harmony calculation.

*   **Shape/Size:** Small circles (16–20px diameter).
*   **Styling:** Thin border around the circle, potentially a tiny, controlled glow effect based on the color’s contribution to the match score.
*   **Layout:** Displayed horizontally in a strip below the item label.

## 5. Animation & Interaction Style

Animations must support the "smart-feeling" and calm aesthetic. They are the connective tissue that makes the app feel magical.

### 5.1. Easing and Motion Profile

*   **Easing:** Utilize a custom, smooth, and springy ease for nearly all motion: `cubic-bezier(0.22, 1, 0.36, 1)`.
*   **Movement Quality:** Everything should feel deliberate, weighted, and elegantly delayed. Avoid rapid or chaotic movement.

### 5.2. Specific Microinteractions

*   **Load/Entry:** Soft slide-up motion (10–14px vertical shift) combined with a gentle fade-in on component arrival (staggered/cascading entry).
*   **Hover:** Subtle scale-up (1–2%).
*   **Match Score Feedback:** Color swatch pulsation or a soft pulse/glow ring appears around cards achieving a high score (>85).
*   **Output Display:** Matched outfit cards should glide smoothly into place next to each other.

## 6. \"Smart-Feeling\" Design Language

Intelligence must be communicated visually through aesthetic refinement, not through data visualization.

**Visualizing Intelligence:**

1.  **Harmony Glow:** Highly compatible outfits (high Match Score) should receive an animated, soft color halo utilizing the primary accent color.
2.  **Dynamic Shadowing:** Subtle, slow-changing shadows on cards that imply depth or internal processing.
3.  **Contextual Vibe:** The system’s output (the "vibe sentence") must reflect the color logic used (e.g., mentioning "complementary contrast" or "analogous harmony").

**What to Avoid:**

*   Sharp, neon highlights typical of generic "AI."
*   Overly technical charts, graphs, or complex data readouts.
*   Heavy border treatments or solid color fills dominating the screen.

## 7. UI Tone and Copy Aesthetic

The language used in feedback sentences and labels must be warm, knowledgeable, and concise.

*   **Tone:** Friendly, stylish, intuitive, human.
*   **Length:** Short, vibe-based summaries.
*   **Examples of Acceptable Copy:**
    *   “Balanced contrast — clean, modern look.”
    *   “Neutral anchor with a bright pop.”
    *   “These tones play well together.”
    *   “Strong monochromatic feel with excellent saturation balance.”

## 8. Contextual Styling Logic (Color Harmony Rules)

While the MVP uses fixed deterministic logic (color harmony rules), the visual display must adapt slightly based on the *type* of harmony detected, aligning with user-selected contexts (Casual, Professional, etc.).

| Harmony Type | Visual Implication | Example Vibe Sentence |
| :--- | :--- | :--- |
| **Complementary** | Higher perceived contrast, use slightly brighter accent on the score highlight. | "Vibrant complementary contrast — bold and energetic." |
| **Analogous** | Smoother transitions, perhaps utilizing a slightly wider grouping of accent colors. | "Harmonious analogous flow — soft and unified." |
| **Monochrome** | Minimal accent use; focus is on textural/tonal differences. | "Subtle tonal variation — deeply cohesive look." |

## 9. Performance and Experience Constraints

The styling must support the extreme performance requirements. The visual smoothness relies on fast rendering.

*   **Instant Feedback:** Because computations are under 150ms, the UI must react instantly to present the results with the defined soft animations, reinforcing the feeling of speed and intelligence.
*   **Local-First Look:** The reliance on local data storage (IndexedDB) means the application must load quickly and feel responsive, as there are no network latency delays to mask slow rendering.
