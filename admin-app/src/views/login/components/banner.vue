<template>
  <div class="banner">
    <t-swiper class="swiper" :autoplay="true">
      <t-swiper-item v-for="item in swiperItems" :key="item.slogan">
        <div :key="item.slogan" class="swiper-item">
          <div class="swiper-title">{{ item.slogan }}</div>
          <div class="swiper-sub-title">{{ item.subSlogan }}</div>
          <img class="swiper-image" :src="item.image" />
        </div>
      </t-swiper-item>
    </t-swiper>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import bannerImage from '@/assets/images/login-banner.png'

const { t } = useI18n()
const swiperItems = computed(() => [
  {
    slogan: t('login.banner.slogan1'),
    subSlogan: t('login.banner.subSlogan1'),
    image: bannerImage,
  },
  {
    slogan: t('login.banner.slogan2'),
    subSlogan: t('login.banner.subSlogan2'),
    image: bannerImage,
  },
  {
    slogan: t('login.banner.slogan3'),
    subSlogan: t('login.banner.subSlogan3'),
    image: bannerImage,
  },
])
</script>

<style lang="less" scoped>
.swiper {
  height: 100%;

  :deep(.t-swiper__content) {
    height: 100%;
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &-title {
    color: var(--td-font-white-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }

  &-sub-title {
    margin-top: 8px;
    color: var(--td-font-white-2);
    font-size: 14px;
    line-height: 22px;
  }

  &-image {
    width: 320px;
    margin-top: 30px;
  }
}
</style>
