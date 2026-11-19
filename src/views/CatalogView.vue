<template>
  <div class="container page">
    <div class="toolbar card">
      <div class="search">
        <AppIcon name="search" class="search-icon" />
        <input v-model.trim="query" type="search" placeholder="Поиск" aria-label="Поиск по кружкам" />
      </div>

      <nav class="tabs">
        <button
          v-for="t in tabs"
          :key="t.value"
          class="tab"
          :class="{ active: tab === t.value }"
          @click="tab = t.value"
        >
          {{ t.label }}
        </button>
      </nav>

      <button class="btn btn-ghost map-btn" @click="openMap()">
        На карте
        <AppIcon name="pin" />
      </button>
    </div>

    <div class="layout">
      <main class="results">
        <template v-if="grouped.length">
          <section v-for="g in grouped" :key="g.category" class="group">
            <h2 class="group-title">{{ g.category }}</h2>
            <SectionCard v-for="s in g.items" :key="s.id" :section="s" />
          </section>
        </template>
        <div v-else class="empty card">
          <p>По вашему запросу ничего не найдено.</p>
          <button class="btn btn-primary" @click="resetAll">Сбросить фильтры</button>
        </div>
      </main>

      <FiltersSidebar
        v-model:age="age"
        v-model:genders="genders"
        v-model:selected="selectedCats"
        v-model:selected-sub="selectedSub"
        @reset="resetAll"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import SectionCard from '../components/SectionCard.vue'
import FiltersSidebar from '../components/FiltersSidebar.vue'
import { sections, ageRanges } from '../data/sections'

const tabs = [
  { value: 'all', label: 'Все' },
  { value: 'paid', label: 'Платные' },
  { value: 'free', label: 'Бесплатные' }
]

const query = ref('')
const tab = ref('all')
const age = ref('any')
const genders = ref([])
const selectedCats = ref([])
const selectedSub = ref('')

const filtered = computed(() =>
  sections.filter((s) => {
    if (tab.value === 'paid' && s.price === 0) return false
    if (tab.value === 'free' && s.price > 0) return false

    if (age.value !== 'any') {
      const r = ageRanges.find((x) => x.value === age.value)
      if (r && (s.ageMax < r.min || s.ageMin > r.max)) return false
    }

    if (genders.value.length === 1) {
      const g = genders.value[0]
      if (s.gender !== 'any' && s.gender !== g) return false
    }

    if (selectedCats.value.length && !selectedCats.value.includes(s.category)) return false
    if (selectedSub.value && s.subcategory !== selectedSub.value) return false

    if (query.value) {
      const q = query.value.toLowerCase()
      const hay = `${s.title} ${s.subcategory} ${s.org} ${s.address} ${s.category}`.toLowerCase()
      if (!hay.includes(q)) return false
    }

    return true
  })
)

const grouped = computed(() => {
  const order = []
  const map = new Map()
  for (const s of filtered.value) {
    if (!map.has(s.category)) {
      map.set(s.category, [])
      order.push(s.category)
    }
    map.get(s.category).push(s)
  }
  return order.map((c) => ({ category: c, items: map.get(c) }))
})

function openMap(address) {
  const q = address || 'Иркутск'
  window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(q)}`, '_blank', 'noopener')
}

function resetAll() {
  query.value = ''
  tab.value = 'all'
  age.value = 'any'
  genders.value = []
  selectedCats.value = []
  selectedSub.value = ''
}
</script>

<style scoped>
.page {
  padding-top: 20px;
  padding-bottom: 60px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 20px;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
  flex: 0 0 280px;
}

.search-icon {
  width: 16px;
  height: 16px;
}

.search input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.search input::placeholder {
  color: var(--accent);
}

.tabs {
  display: flex;
  gap: 20px;
}

.tab {
  font-size: 16px;
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom-color: var(--primary);
  font-weight: 600;
  color: var(--primary);
}

.map-btn {
  margin-left: auto;
  font-size: 16px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  margin-top: 20px;
  align-items: start;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.group-title {
  font-size: 24px;
  font-weight: 600;
}

.empty {
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  font-size: 16px;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .toolbar {
    flex-wrap: wrap;
  }
  .search {
    flex: 1 1 100%;
  }
  .map-btn {
    margin-left: 0;
  }
}
</style>
