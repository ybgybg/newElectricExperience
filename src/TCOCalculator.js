// src/TCOCalculator.js

// 注意这里加了 export
export function calculateTCO(params) {
  const {
    purchasePrice,
    depreciationYears,
    residualValue,
    machineTax,
    machineInsurance,
    electricityPrice,
    electricityConsumption,
    tireAndTrackCost,
    annualWorkHours,
    liquidCost,
    filterCost,
    undercarriageCost,
    maintenanceCost,
    toolCost,
    overhaulCost,
    driverCost
  } = params;

  const depreciation = (purchasePrice - residualValue - tireAndTrackCost) / (depreciationYears * annualWorkHours);
  const insurance = machineInsurance / (depreciationYears * annualWorkHours);
  const tax = machineTax / (depreciationYears * annualWorkHours);
  const electricity = electricityPrice * electricityConsumption;
  const maintenance = (liquidCost + filterCost + undercarriageCost + maintenanceCost + toolCost + overhaulCost) / 10000;
  const driver = driverCost;
  const TCO = depreciation + insurance + tax + electricity + maintenance + driver;

  return {
    depreciation,
    insurance,
    tax,
    electricity,
    maintenance,
    driver,
    TCO
  };
}