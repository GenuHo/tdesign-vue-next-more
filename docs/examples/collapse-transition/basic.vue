<template>
  <div class="example-basic">
    <div>
      <t-button @click="isShow = !isShow">click</t-button>
    </div>
    <tm-collapse-transition>
      <t-card v-show="isShow" bordered :style="{ width: '400px' }">
        {{ infoMessage }}
      </t-card>
    </tm-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(true)

const infoMessage = `A card with only content area. The card's content area can contain various forms of information such as text, images, forms, and tables. You can use different card sizes (large, medium, small) to present content according to business requirements.`
</script>

<style scoped>
.example-basic {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
