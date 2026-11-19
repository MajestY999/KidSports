<template>
  <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
    <path v-if="name === 'person'" d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-4c0-2.7-5.3-4-8-4z"/>
    <path v-else-if="name === 'pin'" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
    <path v-else-if="name === 'building'" d="M12 7V3L2 9v12h20V9l-10-6v4zM8 19H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V9h3v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V9h4v2zm6 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V9h3v2z"/>
    <path v-else-if="name === 'clock'" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
    <path v-else-if="name === 'search'" d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
    <path v-else-if="name === 'chevron'" d="M7.4 8.6L12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4z"/>
    <path v-else-if="name === 'back'" d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"/>
    <path v-else-if="name === 'users'" d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h9v-2.5c0-.8.3-1.6.8-2.2C9.9 13.5 8.9 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z"/>
    <path v-else-if="name === 'cap'" d="M12 3L1 8l4 1.8V14c0 2.2 3.1 4 7 4s7-1.8 7-4V9.8L21 9v5h2V8L12 3zm0 13c-2.8 0-5-1-5-2v-2.9l5 2.2 5-2.2V14c0 1-2.2 2-5 2z"/>
    <path v-else d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>
