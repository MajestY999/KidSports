<template>
  <div class="container page" v-if="section">
    <div class="toolbar card">
      <router-link to="/" class="btn btn-ghost">
        <AppIcon name="back" />
        Назад
      </router-link>
      <button class="btn btn-ghost map-btn" @click="openMap">
        На карте
        <AppIcon name="pin" />
      </button>
    </div>

    <h1 class="page-title">{{ section.title }}<span v-if="section.locationNote"> ({{ section.locationNote }})</span></h1>

    <section class="card hero">
      <div class="hero-img">
        <img v-if="section.image" :src="section.image" :alt="section.title" />
        <svg v-else viewBox="0 0 24 24" class="hero-placeholder" aria-hidden="true">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5L19 18H5l3.5-4.5z"/>
        </svg>
      </div>

      <div class="hero-body">
        <div class="hero-badges">
          <span class="badge badge-outline">Набор открыт</span>
          <span class="badge">{{ priceLabel }}</span>
        </div>
        <ul class="hero-meta">
          <li><AppIcon name="person" /> {{ section.ageMin }}-{{ section.ageMax }} лет</li>
          <li><AppIcon name="building" /> {{ section.address }}</li>
          <li><AppIcon name="pin" /> {{ section.org }}</li>
        </ul>
      </div>

      <div class="hero-action">
        <button v-if="!enrolled" class="btn btn-primary enroll" @click="showModal = true">Записаться</button>
        <div v-else class="enrolled-note">
          <span class="badge">Вы записаны</span>
          <button class="btn btn-ghost" @click="showModal = true">Записать ещё одного ребёнка</button>
        </div>
      </div>
    </section>

    <section class="card block">
      <div class="columns">
        <div class="col">
          <h2 class="block-title">Группы</h2>
          <div v-for="(g, i) in section.groups" :key="i" class="group-item">
            <div class="group-name">{{ g.name }}</div>
            <ul class="group-meta">
              <li><AppIcon name="cap" /> {{ g.coach }}</li>
              <li><AppIcon name="users" /> {{ g.filled }} из {{ g.capacity }}</li>
              <li><AppIcon name="clock" /> {{ g.duration }}</li>
            </ul>
          </div>
        </div>

        <div class="col">
          <h2 class="block-title">Расписание занятий</h2>
          <div class="schedule-row" v-for="(row, i) in scheduleRows" :key="i">
            <AppIcon name="clock" />
            <span class="days">{{ row.days }}</span>
            <span v-for="t in row.times" :key="t" class="time-chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="card block">
      <h2 class="block-title">Описание</h2>
      <p class="description">{{ section.description }}</p>
    </section>

    <section class="card block">
      <div class="accordion-head" @click="programOpen = !programOpen">
        <h2 class="block-title">Содержание программы</h2>
        <AppIcon name="chevron" class="chev" :class="{ open: programOpen }" />
      </div>
      <template v-if="programOpen">
        <div v-for="(p, i) in section.program" :key="i" class="level">
          <button class="level-head" @click="toggleLevel(i)">
            <span>{{ p.title }}</span>
            <AppIcon name="chevron" class="chev" :class="{ open: openLevels.has(i) }" />
          </button>
          <p v-if="openLevels.has(i)" class="level-text">{{ p.text }}</p>
        </div>
      </template>
    </section>

    <EnrollModal v-model="showModal" :section="section" @enrolled="enrolled = true" />
  </div>

  <div class="container page" v-else>
    <div class="card notfound">
      <p>Секция не найдена.</p>
      <router-link to="/" class="btn btn-primary">Вернуться в каталог</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import EnrollModal from '../components/EnrollModal.vue'
import { sections } from '../data/sections'
import { isEnrolled } from '../store'

const props = defineProps({ id: { type: String, required: true } })

const section = computed(() => sections.find((s) => s.id === Number(props.id)))

const showModal = ref(false)
const enrolled = ref(section.value ? isEnrolled(section.value.id) : false)
const programOpen = ref(true)
const openLevels = reactive(new Set([0]))

const priceLabel = computed(() =>
  section.value && section.value.price > 0 ? `${section.value.price} руб.` : 'Бесплатно'
)

const scheduleRows = computed(() => {
  if (!section.value) return []
  return [{ days: section.value.days, times: section.value.times }, ...section.value.scheduleExtra]
})

function toggleLevel(i) {
  if (openLevels.has(i)) openLevels.delete(i)
  else openLevels.add(i)
}

function openMap() {
  const q = section.value ? `${section.value.address} ${section.value.org}` : 'Иркутск'
  window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(q)}`, '_blank', 'noopener')
}
</script>

<style scoped>
.page {
  padding-top: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 14px 20px;
}

.toolbar .btn {
  font-size: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-dark);
  padding: 0 10px;
}

.hero {
  display: flex;
  gap: 24px;
  padding: 24px;
  align-items: flex-start;
}

.hero-img {
  width: 200px;
  height: 200px;
  flex: none;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--placeholder);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-placeholder {
  width: 64px;
  height: 64px;
  fill: #8f8f8f;
}

.hero-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hero-meta {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.hero-meta li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-action {
  display: flex;
  align-items: flex-end;
  align-self: stretch;
}

.enroll {
  font-size: 16px;
  font-weight: 600;
  padding: 12px 32px;
}

.enrolled-note {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.block {
  padding: 24px;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.block-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.group-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.group-meta {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group-meta li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.schedule-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.days {
  font-size: 16px;
  font-weight: 500;
}

.description {
  max-width: 900px;
}

.accordion-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.accordion-head .block-title {
  margin-bottom: 0;
}

.chev {
  transition: transform 0.2s ease;
}

.chev.open {
  transform: rotate(180deg);
}

.level {
  margin-top: 16px;
}

.level-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary);
  padding: 8px 0;
}

.level-text {
  white-space: pre-line;
  padding: 8px 0 8px 12px;
  border-left: 2px solid var(--chip);
}

.notfound {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  font-size: 16px;
}

@media (max-width: 820px) {
  .hero {
    flex-direction: column;
  }
  .hero-img {
    width: 100%;
    height: 220px;
  }
  .columns {
    grid-template-columns: 1fr;
  }
  .hero-action {
    align-self: flex-start;
  }
}
</style>
