import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from './components/Header'
import BatteryListItem from './components/BatteryListItem'
import ConfigurationSummary from './components/ConfigurationSummary'
import TransformerListItem from './components/TransformerListItem'

function App() {

  const initTransformer: TransformerDevice = {
    id: "",
    name: "",
    dimensions: { width: 0, depth: 0 },
    energy: 0,
    cost: 0,
    conf_needs: 0
  }

  const [uniqueWidths, setUniqueWidths] = useState<number[]>([])
  const [batteries, setBatteries] = useState<BatteryDevice[] | undefined>(undefined)
  const [transformer, setTransformer] = useState<TransformerDevice>(initTransformer)
  const [battQty, setBattQty] = useState<number[]>([])
  const [confEstimate, setConfEstimate] = useState<ConfigurationEstimate>({ energy: 0, cost: 0, landSize: { width: 0, depth: 0 }, landLayout: [], deviceList: []})

  const calculateSummary = (currBattQty: number[]) => {
    if (batteries === undefined || transformer === undefined) return

    // calculate number of transformers needed
    const transformersNeeded = Math.ceil(currBattQty.reduce((acc, qty) => acc + qty, 0) / 4)
    setTransformer(prevState => ({ ...prevState, conf_needs: transformersNeeded }))

    // calculate total energy
    const totalEnergy = currBattQty.reduce((acc, qty, index) => acc + qty * batteries[index].energy, 0) + (transformersNeeded * transformer.energy)
    setConfEstimate(prevState => ({ ...prevState, energy: totalEnergy }));

    // calculate total cost
    const totalCost = currBattQty.reduce((acc, qty, index) => acc + qty * batteries[index].cost, 0) + (transformersNeeded * transformer.cost)
    setConfEstimate(prevState => ({ ...prevState, cost: totalCost }));

    // create a map with unique width as key and quantity as value
    const widthMap = new Map()
    widthMap.set(transformer.dimensions.width, transformersNeeded)
    for (let i = 0; i < currBattQty.length; i++) {
      if (widthMap.has(batteries[i].dimensions.width)) {
        widthMap.set(batteries[i].dimensions.width, widthMap.get(batteries[i].dimensions.width) + currBattQty[i])
      } else {
        widthMap.set(batteries[i].dimensions.width, currBattQty[i])
      }
    }
    const widthMapCopy = new Map(widthMap)

    // sort devices in rows of 100 ft to calculate land size
    const landLayout:number[][] = [[]] // rows of devices, each row max 100 ft
    let spaceAvailablePerRow:number[] = [100]
    uniqueWidths.forEach(deviceWidth => { // iterate through unique device widths
      while (widthMap.get(deviceWidth) > 0) { // check if there are devices of this width remaining
        // find row with most space available
        const rowWithMostSpace = spaceAvailablePerRow.reduce((highestIndex, currentValue, currentIndex, array) => 
          currentValue > array[highestIndex] ? currentIndex : highestIndex, 0);
        if (spaceAvailablePerRow[rowWithMostSpace] >= deviceWidth) {
          // if device fits in row with most space, add it to the row
          spaceAvailablePerRow[rowWithMostSpace] -= deviceWidth
          widthMap.set(deviceWidth, widthMap.get(deviceWidth) - 1)
          landLayout[rowWithMostSpace].push(deviceWidth)
        } else {
          // if device doesn't fit in row with most space, create a new row and add it there
          spaceAvailablePerRow.push(100 - deviceWidth)
          widthMap.set(deviceWidth, widthMap.get(deviceWidth) - 1)
          landLayout.push([deviceWidth])
        }
      }
    });

    const landLayoutDepth = landLayout.length
    if (landLayoutDepth > 1) {
      // Second pass to optimize land layout
      // Reset land layout and space available per row
      spaceAvailablePerRow = new Array(landLayoutDepth).fill(100)
      for (let i = 0; i < landLayoutDepth; i++) {
        landLayout[i] = []
      }
      uniqueWidths.forEach(deviceWidth => { // iterate through unique device widths
        while (widthMapCopy.get(deviceWidth) > 0) { // check if there are devices of this width remaining
          // find row with most space available
          const rowWithMostSpace = spaceAvailablePerRow.reduce((highestIndex, currentValue, currentIndex, array) => 
            currentValue > array[highestIndex] ? currentIndex : highestIndex, 0);
          spaceAvailablePerRow[rowWithMostSpace] -= deviceWidth
          widthMapCopy.set(deviceWidth, widthMapCopy.get(deviceWidth) - 1)
          landLayout[rowWithMostSpace].push(deviceWidth)
        }
      });
    }
    setConfEstimate(prevState => ({ ...prevState, landLayout: landLayout }));

    // calculate total land size
    const totalLandsize = { width: 0, depth: 10 }
    let maxRowWidth = 0
    landLayout.forEach(row => {
        const rowWidth = row.reduce((acc, width) => acc + width, 0)
        if (rowWidth > maxRowWidth) {
            maxRowWidth = rowWidth
        }
    })
    totalLandsize.width = maxRowWidth
    totalLandsize.depth = landLayout.length * 10
    setConfEstimate(prevState => ({ ...prevState, landSize: totalLandsize }));
  
    const deviceList = batteries.reduce<{ name: string; qty: number; }[]>((acc, battery, index) => {
      if (currBattQty[index]) {
        acc.push({ name: battery.name, qty: currBattQty[index] });
      }
      return acc;
    }, []);
    deviceList.push({ name: transformer.name, qty: transformersNeeded });
    setConfEstimate(prevState => ({ ...prevState, deviceList: deviceList }));
  }

  const updateQuantity = (index: number, qty: number) => {
    const newQty = [...battQty]
    newQty[index] = qty
    setBattQty(newQty)
    calculateSummary(newQty)
  }

  useEffect(() => {
    console.log("Fetching devices from API...")
    axios.get('http://localhost:3000/devices')
      .then(res => {
        console.log("API response: ",res.data)
        const devices: devicesData = res.data.devices
        const allBatteries:BatteryDevice[] = devices.batteries
        const currentTransformer:TransformerDevice = devices.transformer
        // extract unique battery widths from batteries sorted in descending order
        const sortedUniqueWidths = [...new Set(allBatteries.map(battery => battery.dimensions.width))].sort((a, b) => b - a)
        setUniqueWidths(sortedUniqueWidths)
        setBatteries(allBatteries)
        setTransformer(currentTransformer)
        setBattQty(Array(allBatteries.length).fill(0))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="main-wrapper">

      <Header />
      <div className="configContainer">
        {batteries === undefined || transformer === undefined ? 
          <div className="configDevicesLoading">Loading Available Devices...</div> 
          : 
          <div className="configDeviceList">
            {batteries.map((battery, index) => (
              <BatteryListItem key={battery.id} battery={battery} index={index} qty={battQty[index]} updateQuantity={updateQuantity} />
            ))}
            <TransformerListItem transformer={transformer} />
          </div>
        }
      </div>

      <ConfigurationSummary confEstimate={confEstimate} />

    </div>
  )
}

export default App
