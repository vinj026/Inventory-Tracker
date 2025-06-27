<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
  title: String,
  selectedChart: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:selectedChart'])
const canvasRef = ref(null)
let chartInstance = null


onMounted(() => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d')

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.value.height)
    gradient.addColorStop(0, 'rgba(54, 54, 54, 1)')
    gradient.addColorStop(1, 'rgba(54, 54, 54, 1)')

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        ...props.chartData,
        datasets: props.chartData.datasets.map(ds => ({
          ...ds,
          backgroundColor: gradient,
          fill: true
        }))
      },
      options: props.chartOptions,
    })
  }
})


function selectType(type) {
  emit('update:selectedChart', type)
}

const hasData = computed(() => {
  return props.chartData?.labels?.length > 0 &&
    props.chartData.datasets?.[0]?.data?.length > 0
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})


watch(
  [() => props.chartData, () => props.selectedChart],
  ([newData]) => {
    if (chartInstance) {
      chartInstance.data = {
        ...newData,
        datasets: newData.datasets.map(ds => ({
          ...ds,
          backgroundColor: chartInstance.data.datasets[0].backgroundColor,
          fill: true,
        }))
      }
      chartInstance.update()
    }
  },
  { immediate: true, deep: true }
)

</script>



<template>
  <div class="w-full h-fit border border-white-500 rounded-3xl">
    <div class="flex justify-between p-4">
      <h1 class=" text-lg font-bold text-black-300">{{ title }}</h1>
      <div class="flex gap-2 mb-2">
        <select class="border border-white-500 rounded px-4 text-black-300 font-medium py-1 outline-none "
          :value="selectedChart" @change="selectType($event.target.value)">
          <option value="in">Items In</option>
          <option value="out">Items Out</option>
        </select>
      </div>
    </div>
    <div class="w-full h-[250px] pb-4 px-4">
      <div v-if="!hasData" class="w-full h-full flex items-center justify-center text-black-50">
        No transaction data yet
      </div>
      <canvas v-else ref="canvasRef" class="w-full h-full" />
    </div>
  </div>
</template>
