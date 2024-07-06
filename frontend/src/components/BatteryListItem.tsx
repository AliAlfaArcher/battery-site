interface BatteryListItemProps {
    battery: BatteryDevice, 
    index: number,
    qty: number, 
    updateQuantity: (i:number, q:number) => void
}

const BatteryListItem = ({ battery, index, qty, updateQuantity }: BatteryListItemProps) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQty = parseInt(e.target.value) || 0
        updateQuantity(index, newQty)
    }

    const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            updateQuantity(index, qty + 1)
        }
        if (e.key === 'ArrowDown') {
            if (qty > 0) {
                updateQuantity(index, qty - 1)
            }
        }
    }

    return (
        <div className="batteryContainer">
            <div className="battName">{battery.name}</div>
            <div className='battDataCol1'>
            <div className="battInfoLine">
                <div className="battInfoLbl">Release date:</div>
                <div className="battInfoVal">{battery.release_date}</div>
                <div className="battInfoLbl">Footprint:</div>
                <div className="battInfoVal">{battery.dimensions.width} ft x {battery.dimensions.depth} ft</div>
                <div className="battInfoLbl">Energy:</div>
                <div className="battInfoVal">{battery.energy} MWh</div>
                <div className="battInfoLbl">Cost:</div>
                <div className="battInfoVal">${Intl.NumberFormat().format(battery.cost)}</div>
            </div>
            </div>
            <div className='battDataCol2'>
            <div className="battImgContainer">
                <img className="battImg" src={battery.image} alt={battery.name} />
            </div>
            <div className='battQtyContainer'>
                <label htmlFor={`battQty${battery.id}`}> Quantity:</label>
                <input id={`battQty${battery.id}`} className='battQtyInput' type='input' placeholder='0' value={qty} onChange={onInputChange} onKeyUp={onInputKeyUp} />
            </div>
            </div>
        </div>
    )
}

export default BatteryListItem