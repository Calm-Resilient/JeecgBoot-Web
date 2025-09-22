import { defineStore } from 'pinia'
import { ref } from 'vue'

export const buildingInfoStore = defineStore('buildingInfo', () => {
    const selectedBuilding = ref(null)   // 当前选中的楼栋
    const buildingList = ref([])         // 楼栋列表
    const currentBuildingData = ref({})  // 当前楼栋的详细数据

    // 更新选中的楼栋
    const updateSelectedBuilding = (building) => {
        selectedBuilding.value = building
    }
    
    // 更新楼栋列表
    const updateBuildingList = (list) => {
        buildingList.value = list
    }
    
    // 更新当前楼栋数据
    const updateCurrentBuildingData = (data) => {
        currentBuildingData.value = data
    }

    return { 
        selectedBuilding, 
        buildingList, 
        currentBuildingData,
        updateSelectedBuilding,
        updateBuildingList,
        updateCurrentBuildingData
    }
})
