<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('stem', 'ASC').all()
)

const items = computed(() =>
  (posts.value ?? []).map((entry) => {
    const stem = entry.stem || ''
    const slug = stem.split('/').pop() ?? stem
    return {
      slug,
      title: entry.content?.title ?? entry.seo?.title ?? slug,
      description: entry.seo?.description ?? '',
      preview: (entry.content?.body ?? '').split(/\n{2,}/)[0]?.slice(0, 180) ?? ''
    }
  })
)

useSeoMeta({
  title: 'Blog posts',
  description: 'Browse stress test blog entries loaded from Nuxt Content data files.'
})
</script>

<template>
  <section class="blog">
    <header class="blog-header">
      <h1>Blog posts</h1>
      <p>Nuxt Content data files rendered as part of a stress test.</p>
    </header>

    <ul v-if="items.length" class="post-list">
      <li v-for="item in items" :key="item.slug" class="post-item">
        <NuxtLink :to="`/blog/${item.slug}`" class="post-title">{{ item.title }}</NuxtLink>
        <p v-if="item.description" class="post-description">{{ item.description }}</p>
        <p v-else-if="item.preview" class="post-preview">{{ item.preview }}…</p>
      </li>
    </ul>
    <p v-else class="empty">No posts found. Add YAML files under <code>content/blog</code>.</p>
  </section>
</template>

<style scoped>
.blog {
  display: grid;
  gap: 2rem;
}

.blog-header {
  display: grid;
  gap: 0.75rem;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.post-item {
  display: grid;
  gap: 0.5rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

.post-title:hover {
  text-decoration: underline;
}

.post-description,
.post-preview {
  margin: 0;
  color: #4b5563;
}

.empty {
  color: #6b7280;
}
</style>
