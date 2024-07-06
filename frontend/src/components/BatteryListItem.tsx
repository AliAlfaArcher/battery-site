import { useState } from "react"
interface BatteryListItemProps {
    battery: BatteryDevice, 
    index: number,
    qty: number, 
    updateQuantity: (i:number, q:number) => void
}

const BatteryListItem = ({ battery, index, qty, updateQuantity }: BatteryListItemProps) => {

    const [lessBtnDisabled, setLessBtnDisabled] = useState<boolean>(qty === 0)
    const [moreBtnDisabled, setMoreBtnDisabled] = useState<boolean>(qty === 50)

    const checkButtonStatus = (qty: number) => {
        if (qty === 0) setLessBtnDisabled(true)
        if (qty === 50) setMoreBtnDisabled(true)
        if (qty > 0) setLessBtnDisabled(false)
        if (qty < 50) setMoreBtnDisabled(false)
    }
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newQty = parseInt(e.target.value) || 0
        if (newQty > 50) {
            newQty = 50
        }
        checkButtonStatus(newQty)
        updateQuantity(index, newQty)
    }

    const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            let newQty = qty + 1
            if (newQty > 50) {
                newQty = 50
            }
            checkButtonStatus(newQty)
            updateQuantity(index, newQty)
        }
        if (e.key === 'ArrowDown') {
            const newQty = qty - 1
            checkButtonStatus(newQty)
            if (newQty >= 0) {
                updateQuantity(index, newQty)
            }
        }
    }

    const onQtyBtnLessClick = () => {
        if (qty > 0) {
            updateQuantity(index, qty - 1)
            checkButtonStatus(qty - 1)
        }
    }

    const onQtyBtnMoreClick = () => {
        if (qty < 50) {
            updateQuantity(index, qty + 1)
            checkButtonStatus(qty + 1)
        }
    }

    const onQtyBtnResetClick = () => {
        updateQuantity(index, 0)
        checkButtonStatus(0)
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
                <label htmlFor={`battQty${battery.id}`}> Quantity: </label>
                <div className="battQtyInputContainer">
                    <div style={{display: "flex", alignItems: "center", columnGap: "6px" }}>
                        <button type="button" className="battQtyBtn" onClick={onQtyBtnLessClick} disabled={lessBtnDisabled} title="Decrease">
                            <svg style={{ flexShrink: "0", width: "14px", height: "14px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                        </button>
                        <input id={`battQty${battery.id}`} className="battQtyInput" type="text" placeholder="0" value={qty} onChange={onInputChange} onKeyUp={onInputKeyUp} />
                        <button type="button" className="battQtyBtn" onClick={onQtyBtnMoreClick} disabled={moreBtnDisabled} title="Increase">
                            <svg style={{ flexShrink: "0", width: "14px", height: "14px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                        <button type="button" className="battQtyBtn" onClick={onQtyBtnResetClick} title="Reset">
                            <svg style={{ flexShrink: "0", width: "14px", height: "14px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#810000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" stroke="#810000"/><path d="M5 5l14 14"/><path d="M19 5l-14 14"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BatteryListItem