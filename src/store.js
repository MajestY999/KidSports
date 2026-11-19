import { reactive, watch } from "vue";

const STORAGE_KEY = "kidsconnect_enrollments";

let initial = [];
try {
  initial = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
} catch {
  initial = [];
}

export const store = reactive({
  enrollments: initial,
});

watch(
  () => store.enrollments,
  (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true },
);

export function addEnrollment(enrollment) {
  store.enrollments.push({
    ...enrollment,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  });
}

export function isEnrolled(sectionId) {
  return store.enrollments.some((e) => e.sectionId === sectionId);
}
