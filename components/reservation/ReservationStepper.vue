<script setup lang="ts">
const props = defineProps<{
  steps: string[]
  currentStep: number
  selectedType: string | null
}>()

const emits = defineEmits<{
  selectType: [value: string]
  next: []
  previous: []
}>()

const reservationTypes = ['상담 방문', '시설 투어', '서비스 신청']

const currentStepLabel = computed(() => props.steps[props.currentStep] ?? '예약 단계')
</script>

<template>
  <section
    class="rounded-[2rem] border border-border/80 bg-card/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur"
  >
    <ol class="grid gap-3 sm:grid-cols-5">
      <li
        v-for="(step, index) in steps"
        :key="step"
        class="rounded-2xl border px-3 py-4 text-sm"
        :class="
          index === currentStep
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-muted/60 text-muted-foreground'
        "
      >
        <span class="block text-xs font-bold">STEP {{ index + 1 }}</span>
        <span class="mt-1 block font-semibold">{{ step }}</span>
      </li>
    </ol>

    <div class="mt-8 rounded-3xl bg-background p-6">
      <p class="text-sm font-bold text-primary">현재 단계</p>
      <h2 class="mt-2 text-2xl font-black">{{ currentStepLabel }}</h2>

      <div v-if="currentStep === 0" class="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          v-for="type in reservationTypes"
          :key="type"
          type="button"
          class="rounded-2xl border px-4 py-5 text-left font-bold transition hover:-translate-y-0.5 hover:border-primary"
          :class="
            selectedType === type
              ? 'border-primary bg-secondary text-foreground'
              : 'border-border bg-card'
          "
          @click="emits('selectType', type)"
        >
          {{ type }}
        </button>
      </div>

      <p
        v-else
        class="mt-6 rounded-2xl border border-dashed border-border bg-card p-5 text-muted-foreground"
      >
        이 단계는 이후 날짜/시간, 방문자 정보, 확인 화면 컴포넌트로 분리해 구현합니다.
      </p>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        type="button"
        class="rounded-full border border-border px-5 py-3 font-bold text-muted-foreground disabled:opacity-40"
        :disabled="currentStep === 0"
        @click="emits('previous')"
      >
        이전
      </button>
      <button
        type="button"
        class="rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-40"
        :disabled="currentStep === steps.length - 1"
        @click="emits('next')"
      >
        다음
      </button>
    </div>
  </section>
</template>
