<script setup>
import { ref, computed } from 'vue'
import BarChartRaw from "@/components/spesific/BarChartRaw.vue"
import { useTransactionStore } from "@/stores/useTransactionStore"

const transactionStore = useTransactionStore();
const selectedType = ref('in')
const chartData = computed(() => {
  const filtered = transactionStore.productTransaction.transactionList
    .filter(t => t.type === selectedType.value)

  const rawDates = [...new Set(filtered.map(t => t.date.slice(0, 10)))].sort()
  const dates = rawDates.slice(-8)

  const totals = dates.map(date =>
    filtered
      .filter(t => t.date.startsWith(date))
      .reduce((sum, t) => sum + t.quantity, 0)
  )

  return {
    labels: dates,
    datasets: [
      {
        label: selectedType.value === 'in' ? 'Items In' : 'Items Out',
        data: totals,
        backgroundColor: '#4f46e5',
        borderRadius: 8,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false, text: 'Total Stock per Category' },
  },
  scales: {
    x: {
      display: false,
      grid: { display: false }
    },
    y: {
      display: true,
      grid: { display: false }
    },
  },
};

</script>

<template>

  <BarChartRaw title="Items In " :chart-data="chartData" :chart-options="chartOptions"
    v-model:selectedChart="selectedType" />
</template>
