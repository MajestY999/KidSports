<template>
  <article class="card section-card">
    <div class="thumb">
      <img v-if="section.image" :src="section.image" :alt="section.title" />
      <svg v-else viewBox="0 0 24 24" class="thumb-icon" aria-hidden="true">
        <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5L19 18H5l3.5-4.5z"/>
      </svg>
    </div>

    <div class="body">
      <div class="top-row">
        <h3 class="title">
          {{ section.title }}
          <span v-if="section.locationNote" class="loc-note">({{ section.locationNote }})</span>
        </h3>
        <div class="badges">
          <span v-if="section.firstFree" class="badge badge-outline">Первое бесплатно</span>
          <span class="badge">{{ priceLabel }}</span>
          <span v-if="section.price > 0" class="badge">{{ section.priceNote }}</span>
        </div>
      </div>

      <div class="tag">#{{ section.subcategory }}</div>

      <ul class="meta">
        <li><AppIcon name="person" /> {{ section.ageMin }}-{{ section.ageMax }} лет</li>
        <li><AppIcon name="building" /> {{ section.address }}</li>
        <li><AppIcon name="pin" /> {{ section.org }}</li>
      </ul>

      <div class="schedule-row">
        <span class="days">{{ section.days }}</span>
        <span v-for="t in section.times" :key="t" class="time-chip">{{ t }}</span>
        <router-link class="btn btn-primary more" :to="`/section/${section.id}`">Подробнее</router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({ section: { type: Object, required: true } })

const priceLabel = computed(() =>
  props.section.price > 0 ? `${props.section.price} руб.` : 'Бесплатно'
)
</script>

<style scoped>
.section-card {
  display: flex;
  gap: 24px;
  padding: 20px;
}

.thumb {
  width: 170px;
  height: 140px;
  flex: none;
  border-radius: var(--radius);
  background: var(--placeholder);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-icon {
  width: 56px;
  height: 56px;
  fill: #8f8f8f;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.loc-note {
  font-weight: 400;
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tag {
  color: var(--accent);
  font-size: 14px;
}

.meta {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 16px;
}

.meta li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.schedule-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
}

.days {
  font-size: 16px;
  font-weight: 500;
}

.days::before {
  content: '●';
  color: var(--primary);
  font-size: 10px;
  margin-right: 8px;
  vertical-align: 2px;
}

.more {
  margin-left: auto;
}

@media (max-width: 720px) {
  .section-card {
    flex-direction: column;
  }
  .thumb {
    width: 100%;
    height: 160px;
  }
  .top-row {
    flex-direction: column;
  }
  .badges {
    justify-content: flex-start;
  }
  .more {
    margin-left: 0;
  }
}
</style>
