<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReservationStore } from '~/stores/reservation'

const reservation = useReservationStore()
const { currentStep, steps, selectedType } = storeToRefs(reservation)
</script>

<template>
  <section class="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
    <p class="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
      Reservation Stepper
    </p>

    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          방문 예약을 단계별로 간결하게 처리합니다.
        </h1>
        <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          Nuxt 3, Pinia, shadcn/vue, Tailwind CSS를 기반으로 예약 정보를 수집하고, Nitro 서버의 DDD
          백엔드로 제출하는 구조입니다.
        </p>
      </div>

      <ReservationStepper
        :steps="steps"
        :current-step="currentStep"
        :selected-type="selectedType"
        @select-type="reservation.selectType"
        @next="reservation.nextStep"
        @previous="reservation.previousStep"
      />
    </div>
  </section>
</template>
