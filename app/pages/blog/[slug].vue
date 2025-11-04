<script setup lang="ts">
const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam

const stem = computed(() => `blog/${slug}`)

const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').where('stem', '=', stem.value).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const articleContent = computed(() => article.value?.content)
const articleSeo = computed(() => article.value?.seo)

const articleTitle = computed(
  () => articleContent.value?.title ?? articleSeo.value?.title ?? slug
)

const articleDescription = computed(
  () => articleSeo.value?.description ?? articleContent.value?.description ?? ''
)

const bodyParagraphs = computed(() => {
  const body = articleContent.value?.body
  if (!body) return []
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
})

useSeoMeta({
  title: () => articleSeo.value?.title ?? articleTitle.value,
  description: () => (articleSeo.value?.description ?? articleDescription.value) || undefined
})
</script>

<template>
  <article class="article">
    <header class="article-header">
      <h1>{{ articleTitle }}</h1>
      <p v-if="articleDescription" class="article-description">
        {{ articleDescription }}
      </p>
    </header>

    <div v-if="bodyParagraphs.length" class="article-body">
      <p v-for="paragraph in bodyParagraphs" :key="paragraph">{{ paragraph }}</p>
    </div>
    <p v-else class="article-empty">No content available yet.</p>
  </article>
</template>

<style scoped>
.article {
  display: grid;
  gap: 1.5rem;
}

.article-header {
  display: grid;
  gap: 0.75rem;
}

.article-description {
  margin: 0;
  color: #4b5563;
}

.article-body {
  line-height: 1.75;
  display: grid;
  gap: 1rem;
}

.article-empty {
  color: #6b7280;
}
</style>
