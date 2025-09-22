import { defineStore } from 'pinia'
import { ref } from 'vue'

export const areaInfoStore = defineStore('areaInfo', () => {
    const paramValue = ref('钢筋部品拼装区')   // 响应式参数
    const content = ref<any[]>([])            // 存放 list 数据

    // 更新参数
    const updateParam = (newValue: string) => {
        paramValue.value = newValue
    }
    // 更新整个 list
    const updateContent = (newValue: any[]) => {
        content.value = newValue
    }
    // 往 list 里追加数据
    const addItem = (item: any) => {
        content.value.push(item)
    }
    // 清空 list
    const clearContent = () => {
        content.value = []
    }

    return { paramValue, content, updateParam, updateContent, addItem, clearContent }
})
