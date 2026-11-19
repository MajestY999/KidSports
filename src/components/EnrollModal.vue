<template>
  <teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div class="modal card">
        <button class="close" @click="close" aria-label="Закрыть">×</button>

        <template v-if="!done">
          <h3 class="modal-title">Запись в секцию</h3>
          <p class="modal-sub">{{ section.title }} - {{ section.org }}</p>

          <form class="form" @submit.prevent="submit">
            <label>
              ФИО ребёнка
              <input v-model.trim="form.childName" required placeholder="Иванов Иван Иванович" />
            </label>
            <label>
              Возраст ребёнка
              <input
                v-model.number="form.childAge"
                type="number"
                :min="section.ageMin"
                :max="section.ageMax"
                required
                :placeholder="`${section.ageMin}-${section.ageMax}`"
              />
            </label>
            <label>
              ФИО родителя
              <input v-model.trim="form.parentName" required placeholder="Иванова Мария Петровна" />
            </label>
            <label>
              Телефон
              <input
                v-model.trim="form.phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                pattern="[+0-9()\-\s]{10,18}"
              />
            </label>
            <button type="submit" class="btn btn-primary submit">Отправить заявку</button>
          </form>
        </template>

        <template v-else>
          <div class="success">
            <div class="check-circle">✓</div>
            <h3 class="modal-title">Заявка отправлена</h3>
            <p class="modal-sub">
              Мы передали заявку в {{ section.org }}. С вами свяжутся для подтверждения записи.
            </p>
            <button class="btn btn-primary submit" @click="close">Понятно</button>
          </div>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { addEnrollment } from '../store'

const props = defineProps({
  modelValue: Boolean,
  section: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue', 'enrolled'])

const done = ref(false)
const form = reactive({ childName: '', childAge: null, parentName: '', phone: '' })

watch(
  () => props.modelValue,
  (v) => {
    if (v) done.value = false
  }
)

function close() {
  emit('update:modelValue', false)
}

function submit() {
  addEnrollment({ sectionId: props.section.id, sectionTitle: props.section.title, ...form })
  done.value = true
  emit('enrolled')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal {
  width: 100%;
  max-width: 460px;
  padding: 32px;
  position: relative;
}

.close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  color: var(--text);
  line-height: 1;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 6px;
}

.modal-sub {
  font-size: 14px;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.form input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
}

.form input:focus {
  outline: 2px solid var(--primary);
  outline-offset: -1px;
}

.submit {
  margin-top: 6px;
  font-size: 16px;
}

.success {
  text-align: center;
}

.check-circle {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--white);
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
