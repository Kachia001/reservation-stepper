export const useReservationStore = defineStore('reservation', () => {
  const steps = ref(['예약 유형', '날짜/시간', '방문자 정보', '예약 확인', '제출 완료'])
  const currentStep = ref(0)
  const selectedType = ref<string | null>(null)

  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value += 1
    }
  }

  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value -= 1
    }
  }

  const selectType = (value: string) => {
    selectedType.value = value
  }

  return {
    steps,
    currentStep,
    selectedType,
    nextStep,
    previousStep,
    selectType
  }
})
