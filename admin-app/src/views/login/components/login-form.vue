<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <t-form
      ref="loginForm"
      :data="userInfo"
      class="login-form"
      label-width="0"
      @submit="handleSubmit"
    >
      <t-form-item
        name="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :trigger="['change', 'blur']"
      >
        <t-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix-icon>
            <icon-user />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item
        name="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :trigger="['change', 'blur']"
      >
        <t-input
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          type="password"
        >
          <template #prefix-icon>
            <icon-lock />
          </template>
        </t-input>
      </t-form-item>
      <div style="margin-top: 20px">
        <div class="login-form-password-actions">
          <t-checkbox
            :checked="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            {{ $t('login.form.rememberPassword') }}
          </t-checkbox>
          <t-link theme="primary">{{ $t('login.form.forgetPassword') }}</t-link>
        </div>
        <t-button
          theme="primary"
          type="submit"
          size="large"
          :loading="loading"
          block
          style="margin-top: 20px"
        >
          {{ $t('login.form.login') }}
        </t-button>
        <t-button
          theme="default"
          variant="text"
          size="large"
          block
          class="login-form-register-btn"
          style="margin-top: 16px"
        >
          {{ $t('login.form.register') }}
        </t-button>
      </div>
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
// import { useUserStore } from '@/stores'
import useLoading from '@/hooks/loading'

const router = useRouter()
const { t } = useI18n()
const errorMessage = ref('')
const { loading, setLoading } = useLoading()
// const userStore = useUserStore()

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: '',
  password: '',
})
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
})

const handleSubmit = async ({
  validateResult,
}: {
  validateResult: any
  firstError?: string
}) => {
  if (loading.value) return
  if (validateResult === true) {
    setLoading(true)
    try {
      router.push('/home')
      MessagePlugin.success(t('login.form.login.success'))
      // const { rememberPassword } = loginConfig.value
      // const { username, password } = values
    } catch (err) {
      errorMessage.value = (err as Error).message
    } finally {
      setLoading(false)
    }
  }
}

const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--td-text-color-primary);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--td-text-color-secondary);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--td-error-color));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
