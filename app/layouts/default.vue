<template>
  <div class="app-shell">
    <header class="app-header">
      <NuxtLink to="/" class="brand">Content Blog</NuxtLink>
    </header>
    <main class="app-main">
      <slot />
    </main>
    <footer class="app-footer">
      Built with Nuxt Content
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem 3rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
