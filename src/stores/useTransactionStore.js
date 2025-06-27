import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useTransactionStore = defineStore('transaction', () => {
  const productTransaction = reactive({
    transactionList: [],
    addTransaction(addTransaction_) {
      this.transactionList.push(addTransaction_)
    }
  })

  function loadFromLocalStorage() {
    const transaction = localStorage.getItem("transactionList")
    if (transaction) {
      productTransaction.transactionList = JSON.parse(transaction)
    }

  }

  watch(
    () => productTransaction.transactionList,
    (val) => {
      localStorage.setItem("transactionList", JSON.stringify(val))
    },
    { deep: true }
  )

  return { productTransaction, loadFromLocalStorage }
})
