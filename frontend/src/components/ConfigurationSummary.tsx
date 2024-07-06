interface ConfigurationSummaryProps {
    confEstimate: ConfigurationEstimate;
}

const ConfigurationSummary = ({ confEstimate }:ConfigurationSummaryProps) => {

    const gridGaps = confEstimate.landSize.width / 10 - 1
    const gridMaxWidth = (confEstimate.landSize.width * 40) + ( gridGaps * 5)
    const gridTemplateColumns = `repeat(${confEstimate.landSize.width / 10}, 1fr)`

    return (
        <div className="summContainer">
            <div className="summTitle">Current Configuration Summary</div>
            <div className="summDeviceList">
                {confEstimate.deviceList.length > 1 ? 
                    ( confEstimate.deviceList.map((device, index) => ( <div key={index} className="summDevItem">{index?", ":""}<span className="summDevTag">{device.name}</span> x {device.qty}</div> )))
                : "Enter battery quantities to see the configuration summary."
                }
            </div>
            <div className="summData">
                <div className='summGrid'>
                    <div className="summInfoLbl">Total Energy:</div>
                    <div className="summInfoVal">{confEstimate.energy} MWh</div>
                    <div className="summInfoLbl">Estimated Cost:</div>
                    <div className="summInfoVal">${Intl.NumberFormat().format(confEstimate.cost)}</div>
                    <div className="summInfoLbl">Estimated Footprint:</div>
                    <div className="summInfoVal">{confEstimate.landSize.width} ft x {confEstimate.landSize.depth} ft</div>
                </div>
                <div className='summLandArrangement'>
                    <div className="summLayoutTitle">Land Layout</div>
                    <div className="landArrangement" style={{ maxWidth: `${gridMaxWidth}px`, gridTemplateColumns: gridTemplateColumns}}>
                        {confEstimate.landLayout.map((row) => {
                            let currentCol = 1
                            return (
                                row.map((devWidth, devIndex) => {
                                    const colSpan = devWidth / 10
                                    const thisCol = currentCol
                                    currentCol += colSpan
                                    return (
                                        <div key={devIndex} style={{ gridColumn: `${thisCol} / span ${colSpan}`}} className="landCell">{devWidth}ft</div>
                                    )}
                                )
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ConfigurationSummary