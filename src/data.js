// src/data.js

export const machineData = {
  "L956HEV": {
    purchasePrice: 1500000, depreciationYears: 3, residualValue: 874500,
    machineTax: 0, machineInsurance: 0, electricityPrice: 0.62,
    electricityConsumption: 43.75, tireAndTrackCost: 30760,
    annualWorkHours: 3600, liquidCost: 73140, filterCost: 11154,
    undercarriageCost: 119932, maintenanceCost: 23572, toolCost: 66553,
    overhaulCost: 54039, driverCost: 11
  },
  "856HE": {
    purchasePrice: 1418913, depreciationYears: 3, residualValue: 766124,
    machineTax: 0, machineInsurance: 0, electricityPrice: 0.62,
    electricityConsumption: 43.75, tireAndTrackCost: 30760,
    annualWorkHours: 3600, liquidCost: 73938, filterCost: 11183,
    undercarriageCost: 140636, maintenanceCost: 23620, toolCost: 52628,
    overhaulCost: 54039, driverCost: 11
  },
};

// 参数名称映射，把英文 key 换成好听的中文名
export const labelMap = {
  purchasePrice: "采购价格 (元)",
  depreciationYears: "折旧年限 (年)",
  residualValue: "残值 (元)",
  machineTax: "整机税 (元/年)",
  machineInsurance:"保险 (元/年)",
  electricityPrice: "电价 (元/度)",
  electricityConsumption: "电耗 (度/小时)",
  tireAndTrackCost: "轮胎/履带费用 (元)",
  annualWorkHours: "年工作小时 (小时/年)",
  liquidCost: "油液费用(元/万小时)",
  filterCost: "滤清器费用(元/万小时)",
  undercarriageCost: "行走系统费用(元/万小时)",
  maintenanceCost: "常规维护费用(元/万小时)",
  toolCost: "作业工具费用(元/万小时)",
  overhaulCost: "额外大修费用(元/万小时)",
  driverCost: "司机费用 (元/小时)",
};