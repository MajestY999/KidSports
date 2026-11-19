<template>
  <aside class="card filters">
    <h2 class="filters-title">Фильтры</h2>

    <div class="block">
      <div class="block-title">Возраст</div>
      <select class="age-select" :value="age" @change="$emit('update:age', $event.target.value)">
        <option v-for="r in ageRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
      </select>
    </div>

    <div class="block">
      <div class="block-title">Пол</div>
      <label class="check">
        <input
          type="checkbox"
          :checked="genders.includes('male')"
          @change="toggleGender('male')"
        />
        Мужской
      </label>
      <label class="check">
        <input
          type="checkbox"
          :checked="genders.includes('female')"
          @change="toggleGender('female')"
        />
        Женский
      </label>
    </div>

    <div class="block">
      <div class="block-title">Каталог</div>
      <ul class="catalog">
        <li v-for="cat in categoriesWithCounts" :key="cat.name">
          <button class="cat-row" @click="toggle(cat.name)">
            <span :class="{ active: selected.includes(cat.name) }">{{ cat.name }}</span>
            <span v-if="cat.count" class="count">{{ cat.count }}</span>
            <AppIcon
              v-if="cat.children.length"
              name="chevron"
              class="chev"
              :class="{ open: open.has(cat.name) }"
            />
          </button>
          <ul v-if="open.has(cat.name)" class="subcatalog">
            <li v-for="sub in cat.children" :key="sub.name">
              <button class="sub-row" @click="toggleSub(sub.name)">
                <span class="bullet">•</span>
                <span :class="{ active: selectedSub === sub.name }">{{ sub.name }}</span>
                <span v-if="sub.count" class="count">{{ sub.count }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <button v-if="hasActive" class="reset" @click="$emit('reset')">Сбросить фильтры</button>
  </aside>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { categories, sections, ageRanges } from '../data/sections'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  age: { type: String, default: 'any' },
  genders: { type: Array, default: () => [] },
  selected: { type: Array, default: () => [] },
  selectedSub: { type: String, default: '' }
})

const emit = defineEmits(['update:age', 'update:genders', 'update:selected', 'update:selectedSub', 'reset'])

const open = reactive(new Set(['Силовой спорт', 'Единоборства', 'Лёгкая атлетика и гимнастика']))

const categoriesWithCounts = computed(() =>
  categories.map((c) => ({
    ...c,
    count: sections.filter((s) => s.category === c.name).length,
    children: c.children.map((sub) => ({
      name: sub,
      count: sections.filter((s) => s.subcategory === sub).length
    }))
  }))
)

function toggleGender(g) {
  const next = props.genders.includes(g)
    ? props.genders.filter((x) => x !== g)
    : [...props.genders, g]
  emit('update:genders', next)
}

function toggle(name) {
  if (open.has(name)) open.delete(name)
  else open.add(name)
  const next = props.selected.includes(name)
    ? props.selected.filter((x) => x !== name)
    : [name]
  emit('update:selected', next)
  emit('update:selectedSub', '')
}

function toggleSub(name) {
  emit('update:selectedSub', props.selectedSub === name ? '' : name)
}

const hasActive = computed(
  () =>
    props.age !== 'any' ||
    props.genders.length > 0 ||
    props.selected.length > 0 ||
    props.selectedSub !== ''
)
</script>

<style scoped>
.filters {
  padding: 24px;
  align-self: flex-start;
  position: sticky;
  top: 20px;
}

.filters-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.block {
  margin-bottom: 24px;
}

.block-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.age-select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  background: var(--white);
}

.check {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

.check input {
  accent-color: var(--primary);
  width: 16px;
  height: 16px;
}

.catalog {
  list-style: none;
}

.cat-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  text-align: left;
}

.cat-row:hover,
.sub-row:hover {
  color: var(--primary);
}

.active {
  color: var(--primary);
  font-weight: 600;
}

.count {
  color: var(--primary);
}

.chev {
  width: 14px;
  height: 14px;
  margin-left: auto;
  transition: transform 0.2s ease;
}

.chev.open {
  transform: rotate(180deg);
}

.subcatalog {
  list-style: none;
  padding-left: 10px;
}

.sub-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 3px 0;
  font-size: 14px;
  text-align: left;
}

.bullet {
  font-size: 20px;
  line-height: 1;
}

.reset {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  color: var(--primary);
  font-size: 14px;
}

.reset:hover {
  background: var(--primary);
  color: var(--white);
}
</style>
